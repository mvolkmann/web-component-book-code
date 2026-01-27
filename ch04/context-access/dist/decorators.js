export function fieldLog(_target, // always undefined in field decorators
context) {
    if (context.kind !== "field") {
        throw new Error("This decorator can only be applied to a field.");
    }
    context.addInitializer(function () {
        const name = String(context.name);
        const initialValue = context.access.get(this);
        console.log(`${name} initial value is ${initialValue}`);
        if (initialValue === "random") {
            // Changes the value to a string containing a random number.
            context.access.set(this, String(Math.random()));
        }
    });
}
export function accessorLog(target, context) {
    if (context.kind !== "accessor") {
        throw new Error("This decorator can only be applied to " +
            'a field with the "accessor" keyword.');
    }
    const name = String(context.name);
    return {
        init(initialValue) {
            console.log(`${name} initial value is ${initialValue}`);
            return initialValue;
        },
        get() {
            // Using the following line results in infinite recursion
            // because the get method just calls itself.
            //const value = context.access.get(this);
            const value = target.get.call(this);
            console.log(`${name} value = ${value}`);
            return value;
        },
        set(value) {
            // This line and the next are equivalent.
            //const oldValue = context.access.get(this);
            const oldValue = target.get.call(this);
            console.log(`${name} changing from "${oldValue}" to "${value}"`);
            target.set.call(this, value);
        },
    };
}
