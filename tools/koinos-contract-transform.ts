import { Transform } from "assemblyscript/cli/transform";
import { ElementKind, Program, DecoratorKind, ClassPrototype, IdentifierExpression, DeclaredElement, FunctionDeclaration, NamedTypeNode, IntegerLiteralExpression, StringLiteralExpression, LiteralExpression } from "assemblyscript";
import { unlinkSync, readFileSync, existsSync, writeFileSync } from 'fs';


const { CONTRACT_PATH } = process.env;
const CONTRACT_DECORATOR = 'contract';
const ENTRY_POINT_DECORATOR = 'entry_point';
const INDEX_TS_FILE_PATH = CONTRACT_PATH + '/assembly/index.ts';
const CONTRACT_ENTRY_POINT_TEMPLATE_PATH = './node_modules/koinos-cdt-as/templates/template.ts';
const CONTRACT_ABI_PATH = CONTRACT_PATH + '/abi/contract.abi';
let nbContractClass = 0;
let entryPoints: DeclaredElement[] = [];
const ABI = {
  methods: {},
  types: ""
};

class KoinosContractTransform extends Transform {
  afterInitialize(program: Program) {
    // delete generated index.ts file
    if (existsSync(INDEX_TS_FILE_PATH)) {
      unlinkSync(INDEX_TS_FILE_PATH);
    }
    // delete generated contract.abi file
    if (existsSync(CONTRACT_ABI_PATH)) {
      unlinkSync(CONTRACT_ABI_PATH);
    }
    // load template
    let contractEntryPointTemplate = readFileSync(CONTRACT_ENTRY_POINT_TEMPLATE_PATH).toString();

    var elements = program.elementsByName;
    elements.forEach(element => {
      // look for a class that has the CONTRACT_DECORATOR
      if (element.kind === ElementKind.CLASS_PROTOTYPE) {
        const classProto = (<ClassPrototype>element);
        if (classProto.declaration.decorators) {
          let contractDecorators = classProto.declaration.decorators.filter(d => {
            return d.decoratorKind === DecoratorKind.CUSTOM && (<IdentifierExpression>d.name).text == CONTRACT_DECORATOR;
          });
          nbContractClass += contractDecorators.length;
          if (nbContractClass > 1) {
            throw new Error(`There can be only 1 class with the @${CONTRACT_DECORATOR} decorator`);
          } else if (contractDecorators.length === 1) {
            // we now know this class has the CONTRACT_DECORATOR
            const contractClassName = classProto.name;
            this.log(`Identified class "${contractClassName}" as the contract declaration`);

            // find the entry points
            classProto.instanceMembers.forEach(m => {
              m.decoratorNodes?.forEach(d => {
                if (d.decoratorKind === DecoratorKind.CUSTOM && (<IdentifierExpression>d.name).text == ENTRY_POINT_DECORATOR) {
                  entryPoints.push(m);
                }
              });
            });

            if (entryPoints.length === 0) {
              throw new Error(`No methods with the @${ENTRY_POINT_DECORATOR} decorator found on contract class "${contractClassName}"`);
            }

            let entryPointTemplates = '';
            let typesClassNames: string[] = [];
            entryPoints.forEach(et => {
              const entryPointName = et.name;

              // extract entry point details for ABI generation
              const entryPointDecorator = et.decoratorNodes.find(d => d.decoratorKind === DecoratorKind.CUSTOM && (<IdentifierExpression>d.name).text == ENTRY_POINT_DECORATOR);
              if (!entryPointDecorator.args || entryPointDecorator.args.length < 2) {
                throw new Error(`Entry point "${entryPointName}" is missing parameters`);
              }

              const entryPoindIndex = (<StringLiteralExpression>entryPointDecorator.args[0]).value;
              const entryPointDescription = (<StringLiteralExpression>entryPointDecorator.args[1]).value;
              let entryPointReadOnly = ((<IdentifierExpression>entryPointDecorator.args[2]).text === 'true');

              const signature = (<FunctionDeclaration>et.declaration).signature;

              // parse parameters
              if (signature.parameters.length !== 1) {
                throw new Error(`Entry point "${entryPointName}" can only accept one parameter`);
              }

              let typeName = (<NamedTypeNode>signature.parameters[0].type).name;
              let paramType = typeName.identifier.text;
              if (!typesClassNames.includes(paramType)) {
                typesClassNames.push(paramType);
              }

              let next = typeName.next;

              while (next !== null) {
                paramType += '.' + next.identifier.text;
                next = next.next;
              }

              // parse return type
              typeName = (<NamedTypeNode>signature.returnType).name;
              let returnType = typeName.identifier.text;

              if (returnType === 'void') {
                throw new Error(`Entry point "${entryPointName}" cannot return "void"`);
              }

              if (!typesClassNames.includes(returnType)) {
                typesClassNames.push(returnType);
              }

              next = typeName.next;

              while (next !== null) {
                returnType += '.' + next.identifier.text;
                next = next.next;
              }

              const entryPointTemplate = `
    case ${entryPoindIndex}: {
      const args = Protobuf.decode<${paramType}>(rdbuf, ${paramType}.decode);
      const res = c.${entryPointName}(args);
      retbuf = Protobuf.encode(res, ${returnType}.encode);
      break;
    }
              `;
              entryPointTemplates += entryPointTemplate;

              this.log(`Generated entry point "${entryPointName}(${entryPoindIndex})": ${entryPointDescription} ("${entryPointName}(${paramType}):${returnType}")`);

              ABI.methods[entryPointName] = {
                argument: paramType,
                return: returnType,
                entry_point: entryPoindIndex,
                description: entryPointDescription,
                "read-only": entryPointReadOnly
              };
            });

            // @ts-ignore
            contractEntryPointTemplate = contractEntryPointTemplate.replaceAll('##_CONTRACT_CLASS_NAME_##', contractClassName);
            // @ts-ignore
            contractEntryPointTemplate = contractEntryPointTemplate.replaceAll('##_CONTRACT_TYPES_CLASS_NAMES_##', typesClassNames.join(', '));
            // @ts-ignore
            contractEntryPointTemplate = contractEntryPointTemplate.replaceAll('##_CONTRACT_ENTRY_POINTS_##', entryPointTemplates);

            writeFileSync(INDEX_TS_FILE_PATH, contractEntryPointTemplate);
            this.log(`Saved Generated "index.ts" file in "${INDEX_TS_FILE_PATH}"`);

            // generate types for ABI
            ABI.types = readFileSync(`${CONTRACT_PATH}/assembly/proto/${contractClassName}.pb`).toString('base64')

            writeFileSync(CONTRACT_ABI_PATH, JSON.stringify(ABI, null, 4));
            this.log(`Saved Generated ABI file "contract.abi" file in "${CONTRACT_ABI_PATH}"`);
          }
        }
      }
    });
  }
}

console.log();

export = KoinosContractTransform;