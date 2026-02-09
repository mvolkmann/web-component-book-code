import wrecPlugin from "cem-plugin-wrec";
// To debug cem-plugin-wrec locally,
// comment out the package import above,
// copy cem-plugin-wrec/index.js to ./cem-plugin-wrec.js,
// and uncomment the following import:
//import wrecPlugin from "./cem-plugin-wrec.js";

export default {
  globs: ["src/**/*.{js,ts}"],
  plugins: [wrecPlugin()],
};
