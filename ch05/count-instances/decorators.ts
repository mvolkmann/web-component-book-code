export function countInstances<Value extends new (...args: any[]) => {}>(
  target: Value,
  { kind }: ClassDecoratorContext,
) {
  if (kind !== "class") {
    throw new Error("This decorator can only be applied to a class.");
  }
  return class extends target {
    static #instanceCount = 0;

    constructor(...args: any[]) {
      super(...args);
      (this.constructor as any).#instanceCount++;
    }

    static get instanceCount() {
      return this.#instanceCount;
    }
  };
}
