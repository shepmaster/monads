"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isRight = exports.isLeft = exports.Right = exports.Left = exports.EitherType = void 0;
const option_1 = require("../option/option");
exports.EitherType = {
    Left: Symbol(":left"),
    Right: Symbol(":right"),
};
function Left(val) {
    return {
        type: exports.EitherType.Left,
        isLeft() {
            return true;
        },
        isRight() {
            return false;
        },
        left() {
            return option_1.Some(val);
        },
        leftAndThen(fn) {
            return fn(val);
        },
        right() {
            return option_1.None;
        },
        rightAndThen(_fn) {
            return Left(val);
        },
        unwrap() {
            return val;
        },
        unwrapLeft() {
            return val;
        },
        unwrapLeftOr(_other) {
            return val;
        },
        unwrapLeftOrElse(_fn) {
            return val;
        },
        unwrapRight() {
            throw new ReferenceError("Cannot unwrap Right value of Either.Left");
        },
        unwrapRightOr(other) {
            return other;
        },
        unwrapRightOrElse(fn) {
            return fn(val);
        },
        match(matchObject) {
            return matchObject.left(val);
        },
        map(fn) {
            return Left(fn(val));
        },
        mapLeft(fn) {
            return Left(fn(val));
        },
        mapRight(_fn) {
            return Left(val);
        },
    };
}
exports.Left = Left;
function Right(val) {
    return {
        type: exports.EitherType.Right,
        isLeft() {
            return false;
        },
        isRight() {
            return true;
        },
        left() {
            return option_1.None;
        },
        leftAndThen(_fn) {
            return Right(val);
        },
        right() {
            return option_1.Some(val);
        },
        rightAndThen(fn) {
            return fn(val);
        },
        unwrap() {
            return val;
        },
        unwrapLeft() {
            throw new ReferenceError("Cannot unwrap Left value of Either.Right");
        },
        unwrapLeftOr(other) {
            return other;
        },
        unwrapLeftOrElse(fn) {
            return fn(val);
        },
        unwrapRight() {
            return val;
        },
        unwrapRightOr(_other) {
            return val;
        },
        unwrapRightOrElse(_fn) {
            return val;
        },
        match(matchObject) {
            return matchObject.right(val);
        },
        map(fn) {
            return Right(fn(val));
        },
        mapLeft(_fn) {
            return Right(val);
        },
        mapRight(fn) {
            return Right(fn(val));
        },
    };
}
exports.Right = Right;
function isLeft(val) {
    return val.isLeft();
}
exports.isLeft = isLeft;
function isRight(val) {
    return val.isRight();
}
exports.isRight = isRight;
//# sourceMappingURL=either.js.map