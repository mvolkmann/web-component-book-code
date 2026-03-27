import html from "@html-eslint/eslint-plugin";

export default [
  {
    files: ["**/*.{js,ts}"],
    plugins: {
      "@html-eslint": html,
    },
    rules: {
      ...html.configs["flat/recommended"].rules,
      "@html-eslint/indent": ["error", 2],
    },
  },
];
