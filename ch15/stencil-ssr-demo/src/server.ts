import { type Context, Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { renderToString } from '../hydrate';

const html = String.raw;
const app = new Hono();

app.use('/*', serveStatic({ root: './dist' }));

// This returns HTML that includes server-side rendered Stencil components.
app.get('/greet', async (c: Context) => {
  const name = c.req.query('name');
  const template = html`
    <p>The following are server-side rendered Stencil components.</p>
    <hello-world></hello-world>
    <hello-world name=${name}></hello-world>
  `;
  const results = await renderToString(template);
  return c.html(results.html);
});

serve(app, info => {
  console.log(`listing on port ${info.port}`);
});
