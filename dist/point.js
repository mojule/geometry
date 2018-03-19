"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
exports.add = (p1, { x = 0, y = 0 }) => ({
    x: p1.x + x,
    y: p1.y + y
});
exports.add3 = (p1, { x = 0, y = 0, z = 0 }) => ({
    x: p1.x + x,
    y: p1.y + y,
    z: p1.z + z
});
exports.subtract = (p1, { x = 0, y = 0 }) => ({
    x: p1.x - x,
    y: p1.y - y
});
exports.subtract3 = (p1, { x = 0, y = 0, z = 0 }) => ({
    x: p1.x - x,
    y: p1.y - y,
    z: p1.z - z
});
exports.multiply = (p1, { x = 0, y = 0 }) => ({
    x: p1.x * x,
    y: p1.y * y
});
exports.multiply3 = (p1, { x = 0, y = 0, z = 0 }) => ({
    x: p1.x * x,
    y: p1.y * y,
    z: p1.z * z
});
exports.createPoint = (...args) => {
    if (args.length === 0)
        return { x: 0, y: 0 };
    if (args.length === 1) {
        let value = args[0];
        if (util_1.is.point(value)) {
            return {
                x: value.x,
                y: value.y
            };
        }
        if (util_1.is.string(value)) {
            value = util_1.trimAndFilter(value.split(/[, ]/));
        }
        if (util_1.is.array(value)) {
            return {
                x: Number(value[0]),
                y: Number(value[1])
            };
        }
        throw Error('Unexpected args');
    }
    return {
        x: Number(args[0]),
        y: Number(args[1])
    };
};
//# sourceMappingURL=point.js.map