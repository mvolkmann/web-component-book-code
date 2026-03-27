export default {
  extends: ["stylelint-config-standard"],
  overrides: [
    {
      files: ["**/*.{js,ts}"],
      customSyntax: "postcss-lit",
    },
  ],
};
