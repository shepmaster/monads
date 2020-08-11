import { Option } from "../option/option";
export declare const EitherType: {
    Left: symbol;
    Right: symbol;
};
export interface Match<L, R, U> {
    left: (val: L) => U;
    right: (val: R) => U;
}
export interface Either<L, R> {
    type: symbol;
    isLeft(): boolean;
    isRight(): boolean;
    left(): Option<L>;
    leftAndThen<U>(fn: (val: L) => Either<U, R>): Either<U, R>;
    right(): Option<R>;
    rightAndThen<U>(fn: (val: R) => Either<L, U>): Either<L, U>;
    unwrap(): L | R;
    unwrapLeft(): L | never;
    unwrapLeftOr(other: L): L;
    unwrapLeftOrElse(fn: (right: R) => L): L;
    unwrapRight(): R | never;
    unwrapRightOr(other: R): R;
    unwrapRightOrElse(fn: (left: L) => R): R;
    match<U>(fn: Match<L, R, U>): U;
    map<U>(fn: (val: L | R) => U): Either<U, U>;
    mapLeft<U>(fn: (left: L) => U): Either<U, R>;
    mapRight<U>(fn: (right: R) => U): Either<L, U>;
}
export interface ResLeft<L, R> extends Either<L, R> {
    unwrap(): L;
    unwrapLeft(): L;
    unwrapRight(): never;
    match<U>(fn: Match<L, never, U>): U;
    map<U>(fn: (val: L | R) => U): ResLeft<U, never>;
    mapLeft<U>(fn: (left: L) => U): Either<U, never>;
    mapRight<U>(fn: (right: R) => U): ResLeft<L, never>;
}
export interface ResRight<L, R> extends Either<L, R> {
    unwrap(): R;
    unwrapLeft(): never;
    unwrapRight(): R;
    match<U>(fn: Match<never, R, U>): U;
    map<U>(fn: (val: L | R) => U): ResRight<never, U>;
    mapLeft<U>(fn: (left: L) => U): Either<never, R>;
    mapRight<U>(fn: (right: R) => U): ResRight<never, U>;
}
export declare function Left<L, R>(val: L): ResLeft<L, R>;
export declare function Right<L, R>(val: R): ResRight<L, R>;
export declare function isLeft<L, R>(val: Either<L, R>): val is ResLeft<L, R>;
export declare function isRight<L, R>(val: Either<L, R>): val is ResRight<L, R>;
//# sourceMappingURL=either.d.ts.map