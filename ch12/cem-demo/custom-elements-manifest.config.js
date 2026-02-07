import wrecPlugin from "cem-plugin-wrec";
// For local debugging ...
//import wrecPlugin from "./cem-plugin-wrec.js";

export default {
  exclude: ["node_modules"],
  plugins: [wrecPlugin()],
};
