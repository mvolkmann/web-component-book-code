import { type Context, Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { streamHTML } from "./stream.js";

const html = String.raw;
const app = new Hono();

app.use("/*", serveStatic({ root: "./dist" }));

// This returns HTML that includes server-side rendered FAST components.
app.get("/greet", async (c: Context) => {
  const name = c.req.query("name");
  const template = html`
    <p>The following components are server-side rendered:</p>
    <hello-world></hello-world>
    <hello-world name=${name}></hello-world>
  `;
  return streamHTML(c, template);
});

serve(app, (info) => {
  console.log(`listening on port ${info.port}`);
});
