"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.radiansToDegrees = (radians) => radians * 180 / Math.PI;
exports.degreesToRadians = (degrees) => degrees * Math.PI / 180;
exports.approximatelyEqual = (a, b, epsilon = 0.001) => Math.abs(b - a) <= epsilon;
exports.alignCenter = (parent, child) => (parent - child) / 2;
//# sourceMappingURL=util.js.map