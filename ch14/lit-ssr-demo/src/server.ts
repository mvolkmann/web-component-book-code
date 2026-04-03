import { type Context, Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";

import { html } from "lit";
import { render } from "@lit-labs/ssr";
import { collectResult } from "@lit-labs/ssr/lib/render-result.js";

import "./hello-world.js";

const app = new Hono();

app.use("/*", serveStatic({ root: "./dist" }));

app.get("/greet", async (c: Context) => {
  const name = c.req.query("name");
  const template = html`
    <p>The following components are server-side rendered:</p>
    <hello-world></hello-world>
    <hello-world name=${name}></hello-world>
  `;
  // Generate a stream of HTML from the template.
  const stream = render(template);
  // Combine chunks of HTML from the stream into a string.
  const string = await collectResult(stream);
  // Send an HTTP response containing the HTML string.
  return c.html(string);
});

serve(app, (info) => {
  console.log(`listing on port ${info.port}`);
});
