(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";
const H = require("@mojule/h");
const h = H(document);
module.exports = h;

},{"@mojule/h":10}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geometry = require("..");
const h_1 = require("./h");
const { line, point, size, util } = geometry;
const { intersection, lineVector, midLine, length, unitVector, angle, bresenhamLine } = line;
const { translate, scale, rotate, vector } = point;
const { rectSize, scaleSizeInSize } = size;
const { approximatelyEqual, radiansToDegrees, degreesToRadians, alignCenter } = util;
const setSvgAttributes = (el, attributes) => {
    Object.keys(attributes).forEach(name => {
        el.setAttributeNS(null, name, attributes[name]);
    });
    return el;
};
const SvgEl = (name, attributes = {}) => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', name);
    return setSvgAttributes(el, attributes);
};
const exampleSize = {
    width: 400,
    height: 400
};
const exampleCenter = {
    x: exampleSize.width / 2,
    y: exampleSize.height / 2
};
const cellSize = {
    width: 40,
    height: 40
};
const rows = exampleSize.width / cellSize.width;
const columns = exampleSize.height / cellSize.height;
const toCellUnit = (value) => value / cellSize.width;
const Line = (x1, y1, x2, y2, stroke = '#222', strokeWidth = 2) => SvgEl('line', {
    x1: x1 + 0.5,
    y1: y1 + 0.5,
    x2: x2 + 0.5,
    y2: y2 + 0.5,
    stroke,
    'stroke-width': strokeWidth
});
const Point = (x, y, r = 4, fill = '#222') => SvgEl('circle', {
    cx: x + 0.5,
    cy: y + 0.5,
    r,
    fill
});
const Arrow = (id, fill) => {
    const marker = SvgEl('marker', {
        id,
        markerWidth: 10,
        markerHeight: 10,
        refX: 9,
        refY: 3,
        orient: 'auto',
        markerUnits: 'strokeWidth'
    });
    const path = SvgEl('path', {
        d: 'M0,0 L0,6 L9,3 z',
        fill
    });
    marker.appendChild(path);
    return marker;
};
const Svg = (...childNodes) => {
    const svg = SvgEl('svg', {
        viewBox: `0 0 ${exampleSize.width + 2} ${exampleSize.height + 2}`,
        width: exampleSize.width + 2,
        height: exampleSize.height + 2
    });
    const defs = SvgEl('defs');
    const vectorArrow = Arrow('arrow', 'red');
    const lineArrow = Arrow('lineArrow', '#000');
    defs.appendChild(vectorArrow);
    defs.appendChild(lineArrow);
    svg.appendChild(defs);
    for (let row = 0; row <= rows; row++) {
        const line = Line(0, cellSize.height * row, exampleSize.width, cellSize.height * row, '#ccc', 1);
        svg.appendChild(line);
    }
    for (let column = 0; column <= columns; column++) {
        const line = Line(cellSize.width * column, 0, cellSize.width * column, exampleSize.height, '#ccc', 1);
        svg.appendChild(line);
    }
    childNodes.forEach(node => svg.appendChild(node));
    return svg;
};
const ExampleSection = (name, ...childNodes) => {
    return h_1.documentFragment(h_1.section(h_1.h1(name), ...childNodes));
};
const SvgExample = (name, ...childNodes) => h_1.documentFragment(h_1.h2(name), Svg(...childNodes));
const Intersection = () => {
    let x1, y1, x2, y2, x3, y3, x4, y4, p;
    while (!p) {
        x1 = Math.floor(Math.random() * exampleCenter.x);
        y1 = Math.floor(Math.random() * exampleCenter.y);
        x2 = Math.floor(Math.random() * exampleCenter.x + exampleCenter.x);
        y2 = Math.floor(Math.random() * exampleCenter.y + exampleCenter.y);
        x3 = Math.floor(Math.random() * exampleCenter.x);
        y3 = Math.floor(Math.random() * exampleCenter.y + exampleCenter.y);
        x4 = Math.floor(Math.random() * exampleCenter.x + exampleCenter.x);
        y4 = Math.floor(Math.random() * exampleCenter.y);
        p = intersection(x1, y1, x2, y2, x3, y3, x4, y4);
    }
    const [x, y] = p;
    let fx1, fy1, fx2, fy2, fx3, fy3, fx4, fy4;
    let fp = [0, 0];
    while (fp) {
        fx1 = Math.floor(Math.random() * exampleSize.width);
        fy1 = Math.floor(Math.random() * exampleSize.height);
        fx2 = Math.floor(Math.random() * exampleSize.width);
        fy2 = Math.floor(Math.random() * exampleSize.height);
        fx3 = Math.floor(Math.random() * exampleSize.width);
        fy3 = Math.floor(Math.random() * exampleSize.height);
        fx4 = Math.floor(Math.random() * exampleSize.width);
        fy4 = Math.floor(Math.random() * exampleSize.height);
        fp = intersection(fx1, fy1, fx2, fy2, fx3, fy3, fx4, fy4);
    }
    return h_1.documentFragment(SvgExample('intersection( x1, y1, x2, y2, x3, y3, x4, y4 )', setSvgAttributes(Line(x1, y1, x2, y2), { 'marker-end': 'url(#lineArrow)' }), setSvgAttributes(Line(x3, y3, x4, y4), { 'marker-end': 'url(#lineArrow)' }), Point(x1, y1), Point(x3, y3), Point(x, y, 4, 'red')), h_1.div(h_1.code(`intersection( ${[x1, y1, x2, y2, x3, y3, x4, y4].map(toCellUnit).join(', ')} )`)), h_1.div(h_1.code(`[ ${toCellUnit(x)}, ${toCellUnit(y)} ]`)), SvgExample('intersection( x1, y1, x2, y2, x3, y3, x4, y4 )', setSvgAttributes(Line(fx1, fy1, fx2, fy2), { 'marker-end': 'url(#lineArrow)' }), setSvgAttributes(Line(fx3, fy3, fx4, fy4), { 'marker-end': 'url(#lineArrow)' }), Point(fx1, fy1), Point(fx3, fy3)), h_1.div(h_1.code(`intersection( ${[fx1, fy1, fx2, fy2, fx3, fy3, fx4, fy4].map(toCellUnit).join(', ')} )`)), h_1.div(h_1.code(`undefined`)));
};
const LineVector = () => {
    const x1 = Math.floor(Math.random() * exampleCenter.x);
    const y1 = Math.floor(Math.random() * exampleCenter.y);
    const x2 = Math.floor(Math.random() * exampleCenter.x + exampleCenter.x);
    const y2 = Math.floor(Math.random() * exampleCenter.y + exampleCenter.y);
    const p = lineVector(x1, y1, x2, y2);
    const [x, y] = p;
    const vector = Line(0, 0, x, y, 'red');
    setSvgAttributes(vector, {
        'marker-end': 'url(#arrow)'
    });
    return h_1.documentFragment(SvgExample('lineVector( x1, y1, x2, y2 )', Point(x1, y1), setSvgAttributes(Line(x1, y1, x2, y2), { 'marker-end': 'url(#lineArrow)' }), Point(0, 0, 4, 'red'), vector), h_1.div(h_1.code(`lineVector( ${[x1, y1, x2, y2].map(toCellUnit).join(', ')} )`)), h_1.div(h_1.code(`[ ${toCellUnit(x)}, ${toCellUnit(y)} ]`)));
};
const MidLine = () => {
    const x1 = Math.floor(Math.random() * exampleSize.width);
    const y1 = Math.floor(Math.random() * exampleSize.height);
    const x2 = Math.floor(Math.random() * exampleSize.width);
    const y2 = Math.floor(Math.random() * exampleSize.height);
    const p = midLine(x1, y1, x2, y2);
    const [x, y] = p;
    return h_1.documentFragment(SvgExample('midLine( x1, y1, x2, y2 )', Point(x1, y1), setSvgAttributes(Line(x1, y1, x2, y2), { 'marker-end': 'url(#lineArrow)' }), Point(x, y, 4, 'red')), h_1.div(h_1.code(`midLine( ${[x1, y1, x2, y2].map(toCellUnit).join(', ')} )`)), h_1.div(h_1.code(`[ ${toCellUnit(x)}, ${toCellUnit(y)} ]`)));
};
const Length = () => {
    const x1 = Math.floor(Math.random() * exampleSize.width);
    const y1 = Math.floor(Math.random() * exampleSize.height);
    const x2 = Math.floor(Math.random() * exampleSize.width);
    const y2 = Math.floor(Math.random() * exampleSize.height);
    const l = length(x1, y1, x2, y2);
    return h_1.documentFragment(SvgExample('length( x1, y1, x2, y2 )', Point(x1, y1), setSvgAttributes(Line(x1, y1, x2, y2), { 'marker-end': 'url(#lineArrow)' })), h_1.div(h_1.code(`length( ${[x1, y1, x2, y2].map(toCellUnit).join(', ')} )`)), h_1.div(h_1.code(String(toCellUnit(l)))));
};
const UnitVector = () => {
    const x1 = Math.floor(Math.random() * exampleCenter.x);
    const y1 = Math.floor(Math.random() * exampleCenter.y);
    const x2 = Math.floor(Math.random() * exampleCenter.x + exampleCenter.x);
    const y2 = Math.floor(Math.random() * exampleCenter.y + exampleCenter.y);
    const p = unitVector(x1, y1, x2, y2);
    const [x, y] = p;
    const s = scale(x, y, cellSize.width);
    const [sX, sY] = s;
    const vector = Line(0, 0, sX, sY, 'red');
    setSvgAttributes(vector, {
        'marker-end': 'url(#arrow)'
    });
    return h_1.documentFragment(SvgExample('unitVector( x1, y1, x2, y2 )', Point(x1, y1), setSvgAttributes(Line(x1, y1, x2, y2), { 'marker-end': 'url(#lineArrow)' }), Point(0, 0, 4, 'red'), vector), h_1.div(h_1.code(`unitVector( ${[x1, y1, x2, y2].map(toCellUnit).join(', ')} )`)), h_1.div(h_1.code(`[ ${x}, ${y} ]`)));
};
const Angle = () => {
    const x1 = Math.floor(Math.random() * exampleSize.width);
    const y1 = Math.floor(Math.random() * exampleSize.height);
    const x2 = Math.floor(Math.random() * exampleSize.width);
    const y2 = Math.floor(Math.random() * exampleSize.height);
    const a = angle(x1, y1, x2, y2);
    const line = Line(x1, y1, x2, y2);
    setSvgAttributes(line, {
        'marker-end': 'url(#lineArrow)'
    });
    return h_1.documentFragment(SvgExample('angle( x1, y1, x2, y2 )', Point(x1, y1), line), h_1.div(h_1.code(`angle( ${[x1, y1, x2, y2].map(toCellUnit).join(', ')} )`)), h_1.div(h_1.code(String(a))));
};
const BresenhamLine = () => {
    const x1 = Math.floor(Math.random() * 10);
    const y1 = Math.floor(Math.random() * 10);
    const x2 = Math.floor(Math.random() * 10);
    const y2 = Math.floor(Math.random() * 10);
    const l = bresenhamLine(x1, y1, x2, y2);
    const len = l.length / 2;
    const rects = [];
    for (let i = 0; i < len; i++) {
        const x = l[i * 2];
        const y = l[i * 2 + 1];
        const rect = SvgEl('rect', {
            x: x * cellSize.width + 0.5,
            y: y * cellSize.height + 0.5,
            width: cellSize.width,
            height: cellSize.height,
            'stroke-width': 1,
            stroke: '#222',
            fill: '#ccc'
        });
        rects.push(rect);
    }
    const lx1 = (x1 + 1) * cellSize.width - (cellSize.width / 2);
    const ly1 = (y1 + 1) * cellSize.height - (cellSize.height / 2);
    const lx2 = (x2 + 1) * cellSize.width - (cellSize.width / 2);
    const ly2 = (y2 + 1) * cellSize.height - (cellSize.height / 2);
    const svgEx = SvgExample('bresenhamLine( x1, y1, x2, y2 )', ...rects, Point(lx1, ly1), setSvgAttributes(Line(lx1, ly1, lx2, ly2), { 'marker-end': 'url(#lineArrow)' }));
    return h_1.documentFragment(svgEx, h_1.div(h_1.code(`bresenhamLine( ${[x1, y1, x2, y2].join(', ')} )`)), h_1.div(h_1.code(`[ ${l.join(', ')} ]`)));
};
document.addEventListener('DOMContentLoaded', () => {
    const lineExamples = ExampleSection('line', Intersection(), LineVector(), MidLine(), Length(), UnitVector(), Angle(), BresenhamLine());
    const pointExamples = ExampleSection('point');
    const sizeExamples = ExampleSection('size');
    const utilsExamples = ExampleSection('utils');
    const examples = h_1.documentFragment(lineExamples, pointExamples, sizeExamples, utilsExamples);
    document.body.appendChild(examples);
});

},{"..":3,"./h":1}],3:[function(require,module,exports){
"use strict";
const line = require("./line");
const point = require("./point");
const size = require("./size");
const util = require("./util");
const geometry = { line, point, size, util };
module.exports = geometry;

},{"./line":4,"./point":5,"./size":6,"./util":7}],4:[function(require,module,exports){
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

},{"./util":7}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("./util");
exports.translate = (x, y, a, b = a) => [x + a, y + b];
exports.scale = (x, y, a, b = a) => [x * a, y * b];
const rotateAround = (x, y, radians, oX, oY) => {
    const [sX, sY] = exports.scale(oX, oY, -1);
    const [tX, tY] = exports.translate(x, y, sX, sY);
    const [rX, rY] = exports.rotateRadians(tX, tY, radians);
    return exports.translate(rX, rY, oX, oY);
};
exports.rotateRadians = (x, y, radians, oX = 0, oY = 0) => {
    if (oX !== 0 || oY !== 0)
        return rotateAround(x, y, radians, oX, oY);
    const cos = Math.cos(radians);
    const sin = Math.sin(radians);
    const rX = (x * cos) - (y * sin);
    const rY = (y * cos) + (x * sin);
    return [rX, rY];
};
exports.rotate = (x, y, degrees, oX = 0, oY = 0) => exports.rotateRadians(x, y, util_1.degreesToRadians(degrees), oX, oY);
exports.vectorRadians = (radians, length) => [Math.cos(radians) * length, Math.sin(radians) * length];
exports.vector = (degrees, length) => exports.vectorRadians(util_1.degreesToRadians(degrees), length);

},{"./util":7}],6:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rectSize = (x1, y1, x2, y2) => [Math.abs(x2 - x1), Math.abs(y2 - y1)];
exports.scaleSizeInSize = (w1, h1, w2, h2) => Math.min(w1 / w2, h1 / h2);

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.radiansToDegrees = (radians) => radians * 180 / Math.PI;
exports.degreesToRadians = (degrees) => degrees * Math.PI / 180;
exports.approximatelyEqual = (a, b, epsilon = 0.001) => Math.abs(b - a) <= epsilon;
exports.alignCenter = (parent, child) => (parent - child) / 2;

},{}],8:[function(require,module,exports){
'use strict'

const utils = require( '@mojule/utils' )
const data = require( './src/data.json' )

const { clone } = utils

const elementMeta = () => clone( data )

module.exports = elementMeta

},{"./src/data.json":9,"@mojule/utils":14}],9:[function(require,module,exports){
module.exports={
  "html": {
    "content": [ "<head>", "<body>" ],
    "singular": true
  },
  "head": {
    "content": [ "metadata content" ],
    "parent": [ "<html>" ],
    "singular": true
  },
  "body": {
    "categories": [ "sectioning root" ],
    "content": [ "flow content" ],
    "parent": [ "<html>" ],
    "singular": true
  },

  "title": {
    "categories": [ "metadata content" ],
    "content": [ "text" ],
    "parent": [ "<head>" ],
    "singular": true
  },
  "base": {
    "categories": [ "metadata content" ],
    "parent": [ "<head>" ],
    "singular": true
  },
  "link": {
    "categories": [ "metadata content" ],
    "parent": [ "<head>" ]
  },
  "meta": {
    "categories": [ "metadata content" ],
    "parent": [ "<head>" ]
  },
  "style": {
    "categories": [ "metadata content" ],
    "content": [ "text" ],
    "parent": [ "<head>" ]
  },

  "address": {
    "categories": [ "flow content", "palpable content" ],
    "content": [ "flow content" ],
    "disallow": [ "<address>", "heading content", "sectioning content", "<header>", "<footer>" ]
  },
  "article": {
    "categories": [ "flow content", "sectioning content", "palpable content" ],
    "content": [ "flow content" ],
    "disallow": [ "<main>" ],
    "nospec": [ "4.01" ]
  },
  "aside": {
    "categories": [ "flow content", "sectioning content", "palpable content" ],
    "content": [ "flow content" ],
    "disallow": [ "<main>" ],
    "nospec": [ "4.01" ]
  },
  "footer": {
    "categories": [ "flow content", "palpable content" ],
    "content": [ "flow content" ],
    "disallow": [ "<footer>", "<header>", "<main>" ],
    "nospec": [ "4.01" ]
  },
  "header": {
    "categories": [ "flow content", "palpable content" ],
    "content": [ "flow content" ],
    "disallow": [ "<footer>", "<header>", "<main>" ],
    "nospec": [ "4.01" ]
  },
  "h1": {
    "categories": [ "flow content", "heading content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "h2": {
    "categories": [ "flow content", "heading content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "h3": {
    "categories": [ "flow content", "heading content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "h4": {
    "categories": [ "flow content", "heading content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "h5": {
    "categories": [ "flow content", "heading content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "h6": {
    "categories": [ "flow content", "heading content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "nav": {
    "categories": [ "flow content", "sectioning content", "palpable content" ],
    "content": [ "flow content" ],
    "disallow": [ "<main>" ],
    "nospec": [ "4.01" ]
  },

  "blockquote": {
    "categories": [ "flow content", "sectioning root", "palpable content" ],
    "content": [ "flow content" ]
  },
  "dd": {
    "content": [ "flow content" ],
    "parent": [ "<dl>" ],
    "previous": [ "<dt>", "<dd>" ]
  },
  "div": {
    "categories": [ "flow content", "palpable content" ],
    "content": [ "flow content" ]
  },
  "dl": {
    "categories": [ "flow content" ],
    "content": [ "<dt>", "<dd>" ]
  },
  "dt": {
    "content": [ "flow content" ],
    "parent": [ "<dl>" ],
    "disallow": [ "<footer>", "<header>", "sectioning content", "heading content" ],
    "next": [ "<dt>", "<dd>" ]
  },
  "figcaption": {
    "content": [ "flow content" ],
    "parent": [ "<figure>" ],
    "position": [ "first", "last" ],
    "nospec": [ "4.01" ]
  },
  "figure": {
    "categories": [ "flow content", "sectioning root", "palpable content" ],
    "content": [ "flow content", "<figcaption>" ],
    "nospec": [ "4.01" ]
  },
  "hr": {
    "categories": [ "flow content" ]
  },
  "li": {
    "content": [ "flow content" ],
    "parent": [ "<ul>", "<ol>", "<menu>" ]
  },
  "main": {
    "categories": [ "flow content", "palpable content" ],
    "content": [ "flow content" ],
    "nospec": [ "4.01" ]
  },
  "ol": {
    "categories": [ "flow content" ],
    "content": [ "<li>" ],
    "states": {
      ":not(:empty)": {
        "categories": [ "palpable content" ]
      }
    }
  },
  "p": {
    "categories": [ "flow content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "pre": {
    "categories": [ "flow content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "section": {
    "categories": [ "flow content", "sectioning content", "palpable content" ],
    "content": [ "flow content" ],
    "nospec": [ "4.01" ]
  },
  "ul": {
    "categories": [ "flow content" ],
    "content": [ "<li>" ],
    "states": {
      ":not(:empty)": {
        "categories": [ "palpable content" ]
      }
    }
  },

  "a": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "flow content", "phrasing content" ],
    "disallow": [ "interactive content" ],
    "states": {
      "[href]" : {
        "categories": [ "interactive content" ]
      }
    }
  },
  "abbr": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "b": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "bdi": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ],
    "nospec": [ "4.01" ]
  },
  "bdo": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ],
    "nospec": [ "4.01" ]
  },
  "br": {
    "categories": [ "flow content", "phrasing content" ]
  },
  "cite": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "code": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "data": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ],
    "nospec": [ "4.01" ]
  },
  "dfn": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ],
    "disallow": [ "<dfn>" ]
  },
  "em": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "i": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "kbd": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "mark": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ],
    "nospec": [ "4.01" ]
  },
  "q": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "rp": {
    "content": [ "phrasing content" ],
    "parent": [ "<ruby>" ],
    "nospec": [ "4.01" ]
  },
  "rt": {
    "content": [ "phrasing content" ],
    "parent": [ "<ruby>", "<rtc>" ],
    "nospec": [ "4.01" ]
  },
  "rtc": {
    "content": [ "phrasing content", "<rt>" ],
    "parent": [ "<ruby>" ],
    "nospec": [ "4.01" ]
  },
  "ruby": {
    "categories": [ "flow content", "phrasing content" ],
    "content": [ "phrasing content", "<rp>", "<rt>", "<rtc>" ],
    "nospec": [ "4.01" ]
  },
  "s": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "samp": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "small": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "span": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "strong": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "sub": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "sup": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "time": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ],
    "nospec": [ "4.01" ]
  },
  "u": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "var": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "wbr": {
    "categories": [ "flow content", "phrasing content" ],
    "nospec": [ "4.01" ]
  },

  "area": {
    "categories": [ "flow content", "phrasing content" ],
    "ancestor": [ "<map>" ]
  },
  "audio": {
    "categories": [ "flow content", "phrasing content", "embedded content" ],
    "content": [ "transparent", "<track>" ],
    "disallow": [ "<audio>", "<video>" ],
    "states": {
      "[controls]": {
        "categories": [ "interactive content", "palpable content" ]
      },
      ":not([src])": {
        "content": [ "<source>" ]
      }
    },
    "nospec": [ "4.01" ]
  },
  "map": {
    "categories": [ "flow content", "phrasing content", "palpable content" ],
    "content": [ "transparent", "<area>" ]
  },
  "track": {
    "parent": [ "<audio>", "<video>" ],
    "nospec": [ "4.01" ]
  },
  "video": {
    "categories": [ "flow content", "phrasing content", "embedded content" ],
    "content": [ "transparent", "<track>" ],
    "disallow": [ "<audio>", "<video>" ],
    "states": {
      "[controls]": {
        "categories": [ "interactive content", "palpable content" ]
      },
      ":not([src])": {
        "content": [ "<source>" ]
      }
    },
    "nospec": [ "4.01" ]
  },

  "embed": {
    "categories": [ "flow content", "phrasing content", "embedded content", "interactive content", "palpable content" ],
    "nospec": [ "4.01" ]
  },
  "iframe": {
    "categories": [ "flow content", "phrasing content", "embedded content", "interactive content", "palpable content" ],
    "content": [ "phrasing content" ],
    "disallow": [ "<script>" ]
  },
  "img": {
    "categories": [ "flow content", "phrasing content", "embedded content", "palpable content" ],
    "states": {
      "[usemap]": {
        "categories": [ "interactive content" ]
      }
    }
  },
  "object": {
    "categories": [ "flow content", "phrasing content", "embedded content", "palpable content", "form-associated content", "listed", "submittable" ],
    "content": [ "transparent", "<param>" ],
    "states": {
      "[usemap]": {
        "categories": [ "interactive content" ]
      }
    }
  },
  "param": {
    "parent": [ "<object>" ]
  },
  "source": {
    "parent": [ "<picture>", "<audio>", "<video>" ],
    "position": [ "first" ],
    "nospec": [ "4.01" ]
  },

  "canvas": {
    "categories": [ "flow content", "phrasing content", "embedded content", "palpable content" ],
    "content": [ "transparent" ],
    "nospec": [ "4.01" ]
  },
  "noscript": {
    "categories": [ "flow content", "phrasing content", "metadata content" ],
    "disallow": [ "<noscript>" ],
    "states": {
      "head > noscript": {
        "content": [ "<link>", "<style>", "<meta>" ]
      },
      ":not( head > noscript )": {
        "content": [ "transparent" ]
      }
    }
  },
  "script": {
    "categories": [ "flow content", "phrasing content", "metadata content" ],
    "content": [ "text" ]
  },
  "template": {
    "categories": [ "metadata content", "flow content", "phrasing content" ],
    "content": [ "metadata content", "flow content" ],
    "parent": [ "body", "head", "colgroup" ],
    "nospec": [ "4.01" ]
  },

  "del": {
    "categories": [ "flow content", "phrasing content" ],
    "content": [ "transparent" ]
  },
  "ins": {
    "categories": [ "flow content", "phrasing content" ],
    "content": [ "transparent" ]
  },

  "caption": {
    "content": [ "flow content" ],
    "parent": [ "<table>" ],
    "position": [ "first" ]
  },
  "col": {
    "parent": [ "<colgroup>" ]
  },
  "colgroup": {
    "parent": [ "<table>" ],
    "states": {
      ":not([span])": {
        "content": [ "<col>" ]
      }
    }
  },
  "table": {
    "categories": [ "flow content" ],
    "content": [ "<caption>", "<colgroup>", "<thead>", "<tbody>", "<tfoot>", "<tr>" ]
  },
  "tbody": {
    "content": [ "<tr>" ],
    "parent": [ "<table>" ]
  },
  "td": {
    "content": [ "flow content", "phrasing content" ],
    "parent": [ "<tr>" ]
  },
  "tfoot": {
    "content": [ "<tr>" ],
    "parent": [ "<table>" ]
  },
  "th": {
    "content": [ "phrasing content" ],
    "parent": [ "<tr>" ]
  },
  "thead": {
    "content": [ "<tr>" ],
    "parent": [ "<table>" ]
  },
  "tr": {
    "content": [ "<th>", "<td>" ],
    "parent": [ "<table>", "<thead>", "<tbody>", "<tfoot>" ]
  },

  "button": {
    "categories": [ "flow content", "phrasing content", "interactive content", "form-associated content", "listed", "labelable", "submittable", "palpable content" ],
    "content": [ "phrasing content" ]
  },
  "datalist": {
    "categories": [ "flow content", "phrasing content" ],
    "content": [ "phrasing content", "<option>" ],
    "nospec": [ "4.01" ]
  },
  "fieldset": {
    "categories": [ "flow content", "sectioning root", "form-associated content", "listed", "palpable content" ],
    "content": [ "<legend>", "flow content" ]
  },
  "form": {
    "categories": [ "flow content", "palpable content" ],
    "content": [ "flow content" ],
    "disallow": [ "<form>" ]
  },
  "input": {
    "categories": [ "flow content", "phrasing content", "form-associated content", "listed", "submittable", "resettable" ],
    "states": {
      ":not([type=hidden])": {
        "categories": [ "labelable", "palpable content" ]
      }
    }
  },
  "label": {
    "categories": [ "flow content", "phrasing content", "interactive content", "form-associated content", "palpable content" ],
    "content": [ "phrasing content" ],
    "disallow": [ "<label>" ]
  },
  "legend": {
    "content": [ "phrasing content" ],
    "parent": [ "<fieldset>" ],
    "position": [ "first" ]
  },
  "meter": {
    "categories": [ "flow content", "phrasing content", "form-associated content", "labelable", "palpable content" ],
    "content": [ "phrasing content" ],
    "disallow": [ "<meter>" ],
    "nospec": [ "4.01" ]
  },
  "optgroup": {
    "content": [ "<option>" ],
    "parent": [ "<select>" ]
  },
  "option": {
    "content": [ "text" ],
    "parent": [ "<select>", "<optgroup>", "<datalist>" ]
  },
  "output": {
    "categories": [ "flow content", "phrasing content", "form-associated content", "listed", "labelable", "resettable", "palpable content" ],
    "content": [ "phrasing content" ],
    "nospec": [ "4.01" ]
  },
  "progress": {
    "categories": [ "flow content", "phrasing content", "form-associated content", "labelable", "palpable content" ],
    "content": [ "phrasing content" ],
    "disallow": [ "<progress>" ],
    "nospec": [ "4.01" ]
  },
  "select": {
    "categories": [ "flow content", "phrasing content", "interactive content", "form-associated content", "listed", "labelable", "submittable", "resettable" ],
    "content": [ "<optgroup>", "<option>" ]
  },
  "textarea": {
    "categories": [ "flow content", "phrasing content", "interactive content", "form-associated content", "listed", "labelable", "submittable", "resettable" ],
    "content": [ "text" ]
  },

  "details": {
    "categories": [ "flow content", "sectioning root", "interactive content", "palpable content" ],
    "content": [ "<summary>", "flow content" ],
    "nospec": [ "4.01", "5" ],
    "experimental": true
  },
  "dialog": {
    "categories": [ "flow content", "sectioning root" ],
    "content": [ "flow content" ],
    "nospec": [ "4.01", "5" ],
    "experimental": true
  },
   "hgroup": {
    "categories": [ "flow content", "heading content", "palpable content" ],
    "content": [ "<h1>", "<h2>", "<h3>", "<h4>", "<h5>", "<h6>" ],
    "nospec": [ "4.01", "5" ],
    "experimental": true
  },
  "menu": {
    "categories": [ "flow content" ],
    "states": {
      "[type=list], :not([type])": {
        "categories": [ "palpable content" ],
        "content": [ "flow content", "<li>", "<script>", "<template>" ]
      },
      "[type=menu]": {
        "content": [ "<script>", "<template>", "<menu>", "<menuitem>", "<hr>" ]
      }
    },
    "nospec": [ "4.01", "5" ],
    "experimental": true
  },
  "menuitem": {
    "parent": [ "<menu>" ],
    "nospec": [ "4.01", "5" ],
    "experimental": true
  },
  "picture": {
    "categories": [ "flow content", "phrasing content", "embedded content" ],
    "content": [ "<source>", "<img>" ],
    "nospec": [ "4.01", "5", "5.1" ],
    "experimental": true
  },
  "shadow": {
    "content": [ "flow content" ],
    "nospec": [ "4.01", "5", "5.1", "LS" ],
    "experimental": true
  },
  "summary": {
    "content": [ "phrasing content", "heading content" ],
    "parent": [ "<details>" ],
    "nospec": [ "4.01", "5" ],
    "experimental": true
  }
}

},{}],10:[function(require,module,exports){
'use strict'

const elementMeta = require( '@mojule/element-meta' )
const Is = require( '@mojule/is' )
const camelCase = require( 'lodash.camelcase' )

const meta = elementMeta()
const tagNames = Object.keys( meta )

const predicates = {
  stringMap: value => Is.object( value ) && Object.keys( value ).every( key =>
    Is.string( value[ key ] )
  ),
  attributeMapValue: value => Is.string( value ) || Is.function( value ),
  attributeMap: value =>
    Is.object( value ) && Object.keys( value ).every( key => {
      if( predicates.attributeMapValue( value[ key ] ) ) return true

      if( key === 'data' || key === 'style' ){
        return predicates.stringMap( value[ key ] )
      }

      return false
    }),
  node: value =>
    value && Is.string( value.nodeName ) && Is.integer( value.nodeType )
}

const is = Is( predicates )

const handleAttributes = ( document, el, attributes ) => {
  Object.keys( attributes ).forEach( key => {
    const value = attributes[ key ]

    if( is.function( value ) ){
      el.addEventListener( key, value )
    } else if( key === 'data' && is.stringMap( value ) ) {
      Object.assign( el.dataset, value )
    } else if( key === 'style' && is.stringMap( value ) ) {
      Object.keys( value ).forEach( name => {
        const key = camelCase( name )

        el.style[ key ] = value[ name ]
      })
    } else {
      el.setAttribute( key, value )
    }
  })
}

const handleArg = ( document, el, arg ) => {
  if( is.string( arg ) ){
    const text = document.createTextNode( arg )

    el.appendChild( text )
  } else if( is.node( arg ) ){
    el.appendChild( arg )
  } else if( is.attributeMap( arg ) ) {
    handleAttributes( document, el, arg )
  } else {
    throw Error( 'Unexpected argument' )
  }
}

const createEl = ( document, tagName, ...args ) => {
  const el = document.createElement( tagName )

  args.forEach( arg => {
    handleArg( document, el, arg )
  })

  return el
}

const H = document => {
  const element = ( tagName, ...args ) => createEl( document, tagName, ...args )
  const textNode = str => document.createTextNode( str )
  const comment = str => document.createComment( str )
  const documentFragment = ( ...childNodes ) => {
    const fragment = document.createDocumentFragment()

    childNodes.forEach( node => {
      if( is.node( node ) ){
        fragment.appendChild( node )
      } else {
        fragment.appendChild( document.createTextNode( node ) )
      }
    })

    return fragment
  }

  const h = {
    element, textNode, comment, documentFragment
  }

  tagNames.forEach( tagName => {
    h[ tagName ] = ( ...args ) => element( tagName, ...args )
  })

  return h
}

module.exports = H

},{"@mojule/element-meta":8,"@mojule/is":11,"lodash.camelcase":16}],11:[function(require,module,exports){
'use strict'

module.exports = require( './src' )

},{"./src":13}],12:[function(require,module,exports){
'use strict'

const isEmpty = obj => {
  for( const key in obj )
    return false

  return true
}

const predicates = {
  number: subject => typeof subject === 'number' && isFinite( subject ),
  integer: Number.isInteger,
  string: subject => typeof subject === 'string',
  boolean: subject => typeof subject === 'boolean',
  array: Array.isArray,
  null: subject => subject === null,
  undefined: subject => subject === undefined,
  function: subject => typeof subject === 'function',
  object: subject => typeof subject === 'object' && !predicates.null( subject ) && !predicates.array( subject ),
  empty: subject => predicates.object( subject ) && isEmpty( subject )
}

module.exports = predicates

},{}],13:[function(require,module,exports){
'use strict'

const defaultPredicates = require( './default-predicates' )

const Is = ( predicates = defaultPredicates ) => {
  /*
    weird triple assign is so that custom predicate keys come before defaults
    so that user predicates always take precedence over defaults
  */
  if( predicates !== defaultPredicates )
    predicates = Object.assign( {}, predicates, defaultPredicates, predicates )

  const t = T( predicates )

  return t.types().reduce( ( is, name ) => {
    is[ name ] = value => t.is( value, name )

    return is
  }, t )
}

const T = typePredicates => {
  const keys = Object.keys( typePredicates )

  const is = ( subject, typename ) =>
    typePredicates[ typename ] && typePredicates[ typename ]( subject )

  const isOnly = ( subject, typename ) =>
    is( subject, typename ) && allOf( subject ).length === 1

  const some = ( subject, ...typenames ) =>
    typenames.some( typename => is( subject, typename ) )

  const every = ( subject, ...typenames ) =>
    typenames.every( typename => is( subject, typename ) )

  const _of = subject =>
    keys.find( key => is( subject, key ) )

  const allOf = subject =>
    keys.filter( key => is( subject, key ) )

  const types = () => keys.slice()

  return { is, isOnly, some, every, of: _of, allOf, types }
}

Object.assign( Is, Is() )

module.exports = Is

},{"./default-predicates":12}],14:[function(require,module,exports){
arguments[4][11][0].apply(exports,arguments)
},{"./src":15,"dup":11}],15:[function(require,module,exports){
'use strict'

const lodashRange = require( 'lodash.range' )

const clone = ( obj = {} ) => JSON.parse( JSON.stringify( obj ) )

const matches = ( obj = {}, source = {} ) =>
  Object.keys( source ).every( key => obj[ key ] === source[ key ] )

const id = ( prefix = '', length = 32 ) => {
  if( prefix )
    prefix = identifier( prefix ) + '-'

  let str = prefix

  for( let i = 0; i < length; i++ ) {
    str += Math.floor( Math.random() * 16 ).toString( 16 )
  }

  return str
}

const identifier = ( value = '', caseSensitive = false ) => {
  let id = value.replace( /[^a-z0-9]/gi, '-' ).replace( /-{2,}/g, '-' ).replace( /^-/i, '' ).replace( /-$/i, '' )

  if( !caseSensitive )
    id = id.toLowerCase()

  return id
}

const escapeHtml = ( str = '' ) => {
  const result = str.replace( /</g, '&lt;' )
  return result
}

const capitalizeFirstLetter = ( str = '' ) =>
  str.charAt( 0 ).toUpperCase() + str.slice( 1 )

const hyphenatedToCamelCase = ( str = '', capitalizeFirst = false ) => {
  let [ head, ...rest ] = str.split( '-' )

  if( capitalizeFirst )
    head = capitalizeFirstLetter( head )

  const capitalized = rest.map( capitalizeFirstLetter )

  return [ head, ...capitalized ].join( '' )
}

const camelCaseToHyphenated = ( str = '' ) =>
  str.replace( /([A-Z])/g, matches => `-${matches[ 0 ].toLowerCase()}` )


const range = ( start = 0, end ) => {
  if( typeof end === 'undefined' ) {
    return lodashRange( start )
  }
  else {
    const step = start <= end ? 1 : -1
    const normEnd = end >= 0 ? end + 1 : end - 1
      return lodashRange( start, normEnd, step )
  }
}


const utils = {
  id, identifier, matches, clone, escapeHtml, capitalizeFirstLetter,
  hyphenatedToCamelCase, camelCaseToHyphenated, range
}

module.exports = utils

},{"lodash.range":17}],16:[function(require,module,exports){
(function (global){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0;

/** `Object#toString` result references. */
var symbolTag = '[object Symbol]';

/** Used to match words composed of alphanumeric characters. */
var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

/** Used to match Latin Unicode letters (excluding mathematical operators). */
var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

/** Used to compose unicode character classes. */
var rsAstralRange = '\\ud800-\\udfff',
    rsComboMarksRange = '\\u0300-\\u036f\\ufe20-\\ufe23',
    rsComboSymbolsRange = '\\u20d0-\\u20f0',
    rsDingbatRange = '\\u2700-\\u27bf',
    rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
    rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
    rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
    rsPunctuationRange = '\\u2000-\\u206f',
    rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
    rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
    rsVarRange = '\\ufe0e\\ufe0f',
    rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

/** Used to compose unicode capture groups. */
var rsApos = "['\u2019]",
    rsAstral = '[' + rsAstralRange + ']',
    rsBreak = '[' + rsBreakRange + ']',
    rsCombo = '[' + rsComboMarksRange + rsComboSymbolsRange + ']',
    rsDigits = '\\d+',
    rsDingbat = '[' + rsDingbatRange + ']',
    rsLower = '[' + rsLowerRange + ']',
    rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
    rsFitz = '\\ud83c[\\udffb-\\udfff]',
    rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
    rsNonAstral = '[^' + rsAstralRange + ']',
    rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
    rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
    rsUpper = '[' + rsUpperRange + ']',
    rsZWJ = '\\u200d';

/** Used to compose unicode regexes. */
var rsLowerMisc = '(?:' + rsLower + '|' + rsMisc + ')',
    rsUpperMisc = '(?:' + rsUpper + '|' + rsMisc + ')',
    rsOptLowerContr = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
    rsOptUpperContr = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
    reOptMod = rsModifier + '?',
    rsOptVar = '[' + rsVarRange + ']?',
    rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
    rsSeq = rsOptVar + reOptMod + rsOptJoin,
    rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
    rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

/** Used to match apostrophes. */
var reApos = RegExp(rsApos, 'g');

/**
 * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
 * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
 */
var reComboMark = RegExp(rsCombo, 'g');

/** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

/** Used to match complex or compound words. */
var reUnicodeWord = RegExp([
  rsUpper + '?' + rsLower + '+' + rsOptLowerContr + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
  rsUpperMisc + '+' + rsOptUpperContr + '(?=' + [rsBreak, rsUpper + rsLowerMisc, '$'].join('|') + ')',
  rsUpper + '?' + rsLowerMisc + '+' + rsOptLowerContr,
  rsUpper + '+' + rsOptUpperContr,
  rsDigits,
  rsEmoji
].join('|'), 'g');

/** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboMarksRange + rsComboSymbolsRange + rsVarRange + ']');

/** Used to detect strings that need a more robust regexp to match words. */
var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2,}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

/** Used to map Latin Unicode letters to basic Latin letters. */
var deburredLetters = {
  // Latin-1 Supplement block.
  '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
  '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
  '\xc7': 'C',  '\xe7': 'c',
  '\xd0': 'D',  '\xf0': 'd',
  '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
  '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
  '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
  '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
  '\xd1': 'N',  '\xf1': 'n',
  '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
  '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
  '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
  '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
  '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
  '\xc6': 'Ae', '\xe6': 'ae',
  '\xde': 'Th', '\xfe': 'th',
  '\xdf': 'ss',
  // Latin Extended-A block.
  '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
  '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
  '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
  '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
  '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
  '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
  '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
  '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
  '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
  '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
  '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
  '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
  '\u0134': 'J',  '\u0135': 'j',
  '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
  '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
  '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
  '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
  '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
  '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
  '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
  '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
  '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
  '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
  '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
  '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
  '\u0163': 't',  '\u0165': 't', '\u0167': 't',
  '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
  '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
  '\u0174': 'W',  '\u0175': 'w',
  '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
  '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
  '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
  '\u0132': 'IJ', '\u0133': 'ij',
  '\u0152': 'Oe', '\u0153': 'oe',
  '\u0149': "'n", '\u017f': 'ss'
};

/** Detect free variable `global` from Node.js. */
var freeGlobal = typeof global == 'object' && global && global.Object === Object && global;

/** Detect free variable `self`. */
var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

/** Used as a reference to the global object. */
var root = freeGlobal || freeSelf || Function('return this')();

/**
 * A specialized version of `_.reduce` for arrays without support for
 * iteratee shorthands.
 *
 * @private
 * @param {Array} [array] The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {*} [accumulator] The initial value.
 * @param {boolean} [initAccum] Specify using the first element of `array` as
 *  the initial value.
 * @returns {*} Returns the accumulated value.
 */
function arrayReduce(array, iteratee, accumulator, initAccum) {
  var index = -1,
      length = array ? array.length : 0;

  if (initAccum && length) {
    accumulator = array[++index];
  }
  while (++index < length) {
    accumulator = iteratee(accumulator, array[index], index, array);
  }
  return accumulator;
}

/**
 * Converts an ASCII `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function asciiToArray(string) {
  return string.split('');
}

/**
 * Splits an ASCII `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function asciiWords(string) {
  return string.match(reAsciiWord) || [];
}

/**
 * The base implementation of `_.propertyOf` without support for deep paths.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Function} Returns the new accessor function.
 */
function basePropertyOf(object) {
  return function(key) {
    return object == null ? undefined : object[key];
  };
}

/**
 * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
 * letters to basic Latin letters.
 *
 * @private
 * @param {string} letter The matched letter to deburr.
 * @returns {string} Returns the deburred letter.
 */
var deburrLetter = basePropertyOf(deburredLetters);

/**
 * Checks if `string` contains Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a symbol is found, else `false`.
 */
function hasUnicode(string) {
  return reHasUnicode.test(string);
}

/**
 * Checks if `string` contains a word composed of Unicode symbols.
 *
 * @private
 * @param {string} string The string to inspect.
 * @returns {boolean} Returns `true` if a word is found, else `false`.
 */
function hasUnicodeWord(string) {
  return reHasUnicodeWord.test(string);
}

/**
 * Converts `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function stringToArray(string) {
  return hasUnicode(string)
    ? unicodeToArray(string)
    : asciiToArray(string);
}

/**
 * Converts a Unicode `string` to an array.
 *
 * @private
 * @param {string} string The string to convert.
 * @returns {Array} Returns the converted array.
 */
function unicodeToArray(string) {
  return string.match(reUnicode) || [];
}

/**
 * Splits a Unicode `string` into an array of its words.
 *
 * @private
 * @param {string} The string to inspect.
 * @returns {Array} Returns the words of `string`.
 */
function unicodeWords(string) {
  return string.match(reUnicodeWord) || [];
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var Symbol = root.Symbol;

/** Used to convert symbols to primitives and strings. */
var symbolProto = Symbol ? Symbol.prototype : undefined,
    symbolToString = symbolProto ? symbolProto.toString : undefined;

/**
 * The base implementation of `_.slice` without an iteratee call guard.
 *
 * @private
 * @param {Array} array The array to slice.
 * @param {number} [start=0] The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the slice of `array`.
 */
function baseSlice(array, start, end) {
  var index = -1,
      length = array.length;

  if (start < 0) {
    start = -start > length ? 0 : (length + start);
  }
  end = end > length ? length : end;
  if (end < 0) {
    end += length;
  }
  length = start > end ? 0 : ((end - start) >>> 0);
  start >>>= 0;

  var result = Array(length);
  while (++index < length) {
    result[index] = array[index + start];
  }
  return result;
}

/**
 * The base implementation of `_.toString` which doesn't convert nullish
 * values to empty strings.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  // Exit early for strings to avoid a performance hit in some environments.
  if (typeof value == 'string') {
    return value;
  }
  if (isSymbol(value)) {
    return symbolToString ? symbolToString.call(value) : '';
  }
  var result = (value + '');
  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
}

/**
 * Casts `array` to a slice if it's needed.
 *
 * @private
 * @param {Array} array The array to inspect.
 * @param {number} start The start position.
 * @param {number} [end=array.length] The end position.
 * @returns {Array} Returns the cast slice.
 */
function castSlice(array, start, end) {
  var length = array.length;
  end = end === undefined ? length : end;
  return (!start && end >= length) ? array : baseSlice(array, start, end);
}

/**
 * Creates a function like `_.lowerFirst`.
 *
 * @private
 * @param {string} methodName The name of the `String` case method to use.
 * @returns {Function} Returns the new case function.
 */
function createCaseFirst(methodName) {
  return function(string) {
    string = toString(string);

    var strSymbols = hasUnicode(string)
      ? stringToArray(string)
      : undefined;

    var chr = strSymbols
      ? strSymbols[0]
      : string.charAt(0);

    var trailing = strSymbols
      ? castSlice(strSymbols, 1).join('')
      : string.slice(1);

    return chr[methodName]() + trailing;
  };
}

/**
 * Creates a function like `_.camelCase`.
 *
 * @private
 * @param {Function} callback The function to combine each word.
 * @returns {Function} Returns the new compounder function.
 */
function createCompounder(callback) {
  return function(string) {
    return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
  };
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a string. An empty string is returned for `null`
 * and `undefined` values. The sign of `-0` is preserved.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 * @example
 *
 * _.toString(null);
 * // => ''
 *
 * _.toString(-0);
 * // => '-0'
 *
 * _.toString([1, 2, 3]);
 * // => '1,2,3'
 */
function toString(value) {
  return value == null ? '' : baseToString(value);
}

/**
 * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the camel cased string.
 * @example
 *
 * _.camelCase('Foo Bar');
 * // => 'fooBar'
 *
 * _.camelCase('--foo-bar--');
 * // => 'fooBar'
 *
 * _.camelCase('__FOO_BAR__');
 * // => 'fooBar'
 */
var camelCase = createCompounder(function(result, word, index) {
  word = word.toLowerCase();
  return result + (index ? capitalize(word) : word);
});

/**
 * Converts the first character of `string` to upper case and the remaining
 * to lower case.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to capitalize.
 * @returns {string} Returns the capitalized string.
 * @example
 *
 * _.capitalize('FRED');
 * // => 'Fred'
 */
function capitalize(string) {
  return upperFirst(toString(string).toLowerCase());
}

/**
 * Deburrs `string` by converting
 * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
 * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
 * letters to basic Latin letters and removing
 * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to deburr.
 * @returns {string} Returns the deburred string.
 * @example
 *
 * _.deburr('déjà vu');
 * // => 'deja vu'
 */
function deburr(string) {
  string = toString(string);
  return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
}

/**
 * Converts the first character of `string` to upper case.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category String
 * @param {string} [string=''] The string to convert.
 * @returns {string} Returns the converted string.
 * @example
 *
 * _.upperFirst('fred');
 * // => 'Fred'
 *
 * _.upperFirst('FRED');
 * // => 'FRED'
 */
var upperFirst = createCaseFirst('toUpperCase');

/**
 * Splits `string` into an array of its words.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category String
 * @param {string} [string=''] The string to inspect.
 * @param {RegExp|string} [pattern] The pattern to match words.
 * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
 * @returns {Array} Returns the words of `string`.
 * @example
 *
 * _.words('fred, barney, & pebbles');
 * // => ['fred', 'barney', 'pebbles']
 *
 * _.words('fred, barney, & pebbles', /[^, ]+/g);
 * // => ['fred', 'barney', '&', 'pebbles']
 */
function words(string, pattern, guard) {
  string = toString(string);
  pattern = guard ? undefined : pattern;

  if (pattern === undefined) {
    return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
  }
  return string.match(pattern) || [];
}

module.exports = camelCase;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],17:[function(require,module,exports){
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var INFINITY = 1 / 0,
    MAX_SAFE_INTEGER = 9007199254740991,
    MAX_INTEGER = 1.7976931348623157e+308,
    NAN = 0 / 0;

/** `Object#toString` result references. */
var funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]',
    symbolTag = '[object Symbol]';

/** Used to match leading and trailing whitespace. */
var reTrim = /^\s+|\s+$/g;

/** Used to detect bad signed hexadecimal string values. */
var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

/** Used to detect binary string values. */
var reIsBinary = /^0b[01]+$/i;

/** Used to detect octal string values. */
var reIsOctal = /^0o[0-7]+$/i;

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/** Built-in method references without a dependency on `root`. */
var freeParseInt = parseInt;

/** Used for built-in method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeCeil = Math.ceil,
    nativeMax = Math.max;

/**
 * The base implementation of `_.range` and `_.rangeRight` which doesn't
 * coerce arguments.
 *
 * @private
 * @param {number} start The start of the range.
 * @param {number} end The end of the range.
 * @param {number} step The value to increment or decrement by.
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Array} Returns the range of numbers.
 */
function baseRange(start, end, step, fromRight) {
  var index = -1,
      length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
      result = Array(length);

  while (length--) {
    result[fromRight ? length : ++index] = start;
    start += step;
  }
  return result;
}

/**
 * Creates a `_.range` or `_.rangeRight` function.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new range function.
 */
function createRange(fromRight) {
  return function(start, end, step) {
    if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
      end = step = undefined;
    }
    // Ensure the sign of `-0` is preserved.
    start = toFinite(start);
    if (end === undefined) {
      end = start;
      start = 0;
    } else {
      end = toFinite(end);
    }
    step = step === undefined ? (start < end ? 1 : -1) : toFinite(step);
    return baseRange(start, end, step, fromRight);
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is classified as a `Symbol` primitive or object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
 * @example
 *
 * _.isSymbol(Symbol.iterator);
 * // => true
 *
 * _.isSymbol('abc');
 * // => false
 */
function isSymbol(value) {
  return typeof value == 'symbol' ||
    (isObjectLike(value) && objectToString.call(value) == symbolTag);
}

/**
 * Converts `value` to a finite number.
 *
 * @static
 * @memberOf _
 * @since 4.12.0
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {number} Returns the converted number.
 * @example
 *
 * _.toFinite(3.2);
 * // => 3.2
 *
 * _.toFinite(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toFinite(Infinity);
 * // => 1.7976931348623157e+308
 *
 * _.toFinite('3.2');
 * // => 3.2
 */
function toFinite(value) {
  if (!value) {
    return value === 0 ? value : 0;
  }
  value = toNumber(value);
  if (value === INFINITY || value === -INFINITY) {
    var sign = (value < 0 ? -1 : 1);
    return sign * MAX_INTEGER;
  }
  return value === value ? value : 0;
}

/**
 * Converts `value` to a number.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to process.
 * @returns {number} Returns the number.
 * @example
 *
 * _.toNumber(3.2);
 * // => 3.2
 *
 * _.toNumber(Number.MIN_VALUE);
 * // => 5e-324
 *
 * _.toNumber(Infinity);
 * // => Infinity
 *
 * _.toNumber('3.2');
 * // => 3.2
 */
function toNumber(value) {
  if (typeof value == 'number') {
    return value;
  }
  if (isSymbol(value)) {
    return NAN;
  }
  if (isObject(value)) {
    var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
    value = isObject(other) ? (other + '') : other;
  }
  if (typeof value != 'string') {
    return value === 0 ? value : +value;
  }
  value = value.replace(reTrim, '');
  var isBinary = reIsBinary.test(value);
  return (isBinary || reIsOctal.test(value))
    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
    : (reIsBadHex.test(value) ? NAN : +value);
}

/**
 * Creates an array of numbers (positive and/or negative) progressing from
 * `start` up to, but not including, `end`. A step of `-1` is used if a negative
 * `start` is specified without an `end` or `step`. If `end` is not specified,
 * it's set to `start` with `start` then set to `0`.
 *
 * **Note:** JavaScript follows the IEEE-754 standard for resolving
 * floating-point values which can produce unexpected results.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {number} [start=0] The start of the range.
 * @param {number} end The end of the range.
 * @param {number} [step=1] The value to increment or decrement by.
 * @returns {Array} Returns the range of numbers.
 * @see _.inRange, _.rangeRight
 * @example
 *
 * _.range(4);
 * // => [0, 1, 2, 3]
 *
 * _.range(-4);
 * // => [0, -1, -2, -3]
 *
 * _.range(1, 5);
 * // => [1, 2, 3, 4]
 *
 * _.range(0, 20, 5);
 * // => [0, 5, 10, 15]
 *
 * _.range(0, -4, -1);
 * // => [0, -1, -2, -3]
 *
 * _.range(1, 4, 0);
 * // => [1, 1, 1]
 *
 * _.range(0);
 * // => []
 */
var range = createRange();

module.exports = range;

},{}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2V4YW1wbGUvaC5qcyIsImRpc3QvZXhhbXBsZS9pbmRleC5qcyIsImRpc3QvaW5kZXguanMiLCJkaXN0L2xpbmUuanMiLCJkaXN0L3BvaW50LmpzIiwiZGlzdC9zaXplLmpzIiwiZGlzdC91dGlsLmpzIiwibm9kZV9tb2R1bGVzL0Btb2p1bGUvZWxlbWVudC1tZXRhL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL0Btb2p1bGUvZWxlbWVudC1tZXRhL3NyYy9kYXRhLmpzb24iLCJub2RlX21vZHVsZXMvQG1vanVsZS9oL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL0Btb2p1bGUvaXMvaW5kZXguanMiLCJub2RlX21vZHVsZXMvQG1vanVsZS9pcy9zcmMvZGVmYXVsdC1wcmVkaWNhdGVzLmpzIiwibm9kZV9tb2R1bGVzL0Btb2p1bGUvaXMvc3JjL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL0Btb2p1bGUvdXRpbHMvc3JjL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5jYW1lbGNhc2UvaW5kZXguanMiLCJub2RlX21vZHVsZXMvbG9kYXNoLnJhbmdlL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdk5BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ05BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hHQTtBQUNBO0FBQ0E7QUFDQTs7QUNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ3ZsQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpe2Z1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfXJldHVybiBlfSkoKSIsIlwidXNlIHN0cmljdFwiO1xuY29uc3QgSCA9IHJlcXVpcmUoXCJAbW9qdWxlL2hcIik7XG5jb25zdCBoID0gSChkb2N1bWVudCk7XG5tb2R1bGUuZXhwb3J0cyA9IGg7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgZ2VvbWV0cnkgPSByZXF1aXJlKFwiLi5cIik7XG5jb25zdCBoXzEgPSByZXF1aXJlKFwiLi9oXCIpO1xuY29uc3QgeyBsaW5lLCBwb2ludCwgc2l6ZSwgdXRpbCB9ID0gZ2VvbWV0cnk7XG5jb25zdCB7IGludGVyc2VjdGlvbiwgbGluZVZlY3RvciwgbWlkTGluZSwgbGVuZ3RoLCB1bml0VmVjdG9yLCBhbmdsZSwgYnJlc2VuaGFtTGluZSB9ID0gbGluZTtcbmNvbnN0IHsgdHJhbnNsYXRlLCBzY2FsZSwgcm90YXRlLCB2ZWN0b3IgfSA9IHBvaW50O1xuY29uc3QgeyByZWN0U2l6ZSwgc2NhbGVTaXplSW5TaXplIH0gPSBzaXplO1xuY29uc3QgeyBhcHByb3hpbWF0ZWx5RXF1YWwsIHJhZGlhbnNUb0RlZ3JlZXMsIGRlZ3JlZXNUb1JhZGlhbnMsIGFsaWduQ2VudGVyIH0gPSB1dGlsO1xuY29uc3Qgc2V0U3ZnQXR0cmlidXRlcyA9IChlbCwgYXR0cmlidXRlcykgPT4ge1xuICAgIE9iamVjdC5rZXlzKGF0dHJpYnV0ZXMpLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZU5TKG51bGwsIG5hbWUsIGF0dHJpYnV0ZXNbbmFtZV0pO1xuICAgIH0pO1xuICAgIHJldHVybiBlbDtcbn07XG5jb25zdCBTdmdFbCA9IChuYW1lLCBhdHRyaWJ1dGVzID0ge30pID0+IHtcbiAgICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnROUygnaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmcnLCBuYW1lKTtcbiAgICByZXR1cm4gc2V0U3ZnQXR0cmlidXRlcyhlbCwgYXR0cmlidXRlcyk7XG59O1xuY29uc3QgZXhhbXBsZVNpemUgPSB7XG4gICAgd2lkdGg6IDQwMCxcbiAgICBoZWlnaHQ6IDQwMFxufTtcbmNvbnN0IGV4YW1wbGVDZW50ZXIgPSB7XG4gICAgeDogZXhhbXBsZVNpemUud2lkdGggLyAyLFxuICAgIHk6IGV4YW1wbGVTaXplLmhlaWdodCAvIDJcbn07XG5jb25zdCBjZWxsU2l6ZSA9IHtcbiAgICB3aWR0aDogNDAsXG4gICAgaGVpZ2h0OiA0MFxufTtcbmNvbnN0IHJvd3MgPSBleGFtcGxlU2l6ZS53aWR0aCAvIGNlbGxTaXplLndpZHRoO1xuY29uc3QgY29sdW1ucyA9IGV4YW1wbGVTaXplLmhlaWdodCAvIGNlbGxTaXplLmhlaWdodDtcbmNvbnN0IHRvQ2VsbFVuaXQgPSAodmFsdWUpID0+IHZhbHVlIC8gY2VsbFNpemUud2lkdGg7XG5jb25zdCBMaW5lID0gKHgxLCB5MSwgeDIsIHkyLCBzdHJva2UgPSAnIzIyMicsIHN0cm9rZVdpZHRoID0gMikgPT4gU3ZnRWwoJ2xpbmUnLCB7XG4gICAgeDE6IHgxICsgMC41LFxuICAgIHkxOiB5MSArIDAuNSxcbiAgICB4MjogeDIgKyAwLjUsXG4gICAgeTI6IHkyICsgMC41LFxuICAgIHN0cm9rZSxcbiAgICAnc3Ryb2tlLXdpZHRoJzogc3Ryb2tlV2lkdGhcbn0pO1xuY29uc3QgUG9pbnQgPSAoeCwgeSwgciA9IDQsIGZpbGwgPSAnIzIyMicpID0+IFN2Z0VsKCdjaXJjbGUnLCB7XG4gICAgY3g6IHggKyAwLjUsXG4gICAgY3k6IHkgKyAwLjUsXG4gICAgcixcbiAgICBmaWxsXG59KTtcbmNvbnN0IEFycm93ID0gKGlkLCBmaWxsKSA9PiB7XG4gICAgY29uc3QgbWFya2VyID0gU3ZnRWwoJ21hcmtlcicsIHtcbiAgICAgICAgaWQsXG4gICAgICAgIG1hcmtlcldpZHRoOiAxMCxcbiAgICAgICAgbWFya2VySGVpZ2h0OiAxMCxcbiAgICAgICAgcmVmWDogOSxcbiAgICAgICAgcmVmWTogMyxcbiAgICAgICAgb3JpZW50OiAnYXV0bycsXG4gICAgICAgIG1hcmtlclVuaXRzOiAnc3Ryb2tlV2lkdGgnXG4gICAgfSk7XG4gICAgY29uc3QgcGF0aCA9IFN2Z0VsKCdwYXRoJywge1xuICAgICAgICBkOiAnTTAsMCBMMCw2IEw5LDMgeicsXG4gICAgICAgIGZpbGxcbiAgICB9KTtcbiAgICBtYXJrZXIuYXBwZW5kQ2hpbGQocGF0aCk7XG4gICAgcmV0dXJuIG1hcmtlcjtcbn07XG5jb25zdCBTdmcgPSAoLi4uY2hpbGROb2RlcykgPT4ge1xuICAgIGNvbnN0IHN2ZyA9IFN2Z0VsKCdzdmcnLCB7XG4gICAgICAgIHZpZXdCb3g6IGAwIDAgJHtleGFtcGxlU2l6ZS53aWR0aCArIDJ9ICR7ZXhhbXBsZVNpemUuaGVpZ2h0ICsgMn1gLFxuICAgICAgICB3aWR0aDogZXhhbXBsZVNpemUud2lkdGggKyAyLFxuICAgICAgICBoZWlnaHQ6IGV4YW1wbGVTaXplLmhlaWdodCArIDJcbiAgICB9KTtcbiAgICBjb25zdCBkZWZzID0gU3ZnRWwoJ2RlZnMnKTtcbiAgICBjb25zdCB2ZWN0b3JBcnJvdyA9IEFycm93KCdhcnJvdycsICdyZWQnKTtcbiAgICBjb25zdCBsaW5lQXJyb3cgPSBBcnJvdygnbGluZUFycm93JywgJyMwMDAnKTtcbiAgICBkZWZzLmFwcGVuZENoaWxkKHZlY3RvckFycm93KTtcbiAgICBkZWZzLmFwcGVuZENoaWxkKGxpbmVBcnJvdyk7XG4gICAgc3ZnLmFwcGVuZENoaWxkKGRlZnMpO1xuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8PSByb3dzOyByb3crKykge1xuICAgICAgICBjb25zdCBsaW5lID0gTGluZSgwLCBjZWxsU2l6ZS5oZWlnaHQgKiByb3csIGV4YW1wbGVTaXplLndpZHRoLCBjZWxsU2l6ZS5oZWlnaHQgKiByb3csICcjY2NjJywgMSk7XG4gICAgICAgIHN2Zy5hcHBlbmRDaGlsZChsaW5lKTtcbiAgICB9XG4gICAgZm9yIChsZXQgY29sdW1uID0gMDsgY29sdW1uIDw9IGNvbHVtbnM7IGNvbHVtbisrKSB7XG4gICAgICAgIGNvbnN0IGxpbmUgPSBMaW5lKGNlbGxTaXplLndpZHRoICogY29sdW1uLCAwLCBjZWxsU2l6ZS53aWR0aCAqIGNvbHVtbiwgZXhhbXBsZVNpemUuaGVpZ2h0LCAnI2NjYycsIDEpO1xuICAgICAgICBzdmcuYXBwZW5kQ2hpbGQobGluZSk7XG4gICAgfVxuICAgIGNoaWxkTm9kZXMuZm9yRWFjaChub2RlID0+IHN2Zy5hcHBlbmRDaGlsZChub2RlKSk7XG4gICAgcmV0dXJuIHN2Zztcbn07XG5jb25zdCBFeGFtcGxlU2VjdGlvbiA9IChuYW1lLCAuLi5jaGlsZE5vZGVzKSA9PiB7XG4gICAgcmV0dXJuIGhfMS5kb2N1bWVudEZyYWdtZW50KGhfMS5zZWN0aW9uKGhfMS5oMShuYW1lKSwgLi4uY2hpbGROb2RlcykpO1xufTtcbmNvbnN0IFN2Z0V4YW1wbGUgPSAobmFtZSwgLi4uY2hpbGROb2RlcykgPT4gaF8xLmRvY3VtZW50RnJhZ21lbnQoaF8xLmgyKG5hbWUpLCBTdmcoLi4uY2hpbGROb2RlcykpO1xuY29uc3QgSW50ZXJzZWN0aW9uID0gKCkgPT4ge1xuICAgIGxldCB4MSwgeTEsIHgyLCB5MiwgeDMsIHkzLCB4NCwgeTQsIHA7XG4gICAgd2hpbGUgKCFwKSB7XG4gICAgICAgIHgxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZUNlbnRlci54KTtcbiAgICAgICAgeTEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlQ2VudGVyLnkpO1xuICAgICAgICB4MiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVDZW50ZXIueCArIGV4YW1wbGVDZW50ZXIueCk7XG4gICAgICAgIHkyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZUNlbnRlci55ICsgZXhhbXBsZUNlbnRlci55KTtcbiAgICAgICAgeDMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlQ2VudGVyLngpO1xuICAgICAgICB5MyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVDZW50ZXIueSArIGV4YW1wbGVDZW50ZXIueSk7XG4gICAgICAgIHg0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZUNlbnRlci54ICsgZXhhbXBsZUNlbnRlci54KTtcbiAgICAgICAgeTQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlQ2VudGVyLnkpO1xuICAgICAgICBwID0gaW50ZXJzZWN0aW9uKHgxLCB5MSwgeDIsIHkyLCB4MywgeTMsIHg0LCB5NCk7XG4gICAgfVxuICAgIGNvbnN0IFt4LCB5XSA9IHA7XG4gICAgbGV0IGZ4MSwgZnkxLCBmeDIsIGZ5MiwgZngzLCBmeTMsIGZ4NCwgZnk0O1xuICAgIGxldCBmcCA9IFswLCAwXTtcbiAgICB3aGlsZSAoZnApIHtcbiAgICAgICAgZngxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUud2lkdGgpO1xuICAgICAgICBmeTEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlU2l6ZS5oZWlnaHQpO1xuICAgICAgICBmeDIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlU2l6ZS53aWR0aCk7XG4gICAgICAgIGZ5MiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVTaXplLmhlaWdodCk7XG4gICAgICAgIGZ4MyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVTaXplLndpZHRoKTtcbiAgICAgICAgZnkzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUuaGVpZ2h0KTtcbiAgICAgICAgZng0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUud2lkdGgpO1xuICAgICAgICBmeTQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlU2l6ZS5oZWlnaHQpO1xuICAgICAgICBmcCA9IGludGVyc2VjdGlvbihmeDEsIGZ5MSwgZngyLCBmeTIsIGZ4MywgZnkzLCBmeDQsIGZ5NCk7XG4gICAgfVxuICAgIHJldHVybiBoXzEuZG9jdW1lbnRGcmFnbWVudChTdmdFeGFtcGxlKCdpbnRlcnNlY3Rpb24oIHgxLCB5MSwgeDIsIHkyLCB4MywgeTMsIHg0LCB5NCApJywgc2V0U3ZnQXR0cmlidXRlcyhMaW5lKHgxLCB5MSwgeDIsIHkyKSwgeyAnbWFya2VyLWVuZCc6ICd1cmwoI2xpbmVBcnJvdyknIH0pLCBzZXRTdmdBdHRyaWJ1dGVzKExpbmUoeDMsIHkzLCB4NCwgeTQpLCB7ICdtYXJrZXItZW5kJzogJ3VybCgjbGluZUFycm93KScgfSksIFBvaW50KHgxLCB5MSksIFBvaW50KHgzLCB5MyksIFBvaW50KHgsIHksIDQsICdyZWQnKSksIGhfMS5kaXYoaF8xLmNvZGUoYGludGVyc2VjdGlvbiggJHtbeDEsIHkxLCB4MiwgeTIsIHgzLCB5MywgeDQsIHk0XS5tYXAodG9DZWxsVW5pdCkuam9pbignLCAnKX0gKWApKSwgaF8xLmRpdihoXzEuY29kZShgWyAke3RvQ2VsbFVuaXQoeCl9LCAke3RvQ2VsbFVuaXQoeSl9IF1gKSksIFN2Z0V4YW1wbGUoJ2ludGVyc2VjdGlvbiggeDEsIHkxLCB4MiwgeTIsIHgzLCB5MywgeDQsIHk0ICknLCBzZXRTdmdBdHRyaWJ1dGVzKExpbmUoZngxLCBmeTEsIGZ4MiwgZnkyKSwgeyAnbWFya2VyLWVuZCc6ICd1cmwoI2xpbmVBcnJvdyknIH0pLCBzZXRTdmdBdHRyaWJ1dGVzKExpbmUoZngzLCBmeTMsIGZ4NCwgZnk0KSwgeyAnbWFya2VyLWVuZCc6ICd1cmwoI2xpbmVBcnJvdyknIH0pLCBQb2ludChmeDEsIGZ5MSksIFBvaW50KGZ4MywgZnkzKSksIGhfMS5kaXYoaF8xLmNvZGUoYGludGVyc2VjdGlvbiggJHtbZngxLCBmeTEsIGZ4MiwgZnkyLCBmeDMsIGZ5MywgZng0LCBmeTRdLm1hcCh0b0NlbGxVbml0KS5qb2luKCcsICcpfSApYCkpLCBoXzEuZGl2KGhfMS5jb2RlKGB1bmRlZmluZWRgKSkpO1xufTtcbmNvbnN0IExpbmVWZWN0b3IgPSAoKSA9PiB7XG4gICAgY29uc3QgeDEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlQ2VudGVyLngpO1xuICAgIGNvbnN0IHkxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZUNlbnRlci55KTtcbiAgICBjb25zdCB4MiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVDZW50ZXIueCArIGV4YW1wbGVDZW50ZXIueCk7XG4gICAgY29uc3QgeTIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlQ2VudGVyLnkgKyBleGFtcGxlQ2VudGVyLnkpO1xuICAgIGNvbnN0IHAgPSBsaW5lVmVjdG9yKHgxLCB5MSwgeDIsIHkyKTtcbiAgICBjb25zdCBbeCwgeV0gPSBwO1xuICAgIGNvbnN0IHZlY3RvciA9IExpbmUoMCwgMCwgeCwgeSwgJ3JlZCcpO1xuICAgIHNldFN2Z0F0dHJpYnV0ZXModmVjdG9yLCB7XG4gICAgICAgICdtYXJrZXItZW5kJzogJ3VybCgjYXJyb3cpJ1xuICAgIH0pO1xuICAgIHJldHVybiBoXzEuZG9jdW1lbnRGcmFnbWVudChTdmdFeGFtcGxlKCdsaW5lVmVjdG9yKCB4MSwgeTEsIHgyLCB5MiApJywgUG9pbnQoeDEsIHkxKSwgc2V0U3ZnQXR0cmlidXRlcyhMaW5lKHgxLCB5MSwgeDIsIHkyKSwgeyAnbWFya2VyLWVuZCc6ICd1cmwoI2xpbmVBcnJvdyknIH0pLCBQb2ludCgwLCAwLCA0LCAncmVkJyksIHZlY3RvciksIGhfMS5kaXYoaF8xLmNvZGUoYGxpbmVWZWN0b3IoICR7W3gxLCB5MSwgeDIsIHkyXS5tYXAodG9DZWxsVW5pdCkuam9pbignLCAnKX0gKWApKSwgaF8xLmRpdihoXzEuY29kZShgWyAke3RvQ2VsbFVuaXQoeCl9LCAke3RvQ2VsbFVuaXQoeSl9IF1gKSkpO1xufTtcbmNvbnN0IE1pZExpbmUgPSAoKSA9PiB7XG4gICAgY29uc3QgeDEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlU2l6ZS53aWR0aCk7XG4gICAgY29uc3QgeTEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlU2l6ZS5oZWlnaHQpO1xuICAgIGNvbnN0IHgyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUud2lkdGgpO1xuICAgIGNvbnN0IHkyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUuaGVpZ2h0KTtcbiAgICBjb25zdCBwID0gbWlkTGluZSh4MSwgeTEsIHgyLCB5Mik7XG4gICAgY29uc3QgW3gsIHldID0gcDtcbiAgICByZXR1cm4gaF8xLmRvY3VtZW50RnJhZ21lbnQoU3ZnRXhhbXBsZSgnbWlkTGluZSggeDEsIHkxLCB4MiwgeTIgKScsIFBvaW50KHgxLCB5MSksIHNldFN2Z0F0dHJpYnV0ZXMoTGluZSh4MSwgeTEsIHgyLCB5MiksIHsgJ21hcmtlci1lbmQnOiAndXJsKCNsaW5lQXJyb3cpJyB9KSwgUG9pbnQoeCwgeSwgNCwgJ3JlZCcpKSwgaF8xLmRpdihoXzEuY29kZShgbWlkTGluZSggJHtbeDEsIHkxLCB4MiwgeTJdLm1hcCh0b0NlbGxVbml0KS5qb2luKCcsICcpfSApYCkpLCBoXzEuZGl2KGhfMS5jb2RlKGBbICR7dG9DZWxsVW5pdCh4KX0sICR7dG9DZWxsVW5pdCh5KX0gXWApKSk7XG59O1xuY29uc3QgTGVuZ3RoID0gKCkgPT4ge1xuICAgIGNvbnN0IHgxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUud2lkdGgpO1xuICAgIGNvbnN0IHkxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUuaGVpZ2h0KTtcbiAgICBjb25zdCB4MiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVTaXplLndpZHRoKTtcbiAgICBjb25zdCB5MiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVTaXplLmhlaWdodCk7XG4gICAgY29uc3QgbCA9IGxlbmd0aCh4MSwgeTEsIHgyLCB5Mik7XG4gICAgcmV0dXJuIGhfMS5kb2N1bWVudEZyYWdtZW50KFN2Z0V4YW1wbGUoJ2xlbmd0aCggeDEsIHkxLCB4MiwgeTIgKScsIFBvaW50KHgxLCB5MSksIHNldFN2Z0F0dHJpYnV0ZXMoTGluZSh4MSwgeTEsIHgyLCB5MiksIHsgJ21hcmtlci1lbmQnOiAndXJsKCNsaW5lQXJyb3cpJyB9KSksIGhfMS5kaXYoaF8xLmNvZGUoYGxlbmd0aCggJHtbeDEsIHkxLCB4MiwgeTJdLm1hcCh0b0NlbGxVbml0KS5qb2luKCcsICcpfSApYCkpLCBoXzEuZGl2KGhfMS5jb2RlKFN0cmluZyh0b0NlbGxVbml0KGwpKSkpKTtcbn07XG5jb25zdCBVbml0VmVjdG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IHgxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZUNlbnRlci54KTtcbiAgICBjb25zdCB5MSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVDZW50ZXIueSk7XG4gICAgY29uc3QgeDIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlQ2VudGVyLnggKyBleGFtcGxlQ2VudGVyLngpO1xuICAgIGNvbnN0IHkyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZUNlbnRlci55ICsgZXhhbXBsZUNlbnRlci55KTtcbiAgICBjb25zdCBwID0gdW5pdFZlY3Rvcih4MSwgeTEsIHgyLCB5Mik7XG4gICAgY29uc3QgW3gsIHldID0gcDtcbiAgICBjb25zdCBzID0gc2NhbGUoeCwgeSwgY2VsbFNpemUud2lkdGgpO1xuICAgIGNvbnN0IFtzWCwgc1ldID0gcztcbiAgICBjb25zdCB2ZWN0b3IgPSBMaW5lKDAsIDAsIHNYLCBzWSwgJ3JlZCcpO1xuICAgIHNldFN2Z0F0dHJpYnV0ZXModmVjdG9yLCB7XG4gICAgICAgICdtYXJrZXItZW5kJzogJ3VybCgjYXJyb3cpJ1xuICAgIH0pO1xuICAgIHJldHVybiBoXzEuZG9jdW1lbnRGcmFnbWVudChTdmdFeGFtcGxlKCd1bml0VmVjdG9yKCB4MSwgeTEsIHgyLCB5MiApJywgUG9pbnQoeDEsIHkxKSwgc2V0U3ZnQXR0cmlidXRlcyhMaW5lKHgxLCB5MSwgeDIsIHkyKSwgeyAnbWFya2VyLWVuZCc6ICd1cmwoI2xpbmVBcnJvdyknIH0pLCBQb2ludCgwLCAwLCA0LCAncmVkJyksIHZlY3RvciksIGhfMS5kaXYoaF8xLmNvZGUoYHVuaXRWZWN0b3IoICR7W3gxLCB5MSwgeDIsIHkyXS5tYXAodG9DZWxsVW5pdCkuam9pbignLCAnKX0gKWApKSwgaF8xLmRpdihoXzEuY29kZShgWyAke3h9LCAke3l9IF1gKSkpO1xufTtcbmNvbnN0IEFuZ2xlID0gKCkgPT4ge1xuICAgIGNvbnN0IHgxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUud2lkdGgpO1xuICAgIGNvbnN0IHkxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUuaGVpZ2h0KTtcbiAgICBjb25zdCB4MiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVTaXplLndpZHRoKTtcbiAgICBjb25zdCB5MiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVTaXplLmhlaWdodCk7XG4gICAgY29uc3QgYSA9IGFuZ2xlKHgxLCB5MSwgeDIsIHkyKTtcbiAgICBjb25zdCBsaW5lID0gTGluZSh4MSwgeTEsIHgyLCB5Mik7XG4gICAgc2V0U3ZnQXR0cmlidXRlcyhsaW5lLCB7XG4gICAgICAgICdtYXJrZXItZW5kJzogJ3VybCgjbGluZUFycm93KSdcbiAgICB9KTtcbiAgICByZXR1cm4gaF8xLmRvY3VtZW50RnJhZ21lbnQoU3ZnRXhhbXBsZSgnYW5nbGUoIHgxLCB5MSwgeDIsIHkyICknLCBQb2ludCh4MSwgeTEpLCBsaW5lKSwgaF8xLmRpdihoXzEuY29kZShgYW5nbGUoICR7W3gxLCB5MSwgeDIsIHkyXS5tYXAodG9DZWxsVW5pdCkuam9pbignLCAnKX0gKWApKSwgaF8xLmRpdihoXzEuY29kZShTdHJpbmcoYSkpKSk7XG59O1xuY29uc3QgQnJlc2VuaGFtTGluZSA9ICgpID0+IHtcbiAgICBjb25zdCB4MSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCB5MSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCB4MiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCB5MiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCBsID0gYnJlc2VuaGFtTGluZSh4MSwgeTEsIHgyLCB5Mik7XG4gICAgY29uc3QgbGVuID0gbC5sZW5ndGggLyAyO1xuICAgIGNvbnN0IHJlY3RzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjb25zdCB4ID0gbFtpICogMl07XG4gICAgICAgIGNvbnN0IHkgPSBsW2kgKiAyICsgMV07XG4gICAgICAgIGNvbnN0IHJlY3QgPSBTdmdFbCgncmVjdCcsIHtcbiAgICAgICAgICAgIHg6IHggKiBjZWxsU2l6ZS53aWR0aCArIDAuNSxcbiAgICAgICAgICAgIHk6IHkgKiBjZWxsU2l6ZS5oZWlnaHQgKyAwLjUsXG4gICAgICAgICAgICB3aWR0aDogY2VsbFNpemUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGNlbGxTaXplLmhlaWdodCxcbiAgICAgICAgICAgICdzdHJva2Utd2lkdGgnOiAxLFxuICAgICAgICAgICAgc3Ryb2tlOiAnIzIyMicsXG4gICAgICAgICAgICBmaWxsOiAnI2NjYydcbiAgICAgICAgfSk7XG4gICAgICAgIHJlY3RzLnB1c2gocmVjdCk7XG4gICAgfVxuICAgIGNvbnN0IGx4MSA9ICh4MSArIDEpICogY2VsbFNpemUud2lkdGggLSAoY2VsbFNpemUud2lkdGggLyAyKTtcbiAgICBjb25zdCBseTEgPSAoeTEgKyAxKSAqIGNlbGxTaXplLmhlaWdodCAtIChjZWxsU2l6ZS5oZWlnaHQgLyAyKTtcbiAgICBjb25zdCBseDIgPSAoeDIgKyAxKSAqIGNlbGxTaXplLndpZHRoIC0gKGNlbGxTaXplLndpZHRoIC8gMik7XG4gICAgY29uc3QgbHkyID0gKHkyICsgMSkgKiBjZWxsU2l6ZS5oZWlnaHQgLSAoY2VsbFNpemUuaGVpZ2h0IC8gMik7XG4gICAgY29uc3Qgc3ZnRXggPSBTdmdFeGFtcGxlKCdicmVzZW5oYW1MaW5lKCB4MSwgeTEsIHgyLCB5MiApJywgLi4ucmVjdHMsIFBvaW50KGx4MSwgbHkxKSwgc2V0U3ZnQXR0cmlidXRlcyhMaW5lKGx4MSwgbHkxLCBseDIsIGx5MiksIHsgJ21hcmtlci1lbmQnOiAndXJsKCNsaW5lQXJyb3cpJyB9KSk7XG4gICAgcmV0dXJuIGhfMS5kb2N1bWVudEZyYWdtZW50KHN2Z0V4LCBoXzEuZGl2KGhfMS5jb2RlKGBicmVzZW5oYW1MaW5lKCAke1t4MSwgeTEsIHgyLCB5Ml0uam9pbignLCAnKX0gKWApKSwgaF8xLmRpdihoXzEuY29kZShgWyAke2wuam9pbignLCAnKX0gXWApKSk7XG59O1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBjb25zdCBsaW5lRXhhbXBsZXMgPSBFeGFtcGxlU2VjdGlvbignbGluZScsIEludGVyc2VjdGlvbigpLCBMaW5lVmVjdG9yKCksIE1pZExpbmUoKSwgTGVuZ3RoKCksIFVuaXRWZWN0b3IoKSwgQW5nbGUoKSwgQnJlc2VuaGFtTGluZSgpKTtcbiAgICBjb25zdCBwb2ludEV4YW1wbGVzID0gRXhhbXBsZVNlY3Rpb24oJ3BvaW50Jyk7XG4gICAgY29uc3Qgc2l6ZUV4YW1wbGVzID0gRXhhbXBsZVNlY3Rpb24oJ3NpemUnKTtcbiAgICBjb25zdCB1dGlsc0V4YW1wbGVzID0gRXhhbXBsZVNlY3Rpb24oJ3V0aWxzJyk7XG4gICAgY29uc3QgZXhhbXBsZXMgPSBoXzEuZG9jdW1lbnRGcmFnbWVudChsaW5lRXhhbXBsZXMsIHBvaW50RXhhbXBsZXMsIHNpemVFeGFtcGxlcywgdXRpbHNFeGFtcGxlcyk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChleGFtcGxlcyk7XG59KTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuY29uc3QgbGluZSA9IHJlcXVpcmUoXCIuL2xpbmVcIik7XG5jb25zdCBwb2ludCA9IHJlcXVpcmUoXCIuL3BvaW50XCIpO1xuY29uc3Qgc2l6ZSA9IHJlcXVpcmUoXCIuL3NpemVcIik7XG5jb25zdCB1dGlsID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmNvbnN0IGdlb21ldHJ5ID0geyBsaW5lLCBwb2ludCwgc2l6ZSwgdXRpbCB9O1xubW9kdWxlLmV4cG9ydHMgPSBnZW9tZXRyeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWluZGV4LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xuY29uc3QgdXRpbF8xID0gcmVxdWlyZShcIi4vdXRpbFwiKTtcbmV4cG9ydHMuaW50ZXJzZWN0aW9uID0gKHgxLCB5MSwgeDIsIHkyLCB4MywgeTMsIHg0LCB5NCkgPT4ge1xuICAgIGNvbnN0IGRlbm9tID0gKHk0IC0geTMpICogKHgyIC0geDEpIC0gKHg0IC0geDMpICogKHkyIC0geTEpO1xuICAgIGlmICghZGVub20pXG4gICAgICAgIHJldHVybjtcbiAgICBjb25zdCB1YSA9ICgoeDQgLSB4MykgKiAoeTEgLSB5MykgLSAoeTQgLSB5MykgKiAoeDEgLSB4MykpIC8gZGVub207XG4gICAgY29uc3QgdWIgPSAoKHgyIC0geDEpICogKHkxIC0geTMpIC0gKHkyIC0geTEpICogKHgxIC0geDMpKSAvIGRlbm9tO1xuICAgIGNvbnN0IHggPSB4MSArIHVhICogKHgyIC0geDEpO1xuICAgIGNvbnN0IHkgPSB5MSArIHVhICogKHkyIC0geTEpO1xuICAgIHJldHVybiBbeCwgeV07XG59O1xuZXhwb3J0cy5saW5lVmVjdG9yID0gKHgxLCB5MSwgeDIsIHkyKSA9PiBbeDIgLSB4MSwgeTIgLSB5MV07XG5leHBvcnRzLm1pZExpbmUgPSAoeDEsIHkxLCB4MiwgeTIpID0+IFsoeDEgKyB4MikgLyAyLCAoeTEgKyB5MikgLyAyXTtcbmV4cG9ydHMubGVuZ3RoID0gKHgxLCB5MSwgeDIsIHkyKSA9PiBNYXRoLnNxcnQoTWF0aC5wb3coKHgyIC0geDEpLCAyKSArIE1hdGgucG93KCh5MiAtIHkxKSwgMikpO1xuZXhwb3J0cy51bml0VmVjdG9yID0gKHgxLCB5MSwgeDIsIHkyKSA9PiB7XG4gICAgY29uc3QgbCA9IGV4cG9ydHMubGVuZ3RoKHgxLCB5MSwgeDIsIHkyKTtcbiAgICBjb25zdCBbdlgsIHZZXSA9IGV4cG9ydHMubGluZVZlY3Rvcih4MSwgeTEsIHgyLCB5Mik7XG4gICAgcmV0dXJuIFt2WCAvIGwsIHZZIC8gbF07XG59O1xuZXhwb3J0cy5hbmdsZVJhZGlhbnMgPSAoeDEsIHkxLCB4MiwgeTIpID0+IE1hdGguYXRhbjIoeTIgLSB5MSwgeDIgLSB5MSk7XG5leHBvcnRzLmFuZ2xlID0gKHgxLCB5MSwgeDIsIHkyKSA9PiB1dGlsXzEucmFkaWFuc1RvRGVncmVlcyhleHBvcnRzLmFuZ2xlUmFkaWFucyh4MSwgeTEsIHgyLCB5MikpO1xuZXhwb3J0cy5icmVzZW5oYW1MaW5lID0gKHgxLCB5MSwgeDIsIHkyKSA9PiB7XG4gICAgeDEgPSBNYXRoLmZsb29yKHgxKTtcbiAgICB4MiA9IE1hdGguZmxvb3IoeDIpO1xuICAgIHkxID0gTWF0aC5mbG9vcih5MSk7XG4gICAgeTIgPSBNYXRoLmZsb29yKHkyKTtcbiAgICBjb25zdCBsaW5lID0gW3gxLCB5MV07XG4gICAgY29uc3QgZFggPSBNYXRoLmFicyh4MiAtIHgxKTtcbiAgICBjb25zdCBkWSA9IE1hdGguYWJzKHkyIC0geTEpO1xuICAgIGNvbnN0IHNYID0geDEgPCB4MiA/IDEgOiAtMTtcbiAgICBjb25zdCBzWSA9IHkxIDwgeTIgPyAxIDogLTE7XG4gICAgbGV0IGVyciA9IGRYIC0gZFk7XG4gICAgd2hpbGUgKHgxICE9PSB4MiB8fCB5MSAhPT0geTIpIHtcbiAgICAgICAgY29uc3QgZXJyMiA9IDIgKiBlcnI7XG4gICAgICAgIGlmIChlcnIyID4gZFkgKiAtMSkge1xuICAgICAgICAgICAgZXJyIC09IGRZO1xuICAgICAgICAgICAgeDEgKz0gc1g7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGVycjIgPCBkWCkge1xuICAgICAgICAgICAgZXJyICs9IGRYO1xuICAgICAgICAgICAgeTEgKz0gc1k7XG4gICAgICAgIH1cbiAgICAgICAgbGluZS5wdXNoKHgxKTtcbiAgICAgICAgbGluZS5wdXNoKHkxKTtcbiAgICB9XG4gICAgcmV0dXJuIGxpbmU7XG59O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9bGluZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5leHBvcnRzLnRyYW5zbGF0ZSA9ICh4LCB5LCBhLCBiID0gYSkgPT4gW3ggKyBhLCB5ICsgYl07XG5leHBvcnRzLnNjYWxlID0gKHgsIHksIGEsIGIgPSBhKSA9PiBbeCAqIGEsIHkgKiBiXTtcbmNvbnN0IHJvdGF0ZUFyb3VuZCA9ICh4LCB5LCByYWRpYW5zLCBvWCwgb1kpID0+IHtcbiAgICBjb25zdCBbc1gsIHNZXSA9IGV4cG9ydHMuc2NhbGUob1gsIG9ZLCAtMSk7XG4gICAgY29uc3QgW3RYLCB0WV0gPSBleHBvcnRzLnRyYW5zbGF0ZSh4LCB5LCBzWCwgc1kpO1xuICAgIGNvbnN0IFtyWCwgclldID0gZXhwb3J0cy5yb3RhdGVSYWRpYW5zKHRYLCB0WSwgcmFkaWFucyk7XG4gICAgcmV0dXJuIGV4cG9ydHMudHJhbnNsYXRlKHJYLCByWSwgb1gsIG9ZKTtcbn07XG5leHBvcnRzLnJvdGF0ZVJhZGlhbnMgPSAoeCwgeSwgcmFkaWFucywgb1ggPSAwLCBvWSA9IDApID0+IHtcbiAgICBpZiAob1ggIT09IDAgfHwgb1kgIT09IDApXG4gICAgICAgIHJldHVybiByb3RhdGVBcm91bmQoeCwgeSwgcmFkaWFucywgb1gsIG9ZKTtcbiAgICBjb25zdCBjb3MgPSBNYXRoLmNvcyhyYWRpYW5zKTtcbiAgICBjb25zdCBzaW4gPSBNYXRoLnNpbihyYWRpYW5zKTtcbiAgICBjb25zdCByWCA9ICh4ICogY29zKSAtICh5ICogc2luKTtcbiAgICBjb25zdCByWSA9ICh5ICogY29zKSArICh4ICogc2luKTtcbiAgICByZXR1cm4gW3JYLCByWV07XG59O1xuZXhwb3J0cy5yb3RhdGUgPSAoeCwgeSwgZGVncmVlcywgb1ggPSAwLCBvWSA9IDApID0+IGV4cG9ydHMucm90YXRlUmFkaWFucyh4LCB5LCB1dGlsXzEuZGVncmVlc1RvUmFkaWFucyhkZWdyZWVzKSwgb1gsIG9ZKTtcbmV4cG9ydHMudmVjdG9yUmFkaWFucyA9IChyYWRpYW5zLCBsZW5ndGgpID0+IFtNYXRoLmNvcyhyYWRpYW5zKSAqIGxlbmd0aCwgTWF0aC5zaW4ocmFkaWFucykgKiBsZW5ndGhdO1xuZXhwb3J0cy52ZWN0b3IgPSAoZGVncmVlcywgbGVuZ3RoKSA9PiBleHBvcnRzLnZlY3RvclJhZGlhbnModXRpbF8xLmRlZ3JlZXNUb1JhZGlhbnMoZGVncmVlcyksIGxlbmd0aCk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1wb2ludC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmVjdFNpemUgPSAoeDEsIHkxLCB4MiwgeTIpID0+IFtNYXRoLmFicyh4MiAtIHgxKSwgTWF0aC5hYnMoeTIgLSB5MSldO1xuZXhwb3J0cy5zY2FsZVNpemVJblNpemUgPSAodzEsIGgxLCB3MiwgaDIpID0+IE1hdGgubWluKHcxIC8gdzIsIGgxIC8gaDIpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9c2l6ZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmV4cG9ydHMucmFkaWFuc1RvRGVncmVlcyA9IChyYWRpYW5zKSA9PiByYWRpYW5zICogMTgwIC8gTWF0aC5QSTtcbmV4cG9ydHMuZGVncmVlc1RvUmFkaWFucyA9IChkZWdyZWVzKSA9PiBkZWdyZWVzICogTWF0aC5QSSAvIDE4MDtcbmV4cG9ydHMuYXBwcm94aW1hdGVseUVxdWFsID0gKGEsIGIsIGVwc2lsb24gPSAwLjAwMSkgPT4gTWF0aC5hYnMoYiAtIGEpIDw9IGVwc2lsb247XG5leHBvcnRzLmFsaWduQ2VudGVyID0gKHBhcmVudCwgY2hpbGQpID0+IChwYXJlbnQgLSBjaGlsZCkgLyAyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dXRpbC5qcy5tYXAiLCIndXNlIHN0cmljdCdcblxuY29uc3QgdXRpbHMgPSByZXF1aXJlKCAnQG1vanVsZS91dGlscycgKVxuY29uc3QgZGF0YSA9IHJlcXVpcmUoICcuL3NyYy9kYXRhLmpzb24nIClcblxuY29uc3QgeyBjbG9uZSB9ID0gdXRpbHNcblxuY29uc3QgZWxlbWVudE1ldGEgPSAoKSA9PiBjbG9uZSggZGF0YSApXG5cbm1vZHVsZS5leHBvcnRzID0gZWxlbWVudE1ldGFcbiIsIm1vZHVsZS5leHBvcnRzPXtcbiAgXCJodG1sXCI6IHtcbiAgICBcImNvbnRlbnRcIjogWyBcIjxoZWFkPlwiLCBcIjxib2R5PlwiIF0sXG4gICAgXCJzaW5ndWxhclwiOiB0cnVlXG4gIH0sXG4gIFwiaGVhZFwiOiB7XG4gICAgXCJjb250ZW50XCI6IFsgXCJtZXRhZGF0YSBjb250ZW50XCIgXSxcbiAgICBcInBhcmVudFwiOiBbIFwiPGh0bWw+XCIgXSxcbiAgICBcInNpbmd1bGFyXCI6IHRydWVcbiAgfSxcbiAgXCJib2R5XCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcInNlY3Rpb25pbmcgcm9vdFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJmbG93IGNvbnRlbnRcIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8aHRtbD5cIiBdLFxuICAgIFwic2luZ3VsYXJcIjogdHJ1ZVxuICB9LFxuXG4gIFwidGl0bGVcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwibWV0YWRhdGEgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJ0ZXh0XCIgXSxcbiAgICBcInBhcmVudFwiOiBbIFwiPGhlYWQ+XCIgXSxcbiAgICBcInNpbmd1bGFyXCI6IHRydWVcbiAgfSxcbiAgXCJiYXNlXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcIm1ldGFkYXRhIGNvbnRlbnRcIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8aGVhZD5cIiBdLFxuICAgIFwic2luZ3VsYXJcIjogdHJ1ZVxuICB9LFxuICBcImxpbmtcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwibWV0YWRhdGEgY29udGVudFwiIF0sXG4gICAgXCJwYXJlbnRcIjogWyBcIjxoZWFkPlwiIF1cbiAgfSxcbiAgXCJtZXRhXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcIm1ldGFkYXRhIGNvbnRlbnRcIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8aGVhZD5cIiBdXG4gIH0sXG4gIFwic3R5bGVcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwibWV0YWRhdGEgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJ0ZXh0XCIgXSxcbiAgICBcInBhcmVudFwiOiBbIFwiPGhlYWQ+XCIgXVxuICB9LFxuXG4gIFwiYWRkcmVzc1wiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcImZsb3cgY29udGVudFwiIF0sXG4gICAgXCJkaXNhbGxvd1wiOiBbIFwiPGFkZHJlc3M+XCIsIFwiaGVhZGluZyBjb250ZW50XCIsIFwic2VjdGlvbmluZyBjb250ZW50XCIsIFwiPGhlYWRlcj5cIiwgXCI8Zm9vdGVyPlwiIF1cbiAgfSxcbiAgXCJhcnRpY2xlXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInNlY3Rpb25pbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwiZmxvdyBjb250ZW50XCIgXSxcbiAgICBcImRpc2FsbG93XCI6IFsgXCI8bWFpbj5cIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuICBcImFzaWRlXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInNlY3Rpb25pbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwiZmxvdyBjb250ZW50XCIgXSxcbiAgICBcImRpc2FsbG93XCI6IFsgXCI8bWFpbj5cIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuICBcImZvb3RlclwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcImZsb3cgY29udGVudFwiIF0sXG4gICAgXCJkaXNhbGxvd1wiOiBbIFwiPGZvb3Rlcj5cIiwgXCI8aGVhZGVyPlwiLCBcIjxtYWluPlwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG4gIFwiaGVhZGVyXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwiZmxvdyBjb250ZW50XCIgXSxcbiAgICBcImRpc2FsbG93XCI6IFsgXCI8Zm9vdGVyPlwiLCBcIjxoZWFkZXI+XCIsIFwiPG1haW4+XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiIF1cbiAgfSxcbiAgXCJoMVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJoZWFkaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwiaDJcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwiaGVhZGluZyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIgXVxuICB9LFxuICBcImgzXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcImhlYWRpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF1cbiAgfSxcbiAgXCJoNFwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJoZWFkaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwiaDVcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwiaGVhZGluZyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIgXVxuICB9LFxuICBcImg2XCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcImhlYWRpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF1cbiAgfSxcbiAgXCJuYXZcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwic2VjdGlvbmluZyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJmbG93IGNvbnRlbnRcIiBdLFxuICAgIFwiZGlzYWxsb3dcIjogWyBcIjxtYWluPlwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG5cbiAgXCJibG9ja3F1b3RlXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInNlY3Rpb25pbmcgcm9vdFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwiZmxvdyBjb250ZW50XCIgXVxuICB9LFxuICBcImRkXCI6IHtcbiAgICBcImNvbnRlbnRcIjogWyBcImZsb3cgY29udGVudFwiIF0sXG4gICAgXCJwYXJlbnRcIjogWyBcIjxkbD5cIiBdLFxuICAgIFwicHJldmlvdXNcIjogWyBcIjxkdD5cIiwgXCI8ZGQ+XCIgXVxuICB9LFxuICBcImRpdlwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcImZsb3cgY29udGVudFwiIF1cbiAgfSxcbiAgXCJkbFwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwiPGR0PlwiLCBcIjxkZD5cIiBdXG4gIH0sXG4gIFwiZHRcIjoge1xuICAgIFwiY29udGVudFwiOiBbIFwiZmxvdyBjb250ZW50XCIgXSxcbiAgICBcInBhcmVudFwiOiBbIFwiPGRsPlwiIF0sXG4gICAgXCJkaXNhbGxvd1wiOiBbIFwiPGZvb3Rlcj5cIiwgXCI8aGVhZGVyPlwiLCBcInNlY3Rpb25pbmcgY29udGVudFwiLCBcImhlYWRpbmcgY29udGVudFwiIF0sXG4gICAgXCJuZXh0XCI6IFsgXCI8ZHQ+XCIsIFwiPGRkPlwiIF1cbiAgfSxcbiAgXCJmaWdjYXB0aW9uXCI6IHtcbiAgICBcImNvbnRlbnRcIjogWyBcImZsb3cgY29udGVudFwiIF0sXG4gICAgXCJwYXJlbnRcIjogWyBcIjxmaWd1cmU+XCIgXSxcbiAgICBcInBvc2l0aW9uXCI6IFsgXCJmaXJzdFwiLCBcImxhc3RcIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuICBcImZpZ3VyZVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJzZWN0aW9uaW5nIHJvb3RcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcImZsb3cgY29udGVudFwiLCBcIjxmaWdjYXB0aW9uPlwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG4gIFwiaHJcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIgXVxuICB9LFxuICBcImxpXCI6IHtcbiAgICBcImNvbnRlbnRcIjogWyBcImZsb3cgY29udGVudFwiIF0sXG4gICAgXCJwYXJlbnRcIjogWyBcIjx1bD5cIiwgXCI8b2w+XCIsIFwiPG1lbnU+XCIgXVxuICB9LFxuICBcIm1haW5cIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJmbG93IGNvbnRlbnRcIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuICBcIm9sXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCI8bGk+XCIgXSxcbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICBcIjpub3QoOmVtcHR5KVwiOiB7XG4gICAgICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwicGFscGFibGUgY29udGVudFwiIF1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIFwicFwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwicHJlXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF1cbiAgfSxcbiAgXCJzZWN0aW9uXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInNlY3Rpb25pbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwiZmxvdyBjb250ZW50XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiIF1cbiAgfSxcbiAgXCJ1bFwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwiPGxpPlwiIF0sXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgXCI6bm90KDplbXB0eSlcIjoge1xuICAgICAgICBcImNhdGVnb3JpZXNcIjogWyBcInBhbHBhYmxlIGNvbnRlbnRcIiBdXG4gICAgICB9XG4gICAgfVxuICB9LFxuXG4gIFwiYVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIgXSxcbiAgICBcImRpc2FsbG93XCI6IFsgXCJpbnRlcmFjdGl2ZSBjb250ZW50XCIgXSxcbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICBcIltocmVmXVwiIDoge1xuICAgICAgICBcImNhdGVnb3JpZXNcIjogWyBcImludGVyYWN0aXZlIGNvbnRlbnRcIiBdXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBcImFiYnJcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF1cbiAgfSxcbiAgXCJiXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwiYmRpXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuICBcImJkb1wiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiIF1cbiAgfSxcbiAgXCJiclwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIgXVxuICB9LFxuICBcImNpdGVcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF1cbiAgfSxcbiAgXCJjb2RlXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwiZGF0YVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiIF1cbiAgfSxcbiAgXCJkZm5cIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJkaXNhbGxvd1wiOiBbIFwiPGRmbj5cIiBdXG4gIH0sXG4gIFwiZW1cIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF1cbiAgfSxcbiAgXCJpXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwia2JkXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwibWFya1wiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiIF1cbiAgfSxcbiAgXCJxXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwicnBcIjoge1xuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJwYXJlbnRcIjogWyBcIjxydWJ5PlwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG4gIFwicnRcIjoge1xuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJwYXJlbnRcIjogWyBcIjxydWJ5PlwiLCBcIjxydGM+XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiIF1cbiAgfSxcbiAgXCJydGNcIjoge1xuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiLCBcIjxydD5cIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8cnVieT5cIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuICBcInJ1YnlcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIsIFwiPHJwPlwiLCBcIjxydD5cIiwgXCI8cnRjPlwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG4gIFwic1wiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIgXVxuICB9LFxuICBcInNhbXBcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF1cbiAgfSxcbiAgXCJzbWFsbFwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIgXVxuICB9LFxuICBcInNwYW5cIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF1cbiAgfSxcbiAgXCJzdHJvbmdcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF1cbiAgfSxcbiAgXCJzdWJcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF1cbiAgfSxcbiAgXCJzdXBcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF1cbiAgfSxcbiAgXCJ0aW1lXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuICBcInVcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF1cbiAgfSxcbiAgXCJ2YXJcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF1cbiAgfSxcbiAgXCJ3YnJcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG5cbiAgXCJhcmVhXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiBdLFxuICAgIFwiYW5jZXN0b3JcIjogWyBcIjxtYXA+XCIgXVxuICB9LFxuICBcImF1ZGlvXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJlbWJlZGRlZCBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInRyYW5zcGFyZW50XCIsIFwiPHRyYWNrPlwiIF0sXG4gICAgXCJkaXNhbGxvd1wiOiBbIFwiPGF1ZGlvPlwiLCBcIjx2aWRlbz5cIiBdLFxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgIFwiW2NvbnRyb2xzXVwiOiB7XG4gICAgICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiaW50ZXJhY3RpdmUgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdXG4gICAgICB9LFxuICAgICAgXCI6bm90KFtzcmNdKVwiOiB7XG4gICAgICAgIFwiY29udGVudFwiOiBbIFwiPHNvdXJjZT5cIiBdXG4gICAgICB9XG4gICAgfSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiIF1cbiAgfSxcbiAgXCJtYXBcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwidHJhbnNwYXJlbnRcIiwgXCI8YXJlYT5cIiBdXG4gIH0sXG4gIFwidHJhY2tcIjoge1xuICAgIFwicGFyZW50XCI6IFsgXCI8YXVkaW8+XCIsIFwiPHZpZGVvPlwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG4gIFwidmlkZW9cIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcImVtYmVkZGVkIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwidHJhbnNwYXJlbnRcIiwgXCI8dHJhY2s+XCIgXSxcbiAgICBcImRpc2FsbG93XCI6IFsgXCI8YXVkaW8+XCIsIFwiPHZpZGVvPlwiIF0sXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgXCJbY29udHJvbHNdXCI6IHtcbiAgICAgICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJpbnRlcmFjdGl2ZSBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF1cbiAgICAgIH0sXG4gICAgICBcIjpub3QoW3NyY10pXCI6IHtcbiAgICAgICAgXCJjb250ZW50XCI6IFsgXCI8c291cmNlPlwiIF1cbiAgICAgIH1cbiAgICB9LFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuXG4gIFwiZW1iZWRcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcImVtYmVkZGVkIGNvbnRlbnRcIiwgXCJpbnRlcmFjdGl2ZSBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG4gIFwiaWZyYW1lXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJlbWJlZGRlZCBjb250ZW50XCIsIFwiaW50ZXJhY3RpdmUgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJkaXNhbGxvd1wiOiBbIFwiPHNjcmlwdD5cIiBdXG4gIH0sXG4gIFwiaW1nXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJlbWJlZGRlZCBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgXCJbdXNlbWFwXVwiOiB7XG4gICAgICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiaW50ZXJhY3RpdmUgY29udGVudFwiIF1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIFwib2JqZWN0XCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJlbWJlZGRlZCBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiLCBcImZvcm0tYXNzb2NpYXRlZCBjb250ZW50XCIsIFwibGlzdGVkXCIsIFwic3VibWl0dGFibGVcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwidHJhbnNwYXJlbnRcIiwgXCI8cGFyYW0+XCIgXSxcbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICBcIlt1c2VtYXBdXCI6IHtcbiAgICAgICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJpbnRlcmFjdGl2ZSBjb250ZW50XCIgXVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXCJwYXJhbVwiOiB7XG4gICAgXCJwYXJlbnRcIjogWyBcIjxvYmplY3Q+XCIgXVxuICB9LFxuICBcInNvdXJjZVwiOiB7XG4gICAgXCJwYXJlbnRcIjogWyBcIjxwaWN0dXJlPlwiLCBcIjxhdWRpbz5cIiwgXCI8dmlkZW8+XCIgXSxcbiAgICBcInBvc2l0aW9uXCI6IFsgXCJmaXJzdFwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG5cbiAgXCJjYW52YXNcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcImVtYmVkZGVkIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInRyYW5zcGFyZW50XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiIF1cbiAgfSxcbiAgXCJub3NjcmlwdFwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwibWV0YWRhdGEgY29udGVudFwiIF0sXG4gICAgXCJkaXNhbGxvd1wiOiBbIFwiPG5vc2NyaXB0PlwiIF0sXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgXCJoZWFkID4gbm9zY3JpcHRcIjoge1xuICAgICAgICBcImNvbnRlbnRcIjogWyBcIjxsaW5rPlwiLCBcIjxzdHlsZT5cIiwgXCI8bWV0YT5cIiBdXG4gICAgICB9LFxuICAgICAgXCI6bm90KCBoZWFkID4gbm9zY3JpcHQgKVwiOiB7XG4gICAgICAgIFwiY29udGVudFwiOiBbIFwidHJhbnNwYXJlbnRcIiBdXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBcInNjcmlwdFwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwibWV0YWRhdGEgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJ0ZXh0XCIgXVxuICB9LFxuICBcInRlbXBsYXRlXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcIm1ldGFkYXRhIGNvbnRlbnRcIiwgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcIm1ldGFkYXRhIGNvbnRlbnRcIiwgXCJmbG93IGNvbnRlbnRcIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCJib2R5XCIsIFwiaGVhZFwiLCBcImNvbGdyb3VwXCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiIF1cbiAgfSxcblxuICBcImRlbFwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInRyYW5zcGFyZW50XCIgXVxuICB9LFxuICBcImluc1wiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInRyYW5zcGFyZW50XCIgXVxuICB9LFxuXG4gIFwiY2FwdGlvblwiOiB7XG4gICAgXCJjb250ZW50XCI6IFsgXCJmbG93IGNvbnRlbnRcIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8dGFibGU+XCIgXSxcbiAgICBcInBvc2l0aW9uXCI6IFsgXCJmaXJzdFwiIF1cbiAgfSxcbiAgXCJjb2xcIjoge1xuICAgIFwicGFyZW50XCI6IFsgXCI8Y29sZ3JvdXA+XCIgXVxuICB9LFxuICBcImNvbGdyb3VwXCI6IHtcbiAgICBcInBhcmVudFwiOiBbIFwiPHRhYmxlPlwiIF0sXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgXCI6bm90KFtzcGFuXSlcIjoge1xuICAgICAgICBcImNvbnRlbnRcIjogWyBcIjxjb2w+XCIgXVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXCJ0YWJsZVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwiPGNhcHRpb24+XCIsIFwiPGNvbGdyb3VwPlwiLCBcIjx0aGVhZD5cIiwgXCI8dGJvZHk+XCIsIFwiPHRmb290PlwiLCBcIjx0cj5cIiBdXG4gIH0sXG4gIFwidGJvZHlcIjoge1xuICAgIFwiY29udGVudFwiOiBbIFwiPHRyPlwiIF0sXG4gICAgXCJwYXJlbnRcIjogWyBcIjx0YWJsZT5cIiBdXG4gIH0sXG4gIFwidGRcIjoge1xuICAgIFwiY29udGVudFwiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJwYXJlbnRcIjogWyBcIjx0cj5cIiBdXG4gIH0sXG4gIFwidGZvb3RcIjoge1xuICAgIFwiY29udGVudFwiOiBbIFwiPHRyPlwiIF0sXG4gICAgXCJwYXJlbnRcIjogWyBcIjx0YWJsZT5cIiBdXG4gIH0sXG4gIFwidGhcIjoge1xuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJwYXJlbnRcIjogWyBcIjx0cj5cIiBdXG4gIH0sXG4gIFwidGhlYWRcIjoge1xuICAgIFwiY29udGVudFwiOiBbIFwiPHRyPlwiIF0sXG4gICAgXCJwYXJlbnRcIjogWyBcIjx0YWJsZT5cIiBdXG4gIH0sXG4gIFwidHJcIjoge1xuICAgIFwiY29udGVudFwiOiBbIFwiPHRoPlwiLCBcIjx0ZD5cIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8dGFibGU+XCIsIFwiPHRoZWFkPlwiLCBcIjx0Ym9keT5cIiwgXCI8dGZvb3Q+XCIgXVxuICB9LFxuXG4gIFwiYnV0dG9uXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJpbnRlcmFjdGl2ZSBjb250ZW50XCIsIFwiZm9ybS1hc3NvY2lhdGVkIGNvbnRlbnRcIiwgXCJsaXN0ZWRcIiwgXCJsYWJlbGFibGVcIiwgXCJzdWJtaXR0YWJsZVwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF1cbiAgfSxcbiAgXCJkYXRhbGlzdFwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCI8b3B0aW9uPlwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG4gIFwiZmllbGRzZXRcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwic2VjdGlvbmluZyByb290XCIsIFwiZm9ybS1hc3NvY2lhdGVkIGNvbnRlbnRcIiwgXCJsaXN0ZWRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcIjxsZWdlbmQ+XCIsIFwiZmxvdyBjb250ZW50XCIgXVxuICB9LFxuICBcImZvcm1cIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJmbG93IGNvbnRlbnRcIiBdLFxuICAgIFwiZGlzYWxsb3dcIjogWyBcIjxmb3JtPlwiIF1cbiAgfSxcbiAgXCJpbnB1dFwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwiZm9ybS1hc3NvY2lhdGVkIGNvbnRlbnRcIiwgXCJsaXN0ZWRcIiwgXCJzdWJtaXR0YWJsZVwiLCBcInJlc2V0dGFibGVcIiBdLFxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgIFwiOm5vdChbdHlwZT1oaWRkZW5dKVwiOiB7XG4gICAgICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwibGFiZWxhYmxlXCIsIFwicGFscGFibGUgY29udGVudFwiIF1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIFwibGFiZWxcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcImludGVyYWN0aXZlIGNvbnRlbnRcIiwgXCJmb3JtLWFzc29jaWF0ZWQgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJkaXNhbGxvd1wiOiBbIFwiPGxhYmVsPlwiIF1cbiAgfSxcbiAgXCJsZWdlbmRcIjoge1xuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJwYXJlbnRcIjogWyBcIjxmaWVsZHNldD5cIiBdLFxuICAgIFwicG9zaXRpb25cIjogWyBcImZpcnN0XCIgXVxuICB9LFxuICBcIm1ldGVyXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJmb3JtLWFzc29jaWF0ZWQgY29udGVudFwiLCBcImxhYmVsYWJsZVwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJkaXNhbGxvd1wiOiBbIFwiPG1ldGVyPlwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG4gIFwib3B0Z3JvdXBcIjoge1xuICAgIFwiY29udGVudFwiOiBbIFwiPG9wdGlvbj5cIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8c2VsZWN0PlwiIF1cbiAgfSxcbiAgXCJvcHRpb25cIjoge1xuICAgIFwiY29udGVudFwiOiBbIFwidGV4dFwiIF0sXG4gICAgXCJwYXJlbnRcIjogWyBcIjxzZWxlY3Q+XCIsIFwiPG9wdGdyb3VwPlwiLCBcIjxkYXRhbGlzdD5cIiBdXG4gIH0sXG4gIFwib3V0cHV0XCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJmb3JtLWFzc29jaWF0ZWQgY29udGVudFwiLCBcImxpc3RlZFwiLCBcImxhYmVsYWJsZVwiLCBcInJlc2V0dGFibGVcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuICBcInByb2dyZXNzXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJmb3JtLWFzc29jaWF0ZWQgY29udGVudFwiLCBcImxhYmVsYWJsZVwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJkaXNhbGxvd1wiOiBbIFwiPHByb2dyZXNzPlwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG4gIFwic2VsZWN0XCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJpbnRlcmFjdGl2ZSBjb250ZW50XCIsIFwiZm9ybS1hc3NvY2lhdGVkIGNvbnRlbnRcIiwgXCJsaXN0ZWRcIiwgXCJsYWJlbGFibGVcIiwgXCJzdWJtaXR0YWJsZVwiLCBcInJlc2V0dGFibGVcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwiPG9wdGdyb3VwPlwiLCBcIjxvcHRpb24+XCIgXVxuICB9LFxuICBcInRleHRhcmVhXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJpbnRlcmFjdGl2ZSBjb250ZW50XCIsIFwiZm9ybS1hc3NvY2lhdGVkIGNvbnRlbnRcIiwgXCJsaXN0ZWRcIiwgXCJsYWJlbGFibGVcIiwgXCJzdWJtaXR0YWJsZVwiLCBcInJlc2V0dGFibGVcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwidGV4dFwiIF1cbiAgfSxcblxuICBcImRldGFpbHNcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwic2VjdGlvbmluZyByb290XCIsIFwiaW50ZXJhY3RpdmUgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwiPHN1bW1hcnk+XCIsIFwiZmxvdyBjb250ZW50XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiLCBcIjVcIiBdLFxuICAgIFwiZXhwZXJpbWVudGFsXCI6IHRydWVcbiAgfSxcbiAgXCJkaWFsb2dcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwic2VjdGlvbmluZyByb290XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcImZsb3cgY29udGVudFwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiwgXCI1XCIgXSxcbiAgICBcImV4cGVyaW1lbnRhbFwiOiB0cnVlXG4gIH0sXG4gICBcImhncm91cFwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJoZWFkaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcIjxoMT5cIiwgXCI8aDI+XCIsIFwiPGgzPlwiLCBcIjxoND5cIiwgXCI8aDU+XCIsIFwiPGg2PlwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiwgXCI1XCIgXSxcbiAgICBcImV4cGVyaW1lbnRhbFwiOiB0cnVlXG4gIH0sXG4gIFwibWVudVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiBdLFxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgIFwiW3R5cGU9bGlzdF0sIDpub3QoW3R5cGVdKVwiOiB7XG4gICAgICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgICAgIFwiY29udGVudFwiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwiPGxpPlwiLCBcIjxzY3JpcHQ+XCIsIFwiPHRlbXBsYXRlPlwiIF1cbiAgICAgIH0sXG4gICAgICBcIlt0eXBlPW1lbnVdXCI6IHtcbiAgICAgICAgXCJjb250ZW50XCI6IFsgXCI8c2NyaXB0PlwiLCBcIjx0ZW1wbGF0ZT5cIiwgXCI8bWVudT5cIiwgXCI8bWVudWl0ZW0+XCIsIFwiPGhyPlwiIF1cbiAgICAgIH1cbiAgICB9LFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIsIFwiNVwiIF0sXG4gICAgXCJleHBlcmltZW50YWxcIjogdHJ1ZVxuICB9LFxuICBcIm1lbnVpdGVtXCI6IHtcbiAgICBcInBhcmVudFwiOiBbIFwiPG1lbnU+XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiLCBcIjVcIiBdLFxuICAgIFwiZXhwZXJpbWVudGFsXCI6IHRydWVcbiAgfSxcbiAgXCJwaWN0dXJlXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJlbWJlZGRlZCBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcIjxzb3VyY2U+XCIsIFwiPGltZz5cIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIsIFwiNVwiLCBcIjUuMVwiIF0sXG4gICAgXCJleHBlcmltZW50YWxcIjogdHJ1ZVxuICB9LFxuICBcInNoYWRvd1wiOiB7XG4gICAgXCJjb250ZW50XCI6IFsgXCJmbG93IGNvbnRlbnRcIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIsIFwiNVwiLCBcIjUuMVwiLCBcIkxTXCIgXSxcbiAgICBcImV4cGVyaW1lbnRhbFwiOiB0cnVlXG4gIH0sXG4gIFwic3VtbWFyeVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIsIFwiaGVhZGluZyBjb250ZW50XCIgXSxcbiAgICBcInBhcmVudFwiOiBbIFwiPGRldGFpbHM+XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiLCBcIjVcIiBdLFxuICAgIFwiZXhwZXJpbWVudGFsXCI6IHRydWVcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGVsZW1lbnRNZXRhID0gcmVxdWlyZSggJ0Btb2p1bGUvZWxlbWVudC1tZXRhJyApXG5jb25zdCBJcyA9IHJlcXVpcmUoICdAbW9qdWxlL2lzJyApXG5jb25zdCBjYW1lbENhc2UgPSByZXF1aXJlKCAnbG9kYXNoLmNhbWVsY2FzZScgKVxuXG5jb25zdCBtZXRhID0gZWxlbWVudE1ldGEoKVxuY29uc3QgdGFnTmFtZXMgPSBPYmplY3Qua2V5cyggbWV0YSApXG5cbmNvbnN0IHByZWRpY2F0ZXMgPSB7XG4gIHN0cmluZ01hcDogdmFsdWUgPT4gSXMub2JqZWN0KCB2YWx1ZSApICYmIE9iamVjdC5rZXlzKCB2YWx1ZSApLmV2ZXJ5KCBrZXkgPT5cbiAgICBJcy5zdHJpbmcoIHZhbHVlWyBrZXkgXSApXG4gICksXG4gIGF0dHJpYnV0ZU1hcFZhbHVlOiB2YWx1ZSA9PiBJcy5zdHJpbmcoIHZhbHVlICkgfHwgSXMuZnVuY3Rpb24oIHZhbHVlICksXG4gIGF0dHJpYnV0ZU1hcDogdmFsdWUgPT5cbiAgICBJcy5vYmplY3QoIHZhbHVlICkgJiYgT2JqZWN0LmtleXMoIHZhbHVlICkuZXZlcnkoIGtleSA9PiB7XG4gICAgICBpZiggcHJlZGljYXRlcy5hdHRyaWJ1dGVNYXBWYWx1ZSggdmFsdWVbIGtleSBdICkgKSByZXR1cm4gdHJ1ZVxuXG4gICAgICBpZigga2V5ID09PSAnZGF0YScgfHwga2V5ID09PSAnc3R5bGUnICl7XG4gICAgICAgIHJldHVybiBwcmVkaWNhdGVzLnN0cmluZ01hcCggdmFsdWVbIGtleSBdIClcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZhbHNlXG4gICAgfSksXG4gIG5vZGU6IHZhbHVlID0+XG4gICAgdmFsdWUgJiYgSXMuc3RyaW5nKCB2YWx1ZS5ub2RlTmFtZSApICYmIElzLmludGVnZXIoIHZhbHVlLm5vZGVUeXBlIClcbn1cblxuY29uc3QgaXMgPSBJcyggcHJlZGljYXRlcyApXG5cbmNvbnN0IGhhbmRsZUF0dHJpYnV0ZXMgPSAoIGRvY3VtZW50LCBlbCwgYXR0cmlidXRlcyApID0+IHtcbiAgT2JqZWN0LmtleXMoIGF0dHJpYnV0ZXMgKS5mb3JFYWNoKCBrZXkgPT4ge1xuICAgIGNvbnN0IHZhbHVlID0gYXR0cmlidXRlc1sga2V5IF1cblxuICAgIGlmKCBpcy5mdW5jdGlvbiggdmFsdWUgKSApe1xuICAgICAgZWwuYWRkRXZlbnRMaXN0ZW5lcigga2V5LCB2YWx1ZSApXG4gICAgfSBlbHNlIGlmKCBrZXkgPT09ICdkYXRhJyAmJiBpcy5zdHJpbmdNYXAoIHZhbHVlICkgKSB7XG4gICAgICBPYmplY3QuYXNzaWduKCBlbC5kYXRhc2V0LCB2YWx1ZSApXG4gICAgfSBlbHNlIGlmKCBrZXkgPT09ICdzdHlsZScgJiYgaXMuc3RyaW5nTWFwKCB2YWx1ZSApICkge1xuICAgICAgT2JqZWN0LmtleXMoIHZhbHVlICkuZm9yRWFjaCggbmFtZSA9PiB7XG4gICAgICAgIGNvbnN0IGtleSA9IGNhbWVsQ2FzZSggbmFtZSApXG5cbiAgICAgICAgZWwuc3R5bGVbIGtleSBdID0gdmFsdWVbIG5hbWUgXVxuICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgZWwuc2V0QXR0cmlidXRlKCBrZXksIHZhbHVlIClcbiAgICB9XG4gIH0pXG59XG5cbmNvbnN0IGhhbmRsZUFyZyA9ICggZG9jdW1lbnQsIGVsLCBhcmcgKSA9PiB7XG4gIGlmKCBpcy5zdHJpbmcoIGFyZyApICl7XG4gICAgY29uc3QgdGV4dCA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCBhcmcgKVxuXG4gICAgZWwuYXBwZW5kQ2hpbGQoIHRleHQgKVxuICB9IGVsc2UgaWYoIGlzLm5vZGUoIGFyZyApICl7XG4gICAgZWwuYXBwZW5kQ2hpbGQoIGFyZyApXG4gIH0gZWxzZSBpZiggaXMuYXR0cmlidXRlTWFwKCBhcmcgKSApIHtcbiAgICBoYW5kbGVBdHRyaWJ1dGVzKCBkb2N1bWVudCwgZWwsIGFyZyApXG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgRXJyb3IoICdVbmV4cGVjdGVkIGFyZ3VtZW50JyApXG4gIH1cbn1cblxuY29uc3QgY3JlYXRlRWwgPSAoIGRvY3VtZW50LCB0YWdOYW1lLCAuLi5hcmdzICkgPT4ge1xuICBjb25zdCBlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoIHRhZ05hbWUgKVxuXG4gIGFyZ3MuZm9yRWFjaCggYXJnID0+IHtcbiAgICBoYW5kbGVBcmcoIGRvY3VtZW50LCBlbCwgYXJnIClcbiAgfSlcblxuICByZXR1cm4gZWxcbn1cblxuY29uc3QgSCA9IGRvY3VtZW50ID0+IHtcbiAgY29uc3QgZWxlbWVudCA9ICggdGFnTmFtZSwgLi4uYXJncyApID0+IGNyZWF0ZUVsKCBkb2N1bWVudCwgdGFnTmFtZSwgLi4uYXJncyApXG4gIGNvbnN0IHRleHROb2RlID0gc3RyID0+IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKCBzdHIgKVxuICBjb25zdCBjb21tZW50ID0gc3RyID0+IGRvY3VtZW50LmNyZWF0ZUNvbW1lbnQoIHN0ciApXG4gIGNvbnN0IGRvY3VtZW50RnJhZ21lbnQgPSAoIC4uLmNoaWxkTm9kZXMgKSA9PiB7XG4gICAgY29uc3QgZnJhZ21lbnQgPSBkb2N1bWVudC5jcmVhdGVEb2N1bWVudEZyYWdtZW50KClcblxuICAgIGNoaWxkTm9kZXMuZm9yRWFjaCggbm9kZSA9PiB7XG4gICAgICBpZiggaXMubm9kZSggbm9kZSApICl7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKCBub2RlIClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZyYWdtZW50LmFwcGVuZENoaWxkKCBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSggbm9kZSApIClcbiAgICAgIH1cbiAgICB9KVxuXG4gICAgcmV0dXJuIGZyYWdtZW50XG4gIH1cblxuICBjb25zdCBoID0ge1xuICAgIGVsZW1lbnQsIHRleHROb2RlLCBjb21tZW50LCBkb2N1bWVudEZyYWdtZW50XG4gIH1cblxuICB0YWdOYW1lcy5mb3JFYWNoKCB0YWdOYW1lID0+IHtcbiAgICBoWyB0YWdOYW1lIF0gPSAoIC4uLmFyZ3MgKSA9PiBlbGVtZW50KCB0YWdOYW1lLCAuLi5hcmdzIClcbiAgfSlcblxuICByZXR1cm4gaFxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IEhcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCAnLi9zcmMnIClcclxuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGlzRW1wdHkgPSBvYmogPT4ge1xuICBmb3IoIGNvbnN0IGtleSBpbiBvYmogKVxuICAgIHJldHVybiBmYWxzZVxuXG4gIHJldHVybiB0cnVlXG59XG5cbmNvbnN0IHByZWRpY2F0ZXMgPSB7XG4gIG51bWJlcjogc3ViamVjdCA9PiB0eXBlb2Ygc3ViamVjdCA9PT0gJ251bWJlcicgJiYgaXNGaW5pdGUoIHN1YmplY3QgKSxcbiAgaW50ZWdlcjogTnVtYmVyLmlzSW50ZWdlcixcbiAgc3RyaW5nOiBzdWJqZWN0ID0+IHR5cGVvZiBzdWJqZWN0ID09PSAnc3RyaW5nJyxcbiAgYm9vbGVhbjogc3ViamVjdCA9PiB0eXBlb2Ygc3ViamVjdCA9PT0gJ2Jvb2xlYW4nLFxuICBhcnJheTogQXJyYXkuaXNBcnJheSxcbiAgbnVsbDogc3ViamVjdCA9PiBzdWJqZWN0ID09PSBudWxsLFxuICB1bmRlZmluZWQ6IHN1YmplY3QgPT4gc3ViamVjdCA9PT0gdW5kZWZpbmVkLFxuICBmdW5jdGlvbjogc3ViamVjdCA9PiB0eXBlb2Ygc3ViamVjdCA9PT0gJ2Z1bmN0aW9uJyxcbiAgb2JqZWN0OiBzdWJqZWN0ID0+IHR5cGVvZiBzdWJqZWN0ID09PSAnb2JqZWN0JyAmJiAhcHJlZGljYXRlcy5udWxsKCBzdWJqZWN0ICkgJiYgIXByZWRpY2F0ZXMuYXJyYXkoIHN1YmplY3QgKSxcbiAgZW1wdHk6IHN1YmplY3QgPT4gcHJlZGljYXRlcy5vYmplY3QoIHN1YmplY3QgKSAmJiBpc0VtcHR5KCBzdWJqZWN0IClcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBwcmVkaWNhdGVzXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgZGVmYXVsdFByZWRpY2F0ZXMgPSByZXF1aXJlKCAnLi9kZWZhdWx0LXByZWRpY2F0ZXMnIClcblxuY29uc3QgSXMgPSAoIHByZWRpY2F0ZXMgPSBkZWZhdWx0UHJlZGljYXRlcyApID0+IHtcbiAgLypcbiAgICB3ZWlyZCB0cmlwbGUgYXNzaWduIGlzIHNvIHRoYXQgY3VzdG9tIHByZWRpY2F0ZSBrZXlzIGNvbWUgYmVmb3JlIGRlZmF1bHRzXG4gICAgc28gdGhhdCB1c2VyIHByZWRpY2F0ZXMgYWx3YXlzIHRha2UgcHJlY2VkZW5jZSBvdmVyIGRlZmF1bHRzXG4gICovXG4gIGlmKCBwcmVkaWNhdGVzICE9PSBkZWZhdWx0UHJlZGljYXRlcyApXG4gICAgcHJlZGljYXRlcyA9IE9iamVjdC5hc3NpZ24oIHt9LCBwcmVkaWNhdGVzLCBkZWZhdWx0UHJlZGljYXRlcywgcHJlZGljYXRlcyApXG5cbiAgY29uc3QgdCA9IFQoIHByZWRpY2F0ZXMgKVxuXG4gIHJldHVybiB0LnR5cGVzKCkucmVkdWNlKCAoIGlzLCBuYW1lICkgPT4ge1xuICAgIGlzWyBuYW1lIF0gPSB2YWx1ZSA9PiB0LmlzKCB2YWx1ZSwgbmFtZSApXG5cbiAgICByZXR1cm4gaXNcbiAgfSwgdCApXG59XG5cbmNvbnN0IFQgPSB0eXBlUHJlZGljYXRlcyA9PiB7XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyggdHlwZVByZWRpY2F0ZXMgKVxuXG4gIGNvbnN0IGlzID0gKCBzdWJqZWN0LCB0eXBlbmFtZSApID0+XG4gICAgdHlwZVByZWRpY2F0ZXNbIHR5cGVuYW1lIF0gJiYgdHlwZVByZWRpY2F0ZXNbIHR5cGVuYW1lIF0oIHN1YmplY3QgKVxuXG4gIGNvbnN0IGlzT25seSA9ICggc3ViamVjdCwgdHlwZW5hbWUgKSA9PlxuICAgIGlzKCBzdWJqZWN0LCB0eXBlbmFtZSApICYmIGFsbE9mKCBzdWJqZWN0ICkubGVuZ3RoID09PSAxXG5cbiAgY29uc3Qgc29tZSA9ICggc3ViamVjdCwgLi4udHlwZW5hbWVzICkgPT5cbiAgICB0eXBlbmFtZXMuc29tZSggdHlwZW5hbWUgPT4gaXMoIHN1YmplY3QsIHR5cGVuYW1lICkgKVxuXG4gIGNvbnN0IGV2ZXJ5ID0gKCBzdWJqZWN0LCAuLi50eXBlbmFtZXMgKSA9PlxuICAgIHR5cGVuYW1lcy5ldmVyeSggdHlwZW5hbWUgPT4gaXMoIHN1YmplY3QsIHR5cGVuYW1lICkgKVxuXG4gIGNvbnN0IF9vZiA9IHN1YmplY3QgPT5cbiAgICBrZXlzLmZpbmQoIGtleSA9PiBpcyggc3ViamVjdCwga2V5ICkgKVxuXG4gIGNvbnN0IGFsbE9mID0gc3ViamVjdCA9PlxuICAgIGtleXMuZmlsdGVyKCBrZXkgPT4gaXMoIHN1YmplY3QsIGtleSApIClcblxuICBjb25zdCB0eXBlcyA9ICgpID0+IGtleXMuc2xpY2UoKVxuXG4gIHJldHVybiB7IGlzLCBpc09ubHksIHNvbWUsIGV2ZXJ5LCBvZjogX29mLCBhbGxPZiwgdHlwZXMgfVxufVxuXG5PYmplY3QuYXNzaWduKCBJcywgSXMoKSApXG5cbm1vZHVsZS5leHBvcnRzID0gSXNcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBsb2Rhc2hSYW5nZSA9IHJlcXVpcmUoICdsb2Rhc2gucmFuZ2UnIClcblxuY29uc3QgY2xvbmUgPSAoIG9iaiA9IHt9ICkgPT4gSlNPTi5wYXJzZSggSlNPTi5zdHJpbmdpZnkoIG9iaiApIClcblxuY29uc3QgbWF0Y2hlcyA9ICggb2JqID0ge30sIHNvdXJjZSA9IHt9ICkgPT5cbiAgT2JqZWN0LmtleXMoIHNvdXJjZSApLmV2ZXJ5KCBrZXkgPT4gb2JqWyBrZXkgXSA9PT0gc291cmNlWyBrZXkgXSApXG5cbmNvbnN0IGlkID0gKCBwcmVmaXggPSAnJywgbGVuZ3RoID0gMzIgKSA9PiB7XG4gIGlmKCBwcmVmaXggKVxuICAgIHByZWZpeCA9IGlkZW50aWZpZXIoIHByZWZpeCApICsgJy0nXG5cbiAgbGV0IHN0ciA9IHByZWZpeFxuXG4gIGZvciggbGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKysgKSB7XG4gICAgc3RyICs9IE1hdGguZmxvb3IoIE1hdGgucmFuZG9tKCkgKiAxNiApLnRvU3RyaW5nKCAxNiApXG4gIH1cblxuICByZXR1cm4gc3RyXG59XG5cbmNvbnN0IGlkZW50aWZpZXIgPSAoIHZhbHVlID0gJycsIGNhc2VTZW5zaXRpdmUgPSBmYWxzZSApID0+IHtcbiAgbGV0IGlkID0gdmFsdWUucmVwbGFjZSggL1teYS16MC05XS9naSwgJy0nICkucmVwbGFjZSggLy17Mix9L2csICctJyApLnJlcGxhY2UoIC9eLS9pLCAnJyApLnJlcGxhY2UoIC8tJC9pLCAnJyApXG5cbiAgaWYoICFjYXNlU2Vuc2l0aXZlIClcbiAgICBpZCA9IGlkLnRvTG93ZXJDYXNlKClcblxuICByZXR1cm4gaWRcbn1cblxuY29uc3QgZXNjYXBlSHRtbCA9ICggc3RyID0gJycgKSA9PiB7XG4gIGNvbnN0IHJlc3VsdCA9IHN0ci5yZXBsYWNlKCAvPC9nLCAnJmx0OycgKVxuICByZXR1cm4gcmVzdWx0XG59XG5cbmNvbnN0IGNhcGl0YWxpemVGaXJzdExldHRlciA9ICggc3RyID0gJycgKSA9PlxuICBzdHIuY2hhckF0KCAwICkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSggMSApXG5cbmNvbnN0IGh5cGhlbmF0ZWRUb0NhbWVsQ2FzZSA9ICggc3RyID0gJycsIGNhcGl0YWxpemVGaXJzdCA9IGZhbHNlICkgPT4ge1xuICBsZXQgWyBoZWFkLCAuLi5yZXN0IF0gPSBzdHIuc3BsaXQoICctJyApXG5cbiAgaWYoIGNhcGl0YWxpemVGaXJzdCApXG4gICAgaGVhZCA9IGNhcGl0YWxpemVGaXJzdExldHRlciggaGVhZCApXG5cbiAgY29uc3QgY2FwaXRhbGl6ZWQgPSByZXN0Lm1hcCggY2FwaXRhbGl6ZUZpcnN0TGV0dGVyIClcblxuICByZXR1cm4gWyBoZWFkLCAuLi5jYXBpdGFsaXplZCBdLmpvaW4oICcnIClcbn1cblxuY29uc3QgY2FtZWxDYXNlVG9IeXBoZW5hdGVkID0gKCBzdHIgPSAnJyApID0+XG4gIHN0ci5yZXBsYWNlKCAvKFtBLVpdKS9nLCBtYXRjaGVzID0+IGAtJHttYXRjaGVzWyAwIF0udG9Mb3dlckNhc2UoKX1gIClcblxuXG5jb25zdCByYW5nZSA9ICggc3RhcnQgPSAwLCBlbmQgKSA9PiB7XG4gIGlmKCB0eXBlb2YgZW5kID09PSAndW5kZWZpbmVkJyApIHtcbiAgICByZXR1cm4gbG9kYXNoUmFuZ2UoIHN0YXJ0IClcbiAgfVxuICBlbHNlIHtcbiAgICBjb25zdCBzdGVwID0gc3RhcnQgPD0gZW5kID8gMSA6IC0xXG4gICAgY29uc3Qgbm9ybUVuZCA9IGVuZCA+PSAwID8gZW5kICsgMSA6IGVuZCAtIDFcbiAgICAgIHJldHVybiBsb2Rhc2hSYW5nZSggc3RhcnQsIG5vcm1FbmQsIHN0ZXAgKVxuICB9XG59XG5cblxuY29uc3QgdXRpbHMgPSB7XG4gIGlkLCBpZGVudGlmaWVyLCBtYXRjaGVzLCBjbG9uZSwgZXNjYXBlSHRtbCwgY2FwaXRhbGl6ZUZpcnN0TGV0dGVyLFxuICBoeXBoZW5hdGVkVG9DYW1lbENhc2UsIGNhbWVsQ2FzZVRvSHlwaGVuYXRlZCwgcmFuZ2Vcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB1dGlsc1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBzeW1ib2xUYWcgPSAnW29iamVjdCBTeW1ib2xdJztcblxuLyoqIFVzZWQgdG8gbWF0Y2ggd29yZHMgY29tcG9zZWQgb2YgYWxwaGFudW1lcmljIGNoYXJhY3RlcnMuICovXG52YXIgcmVBc2NpaVdvcmQgPSAvW15cXHgwMC1cXHgyZlxceDNhLVxceDQwXFx4NWItXFx4NjBcXHg3Yi1cXHg3Zl0rL2c7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIExhdGluIFVuaWNvZGUgbGV0dGVycyAoZXhjbHVkaW5nIG1hdGhlbWF0aWNhbCBvcGVyYXRvcnMpLiAqL1xudmFyIHJlTGF0aW4gPSAvW1xceGMwLVxceGQ2XFx4ZDgtXFx4ZjZcXHhmOC1cXHhmZlxcdTAxMDAtXFx1MDE3Zl0vZztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIGNoYXJhY3RlciBjbGFzc2VzLiAqL1xudmFyIHJzQXN0cmFsUmFuZ2UgPSAnXFxcXHVkODAwLVxcXFx1ZGZmZicsXG4gICAgcnNDb21ib01hcmtzUmFuZ2UgPSAnXFxcXHUwMzAwLVxcXFx1MDM2ZlxcXFx1ZmUyMC1cXFxcdWZlMjMnLFxuICAgIHJzQ29tYm9TeW1ib2xzUmFuZ2UgPSAnXFxcXHUyMGQwLVxcXFx1MjBmMCcsXG4gICAgcnNEaW5nYmF0UmFuZ2UgPSAnXFxcXHUyNzAwLVxcXFx1MjdiZicsXG4gICAgcnNMb3dlclJhbmdlID0gJ2EtelxcXFx4ZGYtXFxcXHhmNlxcXFx4ZjgtXFxcXHhmZicsXG4gICAgcnNNYXRoT3BSYW5nZSA9ICdcXFxceGFjXFxcXHhiMVxcXFx4ZDdcXFxceGY3JyxcbiAgICByc05vbkNoYXJSYW5nZSA9ICdcXFxceDAwLVxcXFx4MmZcXFxceDNhLVxcXFx4NDBcXFxceDViLVxcXFx4NjBcXFxceDdiLVxcXFx4YmYnLFxuICAgIHJzUHVuY3R1YXRpb25SYW5nZSA9ICdcXFxcdTIwMDAtXFxcXHUyMDZmJyxcbiAgICByc1NwYWNlUmFuZ2UgPSAnIFxcXFx0XFxcXHgwYlxcXFxmXFxcXHhhMFxcXFx1ZmVmZlxcXFxuXFxcXHJcXFxcdTIwMjhcXFxcdTIwMjlcXFxcdTE2ODBcXFxcdTE4MGVcXFxcdTIwMDBcXFxcdTIwMDFcXFxcdTIwMDJcXFxcdTIwMDNcXFxcdTIwMDRcXFxcdTIwMDVcXFxcdTIwMDZcXFxcdTIwMDdcXFxcdTIwMDhcXFxcdTIwMDlcXFxcdTIwMGFcXFxcdTIwMmZcXFxcdTIwNWZcXFxcdTMwMDAnLFxuICAgIHJzVXBwZXJSYW5nZSA9ICdBLVpcXFxceGMwLVxcXFx4ZDZcXFxceGQ4LVxcXFx4ZGUnLFxuICAgIHJzVmFyUmFuZ2UgPSAnXFxcXHVmZTBlXFxcXHVmZTBmJyxcbiAgICByc0JyZWFrUmFuZ2UgPSByc01hdGhPcFJhbmdlICsgcnNOb25DaGFyUmFuZ2UgKyByc1B1bmN0dWF0aW9uUmFuZ2UgKyByc1NwYWNlUmFuZ2U7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjYXB0dXJlIGdyb3Vwcy4gKi9cbnZhciByc0Fwb3MgPSBcIlsnXFx1MjAxOV1cIixcbiAgICByc0FzdHJhbCA9ICdbJyArIHJzQXN0cmFsUmFuZ2UgKyAnXScsXG4gICAgcnNCcmVhayA9ICdbJyArIHJzQnJlYWtSYW5nZSArICddJyxcbiAgICByc0NvbWJvID0gJ1snICsgcnNDb21ib01hcmtzUmFuZ2UgKyByc0NvbWJvU3ltYm9sc1JhbmdlICsgJ10nLFxuICAgIHJzRGlnaXRzID0gJ1xcXFxkKycsXG4gICAgcnNEaW5nYmF0ID0gJ1snICsgcnNEaW5nYmF0UmFuZ2UgKyAnXScsXG4gICAgcnNMb3dlciA9ICdbJyArIHJzTG93ZXJSYW5nZSArICddJyxcbiAgICByc01pc2MgPSAnW14nICsgcnNBc3RyYWxSYW5nZSArIHJzQnJlYWtSYW5nZSArIHJzRGlnaXRzICsgcnNEaW5nYmF0UmFuZ2UgKyByc0xvd2VyUmFuZ2UgKyByc1VwcGVyUmFuZ2UgKyAnXScsXG4gICAgcnNGaXR6ID0gJ1xcXFx1ZDgzY1tcXFxcdWRmZmItXFxcXHVkZmZmXScsXG4gICAgcnNNb2RpZmllciA9ICcoPzonICsgcnNDb21ibyArICd8JyArIHJzRml0eiArICcpJyxcbiAgICByc05vbkFzdHJhbCA9ICdbXicgKyByc0FzdHJhbFJhbmdlICsgJ10nLFxuICAgIHJzUmVnaW9uYWwgPSAnKD86XFxcXHVkODNjW1xcXFx1ZGRlNi1cXFxcdWRkZmZdKXsyfScsXG4gICAgcnNTdXJyUGFpciA9ICdbXFxcXHVkODAwLVxcXFx1ZGJmZl1bXFxcXHVkYzAwLVxcXFx1ZGZmZl0nLFxuICAgIHJzVXBwZXIgPSAnWycgKyByc1VwcGVyUmFuZ2UgKyAnXScsXG4gICAgcnNaV0ogPSAnXFxcXHUyMDBkJztcblxuLyoqIFVzZWQgdG8gY29tcG9zZSB1bmljb2RlIHJlZ2V4ZXMuICovXG52YXIgcnNMb3dlck1pc2MgPSAnKD86JyArIHJzTG93ZXIgKyAnfCcgKyByc01pc2MgKyAnKScsXG4gICAgcnNVcHBlck1pc2MgPSAnKD86JyArIHJzVXBwZXIgKyAnfCcgKyByc01pc2MgKyAnKScsXG4gICAgcnNPcHRMb3dlckNvbnRyID0gJyg/OicgKyByc0Fwb3MgKyAnKD86ZHxsbHxtfHJlfHN8dHx2ZSkpPycsXG4gICAgcnNPcHRVcHBlckNvbnRyID0gJyg/OicgKyByc0Fwb3MgKyAnKD86RHxMTHxNfFJFfFN8VHxWRSkpPycsXG4gICAgcmVPcHRNb2QgPSByc01vZGlmaWVyICsgJz8nLFxuICAgIHJzT3B0VmFyID0gJ1snICsgcnNWYXJSYW5nZSArICddPycsXG4gICAgcnNPcHRKb2luID0gJyg/OicgKyByc1pXSiArICcoPzonICsgW3JzTm9uQXN0cmFsLCByc1JlZ2lvbmFsLCByc1N1cnJQYWlyXS5qb2luKCd8JykgKyAnKScgKyByc09wdFZhciArIHJlT3B0TW9kICsgJykqJyxcbiAgICByc1NlcSA9IHJzT3B0VmFyICsgcmVPcHRNb2QgKyByc09wdEpvaW4sXG4gICAgcnNFbW9qaSA9ICcoPzonICsgW3JzRGluZ2JhdCwgcnNSZWdpb25hbCwgcnNTdXJyUGFpcl0uam9pbignfCcpICsgJyknICsgcnNTZXEsXG4gICAgcnNTeW1ib2wgPSAnKD86JyArIFtyc05vbkFzdHJhbCArIHJzQ29tYm8gKyAnPycsIHJzQ29tYm8sIHJzUmVnaW9uYWwsIHJzU3VyclBhaXIsIHJzQXN0cmFsXS5qb2luKCd8JykgKyAnKSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGFwb3N0cm9waGVzLiAqL1xudmFyIHJlQXBvcyA9IFJlZ0V4cChyc0Fwb3MsICdnJyk7XG5cbi8qKlxuICogVXNlZCB0byBtYXRjaCBbY29tYmluaW5nIGRpYWNyaXRpY2FsIG1hcmtzXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Db21iaW5pbmdfRGlhY3JpdGljYWxfTWFya3MpIGFuZFxuICogW2NvbWJpbmluZyBkaWFjcml0aWNhbCBtYXJrcyBmb3Igc3ltYm9sc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ29tYmluaW5nX0RpYWNyaXRpY2FsX01hcmtzX2Zvcl9TeW1ib2xzKS5cbiAqL1xudmFyIHJlQ29tYm9NYXJrID0gUmVnRXhwKHJzQ29tYm8sICdnJyk7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIFtzdHJpbmcgc3ltYm9sc10oaHR0cHM6Ly9tYXRoaWFzYnluZW5zLmJlL25vdGVzL2phdmFzY3JpcHQtdW5pY29kZSkuICovXG52YXIgcmVVbmljb2RlID0gUmVnRXhwKHJzRml0eiArICcoPz0nICsgcnNGaXR6ICsgJyl8JyArIHJzU3ltYm9sICsgcnNTZXEsICdnJyk7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGNvbXBsZXggb3IgY29tcG91bmQgd29yZHMuICovXG52YXIgcmVVbmljb2RlV29yZCA9IFJlZ0V4cChbXG4gIHJzVXBwZXIgKyAnPycgKyByc0xvd2VyICsgJysnICsgcnNPcHRMb3dlckNvbnRyICsgJyg/PScgKyBbcnNCcmVhaywgcnNVcHBlciwgJyQnXS5qb2luKCd8JykgKyAnKScsXG4gIHJzVXBwZXJNaXNjICsgJysnICsgcnNPcHRVcHBlckNvbnRyICsgJyg/PScgKyBbcnNCcmVhaywgcnNVcHBlciArIHJzTG93ZXJNaXNjLCAnJCddLmpvaW4oJ3wnKSArICcpJyxcbiAgcnNVcHBlciArICc/JyArIHJzTG93ZXJNaXNjICsgJysnICsgcnNPcHRMb3dlckNvbnRyLFxuICByc1VwcGVyICsgJysnICsgcnNPcHRVcHBlckNvbnRyLFxuICByc0RpZ2l0cyxcbiAgcnNFbW9qaVxuXS5qb2luKCd8JyksICdnJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBzdHJpbmdzIHdpdGggW3plcm8td2lkdGggam9pbmVycyBvciBjb2RlIHBvaW50cyBmcm9tIHRoZSBhc3RyYWwgcGxhbmVzXShodHRwOi8vZWV2LmVlL2Jsb2cvMjAxNS8wOS8xMi9kYXJrLWNvcm5lcnMtb2YtdW5pY29kZS8pLiAqL1xudmFyIHJlSGFzVW5pY29kZSA9IFJlZ0V4cCgnWycgKyByc1pXSiArIHJzQXN0cmFsUmFuZ2UgICsgcnNDb21ib01hcmtzUmFuZ2UgKyByc0NvbWJvU3ltYm9sc1JhbmdlICsgcnNWYXJSYW5nZSArICddJyk7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBzdHJpbmdzIHRoYXQgbmVlZCBhIG1vcmUgcm9idXN0IHJlZ2V4cCB0byBtYXRjaCB3b3Jkcy4gKi9cbnZhciByZUhhc1VuaWNvZGVXb3JkID0gL1thLXpdW0EtWl18W0EtWl17Mix9W2Etel18WzAtOV1bYS16QS1aXXxbYS16QS1aXVswLTldfFteYS16QS1aMC05IF0vO1xuXG4vKiogVXNlZCB0byBtYXAgTGF0aW4gVW5pY29kZSBsZXR0ZXJzIHRvIGJhc2ljIExhdGluIGxldHRlcnMuICovXG52YXIgZGVidXJyZWRMZXR0ZXJzID0ge1xuICAvLyBMYXRpbi0xIFN1cHBsZW1lbnQgYmxvY2suXG4gICdcXHhjMCc6ICdBJywgICdcXHhjMSc6ICdBJywgJ1xceGMyJzogJ0EnLCAnXFx4YzMnOiAnQScsICdcXHhjNCc6ICdBJywgJ1xceGM1JzogJ0EnLFxuICAnXFx4ZTAnOiAnYScsICAnXFx4ZTEnOiAnYScsICdcXHhlMic6ICdhJywgJ1xceGUzJzogJ2EnLCAnXFx4ZTQnOiAnYScsICdcXHhlNSc6ICdhJyxcbiAgJ1xceGM3JzogJ0MnLCAgJ1xceGU3JzogJ2MnLFxuICAnXFx4ZDAnOiAnRCcsICAnXFx4ZjAnOiAnZCcsXG4gICdcXHhjOCc6ICdFJywgICdcXHhjOSc6ICdFJywgJ1xceGNhJzogJ0UnLCAnXFx4Y2InOiAnRScsXG4gICdcXHhlOCc6ICdlJywgICdcXHhlOSc6ICdlJywgJ1xceGVhJzogJ2UnLCAnXFx4ZWInOiAnZScsXG4gICdcXHhjYyc6ICdJJywgICdcXHhjZCc6ICdJJywgJ1xceGNlJzogJ0knLCAnXFx4Y2YnOiAnSScsXG4gICdcXHhlYyc6ICdpJywgICdcXHhlZCc6ICdpJywgJ1xceGVlJzogJ2knLCAnXFx4ZWYnOiAnaScsXG4gICdcXHhkMSc6ICdOJywgICdcXHhmMSc6ICduJyxcbiAgJ1xceGQyJzogJ08nLCAgJ1xceGQzJzogJ08nLCAnXFx4ZDQnOiAnTycsICdcXHhkNSc6ICdPJywgJ1xceGQ2JzogJ08nLCAnXFx4ZDgnOiAnTycsXG4gICdcXHhmMic6ICdvJywgICdcXHhmMyc6ICdvJywgJ1xceGY0JzogJ28nLCAnXFx4ZjUnOiAnbycsICdcXHhmNic6ICdvJywgJ1xceGY4JzogJ28nLFxuICAnXFx4ZDknOiAnVScsICAnXFx4ZGEnOiAnVScsICdcXHhkYic6ICdVJywgJ1xceGRjJzogJ1UnLFxuICAnXFx4ZjknOiAndScsICAnXFx4ZmEnOiAndScsICdcXHhmYic6ICd1JywgJ1xceGZjJzogJ3UnLFxuICAnXFx4ZGQnOiAnWScsICAnXFx4ZmQnOiAneScsICdcXHhmZic6ICd5JyxcbiAgJ1xceGM2JzogJ0FlJywgJ1xceGU2JzogJ2FlJyxcbiAgJ1xceGRlJzogJ1RoJywgJ1xceGZlJzogJ3RoJyxcbiAgJ1xceGRmJzogJ3NzJyxcbiAgLy8gTGF0aW4gRXh0ZW5kZWQtQSBibG9jay5cbiAgJ1xcdTAxMDAnOiAnQScsICAnXFx1MDEwMic6ICdBJywgJ1xcdTAxMDQnOiAnQScsXG4gICdcXHUwMTAxJzogJ2EnLCAgJ1xcdTAxMDMnOiAnYScsICdcXHUwMTA1JzogJ2EnLFxuICAnXFx1MDEwNic6ICdDJywgICdcXHUwMTA4JzogJ0MnLCAnXFx1MDEwYSc6ICdDJywgJ1xcdTAxMGMnOiAnQycsXG4gICdcXHUwMTA3JzogJ2MnLCAgJ1xcdTAxMDknOiAnYycsICdcXHUwMTBiJzogJ2MnLCAnXFx1MDEwZCc6ICdjJyxcbiAgJ1xcdTAxMGUnOiAnRCcsICAnXFx1MDExMCc6ICdEJywgJ1xcdTAxMGYnOiAnZCcsICdcXHUwMTExJzogJ2QnLFxuICAnXFx1MDExMic6ICdFJywgICdcXHUwMTE0JzogJ0UnLCAnXFx1MDExNic6ICdFJywgJ1xcdTAxMTgnOiAnRScsICdcXHUwMTFhJzogJ0UnLFxuICAnXFx1MDExMyc6ICdlJywgICdcXHUwMTE1JzogJ2UnLCAnXFx1MDExNyc6ICdlJywgJ1xcdTAxMTknOiAnZScsICdcXHUwMTFiJzogJ2UnLFxuICAnXFx1MDExYyc6ICdHJywgICdcXHUwMTFlJzogJ0cnLCAnXFx1MDEyMCc6ICdHJywgJ1xcdTAxMjInOiAnRycsXG4gICdcXHUwMTFkJzogJ2cnLCAgJ1xcdTAxMWYnOiAnZycsICdcXHUwMTIxJzogJ2cnLCAnXFx1MDEyMyc6ICdnJyxcbiAgJ1xcdTAxMjQnOiAnSCcsICAnXFx1MDEyNic6ICdIJywgJ1xcdTAxMjUnOiAnaCcsICdcXHUwMTI3JzogJ2gnLFxuICAnXFx1MDEyOCc6ICdJJywgICdcXHUwMTJhJzogJ0knLCAnXFx1MDEyYyc6ICdJJywgJ1xcdTAxMmUnOiAnSScsICdcXHUwMTMwJzogJ0knLFxuICAnXFx1MDEyOSc6ICdpJywgICdcXHUwMTJiJzogJ2knLCAnXFx1MDEyZCc6ICdpJywgJ1xcdTAxMmYnOiAnaScsICdcXHUwMTMxJzogJ2knLFxuICAnXFx1MDEzNCc6ICdKJywgICdcXHUwMTM1JzogJ2onLFxuICAnXFx1MDEzNic6ICdLJywgICdcXHUwMTM3JzogJ2snLCAnXFx1MDEzOCc6ICdrJyxcbiAgJ1xcdTAxMzknOiAnTCcsICAnXFx1MDEzYic6ICdMJywgJ1xcdTAxM2QnOiAnTCcsICdcXHUwMTNmJzogJ0wnLCAnXFx1MDE0MSc6ICdMJyxcbiAgJ1xcdTAxM2EnOiAnbCcsICAnXFx1MDEzYyc6ICdsJywgJ1xcdTAxM2UnOiAnbCcsICdcXHUwMTQwJzogJ2wnLCAnXFx1MDE0Mic6ICdsJyxcbiAgJ1xcdTAxNDMnOiAnTicsICAnXFx1MDE0NSc6ICdOJywgJ1xcdTAxNDcnOiAnTicsICdcXHUwMTRhJzogJ04nLFxuICAnXFx1MDE0NCc6ICduJywgICdcXHUwMTQ2JzogJ24nLCAnXFx1MDE0OCc6ICduJywgJ1xcdTAxNGInOiAnbicsXG4gICdcXHUwMTRjJzogJ08nLCAgJ1xcdTAxNGUnOiAnTycsICdcXHUwMTUwJzogJ08nLFxuICAnXFx1MDE0ZCc6ICdvJywgICdcXHUwMTRmJzogJ28nLCAnXFx1MDE1MSc6ICdvJyxcbiAgJ1xcdTAxNTQnOiAnUicsICAnXFx1MDE1Nic6ICdSJywgJ1xcdTAxNTgnOiAnUicsXG4gICdcXHUwMTU1JzogJ3InLCAgJ1xcdTAxNTcnOiAncicsICdcXHUwMTU5JzogJ3InLFxuICAnXFx1MDE1YSc6ICdTJywgICdcXHUwMTVjJzogJ1MnLCAnXFx1MDE1ZSc6ICdTJywgJ1xcdTAxNjAnOiAnUycsXG4gICdcXHUwMTViJzogJ3MnLCAgJ1xcdTAxNWQnOiAncycsICdcXHUwMTVmJzogJ3MnLCAnXFx1MDE2MSc6ICdzJyxcbiAgJ1xcdTAxNjInOiAnVCcsICAnXFx1MDE2NCc6ICdUJywgJ1xcdTAxNjYnOiAnVCcsXG4gICdcXHUwMTYzJzogJ3QnLCAgJ1xcdTAxNjUnOiAndCcsICdcXHUwMTY3JzogJ3QnLFxuICAnXFx1MDE2OCc6ICdVJywgICdcXHUwMTZhJzogJ1UnLCAnXFx1MDE2Yyc6ICdVJywgJ1xcdTAxNmUnOiAnVScsICdcXHUwMTcwJzogJ1UnLCAnXFx1MDE3Mic6ICdVJyxcbiAgJ1xcdTAxNjknOiAndScsICAnXFx1MDE2Yic6ICd1JywgJ1xcdTAxNmQnOiAndScsICdcXHUwMTZmJzogJ3UnLCAnXFx1MDE3MSc6ICd1JywgJ1xcdTAxNzMnOiAndScsXG4gICdcXHUwMTc0JzogJ1cnLCAgJ1xcdTAxNzUnOiAndycsXG4gICdcXHUwMTc2JzogJ1knLCAgJ1xcdTAxNzcnOiAneScsICdcXHUwMTc4JzogJ1knLFxuICAnXFx1MDE3OSc6ICdaJywgICdcXHUwMTdiJzogJ1onLCAnXFx1MDE3ZCc6ICdaJyxcbiAgJ1xcdTAxN2EnOiAneicsICAnXFx1MDE3Yyc6ICd6JywgJ1xcdTAxN2UnOiAneicsXG4gICdcXHUwMTMyJzogJ0lKJywgJ1xcdTAxMzMnOiAnaWonLFxuICAnXFx1MDE1Mic6ICdPZScsICdcXHUwMTUzJzogJ29lJyxcbiAgJ1xcdTAxNDknOiBcIiduXCIsICdcXHUwMTdmJzogJ3NzJ1xufTtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBnbG9iYWxgIGZyb20gTm9kZS5qcy4gKi9cbnZhciBmcmVlR2xvYmFsID0gdHlwZW9mIGdsb2JhbCA9PSAnb2JqZWN0JyAmJiBnbG9iYWwgJiYgZ2xvYmFsLk9iamVjdCA9PT0gT2JqZWN0ICYmIGdsb2JhbDtcblxuLyoqIERldGVjdCBmcmVlIHZhcmlhYmxlIGBzZWxmYC4gKi9cbnZhciBmcmVlU2VsZiA9IHR5cGVvZiBzZWxmID09ICdvYmplY3QnICYmIHNlbGYgJiYgc2VsZi5PYmplY3QgPT09IE9iamVjdCAmJiBzZWxmO1xuXG4vKiogVXNlZCBhcyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsIG9iamVjdC4gKi9cbnZhciByb290ID0gZnJlZUdsb2JhbCB8fCBmcmVlU2VsZiB8fCBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXG4vKipcbiAqIEEgc3BlY2lhbGl6ZWQgdmVyc2lvbiBvZiBgXy5yZWR1Y2VgIGZvciBhcnJheXMgd2l0aG91dCBzdXBwb3J0IGZvclxuICogaXRlcmF0ZWUgc2hvcnRoYW5kcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gW2FycmF5XSBUaGUgYXJyYXkgdG8gaXRlcmF0ZSBvdmVyLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gaXRlcmF0ZWUgVGhlIGZ1bmN0aW9uIGludm9rZWQgcGVyIGl0ZXJhdGlvbi5cbiAqIEBwYXJhbSB7Kn0gW2FjY3VtdWxhdG9yXSBUaGUgaW5pdGlhbCB2YWx1ZS5cbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2luaXRBY2N1bV0gU3BlY2lmeSB1c2luZyB0aGUgZmlyc3QgZWxlbWVudCBvZiBgYXJyYXlgIGFzXG4gKiAgdGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcmV0dXJucyB7Kn0gUmV0dXJucyB0aGUgYWNjdW11bGF0ZWQgdmFsdWUuXG4gKi9cbmZ1bmN0aW9uIGFycmF5UmVkdWNlKGFycmF5LCBpdGVyYXRlZSwgYWNjdW11bGF0b3IsIGluaXRBY2N1bSkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IGFycmF5ID8gYXJyYXkubGVuZ3RoIDogMDtcblxuICBpZiAoaW5pdEFjY3VtICYmIGxlbmd0aCkge1xuICAgIGFjY3VtdWxhdG9yID0gYXJyYXlbKytpbmRleF07XG4gIH1cbiAgd2hpbGUgKCsraW5kZXggPCBsZW5ndGgpIHtcbiAgICBhY2N1bXVsYXRvciA9IGl0ZXJhdGVlKGFjY3VtdWxhdG9yLCBhcnJheVtpbmRleF0sIGluZGV4LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIGFjY3VtdWxhdG9yO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGFuIEFTQ0lJIGBzdHJpbmdgIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY29udmVydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBhc2NpaVRvQXJyYXkoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcuc3BsaXQoJycpO1xufVxuXG4vKipcbiAqIFNwbGl0cyBhbiBBU0NJSSBgc3RyaW5nYCBpbnRvIGFuIGFycmF5IG9mIGl0cyB3b3Jkcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgd29yZHMgb2YgYHN0cmluZ2AuXG4gKi9cbmZ1bmN0aW9uIGFzY2lpV29yZHMoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcubWF0Y2gocmVBc2NpaVdvcmQpIHx8IFtdO1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnByb3BlcnR5T2ZgIHdpdGhvdXQgc3VwcG9ydCBmb3IgZGVlcCBwYXRocy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtPYmplY3R9IG9iamVjdCBUaGUgb2JqZWN0IHRvIHF1ZXJ5LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgYWNjZXNzb3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGJhc2VQcm9wZXJ0eU9mKG9iamVjdCkge1xuICByZXR1cm4gZnVuY3Rpb24oa2V5KSB7XG4gICAgcmV0dXJuIG9iamVjdCA9PSBudWxsID8gdW5kZWZpbmVkIDogb2JqZWN0W2tleV07XG4gIH07XG59XG5cbi8qKlxuICogVXNlZCBieSBgXy5kZWJ1cnJgIHRvIGNvbnZlcnQgTGF0aW4tMSBTdXBwbGVtZW50IGFuZCBMYXRpbiBFeHRlbmRlZC1BXG4gKiBsZXR0ZXJzIHRvIGJhc2ljIExhdGluIGxldHRlcnMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBsZXR0ZXIgVGhlIG1hdGNoZWQgbGV0dGVyIHRvIGRlYnVyci5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGRlYnVycmVkIGxldHRlci5cbiAqL1xudmFyIGRlYnVyckxldHRlciA9IGJhc2VQcm9wZXJ0eU9mKGRlYnVycmVkTGV0dGVycyk7XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBzdHJpbmdgIGNvbnRhaW5zIFVuaWNvZGUgc3ltYm9scy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYSBzeW1ib2wgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzVW5pY29kZShzdHJpbmcpIHtcbiAgcmV0dXJuIHJlSGFzVW5pY29kZS50ZXN0KHN0cmluZyk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGBzdHJpbmdgIGNvbnRhaW5zIGEgd29yZCBjb21wb3NlZCBvZiBVbmljb2RlIHN5bWJvbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGEgd29yZCBpcyBmb3VuZCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBoYXNVbmljb2RlV29yZChzdHJpbmcpIHtcbiAgcmV0dXJuIHJlSGFzVW5pY29kZVdvcmQudGVzdChzdHJpbmcpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY29udmVydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiBzdHJpbmdUb0FycmF5KHN0cmluZykge1xuICByZXR1cm4gaGFzVW5pY29kZShzdHJpbmcpXG4gICAgPyB1bmljb2RlVG9BcnJheShzdHJpbmcpXG4gICAgOiBhc2NpaVRvQXJyYXkoc3RyaW5nKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhIFVuaWNvZGUgYHN0cmluZ2AgdG8gYW4gYXJyYXkuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgYXJyYXkuXG4gKi9cbmZ1bmN0aW9uIHVuaWNvZGVUb0FycmF5KHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLm1hdGNoKHJlVW5pY29kZSkgfHwgW107XG59XG5cbi8qKlxuICogU3BsaXRzIGEgVW5pY29kZSBgc3RyaW5nYCBpbnRvIGFuIGFycmF5IG9mIGl0cyB3b3Jkcy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgd29yZHMgb2YgYHN0cmluZ2AuXG4gKi9cbmZ1bmN0aW9uIHVuaWNvZGVXb3JkcyhzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5tYXRjaChyZVVuaWNvZGVXb3JkKSB8fCBbXTtcbn1cblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qKiBCdWlsdC1pbiB2YWx1ZSByZWZlcmVuY2VzLiAqL1xudmFyIFN5bWJvbCA9IHJvb3QuU3ltYm9sO1xuXG4vKiogVXNlZCB0byBjb252ZXJ0IHN5bWJvbHMgdG8gcHJpbWl0aXZlcyBhbmQgc3RyaW5ncy4gKi9cbnZhciBzeW1ib2xQcm90byA9IFN5bWJvbCA/IFN5bWJvbC5wcm90b3R5cGUgOiB1bmRlZmluZWQsXG4gICAgc3ltYm9sVG9TdHJpbmcgPSBzeW1ib2xQcm90byA/IHN5bWJvbFByb3RvLnRvU3RyaW5nIDogdW5kZWZpbmVkO1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnNsaWNlYCB3aXRob3V0IGFuIGl0ZXJhdGVlIGNhbGwgZ3VhcmQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBzbGljZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RhcnQ9MF0gVGhlIHN0YXJ0IHBvc2l0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IFtlbmQ9YXJyYXkubGVuZ3RoXSBUaGUgZW5kIHBvc2l0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBzbGljZSBvZiBgYXJyYXlgLlxuICovXG5mdW5jdGlvbiBiYXNlU2xpY2UoYXJyYXksIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG5cbiAgaWYgKHN0YXJ0IDwgMCkge1xuICAgIHN0YXJ0ID0gLXN0YXJ0ID4gbGVuZ3RoID8gMCA6IChsZW5ndGggKyBzdGFydCk7XG4gIH1cbiAgZW5kID0gZW5kID4gbGVuZ3RoID8gbGVuZ3RoIDogZW5kO1xuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5ndGg7XG4gIH1cbiAgbGVuZ3RoID0gc3RhcnQgPiBlbmQgPyAwIDogKChlbmQgLSBzdGFydCkgPj4+IDApO1xuICBzdGFydCA+Pj49IDA7XG5cbiAgdmFyIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgcmVzdWx0W2luZGV4XSA9IGFycmF5W2luZGV4ICsgc3RhcnRdO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogVGhlIGJhc2UgaW1wbGVtZW50YXRpb24gb2YgYF8udG9TdHJpbmdgIHdoaWNoIGRvZXNuJ3QgY29udmVydCBudWxsaXNoXG4gKiB2YWx1ZXMgdG8gZW1wdHkgc3RyaW5ncy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcHJvY2Vzcy5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIHN0cmluZy5cbiAqL1xuZnVuY3Rpb24gYmFzZVRvU3RyaW5nKHZhbHVlKSB7XG4gIC8vIEV4aXQgZWFybHkgZm9yIHN0cmluZ3MgdG8gYXZvaWQgYSBwZXJmb3JtYW5jZSBoaXQgaW4gc29tZSBlbnZpcm9ubWVudHMuXG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBzeW1ib2xUb1N0cmluZyA/IHN5bWJvbFRvU3RyaW5nLmNhbGwodmFsdWUpIDogJyc7XG4gIH1cbiAgdmFyIHJlc3VsdCA9ICh2YWx1ZSArICcnKTtcbiAgcmV0dXJuIChyZXN1bHQgPT0gJzAnICYmICgxIC8gdmFsdWUpID09IC1JTkZJTklUWSkgPyAnLTAnIDogcmVzdWx0O1xufVxuXG4vKipcbiAqIENhc3RzIGBhcnJheWAgdG8gYSBzbGljZSBpZiBpdCdzIG5lZWRlZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtBcnJheX0gYXJyYXkgVGhlIGFycmF5IHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge251bWJlcn0gc3RhcnQgVGhlIHN0YXJ0IHBvc2l0aW9uLlxuICogQHBhcmFtIHtudW1iZXJ9IFtlbmQ9YXJyYXkubGVuZ3RoXSBUaGUgZW5kIHBvc2l0aW9uLlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSBjYXN0IHNsaWNlLlxuICovXG5mdW5jdGlvbiBjYXN0U2xpY2UoYXJyYXksIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIGxlbmd0aCA9IGFycmF5Lmxlbmd0aDtcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW5ndGggOiBlbmQ7XG4gIHJldHVybiAoIXN0YXJ0ICYmIGVuZCA+PSBsZW5ndGgpID8gYXJyYXkgOiBiYXNlU2xpY2UoYXJyYXksIHN0YXJ0LCBlbmQpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiBsaWtlIGBfLmxvd2VyRmlyc3RgLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbWV0aG9kTmFtZSBUaGUgbmFtZSBvZiB0aGUgYFN0cmluZ2AgY2FzZSBtZXRob2QgdG8gdXNlLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY2FzZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ2FzZUZpcnN0KG1ldGhvZE5hbWUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0cmluZykge1xuICAgIHN0cmluZyA9IHRvU3RyaW5nKHN0cmluZyk7XG5cbiAgICB2YXIgc3RyU3ltYm9scyA9IGhhc1VuaWNvZGUoc3RyaW5nKVxuICAgICAgPyBzdHJpbmdUb0FycmF5KHN0cmluZylcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgdmFyIGNociA9IHN0clN5bWJvbHNcbiAgICAgID8gc3RyU3ltYm9sc1swXVxuICAgICAgOiBzdHJpbmcuY2hhckF0KDApO1xuXG4gICAgdmFyIHRyYWlsaW5nID0gc3RyU3ltYm9sc1xuICAgICAgPyBjYXN0U2xpY2Uoc3RyU3ltYm9scywgMSkuam9pbignJylcbiAgICAgIDogc3RyaW5nLnNsaWNlKDEpO1xuXG4gICAgcmV0dXJuIGNoclttZXRob2ROYW1lXSgpICsgdHJhaWxpbmc7XG4gIH07XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGZ1bmN0aW9uIGxpa2UgYF8uY2FtZWxDYXNlYC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gY2FsbGJhY2sgVGhlIGZ1bmN0aW9uIHRvIGNvbWJpbmUgZWFjaCB3b3JkLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgY29tcG91bmRlciBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlQ29tcG91bmRlcihjYWxsYmFjaykge1xuICByZXR1cm4gZnVuY3Rpb24oc3RyaW5nKSB7XG4gICAgcmV0dXJuIGFycmF5UmVkdWNlKHdvcmRzKGRlYnVycihzdHJpbmcpLnJlcGxhY2UocmVBcG9zLCAnJykpLCBjYWxsYmFjaywgJycpO1xuICB9O1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgc3RyaW5nLiBBbiBlbXB0eSBzdHJpbmcgaXMgcmV0dXJuZWQgZm9yIGBudWxsYFxuICogYW5kIGB1bmRlZmluZWRgIHZhbHVlcy4gVGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9TdHJpbmcobnVsbCk7XG4gKiAvLyA9PiAnJ1xuICpcbiAqIF8udG9TdHJpbmcoLTApO1xuICogLy8gPT4gJy0wJ1xuICpcbiAqIF8udG9TdHJpbmcoWzEsIDIsIDNdKTtcbiAqIC8vID0+ICcxLDIsMydcbiAqL1xuZnVuY3Rpb24gdG9TdHJpbmcodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlID09IG51bGwgPyAnJyA6IGJhc2VUb1N0cmluZyh2YWx1ZSk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHN0cmluZ2AgdG8gW2NhbWVsIGNhc2VdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NhbWVsQ2FzZSkuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNhbWVsIGNhc2VkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5jYW1lbENhc2UoJ0ZvbyBCYXInKTtcbiAqIC8vID0+ICdmb29CYXInXG4gKlxuICogXy5jYW1lbENhc2UoJy0tZm9vLWJhci0tJyk7XG4gKiAvLyA9PiAnZm9vQmFyJ1xuICpcbiAqIF8uY2FtZWxDYXNlKCdfX0ZPT19CQVJfXycpO1xuICogLy8gPT4gJ2Zvb0JhcidcbiAqL1xudmFyIGNhbWVsQ2FzZSA9IGNyZWF0ZUNvbXBvdW5kZXIoZnVuY3Rpb24ocmVzdWx0LCB3b3JkLCBpbmRleCkge1xuICB3b3JkID0gd29yZC50b0xvd2VyQ2FzZSgpO1xuICByZXR1cm4gcmVzdWx0ICsgKGluZGV4ID8gY2FwaXRhbGl6ZSh3b3JkKSA6IHdvcmQpO1xufSk7XG5cbi8qKlxuICogQ29udmVydHMgdGhlIGZpcnN0IGNoYXJhY3RlciBvZiBgc3RyaW5nYCB0byB1cHBlciBjYXNlIGFuZCB0aGUgcmVtYWluaW5nXG4gKiB0byBsb3dlciBjYXNlLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGNhcGl0YWxpemUuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjYXBpdGFsaXplZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uY2FwaXRhbGl6ZSgnRlJFRCcpO1xuICogLy8gPT4gJ0ZyZWQnXG4gKi9cbmZ1bmN0aW9uIGNhcGl0YWxpemUoc3RyaW5nKSB7XG4gIHJldHVybiB1cHBlckZpcnN0KHRvU3RyaW5nKHN0cmluZykudG9Mb3dlckNhc2UoKSk7XG59XG5cbi8qKlxuICogRGVidXJycyBgc3RyaW5nYCBieSBjb252ZXJ0aW5nXG4gKiBbTGF0aW4tMSBTdXBwbGVtZW50XShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9MYXRpbi0xX1N1cHBsZW1lbnRfKFVuaWNvZGVfYmxvY2spI0NoYXJhY3Rlcl90YWJsZSlcbiAqIGFuZCBbTGF0aW4gRXh0ZW5kZWQtQV0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGF0aW5fRXh0ZW5kZWQtQSlcbiAqIGxldHRlcnMgdG8gYmFzaWMgTGF0aW4gbGV0dGVycyBhbmQgcmVtb3ZpbmdcbiAqIFtjb21iaW5pbmcgZGlhY3JpdGljYWwgbWFya3NdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NvbWJpbmluZ19EaWFjcml0aWNhbF9NYXJrcykuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gZGVidXJyLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgZGVidXJyZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmRlYnVycignZMOpasOgIHZ1Jyk7XG4gKiAvLyA9PiAnZGVqYSB2dSdcbiAqL1xuZnVuY3Rpb24gZGVidXJyKHN0cmluZykge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuICByZXR1cm4gc3RyaW5nICYmIHN0cmluZy5yZXBsYWNlKHJlTGF0aW4sIGRlYnVyckxldHRlcikucmVwbGFjZShyZUNvbWJvTWFyaywgJycpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgYHN0cmluZ2AgdG8gdXBwZXIgY2FzZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBjb252ZXJ0LlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY29udmVydGVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy51cHBlckZpcnN0KCdmcmVkJyk7XG4gKiAvLyA9PiAnRnJlZCdcbiAqXG4gKiBfLnVwcGVyRmlyc3QoJ0ZSRUQnKTtcbiAqIC8vID0+ICdGUkVEJ1xuICovXG52YXIgdXBwZXJGaXJzdCA9IGNyZWF0ZUNhc2VGaXJzdCgndG9VcHBlckNhc2UnKTtcblxuLyoqXG4gKiBTcGxpdHMgYHN0cmluZ2AgaW50byBhbiBhcnJheSBvZiBpdHMgd29yZHMuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAzLjAuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEBwYXJhbSB7UmVnRXhwfHN0cmluZ30gW3BhdHRlcm5dIFRoZSBwYXR0ZXJuIHRvIG1hdGNoIHdvcmRzLlxuICogQHBhcmFtLSB7T2JqZWN0fSBbZ3VhcmRdIEVuYWJsZXMgdXNlIGFzIGFuIGl0ZXJhdGVlIGZvciBtZXRob2RzIGxpa2UgYF8ubWFwYC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgd29yZHMgb2YgYHN0cmluZ2AuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8ud29yZHMoJ2ZyZWQsIGJhcm5leSwgJiBwZWJibGVzJyk7XG4gKiAvLyA9PiBbJ2ZyZWQnLCAnYmFybmV5JywgJ3BlYmJsZXMnXVxuICpcbiAqIF8ud29yZHMoJ2ZyZWQsIGJhcm5leSwgJiBwZWJibGVzJywgL1teLCBdKy9nKTtcbiAqIC8vID0+IFsnZnJlZCcsICdiYXJuZXknLCAnJicsICdwZWJibGVzJ11cbiAqL1xuZnVuY3Rpb24gd29yZHMoc3RyaW5nLCBwYXR0ZXJuLCBndWFyZCkge1xuICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuICBwYXR0ZXJuID0gZ3VhcmQgPyB1bmRlZmluZWQgOiBwYXR0ZXJuO1xuXG4gIGlmIChwYXR0ZXJuID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gaGFzVW5pY29kZVdvcmQoc3RyaW5nKSA/IHVuaWNvZGVXb3JkcyhzdHJpbmcpIDogYXNjaWlXb3JkcyhzdHJpbmcpO1xuICB9XG4gIHJldHVybiBzdHJpbmcubWF0Y2gocGF0dGVybikgfHwgW107XG59XG5cbm1vZHVsZS5leHBvcnRzID0gY2FtZWxDYXNlO1xuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBVc2VkIGFzIHJlZmVyZW5jZXMgZm9yIHZhcmlvdXMgYE51bWJlcmAgY29uc3RhbnRzLiAqL1xudmFyIElORklOSVRZID0gMSAvIDAsXG4gICAgTUFYX1NBRkVfSU5URUdFUiA9IDkwMDcxOTkyNTQ3NDA5OTEsXG4gICAgTUFYX0lOVEVHRVIgPSAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOCxcbiAgICBOQU4gPSAwIC8gMDtcblxuLyoqIGBPYmplY3QjdG9TdHJpbmdgIHJlc3VsdCByZWZlcmVuY2VzLiAqL1xudmFyIGZ1bmNUYWcgPSAnW29iamVjdCBGdW5jdGlvbl0nLFxuICAgIGdlblRhZyA9ICdbb2JqZWN0IEdlbmVyYXRvckZ1bmN0aW9uXScsXG4gICAgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIGxlYWRpbmcgYW5kIHRyYWlsaW5nIHdoaXRlc3BhY2UuICovXG52YXIgcmVUcmltID0gL15cXHMrfFxccyskL2c7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBiYWQgc2lnbmVkIGhleGFkZWNpbWFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JhZEhleCA9IC9eWy0rXTB4WzAtOWEtZl0rJC9pO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmluYXJ5IHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc0JpbmFyeSA9IC9eMGJbMDFdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IG9jdGFsIHN0cmluZyB2YWx1ZXMuICovXG52YXIgcmVJc09jdGFsID0gL14wb1swLTddKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IHVuc2lnbmVkIGludGVnZXIgdmFsdWVzLiAqL1xudmFyIHJlSXNVaW50ID0gL14oPzowfFsxLTldXFxkKikkLztcblxuLyoqIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIHdpdGhvdXQgYSBkZXBlbmRlbmN5IG9uIGByb290YC4gKi9cbnZhciBmcmVlUGFyc2VJbnQgPSBwYXJzZUludDtcblxuLyoqIFVzZWQgZm9yIGJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzLiAqL1xudmFyIG9iamVjdFByb3RvID0gT2JqZWN0LnByb3RvdHlwZTtcblxuLyoqXG4gKiBVc2VkIHRvIHJlc29sdmUgdGhlXG4gKiBbYHRvU3RyaW5nVGFnYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtb2JqZWN0LnByb3RvdHlwZS50b3N0cmluZylcbiAqIG9mIHZhbHVlcy5cbiAqL1xudmFyIG9iamVjdFRvU3RyaW5nID0gb2JqZWN0UHJvdG8udG9TdHJpbmc7XG5cbi8qIEJ1aWx0LWluIG1ldGhvZCByZWZlcmVuY2VzIGZvciB0aG9zZSB3aXRoIHRoZSBzYW1lIG5hbWUgYXMgb3RoZXIgYGxvZGFzaGAgbWV0aG9kcy4gKi9cbnZhciBuYXRpdmVDZWlsID0gTWF0aC5jZWlsLFxuICAgIG5hdGl2ZU1heCA9IE1hdGgubWF4O1xuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnJhbmdlYCBhbmQgYF8ucmFuZ2VSaWdodGAgd2hpY2ggZG9lc24ndFxuICogY29lcmNlIGFyZ3VtZW50cy5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFRoZSBzdGFydCBvZiB0aGUgcmFuZ2UuXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIFRoZSBlbmQgb2YgdGhlIHJhbmdlLlxuICogQHBhcmFtIHtudW1iZXJ9IHN0ZXAgVGhlIHZhbHVlIHRvIGluY3JlbWVudCBvciBkZWNyZW1lbnQgYnkuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtmcm9tUmlnaHRdIFNwZWNpZnkgaXRlcmF0aW5nIGZyb20gcmlnaHQgdG8gbGVmdC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgcmFuZ2Ugb2YgbnVtYmVycy5cbiAqL1xuZnVuY3Rpb24gYmFzZVJhbmdlKHN0YXJ0LCBlbmQsIHN0ZXAsIGZyb21SaWdodCkge1xuICB2YXIgaW5kZXggPSAtMSxcbiAgICAgIGxlbmd0aCA9IG5hdGl2ZU1heChuYXRpdmVDZWlsKChlbmQgLSBzdGFydCkgLyAoc3RlcCB8fCAxKSksIDApLFxuICAgICAgcmVzdWx0ID0gQXJyYXkobGVuZ3RoKTtcblxuICB3aGlsZSAobGVuZ3RoLS0pIHtcbiAgICByZXN1bHRbZnJvbVJpZ2h0ID8gbGVuZ3RoIDogKytpbmRleF0gPSBzdGFydDtcbiAgICBzdGFydCArPSBzdGVwO1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIGBfLnJhbmdlYCBvciBgXy5yYW5nZVJpZ2h0YCBmdW5jdGlvbi5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259IFJldHVybnMgdGhlIG5ldyByYW5nZSBmdW5jdGlvbi5cbiAqL1xuZnVuY3Rpb24gY3JlYXRlUmFuZ2UoZnJvbVJpZ2h0KSB7XG4gIHJldHVybiBmdW5jdGlvbihzdGFydCwgZW5kLCBzdGVwKSB7XG4gICAgaWYgKHN0ZXAgJiYgdHlwZW9mIHN0ZXAgIT0gJ251bWJlcicgJiYgaXNJdGVyYXRlZUNhbGwoc3RhcnQsIGVuZCwgc3RlcCkpIHtcbiAgICAgIGVuZCA9IHN0ZXAgPSB1bmRlZmluZWQ7XG4gICAgfVxuICAgIC8vIEVuc3VyZSB0aGUgc2lnbiBvZiBgLTBgIGlzIHByZXNlcnZlZC5cbiAgICBzdGFydCA9IHRvRmluaXRlKHN0YXJ0KTtcbiAgICBpZiAoZW5kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGVuZCA9IHN0YXJ0O1xuICAgICAgc3RhcnQgPSAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmQgPSB0b0Zpbml0ZShlbmQpO1xuICAgIH1cbiAgICBzdGVwID0gc3RlcCA9PT0gdW5kZWZpbmVkID8gKHN0YXJ0IDwgZW5kID8gMSA6IC0xKSA6IHRvRmluaXRlKHN0ZXApO1xuICAgIHJldHVybiBiYXNlUmFuZ2Uoc3RhcnQsIGVuZCwgc3RlcCwgZnJvbVJpZ2h0KTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgaW5kZXguXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHBhcmFtIHtudW1iZXJ9IFtsZW5ndGg9TUFYX1NBRkVfSU5URUdFUl0gVGhlIHVwcGVyIGJvdW5kcyBvZiBhIHZhbGlkIGluZGV4LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBpbmRleCwgZWxzZSBgZmFsc2VgLlxuICovXG5mdW5jdGlvbiBpc0luZGV4KHZhbHVlLCBsZW5ndGgpIHtcbiAgbGVuZ3RoID0gbGVuZ3RoID09IG51bGwgPyBNQVhfU0FGRV9JTlRFR0VSIDogbGVuZ3RoO1xuICByZXR1cm4gISFsZW5ndGggJiZcbiAgICAodHlwZW9mIHZhbHVlID09ICdudW1iZXInIHx8IHJlSXNVaW50LnRlc3QodmFsdWUpKSAmJlxuICAgICh2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDwgbGVuZ3RoKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgdGhlIGdpdmVuIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgdmFsdWUgYXJndW1lbnQuXG4gKiBAcGFyYW0geyp9IGluZGV4IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgaW5kZXggb3Iga2V5IGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBvYmplY3QgVGhlIHBvdGVudGlhbCBpdGVyYXRlZSBvYmplY3QgYXJndW1lbnQuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGFyZ3VtZW50cyBhcmUgZnJvbSBhbiBpdGVyYXRlZSBjYWxsLFxuICogIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJdGVyYXRlZUNhbGwodmFsdWUsIGluZGV4LCBvYmplY3QpIHtcbiAgaWYgKCFpc09iamVjdChvYmplY3QpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHZhciB0eXBlID0gdHlwZW9mIGluZGV4O1xuICBpZiAodHlwZSA9PSAnbnVtYmVyJ1xuICAgICAgICA/IChpc0FycmF5TGlrZShvYmplY3QpICYmIGlzSW5kZXgoaW5kZXgsIG9iamVjdC5sZW5ndGgpKVxuICAgICAgICA6ICh0eXBlID09ICdzdHJpbmcnICYmIGluZGV4IGluIG9iamVjdClcbiAgICAgICkge1xuICAgIHJldHVybiBlcShvYmplY3RbaW5kZXhdLCB2YWx1ZSk7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vKipcbiAqIFBlcmZvcm1zIGFcbiAqIFtgU2FtZVZhbHVlWmVyb2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXNhbWV2YWx1ZXplcm8pXG4gKiBjb21wYXJpc29uIGJldHdlZW4gdHdvIHZhbHVlcyB0byBkZXRlcm1pbmUgaWYgdGhleSBhcmUgZXF1aXZhbGVudC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY29tcGFyZS5cbiAqIEBwYXJhbSB7Kn0gb3RoZXIgVGhlIG90aGVyIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHZhbHVlcyBhcmUgZXF1aXZhbGVudCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiB2YXIgb2JqZWN0ID0geyAnYSc6IDEgfTtcbiAqIHZhciBvdGhlciA9IHsgJ2EnOiAxIH07XG4gKlxuICogXy5lcShvYmplY3QsIG9iamVjdCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcShvYmplY3QsIG90aGVyKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcSgnYScsICdhJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5lcSgnYScsIE9iamVjdCgnYScpKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5lcShOYU4sIE5hTik7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGVxKHZhbHVlLCBvdGhlcikge1xuICByZXR1cm4gdmFsdWUgPT09IG90aGVyIHx8ICh2YWx1ZSAhPT0gdmFsdWUgJiYgb3RoZXIgIT09IG90aGVyKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLiBBIHZhbHVlIGlzIGNvbnNpZGVyZWQgYXJyYXktbGlrZSBpZiBpdCdzXG4gKiBub3QgYSBmdW5jdGlvbiBhbmQgaGFzIGEgYHZhbHVlLmxlbmd0aGAgdGhhdCdzIGFuIGludGVnZXIgZ3JlYXRlciB0aGFuIG9yXG4gKiBlcXVhbCB0byBgMGAgYW5kIGxlc3MgdGhhbiBvciBlcXVhbCB0byBgTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVJgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFycmF5LWxpa2UsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0FycmF5TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoZG9jdW1lbnQuYm9keS5jaGlsZHJlbik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZSgnYWJjJyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0FycmF5TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNBcnJheUxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIHZhbHVlICE9IG51bGwgJiYgaXNMZW5ndGgodmFsdWUubGVuZ3RoKSAmJiAhaXNGdW5jdGlvbih2YWx1ZSk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBGdW5jdGlvbmAgb2JqZWN0LlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgZnVuY3Rpb24sIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc0Z1bmN0aW9uKF8pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNGdW5jdGlvbigvYWJjLyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0Z1bmN0aW9uKHZhbHVlKSB7XG4gIC8vIFRoZSB1c2Ugb2YgYE9iamVjdCN0b1N0cmluZ2AgYXZvaWRzIGlzc3VlcyB3aXRoIHRoZSBgdHlwZW9mYCBvcGVyYXRvclxuICAvLyBpbiBTYWZhcmkgOC05IHdoaWNoIHJldHVybnMgJ29iamVjdCcgZm9yIHR5cGVkIGFycmF5IGFuZCBvdGhlciBjb25zdHJ1Y3RvcnMuXG4gIHZhciB0YWcgPSBpc09iamVjdCh2YWx1ZSkgPyBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICByZXR1cm4gdGFnID09IGZ1bmNUYWcgfHwgdGFnID09IGdlblRhZztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGFycmF5LWxpa2UgbGVuZ3RoLlxuICpcbiAqICoqTm90ZToqKiBUaGlzIG1ldGhvZCBpcyBsb29zZWx5IGJhc2VkIG9uXG4gKiBbYFRvTGVuZ3RoYF0oaHR0cDovL2VjbWEtaW50ZXJuYXRpb25hbC5vcmcvZWNtYS0yNjIvNy4wLyNzZWMtdG9sZW5ndGgpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgbGVuZ3RoLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNMZW5ndGgoMyk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc0xlbmd0aChOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IGZhbHNlXG4gKlxuICogXy5pc0xlbmd0aChJbmZpbml0eSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoJzMnKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzTGVuZ3RoKHZhbHVlKSB7XG4gIHJldHVybiB0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicgJiZcbiAgICB2YWx1ZSA+IC0xICYmIHZhbHVlICUgMSA9PSAwICYmIHZhbHVlIDw9IE1BWF9TQUZFX0lOVEVHRVI7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgdGhlXG4gKiBbbGFuZ3VhZ2UgdHlwZV0oaHR0cDovL3d3dy5lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLWVjbWFzY3JpcHQtbGFuZ3VhZ2UtdHlwZXMpXG4gKiBvZiBgT2JqZWN0YC4gKGUuZy4gYXJyYXlzLCBmdW5jdGlvbnMsIG9iamVjdHMsIHJlZ2V4ZXMsIGBuZXcgTnVtYmVyKDApYCwgYW5kIGBuZXcgU3RyaW5nKCcnKWApXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSAwLjEuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3Qoe30pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KF8ubm9vcCk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbHVlKSB7XG4gIHZhciB0eXBlID0gdHlwZW9mIHZhbHVlO1xuICByZXR1cm4gISF2YWx1ZSAmJiAodHlwZSA9PSAnb2JqZWN0JyB8fCB0eXBlID09ICdmdW5jdGlvbicpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLiBBIHZhbHVlIGlzIG9iamVjdC1saWtlIGlmIGl0J3Mgbm90IGBudWxsYFxuICogYW5kIGhhcyBhIGB0eXBlb2ZgIHJlc3VsdCBvZiBcIm9iamVjdFwiLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIG9iamVjdC1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShbMSwgMiwgM10pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKF8ubm9vcCk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNPYmplY3RMaWtlKG51bGwpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNPYmplY3RMaWtlKHZhbHVlKSB7XG4gIHJldHVybiAhIXZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PSAnb2JqZWN0Jztcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBjbGFzc2lmaWVkIGFzIGEgYFN5bWJvbGAgcHJpbWl0aXZlIG9yIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHN5bWJvbCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzU3ltYm9sKFN5bWJvbC5pdGVyYXRvcik7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc1N5bWJvbCgnYWJjJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N5bWJvbCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdzeW1ib2wnIHx8XG4gICAgKGlzT2JqZWN0TGlrZSh2YWx1ZSkgJiYgb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgPT0gc3ltYm9sVGFnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgZmluaXRlIG51bWJlci5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMTIuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBjb252ZXJ0ZWQgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvRmluaXRlKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvRmluaXRlKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b0Zpbml0ZShJbmZpbml0eSk7XG4gKiAvLyA9PiAxLjc5NzY5MzEzNDg2MjMxNTdlKzMwOFxuICpcbiAqIF8udG9GaW5pdGUoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvRmluaXRlKHZhbHVlKSB7XG4gIGlmICghdmFsdWUpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6IDA7XG4gIH1cbiAgdmFsdWUgPSB0b051bWJlcih2YWx1ZSk7XG4gIGlmICh2YWx1ZSA9PT0gSU5GSU5JVFkgfHwgdmFsdWUgPT09IC1JTkZJTklUWSkge1xuICAgIHZhciBzaWduID0gKHZhbHVlIDwgMCA/IC0xIDogMSk7XG4gICAgcmV0dXJuIHNpZ24gKiBNQVhfSU5URUdFUjtcbiAgfVxuICByZXR1cm4gdmFsdWUgPT09IHZhbHVlID8gdmFsdWUgOiAwO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGB2YWx1ZWAgdG8gYSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7bnVtYmVyfSBSZXR1cm5zIHRoZSBudW1iZXIuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udG9OdW1iZXIoMy4yKTtcbiAqIC8vID0+IDMuMlxuICpcbiAqIF8udG9OdW1iZXIoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiA1ZS0zMjRcbiAqXG4gKiBfLnRvTnVtYmVyKEluZmluaXR5KTtcbiAqIC8vID0+IEluZmluaXR5XG4gKlxuICogXy50b051bWJlcignMy4yJyk7XG4gKiAvLyA9PiAzLjJcbiAqL1xuZnVuY3Rpb24gdG9OdW1iZXIodmFsdWUpIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJykge1xuICAgIHJldHVybiB2YWx1ZTtcbiAgfVxuICBpZiAoaXNTeW1ib2wodmFsdWUpKSB7XG4gICAgcmV0dXJuIE5BTjtcbiAgfVxuICBpZiAoaXNPYmplY3QodmFsdWUpKSB7XG4gICAgdmFyIG90aGVyID0gdHlwZW9mIHZhbHVlLnZhbHVlT2YgPT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLnZhbHVlT2YoKSA6IHZhbHVlO1xuICAgIHZhbHVlID0gaXNPYmplY3Qob3RoZXIpID8gKG90aGVyICsgJycpIDogb3RoZXI7XG4gIH1cbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gMCA/IHZhbHVlIDogK3ZhbHVlO1xuICB9XG4gIHZhbHVlID0gdmFsdWUucmVwbGFjZShyZVRyaW0sICcnKTtcbiAgdmFyIGlzQmluYXJ5ID0gcmVJc0JpbmFyeS50ZXN0KHZhbHVlKTtcbiAgcmV0dXJuIChpc0JpbmFyeSB8fCByZUlzT2N0YWwudGVzdCh2YWx1ZSkpXG4gICAgPyBmcmVlUGFyc2VJbnQodmFsdWUuc2xpY2UoMiksIGlzQmluYXJ5ID8gMiA6IDgpXG4gICAgOiAocmVJc0JhZEhleC50ZXN0KHZhbHVlKSA/IE5BTiA6ICt2YWx1ZSk7XG59XG5cbi8qKlxuICogQ3JlYXRlcyBhbiBhcnJheSBvZiBudW1iZXJzIChwb3NpdGl2ZSBhbmQvb3IgbmVnYXRpdmUpIHByb2dyZXNzaW5nIGZyb21cbiAqIGBzdGFydGAgdXAgdG8sIGJ1dCBub3QgaW5jbHVkaW5nLCBgZW5kYC4gQSBzdGVwIG9mIGAtMWAgaXMgdXNlZCBpZiBhIG5lZ2F0aXZlXG4gKiBgc3RhcnRgIGlzIHNwZWNpZmllZCB3aXRob3V0IGFuIGBlbmRgIG9yIGBzdGVwYC4gSWYgYGVuZGAgaXMgbm90IHNwZWNpZmllZCxcbiAqIGl0J3Mgc2V0IHRvIGBzdGFydGAgd2l0aCBgc3RhcnRgIHRoZW4gc2V0IHRvIGAwYC5cbiAqXG4gKiAqKk5vdGU6KiogSmF2YVNjcmlwdCBmb2xsb3dzIHRoZSBJRUVFLTc1NCBzdGFuZGFyZCBmb3IgcmVzb2x2aW5nXG4gKiBmbG9hdGluZy1wb2ludCB2YWx1ZXMgd2hpY2ggY2FuIHByb2R1Y2UgdW5leHBlY3RlZCByZXN1bHRzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBzaW5jZSAwLjEuMFxuICogQG1lbWJlck9mIF9cbiAqIEBjYXRlZ29yeSBVdGlsXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PTBdIFRoZSBzdGFydCBvZiB0aGUgcmFuZ2UuXG4gKiBAcGFyYW0ge251bWJlcn0gZW5kIFRoZSBlbmQgb2YgdGhlIHJhbmdlLlxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGVwPTFdIFRoZSB2YWx1ZSB0byBpbmNyZW1lbnQgb3IgZGVjcmVtZW50IGJ5LlxuICogQHJldHVybnMge0FycmF5fSBSZXR1cm5zIHRoZSByYW5nZSBvZiBudW1iZXJzLlxuICogQHNlZSBfLmluUmFuZ2UsIF8ucmFuZ2VSaWdodFxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnJhbmdlKDQpO1xuICogLy8gPT4gWzAsIDEsIDIsIDNdXG4gKlxuICogXy5yYW5nZSgtNCk7XG4gKiAvLyA9PiBbMCwgLTEsIC0yLCAtM11cbiAqXG4gKiBfLnJhbmdlKDEsIDUpO1xuICogLy8gPT4gWzEsIDIsIDMsIDRdXG4gKlxuICogXy5yYW5nZSgwLCAyMCwgNSk7XG4gKiAvLyA9PiBbMCwgNSwgMTAsIDE1XVxuICpcbiAqIF8ucmFuZ2UoMCwgLTQsIC0xKTtcbiAqIC8vID0+IFswLCAtMSwgLTIsIC0zXVxuICpcbiAqIF8ucmFuZ2UoMSwgNCwgMCk7XG4gKiAvLyA9PiBbMSwgMSwgMV1cbiAqXG4gKiBfLnJhbmdlKDApO1xuICogLy8gPT4gW11cbiAqL1xudmFyIHJhbmdlID0gY3JlYXRlUmFuZ2UoKTtcblxubW9kdWxlLmV4cG9ydHMgPSByYW5nZTtcbiJdfQ==
