"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const point_1 = require("./point");
const size_1 = require("./size");
const util_1 = require("./util");
exports.RECT_TOP_LEFT = 0;
exports.RECT_BOTTOM_RIGHT = 1;
exports.translateRect = (r, by) => {
    const p = point_1.translatePoint(r, by);
    return {
        x: p.x,
        y: p.y,
        width: r.width,
        height: r.height
    };
};
exports.scaleRect = (r, by) => {
    if (util_1.is.number(by)) {
        return {
            x: r.x * by,
            y: r.y * by,
            width: r.width * by,
            height: r.height * by
        };
    }
    const { x = 1, y = 1, width = 1, height = 1 } = by;
    return {
        x: r.x * x,
        y: r.y * y,
        width: r.width * width,
        height: r.height * height
    };
};
exports.assertRect = (p) => {
    if (!util_1.is.rect(p))
        throw Error('Expected a Rect');
};
exports.cloneRect = ({ x, y, width, height }) => ({ x, y, width, height });
exports.rect = (x = 0, y = 0, width = 0, height = 0) => {
    x = Number(x);
    y = Number(y);
    width = Number(width);
    height = Number(height);
    return { x, y, width, height };
};
exports.emptyRect = () => exports.rect();
exports.rectFromArray = (arr) => exports.rect(...arr);
exports.rectFromString = (str) => exports.rectFromArray(util_1.splitOnCommaAndSpace(str));
exports.rectFromSize = ({ width, height }) => ({
    x: 0,
    y: 0,
    width, height
});
exports.rectFromPoint = ({ x, y }) => ({
    x: 0,
    y: 0,
    width: x,
    height: y
});
exports.rectFromPointAndSize = ({ x, y }, { width, height }) => ({ x, y, width, height });
exports.rectFromLine = (l) => {
    const { start, end } = l;
    const { x, y } = start;
    const { width, height } = size_1.sizeFromLine(l);
    return { x, y, width, height };
};
exports.rectCenter = (r) => {
    const sizeP = size_1.sizeCenter(r);
    return point_1.translatePoint(r, sizeP);
};
exports.rectFromEdges = (e) => ({
    x: e.left,
    y: e.top,
    width: e.right - e.left,
    height: e.bottom - e.top
});
exports.rectToEdges = (r) => ({
    top: r.y,
    right: r.x + r.width,
    bottom: r.y + r.height,
    left: r.x
});
exports.rectToCorners = (r) => ({
    topLeft: point_1.clonePoint(r),
    topRight: point_1.translatePoint(r, { x: r.width }),
    bottomRight: point_1.translatePoint(r, { x: r.width, y: r.height }),
    bottomLeft: point_1.translatePoint(r, { y: r.height })
});
exports.rectFromPoints = (topLeft, bottomRight) => ({
    x: topLeft.x,
    y: topLeft.y,
    width: bottomRight.x - topLeft.x,
    height: bottomRight.y - topLeft.y
});
exports.rectFromPointArray = (points) => exports.rectFromPoints(points[exports.RECT_TOP_LEFT], points[exports.RECT_BOTTOM_RIGHT]);
exports.rectFromCorners = ({ topLeft, bottomRight }) => exports.rectFromPoints(topLeft, bottomRight);
//# sourceMappingURL=rect.js.map