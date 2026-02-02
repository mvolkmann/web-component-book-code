export function logField<This, Value>(
  _target: undefined, // always undefined in field decorators
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
