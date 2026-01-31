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
  const nameString = String(name); // name is a Symbol
  return {
    init(initialValue: any) {
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

export function logField<This, Value>(
  target: undefined, // always undefined in field decorators
  context: ClassFieldDecoratorContext<This, Value>,
) {
  if (context.kind !== "field") {
    throw new Error("This decorator can only be applied to a field.");
  }
  const name = String(context.name);
  return (initialValue: Value) => {
    console.log(`The initial value of the ${name} field is ${initialValue}.`);
    if (initialValue === "random") return String(Math.random()) as Value;
    return initialValue;
  };
}
