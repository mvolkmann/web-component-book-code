import { createContext } from "@lit/context";

export interface MyContext {
  name: string;
}

export const myContext = createContext<MyContext>("my-context");
