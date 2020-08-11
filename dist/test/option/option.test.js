"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const option_1 = require("../../lib/option/option");
describe("Option", () => {
    function getAssertion(type) {
        return (scenario) => {
            it("correctly creates an instance of Some with value '" +
                scenario.value +
                "'", () => {
                const subject = option_1.Some(scenario.value);
                expect(subject.type).toEqual(option_1.OptionType.Some);
                expect(subject.isSome()).toEqual(true);
                expect(subject.isNone()).toEqual(false);
                expect(subject.unwrapOr({})).toEqual(scenario.value);
                expect(typeof subject.unwrap()).toEqual(type.toLowerCase());
                expect(subject.unwrap()).toEqual(scenario.value);
            });
        };
    }
    describe("Some", () => {
        describe("Boolean", () => {
            const type = "Boolean";
            const scenarios = [
                { value: true },
                { value: false },
                { value: Boolean(true) },
            ];
            const assertion = getAssertion(type);
            scenarios.forEach(assertion);
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
            const assertion = getAssertion(type);
            scenarios.forEach(assertion);
        });
        describe("String", () => {
            const type = "String";
            const scenarios = [
                { value: "" },
                { value: "bla" },
                { value: typeof 1 },
                { value: String("abc") },
            ];
            const assertion = getAssertion(type);
            scenarios.forEach(assertion);
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
            const assertion = getAssertion(type);
            scenarios.forEach(assertion);
        });
        describe("Object", () => {
            const type = "Object";
            const scenarios = [
                { value: { a: 1 } },
                { value: [1, 2, 4] },
                { value: new Date() },
            ];
            const assertion = getAssertion(type);
            scenarios.forEach(assertion);
        });
        describe("RegEx", () => {
            const val = /s/;
            it("correctly creates an instance of Option with value '" + val + "'", () => {
                const subject = option_1.Some(val);
                expect(subject.type).toEqual(option_1.OptionType.Some);
                expect(subject.isSome()).toEqual(true);
                expect(subject.isNone()).toEqual(false);
                expect(subject.unwrapOr(val)).toEqual(val);
                const type = typeof subject.unwrap();
                expect(type === "function" || type === "object").toEqual(true);
                expect(subject.unwrap()).toEqual(val);
            });
        });
        describe("Undefined, Null", () => {
            it("undefined is treated as None, null is a valid Some", () => {
                expect(option_1.Some().isSome()).toEqual(false);
                expect(option_1.Some(undefined).isSome()).toEqual(false);
                expect(option_1.Some(null).isSome()).toEqual(true);
            });
            const array = ["a", "b"];
            const outOfBoundIndex = array.length + 1;
            const object = {
                a: "_a",
                b: "_b",
            };
            const outOfBoundProperty = "z";
            const scenarios = [
                { value: undefined },
                { value: array[outOfBoundIndex] },
                { value: object[outOfBoundProperty] },
            ];
            const assertion = (scenario) => {
                it(`is None when trying to access out of bound index, property or variable (${scenario}),
          calling unwrap() impossible`, () => {
                    const subject = option_1.Some(scenario.value);
                    expect(subject.type).toEqual(option_1.OptionType.None);
                    expect(subject.isNone()).toEqual(true);
                    expect(subject.isSome()).toEqual(false);
                    expect(() => subject.unwrap()).toThrow();
                });
            };
            scenarios.forEach(assertion);
        });
        describe("match", () => {
            it("correctly matches Some and returns transformed value", () => {
                const string = option_1.Some("string");
                const subject = string.match({
                    some: (str) => str.toUpperCase(),
                    none: "OTHER STRING",
                });
                expect(subject).toEqual("STRING");
            });
            it("correctly matches None and returns fallback value", () => {
                const arr = [1, 2, 3];
                const maybeNumber = option_1.Some(arr[arr.length + 1]);
                const subject = maybeNumber.match({
                    some: (_) => _ * 2,
                    none: NaN,
                });
                expect(subject).toEqual(NaN);
            });
        });
        describe("map", () => {
            it("correctly maps Some and returns a new Some with transformed value", () => {
                const string = option_1.Some("123");
                const subject = string.map((_) => parseInt(_, 10));
                expect(option_1.isSome(subject) ? subject.unwrap() : undefined).toEqual(123);
            });
        });
    });
    describe("None", () => {
        it("correctly creates its instance, returns correct value when calling unwrapOr()", () => {
            const subject = option_1.None;
            expect(subject.type).toEqual(option_1.OptionType.None);
            expect(subject.isNone()).toEqual(true);
            expect(subject.isSome()).toEqual(false);
            expect(subject.unwrapOr("string")).toEqual("string");
        });
        describe("unwrapOr", () => {
            it("should correctly throw if trying to call with undefined or null", () => {
                const subject = option_1.None;
                const array = ["a"];
                const outOfBoundIndex = array.length + 1;
                expect(() => subject.unwrapOr(array[outOfBoundIndex])).toThrow();
            });
        });
        describe("match", () => {
            it("correctly matches None and returns fallback value", () => {
                const subject = option_1.None.match({
                    some: (_) => "something",
                    none: "nothing",
                });
                expect(subject).toEqual("nothing");
            });
        });
        describe("map", () => {
            it("correctly maps Some and returns a new Some with transformed value", () => {
                const subject = option_1.None.map((_) => parseInt(_, 10));
                expect(subject.type).toEqual(option_1.OptionType.None);
            });
        });
    });
    describe("Option", () => {
        describe("match", () => {
            it("correctly matches Some and returns transformed value", () => {
                let a;
                const date = new Date();
                if (true === true) {
                    a = option_1.Some(date);
                }
                else {
                    a = option_1.None;
                }
                const subject = a.match({
                    some: (_) => _.getFullYear(),
                    none: 1994,
                });
                expect(subject).toEqual(date.getFullYear());
            });
            it("correctly matches None and returns fallback value", () => {
                let a;
                const initialValue = true;
                if (1 > 2) {
                    a = option_1.Some(initialValue);
                }
                else {
                    a = option_1.None;
                }
                const subject = a.match({
                    some: (_) => !_,
                    none: initialValue,
                });
                expect(subject).toEqual(initialValue);
            });
            it("correctly matches None and returns fallback value when method provided to none branch", () => {
                const a = option_1.None;
                const subject = a.match({
                    some: (_) => _,
                    none: () => "N/A",
                });
                expect(subject).toEqual("N/A");
            });
        });
        describe("map", () => {
            it("returns transformed Some when method applied to a value that exists", () => {
                const arr = [1, 2, 3];
                const subject = option_1.Some(arr[0]).map((_) => _.toString());
                expect(option_1.isSome(subject) ? subject.unwrap() : undefined).toEqual("1");
            });
            it("returns None when method applied to a value that does not exist", () => {
                const arr = [1, 2, 3];
                const subject = option_1.Some(arr[arr.length + 1]).map((_) => _.toString());
                expect(subject.isNone()).toEqual(true);
            });
            it("throws when transform function throws", () => {
                const arr = [1, 2, 3];
                const subject = () => option_1.Some(arr[0]).map((_) => JSON.parse("{null}"));
                expect(subject).toThrow(SyntaxError); // cos JSON.parse
            });
        });
    });
    describe("constructor", () => {
        it("throws if no value inside", () => {
            expect(() => option_1.some_constructor(undefined)).toThrow();
        });
    });
});
describe("isSome", () => {
    it("should unwrap after a successful preliminary check", () => {
        let a;
        const subject = option_1.Some(42);
        if (option_1.isSome(subject)) {
            a = subject.unwrap();
        }
        else {
            a = 0;
        }
        expect(a).toEqual(42);
    });
    it("should not unwrap after a failing preliminary check", () => {
        const a = ["a", "b", "c"];
        const outOfBoundIndex = a.length + 1;
        let b;
        const subject = option_1.Some(a[outOfBoundIndex]);
        if (option_1.isSome(subject)) {
            b = subject.unwrap();
        }
        else {
            b = "This Is None";
        }
        expect(b).toEqual("This Is None");
    });
});
describe("isNone", () => {
    it("should return true if Option is None", () => {
        const a = ["a", "b", "c"];
        const outOfBoundIndex = a.length + 1;
        let b;
        const subject = option_1.Some(a[outOfBoundIndex]);
        if (option_1.isNone(subject)) {
            b = "Correct";
        }
        else {
            b = "Fail";
        }
        expect(option_1.isNone(subject)).toEqual(true);
        expect(b).toEqual("Correct");
    });
    it("should return false if Option is Some", () => {
        const a = () => null;
        let b;
        const subject = option_1.Some(a);
        if (option_1.isNone(subject)) {
            b = "Fail";
        }
        else {
            b = "Correct";
        }
        expect(option_1.isNone(subject)).toEqual(false);
        expect(b).toEqual("Correct");
    });
    it("should return true if value is None", () => {
        let a;
        const subject = option_1.None;
        if (option_1.isNone(subject)) {
            a = "Correct";
        }
        else {
            a = "Fail";
        }
        expect(option_1.isNone(subject)).toEqual(true);
        expect(a).toEqual("Correct");
    });
});
describe("andThen", () => {
    let contact;
    let driver;
    let truck;
    beforeEach(() => {
        contact = { name: option_1.None };
        driver = { contact: option_1.None };
        truck = { driver: option_1.None };
    });
    it("correctly returns the name as a Some if all properties are Some", () => {
        contact.name = option_1.Some("Name");
        driver.contact = option_1.Some(contact);
        truck.driver = option_1.Some(driver);
        const subject = truck.driver
            .andThen((_) => _.contact)
            .andThen((_) => _.name);
        expect(subject.isSome()).toEqual(true);
        expect(subject.unwrapOr("")).toEqual("Name");
    });
    it("correctly returns None if 'contact.name' is None", () => {
        driver.contact = option_1.Some(contact);
        truck.driver = option_1.Some(driver);
        const subject = truck.driver
            .andThen((_) => _.contact)
            .andThen((_) => _.name);
        expect(subject.isNone()).toEqual(true);
    });
    it("correctly returns None if 'contact' is None", () => {
        contact.name = option_1.Some("Name");
        driver.contact = option_1.None;
        truck.driver = option_1.Some(driver);
        const subject = truck.driver
            .andThen((_) => _.contact)
            .andThen((_) => _.name);
        expect(subject.isNone()).toEqual(true);
    });
    it("correctly returns None if 'driver' is None", () => {
        contact.name = option_1.Some("Name");
        driver.contact = option_1.Some(contact);
        truck.driver = option_1.None;
        const subject = truck.driver
            .andThen((_) => _.contact)
            .andThen((_) => _.name);
        expect(subject.isNone()).toEqual(true);
    });
    it("throws if transform function throws", () => {
        contact.name = option_1.Some("Name");
        driver.contact = option_1.Some(contact);
        truck.driver = option_1.Some(driver);
        const subject = () => truck.driver.andThen((_) => option_1.Some(JSON.parse("{null}")));
        expect(subject).toThrow(SyntaxError);
    });
});
describe("or", () => {
    it("correctly returns Some(a) if 'a' is Some and 'b' is None", () => {
        const a = option_1.Some(123);
        const b = option_1.None;
        const subject = a.or(b);
        expect(subject.isSome()).toEqual(true);
        expect(subject.unwrapOr(0)).toEqual(123);
    });
    it("correctly returns Some(b) if 'a' is None and 'b' is Some", () => {
        const a = option_1.None;
        const b = option_1.Some(456);
        const subject = a.or(b);
        expect(subject.isSome()).toEqual(true);
        expect(subject.unwrapOr(0)).toEqual(456);
    });
    it("correctly returns Some(a) if 'a' is Some and 'b' is Some", () => {
        const a = option_1.Some(11);
        const b = option_1.Some(12);
        const subject = a.or(b);
        expect(subject.isSome()).toEqual(true);
        expect(subject.unwrapOr(0)).toEqual(11);
    });
    it("correctly returns None if 'a' is None and 'b' is None", () => {
        const a = option_1.None;
        const b = option_1.None;
        const subject = a.or(b);
        expect(subject.isNone()).toEqual(true);
    });
});
describe("and", () => {
    it("correctly returns None if 'a' is Some and 'b' is None", () => {
        const a = option_1.Some(123);
        const b = option_1.None;
        const subject = a.and(b);
        expect(subject.isNone()).toEqual(true);
    });
    it("correctly returns None if 'a' is None and 'b' is Some", () => {
        const a = option_1.None;
        const b = option_1.Some(123);
        const subject = a.and(b);
        expect(subject.isNone()).toEqual(true);
    });
    it("correctly returns Some(b) if 'a' is Some and 'b' is Some", () => {
        const a = option_1.Some(123);
        const b = option_1.Some(456);
        const subject = a.and(b);
        expect(subject.isSome()).toEqual(true);
        expect(subject.unwrapOr(0)).toEqual(456);
    });
    it("correctly returns None if 'a' is None and 'b' is None", () => {
        const a = option_1.None;
        const b = option_1.None;
        const subject = a.and(b);
        expect(subject.isNone()).toEqual(true);
    });
});
//# sourceMappingURL=option.test.js.map