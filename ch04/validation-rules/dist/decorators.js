// VERY IMPORTANT!
// Ensure the metadata global Symbol exists before any classes are loaded.
Symbol.metadata ??= Symbol("Symbol.metadata");
function fieldOrAccessor({ kind }) {
    if (kind !== "field" && kind !== "accessor") {
        throw new Error("This decorator can only be applied to a class field or accessor.");
    }
}
function addValidationRule(context, rule) {
    const { metadata } = context;
    let constraints = metadata["constraints"];
    if (!constraints)
        constraints = metadata.constraints = {};
    const name = String(context.name);
    constraints[name] ??= [];
    constraints[name].push(rule);
}
export function required(target, context) {
    fieldOrAccessor(context);
    addValidationRule(context, {
        validate: (v) => v !== undefined && v !== null && v !== "",
        message: `${String(context.name)} is required`,
    });
}
export function range(min, max) {
    return (target, context) => {
        fieldOrAccessor(context);
        addValidationRule(context, {
            validate: (v) => min <= v && v <= max,
            message: `${String(context.name)} must be between ${min} and ${max}`,
        });
    };
}
export function minLength(len) {
    return (target, context) => {
        fieldOrAccessor(context);
        addValidationRule(context, {
            validate: (v) => v.length >= len,
            message: `${String(context.name)} must be at least ${len} characters`,
        });
    };
}
export function regex(pattern) {
    return (target, context) => {
        fieldOrAccessor(context);
        addValidationRule(context, {
            validate: (v) => new RegExp(pattern).test(v),
            message: `${String(context.name)} must match pattern ${pattern}`,
        });
    };
}
export function validate(instance) {
    const metadata = instance.constructor[Symbol.metadata] ?? {};
    const constraints = metadata["constraints"] ?? {};
    const errors = [];
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
