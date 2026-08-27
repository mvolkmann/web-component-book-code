import { Hono } from "hono";
import { serve } from "@hono/node-server";
import { serveStatic } from "@hono/node-server/serve-static";
import { ssr as helloWorldSSR } from "./public/hello-world-html.js";
import { ssr as radioGroupSSR } from "./public/radio-group-html.js";

const html = String.raw;
const app = new Hono();

app.use("/*", serveStatic({ root: "./public" }));

app.get("/hello-world", (c) => {
  const name = c.req.query("name");
  return c.html(html`
    <div>The following content was server-side rendered:</div>
    ${helloWorldSSR()} ${helloWorldSSR(name)}
  `);
});

// This returns a new page of HTML that includes
// server-side rendered web components.
app.get("/new-page", (c) => {
  return c.html(html`
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <title>New Page</title>
        <script type="module">
          import "./hello-world.js";
        </script>
      </head>
      <body>
        <p>The following are server-side rendered web components.</p>
        <hello-world></hello-world>
        <hello-world name="SSR"></hello-world>
      </body>
    </html>
  `);
});

app.get("/radio-group", (c) => {
  const labels = c.req.query("labels");
  const name = c.req.query("name");
  const value = c.req.query("value");
  const values = c.req.query("values");
  return c.html(radioGroupSSR({ labels, name, value, values }));
});

serve(app, (info) => {
  console.log(`listening on port ${info.port}`);
});
