import { defineVitestConfig } from "@stencil/vitest/config";
import { stencilVitestPlugin } from "@stencil/vitest/plugin";
import { playwright } from "@vitest/browser-playwright";

export default defineVitestConfig({
  stencilConfig: "./stencil.config.ts",
  test: {
    projects: [
      {
        plugins: [stencilVitestPlugin()],
        test: {
          environment: "stencil",
          globals: true,
          include: ["src/**/*.spec.{ts,tsx}"],
          name: "spec",
          setupFiles: ["./vitest-spec-setup.ts"],
        },
      },
      {
        test: {
          browser: {
            enabled: true,
            headless: true,
            instances: [{ browser: "chromium" }],
            provider: playwright(),
          },
          globals: true,
          include: ["src/**/*.e2e.{ts,tsx}"],
          name: "browser",
          setupFiles: ["./vitest-setup.ts"],
        },
      },
    ],
  },
});
