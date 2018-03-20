"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
exports.addPoint = (p1, { x = 0, y = 0 }) => ({
    x: p1.x + x,
    y: p1.y + y
});
exports.subtractPoint = (p1, { x = 0, y = 0 }) => ({
    x: p1.x - x,
    y: p1.y - y
});
exports.multiplyPoint = (p1, { x = 0, y = 0 }) => ({
    x: p1.x * x,
    y: p1.y * y
});
exports.assertPoint = (p) => {
    if (!util_1.is.point(p))
        throw Error('Expected a Point');
};
exports.clonePoint = (p) => {
    const { x, y } = p;
    return { x, y };
};
exports.point = (x = 0, y = 0) => {
    x = Number(x);
    y = Number(y);
    return { x, y };
};
exports.emptyPoint = () => exports.point();
exports.pointFromArray = (arr) => exports.point(...arr);
exports.pointFromString = (str) => exports.pointFromArray(util_1.splitOnCommaAndSpace(str));
//# sourceMappingURL=point.js.map