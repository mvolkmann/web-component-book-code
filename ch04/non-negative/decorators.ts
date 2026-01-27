export function nonNegative<This>(
  target: (value: number) => void,
  context: ClassSetterDecoratorContext<This>
) {
  return function (this: This, newValue: number) {
    if (newValue < 0) {
      const name = String(context.name);
      throw new Error(`${name} cannot be negative`);
    }
    target.call(this, newValue);
  };
}
