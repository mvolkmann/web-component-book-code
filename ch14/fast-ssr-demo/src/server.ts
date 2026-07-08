import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { type Context, Hono } from "hono";
import { type AddressInfo } from "node:net";
import { streamHTML } from "./stream";

const html = String.raw;
const app = new Hono();

app.use("/*", serveStatic({ root: "./dist" }));

// This returns HTML that includes server-side rendered FAST components.
app.get("/greet", (c: Context) => {
  const template = html`
    <p>The following components are server-side rendered:</p>
    <hello-world></hello-world>
    <hello-world name="{{queryName}}"></hello-world>
  `;
  const state = {
    name: "World",
    queryName: c.req.query("name") || "World",
  };
  return streamHTML(c, template, state);
});

serve(app, (info: AddressInfo) => {
  console.log(`listening on port ${info.port}`);
});
