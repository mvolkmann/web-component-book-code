export function timeMethod<This, Return>(
  originalMethod: (...args: any[]) => Return,
  { kind, name }: ClassMethodDecoratorContext<This>
) {
  if (kind !== "method") {
    throw new Error("This decorator can only be applied to a method.");
  }
  const nameString = String(name);
  return function (this: This, ...args: any[]): Return {
    console.time(nameString);
    const result = originalMethod.call(this, ...args);
    console.timeEnd(nameString);
    return result;
  };
}
