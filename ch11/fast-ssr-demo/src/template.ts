import { html } from "@microsoft/fast-element";

export type TemplateBinding<TSource> = (source: TSource) => unknown;
export type TemplateBindings<TSource> = Record<string, TemplateBinding<TSource>>;

// Creates a FAST template from an f-template and binding expressions.
export function createTemplate<TSource>(templateHTML: string, bindings: TemplateBindings<TSource>) {
  const match = /<template>([\s\S]*)<\/template>/.exec(templateHTML);
  const templateContent = match?.[1].trim() ?? "";
  const pattern = /{{\s*([\w.]+)\s*}}/g;
  const strings: string[] = [];
  const values: TemplateBinding<TSource>[] = [];
  let lastIndex = 0;

  for (const match of templateContent.matchAll(pattern)) {
    const bindingName = match[1];
    const binding = bindings[bindingName];
    if (!binding) {
      throw new Error(`Missing template binding for "${bindingName}".`);
    }

    strings.push(templateContent.slice(lastIndex, match.index));
    values.push(binding);
    lastIndex = match.index + match[0].length;
  }

  strings.push(templateContent.slice(lastIndex));
  Object.defineProperty(strings, "raw", { value: strings });

  return html(strings as unknown as TemplateStringsArray, ...values);
}
