import { type Context } from "hono";
import { stream } from "hono/streaming";
// The next import must precede the import that follows it.
import "@microsoft/fast-ssr/install-dom-shim.js";
import fastSSR from "@microsoft/fast-ssr";

const { templateRenderer } = fastSSR();

export function streamHTML(c: Context, html: string) {
  c.header("Content-Type", "text/html; charset=utf-8");
  c.header("Transfer-Encoding", "chunked");
  c.header("X-Content-Type-Options", "nosniff"); // security measure
  const iterator = templateRenderer.render(html);
  const encoder = new TextEncoder();
  return stream(c, async (stream) => {
    for (const chunk of iterator) {
      await stream.write(encoder.encode(chunk));
    }
  });
}
