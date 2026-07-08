import { type Context } from "hono";
import { stream } from "hono/streaming";
import {
  parse_f_templates,
  render_entry_with_templates,
} from "@microsoft/fast-build/wasm/microsoft_fast_build.js";
import { build, renderStream } from "@microsoft/webui";
import { fileURLToPath } from "node:url";
import helloWorldTemplates from "./templates/hello-world.html?raw";

const [helloWorldTemplate] = JSON.parse(parse_f_templates(helloWorldTemplates));
const templates = JSON.stringify({
  [helloWorldTemplate.name]: helloWorldTemplate,
});
const webuiAppDir = fileURLToPath(new URL("../src/webui/", import.meta.url));
const { protocol } = build({ appDir: webuiAppDir });

// Streams server-rendered HTML through WebUI's compiled renderer.
export function streamHTML(c: Context, html: string, state: object = {}) {
  c.header("Content-Type", "text/html; charset=utf-8");
  c.header("Transfer-Encoding", "chunked");
  c.header("X-Content-Type-Options", "nosniff"); // security measure
  const renderedHTML = render_entry_with_templates(
    html,
    templates,
    JSON.stringify(state),
    "camelCase"
  );
  const chunks: string[] = [];
  const encoder = new TextEncoder();

  renderStream(protocol, { content: renderedHTML }, (chunk) => {
    chunks.push(chunk);
  });

  return stream(c, async (stream) => {
    for (const chunk of chunks) {
      await stream.write(encoder.encode(chunk));
    }
  });
}
