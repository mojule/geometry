"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is = {
    number: (value) => typeof value === 'number',
    point: (value) => value && exports.is.number(value.x) && exports.is.number(value.y),
    line: (value) => value && exports.is.point(value.start) && exports.is.point(value.end),
    size: (value) => value && exports.is.number(value.width) && exports.is.number(value.height),
    rect: (value) => value && exports.is.point(value) && exports.is.size(value),
    array: (value) => Array.isArray(value),
};
exports.trimAndFilter = (strings) => strings.map(s => s.trim()).filter(s => s !== '');
exports.splitOnCommaAndSpace = (str) => exports.trimAndFilter(str.split(/[, ]/));
//# sourceMappingURL=util.js.map