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

export function on(eventName: string) {
  return function (
    method: (this: HTMLElement, ...args: any[]) => any,
    context: ClassMethodDecoratorContext
  ) {
    if (context.kind !== "method") {
      throw new Error("This decorator can only be applied to a method.");
    }
    context.addInitializer(function () {
      const element = this as HTMLElement;
      element.addEventListener(eventName, (event: Event) => {
        method.call(element, event);
      });
    });
  };
}
