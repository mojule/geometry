"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
exports.intersection = (x1, y1, x2, y2, x3, y3, x4, y4) => {
    const denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
    if (!denom)
        return;
    const ua = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / denom;
    const ub = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / denom;
    const x = x1 + ua * (x2 - x1);
    const y = y1 + ua * (y2 - y1);
    return [x, y];
};
exports.lineVector = (x1, y1, x2, y2) => [x2 - x1, y2 - y1];
exports.midLine = (x1, y1, x2, y2) => [(x1 + x2) / 2, (y1 + y2) / 2];
exports.length = (x1, y1, x2, y2) => Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
exports.unitVector = (x1, y1, x2, y2) => {
    const l = exports.length(x1, y1, x2, y2);
    const [vX, vY] = exports.lineVector(x1, y1, x2, y2);
    return [vX / l, vY / l];
};
exports.angleRadians = (x1, y1, x2, y2) => Math.atan2(y2 - y1, x2 - y1);
exports.angle = (x1, y1, x2, y2) => util_1.radiansToDegrees(exports.angleRadians(x1, y1, x2, y2));
exports.bresenhamLine = (x1, y1, x2, y2) => {
    x1 = Math.floor(x1);
    x2 = Math.floor(x2);
    y1 = Math.floor(y1);
    y2 = Math.floor(y2);
    const line = [x1, y1];
    const dX = Math.abs(x2 - x1);
    const dY = Math.abs(y2 - y1);
    const sX = x1 < x2 ? 1 : -1;
    const sY = y1 < y2 ? 1 : -1;
    let err = dX - dY;
    while (x1 !== x2 || y1 !== y2) {
        const err2 = 2 * err;
        if (err2 > dY * -1) {
            err -= dY;
            x1 += sX;
        }
        if (err2 < dX) {
            err += dX;
            y1 += sY;
        }
        line.push(x1);
        line.push(y1);
    }
    return line;
};
//# sourceMappingURL=line.js.map