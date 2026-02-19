import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { ssr } from "./hello-world-html.js";

const app = new Hono();

app.use("/*", serveStatic({ root: "./public" }));

app.get("/hello-world", (c) => {
  const name = c.req.query("name");
  return c.html(`
    <div>The following components are server-side rendered:</div>
    ${ssr()}
    ${ssr(name)}
  `);
});

export default app;
