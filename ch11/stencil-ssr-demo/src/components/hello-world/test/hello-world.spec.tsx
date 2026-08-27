import { newSpecPage } from "@stencil/core/testing";
import { HelloWorld } from "../hello-world";
import { describe, expect, it } from "@jest/globals";

describe("hello-world", () => {
  it("renders", async () => {
    const page = await newSpecPage({
      components: [HelloWorld],
      html: `<hello-world></hello-world>`,
    });
    expect(page.root).toEqualHtml(`
      <hello-world>
        <mock:shadow-root>
          <p>Hello, World!</p>
        </mock:shadow-root>
      </hello-world>
    `);
  });
});
