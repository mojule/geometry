"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is = {
    number: (value) => typeof value === 'number',
    string: (value) => typeof value === 'string',
    stringOrNumber: (value) => exports.is.number(value) || exports.is.string(value),
    point: (value) => value && exports.is.number(value.x) && exports.is.number(value.y),
    line: (value) => exports.is.array(value) && exports.is.point(value[0]) && exports.is.point(value[1]),
    array: (value) => Array.isArray(value),
    numberArray: (value) => exports.is.array(value) && value.every(exports.is.number),
    stringArray: (value) => exports.is.array(value) && value.every(exports.is.string),
    stringOrNumberArray: (value) => exports.is.array(value) && value.every(exports.is.stringOrNumber),
    pointArray: (value) => exports.is.array(value) && value.every(exports.is.point),
    lineArray: (value) => exports.is.array(value) && value.every(exports.is.line)
};
exports.trimAndFilter = (strings) => strings.map(s => s.trim()).filter(s => s !== '');
exports.splitOnCommaAndSpace = (str) => exports.trimAndFilter(str.split(/[, ]/));
//# sourceMappingURL=util.js.map