"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rectSize = (x1, y1, x2, y2) => [Math.abs(x2 - x1), Math.abs(y2 - y1)];
exports.scaleSizeInSize = (w1, h1, w2, h2) => Math.min(w1 / w2, h1 / h2);
//# sourceMappingURL=size.js.map