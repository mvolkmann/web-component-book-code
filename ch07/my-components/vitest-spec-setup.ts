import { vi } from "vitest";

vi.spyOn(HTMLElement.prototype, "attachInternals").mockReturnValue({
  setFormValue: vi.fn(),
} as unknown as ElementInternals);
