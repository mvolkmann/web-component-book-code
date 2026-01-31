export function logGetter<This, Return>(
  this: This,
  target: (...args: any[]) => Return,
  { kind }: ClassGetterDecoratorContext<This>,
) {
  if (kind !== "getter") {
    throw new Error("This decorator can only be applied to a getter method.");
  }
  console.log("decorators.ts logGetter: target =", target);
  return function (this: This) {
    const value = target.call(this);
    console.log("decorators.ts logGetter: value =", value);
    // Multiplies numbers by 2.
    return typeof value === "number" ? ((value * 2) as Return) : value;
  };
}

export function logSetter<This, Value>(
  this: This,
  target: (newValue: Value) => void,
  { kind }: ClassSetterDecoratorContext<This>,
) {
  if (kind !== "setter") {
    throw new Error("This decorator can only be applied to a setter method.");
  }
  console.log("decorators.ts logSetter: target =", target);
  return function (this: This, newValue: Value) {
    console.log("decorators.ts logSetter: newValue =", newValue);
    // Adds 3 to numbers.
    if (typeof newValue === "number") newValue = (newValue + 3) as Value;
    return target.call(this, newValue);
  };
}
