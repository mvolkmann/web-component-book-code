import { type Context, Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { streamHTML } from "./stream.ts";

const html = String.raw;
const app = new Hono();

app.use("/*", serveStatic({ root: "." }));

// This returns HTML that includes server-side rendered FAST components.
app.get("/greet", async (c: Context) => {
  const name = c.req.query("name");
  const template = html`
    <p>The following are server-side rendered FAST components.</p>
    <hello-world></hello-world>
    <hello-world name=${name}></hello-world>
  `;
  return streamHTML(c, template);
});

serve(app, (info) => {
  console.log(`listing on port ${info.port}`);
});
