import { customElementsManifestToMarkdown } from "@custom-elements-manifest/to-markdown";
import { readFileSync, writeFileSync } from "fs";

const manifest = JSON.parse(readFileSync("./custom-elements.json", "utf-8"));
const markdown = customElementsManifestToMarkdown(manifest, {
  private: "hidden",
});
writeFileSync("API.md", markdown);
console.log("Markdown documentation generated in API.md");
