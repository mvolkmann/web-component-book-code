var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
import { minLength, range, regex, required } from "./decorators.js";
let Residence = (() => {
    let _city_decorators;
    let _city_initializers = [];
    let _city_extraInitializers = [];
    let _zip_decorators;
    let _zip_initializers = [];
    let _zip_extraInitializers = [];
    let _years_decorators;
    let _years_initializers = [];
    let _years_extraInitializers = [];
    return class Residence {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _city_decorators = [required, minLength(3)];
            _zip_decorators = [regex("^[0-9]{5}$")];
            _years_decorators = [range(0, 100)];
            __esDecorate(this, null, _city_decorators, { kind: "accessor", name: "city", static: false, private: false, access: { has: obj => "city" in obj, get: obj => obj.city, set: (obj, value) => { obj.city = value; } }, metadata: _metadata }, _city_initializers, _city_extraInitializers);
            __esDecorate(this, null, _zip_decorators, { kind: "accessor", name: "zip", static: false, private: false, access: { has: obj => "zip" in obj, get: obj => obj.zip, set: (obj, value) => { obj.zip = value; } }, metadata: _metadata }, _zip_initializers, _zip_extraInitializers);
            __esDecorate(this, null, _years_decorators, { kind: "accessor", name: "years", static: false, private: false, access: { has: obj => "years" in obj, get: obj => obj.years, set: (obj, value) => { obj.years = value; } }, metadata: _metadata }, _years_initializers, _years_extraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        #city_accessor_storage = __runInitializers(this, _city_initializers, "");
        get city() { return this.#city_accessor_storage; }
        set city(value) { this.#city_accessor_storage = value; }
        #zip_accessor_storage = (__runInitializers(this, _city_extraInitializers), __runInitializers(this, _zip_initializers, ""));
        get zip() { return this.#zip_accessor_storage; }
        set zip(value) { this.#zip_accessor_storage = value; }
        #years_accessor_storage = (__runInitializers(this, _zip_extraInitializers), __runInitializers(this, _years_initializers, 0));
        get years() { return this.#years_accessor_storage; }
        set years(value) { this.#years_accessor_storage = value; }
        constructor() {
            __runInitializers(this, _years_extraInitializers);
        }
    };
})();
export { Residence };
