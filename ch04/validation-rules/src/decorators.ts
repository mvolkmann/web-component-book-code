// VERY IMPORTANT!
// Ensure the metadata global Symbol exists before any classes are loaded.
(Symbol as any).metadata ??= Symbol("Symbol.metadata");

type ValidationRule = {
  validate: (value: any) => boolean;
  message: string;
};

function fieldOrAccessor({ kind }: DecoratorContext) {
  if (kind !== "field" && kind !== "accessor") {
    throw new Error(
      "This decorator can only be applied to a class field or accessor.",
    );
  }
}

function addValidationRule(context: DecoratorContext, rule: ValidationRule) {
  const { metadata } = context;
  let constraints = metadata["constraints"] as Record<string, ValidationRule[]>;
  if (!constraints) constraints = metadata.constraints = {};
  const name = String(context.name);
  constraints[name] ??= [];
  constraints[name].push(rule);
}

export function required(_target: unknown, context: DecoratorContext) {
  fieldOrAccessor(context);
  addValidationRule(context, {
    validate: (v: unknown) => v !== undefined && v !== null && v !== "",
    message: `${String(context.name)} is required`,
  });
}

export function range(min: number, max: number) {
  return (target: unknown, context: DecoratorContext) => {
    fieldOrAccessor(context);
    addValidationRule(context, {
      validate: (v: number) => min <= v && v <= max,
      message: `${String(context.name)} must be between ${min} and ${max}`,
    });
  };
}

export function minLength(len: number) {
  return (target: unknown, context: DecoratorContext) => {
    fieldOrAccessor(context);
    addValidationRule(context, {
      validate: (v: string) => v.length >= len,
      message: `${String(context.name)} must be at least ${len} characters`,
    });
  };
}

export function regex(pattern: string) {
  return (target: unknown, context: DecoratorContext) => {
    fieldOrAccessor(context);
    addValidationRule(context, {
      validate: (v: string) => new RegExp(pattern).test(v),
      message: `${String(context.name)} must match pattern ${pattern}`,
    });
  };
}

export function validate(instance: Record<string, any>) {
  const metadata = instance.constructor[Symbol.metadata] ?? {};
  const constraints = metadata["constraints"] ?? {};
  const errors: string[] = [];
  for (const [prop, rules] of Object.entries(constraints)) {
    const value = instance[prop];
    for (const rule of rules) {
      if (!rule.validate(value)) {
        errors.push(`${rule.message} (value is ${JSON.stringify(value)})`);
      }
    }
  }
  return {
    valid: errors.length === 0,
    errors,
  };
}
