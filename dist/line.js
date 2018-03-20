"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const point_1 = require("./point");
const util_1 = require("./util");
exports.LINE_START = 0;
exports.LINE_END = 1;
exports.intersection = (line1, line2) => {
    const [p1, p2] = line1;
    const [p3, p4] = line2;
    const x1 = p1.x;
    const y1 = p1.y;
    const x2 = p2.x;
    const y2 = p2.y;
    const x3 = p3.x;
    const y3 = p3.y;
    const x4 = p4.x;
    const y4 = p4.y;
    const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (!denom)
        return;
    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
    return {
        x: x1 + ua * (x2 - x1),
        y: y1 + ua * (y2 - y1)
    };
};
exports.assertLine = (l) => {
    if (!util_1.is.line(l))
        throw Error('Expected a Line');
};
exports.line = (x1 = 0, y1 = 0, x2 = 0, y2 = 0) => [point_1.point(x1, y1), point_1.point(x2, y2)];
exports.lineFromPoints = (start, end) => [point_1.clonePoint(start), point_1.clonePoint(end)];
exports.emptyLine = () => [point_1.point(), point_1.point()];
exports.cloneLine = (l) => l.map(point_1.clonePoint);
exports.lineFromArray = (arr) => exports.line(...arr);
exports.lineFromString = (str) => exports.lineFromArray(util_1.splitOnCommaAndSpace(str));
//# sourceMappingURL=line.js.map