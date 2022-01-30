"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var transform_1 = require("assemblyscript/cli/transform");
var assemblyscript_1 = require("assemblyscript");
var fs_1 = require("fs");
var CONTRACT_PATH = process.env.CONTRACT_PATH;
var CONTRACT_DECORATOR = 'contract';
var ENTRY_POINT_DECORATOR = 'entry_point';
var INDEX_TS_FILE_PATH = CONTRACT_PATH + '/assembly/index.ts';
var CONTRACT_ENTRY_POINT_TEMPLATE_PATH = './node_modules/koinos-cdt-as/templates/template.ts';
var CONTRACT_ABI_PATH = CONTRACT_PATH + '/abi/contract.abi';
var nbContractClass = 0;
var entryPoints = [];
var ABI = {
    methods: {},
    types: ""
};
var KoinosContractTransform = /** @class */ (function (_super) {
    __extends(KoinosContractTransform, _super);
    function KoinosContractTransform() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    KoinosContractTransform.prototype.afterInitialize = function (program) {
        var _this = this;
        // delete generated index.ts file
        if ((0, fs_1.existsSync)(INDEX_TS_FILE_PATH)) {
            (0, fs_1.unlinkSync)(INDEX_TS_FILE_PATH);
        }
        // delete generated contract.abi file
        if ((0, fs_1.existsSync)(CONTRACT_ABI_PATH)) {
            (0, fs_1.unlinkSync)(CONTRACT_ABI_PATH);
        }
        // load template
        var contractEntryPointTemplate = (0, fs_1.readFileSync)(CONTRACT_ENTRY_POINT_TEMPLATE_PATH).toString();
        var elements = program.elementsByName;
        elements.forEach(function (element) {
            // look for a class that has the CONTRACT_DECORATOR
            if (element.kind === assemblyscript_1.ElementKind.CLASS_PROTOTYPE) {
                var classProto = element;
                if (classProto.declaration.decorators) {
                    var contractDecorators = classProto.declaration.decorators.filter(function (d) {
                        return d.decoratorKind === assemblyscript_1.DecoratorKind.CUSTOM && d.name.text == CONTRACT_DECORATOR;
                    });
                    nbContractClass += contractDecorators.length;
                    if (nbContractClass > 1) {
                        throw new Error("There can be only 1 class with the @".concat(CONTRACT_DECORATOR, " decorator"));
                    }
                    else if (contractDecorators.length === 1) {
                        // we now know this class has the CONTRACT_DECORATOR
                        var contractClassName = classProto.name;
                        _this.log("Identified class \"".concat(contractClassName, "\" as the contract declaration"));
                        // find the entry points
                        classProto.instanceMembers.forEach(function (m) {
                            var _a;
                            (_a = m.decoratorNodes) === null || _a === void 0 ? void 0 : _a.forEach(function (d) {
                                if (d.decoratorKind === assemblyscript_1.DecoratorKind.CUSTOM && d.name.text == ENTRY_POINT_DECORATOR) {
                                    entryPoints.push(m);
                                }
                            });
                        });
                        if (entryPoints.length === 0) {
                            throw new Error("No methods with the @".concat(ENTRY_POINT_DECORATOR, " decorator found on contract class \"").concat(contractClassName, "\""));
                        }
                        var entryPointTemplates_1 = '';
                        var typesClassNames_1 = [];
                        entryPoints.forEach(function (et) {
                            var entryPointName = et.name;
                            // extract entry point details for ABI generation
                            var entryPointDecorator = et.decoratorNodes.find(function (d) { return d.decoratorKind === assemblyscript_1.DecoratorKind.CUSTOM && d.name.text == ENTRY_POINT_DECORATOR; });
                            if (!entryPointDecorator.args || entryPointDecorator.args.length < 2) {
                                throw new Error("Entry point \"".concat(entryPointName, "\" is missing parameters"));
                            }
                            var entryPoindIndex = entryPointDecorator.args[0].value;
                            var entryPointDescription = entryPointDecorator.args[1].value;
                            var entryPointReadOnly = (entryPointDecorator.args[2].text === 'true');
                            var signature = et.declaration.signature;
                            // parse parameters
                            if (signature.parameters.length !== 1) {
                                throw new Error("Entry point \"".concat(entryPointName, "\" can only accept one parameter"));
                            }
                            var typeName = signature.parameters[0].type.name;
                            var paramType = typeName.identifier.text;
                            if (!typesClassNames_1.includes(paramType)) {
                                typesClassNames_1.push(paramType);
                            }
                            var next = typeName.next;
                            while (next !== null) {
                                paramType += '.' + next.identifier.text;
                                next = next.next;
                            }
                            // parse return type
                            typeName = signature.returnType.name;
                            var returnType = typeName.identifier.text;
                            if (returnType === 'void') {
                                throw new Error("Entry point \"".concat(entryPointName, "\" cannot return \"void\""));
                            }
                            if (!typesClassNames_1.includes(returnType)) {
                                typesClassNames_1.push(returnType);
                            }
                            next = typeName.next;
                            while (next !== null) {
                                returnType += '.' + next.identifier.text;
                                next = next.next;
                            }
                            var entryPointTemplate = "\n    case ".concat(entryPoindIndex, ": {\n      const args = Protobuf.decode<").concat(paramType, ">(rdbuf, ").concat(paramType, ".decode);\n      const res = c.").concat(entryPointName, "(args);\n      retbuf = Protobuf.encode(res, ").concat(returnType, ".encode);\n      break;\n    }\n              ");
                            entryPointTemplates_1 += entryPointTemplate;
                            _this.log("Generated entry point \"".concat(entryPointName, "(").concat(entryPoindIndex, ")\": ").concat(entryPointDescription, " (\"").concat(entryPointName, "(").concat(paramType, "):").concat(returnType, "\")"));
                            ABI.methods[entryPointName] = {
                                argument: paramType,
                                "return": returnType,
                                entry_point: entryPoindIndex,
                                description: entryPointDescription,
                                "read-only": entryPointReadOnly
                            };
                        });
                        // @ts-ignore
                        contractEntryPointTemplate = contractEntryPointTemplate.replaceAll('##_CONTRACT_CLASS_NAME_##', contractClassName);
                        // @ts-ignore
                        contractEntryPointTemplate = contractEntryPointTemplate.replaceAll('##_CONTRACT_TYPES_CLASS_NAMES_##', typesClassNames_1.join(', '));
                        // @ts-ignore
                        contractEntryPointTemplate = contractEntryPointTemplate.replaceAll('##_CONTRACT_ENTRY_POINTS_##', entryPointTemplates_1);
                        (0, fs_1.writeFileSync)(INDEX_TS_FILE_PATH, contractEntryPointTemplate);
                        _this.log("Saved Generated \"index.ts\" file in \"".concat(INDEX_TS_FILE_PATH, "\""));
                        // generate types for ABI
                        ABI.types = (0, fs_1.readFileSync)("".concat(CONTRACT_PATH, "/assembly/proto/").concat(contractClassName, ".pb")).toString('base64');
                        (0, fs_1.writeFileSync)(CONTRACT_ABI_PATH, JSON.stringify(ABI, null, 4));
                        _this.log("Saved Generated ABI file \"contract.abi\" file in \"".concat(CONTRACT_ABI_PATH, "\""));
                    }
                }
            }
        });
    };
    return KoinosContractTransform;
}(transform_1.Transform));
console.log();
module.exports = KoinosContractTransform;
