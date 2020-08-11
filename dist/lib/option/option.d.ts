export declare const OptionType: {
    Some: symbol;
    None: symbol;
};
export interface Match<T, U> {
    some: (val: T) => U;
    none: (() => U) | U;
}
export interface Option<T> {
    type: symbol;
    isSome(): boolean;
    isNone(): boolean;
    match<U>(fn: Match<T, U>): U;
    map<U>(fn: (val: T) => U): Option<U>;
    andThen<U>(fn: (val: T) => Option<U>): Option<U>;
    or<U>(optb: Option<U>): Option<T | U>;
    and<U>(optb: Option<U>): Option<U>;
    unwrapOr(def: T): T;
    unwrap(): T | never;
}
export interface OptSome<T> extends Option<T> {
    unwrap(): T;
    map<U>(fn: (val: T) => U): OptSome<U>;
    or<U>(optb: Option<U>): Option<T>;
    and<U>(optb: Option<U>): Option<U>;
}
export interface OptNone<T> extends Option<T> {
    unwrap(): never;
    map<U>(fn: (val: T) => U): OptNone<U>;
    or<U>(optb: Option<U>): Option<U>;
    and<U>(optb: Option<U>): OptNone<U>;
}
export declare function Some<T>(val?: T | undefined): Option<T>;
export declare const None: OptNone<any>;
export declare function some_constructor<T>(val: T): OptSome<T>;
export declare function none_constructor<T>(): OptNone<T>;
export declare function isSome<T>(val: Option<T>): val is OptSome<T>;
export declare function isNone<T>(val: Option<T>): val is OptNone<T>;
//# sourceMappingURL=option.d.ts.map