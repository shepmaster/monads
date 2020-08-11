"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const result_1 = require("../../lib/result/result");
describe("Result", () => {
    function getOkAssertion(type) {
        return (scenario) => {
            it("correctly creates an instance of Ok with value '" +
                scenario.value +
                "'", () => {
                const subject = result_1.Ok(scenario.value);
                expect(subject.type).toEqual(result_1.ResultType.Ok);
                expect(subject.isOk()).toEqual(true);
                expect(subject.isErr()).toEqual(false);
                expect(() => subject.unwrapErr()).toThrow();
                expect(subject.unwrapOr("")).toEqual(scenario.value);
                if (result_1.isOk(subject)) {
                    expect(typeof subject.unwrap()).toEqual(type.toLowerCase());
                    expect(subject.unwrap()).toEqual(scenario.value);
                }
                else {
                    throw new Error("Has to be _Ok!");
                }
            });
        };
    }
    function getErrAssertion(type) {
        return (scenario) => {
            it("correctly creates an instance of Err with value '" +
                scenario.value +
                "'", () => {
                const subject = result_1.Err(scenario.value);
                expect(subject.type).toEqual(result_1.ResultType.Err);
                expect(subject.isOk()).toEqual(false);
                expect(subject.isErr()).toEqual(true);
                expect(() => subject.unwrap()).toThrow();
                expect(subject.unwrapOr("optb")).toEqual("optb");
                if (result_1.isErr(subject)) {
                    expect(typeof subject.unwrapErr()).toEqual(type.toLowerCase());
                    expect(subject.unwrapErr()).toEqual(scenario.value);
                }
                else {
                    throw new Error("Has to be _Err!");
                }
            });
        };
    }
    describe("Boolean", () => {
        const type = "Boolean";
        const scenarios = [
            { value: true },
            { value: false },
            { value: Boolean(true) },
        ];
        const assertionOk = getOkAssertion(type);
        const assertionErr = getErrAssertion(type);
        scenarios.forEach(assertionOk);
        scenarios.forEach(assertionErr);
    });
    describe("Number", () => {
        const type = "Number";
        const scenarios = [
            { value: 37 },
            { value: 3.14 },
            { value: 0 },
            { value: Math.LN2 },
            { value: Infinity },
            { value: NaN },
            { value: Number(1) },
        ];
        const assertionOk = getOkAssertion(type);
        const assertionErr = getErrAssertion(type);
        scenarios.forEach(assertionOk);
        scenarios.forEach(assertionErr);
    });
    describe("String", () => {
        const type = "String";
        const scenarios = [
            { value: "" },
            { value: "bla" },
            { value: typeof 1 },
            { value: String("abc") },
        ];
        const assertionOk = getOkAssertion(type);
        const assertionErr = getErrAssertion(type);
        scenarios.forEach(assertionOk);
        scenarios.forEach(assertionErr);
    });
    describe("Function", () => {
        const type = "Function";
        const scenarios = [
            {
                value() {
                    return undefined;
                },
            },
            {
                value: class C {
                },
            },
            { value: Math.sin },
        ];
        const assertionOk = getOkAssertion(type);
        const assertionErr = getErrAssertion(type);
        scenarios.forEach(assertionOk);
        scenarios.forEach(assertionErr);
    });
    describe("Object", () => {
        const type = "Object";
        const scenarios = [
            { value: { a: 1 } },
            { value: [1, 2, 4] },
            { value: new Date() },
        ];
        const assertionOk = getOkAssertion(type);
        const assertionErr = getErrAssertion(type);
        scenarios.forEach(assertionOk);
        scenarios.forEach(assertionErr);
    });
    describe("RegEx", () => {
        const val = /s/;
        it("correctly creates an instance of Ok with value '" + val + "'", () => {
            const subject = result_1.Ok(val);
            expect(subject.type).toEqual(result_1.ResultType.Ok);
            expect(subject.isOk()).toEqual(true);
            expect(subject.isErr()).toEqual(false);
            if (result_1.isOk(subject)) {
                const type = typeof subject.unwrap();
                expect(type === "function" || type === "object").toEqual(true);
                expect(subject.unwrap()).toEqual(val);
            }
            else {
                throw new Error("Has to be _Ok!");
            }
        });
        it("correctly creates an instance of Err with value '" + val + "'", () => {
            const subject = result_1.Err(val);
            expect(subject.type).toEqual(result_1.ResultType.Err);
            expect(subject.isOk()).toEqual(false);
            expect(subject.isErr()).toEqual(true);
            if (result_1.isErr(subject)) {
                const type = typeof subject.unwrapErr();
                expect(type === "function" || type === "object").toEqual(true);
                expect(subject.unwrapErr()).toEqual(val);
            }
            else {
                throw new Error("Has to be _Err!");
            }
        });
    });
    describe("Undefined, Null", () => {
        const array = ["a", "b"];
        const outOfBoundIndex = array.length + 1;
        const object = { a: "_a", b: "_b" };
        const outOfBoundProperty = "z";
        const scenarios = [
            { value: undefined },
            { value: null },
            { value: array[outOfBoundIndex] },
            { value: [null][0] },
            { value: object[outOfBoundProperty] },
            { value: { _: null }._ },
        ];
        const assertionOk = (scenario) => {
            it("Ok works correctly", () => {
                const subject = result_1.Ok(scenario.value);
                expect(subject.type).toEqual(result_1.ResultType.Ok);
                expect(subject.isOk()).toEqual(true);
                expect(subject.isErr()).toEqual(false);
                expect(subject.unwrap()).toEqual(scenario.value);
            });
        };
        const assertionErr = (scenario) => {
            it("Err works correctly", () => {
                const subject = result_1.Err(scenario.value);
                expect(subject.type).toEqual(result_1.ResultType.Err);
                expect(subject.isOk()).toEqual(false);
                expect(subject.isErr()).toEqual(true);
                expect(subject.unwrapErr()).toEqual(scenario.value);
            });
        };
        scenarios.forEach(assertionOk);
        scenarios.forEach(assertionErr);
    });
    describe("ok_or", () => {
        it("returns optb correctly", () => {
            let string = result_1.Ok("foo");
            expect(string.unwrapOr("bar")).toEqual("foo");
            string = result_1.Err("foo");
            expect(string.unwrapOr("bar")).toEqual("bar");
        });
    });
    describe("match", () => {
        it("correctly matches Ok and returns transformed value", () => {
            const string = result_1.Ok("string");
            const subject = string.match({
                ok: (_) => _.toUpperCase(),
                err: (_) => _,
            });
            expect(subject).toEqual("STRING");
        });
        it("correctly matches Err and returns fallback value", () => {
            const arr = [1, 2, 3];
            const number = result_1.Err(arr[0]);
            const subject = number.match({
                ok: (_) => 0,
                err: (_) => _,
            });
            expect(subject).toEqual(1);
        });
        it("correctly matches Result and returns fallback value", () => {
            function getMessage(data) {
                return data.match({
                    ok: (_) => `Success: ${_}`,
                    err: (_) => `Error: ${_}`,
                });
            }
            expect(getMessage(result_1.Ok("ok"))).toEqual(`Success: ok`);
            expect(getMessage(result_1.Err("err"))).toEqual(`Error: err`);
        });
    });
    describe("map", () => {
        it("correctly maps Ok and returns transformed Result", () => {
            const string = result_1.Ok("123");
            const subject = string.map((_) => parseInt(_, 10));
            expect(subject.unwrap()).toEqual(123);
        });
        it("correctly returns untouched Err when trying to use map", () => {
            const arr = [1, 2, 3];
            const number = result_1.Err(arr[0]);
            const subject = number.map((_) => "different value");
            expect(subject.unwrapErr()).toEqual(1);
        });
        it("correctly maps Result and returns transformed value", () => {
            function getMessage(data) {
                return data.map((_) => parseInt(_, 10));
            }
            let subject = getMessage(result_1.Ok("123"));
            expect(result_1.isOk(subject) ? subject.unwrap() : 0).toEqual(123);
            subject = getMessage(result_1.Err("123"));
            expect(result_1.isErr(subject) ? subject.unwrapErr() : "0").toEqual("123");
        });
    });
    describe("mapErr", () => {
        it("correctly maps on Err and returns transformed Result", () => {
            const err = result_1.Err("unknown error");
            const subject = err.mapErr((errStr) => errStr.toUpperCase());
            expect(subject.isErr()).toEqual(true);
            expect(subject.unwrapErr()).toEqual("UNKNOWN ERROR");
        });
        it("doesn't change Ok val on Ok", () => {
            const ok = result_1.Ok("value");
            const subject = ok.mapErr((errNum) => errNum.toString());
            expect(subject.isOk()).toEqual(true);
            expect(subject.unwrap()).toEqual("value");
        });
    });
    describe("andThen", () => {
        it("correctly returns new result on Ok", () => {
            const ok = result_1.Ok(2);
            const subject = ok.andThen((int) => result_1.Ok(int * int));
            expect(subject.isOk()).toEqual(true);
            expect(subject.unwrap()).toEqual(4);
        });
        it("doesn't change Err val on Err", () => {
            const err = result_1.Err("error");
            const subject = err.andThen((int) => result_1.Ok(int * int));
            expect(subject.isErr()).toEqual(true);
            expect(subject.unwrapErr()).toEqual("error");
        });
    });
    describe("orElse", () => {
        it("correctly returns ok value of this on Ok", () => {
            const ok = result_1.Ok(2);
            const subject = ok.orElse(() => result_1.Ok(5));
            expect(subject.isOk()).toEqual(true);
            expect(subject.unwrap()).toEqual(2);
        });
        it("correctly return alternative new value on error", () => {
            const err = result_1.Err(2);
            const subject = err.orElse((int) => result_1.Ok(int * int));
            expect(subject.isOk()).toEqual(true);
            expect(subject.unwrap()).toEqual(4);
        });
        it("correctly chain multiple (Ok) statements", () => {
            const doubleOr12 = (int) => (int * 2 === 16 ? result_1.Ok(12) : result_1.Err(int * 2));
            const subject = doubleOr12(2)
                .orElse(doubleOr12)
                .orElse(doubleOr12)
                .orElse(doubleOr12);
            expect(subject.isOk()).toEqual(true);
            expect(subject.unwrap()).toEqual(12);
        });
    });
    describe("unwrap", () => {
        it("unwraps when Result is ok", () => {
            const string_ok = result_1.Ok("123");
            const subject = string_ok.unwrap();
            expect(subject).toEqual("123");
        });
        it("throws when Result is err", () => {
            const string_err = result_1.Err("123");
            const subject = () => string_err.unwrap();
            expect(subject).toThrow(ReferenceError);
            expect(subject).toThrow("Cannot unwrap Ok value of Result.Err");
        });
    });
    describe("unwrapOr", () => {
        it("unwraps original value when Result is ok", () => {
            const string_ok = result_1.Ok("123");
            const subject = string_ok.unwrapOr("456");
            expect(subject).toEqual("123");
        });
        it("unwraps optb when Result is err", () => {
            const string_err = result_1.Err("123");
            const subject = string_err.unwrapOr("456");
            expect(subject).toEqual("456");
        });
    });
    describe("unwrapOrElse", () => {
        it("unwraps original value when Result is ok", () => {
            const string_ok = result_1.Ok("123");
            const subject = string_ok.unwrapOrElse((s) => s + "456");
            expect(subject).toEqual("123");
        });
        it("executes the function when Result is err", () => {
            const string_err = result_1.Err("123");
            const subject = string_err.unwrapOrElse((s) => s + "456");
            expect(subject).toEqual("123456");
        });
    });
    describe("unwrapErr", () => {
        it("unwraps error when Result is err", () => {
            const string_err = result_1.Err("123");
            const subject = string_err.unwrapErr();
            expect(subject).toEqual("123");
        });
        it("throws when Result is ok", () => {
            const string_ok = result_1.Ok("123");
            const subject = () => string_ok.unwrapErr();
            expect(subject).toThrow(ReferenceError);
            expect(subject).toThrow("Cannot unwrap Err value of Result.Ok");
        });
    });
    describe("ok", () => {
        it("converts value into Some for Ok", () => {
            const string = result_1.Ok("123");
            const subject = string.ok();
            expect(subject.isSome()).toEqual(true);
            expect(subject.unwrap()).toEqual("123");
        });
        it("converts value into None for Err", () => {
            const string = result_1.Err("123");
            const subject = string.ok();
            expect(subject.isNone()).toEqual(true);
        });
    });
    describe("err", () => {
        it("converts value into Some for Err", () => {
            const string = result_1.Err("123");
            const subject = string.err();
            expect(subject.isSome()).toEqual(true);
            expect(subject.unwrap()).toEqual("123");
        });
        it("converts value into None for Ok", () => {
            const string = result_1.Ok("123");
            const subject = string.err();
            expect(subject.isNone()).toEqual(true);
        });
    });
});
//# sourceMappingURL=result.test.js.map