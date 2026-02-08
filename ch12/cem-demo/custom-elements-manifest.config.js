import wrecPlugin from "cem-plugin-wrec";
// To debug cem-plugin-wrec locally,
// comment out the package import above,
// copy cem-plugin-wrec/index.js to ./cem-plugin-wrec.js,
// and uncomment the following import:
//import wrecPlugin from "./cem-plugin-wrec.js";

export default {
  exclude: ["generate-docs.js", "node_modules"],
  plugins: [wrecPlugin()],
};
