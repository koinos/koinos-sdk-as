// @ts-check

const td = require("typedoc");
const ts = require("typescript");

const app = new td.Application();
// For reading typedoc.json - optional
app.options.addReader(new td.TypeDocReader());
// For reading tsconfig.json - essential
app.options.addReader(new td.TSConfigReader());

app.bootstrap({
  // can put other options here too, or in typedoc.json/tsconfig.json
  tsconfig: "assembly/tsconfig.json",
  entryPoints: ["assembly/index.ts"],
  includeVersion: true
});

const program = ts.createProgram(
  app.options.getFileNames(),
  app.options.getCompilerOptions()
);

// Application.convert checks for compiler errors here.

const project = app.converter.convert(app.getEntryPoints());

app.generateDocs(project, "./docs");