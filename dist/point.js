"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
exports.translatePoint = (p, { x = 0, y = 0 }) => ({
    x: p.x + x,
    y: p.y + y
});
exports.scalePoint = (p, by) => {
    if (util_1.is.number(by)) {
        return {
            x: p.x * by,
            y: p.y * by
        };
    }
    const { x = 1, y = 1 } = by;
    return {
        x: p.x * x,
        y: p.y * y
    };
};
exports.rotatePoint = (p, degrees) => {
    const radians = degrees * Math.PI / 180;
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const x = (p.x * cos) - (p.y * sin);
    const y = (p.y * cos) + (p.x * sin);
    return { x, y };
};
exports.rotateAround = (p, origin, degrees) => {
    const translate = exports.scalePoint(origin, -1);
    const translatedPoint = exports.translatePoint(p, translate);
    const rotatedPoint = exports.rotatePoint(translatedPoint, degrees);
    return exports.translatePoint(rotatedPoint, origin);
};
exports.assertPoint = (p) => {
    if (!util_1.is.point(p))
        throw Error('Expected a Point');
};
exports.clonePoint = ({ x, y }) => ({ x, y });
exports.point = (x = 0, y = 0) => {
    x = Number(x);
    y = Number(y);
    return { x, y };
};
exports.emptyPoint = () => exports.point();
exports.pointFromArray = (arr) => exports.point(...arr);
exports.pointFromString = (str) => exports.pointFromArray(util_1.splitOnCommaAndSpace(str));
exports.pointFromSize = (s) => ({
    x: s.width,
    y: s.height
});
exports.pointToEdges = (p) => ({
    top: p.y,
    left: p.x
});
exports.pointFromEdges = (e) => ({
    x: e.left,
    y: e.top
});
exports.vector = (l) => ({
    x: l.end.x - l.start.x,
    y: l.end.y - l.start.y
});
//# sourceMappingURL=point.js.map