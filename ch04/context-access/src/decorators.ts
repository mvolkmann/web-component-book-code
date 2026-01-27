export function fieldLog<This, Value>(
  _target: undefined, // always undefined in field decorators
  context: ClassFieldDecoratorContext<This, Value>
) {
  if (context.kind !== "field") {
    throw new Error("This decorator can only be applied to a field.");
  }
  context.addInitializer(function (this: This) {
    const name = String(context.name);
    const initialValue = context.access.get(this);
    console.log(`${name} initial value is ${initialValue}`);
    if (initialValue === "random") {
      // Changes the value to a string containing a random number.
      context.access.set(this, String(Math.random()) as Value);
    }
  });
}

export function accessorLog<This, Value>(
  target: ClassAccessorDecoratorTarget<This, Value>,
  context: ClassAccessorDecoratorContext<This, Value>
) {
  if (context.kind !== "accessor") {
    throw new Error(
      "This decorator can only be applied to " +
        'a field with the "accessor" keyword.'
    );
  }

  const name = String(context.name);
  return {
    init(initialValue: Value) {
      console.log(`${name} initial value is ${initialValue}`);
      return initialValue;
    },
    get(this: This) {
      // Using the following line results in infinite recursion
      // because the get method just calls itself.
      //const value = context.access.get(this);

      const value = target.get.call(this) as Value;
      console.log(`${name} value = ${value}`);
      return value;
    },
    set(this: This, value: Value) {
      // This line and the next are equivalent.
      //const oldValue = context.access.get(this);
      const oldValue = target.get.call(this) as Value;
      console.log(`${name} changing from "${oldValue}" to "${value}"`);
      target.set.call(this, value);
    },
  };
}
