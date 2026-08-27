import html from "@html-eslint/eslint-plugin";
import tseslint from "typescript-eslint";

export default [
  {
    files: ["**/*.js"],
    plugins: {
      "@html-eslint": html,
    },
    rules: {
      ...html.configs["flat/recommended"].rules,
      "@html-eslint/indent": ["error", 2],
    },
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tseslint.parser,
    },
    plugins: {
      "@html-eslint": html,
    },
    rules: {
      ...html.configs["flat/recommended"].rules,
      "@html-eslint/indent": ["error", 2],
    },
  },
];
