export function rangeValidation(min: number, max: number) {
  return function <This, Value extends number>(
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>
  ): ClassAccessorDecoratorResult<This, Value> {
    function validate(value: Value) {
      if (value < min || value > max) {
        const name = String(context.name);
        throw new Error(`${name} ${value} is outside range ${min} to ${max}`);
      }
    }

    return {
      init(initialValue: Value): Value {
        validate(initialValue);
        return initialValue;
      },
      set(this: This, newValue: Value) {
        validate(newValue);
        target.set.call(this, newValue);
      },
    };
  };
}
