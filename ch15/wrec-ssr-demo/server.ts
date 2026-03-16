import { type Context, Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import HelloWorld from "./hello-world";

const html = String.raw;
const app = new Hono();

app.use("/*", serveStatic({ root: "./dist" }));

// This returns HTML that includes server-side rendered wrec components.
app.get("/greet", async (c: Context) => {
  const name = c.req.query("name");
  let template = html`
    <p>The following components are server-side rendered:</p>
    ${HelloWorld.ssr()} ${HelloWorld.ssr({ name: "SSR" })}
  `;
  return c.html(template);
});

serve(app, (info) => {
  console.log(`listening on port ${info.port}`);
});
