import { Option } from "../option/option";
export declare const ResultType: {
    Ok: symbol;
    Err: symbol;
};
export interface Match<T, E, U> {
    ok: (val: T) => U;
    err: (val: E) => U;
}
export interface Result<T, E> {
    type: symbol;
    isOk(): boolean;
    isErr(): boolean;
    ok(): Option<T>;
    err(): Option<E>;
    unwrap(): T | never;
    unwrapOr(optb: T): T;
    unwrapOrElse(fn: (err: E) => T): T;
    unwrapErr(): E | never;
    match<U>(fn: Match<T, E, U>): U;
    map<U>(fn: (val: T) => U): Result<U, E>;
    mapErr<U>(fn: (err: E) => U): Result<T, U>;
    andThen<U>(fn: (val: T) => Result<U, E>): Result<U, E>;
    orElse<U>(fn: (err: E) => Result<U, E>): Result<T, E> | Result<U, E>;
}
export interface ResOk<T, E = never> extends Result<T, E> {
    unwrap(): T;
    unwrapOr(optb: T): T;
    unwrapOrElse(fn: (err: E) => T): T;
    unwrapErr(): never;
    match<U>(fn: Match<T, never, U>): U;
    map<U>(fn: (val: T) => U): ResOk<U, never>;
    mapErr<U>(fn: (err: E) => U): ResOk<T, never>;
    andThen<U>(fn: (val: T) => Result<U, E>): Result<U, E>;
    orElse<U>(fn: (err: E) => Result<U, E>): Result<T, E>;
}
export interface ResErr<T, E> extends Result<T, E> {
    unwrap(): never;
    unwrapOr(optb: T): T;
    unwrapOrElse(fn: (err: E) => T): T;
    unwrapErr(): E;
    match<U>(fn: Match<never, E, U>): U;
    map<U>(fn: (val: T) => U): ResErr<never, E>;
    mapErr<U>(fn: (err: E) => U): ResErr<never, U>;
    andThen<U>(fn: (val: T) => Result<U, E>): ResErr<never, E>;
    orElse<U>(fn: (err: E) => Result<U, E>): Result<U, E>;
}
export declare function Ok<T, E = never>(val: T): ResOk<T, E>;
export declare function Err<T, E>(err: E): ResErr<T, E>;
export declare function isOk<T, E>(val: Result<T, E>): val is ResOk<T>;
export declare function isErr<T, E>(val: Result<T, E>): val is ResErr<T, E>;
//# sourceMappingURL=result.d.ts.map