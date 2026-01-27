import "solid-js";

declare module "solid-js" {
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
    interface Fragment {}
  }
}
