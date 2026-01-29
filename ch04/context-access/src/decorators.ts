export function logField<This, Value>(
  _target: undefined, // always undefined in field decorators
  context: ClassFieldDecoratorContext<This, Value>,
) {
  if (context.kind !== "field") {
    throw new Error("This decorator can only be applied to a field.");
  }
  context.addInitializer(function (this: This) {
    const name = String(context.name);
    const initialValue = context.access.get(this);
    console.log(`Initial value of ${name} field is ${initialValue}.`);
    if (initialValue === "random") {
      // Changes the value to a string containing a random number.
      context.access.set(this, String(Math.random()) as Value);
    }
  });
}

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
