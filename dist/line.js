"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const point_1 = require("./point");
const util_1 = require("./util");
exports.intersection = (l1, l2) => {
    const x1 = l1.start.x;
    const y1 = l1.start.y;
    const x2 = l1.end.x;
    const y2 = l1.end.y;
    const x3 = l2.start.x;
    const y3 = l2.start.y;
    const x4 = l2.end.x;
    const y4 = l2.end.y;
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
exports.line = (start, end) => ({ start, end });
exports.lineFromValues = (x1 = 0, y1 = 0, x2 = 0, y2 = 0) => ({
    start: point_1.point(x1, y1),
    end: point_1.point(x2, y2)
});
exports.lineFromPoint = (p) => exports.line(point_1.point(), p);
exports.emptyLine = () => exports.line(point_1.point(), point_1.point());
exports.cloneLine = (l) => ({
    start: point_1.clonePoint(l.start),
    end: point_1.clonePoint(l.end)
});
exports.lineFromArray = (arr) => exports.lineFromValues(...arr);
exports.lineFromString = (str) => exports.lineFromArray(util_1.splitOnCommaAndSpace(str));
exports.lineFromSize = (s) => exports.line(point_1.point(), point_1.pointFromSize(s));
exports.lineFromRect = (r) => exports.line(point_1.clonePoint(r), point_1.point(r.width + r.x, r.height + r.y));
//# sourceMappingURL=line.js.map