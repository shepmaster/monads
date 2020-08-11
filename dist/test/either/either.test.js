"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const either_1 = require("../../lib/either/either");
describe("Either", () => {
    function getLeftAssertion(type) {
        return (scenario) => {
            it("correctly creates an instance of Left with value '" +
                scenario.value +
                "'", () => {
                const subject = either_1.Left(scenario.value);
                expect(subject.type).toEqual(either_1.EitherType.Left);
                expect(subject.isLeft()).toEqual(true);
                expect(subject.isRight()).toEqual(false);
                expect(subject.left().isSome()).toEqual(true);
                expect(subject.right().isSome()).toEqual(false);
                expect(subject.unwrapLeft()).toEqual(scenario.value);
                expect(() => subject.unwrapRight()).toThrow();
                if (either_1.isLeft(subject)) {
                    expect(typeof subject.unwrap()).toEqual(type.toLowerCase());
                    expect(subject.unwrap()).toEqual(scenario.value);
                }
                else {
                    throw new Error("Has to be _Left!");
                }
            });
        };
    }
    function getRightAssertion(type) {
        return (scenario) => {
            it("correctly creates an instance of Right with value '" +
                scenario.value +
                "'", () => {
                const subject = either_1.Right(scenario.value);
                expect(subject.type).toEqual(either_1.EitherType.Right);
                expect(subject.isLeft()).toEqual(false);
                expect(subject.isRight()).toEqual(true);
                expect(subject.left().isSome()).toEqual(false);
                expect(subject.right().isSome()).toEqual(true);
                expect(() => subject.unwrapLeft()).toThrow();
                expect(subject.unwrapRight()).toEqual(scenario.value);
                if (either_1.isRight(subject)) {
                    expect(typeof subject.unwrap()).toEqual(type.toLowerCase());
                    expect(subject.unwrap()).toEqual(scenario.value);
                }
                else {
                    throw new Error("Has to be _Right!");
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
        const assertionLeft = getLeftAssertion(type);
        const assertionRight = getRightAssertion(type);
        scenarios.forEach(assertionLeft);
        scenarios.forEach(assertionRight);
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
        const assertionLeft = getLeftAssertion(type);
        const assertionRight = getRightAssertion(type);
        scenarios.forEach(assertionLeft);
        scenarios.forEach(assertionRight);
    });
    describe("String", () => {
        const type = "String";
        const scenarios = [
            { value: "" },
            { value: "bla" },
            { value: typeof 1 },
            { value: String("abc") },
        ];
        const assertionLeft = getLeftAssertion(type);
        const assertionRight = getRightAssertion(type);
        scenarios.forEach(assertionLeft);
        scenarios.forEach(assertionRight);
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
        const assertionLeft = getLeftAssertion(type);
        const assertionRight = getRightAssertion(type);
        scenarios.forEach(assertionLeft);
        scenarios.forEach(assertionRight);
    });
    describe("Object", () => {
        const type = "Object";
        const scenarios = [
            { value: { a: 1 } },
            { value: [1, 2, 4] },
            { value: new Date() },
        ];
        const assertionLeft = getLeftAssertion(type);
        const assertionRight = getRightAssertion(type);
        scenarios.forEach(assertionLeft);
        scenarios.forEach(assertionRight);
    });
    describe("RegEx", () => {
        const val = /s/;
        it("correctly creates an instance of Left with value '" + val + "'", () => {
            const subject = either_1.Left(val);
            expect(subject.type).toEqual(either_1.EitherType.Left);
            expect(subject.isLeft()).toEqual(true);
            expect(subject.isRight()).toEqual(false);
            if (either_1.isLeft(subject)) {
                const type = typeof subject.unwrap();
                expect(type === "function" || type === "object").toEqual(true);
                expect(subject.unwrap()).toEqual(val);
            }
            else {
                throw new Error("Has to be _Left!");
            }
        });
        it("correctly creates an instance of Right with value '" + val + "'", () => {
            const subject = either_1.Right(val);
            expect(subject.type).toEqual(either_1.EitherType.Right);
            expect(subject.isLeft()).toEqual(false);
            expect(subject.isRight()).toEqual(true);
            if (either_1.isRight(subject)) {
                const type = typeof subject.unwrapRight();
                expect(type === "function" || type === "object").toEqual(true);
                expect(subject.unwrapRight()).toEqual(val);
            }
            else {
                throw new Error("Has to be _Right!");
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
        const assertionLeft = (scenario) => {
            it("Left works correctly", () => {
                const subject = either_1.Left(scenario.value);
                expect(subject.type).toEqual(either_1.EitherType.Left);
                expect(subject.isLeft()).toEqual(true);
                expect(subject.isRight()).toEqual(false);
                expect(subject.unwrap()).toEqual(scenario.value);
                expect(subject.unwrapLeft()).toEqual(scenario.value);
            });
        };
        const assertionRight = (scenario) => {
            it("Right works correctly", () => {
                const subject = either_1.Right(scenario.value);
                expect(subject.type).toEqual(either_1.EitherType.Right);
                expect(subject.isLeft()).toEqual(false);
                expect(subject.isRight()).toEqual(true);
                expect(subject.unwrap()).toEqual(scenario.value);
                expect(subject.unwrapRight()).toEqual(scenario.value);
            });
        };
        scenarios.forEach(assertionLeft);
        scenarios.forEach(assertionRight);
    });
    describe("left", () => {
        it("converts value into Some for Left", () => {
            const string = either_1.Left("123");
            const subject = string.left();
            expect(subject.isSome()).toEqual(true);
            expect(subject.unwrap()).toEqual("123");
        });
        it("converts value into None for Right", () => {
            const string = either_1.Right("123");
            const subject = string.left();
            expect(subject.isNone()).toEqual(true);
        });
    });
    describe("leftAndThen", () => {
        it("correctly returns new either on Left", () => {
            const left = either_1.Left(2);
            const subject1 = left.leftAndThen((int) => either_1.Left(int * int));
            expect(subject1.isLeft()).toEqual(true);
            expect(subject1.unwrap()).toEqual(4);
            const subject2 = left.leftAndThen((int) => either_1.Right(int * 10));
            expect(subject2.isRight()).toEqual(true);
            expect(subject2.unwrap()).toEqual(20);
        });
        it("doesn't change Right val on Right", () => {
            const right = either_1.Right("error");
            const subject = right.leftAndThen((int) => either_1.Left(int * int));
            expect(subject.isRight()).toEqual(true);
            expect(subject.unwrapRight()).toEqual("error");
        });
    });
    describe("right", () => {
        it("converts value into Some for Right", () => {
            const string = either_1.Right("123");
            const subject = string.right();
            expect(subject.isSome()).toEqual(true);
            expect(subject.unwrap()).toEqual("123");
        });
        it("converts value into None for Left", () => {
            const string = either_1.Left("123");
            const subject = string.right();
            expect(subject.isNone()).toEqual(true);
        });
    });
    describe("rightAndThen", () => {
        it("correctly returns new either on Right", () => {
            const right = either_1.Right(2);
            const subject1 = right.rightAndThen((int) => either_1.Right(int * int));
            expect(subject1.isRight()).toEqual(true);
            expect(subject1.unwrap()).toEqual(4);
            const subject2 = right.rightAndThen((int) => either_1.Left(int * 10));
            expect(subject2.isLeft()).toEqual(true);
            expect(subject2.unwrap()).toEqual(20);
        });
        it("doesn't change Left val on Left", () => {
            const left = either_1.Left("three");
            const subject = left.rightAndThen((int) => either_1.Right(int * int));
            expect(subject.isLeft()).toEqual(true);
            expect(subject.unwrapLeft()).toEqual("three");
        });
    });
    describe("unwrap", () => {
        it("unwraps when Either is left or right", () => {
            const string_left = either_1.Left("123");
            const subject1 = string_left.unwrap();
            expect(subject1).toEqual("123");
            const string_right = either_1.Right("456");
            const subject2 = string_right.unwrap();
            expect(subject2).toEqual("456");
        });
    });
    describe("unwrapLeft", () => {
        it("unwraps when Either is left", () => {
            const string_left = either_1.Left("123");
            const subject = string_left.unwrapLeft();
            expect(subject).toEqual("123");
        });
        it("throws when Either is right", () => {
            const string_right = either_1.Right("123");
            const subject = () => string_right.unwrapLeft();
            expect(subject).toThrow(ReferenceError);
            expect(subject).toThrow("Cannot unwrap Left value of Either.Right");
        });
    });
    describe("unwrapLeftOr", () => {
        it("unwraps original value when Either is left", () => {
            const string_left = either_1.Left("123");
            const subject = string_left.unwrapLeftOr("456");
            expect(subject).toEqual("123");
        });
        it("unwraps other value when Either is right", () => {
            const string_left = either_1.Right("123");
            const subject = string_left.unwrapLeftOr("456");
            expect(subject).toEqual("456");
        });
    });
    describe("unwrapLeftOrElse", () => {
        it("unwraps original value when Either is left", () => {
            const string_left = either_1.Left("123");
            const subject = string_left.unwrapLeftOrElse((_) => "456");
            expect(subject).toEqual("123");
        });
        it("unwraps other value when Either is right", () => {
            const string_left = either_1.Right("123");
            const subject = string_left.unwrapLeftOrElse((_) => "456");
            expect(subject).toEqual("456");
        });
        it("doesn't call fn when Either is left", () => {
            const string_left = either_1.Left("123");
            const subject = jest.fn();
            string_left.unwrapLeftOrElse(subject);
            expect(subject).not.toBeCalled();
        });
    });
    describe("unwrapRight", () => {
        it("unwraps when Either is right", () => {
            const string_right = either_1.Right("123");
            const subject = string_right.unwrapRight();
            expect(subject).toEqual("123");
        });
        it("throws when Either is left", () => {
            const string_left = either_1.Left("123");
            const subject = () => string_left.unwrapRight();
            expect(subject).toThrow(ReferenceError);
            expect(subject).toThrow("Cannot unwrap Right value of Either.Left");
        });
    });
    describe("unwrapRightOr", () => {
        it("unwraps original value when Either is right", () => {
            const string_right = either_1.Right("123");
            const subject = string_right.unwrapRightOr("456");
            expect(subject).toEqual("123");
        });
        it("unwraps other value when Either is left", () => {
            const string_right = either_1.Left("123");
            const subject = string_right.unwrapRightOr("456");
            expect(subject).toEqual("456");
        });
    });
    describe("unwrapRightOrElse", () => {
        it("unwraps original value when Either is right", () => {
            const string_right = either_1.Right("123");
            const subject = string_right.unwrapRightOrElse((_) => "456");
            expect(subject).toEqual("123");
        });
        it("unwraps other value when Either is left", () => {
            const string_right = either_1.Left("123");
            const subject = string_right.unwrapRightOrElse((_) => "456");
            expect(subject).toEqual("456");
        });
        it("doesn't call fn when Either is right", () => {
            const string_right = either_1.Right("123");
            const subject = jest.fn();
            string_right.unwrapRightOrElse(subject);
            expect(subject).not.toBeCalled();
        });
    });
    describe("match", () => {
        it("matches Either and returns transformed value", () => {
            function getMessage(data) {
                return data.match({
                    left: (_) => `Left: ${_}`,
                    right: (_) => `Right: ${_}`,
                });
            }
            expect(getMessage(either_1.Left("left"))).toEqual(`Left: left`);
            expect(getMessage(either_1.Right("right"))).toEqual(`Right: right`);
        });
    });
    describe("map", () => {
        it("maps Left and Right and returns transformed Either", () => {
            const string_left = either_1.Left("123");
            const string_right = either_1.Right("456");
            const subject1 = string_left.map((_) => parseInt(_, 10));
            const subject2 = string_right.map((_) => parseInt(_, 10));
            expect(subject1.unwrap()).toEqual(123);
            expect(subject2.unwrap()).toEqual(456);
        });
    });
    describe("mapLeft", () => {
        it("maps Left and returns transformed Either", () => {
            const string = either_1.Left("123");
            const subject = string.mapLeft((_) => parseInt(_, 10));
            expect(subject.unwrap()).toEqual(123);
        });
        it("doesn't maps when Either is right", () => {
            const arr = [1, 2, 3];
            const number = either_1.Right(arr[0]);
            const subject = number.mapLeft((_) => "different value");
            expect(subject.unwrap()).toEqual(1);
        });
        it("doesn't call fn when Either is right", () => {
            const string_right = either_1.Right("123");
            const subject = jest.fn();
            string_right.mapLeft(subject);
            expect(subject).not.toBeCalled();
        });
    });
    describe("mapRight", () => {
        it("maps Right and returns transformed Either", () => {
            const string = either_1.Right("123");
            const subject = string.mapRight((_) => parseInt(_, 10));
            expect(subject.unwrap()).toEqual(123);
        });
        it("doesn't maps when Either is left", () => {
            const arr = [1, 2, 3];
            const number = either_1.Left(arr[0]);
            const subject = number.mapRight((_) => "different value");
            expect(subject.unwrap()).toEqual(1);
        });
        it("doesn't call fn when Either is left", () => {
            const string_left = either_1.Left("123");
            const subject = jest.fn();
            string_left.mapRight(subject);
            expect(subject).not.toBeCalled();
        });
    });
});
//# sourceMappingURL=either.test.js.map