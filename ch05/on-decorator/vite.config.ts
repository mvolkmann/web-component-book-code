import ts from "typescript";
import { defineConfig, type Plugin } from "vite";

// Transpiles TypeScript decorators before Rolldown processes the modules.
function typescriptDecorators(): Plugin {
  return {
    enforce: "pre",
    name: "typescript-decorators",

    // Transforms TypeScript and standard decorators into browser-compatible JavaScript.
    transform(code, id) {
      if (!id.endsWith(".ts")) return null;

      return ts.transpile(
        code,
        {
          module: ts.ModuleKind.ESNext,
          target: ts.ScriptTarget.ES2022,
        },
        id,
      );
    },
  };
}

export default defineConfig({
  oxc: {
    target: "es2022",
    include: /\.[jt]s$/,
  },
  plugins: [typescriptDecorators()],
});
