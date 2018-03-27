"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
exports.translate = (x, y, a, b = a) => [x + a, y + b];
exports.scale = (x, y, a, b = a) => [x * a, y * b];
const rotateAround = (x, y, radians, oX, oY) => {
    const [sX, sY] = exports.scale(oX, oY, -1);
    const [tX, tY] = exports.translate(x, y, sX, sY);
    const [rX, rY] = exports.rotateRadians(tX, tY, radians);
    return exports.translate(rX, rY, oX, oY);
};
exports.rotateRadians = (x, y, radians, oX = 0, oY = 0) => {
    if (oX !== 0 || oY !== 0)
        return rotateAround(x, y, radians, oX, oY);
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const rX = (x * cos) - (y * sin);
    const rY = (y * cos) + (x * sin);
    return [rX, rY];
};
exports.rotate = (x, y, degrees, oX = 0, oY = 0) => exports.rotateRadians(x, y, util_1.degreesToRadians(degrees), oX, oY);
exports.vectorRadians = (radians, length) => [Math.cos(radians) * length, Math.sin(radians) * length];
exports.vector = (degrees, length) => exports.vectorRadians(util_1.degreesToRadians(degrees), length);
//# sourceMappingURL=point.js.map