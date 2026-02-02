export function logAccess<This, Value>(
  target: ClassAccessorDecoratorTarget<This, Value>,
  { kind, name }: ClassAccessorDecoratorContext<This, Value>,
) {
  if (kind !== "accessor") {
    throw new Error(
      "This decorator can only be applied to " +
        'a field with the "accessor" keyword.',
    );
  }
  const nameString = String(name);
  return {
    init(initialValue: Value) {
      console.log(`Initial value of ${nameString} field is ${initialValue}.`);
      return initialValue;
    },
    get(this: This) {
      const value = target.get.call(this);
      console.log(`Getting ${nameString} field value ${value}.`);
      return value;
    },
    set(this: This, value: Value) {
      console.log(`Setting ${nameString} field to ${value}.`);
      target.set.call(this, value);
    },
  };
}
