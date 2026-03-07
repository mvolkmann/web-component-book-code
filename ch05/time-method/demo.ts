import { timeMethod } from "./decorators";

function fib(n: number): number {
  if (n <= 1) return n;
  return fib(n - 1) + fib(n - 2);
}

class MathLab {
  @timeMethod
  static fibonacci(n: number): number {
    return fib(n);
  }
}

console.log("fibonacci(20) =", MathLab.fibonacci(20));
