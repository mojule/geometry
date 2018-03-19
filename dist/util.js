"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.is = {
    number: (value) => typeof value === 'number',
    string: (value) => typeof value === 'string',
    array: (value) => Array.isArray(value),
    numberArray: (value) => exports.is.array(value) && value.every(exports.is.number),
    stringArray: (value) => exports.is.array(value) && value.every(exports.is.string),
    point: (value) => value && exports.is.number(value.x) && exports.is.number(value.y)
};
exports.trimAndFilter = (strings) => strings.map(s => s.trim()).filter(s => s !== '');
//# sourceMappingURL=util.js.map