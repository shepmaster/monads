"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var either_1 = require("./either/either");
Object.defineProperty(exports, "Left", { enumerable: true, get: function () { return either_1.Left; } });
Object.defineProperty(exports, "Right", { enumerable: true, get: function () { return either_1.Right; } });
Object.defineProperty(exports, "isLeft", { enumerable: true, get: function () { return either_1.isLeft; } });
Object.defineProperty(exports, "isRight", { enumerable: true, get: function () { return either_1.isRight; } });
var option_1 = require("./option/option");
Object.defineProperty(exports, "Some", { enumerable: true, get: function () { return option_1.Some; } });
Object.defineProperty(exports, "None", { enumerable: true, get: function () { return option_1.None; } });
Object.defineProperty(exports, "isSome", { enumerable: true, get: function () { return option_1.isSome; } });
Object.defineProperty(exports, "isNone", { enumerable: true, get: function () { return option_1.isNone; } });
var result_1 = require("./result/result");
Object.defineProperty(exports, "Ok", { enumerable: true, get: function () { return result_1.Ok; } });
Object.defineProperty(exports, "Err", { enumerable: true, get: function () { return result_1.Err; } });
Object.defineProperty(exports, "isOk", { enumerable: true, get: function () { return result_1.isOk; } });
Object.defineProperty(exports, "isErr", { enumerable: true, get: function () { return result_1.isErr; } });
//# sourceMappingURL=index.js.map