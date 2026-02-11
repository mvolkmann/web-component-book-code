/** @type { import('@storybook/web-components-vite').Preview } */
import React from "react";
import {
  Controls,
  Description,
  Primary,
  Subtitle,
  Stories,
  Title,
} from "@storybook/addon-docs/blocks";

import { setCustomElementsManifest } from "@storybook/web-components";
import { setStorybookHelpersConfig } from "@wc-toolkit/storybook-helpers";
import manifest from "../custom-elements.json" with { type: "json" };

setCustomElementsManifest(manifest);
setStorybookHelpersConfig({});

const preview = {
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    docs: {
      page: () => (
        <>
          <Title />
          <Subtitle />
          <Description />
          <Primary />
          <Controls />
          <Stories includePrimary={false} />
        </>
      ),
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
  tags: ["autodocs"],
};

export default preview;
