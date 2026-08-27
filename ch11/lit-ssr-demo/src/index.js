import "@lit-labs/ssr-client/lit-element-hydrate-support.js";

const button = document.querySelector("button");
button.addEventListener("click", async () => {
  const res = await fetch("greet?name=SSR");
  const html = await res.text();
  const target = document.getElementById("ssr-content");
  target.setHTMLUnsafe(html);
});
