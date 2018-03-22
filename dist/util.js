"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is = {
    number: (value) => typeof value === 'number',
    point: (value) => value && exports.is.number(value.x) && exports.is.number(value.y),
    line: (value) => exports.is.array(value) && exports.is.point(value[0]) && exports.is.point(value[1]),
    array: (value) => Array.isArray(value),
};
exports.trimAndFilter = (strings) => strings.map(s => s.trim()).filter(s => s !== '');
exports.splitOnCommaAndSpace = (str) => exports.trimAndFilter(str.split(/[, ]/));
//# sourceMappingURL=util.js.map