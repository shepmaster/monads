"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isNone = exports.isSome = exports.none_constructor = exports.some_constructor = exports.None = exports.Some = exports.OptionType = void 0;
exports.OptionType = {
    Some: Symbol(":some"),
    None: Symbol(":none"),
};
function Some(val) {
    return typeof val === "undefined"
        ? none_constructor()
        : some_constructor(val);
}
exports.Some = Some;
exports.None = none_constructor();
function some_constructor(val) {
    if (typeof val === "undefined") {
        throw new TypeError("Some has to contain a value. Constructor received undefined.");
    }
    return {
        type: exports.OptionType.Some,
        isSome() {
            return true;
        },
        isNone() {
            return false;
        },
        match(fn) {
            return fn.some(val);
        },
        map(fn) {
            return some_constructor(fn(val));
        },
        andThen(fn) {
            return fn(val);
        },
        or(_optb) {
            return this;
        },
        and(optb) {
            return optb;
        },
        unwrapOr(_def) {
            return val;
        },
        unwrap() {
            return val;
        },
    };
}
exports.some_constructor = some_constructor;
function none_constructor() {
    return {
        type: exports.OptionType.None,
        isSome() {
            return false;
        },
        isNone() {
            return true;
        },
        match(matchObject) {
            const { none } = matchObject;
            if (typeof none === "function") {
                return none();
            }
            return none;
        },
        map(_fn) {
            return none_constructor();
        },
        andThen(_fn) {
            return none_constructor();
        },
        or(optb) {
            return optb;
        },
        and(_optb) {
            return none_constructor();
        },
        unwrapOr(def) {
            if (def == null) {
                throw new Error("Cannot call unwrapOr with a missing value.");
            }
            return def;
        },
        unwrap() {
            throw new ReferenceError("Trying to unwrap None.");
        },
    };
}
exports.none_constructor = none_constructor;
function isSome(val) {
    return val.isSome();
}
exports.isSome = isSome;
function isNone(val) {
    return val.isNone();
}
exports.isNone = isNone;
//# sourceMappingURL=option.js.map