"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
exports.assertSize = (s) => {
    if (!util_1.is.size(s))
        throw Error('Expected a Size');
};
exports.scaleSize = (s, by) => {
    if (util_1.is.number(by)) {
        return {
            width: s.width * by,
            height: s.height * by
        };
    }
    const { width = 1, height = 1 } = by;
    return {
        width: s.width * width,
        height: s.height * height
    };
};
exports.offsetSize = (s, by) => {
    if (util_1.is.number(by)) {
        return {
            width: s.width + by,
            height: s.height + by
        };
    }
    const { width = 0, height = 0 } = by;
    return {
        width: s.width + width,
        height: s.height + height
    };
};
exports.cloneSize = ({ width, height }) => ({ width, height });
exports.size = (width = 0, height = 0) => {
    width = Number(width);
    height = Number(height);
    return { width, height };
};
exports.emptySize = () => exports.size();
exports.sizeFromArray = (arr) => exports.size(...arr);
exports.sizeFromString = (str) => exports.sizeFromArray(util_1.splitOnCommaAndSpace(str));
exports.sizeFromPoint = (p) => ({
    width: p.x,
    height: p.y
});
exports.sizeFromLine = (l) => ({
    width: l.end.x - l.start.x,
    height: l.end.y - l.start.y
});
exports.sizeCenter = ({ width, height }) => ({
    x: width / 2,
    y: height / 2
});
//# sourceMappingURL=size.js.map