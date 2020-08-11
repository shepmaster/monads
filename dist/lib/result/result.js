"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isErr = exports.isOk = exports.Err = exports.Ok = exports.ResultType = void 0;
const option_1 = require("../option/option");
exports.ResultType = {
    Ok: Symbol(":ok"),
    Err: Symbol(":err"),
};
function Ok(val) {
    return {
        type: exports.ResultType.Ok,
        isOk() {
            return true;
        },
        isErr() {
            return false;
        },
        ok() {
            return option_1.Some(val);
        },
        err() {
            return option_1.None;
        },
        unwrap() {
            return val;
        },
        unwrapOr(_optb) {
            return val;
        },
        unwrapOrElse(_fn) {
            return val;
        },
        unwrapErr() {
            throw new ReferenceError("Cannot unwrap Err value of Result.Ok");
        },
        match(matchObject) {
            return matchObject.ok(val);
        },
        map(fn) {
            return Ok(fn(val));
        },
        mapErr(_fn) {
            return Ok(val);
        },
        andThen(fn) {
            return fn(val);
        },
        orElse(_fn) {
            return Ok(val);
        },
    };
}
exports.Ok = Ok;
function Err(err) {
    return {
        type: exports.ResultType.Err,
        isOk() {
            return false;
        },
        isErr() {
            return true;
        },
        ok() {
            return option_1.None;
        },
        err() {
            return option_1.Some(err);
        },
        unwrap() {
            throw new ReferenceError("Cannot unwrap Ok value of Result.Err");
        },
        unwrapOr(optb) {
            return optb;
        },
        unwrapOrElse(fn) {
            return fn(err);
        },
        unwrapErr() {
            return err;
        },
        match(matchObject) {
            return matchObject.err(err);
        },
        map(_fn) {
            return Err(err);
        },
        mapErr(fn) {
            return Err(fn(err));
        },
        andThen(_fn) {
            return Err(err);
        },
        orElse(fn) {
            return fn(err);
        },
    };
}
exports.Err = Err;
function isOk(val) {
    return val.isOk();
}
exports.isOk = isOk;
function isErr(val) {
    return val.isErr();
}
exports.isErr = isErr;
//# sourceMappingURL=result.js.map