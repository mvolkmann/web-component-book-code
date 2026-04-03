import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "hello-world": {
        name?: string;
        ref?: any;
      };
      "radio-group": {
        name: string;
        labels: string;
        ref?: any;
        value: string;
        values: string;
        onChange?: (event: Event) => void;
      };
    }
  }
}
