export function customElement(name: string) {
  return (target: CustomElementConstructor, context: ClassDecoratorContext) => {
    if (context.kind !== "class") {
      throw new Error("This decorator can only be applied to a class.");
    }
    if (!(target.prototype instanceof HTMLElement)) {
      throw new Error(
        "This decorator can only be applied " +
          "to a class that extends HTMLElement."
      );
    }
    context.addInitializer(() => {
      if (!customElements.get(name)) {
        customElements.define(name, target);
      }
    });
  };
}
