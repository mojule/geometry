(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";
const H = require("@mojule/h");
const h = H(document);
module.exports = h;

},{"@mojule/h":11}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const geometry = require("..");
const h_1 = require("./h");
const svg_1 = require("./svg");
const { line, point, size, util } = geometry;
const { intersection, lineVector, midLine, length, unitVector, angle, bresenhamLine } = line;
const { translate, scale, rotate, vector } = point;
const { rectSize, scaleSizeInSize } = size;
const { approximatelyEqual, radiansToDegrees, degreesToRadians, alignCenter } = util;
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
const Svg = (...childNodes) => {
    const svg = svg_1.SvgElelement('svg', {
        viewBox: `0 0 ${exampleSize.width + 2} ${exampleSize.height + 2}`,
        width: exampleSize.width + 2,
        height: exampleSize.height + 2
    });
    const defs = svg_1.SvgElelement('defs');
    const vectorArrow = svg_1.Arrow({ id: 'arrow', fill: 'red' });
    const lineArrow = svg_1.Arrow({ id: 'lineArrow', fill: '#000' });
    const angleArrow = svg_1.Arrow({ id: 'angleArrow', fill: '#aaa' });
    defs.appendChild(vectorArrow);
    defs.appendChild(lineArrow);
    defs.appendChild(angleArrow);
    svg.appendChild(defs);
    for (let row = 0; row <= rows; row++) {
        const line = svg_1.Line({
            x1: 0,
            y1: cellSize.height * row,
            x2: exampleSize.width,
            y2: cellSize.height * row,
            stroke: '#ccc',
            'stroke-width': 1,
            'marker-end': undefined
        });
        svg.appendChild(line);
    }
    for (let column = 0; column <= columns; column++) {
        const line = svg_1.Line({
            x1: cellSize.width * column,
            y1: 0,
            x2: cellSize.width * column,
            y2: exampleSize.height,
            stroke: '#ccc',
            'stroke-width': 1,
            'marker-end': undefined
        });
        svg.appendChild(line);
    }
    childNodes.forEach(node => svg.appendChild(node));
    return svg;
};
const ExampleSection = (name, ...childNodes) => {
    return h_1.documentFragment(h_1.section(h_1.h1(name), ...childNodes));
};
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
    return h_1.documentFragment(h_1.h2('intersection( x1, y1, x2, y2, x3, y3, x4, y4 )'), Svg(svg_1.Line({ x1, y1, x2, y2 }), svg_1.Line({ x1: x3, y1: y3, x2: x4, y2: y4 }), svg_1.Point({ cx: x1, cy: y1 }), svg_1.Point({ cx: x3, cy: y3 }), svg_1.Point({ cx: x, cy: y, fill: 'red' })), h_1.div(h_1.code(`intersection( ${[x1, y1, x2, y2, x3, y3, x4, y4].map(toCellUnit).join(', ')} )`)), h_1.div(h_1.code(`[ ${toCellUnit(x)}, ${toCellUnit(y)} ]`)), Svg(svg_1.Line({ x1: fx1, y1: fy1, x2: fx2, y2: fy2 }), svg_1.Line({ x1: fx3, y1: fy3, x2: fx4, y2: fy4 }), svg_1.Point({ cx: fx1, cy: fy1 }), svg_1.Point({ cx: fx3, cy: fy3 })), h_1.div(h_1.code(`intersection( ${[fx1, fy1, fx2, fy2, fx3, fy3, fx4, fy4].map(toCellUnit).join(', ')} )`)), h_1.div(h_1.code(`undefined`)));
};
const LineVector = () => {
    const x1 = Math.floor(Math.random() * exampleCenter.x);
    const y1 = Math.floor(Math.random() * exampleCenter.y);
    const x2 = Math.floor(Math.random() * exampleCenter.x + exampleCenter.x);
    const y2 = Math.floor(Math.random() * exampleCenter.y + exampleCenter.y);
    const p = lineVector(x1, y1, x2, y2);
    const [x, y] = p;
    return h_1.documentFragment(h_1.h2('lineVector( x1, y1, x2, y2 )'), Svg(svg_1.Point({ cx: x1, cy: y1 }), svg_1.Line({ x1, y1, x2, y2 }), svg_1.Point({ cx: 0, cy: 0, fill: 'red' }), svg_1.Line({ x1: 0, y1: 0, x2: x, y2: y, stroke: 'red', 'marker-end': 'url(#arrow)' })), h_1.div(h_1.code(`lineVector( ${[x1, y1, x2, y2].map(toCellUnit).join(', ')} )`)), h_1.div(h_1.code(`[ ${toCellUnit(x)}, ${toCellUnit(y)} ]`)));
};
const MidLine = () => {
    const x1 = Math.floor(Math.random() * exampleSize.width);
    const y1 = Math.floor(Math.random() * exampleSize.height);
    const x2 = Math.floor(Math.random() * exampleSize.width);
    const y2 = Math.floor(Math.random() * exampleSize.height);
    const p = midLine(x1, y1, x2, y2);
    const [x, y] = p;
    return h_1.documentFragment(h_1.h2('midLine( x1, y1, x2, y2 )'), Svg(svg_1.Point({ cx: x1, cy: y1 }), svg_1.Line({ x1, y1, x2, y2 }), svg_1.Point({ cx: x, cy: y, fill: 'red' })), h_1.div(h_1.code(`midLine( ${[x1, y1, x2, y2].map(toCellUnit).join(', ')} )`)), h_1.div(h_1.code(`[ ${toCellUnit(x)}, ${toCellUnit(y)} ]`)));
};
const Length = () => {
    const x1 = Math.floor(Math.random() * exampleSize.width);
    const y1 = Math.floor(Math.random() * exampleSize.height);
    const x2 = Math.floor(Math.random() * exampleSize.width);
    const y2 = Math.floor(Math.random() * exampleSize.height);
    const l = length(x1, y1, x2, y2);
    return h_1.documentFragment(h_1.h2('length( x1, y1, x2, y2 )'), Svg(svg_1.Point({ cx: x1, cy: y1 }), svg_1.Line({ x1, y1, x2, y2 })), h_1.div(h_1.code(`length( ${[x1, y1, x2, y2].map(toCellUnit).join(', ')} )`)), h_1.div(h_1.code(String(toCellUnit(l)))));
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
    return h_1.documentFragment(h_1.h2('unitVector( x1, y1, x2, y2 )'), Svg(svg_1.Point({ cx: x1, cy: y1 }), svg_1.Line({ x1, y1, x2, y2 }), svg_1.Point({ cx: 0, cy: 0, fill: 'red' }), svg_1.Line({ x1: 0, y1: 0, x2: sX, y2: sY, stroke: 'red', 'marker-end': 'url(#arrow)' })), h_1.div(h_1.code(`unitVector( ${[x1, y1, x2, y2].map(toCellUnit).join(', ')} )`)), h_1.div(h_1.code(`[ ${x}, ${y} ]`)));
};
const Angle = () => {
    const x1 = Math.floor(Math.random() * exampleSize.width);
    const y1 = Math.floor(Math.random() * exampleSize.height);
    const x2 = Math.floor(Math.random() * exampleSize.width);
    const y2 = Math.floor(Math.random() * exampleSize.height);
    const a = angle(x1, y1, x2, y2);
    return h_1.documentFragment(h_1.h2('angle( x1, y1, x2, y2 )'), Svg(svg_1.Point({ cx: x1, cy: y1 }), svg_1.Line({ x1, y1, x2, y2 })), h_1.div(h_1.code(`angle( ${[x1, y1, x2, y2].map(toCellUnit).join(', ')} )`)), h_1.div(h_1.code(String(a))));
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
        const rect = svg_1.Rect({
            x: x * cellSize.width,
            y: y * cellSize.height,
            width: cellSize.width,
            height: cellSize.height
        });
        rects.push(rect);
    }
    const lx1 = (x1 + 1) * cellSize.width - (cellSize.width / 2);
    const ly1 = (y1 + 1) * cellSize.height - (cellSize.height / 2);
    const lx2 = (x2 + 1) * cellSize.width - (cellSize.width / 2);
    const ly2 = (y2 + 1) * cellSize.height - (cellSize.height / 2);
    return h_1.documentFragment(h_1.h2('bresenhamLine( x1, y1, x2, y2 )'), Svg(...rects, svg_1.Point({ cx: lx1, cy: ly1 }), svg_1.Line({ x1: lx1, y1: ly1, x2: lx2, y2: ly2 })), h_1.div(h_1.code(`bresenhamLine( ${[x1, y1, x2, y2].join(', ')} )`)), h_1.div(h_1.code(`[ ${l.join(', ')} ]`)));
};
const Translate = () => {
    const x1 = Math.floor(Math.random() * exampleCenter.x);
    const y1 = Math.floor(Math.random() * exampleCenter.y);
    const t = Math.floor(Math.random() * exampleCenter.x);
    const x2 = Math.floor(Math.random() * exampleCenter.x);
    const y2 = Math.floor(Math.random() * exampleCenter.y);
    const [tx1, ty1] = translate(x1, y1, t);
    const [tx2, ty2] = translate(x1, y1, x2, y2);
    return h_1.documentFragment(h_1.h2('translate( x, y, t )'), Svg(svg_1.Point({ cx: x1, cy: y1 }), svg_1.Point({ cx: tx1, cy: ty1, fill: 'red' })), h_1.div(h_1.code(`translate( ${[x1, y1, t].map(toCellUnit).join(', ')} )`)), h_1.div(h_1.code(`[ ${[tx1, ty1].map(toCellUnit).join(', ')} ]`)), h_1.h2('translate( x1, y1, x2, y2 )'), Svg(svg_1.Point({ cx: x1, cy: y1 }), svg_1.Point({ cx: tx2, cy: ty2, fill: 'red' })), h_1.div(h_1.code(`translate( ${[x1, y1, x2, y2].map(toCellUnit).join(', ')} )`)), h_1.div(h_1.code(`[ ${[tx2, ty2].map(toCellUnit).join(', ')} ]`)));
};
const Scale = () => {
    const x1 = Math.floor(Math.random() * exampleCenter.x);
    const y1 = Math.floor(Math.random() * exampleCenter.y);
    const s = Math.random() * 2;
    const x2 = Math.random() * 2;
    const y2 = Math.random() * 2;
    const [sx1, sy1] = scale(x1, y1, s);
    const [sx2, sy2] = scale(x1, y1, x2, y2);
    return h_1.documentFragment(h_1.h2('scale( x, y, t )'), Svg(svg_1.Point({ cx: x1, cy: y1 }), svg_1.Point({ cx: sx1, cy: sy1, fill: 'red' })), h_1.div(h_1.code(`scale( ${[x1, y1].map(toCellUnit).join(', ')}, ${s} )`)), h_1.div(h_1.code(`[ ${[sx1, sy1].map(toCellUnit).join(', ')} ]`)), h_1.h2('scale( x1, y1, x2, y2 )'), Svg(svg_1.Point({ cx: x1, cy: y1 }), svg_1.Point({ cx: sx2, cy: sy2, fill: 'red' })), h_1.div(h_1.code(`scale( ${[x1, y1].map(toCellUnit).join(', ')}, ${[x2, y2].join(', ')} )`)), h_1.div(h_1.code(`[ ${[sx2, sy2].map(toCellUnit).join(', ')} ]`)));
};
const Rotate = () => {
    let x1, y1, d1;
    let [rx1, ry1] = [-1, -1];
    while (rx1 < 0 || rx1 > exampleSize.width || ry1 < 0 || ry1 > exampleSize.height) {
        x1 = Math.floor(Math.random() * exampleSize.width);
        y1 = Math.floor(Math.random() * exampleSize.height);
        d1 = Math.random() * 360 - 180;
        const r = rotate(x1, y1, d1);
        rx1 = r[0];
        ry1 = r[1];
    }
    const a1 = angle(0, 0, x1, y1);
    const ra1 = angle(0, 0, rx1, ry1);
    let x2, y2, d2, oX, oY;
    let [rx2, ry2] = [-1, -1];
    while (rx2 < 0 || rx2 > exampleSize.width || ry2 < 0 || ry2 > exampleSize.height) {
        x2 = Math.floor(Math.random() * exampleSize.width);
        y2 = Math.floor(Math.random() * exampleSize.height);
        d2 = Math.random() * 360 - 180;
        oX = Math.floor(Math.random() * exampleSize.width);
        oY = Math.floor(Math.random() * exampleSize.height);
        const r = rotate(x2, y2, d2, oX, oY);
        rx2 = r[0];
        ry2 = r[1];
    }
    const a2 = angle(oX, oY, x2, y2);
    const ra2 = angle(oX, oY, rx2, ry2);
    return h_1.documentFragment(h_1.h2('rotate( x, y, degrees )'), Svg(svg_1.Point({ cx: 0, cy: 0, fill: '#aaa' }), svg_1.Line({ x1: 0, y1: 0, x2: x1, y2: y1, stroke: '#aaa', 'marker-end': 'url(#angleArrow)' }), svg_1.Point({ cx: x1, cy: y1 }), svg_1.Line({ x1: 0, y1: 0, x2: rx1, y2: ry1, stroke: '#aaa', 'marker-end': 'url(#angleArrow)' }), svg_1.Arc({ cx: 0, cy: 0, r: cellSize.width, startDegrees: a1, endDegrees: ra1, stroke: '#aaa' }), svg_1.Point({ cx: rx1, cy: ry1, fill: 'red' })), h_1.div(h_1.code(`rotate( ${[x1, y1].map(toCellUnit).join(', ')}, ${d1} )`)), h_1.div(h_1.code(`[ ${[rx1, ry1].map(toCellUnit).join(', ')} ]`)), h_1.h2('rotate( x, y, degrees, oX, oY )'), Svg(svg_1.Point({ cx: oX, cy: oY, fill: '#aaa' }), svg_1.Line({ x1: oX, y1: oY, x2, y2, stroke: '#aaa', 'marker-end': 'url(#angleArrow)' }), svg_1.Point({ cx: x2, cy: y2 }), svg_1.Line({ x1: oX, y1: oY, x2: rx2, y2: ry2, stroke: '#aaa', 'marker-end': 'url(#angleArrow)' }), svg_1.Arc({ cx: oX, cy: oY, r: cellSize.width, startDegrees: a2, endDegrees: ra2, stroke: '#aaa' }), svg_1.Point({ cx: rx2, cy: ry2, fill: 'red' })), h_1.div(h_1.code(`rotate( ${[x2, y2].map(toCellUnit).join(', ')}, ${d2}, ${[oX, oY].map(toCellUnit).join(', ')} )`)), h_1.div(h_1.code(`[ ${[rx2, ry2].map(toCellUnit).join(', ')} ]`)));
};
document.addEventListener('DOMContentLoaded', () => {
    const lineExamples = ExampleSection('line', Intersection(), LineVector(), MidLine(), Length(), UnitVector(), Angle(), BresenhamLine());
    const pointExamples = ExampleSection('point', Translate(), Scale(), Rotate());
    const sizeExamples = ExampleSection('size');
    const utilsExamples = ExampleSection('utils');
    const examples = h_1.documentFragment(lineExamples, pointExamples, sizeExamples, utilsExamples);
    document.body.appendChild(examples);
});

},{"..":4,"./h":1,"./svg":3}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("../util");
exports.svgSetAttributes = (el, attributes) => {
    Object.keys(attributes).forEach(name => {
        el.setAttributeNS(null, name, attributes[name]);
    });
    return el;
};
exports.SvgElelement = (name, attributes = {}) => {
    const el = document.createElementNS('http://www.w3.org/2000/svg', name);
    return exports.svgSetAttributes(el, attributes);
};
const lineDefaults = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    stroke: '#222',
    'stroke-width': 2,
    'marker-end': 'url(#lineArrow)'
};
exports.Line = (attributes = {}) => {
    attributes = Object.assign({}, lineDefaults, attributes);
    let { x1, y1, x2, y2 } = attributes;
    x1 += 0.5;
    y1 += 0.5;
    x2 += 0.5;
    y2 += 0.5;
    Object.assign(attributes, { x1, y1, x2, y2 });
    return exports.SvgElelement('line', attributes);
};
const pointDefaults = {
    cx: 0,
    cy: 0,
    r: 4,
    fill: '#222'
};
exports.Point = (attributes = {}) => {
    attributes = Object.assign({}, pointDefaults, attributes);
    let { cx, cy } = attributes;
    cx += 0.5;
    cy += 0.5;
    Object.assign(attributes, { cx, cy });
    return exports.SvgElelement('circle', attributes);
};
const arrowDefaults = { id: 'arrow', fill: 'red' };
exports.Arrow = (attributes = {}) => {
    attributes = Object.assign({}, pointDefaults, attributes);
    const { id, fill } = attributes;
    const marker = exports.SvgElelement('marker', {
        id,
        markerWidth: 10,
        markerHeight: 10,
        refX: 9,
        refY: 3,
        orient: 'auto',
        markerUnits: 'strokeWidth'
    });
    const path = exports.SvgElelement('path', {
        d: 'M0,0 L0,6 L9,3 z',
        fill
    });
    marker.appendChild(path);
    return marker;
};
const rectDefaults = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    'stroke-width': 1,
    stroke: '#222',
    fill: '#ccc'
};
exports.Rect = (attributes = {}) => {
    attributes = Object.assign({}, rectDefaults, attributes);
    let { x, y } = attributes;
    x += 0.5;
    y += 0.5;
    Object.assign(attributes, { x, y });
    return exports.SvgElelement('rect', attributes);
};
const polarToCartesian = (cx, cy, r, degrees) => {
    var radians = util_1.degreesToRadians(degrees);
    const x = cx + (r * Math.cos(radians));
    const y = cy + (r * Math.sin(radians));
    return [x, y];
};
const arcDefaults = {
    cx: 0,
    cy: 0,
    r: 4,
    startDegrees: 0,
    endDegrees: 0,
    'stroke-width': 2,
    stroke: '#222',
    fill: 'none'
};
exports.Arc = (options = {}) => {
    options = Object.assign({}, arcDefaults, options);
    const { cx, cy, r, startDegrees, endDegrees } = options;
    const start = polarToCartesian(cx, cy, r, startDegrees);
    const end = polarToCartesian(cx, cy, r, endDegrees);
    const arcSweep = endDegrees - startDegrees <= 180 ? 0 : 1;
    const d = [
        'M', ...start,
        'A', r, r, 0, arcSweep, 0, ...end
    ].join(' ');
    const attributes = {
        stroke: options.stroke,
        'stroke-width': options['stroke-width'],
        fill: options.fill,
        d
    };
    return exports.SvgElelement('path', attributes);
};

},{"../util":8}],4:[function(require,module,exports){
"use strict";
const line = require("./line");
const point = require("./point");
const size = require("./size");
const util = require("./util");
const geometry = { line, point, size, util };
module.exports = geometry;

},{"./line":5,"./point":6,"./size":7,"./util":8}],5:[function(require,module,exports){
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

},{"./util":8}],6:[function(require,module,exports){
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

},{"./util":8}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rectSize = (x1, y1, x2, y2) => [Math.abs(x2 - x1), Math.abs(y2 - y1)];
exports.scaleSizeInSize = (w1, h1, w2, h2) => Math.min(w1 / w2, h1 / h2);

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.radiansToDegrees = (radians) => radians * 180 / Math.PI;
exports.degreesToRadians = (degrees) => degrees * Math.PI / 180;
exports.approximatelyEqual = (a, b, epsilon = 0.001) => Math.abs(b - a) <= epsilon;
exports.alignCenter = (parent, child) => (parent - child) / 2;

},{}],9:[function(require,module,exports){
'use strict'

const utils = require( '@mojule/utils' )
const data = require( './src/data.json' )

const { clone } = utils

const elementMeta = () => clone( data )

module.exports = elementMeta

},{"./src/data.json":10,"@mojule/utils":15}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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

},{"@mojule/element-meta":9,"@mojule/is":12,"lodash.camelcase":17}],12:[function(require,module,exports){
'use strict'

module.exports = require( './src' )

},{"./src":14}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
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

},{"./default-predicates":13}],15:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"./src":16,"dup":12}],16:[function(require,module,exports){
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

},{"lodash.range":18}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJkaXN0L2V4YW1wbGUvaC5qcyIsImRpc3QvZXhhbXBsZS9pbmRleC5qcyIsImRpc3QvZXhhbXBsZS9zdmcuanMiLCJkaXN0L2luZGV4LmpzIiwiZGlzdC9saW5lLmpzIiwiZGlzdC9wb2ludC5qcyIsImRpc3Qvc2l6ZS5qcyIsImRpc3QvdXRpbC5qcyIsIm5vZGVfbW9kdWxlcy9AbW9qdWxlL2VsZW1lbnQtbWV0YS9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9AbW9qdWxlL2VsZW1lbnQtbWV0YS9zcmMvZGF0YS5qc29uIiwibm9kZV9tb2R1bGVzL0Btb2p1bGUvaC9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9AbW9qdWxlL2lzL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL0Btb2p1bGUvaXMvc3JjL2RlZmF1bHQtcHJlZGljYXRlcy5qcyIsIm5vZGVfbW9kdWxlcy9AbW9qdWxlL2lzL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9AbW9qdWxlL3V0aWxzL3NyYy9pbmRleC5qcyIsIm5vZGVfbW9kdWxlcy9sb2Rhc2guY2FtZWxjYXNlL2luZGV4LmpzIiwibm9kZV9tb2R1bGVzL2xvZGFzaC5yYW5nZS9pbmRleC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDak9BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2bEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUN2bEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKXtmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc31yZXR1cm4gZX0pKCkiLCJcInVzZSBzdHJpY3RcIjtcbmNvbnN0IEggPSByZXF1aXJlKFwiQG1vanVsZS9oXCIpO1xuY29uc3QgaCA9IEgoZG9jdW1lbnQpO1xubW9kdWxlLmV4cG9ydHMgPSBoO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IGdlb21ldHJ5ID0gcmVxdWlyZShcIi4uXCIpO1xuY29uc3QgaF8xID0gcmVxdWlyZShcIi4vaFwiKTtcbmNvbnN0IHN2Z18xID0gcmVxdWlyZShcIi4vc3ZnXCIpO1xuY29uc3QgeyBsaW5lLCBwb2ludCwgc2l6ZSwgdXRpbCB9ID0gZ2VvbWV0cnk7XG5jb25zdCB7IGludGVyc2VjdGlvbiwgbGluZVZlY3RvciwgbWlkTGluZSwgbGVuZ3RoLCB1bml0VmVjdG9yLCBhbmdsZSwgYnJlc2VuaGFtTGluZSB9ID0gbGluZTtcbmNvbnN0IHsgdHJhbnNsYXRlLCBzY2FsZSwgcm90YXRlLCB2ZWN0b3IgfSA9IHBvaW50O1xuY29uc3QgeyByZWN0U2l6ZSwgc2NhbGVTaXplSW5TaXplIH0gPSBzaXplO1xuY29uc3QgeyBhcHByb3hpbWF0ZWx5RXF1YWwsIHJhZGlhbnNUb0RlZ3JlZXMsIGRlZ3JlZXNUb1JhZGlhbnMsIGFsaWduQ2VudGVyIH0gPSB1dGlsO1xuY29uc3QgZXhhbXBsZVNpemUgPSB7XG4gICAgd2lkdGg6IDQwMCxcbiAgICBoZWlnaHQ6IDQwMFxufTtcbmNvbnN0IGV4YW1wbGVDZW50ZXIgPSB7XG4gICAgeDogZXhhbXBsZVNpemUud2lkdGggLyAyLFxuICAgIHk6IGV4YW1wbGVTaXplLmhlaWdodCAvIDJcbn07XG5jb25zdCBjZWxsU2l6ZSA9IHtcbiAgICB3aWR0aDogNDAsXG4gICAgaGVpZ2h0OiA0MFxufTtcbmNvbnN0IHJvd3MgPSBleGFtcGxlU2l6ZS53aWR0aCAvIGNlbGxTaXplLndpZHRoO1xuY29uc3QgY29sdW1ucyA9IGV4YW1wbGVTaXplLmhlaWdodCAvIGNlbGxTaXplLmhlaWdodDtcbmNvbnN0IHRvQ2VsbFVuaXQgPSAodmFsdWUpID0+IHZhbHVlIC8gY2VsbFNpemUud2lkdGg7XG5jb25zdCBTdmcgPSAoLi4uY2hpbGROb2RlcykgPT4ge1xuICAgIGNvbnN0IHN2ZyA9IHN2Z18xLlN2Z0VsZWxlbWVudCgnc3ZnJywge1xuICAgICAgICB2aWV3Qm94OiBgMCAwICR7ZXhhbXBsZVNpemUud2lkdGggKyAyfSAke2V4YW1wbGVTaXplLmhlaWdodCArIDJ9YCxcbiAgICAgICAgd2lkdGg6IGV4YW1wbGVTaXplLndpZHRoICsgMixcbiAgICAgICAgaGVpZ2h0OiBleGFtcGxlU2l6ZS5oZWlnaHQgKyAyXG4gICAgfSk7XG4gICAgY29uc3QgZGVmcyA9IHN2Z18xLlN2Z0VsZWxlbWVudCgnZGVmcycpO1xuICAgIGNvbnN0IHZlY3RvckFycm93ID0gc3ZnXzEuQXJyb3coeyBpZDogJ2Fycm93JywgZmlsbDogJ3JlZCcgfSk7XG4gICAgY29uc3QgbGluZUFycm93ID0gc3ZnXzEuQXJyb3coeyBpZDogJ2xpbmVBcnJvdycsIGZpbGw6ICcjMDAwJyB9KTtcbiAgICBjb25zdCBhbmdsZUFycm93ID0gc3ZnXzEuQXJyb3coeyBpZDogJ2FuZ2xlQXJyb3cnLCBmaWxsOiAnI2FhYScgfSk7XG4gICAgZGVmcy5hcHBlbmRDaGlsZCh2ZWN0b3JBcnJvdyk7XG4gICAgZGVmcy5hcHBlbmRDaGlsZChsaW5lQXJyb3cpO1xuICAgIGRlZnMuYXBwZW5kQ2hpbGQoYW5nbGVBcnJvdyk7XG4gICAgc3ZnLmFwcGVuZENoaWxkKGRlZnMpO1xuICAgIGZvciAobGV0IHJvdyA9IDA7IHJvdyA8PSByb3dzOyByb3crKykge1xuICAgICAgICBjb25zdCBsaW5lID0gc3ZnXzEuTGluZSh7XG4gICAgICAgICAgICB4MTogMCxcbiAgICAgICAgICAgIHkxOiBjZWxsU2l6ZS5oZWlnaHQgKiByb3csXG4gICAgICAgICAgICB4MjogZXhhbXBsZVNpemUud2lkdGgsXG4gICAgICAgICAgICB5MjogY2VsbFNpemUuaGVpZ2h0ICogcm93LFxuICAgICAgICAgICAgc3Ryb2tlOiAnI2NjYycsXG4gICAgICAgICAgICAnc3Ryb2tlLXdpZHRoJzogMSxcbiAgICAgICAgICAgICdtYXJrZXItZW5kJzogdW5kZWZpbmVkXG4gICAgICAgIH0pO1xuICAgICAgICBzdmcuYXBwZW5kQ2hpbGQobGluZSk7XG4gICAgfVxuICAgIGZvciAobGV0IGNvbHVtbiA9IDA7IGNvbHVtbiA8PSBjb2x1bW5zOyBjb2x1bW4rKykge1xuICAgICAgICBjb25zdCBsaW5lID0gc3ZnXzEuTGluZSh7XG4gICAgICAgICAgICB4MTogY2VsbFNpemUud2lkdGggKiBjb2x1bW4sXG4gICAgICAgICAgICB5MTogMCxcbiAgICAgICAgICAgIHgyOiBjZWxsU2l6ZS53aWR0aCAqIGNvbHVtbixcbiAgICAgICAgICAgIHkyOiBleGFtcGxlU2l6ZS5oZWlnaHQsXG4gICAgICAgICAgICBzdHJva2U6ICcjY2NjJyxcbiAgICAgICAgICAgICdzdHJva2Utd2lkdGgnOiAxLFxuICAgICAgICAgICAgJ21hcmtlci1lbmQnOiB1bmRlZmluZWRcbiAgICAgICAgfSk7XG4gICAgICAgIHN2Zy5hcHBlbmRDaGlsZChsaW5lKTtcbiAgICB9XG4gICAgY2hpbGROb2Rlcy5mb3JFYWNoKG5vZGUgPT4gc3ZnLmFwcGVuZENoaWxkKG5vZGUpKTtcbiAgICByZXR1cm4gc3ZnO1xufTtcbmNvbnN0IEV4YW1wbGVTZWN0aW9uID0gKG5hbWUsIC4uLmNoaWxkTm9kZXMpID0+IHtcbiAgICByZXR1cm4gaF8xLmRvY3VtZW50RnJhZ21lbnQoaF8xLnNlY3Rpb24oaF8xLmgxKG5hbWUpLCAuLi5jaGlsZE5vZGVzKSk7XG59O1xuY29uc3QgSW50ZXJzZWN0aW9uID0gKCkgPT4ge1xuICAgIGxldCB4MSwgeTEsIHgyLCB5MiwgeDMsIHkzLCB4NCwgeTQsIHA7XG4gICAgd2hpbGUgKCFwKSB7XG4gICAgICAgIHgxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZUNlbnRlci54KTtcbiAgICAgICAgeTEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlQ2VudGVyLnkpO1xuICAgICAgICB4MiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVDZW50ZXIueCArIGV4YW1wbGVDZW50ZXIueCk7XG4gICAgICAgIHkyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZUNlbnRlci55ICsgZXhhbXBsZUNlbnRlci55KTtcbiAgICAgICAgeDMgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlQ2VudGVyLngpO1xuICAgICAgICB5MyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVDZW50ZXIueSArIGV4YW1wbGVDZW50ZXIueSk7XG4gICAgICAgIHg0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZUNlbnRlci54ICsgZXhhbXBsZUNlbnRlci54KTtcbiAgICAgICAgeTQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlQ2VudGVyLnkpO1xuICAgICAgICBwID0gaW50ZXJzZWN0aW9uKHgxLCB5MSwgeDIsIHkyLCB4MywgeTMsIHg0LCB5NCk7XG4gICAgfVxuICAgIGNvbnN0IFt4LCB5XSA9IHA7XG4gICAgbGV0IGZ4MSwgZnkxLCBmeDIsIGZ5MiwgZngzLCBmeTMsIGZ4NCwgZnk0O1xuICAgIGxldCBmcCA9IFswLCAwXTtcbiAgICB3aGlsZSAoZnApIHtcbiAgICAgICAgZngxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUud2lkdGgpO1xuICAgICAgICBmeTEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlU2l6ZS5oZWlnaHQpO1xuICAgICAgICBmeDIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlU2l6ZS53aWR0aCk7XG4gICAgICAgIGZ5MiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVTaXplLmhlaWdodCk7XG4gICAgICAgIGZ4MyA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVTaXplLndpZHRoKTtcbiAgICAgICAgZnkzID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUuaGVpZ2h0KTtcbiAgICAgICAgZng0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUud2lkdGgpO1xuICAgICAgICBmeTQgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlU2l6ZS5oZWlnaHQpO1xuICAgICAgICBmcCA9IGludGVyc2VjdGlvbihmeDEsIGZ5MSwgZngyLCBmeTIsIGZ4MywgZnkzLCBmeDQsIGZ5NCk7XG4gICAgfVxuICAgIHJldHVybiBoXzEuZG9jdW1lbnRGcmFnbWVudChoXzEuaDIoJ2ludGVyc2VjdGlvbiggeDEsIHkxLCB4MiwgeTIsIHgzLCB5MywgeDQsIHk0ICknKSwgU3ZnKHN2Z18xLkxpbmUoeyB4MSwgeTEsIHgyLCB5MiB9KSwgc3ZnXzEuTGluZSh7IHgxOiB4MywgeTE6IHkzLCB4MjogeDQsIHkyOiB5NCB9KSwgc3ZnXzEuUG9pbnQoeyBjeDogeDEsIGN5OiB5MSB9KSwgc3ZnXzEuUG9pbnQoeyBjeDogeDMsIGN5OiB5MyB9KSwgc3ZnXzEuUG9pbnQoeyBjeDogeCwgY3k6IHksIGZpbGw6ICdyZWQnIH0pKSwgaF8xLmRpdihoXzEuY29kZShgaW50ZXJzZWN0aW9uKCAke1t4MSwgeTEsIHgyLCB5MiwgeDMsIHkzLCB4NCwgeTRdLm1hcCh0b0NlbGxVbml0KS5qb2luKCcsICcpfSApYCkpLCBoXzEuZGl2KGhfMS5jb2RlKGBbICR7dG9DZWxsVW5pdCh4KX0sICR7dG9DZWxsVW5pdCh5KX0gXWApKSwgU3ZnKHN2Z18xLkxpbmUoeyB4MTogZngxLCB5MTogZnkxLCB4MjogZngyLCB5MjogZnkyIH0pLCBzdmdfMS5MaW5lKHsgeDE6IGZ4MywgeTE6IGZ5MywgeDI6IGZ4NCwgeTI6IGZ5NCB9KSwgc3ZnXzEuUG9pbnQoeyBjeDogZngxLCBjeTogZnkxIH0pLCBzdmdfMS5Qb2ludCh7IGN4OiBmeDMsIGN5OiBmeTMgfSkpLCBoXzEuZGl2KGhfMS5jb2RlKGBpbnRlcnNlY3Rpb24oICR7W2Z4MSwgZnkxLCBmeDIsIGZ5MiwgZngzLCBmeTMsIGZ4NCwgZnk0XS5tYXAodG9DZWxsVW5pdCkuam9pbignLCAnKX0gKWApKSwgaF8xLmRpdihoXzEuY29kZShgdW5kZWZpbmVkYCkpKTtcbn07XG5jb25zdCBMaW5lVmVjdG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IHgxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZUNlbnRlci54KTtcbiAgICBjb25zdCB5MSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVDZW50ZXIueSk7XG4gICAgY29uc3QgeDIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlQ2VudGVyLnggKyBleGFtcGxlQ2VudGVyLngpO1xuICAgIGNvbnN0IHkyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZUNlbnRlci55ICsgZXhhbXBsZUNlbnRlci55KTtcbiAgICBjb25zdCBwID0gbGluZVZlY3Rvcih4MSwgeTEsIHgyLCB5Mik7XG4gICAgY29uc3QgW3gsIHldID0gcDtcbiAgICByZXR1cm4gaF8xLmRvY3VtZW50RnJhZ21lbnQoaF8xLmgyKCdsaW5lVmVjdG9yKCB4MSwgeTEsIHgyLCB5MiApJyksIFN2ZyhzdmdfMS5Qb2ludCh7IGN4OiB4MSwgY3k6IHkxIH0pLCBzdmdfMS5MaW5lKHsgeDEsIHkxLCB4MiwgeTIgfSksIHN2Z18xLlBvaW50KHsgY3g6IDAsIGN5OiAwLCBmaWxsOiAncmVkJyB9KSwgc3ZnXzEuTGluZSh7IHgxOiAwLCB5MTogMCwgeDI6IHgsIHkyOiB5LCBzdHJva2U6ICdyZWQnLCAnbWFya2VyLWVuZCc6ICd1cmwoI2Fycm93KScgfSkpLCBoXzEuZGl2KGhfMS5jb2RlKGBsaW5lVmVjdG9yKCAke1t4MSwgeTEsIHgyLCB5Ml0ubWFwKHRvQ2VsbFVuaXQpLmpvaW4oJywgJyl9IClgKSksIGhfMS5kaXYoaF8xLmNvZGUoYFsgJHt0b0NlbGxVbml0KHgpfSwgJHt0b0NlbGxVbml0KHkpfSBdYCkpKTtcbn07XG5jb25zdCBNaWRMaW5lID0gKCkgPT4ge1xuICAgIGNvbnN0IHgxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUud2lkdGgpO1xuICAgIGNvbnN0IHkxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUuaGVpZ2h0KTtcbiAgICBjb25zdCB4MiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVTaXplLndpZHRoKTtcbiAgICBjb25zdCB5MiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVTaXplLmhlaWdodCk7XG4gICAgY29uc3QgcCA9IG1pZExpbmUoeDEsIHkxLCB4MiwgeTIpO1xuICAgIGNvbnN0IFt4LCB5XSA9IHA7XG4gICAgcmV0dXJuIGhfMS5kb2N1bWVudEZyYWdtZW50KGhfMS5oMignbWlkTGluZSggeDEsIHkxLCB4MiwgeTIgKScpLCBTdmcoc3ZnXzEuUG9pbnQoeyBjeDogeDEsIGN5OiB5MSB9KSwgc3ZnXzEuTGluZSh7IHgxLCB5MSwgeDIsIHkyIH0pLCBzdmdfMS5Qb2ludCh7IGN4OiB4LCBjeTogeSwgZmlsbDogJ3JlZCcgfSkpLCBoXzEuZGl2KGhfMS5jb2RlKGBtaWRMaW5lKCAke1t4MSwgeTEsIHgyLCB5Ml0ubWFwKHRvQ2VsbFVuaXQpLmpvaW4oJywgJyl9IClgKSksIGhfMS5kaXYoaF8xLmNvZGUoYFsgJHt0b0NlbGxVbml0KHgpfSwgJHt0b0NlbGxVbml0KHkpfSBdYCkpKTtcbn07XG5jb25zdCBMZW5ndGggPSAoKSA9PiB7XG4gICAgY29uc3QgeDEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlU2l6ZS53aWR0aCk7XG4gICAgY29uc3QgeTEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlU2l6ZS5oZWlnaHQpO1xuICAgIGNvbnN0IHgyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUud2lkdGgpO1xuICAgIGNvbnN0IHkyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUuaGVpZ2h0KTtcbiAgICBjb25zdCBsID0gbGVuZ3RoKHgxLCB5MSwgeDIsIHkyKTtcbiAgICByZXR1cm4gaF8xLmRvY3VtZW50RnJhZ21lbnQoaF8xLmgyKCdsZW5ndGgoIHgxLCB5MSwgeDIsIHkyICknKSwgU3ZnKHN2Z18xLlBvaW50KHsgY3g6IHgxLCBjeTogeTEgfSksIHN2Z18xLkxpbmUoeyB4MSwgeTEsIHgyLCB5MiB9KSksIGhfMS5kaXYoaF8xLmNvZGUoYGxlbmd0aCggJHtbeDEsIHkxLCB4MiwgeTJdLm1hcCh0b0NlbGxVbml0KS5qb2luKCcsICcpfSApYCkpLCBoXzEuZGl2KGhfMS5jb2RlKFN0cmluZyh0b0NlbGxVbml0KGwpKSkpKTtcbn07XG5jb25zdCBVbml0VmVjdG9yID0gKCkgPT4ge1xuICAgIGNvbnN0IHgxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZUNlbnRlci54KTtcbiAgICBjb25zdCB5MSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVDZW50ZXIueSk7XG4gICAgY29uc3QgeDIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlQ2VudGVyLnggKyBleGFtcGxlQ2VudGVyLngpO1xuICAgIGNvbnN0IHkyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZUNlbnRlci55ICsgZXhhbXBsZUNlbnRlci55KTtcbiAgICBjb25zdCBwID0gdW5pdFZlY3Rvcih4MSwgeTEsIHgyLCB5Mik7XG4gICAgY29uc3QgW3gsIHldID0gcDtcbiAgICBjb25zdCBzID0gc2NhbGUoeCwgeSwgY2VsbFNpemUud2lkdGgpO1xuICAgIGNvbnN0IFtzWCwgc1ldID0gcztcbiAgICByZXR1cm4gaF8xLmRvY3VtZW50RnJhZ21lbnQoaF8xLmgyKCd1bml0VmVjdG9yKCB4MSwgeTEsIHgyLCB5MiApJyksIFN2ZyhzdmdfMS5Qb2ludCh7IGN4OiB4MSwgY3k6IHkxIH0pLCBzdmdfMS5MaW5lKHsgeDEsIHkxLCB4MiwgeTIgfSksIHN2Z18xLlBvaW50KHsgY3g6IDAsIGN5OiAwLCBmaWxsOiAncmVkJyB9KSwgc3ZnXzEuTGluZSh7IHgxOiAwLCB5MTogMCwgeDI6IHNYLCB5Mjogc1ksIHN0cm9rZTogJ3JlZCcsICdtYXJrZXItZW5kJzogJ3VybCgjYXJyb3cpJyB9KSksIGhfMS5kaXYoaF8xLmNvZGUoYHVuaXRWZWN0b3IoICR7W3gxLCB5MSwgeDIsIHkyXS5tYXAodG9DZWxsVW5pdCkuam9pbignLCAnKX0gKWApKSwgaF8xLmRpdihoXzEuY29kZShgWyAke3h9LCAke3l9IF1gKSkpO1xufTtcbmNvbnN0IEFuZ2xlID0gKCkgPT4ge1xuICAgIGNvbnN0IHgxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUud2lkdGgpO1xuICAgIGNvbnN0IHkxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUuaGVpZ2h0KTtcbiAgICBjb25zdCB4MiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVTaXplLndpZHRoKTtcbiAgICBjb25zdCB5MiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVTaXplLmhlaWdodCk7XG4gICAgY29uc3QgYSA9IGFuZ2xlKHgxLCB5MSwgeDIsIHkyKTtcbiAgICByZXR1cm4gaF8xLmRvY3VtZW50RnJhZ21lbnQoaF8xLmgyKCdhbmdsZSggeDEsIHkxLCB4MiwgeTIgKScpLCBTdmcoc3ZnXzEuUG9pbnQoeyBjeDogeDEsIGN5OiB5MSB9KSwgc3ZnXzEuTGluZSh7IHgxLCB5MSwgeDIsIHkyIH0pKSwgaF8xLmRpdihoXzEuY29kZShgYW5nbGUoICR7W3gxLCB5MSwgeDIsIHkyXS5tYXAodG9DZWxsVW5pdCkuam9pbignLCAnKX0gKWApKSwgaF8xLmRpdihoXzEuY29kZShTdHJpbmcoYSkpKSk7XG59O1xuY29uc3QgQnJlc2VuaGFtTGluZSA9ICgpID0+IHtcbiAgICBjb25zdCB4MSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCB5MSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCB4MiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCB5MiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKTtcbiAgICBjb25zdCBsID0gYnJlc2VuaGFtTGluZSh4MSwgeTEsIHgyLCB5Mik7XG4gICAgY29uc3QgbGVuID0gbC5sZW5ndGggLyAyO1xuICAgIGNvbnN0IHJlY3RzID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgICBjb25zdCB4ID0gbFtpICogMl07XG4gICAgICAgIGNvbnN0IHkgPSBsW2kgKiAyICsgMV07XG4gICAgICAgIGNvbnN0IHJlY3QgPSBzdmdfMS5SZWN0KHtcbiAgICAgICAgICAgIHg6IHggKiBjZWxsU2l6ZS53aWR0aCxcbiAgICAgICAgICAgIHk6IHkgKiBjZWxsU2l6ZS5oZWlnaHQsXG4gICAgICAgICAgICB3aWR0aDogY2VsbFNpemUud2lkdGgsXG4gICAgICAgICAgICBoZWlnaHQ6IGNlbGxTaXplLmhlaWdodFxuICAgICAgICB9KTtcbiAgICAgICAgcmVjdHMucHVzaChyZWN0KTtcbiAgICB9XG4gICAgY29uc3QgbHgxID0gKHgxICsgMSkgKiBjZWxsU2l6ZS53aWR0aCAtIChjZWxsU2l6ZS53aWR0aCAvIDIpO1xuICAgIGNvbnN0IGx5MSA9ICh5MSArIDEpICogY2VsbFNpemUuaGVpZ2h0IC0gKGNlbGxTaXplLmhlaWdodCAvIDIpO1xuICAgIGNvbnN0IGx4MiA9ICh4MiArIDEpICogY2VsbFNpemUud2lkdGggLSAoY2VsbFNpemUud2lkdGggLyAyKTtcbiAgICBjb25zdCBseTIgPSAoeTIgKyAxKSAqIGNlbGxTaXplLmhlaWdodCAtIChjZWxsU2l6ZS5oZWlnaHQgLyAyKTtcbiAgICByZXR1cm4gaF8xLmRvY3VtZW50RnJhZ21lbnQoaF8xLmgyKCdicmVzZW5oYW1MaW5lKCB4MSwgeTEsIHgyLCB5MiApJyksIFN2ZyguLi5yZWN0cywgc3ZnXzEuUG9pbnQoeyBjeDogbHgxLCBjeTogbHkxIH0pLCBzdmdfMS5MaW5lKHsgeDE6IGx4MSwgeTE6IGx5MSwgeDI6IGx4MiwgeTI6IGx5MiB9KSksIGhfMS5kaXYoaF8xLmNvZGUoYGJyZXNlbmhhbUxpbmUoICR7W3gxLCB5MSwgeDIsIHkyXS5qb2luKCcsICcpfSApYCkpLCBoXzEuZGl2KGhfMS5jb2RlKGBbICR7bC5qb2luKCcsICcpfSBdYCkpKTtcbn07XG5jb25zdCBUcmFuc2xhdGUgPSAoKSA9PiB7XG4gICAgY29uc3QgeDEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlQ2VudGVyLngpO1xuICAgIGNvbnN0IHkxID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZUNlbnRlci55KTtcbiAgICBjb25zdCB0ID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZUNlbnRlci54KTtcbiAgICBjb25zdCB4MiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVDZW50ZXIueCk7XG4gICAgY29uc3QgeTIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlQ2VudGVyLnkpO1xuICAgIGNvbnN0IFt0eDEsIHR5MV0gPSB0cmFuc2xhdGUoeDEsIHkxLCB0KTtcbiAgICBjb25zdCBbdHgyLCB0eTJdID0gdHJhbnNsYXRlKHgxLCB5MSwgeDIsIHkyKTtcbiAgICByZXR1cm4gaF8xLmRvY3VtZW50RnJhZ21lbnQoaF8xLmgyKCd0cmFuc2xhdGUoIHgsIHksIHQgKScpLCBTdmcoc3ZnXzEuUG9pbnQoeyBjeDogeDEsIGN5OiB5MSB9KSwgc3ZnXzEuUG9pbnQoeyBjeDogdHgxLCBjeTogdHkxLCBmaWxsOiAncmVkJyB9KSksIGhfMS5kaXYoaF8xLmNvZGUoYHRyYW5zbGF0ZSggJHtbeDEsIHkxLCB0XS5tYXAodG9DZWxsVW5pdCkuam9pbignLCAnKX0gKWApKSwgaF8xLmRpdihoXzEuY29kZShgWyAke1t0eDEsIHR5MV0ubWFwKHRvQ2VsbFVuaXQpLmpvaW4oJywgJyl9IF1gKSksIGhfMS5oMigndHJhbnNsYXRlKCB4MSwgeTEsIHgyLCB5MiApJyksIFN2ZyhzdmdfMS5Qb2ludCh7IGN4OiB4MSwgY3k6IHkxIH0pLCBzdmdfMS5Qb2ludCh7IGN4OiB0eDIsIGN5OiB0eTIsIGZpbGw6ICdyZWQnIH0pKSwgaF8xLmRpdihoXzEuY29kZShgdHJhbnNsYXRlKCAke1t4MSwgeTEsIHgyLCB5Ml0ubWFwKHRvQ2VsbFVuaXQpLmpvaW4oJywgJyl9IClgKSksIGhfMS5kaXYoaF8xLmNvZGUoYFsgJHtbdHgyLCB0eTJdLm1hcCh0b0NlbGxVbml0KS5qb2luKCcsICcpfSBdYCkpKTtcbn07XG5jb25zdCBTY2FsZSA9ICgpID0+IHtcbiAgICBjb25zdCB4MSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVDZW50ZXIueCk7XG4gICAgY29uc3QgeTEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlQ2VudGVyLnkpO1xuICAgIGNvbnN0IHMgPSBNYXRoLnJhbmRvbSgpICogMjtcbiAgICBjb25zdCB4MiA9IE1hdGgucmFuZG9tKCkgKiAyO1xuICAgIGNvbnN0IHkyID0gTWF0aC5yYW5kb20oKSAqIDI7XG4gICAgY29uc3QgW3N4MSwgc3kxXSA9IHNjYWxlKHgxLCB5MSwgcyk7XG4gICAgY29uc3QgW3N4Miwgc3kyXSA9IHNjYWxlKHgxLCB5MSwgeDIsIHkyKTtcbiAgICByZXR1cm4gaF8xLmRvY3VtZW50RnJhZ21lbnQoaF8xLmgyKCdzY2FsZSggeCwgeSwgdCApJyksIFN2ZyhzdmdfMS5Qb2ludCh7IGN4OiB4MSwgY3k6IHkxIH0pLCBzdmdfMS5Qb2ludCh7IGN4OiBzeDEsIGN5OiBzeTEsIGZpbGw6ICdyZWQnIH0pKSwgaF8xLmRpdihoXzEuY29kZShgc2NhbGUoICR7W3gxLCB5MV0ubWFwKHRvQ2VsbFVuaXQpLmpvaW4oJywgJyl9LCAke3N9IClgKSksIGhfMS5kaXYoaF8xLmNvZGUoYFsgJHtbc3gxLCBzeTFdLm1hcCh0b0NlbGxVbml0KS5qb2luKCcsICcpfSBdYCkpLCBoXzEuaDIoJ3NjYWxlKCB4MSwgeTEsIHgyLCB5MiApJyksIFN2ZyhzdmdfMS5Qb2ludCh7IGN4OiB4MSwgY3k6IHkxIH0pLCBzdmdfMS5Qb2ludCh7IGN4OiBzeDIsIGN5OiBzeTIsIGZpbGw6ICdyZWQnIH0pKSwgaF8xLmRpdihoXzEuY29kZShgc2NhbGUoICR7W3gxLCB5MV0ubWFwKHRvQ2VsbFVuaXQpLmpvaW4oJywgJyl9LCAke1t4MiwgeTJdLmpvaW4oJywgJyl9IClgKSksIGhfMS5kaXYoaF8xLmNvZGUoYFsgJHtbc3gyLCBzeTJdLm1hcCh0b0NlbGxVbml0KS5qb2luKCcsICcpfSBdYCkpKTtcbn07XG5jb25zdCBSb3RhdGUgPSAoKSA9PiB7XG4gICAgbGV0IHgxLCB5MSwgZDE7XG4gICAgbGV0IFtyeDEsIHJ5MV0gPSBbLTEsIC0xXTtcbiAgICB3aGlsZSAocngxIDwgMCB8fCByeDEgPiBleGFtcGxlU2l6ZS53aWR0aCB8fCByeTEgPCAwIHx8IHJ5MSA+IGV4YW1wbGVTaXplLmhlaWdodCkge1xuICAgICAgICB4MSA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVTaXplLndpZHRoKTtcbiAgICAgICAgeTEgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlU2l6ZS5oZWlnaHQpO1xuICAgICAgICBkMSA9IE1hdGgucmFuZG9tKCkgKiAzNjAgLSAxODA7XG4gICAgICAgIGNvbnN0IHIgPSByb3RhdGUoeDEsIHkxLCBkMSk7XG4gICAgICAgIHJ4MSA9IHJbMF07XG4gICAgICAgIHJ5MSA9IHJbMV07XG4gICAgfVxuICAgIGNvbnN0IGExID0gYW5nbGUoMCwgMCwgeDEsIHkxKTtcbiAgICBjb25zdCByYTEgPSBhbmdsZSgwLCAwLCByeDEsIHJ5MSk7XG4gICAgbGV0IHgyLCB5MiwgZDIsIG9YLCBvWTtcbiAgICBsZXQgW3J4MiwgcnkyXSA9IFstMSwgLTFdO1xuICAgIHdoaWxlIChyeDIgPCAwIHx8IHJ4MiA+IGV4YW1wbGVTaXplLndpZHRoIHx8IHJ5MiA8IDAgfHwgcnkyID4gZXhhbXBsZVNpemUuaGVpZ2h0KSB7XG4gICAgICAgIHgyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUud2lkdGgpO1xuICAgICAgICB5MiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGV4YW1wbGVTaXplLmhlaWdodCk7XG4gICAgICAgIGQyID0gTWF0aC5yYW5kb20oKSAqIDM2MCAtIDE4MDtcbiAgICAgICAgb1ggPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiBleGFtcGxlU2l6ZS53aWR0aCk7XG4gICAgICAgIG9ZID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogZXhhbXBsZVNpemUuaGVpZ2h0KTtcbiAgICAgICAgY29uc3QgciA9IHJvdGF0ZSh4MiwgeTIsIGQyLCBvWCwgb1kpO1xuICAgICAgICByeDIgPSByWzBdO1xuICAgICAgICByeTIgPSByWzFdO1xuICAgIH1cbiAgICBjb25zdCBhMiA9IGFuZ2xlKG9YLCBvWSwgeDIsIHkyKTtcbiAgICBjb25zdCByYTIgPSBhbmdsZShvWCwgb1ksIHJ4MiwgcnkyKTtcbiAgICByZXR1cm4gaF8xLmRvY3VtZW50RnJhZ21lbnQoaF8xLmgyKCdyb3RhdGUoIHgsIHksIGRlZ3JlZXMgKScpLCBTdmcoc3ZnXzEuUG9pbnQoeyBjeDogMCwgY3k6IDAsIGZpbGw6ICcjYWFhJyB9KSwgc3ZnXzEuTGluZSh7IHgxOiAwLCB5MTogMCwgeDI6IHgxLCB5MjogeTEsIHN0cm9rZTogJyNhYWEnLCAnbWFya2VyLWVuZCc6ICd1cmwoI2FuZ2xlQXJyb3cpJyB9KSwgc3ZnXzEuUG9pbnQoeyBjeDogeDEsIGN5OiB5MSB9KSwgc3ZnXzEuTGluZSh7IHgxOiAwLCB5MTogMCwgeDI6IHJ4MSwgeTI6IHJ5MSwgc3Ryb2tlOiAnI2FhYScsICdtYXJrZXItZW5kJzogJ3VybCgjYW5nbGVBcnJvdyknIH0pLCBzdmdfMS5BcmMoeyBjeDogMCwgY3k6IDAsIHI6IGNlbGxTaXplLndpZHRoLCBzdGFydERlZ3JlZXM6IGExLCBlbmREZWdyZWVzOiByYTEsIHN0cm9rZTogJyNhYWEnIH0pLCBzdmdfMS5Qb2ludCh7IGN4OiByeDEsIGN5OiByeTEsIGZpbGw6ICdyZWQnIH0pKSwgaF8xLmRpdihoXzEuY29kZShgcm90YXRlKCAke1t4MSwgeTFdLm1hcCh0b0NlbGxVbml0KS5qb2luKCcsICcpfSwgJHtkMX0gKWApKSwgaF8xLmRpdihoXzEuY29kZShgWyAke1tyeDEsIHJ5MV0ubWFwKHRvQ2VsbFVuaXQpLmpvaW4oJywgJyl9IF1gKSksIGhfMS5oMigncm90YXRlKCB4LCB5LCBkZWdyZWVzLCBvWCwgb1kgKScpLCBTdmcoc3ZnXzEuUG9pbnQoeyBjeDogb1gsIGN5OiBvWSwgZmlsbDogJyNhYWEnIH0pLCBzdmdfMS5MaW5lKHsgeDE6IG9YLCB5MTogb1ksIHgyLCB5Miwgc3Ryb2tlOiAnI2FhYScsICdtYXJrZXItZW5kJzogJ3VybCgjYW5nbGVBcnJvdyknIH0pLCBzdmdfMS5Qb2ludCh7IGN4OiB4MiwgY3k6IHkyIH0pLCBzdmdfMS5MaW5lKHsgeDE6IG9YLCB5MTogb1ksIHgyOiByeDIsIHkyOiByeTIsIHN0cm9rZTogJyNhYWEnLCAnbWFya2VyLWVuZCc6ICd1cmwoI2FuZ2xlQXJyb3cpJyB9KSwgc3ZnXzEuQXJjKHsgY3g6IG9YLCBjeTogb1ksIHI6IGNlbGxTaXplLndpZHRoLCBzdGFydERlZ3JlZXM6IGEyLCBlbmREZWdyZWVzOiByYTIsIHN0cm9rZTogJyNhYWEnIH0pLCBzdmdfMS5Qb2ludCh7IGN4OiByeDIsIGN5OiByeTIsIGZpbGw6ICdyZWQnIH0pKSwgaF8xLmRpdihoXzEuY29kZShgcm90YXRlKCAke1t4MiwgeTJdLm1hcCh0b0NlbGxVbml0KS5qb2luKCcsICcpfSwgJHtkMn0sICR7W29YLCBvWV0ubWFwKHRvQ2VsbFVuaXQpLmpvaW4oJywgJyl9IClgKSksIGhfMS5kaXYoaF8xLmNvZGUoYFsgJHtbcngyLCByeTJdLm1hcCh0b0NlbGxVbml0KS5qb2luKCcsICcpfSBdYCkpKTtcbn07XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xuICAgIGNvbnN0IGxpbmVFeGFtcGxlcyA9IEV4YW1wbGVTZWN0aW9uKCdsaW5lJywgSW50ZXJzZWN0aW9uKCksIExpbmVWZWN0b3IoKSwgTWlkTGluZSgpLCBMZW5ndGgoKSwgVW5pdFZlY3RvcigpLCBBbmdsZSgpLCBCcmVzZW5oYW1MaW5lKCkpO1xuICAgIGNvbnN0IHBvaW50RXhhbXBsZXMgPSBFeGFtcGxlU2VjdGlvbigncG9pbnQnLCBUcmFuc2xhdGUoKSwgU2NhbGUoKSwgUm90YXRlKCkpO1xuICAgIGNvbnN0IHNpemVFeGFtcGxlcyA9IEV4YW1wbGVTZWN0aW9uKCdzaXplJyk7XG4gICAgY29uc3QgdXRpbHNFeGFtcGxlcyA9IEV4YW1wbGVTZWN0aW9uKCd1dGlscycpO1xuICAgIGNvbnN0IGV4YW1wbGVzID0gaF8xLmRvY3VtZW50RnJhZ21lbnQobGluZUV4YW1wbGVzLCBwb2ludEV4YW1wbGVzLCBzaXplRXhhbXBsZXMsIHV0aWxzRXhhbXBsZXMpO1xuICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZXhhbXBsZXMpO1xufSk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuLi91dGlsXCIpO1xuZXhwb3J0cy5zdmdTZXRBdHRyaWJ1dGVzID0gKGVsLCBhdHRyaWJ1dGVzKSA9PiB7XG4gICAgT2JqZWN0LmtleXMoYXR0cmlidXRlcykuZm9yRWFjaChuYW1lID0+IHtcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlTlMobnVsbCwgbmFtZSwgYXR0cmlidXRlc1tuYW1lXSk7XG4gICAgfSk7XG4gICAgcmV0dXJuIGVsO1xufTtcbmV4cG9ydHMuU3ZnRWxlbGVtZW50ID0gKG5hbWUsIGF0dHJpYnV0ZXMgPSB7fSkgPT4ge1xuICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsIG5hbWUpO1xuICAgIHJldHVybiBleHBvcnRzLnN2Z1NldEF0dHJpYnV0ZXMoZWwsIGF0dHJpYnV0ZXMpO1xufTtcbmNvbnN0IGxpbmVEZWZhdWx0cyA9IHtcbiAgICB4MTogMCxcbiAgICB5MTogMCxcbiAgICB4MjogMCxcbiAgICB5MjogMCxcbiAgICBzdHJva2U6ICcjMjIyJyxcbiAgICAnc3Ryb2tlLXdpZHRoJzogMixcbiAgICAnbWFya2VyLWVuZCc6ICd1cmwoI2xpbmVBcnJvdyknXG59O1xuZXhwb3J0cy5MaW5lID0gKGF0dHJpYnV0ZXMgPSB7fSkgPT4ge1xuICAgIGF0dHJpYnV0ZXMgPSBPYmplY3QuYXNzaWduKHt9LCBsaW5lRGVmYXVsdHMsIGF0dHJpYnV0ZXMpO1xuICAgIGxldCB7IHgxLCB5MSwgeDIsIHkyIH0gPSBhdHRyaWJ1dGVzO1xuICAgIHgxICs9IDAuNTtcbiAgICB5MSArPSAwLjU7XG4gICAgeDIgKz0gMC41O1xuICAgIHkyICs9IDAuNTtcbiAgICBPYmplY3QuYXNzaWduKGF0dHJpYnV0ZXMsIHsgeDEsIHkxLCB4MiwgeTIgfSk7XG4gICAgcmV0dXJuIGV4cG9ydHMuU3ZnRWxlbGVtZW50KCdsaW5lJywgYXR0cmlidXRlcyk7XG59O1xuY29uc3QgcG9pbnREZWZhdWx0cyA9IHtcbiAgICBjeDogMCxcbiAgICBjeTogMCxcbiAgICByOiA0LFxuICAgIGZpbGw6ICcjMjIyJ1xufTtcbmV4cG9ydHMuUG9pbnQgPSAoYXR0cmlidXRlcyA9IHt9KSA9PiB7XG4gICAgYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oe30sIHBvaW50RGVmYXVsdHMsIGF0dHJpYnV0ZXMpO1xuICAgIGxldCB7IGN4LCBjeSB9ID0gYXR0cmlidXRlcztcbiAgICBjeCArPSAwLjU7XG4gICAgY3kgKz0gMC41O1xuICAgIE9iamVjdC5hc3NpZ24oYXR0cmlidXRlcywgeyBjeCwgY3kgfSk7XG4gICAgcmV0dXJuIGV4cG9ydHMuU3ZnRWxlbGVtZW50KCdjaXJjbGUnLCBhdHRyaWJ1dGVzKTtcbn07XG5jb25zdCBhcnJvd0RlZmF1bHRzID0geyBpZDogJ2Fycm93JywgZmlsbDogJ3JlZCcgfTtcbmV4cG9ydHMuQXJyb3cgPSAoYXR0cmlidXRlcyA9IHt9KSA9PiB7XG4gICAgYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oe30sIHBvaW50RGVmYXVsdHMsIGF0dHJpYnV0ZXMpO1xuICAgIGNvbnN0IHsgaWQsIGZpbGwgfSA9IGF0dHJpYnV0ZXM7XG4gICAgY29uc3QgbWFya2VyID0gZXhwb3J0cy5TdmdFbGVsZW1lbnQoJ21hcmtlcicsIHtcbiAgICAgICAgaWQsXG4gICAgICAgIG1hcmtlcldpZHRoOiAxMCxcbiAgICAgICAgbWFya2VySGVpZ2h0OiAxMCxcbiAgICAgICAgcmVmWDogOSxcbiAgICAgICAgcmVmWTogMyxcbiAgICAgICAgb3JpZW50OiAnYXV0bycsXG4gICAgICAgIG1hcmtlclVuaXRzOiAnc3Ryb2tlV2lkdGgnXG4gICAgfSk7XG4gICAgY29uc3QgcGF0aCA9IGV4cG9ydHMuU3ZnRWxlbGVtZW50KCdwYXRoJywge1xuICAgICAgICBkOiAnTTAsMCBMMCw2IEw5LDMgeicsXG4gICAgICAgIGZpbGxcbiAgICB9KTtcbiAgICBtYXJrZXIuYXBwZW5kQ2hpbGQocGF0aCk7XG4gICAgcmV0dXJuIG1hcmtlcjtcbn07XG5jb25zdCByZWN0RGVmYXVsdHMgPSB7XG4gICAgeDogMCxcbiAgICB5OiAwLFxuICAgIHdpZHRoOiAwLFxuICAgIGhlaWdodDogMCxcbiAgICAnc3Ryb2tlLXdpZHRoJzogMSxcbiAgICBzdHJva2U6ICcjMjIyJyxcbiAgICBmaWxsOiAnI2NjYydcbn07XG5leHBvcnRzLlJlY3QgPSAoYXR0cmlidXRlcyA9IHt9KSA9PiB7XG4gICAgYXR0cmlidXRlcyA9IE9iamVjdC5hc3NpZ24oe30sIHJlY3REZWZhdWx0cywgYXR0cmlidXRlcyk7XG4gICAgbGV0IHsgeCwgeSB9ID0gYXR0cmlidXRlcztcbiAgICB4ICs9IDAuNTtcbiAgICB5ICs9IDAuNTtcbiAgICBPYmplY3QuYXNzaWduKGF0dHJpYnV0ZXMsIHsgeCwgeSB9KTtcbiAgICByZXR1cm4gZXhwb3J0cy5TdmdFbGVsZW1lbnQoJ3JlY3QnLCBhdHRyaWJ1dGVzKTtcbn07XG5jb25zdCBwb2xhclRvQ2FydGVzaWFuID0gKGN4LCBjeSwgciwgZGVncmVlcykgPT4ge1xuICAgIHZhciByYWRpYW5zID0gdXRpbF8xLmRlZ3JlZXNUb1JhZGlhbnMoZGVncmVlcyk7XG4gICAgY29uc3QgeCA9IGN4ICsgKHIgKiBNYXRoLmNvcyhyYWRpYW5zKSk7XG4gICAgY29uc3QgeSA9IGN5ICsgKHIgKiBNYXRoLnNpbihyYWRpYW5zKSk7XG4gICAgcmV0dXJuIFt4LCB5XTtcbn07XG5jb25zdCBhcmNEZWZhdWx0cyA9IHtcbiAgICBjeDogMCxcbiAgICBjeTogMCxcbiAgICByOiA0LFxuICAgIHN0YXJ0RGVncmVlczogMCxcbiAgICBlbmREZWdyZWVzOiAwLFxuICAgICdzdHJva2Utd2lkdGgnOiAyLFxuICAgIHN0cm9rZTogJyMyMjInLFxuICAgIGZpbGw6ICdub25lJ1xufTtcbmV4cG9ydHMuQXJjID0gKG9wdGlvbnMgPSB7fSkgPT4ge1xuICAgIG9wdGlvbnMgPSBPYmplY3QuYXNzaWduKHt9LCBhcmNEZWZhdWx0cywgb3B0aW9ucyk7XG4gICAgY29uc3QgeyBjeCwgY3ksIHIsIHN0YXJ0RGVncmVlcywgZW5kRGVncmVlcyB9ID0gb3B0aW9ucztcbiAgICBjb25zdCBzdGFydCA9IHBvbGFyVG9DYXJ0ZXNpYW4oY3gsIGN5LCByLCBzdGFydERlZ3JlZXMpO1xuICAgIGNvbnN0IGVuZCA9IHBvbGFyVG9DYXJ0ZXNpYW4oY3gsIGN5LCByLCBlbmREZWdyZWVzKTtcbiAgICBjb25zdCBhcmNTd2VlcCA9IGVuZERlZ3JlZXMgLSBzdGFydERlZ3JlZXMgPD0gMTgwID8gMCA6IDE7XG4gICAgY29uc3QgZCA9IFtcbiAgICAgICAgJ00nLCAuLi5zdGFydCxcbiAgICAgICAgJ0EnLCByLCByLCAwLCBhcmNTd2VlcCwgMCwgLi4uZW5kXG4gICAgXS5qb2luKCcgJyk7XG4gICAgY29uc3QgYXR0cmlidXRlcyA9IHtcbiAgICAgICAgc3Ryb2tlOiBvcHRpb25zLnN0cm9rZSxcbiAgICAgICAgJ3N0cm9rZS13aWR0aCc6IG9wdGlvbnNbJ3N0cm9rZS13aWR0aCddLFxuICAgICAgICBmaWxsOiBvcHRpb25zLmZpbGwsXG4gICAgICAgIGRcbiAgICB9O1xuICAgIHJldHVybiBleHBvcnRzLlN2Z0VsZWxlbWVudCgncGF0aCcsIGF0dHJpYnV0ZXMpO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXN2Zy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmNvbnN0IGxpbmUgPSByZXF1aXJlKFwiLi9saW5lXCIpO1xuY29uc3QgcG9pbnQgPSByZXF1aXJlKFwiLi9wb2ludFwiKTtcbmNvbnN0IHNpemUgPSByZXF1aXJlKFwiLi9zaXplXCIpO1xuY29uc3QgdXRpbCA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5jb25zdCBnZW9tZXRyeSA9IHsgbGluZSwgcG9pbnQsIHNpemUsIHV0aWwgfTtcbm1vZHVsZS5leHBvcnRzID0gZ2VvbWV0cnk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pbmRleC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcbmNvbnN0IHV0aWxfMSA9IHJlcXVpcmUoXCIuL3V0aWxcIik7XG5leHBvcnRzLmludGVyc2VjdGlvbiA9ICh4MSwgeTEsIHgyLCB5MiwgeDMsIHkzLCB4NCwgeTQpID0+IHtcbiAgICBjb25zdCBkZW5vbSA9ICh5NCAtIHkzKSAqICh4MiAtIHgxKSAtICh4NCAtIHgzKSAqICh5MiAtIHkxKTtcbiAgICBpZiAoIWRlbm9tKVxuICAgICAgICByZXR1cm47XG4gICAgY29uc3QgdWEgPSAoKHg0IC0geDMpICogKHkxIC0geTMpIC0gKHk0IC0geTMpICogKHgxIC0geDMpKSAvIGRlbm9tO1xuICAgIGNvbnN0IHViID0gKCh4MiAtIHgxKSAqICh5MSAtIHkzKSAtICh5MiAtIHkxKSAqICh4MSAtIHgzKSkgLyBkZW5vbTtcbiAgICBjb25zdCB4ID0geDEgKyB1YSAqICh4MiAtIHgxKTtcbiAgICBjb25zdCB5ID0geTEgKyB1YSAqICh5MiAtIHkxKTtcbiAgICByZXR1cm4gW3gsIHldO1xufTtcbmV4cG9ydHMubGluZVZlY3RvciA9ICh4MSwgeTEsIHgyLCB5MikgPT4gW3gyIC0geDEsIHkyIC0geTFdO1xuZXhwb3J0cy5taWRMaW5lID0gKHgxLCB5MSwgeDIsIHkyKSA9PiBbKHgxICsgeDIpIC8gMiwgKHkxICsgeTIpIC8gMl07XG5leHBvcnRzLmxlbmd0aCA9ICh4MSwgeTEsIHgyLCB5MikgPT4gTWF0aC5zcXJ0KE1hdGgucG93KCh4MiAtIHgxKSwgMikgKyBNYXRoLnBvdygoeTIgLSB5MSksIDIpKTtcbmV4cG9ydHMudW5pdFZlY3RvciA9ICh4MSwgeTEsIHgyLCB5MikgPT4ge1xuICAgIGNvbnN0IGwgPSBleHBvcnRzLmxlbmd0aCh4MSwgeTEsIHgyLCB5Mik7XG4gICAgY29uc3QgW3ZYLCB2WV0gPSBleHBvcnRzLmxpbmVWZWN0b3IoeDEsIHkxLCB4MiwgeTIpO1xuICAgIHJldHVybiBbdlggLyBsLCB2WSAvIGxdO1xufTtcbmV4cG9ydHMuYW5nbGVSYWRpYW5zID0gKHgxLCB5MSwgeDIsIHkyKSA9PiBNYXRoLmF0YW4yKHkyIC0geTEsIHgyIC0geTEpO1xuZXhwb3J0cy5hbmdsZSA9ICh4MSwgeTEsIHgyLCB5MikgPT4gdXRpbF8xLnJhZGlhbnNUb0RlZ3JlZXMoZXhwb3J0cy5hbmdsZVJhZGlhbnMoeDEsIHkxLCB4MiwgeTIpKTtcbmV4cG9ydHMuYnJlc2VuaGFtTGluZSA9ICh4MSwgeTEsIHgyLCB5MikgPT4ge1xuICAgIHgxID0gTWF0aC5mbG9vcih4MSk7XG4gICAgeDIgPSBNYXRoLmZsb29yKHgyKTtcbiAgICB5MSA9IE1hdGguZmxvb3IoeTEpO1xuICAgIHkyID0gTWF0aC5mbG9vcih5Mik7XG4gICAgY29uc3QgbGluZSA9IFt4MSwgeTFdO1xuICAgIGNvbnN0IGRYID0gTWF0aC5hYnMoeDIgLSB4MSk7XG4gICAgY29uc3QgZFkgPSBNYXRoLmFicyh5MiAtIHkxKTtcbiAgICBjb25zdCBzWCA9IHgxIDwgeDIgPyAxIDogLTE7XG4gICAgY29uc3Qgc1kgPSB5MSA8IHkyID8gMSA6IC0xO1xuICAgIGxldCBlcnIgPSBkWCAtIGRZO1xuICAgIHdoaWxlICh4MSAhPT0geDIgfHwgeTEgIT09IHkyKSB7XG4gICAgICAgIGNvbnN0IGVycjIgPSAyICogZXJyO1xuICAgICAgICBpZiAoZXJyMiA+IGRZICogLTEpIHtcbiAgICAgICAgICAgIGVyciAtPSBkWTtcbiAgICAgICAgICAgIHgxICs9IHNYO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlcnIyIDwgZFgpIHtcbiAgICAgICAgICAgIGVyciArPSBkWDtcbiAgICAgICAgICAgIHkxICs9IHNZO1xuICAgICAgICB9XG4gICAgICAgIGxpbmUucHVzaCh4MSk7XG4gICAgICAgIGxpbmUucHVzaCh5MSk7XG4gICAgfVxuICAgIHJldHVybiBsaW5lO1xufTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWxpbmUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5jb25zdCB1dGlsXzEgPSByZXF1aXJlKFwiLi91dGlsXCIpO1xuZXhwb3J0cy50cmFuc2xhdGUgPSAoeCwgeSwgYSwgYiA9IGEpID0+IFt4ICsgYSwgeSArIGJdO1xuZXhwb3J0cy5zY2FsZSA9ICh4LCB5LCBhLCBiID0gYSkgPT4gW3ggKiBhLCB5ICogYl07XG5jb25zdCByb3RhdGVBcm91bmQgPSAoeCwgeSwgcmFkaWFucywgb1gsIG9ZKSA9PiB7XG4gICAgY29uc3QgW3NYLCBzWV0gPSBleHBvcnRzLnNjYWxlKG9YLCBvWSwgLTEpO1xuICAgIGNvbnN0IFt0WCwgdFldID0gZXhwb3J0cy50cmFuc2xhdGUoeCwgeSwgc1gsIHNZKTtcbiAgICBjb25zdCBbclgsIHJZXSA9IGV4cG9ydHMucm90YXRlUmFkaWFucyh0WCwgdFksIHJhZGlhbnMpO1xuICAgIHJldHVybiBleHBvcnRzLnRyYW5zbGF0ZShyWCwgclksIG9YLCBvWSk7XG59O1xuZXhwb3J0cy5yb3RhdGVSYWRpYW5zID0gKHgsIHksIHJhZGlhbnMsIG9YID0gMCwgb1kgPSAwKSA9PiB7XG4gICAgaWYgKG9YICE9PSAwIHx8IG9ZICE9PSAwKVxuICAgICAgICByZXR1cm4gcm90YXRlQXJvdW5kKHgsIHksIHJhZGlhbnMsIG9YLCBvWSk7XG4gICAgY29uc3QgY29zID0gTWF0aC5jb3MocmFkaWFucyk7XG4gICAgY29uc3Qgc2luID0gTWF0aC5zaW4ocmFkaWFucyk7XG4gICAgY29uc3QgclggPSAoeCAqIGNvcykgLSAoeSAqIHNpbik7XG4gICAgY29uc3QgclkgPSAoeSAqIGNvcykgKyAoeCAqIHNpbik7XG4gICAgcmV0dXJuIFtyWCwgclldO1xufTtcbmV4cG9ydHMucm90YXRlID0gKHgsIHksIGRlZ3JlZXMsIG9YID0gMCwgb1kgPSAwKSA9PiBleHBvcnRzLnJvdGF0ZVJhZGlhbnMoeCwgeSwgdXRpbF8xLmRlZ3JlZXNUb1JhZGlhbnMoZGVncmVlcyksIG9YLCBvWSk7XG5leHBvcnRzLnZlY3RvclJhZGlhbnMgPSAocmFkaWFucywgbGVuZ3RoKSA9PiBbTWF0aC5jb3MocmFkaWFucykgKiBsZW5ndGgsIE1hdGguc2luKHJhZGlhbnMpICogbGVuZ3RoXTtcbmV4cG9ydHMudmVjdG9yID0gKGRlZ3JlZXMsIGxlbmd0aCkgPT4gZXhwb3J0cy52ZWN0b3JSYWRpYW5zKHV0aWxfMS5kZWdyZWVzVG9SYWRpYW5zKGRlZ3JlZXMpLCBsZW5ndGgpO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9cG9pbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJlY3RTaXplID0gKHgxLCB5MSwgeDIsIHkyKSA9PiBbTWF0aC5hYnMoeDIgLSB4MSksIE1hdGguYWJzKHkyIC0geTEpXTtcbmV4cG9ydHMuc2NhbGVTaXplSW5TaXplID0gKHcxLCBoMSwgdzIsIGgyKSA9PiBNYXRoLm1pbih3MSAvIHcyLCBoMSAvIGgyKTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXNpemUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XG5leHBvcnRzLnJhZGlhbnNUb0RlZ3JlZXMgPSAocmFkaWFucykgPT4gcmFkaWFucyAqIDE4MCAvIE1hdGguUEk7XG5leHBvcnRzLmRlZ3JlZXNUb1JhZGlhbnMgPSAoZGVncmVlcykgPT4gZGVncmVlcyAqIE1hdGguUEkgLyAxODA7XG5leHBvcnRzLmFwcHJveGltYXRlbHlFcXVhbCA9IChhLCBiLCBlcHNpbG9uID0gMC4wMDEpID0+IE1hdGguYWJzKGIgLSBhKSA8PSBlcHNpbG9uO1xuZXhwb3J0cy5hbGlnbkNlbnRlciA9IChwYXJlbnQsIGNoaWxkKSA9PiAocGFyZW50IC0gY2hpbGQpIC8gMjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXV0aWwuanMubWFwIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IHV0aWxzID0gcmVxdWlyZSggJ0Btb2p1bGUvdXRpbHMnIClcbmNvbnN0IGRhdGEgPSByZXF1aXJlKCAnLi9zcmMvZGF0YS5qc29uJyApXG5cbmNvbnN0IHsgY2xvbmUgfSA9IHV0aWxzXG5cbmNvbnN0IGVsZW1lbnRNZXRhID0gKCkgPT4gY2xvbmUoIGRhdGEgKVxuXG5tb2R1bGUuZXhwb3J0cyA9IGVsZW1lbnRNZXRhXG4iLCJtb2R1bGUuZXhwb3J0cz17XG4gIFwiaHRtbFwiOiB7XG4gICAgXCJjb250ZW50XCI6IFsgXCI8aGVhZD5cIiwgXCI8Ym9keT5cIiBdLFxuICAgIFwic2luZ3VsYXJcIjogdHJ1ZVxuICB9LFxuICBcImhlYWRcIjoge1xuICAgIFwiY29udGVudFwiOiBbIFwibWV0YWRhdGEgY29udGVudFwiIF0sXG4gICAgXCJwYXJlbnRcIjogWyBcIjxodG1sPlwiIF0sXG4gICAgXCJzaW5ndWxhclwiOiB0cnVlXG4gIH0sXG4gIFwiYm9keVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJzZWN0aW9uaW5nIHJvb3RcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwiZmxvdyBjb250ZW50XCIgXSxcbiAgICBcInBhcmVudFwiOiBbIFwiPGh0bWw+XCIgXSxcbiAgICBcInNpbmd1bGFyXCI6IHRydWVcbiAgfSxcblxuICBcInRpdGxlXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcIm1ldGFkYXRhIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwidGV4dFwiIF0sXG4gICAgXCJwYXJlbnRcIjogWyBcIjxoZWFkPlwiIF0sXG4gICAgXCJzaW5ndWxhclwiOiB0cnVlXG4gIH0sXG4gIFwiYmFzZVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJtZXRhZGF0YSBjb250ZW50XCIgXSxcbiAgICBcInBhcmVudFwiOiBbIFwiPGhlYWQ+XCIgXSxcbiAgICBcInNpbmd1bGFyXCI6IHRydWVcbiAgfSxcbiAgXCJsaW5rXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcIm1ldGFkYXRhIGNvbnRlbnRcIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8aGVhZD5cIiBdXG4gIH0sXG4gIFwibWV0YVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJtZXRhZGF0YSBjb250ZW50XCIgXSxcbiAgICBcInBhcmVudFwiOiBbIFwiPGhlYWQ+XCIgXVxuICB9LFxuICBcInN0eWxlXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcIm1ldGFkYXRhIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwidGV4dFwiIF0sXG4gICAgXCJwYXJlbnRcIjogWyBcIjxoZWFkPlwiIF1cbiAgfSxcblxuICBcImFkZHJlc3NcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJmbG93IGNvbnRlbnRcIiBdLFxuICAgIFwiZGlzYWxsb3dcIjogWyBcIjxhZGRyZXNzPlwiLCBcImhlYWRpbmcgY29udGVudFwiLCBcInNlY3Rpb25pbmcgY29udGVudFwiLCBcIjxoZWFkZXI+XCIsIFwiPGZvb3Rlcj5cIiBdXG4gIH0sXG4gIFwiYXJ0aWNsZVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJzZWN0aW9uaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcImZsb3cgY29udGVudFwiIF0sXG4gICAgXCJkaXNhbGxvd1wiOiBbIFwiPG1haW4+XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiIF1cbiAgfSxcbiAgXCJhc2lkZVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJzZWN0aW9uaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcImZsb3cgY29udGVudFwiIF0sXG4gICAgXCJkaXNhbGxvd1wiOiBbIFwiPG1haW4+XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiIF1cbiAgfSxcbiAgXCJmb290ZXJcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJmbG93IGNvbnRlbnRcIiBdLFxuICAgIFwiZGlzYWxsb3dcIjogWyBcIjxmb290ZXI+XCIsIFwiPGhlYWRlcj5cIiwgXCI8bWFpbj5cIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuICBcImhlYWRlclwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcImZsb3cgY29udGVudFwiIF0sXG4gICAgXCJkaXNhbGxvd1wiOiBbIFwiPGZvb3Rlcj5cIiwgXCI8aGVhZGVyPlwiLCBcIjxtYWluPlwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG4gIFwiaDFcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwiaGVhZGluZyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIgXVxuICB9LFxuICBcImgyXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcImhlYWRpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF1cbiAgfSxcbiAgXCJoM1wiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJoZWFkaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwiaDRcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwiaGVhZGluZyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIgXVxuICB9LFxuICBcImg1XCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcImhlYWRpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF1cbiAgfSxcbiAgXCJoNlwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJoZWFkaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwibmF2XCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInNlY3Rpb25pbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwiZmxvdyBjb250ZW50XCIgXSxcbiAgICBcImRpc2FsbG93XCI6IFsgXCI8bWFpbj5cIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuXG4gIFwiYmxvY2txdW90ZVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJzZWN0aW9uaW5nIHJvb3RcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcImZsb3cgY29udGVudFwiIF1cbiAgfSxcbiAgXCJkZFwiOiB7XG4gICAgXCJjb250ZW50XCI6IFsgXCJmbG93IGNvbnRlbnRcIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8ZGw+XCIgXSxcbiAgICBcInByZXZpb3VzXCI6IFsgXCI8ZHQ+XCIsIFwiPGRkPlwiIF1cbiAgfSxcbiAgXCJkaXZcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJmbG93IGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwiZGxcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcIjxkdD5cIiwgXCI8ZGQ+XCIgXVxuICB9LFxuICBcImR0XCI6IHtcbiAgICBcImNvbnRlbnRcIjogWyBcImZsb3cgY29udGVudFwiIF0sXG4gICAgXCJwYXJlbnRcIjogWyBcIjxkbD5cIiBdLFxuICAgIFwiZGlzYWxsb3dcIjogWyBcIjxmb290ZXI+XCIsIFwiPGhlYWRlcj5cIiwgXCJzZWN0aW9uaW5nIGNvbnRlbnRcIiwgXCJoZWFkaW5nIGNvbnRlbnRcIiBdLFxuICAgIFwibmV4dFwiOiBbIFwiPGR0PlwiLCBcIjxkZD5cIiBdXG4gIH0sXG4gIFwiZmlnY2FwdGlvblwiOiB7XG4gICAgXCJjb250ZW50XCI6IFsgXCJmbG93IGNvbnRlbnRcIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8ZmlndXJlPlwiIF0sXG4gICAgXCJwb3NpdGlvblwiOiBbIFwiZmlyc3RcIiwgXCJsYXN0XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiIF1cbiAgfSxcbiAgXCJmaWd1cmVcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwic2VjdGlvbmluZyByb290XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCI8ZmlnY2FwdGlvbj5cIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuICBcImhyXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiIF1cbiAgfSxcbiAgXCJsaVwiOiB7XG4gICAgXCJjb250ZW50XCI6IFsgXCJmbG93IGNvbnRlbnRcIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8dWw+XCIsIFwiPG9sPlwiLCBcIjxtZW51PlwiIF1cbiAgfSxcbiAgXCJtYWluXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwiZmxvdyBjb250ZW50XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiIF1cbiAgfSxcbiAgXCJvbFwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwiPGxpPlwiIF0sXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgXCI6bm90KDplbXB0eSlcIjoge1xuICAgICAgICBcImNhdGVnb3JpZXNcIjogWyBcInBhbHBhYmxlIGNvbnRlbnRcIiBdXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBcInBcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIgXVxuICB9LFxuICBcInByZVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwic2VjdGlvblwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJzZWN0aW9uaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcImZsb3cgY29udGVudFwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG4gIFwidWxcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcIjxsaT5cIiBdLFxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgIFwiOm5vdCg6ZW1wdHkpXCI6IHtcbiAgICAgICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJwYWxwYWJsZSBjb250ZW50XCIgXVxuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBcImFcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJkaXNhbGxvd1wiOiBbIFwiaW50ZXJhY3RpdmUgY29udGVudFwiIF0sXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgXCJbaHJlZl1cIiA6IHtcbiAgICAgICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJpbnRlcmFjdGl2ZSBjb250ZW50XCIgXVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXCJhYmJyXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwiYlwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIgXVxuICB9LFxuICBcImJkaVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiIF1cbiAgfSxcbiAgXCJiZG9cIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG4gIFwiYnJcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiIF1cbiAgfSxcbiAgXCJjaXRlXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwiY29kZVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIgXVxuICB9LFxuICBcImRhdGFcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG4gIFwiZGZuXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdLFxuICAgIFwiZGlzYWxsb3dcIjogWyBcIjxkZm4+XCIgXVxuICB9LFxuICBcImVtXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwiaVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIgXVxuICB9LFxuICBcImtiZFwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIgXVxuICB9LFxuICBcIm1hcmtcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG4gIFwicVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIgXVxuICB9LFxuICBcInJwXCI6IHtcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8cnVieT5cIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuICBcInJ0XCI6IHtcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8cnVieT5cIiwgXCI8cnRjPlwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG4gIFwicnRjXCI6IHtcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCI8cnQ+XCIgXSxcbiAgICBcInBhcmVudFwiOiBbIFwiPHJ1Ynk+XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiIF1cbiAgfSxcbiAgXCJydWJ5XCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiLCBcIjxycD5cIiwgXCI8cnQ+XCIsIFwiPHJ0Yz5cIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuICBcInNcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF1cbiAgfSxcbiAgXCJzYW1wXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwic21hbGxcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiIF1cbiAgfSxcbiAgXCJzcGFuXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwic3Ryb25nXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwic3ViXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwic3VwXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwidGltZVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiIF1cbiAgfSxcbiAgXCJ1XCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwidmFyXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwid2JyXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuXG4gIFwiYXJlYVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIgXSxcbiAgICBcImFuY2VzdG9yXCI6IFsgXCI8bWFwPlwiIF1cbiAgfSxcbiAgXCJhdWRpb1wiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwiZW1iZWRkZWQgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJ0cmFuc3BhcmVudFwiLCBcIjx0cmFjaz5cIiBdLFxuICAgIFwiZGlzYWxsb3dcIjogWyBcIjxhdWRpbz5cIiwgXCI8dmlkZW8+XCIgXSxcbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICBcIltjb250cm9sc11cIjoge1xuICAgICAgICBcImNhdGVnb3JpZXNcIjogWyBcImludGVyYWN0aXZlIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXVxuICAgICAgfSxcbiAgICAgIFwiOm5vdChbc3JjXSlcIjoge1xuICAgICAgICBcImNvbnRlbnRcIjogWyBcIjxzb3VyY2U+XCIgXVxuICAgICAgfVxuICAgIH0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG4gIFwibWFwXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInRyYW5zcGFyZW50XCIsIFwiPGFyZWE+XCIgXVxuICB9LFxuICBcInRyYWNrXCI6IHtcbiAgICBcInBhcmVudFwiOiBbIFwiPGF1ZGlvPlwiLCBcIjx2aWRlbz5cIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuICBcInZpZGVvXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJlbWJlZGRlZCBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInRyYW5zcGFyZW50XCIsIFwiPHRyYWNrPlwiIF0sXG4gICAgXCJkaXNhbGxvd1wiOiBbIFwiPGF1ZGlvPlwiLCBcIjx2aWRlbz5cIiBdLFxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgIFwiW2NvbnRyb2xzXVwiOiB7XG4gICAgICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiaW50ZXJhY3RpdmUgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdXG4gICAgICB9LFxuICAgICAgXCI6bm90KFtzcmNdKVwiOiB7XG4gICAgICAgIFwiY29udGVudFwiOiBbIFwiPHNvdXJjZT5cIiBdXG4gICAgICB9XG4gICAgfSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiIF1cbiAgfSxcblxuICBcImVtYmVkXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJlbWJlZGRlZCBjb250ZW50XCIsIFwiaW50ZXJhY3RpdmUgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuICBcImlmcmFtZVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwiZW1iZWRkZWQgY29udGVudFwiLCBcImludGVyYWN0aXZlIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdLFxuICAgIFwiZGlzYWxsb3dcIjogWyBcIjxzY3JpcHQ+XCIgXVxuICB9LFxuICBcImltZ1wiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwiZW1iZWRkZWQgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgIFwiW3VzZW1hcF1cIjoge1xuICAgICAgICBcImNhdGVnb3JpZXNcIjogWyBcImludGVyYWN0aXZlIGNvbnRlbnRcIiBdXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBcIm9iamVjdFwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwiZW1iZWRkZWQgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiwgXCJmb3JtLWFzc29jaWF0ZWQgY29udGVudFwiLCBcImxpc3RlZFwiLCBcInN1Ym1pdHRhYmxlXCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInRyYW5zcGFyZW50XCIsIFwiPHBhcmFtPlwiIF0sXG4gICAgXCJzdGF0ZXNcIjoge1xuICAgICAgXCJbdXNlbWFwXVwiOiB7XG4gICAgICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiaW50ZXJhY3RpdmUgY29udGVudFwiIF1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIFwicGFyYW1cIjoge1xuICAgIFwicGFyZW50XCI6IFsgXCI8b2JqZWN0PlwiIF1cbiAgfSxcbiAgXCJzb3VyY2VcIjoge1xuICAgIFwicGFyZW50XCI6IFsgXCI8cGljdHVyZT5cIiwgXCI8YXVkaW8+XCIsIFwiPHZpZGVvPlwiIF0sXG4gICAgXCJwb3NpdGlvblwiOiBbIFwiZmlyc3RcIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuXG4gIFwiY2FudmFzXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJlbWJlZGRlZCBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJ0cmFuc3BhcmVudFwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG4gIFwibm9zY3JpcHRcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcIm1ldGFkYXRhIGNvbnRlbnRcIiBdLFxuICAgIFwiZGlzYWxsb3dcIjogWyBcIjxub3NjcmlwdD5cIiBdLFxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgIFwiaGVhZCA+IG5vc2NyaXB0XCI6IHtcbiAgICAgICAgXCJjb250ZW50XCI6IFsgXCI8bGluaz5cIiwgXCI8c3R5bGU+XCIsIFwiPG1ldGE+XCIgXVxuICAgICAgfSxcbiAgICAgIFwiOm5vdCggaGVhZCA+IG5vc2NyaXB0IClcIjoge1xuICAgICAgICBcImNvbnRlbnRcIjogWyBcInRyYW5zcGFyZW50XCIgXVxuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgXCJzY3JpcHRcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcIm1ldGFkYXRhIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwidGV4dFwiIF1cbiAgfSxcbiAgXCJ0ZW1wbGF0ZVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJtZXRhZGF0YSBjb250ZW50XCIsIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJtZXRhZGF0YSBjb250ZW50XCIsIFwiZmxvdyBjb250ZW50XCIgXSxcbiAgICBcInBhcmVudFwiOiBbIFwiYm9keVwiLCBcImhlYWRcIiwgXCJjb2xncm91cFwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiBdXG4gIH0sXG5cbiAgXCJkZWxcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJ0cmFuc3BhcmVudFwiIF1cbiAgfSxcbiAgXCJpbnNcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJ0cmFuc3BhcmVudFwiIF1cbiAgfSxcblxuICBcImNhcHRpb25cIjoge1xuICAgIFwiY29udGVudFwiOiBbIFwiZmxvdyBjb250ZW50XCIgXSxcbiAgICBcInBhcmVudFwiOiBbIFwiPHRhYmxlPlwiIF0sXG4gICAgXCJwb3NpdGlvblwiOiBbIFwiZmlyc3RcIiBdXG4gIH0sXG4gIFwiY29sXCI6IHtcbiAgICBcInBhcmVudFwiOiBbIFwiPGNvbGdyb3VwPlwiIF1cbiAgfSxcbiAgXCJjb2xncm91cFwiOiB7XG4gICAgXCJwYXJlbnRcIjogWyBcIjx0YWJsZT5cIiBdLFxuICAgIFwic3RhdGVzXCI6IHtcbiAgICAgIFwiOm5vdChbc3Bhbl0pXCI6IHtcbiAgICAgICAgXCJjb250ZW50XCI6IFsgXCI8Y29sPlwiIF1cbiAgICAgIH1cbiAgICB9XG4gIH0sXG4gIFwidGFibGVcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcIjxjYXB0aW9uPlwiLCBcIjxjb2xncm91cD5cIiwgXCI8dGhlYWQ+XCIsIFwiPHRib2R5PlwiLCBcIjx0Zm9vdD5cIiwgXCI8dHI+XCIgXVxuICB9LFxuICBcInRib2R5XCI6IHtcbiAgICBcImNvbnRlbnRcIjogWyBcIjx0cj5cIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8dGFibGU+XCIgXVxuICB9LFxuICBcInRkXCI6IHtcbiAgICBcImNvbnRlbnRcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8dHI+XCIgXVxuICB9LFxuICBcInRmb290XCI6IHtcbiAgICBcImNvbnRlbnRcIjogWyBcIjx0cj5cIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8dGFibGU+XCIgXVxuICB9LFxuICBcInRoXCI6IHtcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8dHI+XCIgXVxuICB9LFxuICBcInRoZWFkXCI6IHtcbiAgICBcImNvbnRlbnRcIjogWyBcIjx0cj5cIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8dGFibGU+XCIgXVxuICB9LFxuICBcInRyXCI6IHtcbiAgICBcImNvbnRlbnRcIjogWyBcIjx0aD5cIiwgXCI8dGQ+XCIgXSxcbiAgICBcInBhcmVudFwiOiBbIFwiPHRhYmxlPlwiLCBcIjx0aGVhZD5cIiwgXCI8dGJvZHk+XCIsIFwiPHRmb290PlwiIF1cbiAgfSxcblxuICBcImJ1dHRvblwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwiaW50ZXJhY3RpdmUgY29udGVudFwiLCBcImZvcm0tYXNzb2NpYXRlZCBjb250ZW50XCIsIFwibGlzdGVkXCIsIFwibGFiZWxhYmxlXCIsIFwic3VibWl0dGFibGVcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdXG4gIH0sXG4gIFwiZGF0YWxpc3RcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIsIFwiPG9wdGlvbj5cIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuICBcImZpZWxkc2V0XCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInNlY3Rpb25pbmcgcm9vdFwiLCBcImZvcm0tYXNzb2NpYXRlZCBjb250ZW50XCIsIFwibGlzdGVkXCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCI8bGVnZW5kPlwiLCBcImZsb3cgY29udGVudFwiIF1cbiAgfSxcbiAgXCJmb3JtXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgIFwiY29udGVudFwiOiBbIFwiZmxvdyBjb250ZW50XCIgXSxcbiAgICBcImRpc2FsbG93XCI6IFsgXCI8Zm9ybT5cIiBdXG4gIH0sXG4gIFwiaW5wdXRcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwicGhyYXNpbmcgY29udGVudFwiLCBcImZvcm0tYXNzb2NpYXRlZCBjb250ZW50XCIsIFwibGlzdGVkXCIsIFwic3VibWl0dGFibGVcIiwgXCJyZXNldHRhYmxlXCIgXSxcbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICBcIjpub3QoW3R5cGU9aGlkZGVuXSlcIjoge1xuICAgICAgICBcImNhdGVnb3JpZXNcIjogWyBcImxhYmVsYWJsZVwiLCBcInBhbHBhYmxlIGNvbnRlbnRcIiBdXG4gICAgICB9XG4gICAgfVxuICB9LFxuICBcImxhYmVsXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInBocmFzaW5nIGNvbnRlbnRcIiwgXCJpbnRlcmFjdGl2ZSBjb250ZW50XCIsIFwiZm9ybS1hc3NvY2lhdGVkIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdLFxuICAgIFwiZGlzYWxsb3dcIjogWyBcIjxsYWJlbD5cIiBdXG4gIH0sXG4gIFwibGVnZW5kXCI6IHtcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8ZmllbGRzZXQ+XCIgXSxcbiAgICBcInBvc2l0aW9uXCI6IFsgXCJmaXJzdFwiIF1cbiAgfSxcbiAgXCJtZXRlclwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwiZm9ybS1hc3NvY2lhdGVkIGNvbnRlbnRcIiwgXCJsYWJlbGFibGVcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdLFxuICAgIFwiZGlzYWxsb3dcIjogWyBcIjxtZXRlcj5cIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuICBcIm9wdGdyb3VwXCI6IHtcbiAgICBcImNvbnRlbnRcIjogWyBcIjxvcHRpb24+XCIgXSxcbiAgICBcInBhcmVudFwiOiBbIFwiPHNlbGVjdD5cIiBdXG4gIH0sXG4gIFwib3B0aW9uXCI6IHtcbiAgICBcImNvbnRlbnRcIjogWyBcInRleHRcIiBdLFxuICAgIFwicGFyZW50XCI6IFsgXCI8c2VsZWN0PlwiLCBcIjxvcHRncm91cD5cIiwgXCI8ZGF0YWxpc3Q+XCIgXVxuICB9LFxuICBcIm91dHB1dFwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwiZm9ybS1hc3NvY2lhdGVkIGNvbnRlbnRcIiwgXCJsaXN0ZWRcIiwgXCJsYWJlbGFibGVcIiwgXCJyZXNldHRhYmxlXCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJwaHJhc2luZyBjb250ZW50XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiIF1cbiAgfSxcbiAgXCJwcm9ncmVzc1wiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwiZm9ybS1hc3NvY2lhdGVkIGNvbnRlbnRcIiwgXCJsYWJlbGFibGVcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInBocmFzaW5nIGNvbnRlbnRcIiBdLFxuICAgIFwiZGlzYWxsb3dcIjogWyBcIjxwcm9ncmVzcz5cIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIgXVxuICB9LFxuICBcInNlbGVjdFwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwiaW50ZXJhY3RpdmUgY29udGVudFwiLCBcImZvcm0tYXNzb2NpYXRlZCBjb250ZW50XCIsIFwibGlzdGVkXCIsIFwibGFiZWxhYmxlXCIsIFwic3VibWl0dGFibGVcIiwgXCJyZXNldHRhYmxlXCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcIjxvcHRncm91cD5cIiwgXCI8b3B0aW9uPlwiIF1cbiAgfSxcbiAgXCJ0ZXh0YXJlYVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwiaW50ZXJhY3RpdmUgY29udGVudFwiLCBcImZvcm0tYXNzb2NpYXRlZCBjb250ZW50XCIsIFwibGlzdGVkXCIsIFwibGFiZWxhYmxlXCIsIFwic3VibWl0dGFibGVcIiwgXCJyZXNldHRhYmxlXCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcInRleHRcIiBdXG4gIH0sXG5cbiAgXCJkZXRhaWxzXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInNlY3Rpb25pbmcgcm9vdFwiLCBcImludGVyYWN0aXZlIGNvbnRlbnRcIiwgXCJwYWxwYWJsZSBjb250ZW50XCIgXSxcbiAgICBcImNvbnRlbnRcIjogWyBcIjxzdW1tYXJ5PlwiLCBcImZsb3cgY29udGVudFwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiwgXCI1XCIgXSxcbiAgICBcImV4cGVyaW1lbnRhbFwiOiB0cnVlXG4gIH0sXG4gIFwiZGlhbG9nXCI6IHtcbiAgICBcImNhdGVnb3JpZXNcIjogWyBcImZsb3cgY29udGVudFwiLCBcInNlY3Rpb25pbmcgcm9vdFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCJmbG93IGNvbnRlbnRcIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIsIFwiNVwiIF0sXG4gICAgXCJleHBlcmltZW50YWxcIjogdHJ1ZVxuICB9LFxuICAgXCJoZ3JvdXBcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIsIFwiaGVhZGluZyBjb250ZW50XCIsIFwicGFscGFibGUgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCI8aDE+XCIsIFwiPGgyPlwiLCBcIjxoMz5cIiwgXCI8aDQ+XCIsIFwiPGg1PlwiLCBcIjxoNj5cIiBdLFxuICAgIFwibm9zcGVjXCI6IFsgXCI0LjAxXCIsIFwiNVwiIF0sXG4gICAgXCJleHBlcmltZW50YWxcIjogdHJ1ZVxuICB9LFxuICBcIm1lbnVcIjoge1xuICAgIFwiY2F0ZWdvcmllc1wiOiBbIFwiZmxvdyBjb250ZW50XCIgXSxcbiAgICBcInN0YXRlc1wiOiB7XG4gICAgICBcIlt0eXBlPWxpc3RdLCA6bm90KFt0eXBlXSlcIjoge1xuICAgICAgICBcImNhdGVnb3JpZXNcIjogWyBcInBhbHBhYmxlIGNvbnRlbnRcIiBdLFxuICAgICAgICBcImNvbnRlbnRcIjogWyBcImZsb3cgY29udGVudFwiLCBcIjxsaT5cIiwgXCI8c2NyaXB0PlwiLCBcIjx0ZW1wbGF0ZT5cIiBdXG4gICAgICB9LFxuICAgICAgXCJbdHlwZT1tZW51XVwiOiB7XG4gICAgICAgIFwiY29udGVudFwiOiBbIFwiPHNjcmlwdD5cIiwgXCI8dGVtcGxhdGU+XCIsIFwiPG1lbnU+XCIsIFwiPG1lbnVpdGVtPlwiLCBcIjxocj5cIiBdXG4gICAgICB9XG4gICAgfSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiLCBcIjVcIiBdLFxuICAgIFwiZXhwZXJpbWVudGFsXCI6IHRydWVcbiAgfSxcbiAgXCJtZW51aXRlbVwiOiB7XG4gICAgXCJwYXJlbnRcIjogWyBcIjxtZW51PlwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiwgXCI1XCIgXSxcbiAgICBcImV4cGVyaW1lbnRhbFwiOiB0cnVlXG4gIH0sXG4gIFwicGljdHVyZVwiOiB7XG4gICAgXCJjYXRlZ29yaWVzXCI6IFsgXCJmbG93IGNvbnRlbnRcIiwgXCJwaHJhc2luZyBjb250ZW50XCIsIFwiZW1iZWRkZWQgY29udGVudFwiIF0sXG4gICAgXCJjb250ZW50XCI6IFsgXCI8c291cmNlPlwiLCBcIjxpbWc+XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiLCBcIjVcIiwgXCI1LjFcIiBdLFxuICAgIFwiZXhwZXJpbWVudGFsXCI6IHRydWVcbiAgfSxcbiAgXCJzaGFkb3dcIjoge1xuICAgIFwiY29udGVudFwiOiBbIFwiZmxvdyBjb250ZW50XCIgXSxcbiAgICBcIm5vc3BlY1wiOiBbIFwiNC4wMVwiLCBcIjVcIiwgXCI1LjFcIiwgXCJMU1wiIF0sXG4gICAgXCJleHBlcmltZW50YWxcIjogdHJ1ZVxuICB9LFxuICBcInN1bW1hcnlcIjoge1xuICAgIFwiY29udGVudFwiOiBbIFwicGhyYXNpbmcgY29udGVudFwiLCBcImhlYWRpbmcgY29udGVudFwiIF0sXG4gICAgXCJwYXJlbnRcIjogWyBcIjxkZXRhaWxzPlwiIF0sXG4gICAgXCJub3NwZWNcIjogWyBcIjQuMDFcIiwgXCI1XCIgXSxcbiAgICBcImV4cGVyaW1lbnRhbFwiOiB0cnVlXG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBlbGVtZW50TWV0YSA9IHJlcXVpcmUoICdAbW9qdWxlL2VsZW1lbnQtbWV0YScgKVxuY29uc3QgSXMgPSByZXF1aXJlKCAnQG1vanVsZS9pcycgKVxuY29uc3QgY2FtZWxDYXNlID0gcmVxdWlyZSggJ2xvZGFzaC5jYW1lbGNhc2UnIClcblxuY29uc3QgbWV0YSA9IGVsZW1lbnRNZXRhKClcbmNvbnN0IHRhZ05hbWVzID0gT2JqZWN0LmtleXMoIG1ldGEgKVxuXG5jb25zdCBwcmVkaWNhdGVzID0ge1xuICBzdHJpbmdNYXA6IHZhbHVlID0+IElzLm9iamVjdCggdmFsdWUgKSAmJiBPYmplY3Qua2V5cyggdmFsdWUgKS5ldmVyeSgga2V5ID0+XG4gICAgSXMuc3RyaW5nKCB2YWx1ZVsga2V5IF0gKVxuICApLFxuICBhdHRyaWJ1dGVNYXBWYWx1ZTogdmFsdWUgPT4gSXMuc3RyaW5nKCB2YWx1ZSApIHx8IElzLmZ1bmN0aW9uKCB2YWx1ZSApLFxuICBhdHRyaWJ1dGVNYXA6IHZhbHVlID0+XG4gICAgSXMub2JqZWN0KCB2YWx1ZSApICYmIE9iamVjdC5rZXlzKCB2YWx1ZSApLmV2ZXJ5KCBrZXkgPT4ge1xuICAgICAgaWYoIHByZWRpY2F0ZXMuYXR0cmlidXRlTWFwVmFsdWUoIHZhbHVlWyBrZXkgXSApICkgcmV0dXJuIHRydWVcblxuICAgICAgaWYoIGtleSA9PT0gJ2RhdGEnIHx8IGtleSA9PT0gJ3N0eWxlJyApe1xuICAgICAgICByZXR1cm4gcHJlZGljYXRlcy5zdHJpbmdNYXAoIHZhbHVlWyBrZXkgXSApXG4gICAgICB9XG5cbiAgICAgIHJldHVybiBmYWxzZVxuICAgIH0pLFxuICBub2RlOiB2YWx1ZSA9PlxuICAgIHZhbHVlICYmIElzLnN0cmluZyggdmFsdWUubm9kZU5hbWUgKSAmJiBJcy5pbnRlZ2VyKCB2YWx1ZS5ub2RlVHlwZSApXG59XG5cbmNvbnN0IGlzID0gSXMoIHByZWRpY2F0ZXMgKVxuXG5jb25zdCBoYW5kbGVBdHRyaWJ1dGVzID0gKCBkb2N1bWVudCwgZWwsIGF0dHJpYnV0ZXMgKSA9PiB7XG4gIE9iamVjdC5rZXlzKCBhdHRyaWJ1dGVzICkuZm9yRWFjaCgga2V5ID0+IHtcbiAgICBjb25zdCB2YWx1ZSA9IGF0dHJpYnV0ZXNbIGtleSBdXG5cbiAgICBpZiggaXMuZnVuY3Rpb24oIHZhbHVlICkgKXtcbiAgICAgIGVsLmFkZEV2ZW50TGlzdGVuZXIoIGtleSwgdmFsdWUgKVxuICAgIH0gZWxzZSBpZigga2V5ID09PSAnZGF0YScgJiYgaXMuc3RyaW5nTWFwKCB2YWx1ZSApICkge1xuICAgICAgT2JqZWN0LmFzc2lnbiggZWwuZGF0YXNldCwgdmFsdWUgKVxuICAgIH0gZWxzZSBpZigga2V5ID09PSAnc3R5bGUnICYmIGlzLnN0cmluZ01hcCggdmFsdWUgKSApIHtcbiAgICAgIE9iamVjdC5rZXlzKCB2YWx1ZSApLmZvckVhY2goIG5hbWUgPT4ge1xuICAgICAgICBjb25zdCBrZXkgPSBjYW1lbENhc2UoIG5hbWUgKVxuXG4gICAgICAgIGVsLnN0eWxlWyBrZXkgXSA9IHZhbHVlWyBuYW1lIF1cbiAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgIGVsLnNldEF0dHJpYnV0ZSgga2V5LCB2YWx1ZSApXG4gICAgfVxuICB9KVxufVxuXG5jb25zdCBoYW5kbGVBcmcgPSAoIGRvY3VtZW50LCBlbCwgYXJnICkgPT4ge1xuICBpZiggaXMuc3RyaW5nKCBhcmcgKSApe1xuICAgIGNvbnN0IHRleHQgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSggYXJnIClcblxuICAgIGVsLmFwcGVuZENoaWxkKCB0ZXh0IClcbiAgfSBlbHNlIGlmKCBpcy5ub2RlKCBhcmcgKSApe1xuICAgIGVsLmFwcGVuZENoaWxkKCBhcmcgKVxuICB9IGVsc2UgaWYoIGlzLmF0dHJpYnV0ZU1hcCggYXJnICkgKSB7XG4gICAgaGFuZGxlQXR0cmlidXRlcyggZG9jdW1lbnQsIGVsLCBhcmcgKVxuICB9IGVsc2Uge1xuICAgIHRocm93IEVycm9yKCAnVW5leHBlY3RlZCBhcmd1bWVudCcgKVxuICB9XG59XG5cbmNvbnN0IGNyZWF0ZUVsID0gKCBkb2N1bWVudCwgdGFnTmFtZSwgLi4uYXJncyApID0+IHtcbiAgY29uc3QgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCB0YWdOYW1lIClcblxuICBhcmdzLmZvckVhY2goIGFyZyA9PiB7XG4gICAgaGFuZGxlQXJnKCBkb2N1bWVudCwgZWwsIGFyZyApXG4gIH0pXG5cbiAgcmV0dXJuIGVsXG59XG5cbmNvbnN0IEggPSBkb2N1bWVudCA9PiB7XG4gIGNvbnN0IGVsZW1lbnQgPSAoIHRhZ05hbWUsIC4uLmFyZ3MgKSA9PiBjcmVhdGVFbCggZG9jdW1lbnQsIHRhZ05hbWUsIC4uLmFyZ3MgKVxuICBjb25zdCB0ZXh0Tm9kZSA9IHN0ciA9PiBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZSggc3RyIClcbiAgY29uc3QgY29tbWVudCA9IHN0ciA9PiBkb2N1bWVudC5jcmVhdGVDb21tZW50KCBzdHIgKVxuICBjb25zdCBkb2N1bWVudEZyYWdtZW50ID0gKCAuLi5jaGlsZE5vZGVzICkgPT4ge1xuICAgIGNvbnN0IGZyYWdtZW50ID0gZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpXG5cbiAgICBjaGlsZE5vZGVzLmZvckVhY2goIG5vZGUgPT4ge1xuICAgICAgaWYoIGlzLm5vZGUoIG5vZGUgKSApe1xuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCggbm9kZSApXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmcmFnbWVudC5hcHBlbmRDaGlsZCggZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoIG5vZGUgKSApXG4gICAgICB9XG4gICAgfSlcblxuICAgIHJldHVybiBmcmFnbWVudFxuICB9XG5cbiAgY29uc3QgaCA9IHtcbiAgICBlbGVtZW50LCB0ZXh0Tm9kZSwgY29tbWVudCwgZG9jdW1lbnRGcmFnbWVudFxuICB9XG5cbiAgdGFnTmFtZXMuZm9yRWFjaCggdGFnTmFtZSA9PiB7XG4gICAgaFsgdGFnTmFtZSBdID0gKCAuLi5hcmdzICkgPT4gZWxlbWVudCggdGFnTmFtZSwgLi4uYXJncyApXG4gIH0pXG5cbiAgcmV0dXJuIGhcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBIXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSggJy4vc3JjJyApXHJcbiIsIid1c2Ugc3RyaWN0J1xuXG5jb25zdCBpc0VtcHR5ID0gb2JqID0+IHtcbiAgZm9yKCBjb25zdCBrZXkgaW4gb2JqIClcbiAgICByZXR1cm4gZmFsc2VcblxuICByZXR1cm4gdHJ1ZVxufVxuXG5jb25zdCBwcmVkaWNhdGVzID0ge1xuICBudW1iZXI6IHN1YmplY3QgPT4gdHlwZW9mIHN1YmplY3QgPT09ICdudW1iZXInICYmIGlzRmluaXRlKCBzdWJqZWN0ICksXG4gIGludGVnZXI6IE51bWJlci5pc0ludGVnZXIsXG4gIHN0cmluZzogc3ViamVjdCA9PiB0eXBlb2Ygc3ViamVjdCA9PT0gJ3N0cmluZycsXG4gIGJvb2xlYW46IHN1YmplY3QgPT4gdHlwZW9mIHN1YmplY3QgPT09ICdib29sZWFuJyxcbiAgYXJyYXk6IEFycmF5LmlzQXJyYXksXG4gIG51bGw6IHN1YmplY3QgPT4gc3ViamVjdCA9PT0gbnVsbCxcbiAgdW5kZWZpbmVkOiBzdWJqZWN0ID0+IHN1YmplY3QgPT09IHVuZGVmaW5lZCxcbiAgZnVuY3Rpb246IHN1YmplY3QgPT4gdHlwZW9mIHN1YmplY3QgPT09ICdmdW5jdGlvbicsXG4gIG9iamVjdDogc3ViamVjdCA9PiB0eXBlb2Ygc3ViamVjdCA9PT0gJ29iamVjdCcgJiYgIXByZWRpY2F0ZXMubnVsbCggc3ViamVjdCApICYmICFwcmVkaWNhdGVzLmFycmF5KCBzdWJqZWN0ICksXG4gIGVtcHR5OiBzdWJqZWN0ID0+IHByZWRpY2F0ZXMub2JqZWN0KCBzdWJqZWN0ICkgJiYgaXNFbXB0eSggc3ViamVjdCApXG59XG5cbm1vZHVsZS5leHBvcnRzID0gcHJlZGljYXRlc1xuIiwiJ3VzZSBzdHJpY3QnXG5cbmNvbnN0IGRlZmF1bHRQcmVkaWNhdGVzID0gcmVxdWlyZSggJy4vZGVmYXVsdC1wcmVkaWNhdGVzJyApXG5cbmNvbnN0IElzID0gKCBwcmVkaWNhdGVzID0gZGVmYXVsdFByZWRpY2F0ZXMgKSA9PiB7XG4gIC8qXG4gICAgd2VpcmQgdHJpcGxlIGFzc2lnbiBpcyBzbyB0aGF0IGN1c3RvbSBwcmVkaWNhdGUga2V5cyBjb21lIGJlZm9yZSBkZWZhdWx0c1xuICAgIHNvIHRoYXQgdXNlciBwcmVkaWNhdGVzIGFsd2F5cyB0YWtlIHByZWNlZGVuY2Ugb3ZlciBkZWZhdWx0c1xuICAqL1xuICBpZiggcHJlZGljYXRlcyAhPT0gZGVmYXVsdFByZWRpY2F0ZXMgKVxuICAgIHByZWRpY2F0ZXMgPSBPYmplY3QuYXNzaWduKCB7fSwgcHJlZGljYXRlcywgZGVmYXVsdFByZWRpY2F0ZXMsIHByZWRpY2F0ZXMgKVxuXG4gIGNvbnN0IHQgPSBUKCBwcmVkaWNhdGVzIClcblxuICByZXR1cm4gdC50eXBlcygpLnJlZHVjZSggKCBpcywgbmFtZSApID0+IHtcbiAgICBpc1sgbmFtZSBdID0gdmFsdWUgPT4gdC5pcyggdmFsdWUsIG5hbWUgKVxuXG4gICAgcmV0dXJuIGlzXG4gIH0sIHQgKVxufVxuXG5jb25zdCBUID0gdHlwZVByZWRpY2F0ZXMgPT4ge1xuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoIHR5cGVQcmVkaWNhdGVzIClcblxuICBjb25zdCBpcyA9ICggc3ViamVjdCwgdHlwZW5hbWUgKSA9PlxuICAgIHR5cGVQcmVkaWNhdGVzWyB0eXBlbmFtZSBdICYmIHR5cGVQcmVkaWNhdGVzWyB0eXBlbmFtZSBdKCBzdWJqZWN0IClcblxuICBjb25zdCBpc09ubHkgPSAoIHN1YmplY3QsIHR5cGVuYW1lICkgPT5cbiAgICBpcyggc3ViamVjdCwgdHlwZW5hbWUgKSAmJiBhbGxPZiggc3ViamVjdCApLmxlbmd0aCA9PT0gMVxuXG4gIGNvbnN0IHNvbWUgPSAoIHN1YmplY3QsIC4uLnR5cGVuYW1lcyApID0+XG4gICAgdHlwZW5hbWVzLnNvbWUoIHR5cGVuYW1lID0+IGlzKCBzdWJqZWN0LCB0eXBlbmFtZSApIClcblxuICBjb25zdCBldmVyeSA9ICggc3ViamVjdCwgLi4udHlwZW5hbWVzICkgPT5cbiAgICB0eXBlbmFtZXMuZXZlcnkoIHR5cGVuYW1lID0+IGlzKCBzdWJqZWN0LCB0eXBlbmFtZSApIClcblxuICBjb25zdCBfb2YgPSBzdWJqZWN0ID0+XG4gICAga2V5cy5maW5kKCBrZXkgPT4gaXMoIHN1YmplY3QsIGtleSApIClcblxuICBjb25zdCBhbGxPZiA9IHN1YmplY3QgPT5cbiAgICBrZXlzLmZpbHRlcigga2V5ID0+IGlzKCBzdWJqZWN0LCBrZXkgKSApXG5cbiAgY29uc3QgdHlwZXMgPSAoKSA9PiBrZXlzLnNsaWNlKClcblxuICByZXR1cm4geyBpcywgaXNPbmx5LCBzb21lLCBldmVyeSwgb2Y6IF9vZiwgYWxsT2YsIHR5cGVzIH1cbn1cblxuT2JqZWN0LmFzc2lnbiggSXMsIElzKCkgKVxuXG5tb2R1bGUuZXhwb3J0cyA9IElzXG4iLCIndXNlIHN0cmljdCdcblxuY29uc3QgbG9kYXNoUmFuZ2UgPSByZXF1aXJlKCAnbG9kYXNoLnJhbmdlJyApXG5cbmNvbnN0IGNsb25lID0gKCBvYmogPSB7fSApID0+IEpTT04ucGFyc2UoIEpTT04uc3RyaW5naWZ5KCBvYmogKSApXG5cbmNvbnN0IG1hdGNoZXMgPSAoIG9iaiA9IHt9LCBzb3VyY2UgPSB7fSApID0+XG4gIE9iamVjdC5rZXlzKCBzb3VyY2UgKS5ldmVyeSgga2V5ID0+IG9ialsga2V5IF0gPT09IHNvdXJjZVsga2V5IF0gKVxuXG5jb25zdCBpZCA9ICggcHJlZml4ID0gJycsIGxlbmd0aCA9IDMyICkgPT4ge1xuICBpZiggcHJlZml4IClcbiAgICBwcmVmaXggPSBpZGVudGlmaWVyKCBwcmVmaXggKSArICctJ1xuXG4gIGxldCBzdHIgPSBwcmVmaXhcblxuICBmb3IoIGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSsrICkge1xuICAgIHN0ciArPSBNYXRoLmZsb29yKCBNYXRoLnJhbmRvbSgpICogMTYgKS50b1N0cmluZyggMTYgKVxuICB9XG5cbiAgcmV0dXJuIHN0clxufVxuXG5jb25zdCBpZGVudGlmaWVyID0gKCB2YWx1ZSA9ICcnLCBjYXNlU2Vuc2l0aXZlID0gZmFsc2UgKSA9PiB7XG4gIGxldCBpZCA9IHZhbHVlLnJlcGxhY2UoIC9bXmEtejAtOV0vZ2ksICctJyApLnJlcGxhY2UoIC8tezIsfS9nLCAnLScgKS5yZXBsYWNlKCAvXi0vaSwgJycgKS5yZXBsYWNlKCAvLSQvaSwgJycgKVxuXG4gIGlmKCAhY2FzZVNlbnNpdGl2ZSApXG4gICAgaWQgPSBpZC50b0xvd2VyQ2FzZSgpXG5cbiAgcmV0dXJuIGlkXG59XG5cbmNvbnN0IGVzY2FwZUh0bWwgPSAoIHN0ciA9ICcnICkgPT4ge1xuICBjb25zdCByZXN1bHQgPSBzdHIucmVwbGFjZSggLzwvZywgJyZsdDsnIClcbiAgcmV0dXJuIHJlc3VsdFxufVxuXG5jb25zdCBjYXBpdGFsaXplRmlyc3RMZXR0ZXIgPSAoIHN0ciA9ICcnICkgPT5cbiAgc3RyLmNoYXJBdCggMCApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoIDEgKVxuXG5jb25zdCBoeXBoZW5hdGVkVG9DYW1lbENhc2UgPSAoIHN0ciA9ICcnLCBjYXBpdGFsaXplRmlyc3QgPSBmYWxzZSApID0+IHtcbiAgbGV0IFsgaGVhZCwgLi4ucmVzdCBdID0gc3RyLnNwbGl0KCAnLScgKVxuXG4gIGlmKCBjYXBpdGFsaXplRmlyc3QgKVxuICAgIGhlYWQgPSBjYXBpdGFsaXplRmlyc3RMZXR0ZXIoIGhlYWQgKVxuXG4gIGNvbnN0IGNhcGl0YWxpemVkID0gcmVzdC5tYXAoIGNhcGl0YWxpemVGaXJzdExldHRlciApXG5cbiAgcmV0dXJuIFsgaGVhZCwgLi4uY2FwaXRhbGl6ZWQgXS5qb2luKCAnJyApXG59XG5cbmNvbnN0IGNhbWVsQ2FzZVRvSHlwaGVuYXRlZCA9ICggc3RyID0gJycgKSA9PlxuICBzdHIucmVwbGFjZSggLyhbQS1aXSkvZywgbWF0Y2hlcyA9PiBgLSR7bWF0Y2hlc1sgMCBdLnRvTG93ZXJDYXNlKCl9YCApXG5cblxuY29uc3QgcmFuZ2UgPSAoIHN0YXJ0ID0gMCwgZW5kICkgPT4ge1xuICBpZiggdHlwZW9mIGVuZCA9PT0gJ3VuZGVmaW5lZCcgKSB7XG4gICAgcmV0dXJuIGxvZGFzaFJhbmdlKCBzdGFydCApXG4gIH1cbiAgZWxzZSB7XG4gICAgY29uc3Qgc3RlcCA9IHN0YXJ0IDw9IGVuZCA/IDEgOiAtMVxuICAgIGNvbnN0IG5vcm1FbmQgPSBlbmQgPj0gMCA/IGVuZCArIDEgOiBlbmQgLSAxXG4gICAgICByZXR1cm4gbG9kYXNoUmFuZ2UoIHN0YXJ0LCBub3JtRW5kLCBzdGVwIClcbiAgfVxufVxuXG5cbmNvbnN0IHV0aWxzID0ge1xuICBpZCwgaWRlbnRpZmllciwgbWF0Y2hlcywgY2xvbmUsIGVzY2FwZUh0bWwsIGNhcGl0YWxpemVGaXJzdExldHRlcixcbiAgaHlwaGVuYXRlZFRvQ2FtZWxDYXNlLCBjYW1lbENhc2VUb0h5cGhlbmF0ZWQsIHJhbmdlXG59XG5cbm1vZHVsZS5leHBvcnRzID0gdXRpbHNcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwO1xuXG4vKiogYE9iamVjdCN0b1N0cmluZ2AgcmVzdWx0IHJlZmVyZW5jZXMuICovXG52YXIgc3ltYm9sVGFnID0gJ1tvYmplY3QgU3ltYm9sXSc7XG5cbi8qKiBVc2VkIHRvIG1hdGNoIHdvcmRzIGNvbXBvc2VkIG9mIGFscGhhbnVtZXJpYyBjaGFyYWN0ZXJzLiAqL1xudmFyIHJlQXNjaWlXb3JkID0gL1teXFx4MDAtXFx4MmZcXHgzYS1cXHg0MFxceDViLVxceDYwXFx4N2ItXFx4N2ZdKy9nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBMYXRpbiBVbmljb2RlIGxldHRlcnMgKGV4Y2x1ZGluZyBtYXRoZW1hdGljYWwgb3BlcmF0b3JzKS4gKi9cbnZhciByZUxhdGluID0gL1tcXHhjMC1cXHhkNlxceGQ4LVxceGY2XFx4ZjgtXFx4ZmZcXHUwMTAwLVxcdTAxN2ZdL2c7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSBjaGFyYWN0ZXIgY2xhc3Nlcy4gKi9cbnZhciByc0FzdHJhbFJhbmdlID0gJ1xcXFx1ZDgwMC1cXFxcdWRmZmYnLFxuICAgIHJzQ29tYm9NYXJrc1JhbmdlID0gJ1xcXFx1MDMwMC1cXFxcdTAzNmZcXFxcdWZlMjAtXFxcXHVmZTIzJyxcbiAgICByc0NvbWJvU3ltYm9sc1JhbmdlID0gJ1xcXFx1MjBkMC1cXFxcdTIwZjAnLFxuICAgIHJzRGluZ2JhdFJhbmdlID0gJ1xcXFx1MjcwMC1cXFxcdTI3YmYnLFxuICAgIHJzTG93ZXJSYW5nZSA9ICdhLXpcXFxceGRmLVxcXFx4ZjZcXFxceGY4LVxcXFx4ZmYnLFxuICAgIHJzTWF0aE9wUmFuZ2UgPSAnXFxcXHhhY1xcXFx4YjFcXFxceGQ3XFxcXHhmNycsXG4gICAgcnNOb25DaGFyUmFuZ2UgPSAnXFxcXHgwMC1cXFxceDJmXFxcXHgzYS1cXFxceDQwXFxcXHg1Yi1cXFxceDYwXFxcXHg3Yi1cXFxceGJmJyxcbiAgICByc1B1bmN0dWF0aW9uUmFuZ2UgPSAnXFxcXHUyMDAwLVxcXFx1MjA2ZicsXG4gICAgcnNTcGFjZVJhbmdlID0gJyBcXFxcdFxcXFx4MGJcXFxcZlxcXFx4YTBcXFxcdWZlZmZcXFxcblxcXFxyXFxcXHUyMDI4XFxcXHUyMDI5XFxcXHUxNjgwXFxcXHUxODBlXFxcXHUyMDAwXFxcXHUyMDAxXFxcXHUyMDAyXFxcXHUyMDAzXFxcXHUyMDA0XFxcXHUyMDA1XFxcXHUyMDA2XFxcXHUyMDA3XFxcXHUyMDA4XFxcXHUyMDA5XFxcXHUyMDBhXFxcXHUyMDJmXFxcXHUyMDVmXFxcXHUzMDAwJyxcbiAgICByc1VwcGVyUmFuZ2UgPSAnQS1aXFxcXHhjMC1cXFxceGQ2XFxcXHhkOC1cXFxceGRlJyxcbiAgICByc1ZhclJhbmdlID0gJ1xcXFx1ZmUwZVxcXFx1ZmUwZicsXG4gICAgcnNCcmVha1JhbmdlID0gcnNNYXRoT3BSYW5nZSArIHJzTm9uQ2hhclJhbmdlICsgcnNQdW5jdHVhdGlvblJhbmdlICsgcnNTcGFjZVJhbmdlO1xuXG4vKiogVXNlZCB0byBjb21wb3NlIHVuaWNvZGUgY2FwdHVyZSBncm91cHMuICovXG52YXIgcnNBcG9zID0gXCJbJ1xcdTIwMTldXCIsXG4gICAgcnNBc3RyYWwgPSAnWycgKyByc0FzdHJhbFJhbmdlICsgJ10nLFxuICAgIHJzQnJlYWsgPSAnWycgKyByc0JyZWFrUmFuZ2UgKyAnXScsXG4gICAgcnNDb21ibyA9ICdbJyArIHJzQ29tYm9NYXJrc1JhbmdlICsgcnNDb21ib1N5bWJvbHNSYW5nZSArICddJyxcbiAgICByc0RpZ2l0cyA9ICdcXFxcZCsnLFxuICAgIHJzRGluZ2JhdCA9ICdbJyArIHJzRGluZ2JhdFJhbmdlICsgJ10nLFxuICAgIHJzTG93ZXIgPSAnWycgKyByc0xvd2VyUmFuZ2UgKyAnXScsXG4gICAgcnNNaXNjID0gJ1teJyArIHJzQXN0cmFsUmFuZ2UgKyByc0JyZWFrUmFuZ2UgKyByc0RpZ2l0cyArIHJzRGluZ2JhdFJhbmdlICsgcnNMb3dlclJhbmdlICsgcnNVcHBlclJhbmdlICsgJ10nLFxuICAgIHJzRml0eiA9ICdcXFxcdWQ4M2NbXFxcXHVkZmZiLVxcXFx1ZGZmZl0nLFxuICAgIHJzTW9kaWZpZXIgPSAnKD86JyArIHJzQ29tYm8gKyAnfCcgKyByc0ZpdHogKyAnKScsXG4gICAgcnNOb25Bc3RyYWwgPSAnW14nICsgcnNBc3RyYWxSYW5nZSArICddJyxcbiAgICByc1JlZ2lvbmFsID0gJyg/OlxcXFx1ZDgzY1tcXFxcdWRkZTYtXFxcXHVkZGZmXSl7Mn0nLFxuICAgIHJzU3VyclBhaXIgPSAnW1xcXFx1ZDgwMC1cXFxcdWRiZmZdW1xcXFx1ZGMwMC1cXFxcdWRmZmZdJyxcbiAgICByc1VwcGVyID0gJ1snICsgcnNVcHBlclJhbmdlICsgJ10nLFxuICAgIHJzWldKID0gJ1xcXFx1MjAwZCc7XG5cbi8qKiBVc2VkIHRvIGNvbXBvc2UgdW5pY29kZSByZWdleGVzLiAqL1xudmFyIHJzTG93ZXJNaXNjID0gJyg/OicgKyByc0xvd2VyICsgJ3wnICsgcnNNaXNjICsgJyknLFxuICAgIHJzVXBwZXJNaXNjID0gJyg/OicgKyByc1VwcGVyICsgJ3wnICsgcnNNaXNjICsgJyknLFxuICAgIHJzT3B0TG93ZXJDb250ciA9ICcoPzonICsgcnNBcG9zICsgJyg/OmR8bGx8bXxyZXxzfHR8dmUpKT8nLFxuICAgIHJzT3B0VXBwZXJDb250ciA9ICcoPzonICsgcnNBcG9zICsgJyg/OkR8TEx8TXxSRXxTfFR8VkUpKT8nLFxuICAgIHJlT3B0TW9kID0gcnNNb2RpZmllciArICc/JyxcbiAgICByc09wdFZhciA9ICdbJyArIHJzVmFyUmFuZ2UgKyAnXT8nLFxuICAgIHJzT3B0Sm9pbiA9ICcoPzonICsgcnNaV0ogKyAnKD86JyArIFtyc05vbkFzdHJhbCwgcnNSZWdpb25hbCwgcnNTdXJyUGFpcl0uam9pbignfCcpICsgJyknICsgcnNPcHRWYXIgKyByZU9wdE1vZCArICcpKicsXG4gICAgcnNTZXEgPSByc09wdFZhciArIHJlT3B0TW9kICsgcnNPcHRKb2luLFxuICAgIHJzRW1vamkgPSAnKD86JyArIFtyc0RpbmdiYXQsIHJzUmVnaW9uYWwsIHJzU3VyclBhaXJdLmpvaW4oJ3wnKSArICcpJyArIHJzU2VxLFxuICAgIHJzU3ltYm9sID0gJyg/OicgKyBbcnNOb25Bc3RyYWwgKyByc0NvbWJvICsgJz8nLCByc0NvbWJvLCByc1JlZ2lvbmFsLCByc1N1cnJQYWlyLCByc0FzdHJhbF0uam9pbignfCcpICsgJyknO1xuXG4vKiogVXNlZCB0byBtYXRjaCBhcG9zdHJvcGhlcy4gKi9cbnZhciByZUFwb3MgPSBSZWdFeHAocnNBcG9zLCAnZycpO1xuXG4vKipcbiAqIFVzZWQgdG8gbWF0Y2ggW2NvbWJpbmluZyBkaWFjcml0aWNhbCBtYXJrc10oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ29tYmluaW5nX0RpYWNyaXRpY2FsX01hcmtzKSBhbmRcbiAqIFtjb21iaW5pbmcgZGlhY3JpdGljYWwgbWFya3MgZm9yIHN5bWJvbHNdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NvbWJpbmluZ19EaWFjcml0aWNhbF9NYXJrc19mb3JfU3ltYm9scykuXG4gKi9cbnZhciByZUNvbWJvTWFyayA9IFJlZ0V4cChyc0NvbWJvLCAnZycpO1xuXG4vKiogVXNlZCB0byBtYXRjaCBbc3RyaW5nIHN5bWJvbHNdKGh0dHBzOi8vbWF0aGlhc2J5bmVucy5iZS9ub3Rlcy9qYXZhc2NyaXB0LXVuaWNvZGUpLiAqL1xudmFyIHJlVW5pY29kZSA9IFJlZ0V4cChyc0ZpdHogKyAnKD89JyArIHJzRml0eiArICcpfCcgKyByc1N5bWJvbCArIHJzU2VxLCAnZycpO1xuXG4vKiogVXNlZCB0byBtYXRjaCBjb21wbGV4IG9yIGNvbXBvdW5kIHdvcmRzLiAqL1xudmFyIHJlVW5pY29kZVdvcmQgPSBSZWdFeHAoW1xuICByc1VwcGVyICsgJz8nICsgcnNMb3dlciArICcrJyArIHJzT3B0TG93ZXJDb250ciArICcoPz0nICsgW3JzQnJlYWssIHJzVXBwZXIsICckJ10uam9pbignfCcpICsgJyknLFxuICByc1VwcGVyTWlzYyArICcrJyArIHJzT3B0VXBwZXJDb250ciArICcoPz0nICsgW3JzQnJlYWssIHJzVXBwZXIgKyByc0xvd2VyTWlzYywgJyQnXS5qb2luKCd8JykgKyAnKScsXG4gIHJzVXBwZXIgKyAnPycgKyByc0xvd2VyTWlzYyArICcrJyArIHJzT3B0TG93ZXJDb250cixcbiAgcnNVcHBlciArICcrJyArIHJzT3B0VXBwZXJDb250cixcbiAgcnNEaWdpdHMsXG4gIHJzRW1vamlcbl0uam9pbignfCcpLCAnZycpO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgc3RyaW5ncyB3aXRoIFt6ZXJvLXdpZHRoIGpvaW5lcnMgb3IgY29kZSBwb2ludHMgZnJvbSB0aGUgYXN0cmFsIHBsYW5lc10oaHR0cDovL2Vldi5lZS9ibG9nLzIwMTUvMDkvMTIvZGFyay1jb3JuZXJzLW9mLXVuaWNvZGUvKS4gKi9cbnZhciByZUhhc1VuaWNvZGUgPSBSZWdFeHAoJ1snICsgcnNaV0ogKyByc0FzdHJhbFJhbmdlICArIHJzQ29tYm9NYXJrc1JhbmdlICsgcnNDb21ib1N5bWJvbHNSYW5nZSArIHJzVmFyUmFuZ2UgKyAnXScpO1xuXG4vKiogVXNlZCB0byBkZXRlY3Qgc3RyaW5ncyB0aGF0IG5lZWQgYSBtb3JlIHJvYnVzdCByZWdleHAgdG8gbWF0Y2ggd29yZHMuICovXG52YXIgcmVIYXNVbmljb2RlV29yZCA9IC9bYS16XVtBLVpdfFtBLVpdezIsfVthLXpdfFswLTldW2EtekEtWl18W2EtekEtWl1bMC05XXxbXmEtekEtWjAtOSBdLztcblxuLyoqIFVzZWQgdG8gbWFwIExhdGluIFVuaWNvZGUgbGV0dGVycyB0byBiYXNpYyBMYXRpbiBsZXR0ZXJzLiAqL1xudmFyIGRlYnVycmVkTGV0dGVycyA9IHtcbiAgLy8gTGF0aW4tMSBTdXBwbGVtZW50IGJsb2NrLlxuICAnXFx4YzAnOiAnQScsICAnXFx4YzEnOiAnQScsICdcXHhjMic6ICdBJywgJ1xceGMzJzogJ0EnLCAnXFx4YzQnOiAnQScsICdcXHhjNSc6ICdBJyxcbiAgJ1xceGUwJzogJ2EnLCAgJ1xceGUxJzogJ2EnLCAnXFx4ZTInOiAnYScsICdcXHhlMyc6ICdhJywgJ1xceGU0JzogJ2EnLCAnXFx4ZTUnOiAnYScsXG4gICdcXHhjNyc6ICdDJywgICdcXHhlNyc6ICdjJyxcbiAgJ1xceGQwJzogJ0QnLCAgJ1xceGYwJzogJ2QnLFxuICAnXFx4YzgnOiAnRScsICAnXFx4YzknOiAnRScsICdcXHhjYSc6ICdFJywgJ1xceGNiJzogJ0UnLFxuICAnXFx4ZTgnOiAnZScsICAnXFx4ZTknOiAnZScsICdcXHhlYSc6ICdlJywgJ1xceGViJzogJ2UnLFxuICAnXFx4Y2MnOiAnSScsICAnXFx4Y2QnOiAnSScsICdcXHhjZSc6ICdJJywgJ1xceGNmJzogJ0knLFxuICAnXFx4ZWMnOiAnaScsICAnXFx4ZWQnOiAnaScsICdcXHhlZSc6ICdpJywgJ1xceGVmJzogJ2knLFxuICAnXFx4ZDEnOiAnTicsICAnXFx4ZjEnOiAnbicsXG4gICdcXHhkMic6ICdPJywgICdcXHhkMyc6ICdPJywgJ1xceGQ0JzogJ08nLCAnXFx4ZDUnOiAnTycsICdcXHhkNic6ICdPJywgJ1xceGQ4JzogJ08nLFxuICAnXFx4ZjInOiAnbycsICAnXFx4ZjMnOiAnbycsICdcXHhmNCc6ICdvJywgJ1xceGY1JzogJ28nLCAnXFx4ZjYnOiAnbycsICdcXHhmOCc6ICdvJyxcbiAgJ1xceGQ5JzogJ1UnLCAgJ1xceGRhJzogJ1UnLCAnXFx4ZGInOiAnVScsICdcXHhkYyc6ICdVJyxcbiAgJ1xceGY5JzogJ3UnLCAgJ1xceGZhJzogJ3UnLCAnXFx4ZmInOiAndScsICdcXHhmYyc6ICd1JyxcbiAgJ1xceGRkJzogJ1knLCAgJ1xceGZkJzogJ3knLCAnXFx4ZmYnOiAneScsXG4gICdcXHhjNic6ICdBZScsICdcXHhlNic6ICdhZScsXG4gICdcXHhkZSc6ICdUaCcsICdcXHhmZSc6ICd0aCcsXG4gICdcXHhkZic6ICdzcycsXG4gIC8vIExhdGluIEV4dGVuZGVkLUEgYmxvY2suXG4gICdcXHUwMTAwJzogJ0EnLCAgJ1xcdTAxMDInOiAnQScsICdcXHUwMTA0JzogJ0EnLFxuICAnXFx1MDEwMSc6ICdhJywgICdcXHUwMTAzJzogJ2EnLCAnXFx1MDEwNSc6ICdhJyxcbiAgJ1xcdTAxMDYnOiAnQycsICAnXFx1MDEwOCc6ICdDJywgJ1xcdTAxMGEnOiAnQycsICdcXHUwMTBjJzogJ0MnLFxuICAnXFx1MDEwNyc6ICdjJywgICdcXHUwMTA5JzogJ2MnLCAnXFx1MDEwYic6ICdjJywgJ1xcdTAxMGQnOiAnYycsXG4gICdcXHUwMTBlJzogJ0QnLCAgJ1xcdTAxMTAnOiAnRCcsICdcXHUwMTBmJzogJ2QnLCAnXFx1MDExMSc6ICdkJyxcbiAgJ1xcdTAxMTInOiAnRScsICAnXFx1MDExNCc6ICdFJywgJ1xcdTAxMTYnOiAnRScsICdcXHUwMTE4JzogJ0UnLCAnXFx1MDExYSc6ICdFJyxcbiAgJ1xcdTAxMTMnOiAnZScsICAnXFx1MDExNSc6ICdlJywgJ1xcdTAxMTcnOiAnZScsICdcXHUwMTE5JzogJ2UnLCAnXFx1MDExYic6ICdlJyxcbiAgJ1xcdTAxMWMnOiAnRycsICAnXFx1MDExZSc6ICdHJywgJ1xcdTAxMjAnOiAnRycsICdcXHUwMTIyJzogJ0cnLFxuICAnXFx1MDExZCc6ICdnJywgICdcXHUwMTFmJzogJ2cnLCAnXFx1MDEyMSc6ICdnJywgJ1xcdTAxMjMnOiAnZycsXG4gICdcXHUwMTI0JzogJ0gnLCAgJ1xcdTAxMjYnOiAnSCcsICdcXHUwMTI1JzogJ2gnLCAnXFx1MDEyNyc6ICdoJyxcbiAgJ1xcdTAxMjgnOiAnSScsICAnXFx1MDEyYSc6ICdJJywgJ1xcdTAxMmMnOiAnSScsICdcXHUwMTJlJzogJ0knLCAnXFx1MDEzMCc6ICdJJyxcbiAgJ1xcdTAxMjknOiAnaScsICAnXFx1MDEyYic6ICdpJywgJ1xcdTAxMmQnOiAnaScsICdcXHUwMTJmJzogJ2knLCAnXFx1MDEzMSc6ICdpJyxcbiAgJ1xcdTAxMzQnOiAnSicsICAnXFx1MDEzNSc6ICdqJyxcbiAgJ1xcdTAxMzYnOiAnSycsICAnXFx1MDEzNyc6ICdrJywgJ1xcdTAxMzgnOiAnaycsXG4gICdcXHUwMTM5JzogJ0wnLCAgJ1xcdTAxM2InOiAnTCcsICdcXHUwMTNkJzogJ0wnLCAnXFx1MDEzZic6ICdMJywgJ1xcdTAxNDEnOiAnTCcsXG4gICdcXHUwMTNhJzogJ2wnLCAgJ1xcdTAxM2MnOiAnbCcsICdcXHUwMTNlJzogJ2wnLCAnXFx1MDE0MCc6ICdsJywgJ1xcdTAxNDInOiAnbCcsXG4gICdcXHUwMTQzJzogJ04nLCAgJ1xcdTAxNDUnOiAnTicsICdcXHUwMTQ3JzogJ04nLCAnXFx1MDE0YSc6ICdOJyxcbiAgJ1xcdTAxNDQnOiAnbicsICAnXFx1MDE0Nic6ICduJywgJ1xcdTAxNDgnOiAnbicsICdcXHUwMTRiJzogJ24nLFxuICAnXFx1MDE0Yyc6ICdPJywgICdcXHUwMTRlJzogJ08nLCAnXFx1MDE1MCc6ICdPJyxcbiAgJ1xcdTAxNGQnOiAnbycsICAnXFx1MDE0Zic6ICdvJywgJ1xcdTAxNTEnOiAnbycsXG4gICdcXHUwMTU0JzogJ1InLCAgJ1xcdTAxNTYnOiAnUicsICdcXHUwMTU4JzogJ1InLFxuICAnXFx1MDE1NSc6ICdyJywgICdcXHUwMTU3JzogJ3InLCAnXFx1MDE1OSc6ICdyJyxcbiAgJ1xcdTAxNWEnOiAnUycsICAnXFx1MDE1Yyc6ICdTJywgJ1xcdTAxNWUnOiAnUycsICdcXHUwMTYwJzogJ1MnLFxuICAnXFx1MDE1Yic6ICdzJywgICdcXHUwMTVkJzogJ3MnLCAnXFx1MDE1Zic6ICdzJywgJ1xcdTAxNjEnOiAncycsXG4gICdcXHUwMTYyJzogJ1QnLCAgJ1xcdTAxNjQnOiAnVCcsICdcXHUwMTY2JzogJ1QnLFxuICAnXFx1MDE2Myc6ICd0JywgICdcXHUwMTY1JzogJ3QnLCAnXFx1MDE2Nyc6ICd0JyxcbiAgJ1xcdTAxNjgnOiAnVScsICAnXFx1MDE2YSc6ICdVJywgJ1xcdTAxNmMnOiAnVScsICdcXHUwMTZlJzogJ1UnLCAnXFx1MDE3MCc6ICdVJywgJ1xcdTAxNzInOiAnVScsXG4gICdcXHUwMTY5JzogJ3UnLCAgJ1xcdTAxNmInOiAndScsICdcXHUwMTZkJzogJ3UnLCAnXFx1MDE2Zic6ICd1JywgJ1xcdTAxNzEnOiAndScsICdcXHUwMTczJzogJ3UnLFxuICAnXFx1MDE3NCc6ICdXJywgICdcXHUwMTc1JzogJ3cnLFxuICAnXFx1MDE3Nic6ICdZJywgICdcXHUwMTc3JzogJ3knLCAnXFx1MDE3OCc6ICdZJyxcbiAgJ1xcdTAxNzknOiAnWicsICAnXFx1MDE3Yic6ICdaJywgJ1xcdTAxN2QnOiAnWicsXG4gICdcXHUwMTdhJzogJ3onLCAgJ1xcdTAxN2MnOiAneicsICdcXHUwMTdlJzogJ3onLFxuICAnXFx1MDEzMic6ICdJSicsICdcXHUwMTMzJzogJ2lqJyxcbiAgJ1xcdTAxNTInOiAnT2UnLCAnXFx1MDE1Myc6ICdvZScsXG4gICdcXHUwMTQ5JzogXCInblwiLCAnXFx1MDE3Zic6ICdzcydcbn07XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgZ2xvYmFsYCBmcm9tIE5vZGUuanMuICovXG52YXIgZnJlZUdsb2JhbCA9IHR5cGVvZiBnbG9iYWwgPT0gJ29iamVjdCcgJiYgZ2xvYmFsICYmIGdsb2JhbC5PYmplY3QgPT09IE9iamVjdCAmJiBnbG9iYWw7XG5cbi8qKiBEZXRlY3QgZnJlZSB2YXJpYWJsZSBgc2VsZmAuICovXG52YXIgZnJlZVNlbGYgPSB0eXBlb2Ygc2VsZiA9PSAnb2JqZWN0JyAmJiBzZWxmICYmIHNlbGYuT2JqZWN0ID09PSBPYmplY3QgJiYgc2VsZjtcblxuLyoqIFVzZWQgYXMgYSByZWZlcmVuY2UgdG8gdGhlIGdsb2JhbCBvYmplY3QuICovXG52YXIgcm9vdCA9IGZyZWVHbG9iYWwgfHwgZnJlZVNlbGYgfHwgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblxuLyoqXG4gKiBBIHNwZWNpYWxpemVkIHZlcnNpb24gb2YgYF8ucmVkdWNlYCBmb3IgYXJyYXlzIHdpdGhvdXQgc3VwcG9ydCBmb3JcbiAqIGl0ZXJhdGVlIHNob3J0aGFuZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IFthcnJheV0gVGhlIGFycmF5IHRvIGl0ZXJhdGUgb3Zlci5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IGl0ZXJhdGVlIFRoZSBmdW5jdGlvbiBpbnZva2VkIHBlciBpdGVyYXRpb24uXG4gKiBAcGFyYW0geyp9IFthY2N1bXVsYXRvcl0gVGhlIGluaXRpYWwgdmFsdWUuXG4gKiBAcGFyYW0ge2Jvb2xlYW59IFtpbml0QWNjdW1dIFNwZWNpZnkgdXNpbmcgdGhlIGZpcnN0IGVsZW1lbnQgb2YgYGFycmF5YCBhc1xuICogIHRoZSBpbml0aWFsIHZhbHVlLlxuICogQHJldHVybnMgeyp9IFJldHVybnMgdGhlIGFjY3VtdWxhdGVkIHZhbHVlLlxuICovXG5mdW5jdGlvbiBhcnJheVJlZHVjZShhcnJheSwgaXRlcmF0ZWUsIGFjY3VtdWxhdG9yLCBpbml0QWNjdW0pIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBhcnJheSA/IGFycmF5Lmxlbmd0aCA6IDA7XG5cbiAgaWYgKGluaXRBY2N1bSAmJiBsZW5ndGgpIHtcbiAgICBhY2N1bXVsYXRvciA9IGFycmF5WysraW5kZXhdO1xuICB9XG4gIHdoaWxlICgrK2luZGV4IDwgbGVuZ3RoKSB7XG4gICAgYWNjdW11bGF0b3IgPSBpdGVyYXRlZShhY2N1bXVsYXRvciwgYXJyYXlbaW5kZXhdLCBpbmRleCwgYXJyYXkpO1xuICB9XG4gIHJldHVybiBhY2N1bXVsYXRvcjtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBhbiBBU0NJSSBgc3RyaW5nYCB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gYXNjaWlUb0FycmF5KHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLnNwbGl0KCcnKTtcbn1cblxuLyoqXG4gKiBTcGxpdHMgYW4gQVNDSUkgYHN0cmluZ2AgaW50byBhbiBhcnJheSBvZiBpdHMgd29yZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBUaGUgc3RyaW5nIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHdvcmRzIG9mIGBzdHJpbmdgLlxuICovXG5mdW5jdGlvbiBhc2NpaVdvcmRzKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLm1hdGNoKHJlQXNjaWlXb3JkKSB8fCBbXTtcbn1cblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5wcm9wZXJ0eU9mYCB3aXRob3V0IHN1cHBvcnQgZm9yIGRlZXAgcGF0aHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBxdWVyeS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGFjY2Vzc29yIGZ1bmN0aW9uLlxuICovXG5mdW5jdGlvbiBiYXNlUHJvcGVydHlPZihvYmplY3QpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGtleSkge1xuICAgIHJldHVybiBvYmplY3QgPT0gbnVsbCA/IHVuZGVmaW5lZCA6IG9iamVjdFtrZXldO1xuICB9O1xufVxuXG4vKipcbiAqIFVzZWQgYnkgYF8uZGVidXJyYCB0byBjb252ZXJ0IExhdGluLTEgU3VwcGxlbWVudCBhbmQgTGF0aW4gRXh0ZW5kZWQtQVxuICogbGV0dGVycyB0byBiYXNpYyBMYXRpbiBsZXR0ZXJzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gbGV0dGVyIFRoZSBtYXRjaGVkIGxldHRlciB0byBkZWJ1cnIuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBkZWJ1cnJlZCBsZXR0ZXIuXG4gKi9cbnZhciBkZWJ1cnJMZXR0ZXIgPSBiYXNlUHJvcGVydHlPZihkZWJ1cnJlZExldHRlcnMpO1xuXG4vKipcbiAqIENoZWNrcyBpZiBgc3RyaW5nYCBjb250YWlucyBVbmljb2RlIHN5bWJvbHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBzdHJpbmcgVGhlIHN0cmluZyB0byBpbnNwZWN0LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGEgc3ltYm9sIGlzIGZvdW5kLCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGhhc1VuaWNvZGUoc3RyaW5nKSB7XG4gIHJldHVybiByZUhhc1VuaWNvZGUudGVzdChzdHJpbmcpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgc3RyaW5nYCBjb250YWlucyBhIHdvcmQgY29tcG9zZWQgb2YgVW5pY29kZSBzeW1ib2xzLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gaW5zcGVjdC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBhIHdvcmQgaXMgZm91bmQsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaGFzVW5pY29kZVdvcmQoc3RyaW5nKSB7XG4gIHJldHVybiByZUhhc1VuaWNvZGVXb3JkLnRlc3Qoc3RyaW5nKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgc3RyaW5nYCB0byBhbiBhcnJheS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IHN0cmluZyBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBhcnJheS5cbiAqL1xuZnVuY3Rpb24gc3RyaW5nVG9BcnJheShzdHJpbmcpIHtcbiAgcmV0dXJuIGhhc1VuaWNvZGUoc3RyaW5nKVxuICAgID8gdW5pY29kZVRvQXJyYXkoc3RyaW5nKVxuICAgIDogYXNjaWlUb0FycmF5KHN0cmluZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYSBVbmljb2RlIGBzdHJpbmdgIHRvIGFuIGFycmF5LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge3N0cmluZ30gc3RyaW5nIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY29udmVydGVkIGFycmF5LlxuICovXG5mdW5jdGlvbiB1bmljb2RlVG9BcnJheShzdHJpbmcpIHtcbiAgcmV0dXJuIHN0cmluZy5tYXRjaChyZVVuaWNvZGUpIHx8IFtdO1xufVxuXG4vKipcbiAqIFNwbGl0cyBhIFVuaWNvZGUgYHN0cmluZ2AgaW50byBhbiBhcnJheSBvZiBpdHMgd29yZHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7c3RyaW5nfSBUaGUgc3RyaW5nIHRvIGluc3BlY3QuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHdvcmRzIG9mIGBzdHJpbmdgLlxuICovXG5mdW5jdGlvbiB1bmljb2RlV29yZHMoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcubWF0Y2gocmVVbmljb2RlV29yZCkgfHwgW107XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBTeW1ib2wgPSByb290LlN5bWJvbDtcblxuLyoqIFVzZWQgdG8gY29udmVydCBzeW1ib2xzIHRvIHByaW1pdGl2ZXMgYW5kIHN0cmluZ3MuICovXG52YXIgc3ltYm9sUHJvdG8gPSBTeW1ib2wgPyBTeW1ib2wucHJvdG90eXBlIDogdW5kZWZpbmVkLFxuICAgIHN5bWJvbFRvU3RyaW5nID0gc3ltYm9sUHJvdG8gPyBzeW1ib2xQcm90by50b1N0cmluZyA6IHVuZGVmaW5lZDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5zbGljZWAgd2l0aG91dCBhbiBpdGVyYXRlZSBjYWxsIGd1YXJkLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0ge0FycmF5fSBhcnJheSBUaGUgYXJyYXkgdG8gc2xpY2UuXG4gKiBAcGFyYW0ge251bWJlcn0gW3N0YXJ0PTBdIFRoZSBzdGFydCBwb3NpdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbZW5kPWFycmF5Lmxlbmd0aF0gVGhlIGVuZCBwb3NpdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgc2xpY2Ugb2YgYGFycmF5YC5cbiAqL1xuZnVuY3Rpb24gYmFzZVNsaWNlKGFycmF5LCBzdGFydCwgZW5kKSB7XG4gIHZhciBpbmRleCA9IC0xLFxuICAgICAgbGVuZ3RoID0gYXJyYXkubGVuZ3RoO1xuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IC1zdGFydCA+IGxlbmd0aCA/IDAgOiAobGVuZ3RoICsgc3RhcnQpO1xuICB9XG4gIGVuZCA9IGVuZCA+IGxlbmd0aCA/IGxlbmd0aCA6IGVuZDtcbiAgaWYgKGVuZCA8IDApIHtcbiAgICBlbmQgKz0gbGVuZ3RoO1xuICB9XG4gIGxlbmd0aCA9IHN0YXJ0ID4gZW5kID8gMCA6ICgoZW5kIC0gc3RhcnQpID4+PiAwKTtcbiAgc3RhcnQgPj4+PSAwO1xuXG4gIHZhciByZXN1bHQgPSBBcnJheShsZW5ndGgpO1xuICB3aGlsZSAoKytpbmRleCA8IGxlbmd0aCkge1xuICAgIHJlc3VsdFtpbmRleF0gPSBhcnJheVtpbmRleCArIHN0YXJ0XTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIFRoZSBiYXNlIGltcGxlbWVudGF0aW9uIG9mIGBfLnRvU3RyaW5nYCB3aGljaCBkb2Vzbid0IGNvbnZlcnQgbnVsbGlzaFxuICogdmFsdWVzIHRvIGVtcHR5IHN0cmluZ3MuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIHByb2Nlc3MuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBzdHJpbmcuXG4gKi9cbmZ1bmN0aW9uIGJhc2VUb1N0cmluZyh2YWx1ZSkge1xuICAvLyBFeGl0IGVhcmx5IGZvciBzdHJpbmdzIHRvIGF2b2lkIGEgcGVyZm9ybWFuY2UgaGl0IGluIHNvbWUgZW52aXJvbm1lbnRzLlxuICBpZiAodHlwZW9mIHZhbHVlID09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG4gIGlmIChpc1N5bWJvbCh2YWx1ZSkpIHtcbiAgICByZXR1cm4gc3ltYm9sVG9TdHJpbmcgPyBzeW1ib2xUb1N0cmluZy5jYWxsKHZhbHVlKSA6ICcnO1xuICB9XG4gIHZhciByZXN1bHQgPSAodmFsdWUgKyAnJyk7XG4gIHJldHVybiAocmVzdWx0ID09ICcwJyAmJiAoMSAvIHZhbHVlKSA9PSAtSU5GSU5JVFkpID8gJy0wJyA6IHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDYXN0cyBgYXJyYXlgIHRvIGEgc2xpY2UgaWYgaXQncyBuZWVkZWQuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7QXJyYXl9IGFycmF5IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICogQHBhcmFtIHtudW1iZXJ9IHN0YXJ0IFRoZSBzdGFydCBwb3NpdGlvbi5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbZW5kPWFycmF5Lmxlbmd0aF0gVGhlIGVuZCBwb3NpdGlvbi5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgY2FzdCBzbGljZS5cbiAqL1xuZnVuY3Rpb24gY2FzdFNsaWNlKGFycmF5LCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGg7XG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gbGVuZ3RoIDogZW5kO1xuICByZXR1cm4gKCFzdGFydCAmJiBlbmQgPj0gbGVuZ3RoKSA/IGFycmF5IDogYmFzZVNsaWNlKGFycmF5LCBzdGFydCwgZW5kKTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgZnVuY3Rpb24gbGlrZSBgXy5sb3dlckZpcnN0YC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtzdHJpbmd9IG1ldGhvZE5hbWUgVGhlIG5hbWUgb2YgdGhlIGBTdHJpbmdgIGNhc2UgbWV0aG9kIHRvIHVzZS5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNhc2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNhc2VGaXJzdChtZXRob2ROYW1lKSB7XG4gIHJldHVybiBmdW5jdGlvbihzdHJpbmcpIHtcbiAgICBzdHJpbmcgPSB0b1N0cmluZyhzdHJpbmcpO1xuXG4gICAgdmFyIHN0clN5bWJvbHMgPSBoYXNVbmljb2RlKHN0cmluZylcbiAgICAgID8gc3RyaW5nVG9BcnJheShzdHJpbmcpXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIHZhciBjaHIgPSBzdHJTeW1ib2xzXG4gICAgICA/IHN0clN5bWJvbHNbMF1cbiAgICAgIDogc3RyaW5nLmNoYXJBdCgwKTtcblxuICAgIHZhciB0cmFpbGluZyA9IHN0clN5bWJvbHNcbiAgICAgID8gY2FzdFNsaWNlKHN0clN5bWJvbHMsIDEpLmpvaW4oJycpXG4gICAgICA6IHN0cmluZy5zbGljZSgxKTtcblxuICAgIHJldHVybiBjaHJbbWV0aG9kTmFtZV0oKSArIHRyYWlsaW5nO1xuICB9O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBmdW5jdGlvbiBsaWtlIGBfLmNhbWVsQ2FzZWAuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrIFRoZSBmdW5jdGlvbiB0byBjb21iaW5lIGVhY2ggd29yZC5cbiAqIEByZXR1cm5zIHtGdW5jdGlvbn0gUmV0dXJucyB0aGUgbmV3IGNvbXBvdW5kZXIgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZUNvbXBvdW5kZXIoY2FsbGJhY2spIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0cmluZykge1xuICAgIHJldHVybiBhcnJheVJlZHVjZSh3b3JkcyhkZWJ1cnIoc3RyaW5nKS5yZXBsYWNlKHJlQXBvcywgJycpKSwgY2FsbGJhY2ssICcnKTtcbiAgfTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIHN0cmluZy4gQW4gZW1wdHkgc3RyaW5nIGlzIHJldHVybmVkIGZvciBgbnVsbGBcbiAqIGFuZCBgdW5kZWZpbmVkYCB2YWx1ZXMuIFRoZSBzaWduIG9mIGAtMGAgaXMgcHJlc2VydmVkLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvU3RyaW5nKG51bGwpO1xuICogLy8gPT4gJydcbiAqXG4gKiBfLnRvU3RyaW5nKC0wKTtcbiAqIC8vID0+ICctMCdcbiAqXG4gKiBfLnRvU3RyaW5nKFsxLCAyLCAzXSk7XG4gKiAvLyA9PiAnMSwyLDMnXG4gKi9cbmZ1bmN0aW9uIHRvU3RyaW5nKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSA9PSBudWxsID8gJycgOiBiYXNlVG9TdHJpbmcodmFsdWUpO1xufVxuXG4vKipcbiAqIENvbnZlcnRzIGBzdHJpbmdgIHRvIFtjYW1lbCBjYXNlXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9DYW1lbENhc2UpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGNvbnZlcnQuXG4gKiBAcmV0dXJucyB7c3RyaW5nfSBSZXR1cm5zIHRoZSBjYW1lbCBjYXNlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uY2FtZWxDYXNlKCdGb28gQmFyJyk7XG4gKiAvLyA9PiAnZm9vQmFyJ1xuICpcbiAqIF8uY2FtZWxDYXNlKCctLWZvby1iYXItLScpO1xuICogLy8gPT4gJ2Zvb0JhcidcbiAqXG4gKiBfLmNhbWVsQ2FzZSgnX19GT09fQkFSX18nKTtcbiAqIC8vID0+ICdmb29CYXInXG4gKi9cbnZhciBjYW1lbENhc2UgPSBjcmVhdGVDb21wb3VuZGVyKGZ1bmN0aW9uKHJlc3VsdCwgd29yZCwgaW5kZXgpIHtcbiAgd29yZCA9IHdvcmQudG9Mb3dlckNhc2UoKTtcbiAgcmV0dXJuIHJlc3VsdCArIChpbmRleCA/IGNhcGl0YWxpemUod29yZCkgOiB3b3JkKTtcbn0pO1xuXG4vKipcbiAqIENvbnZlcnRzIHRoZSBmaXJzdCBjaGFyYWN0ZXIgb2YgYHN0cmluZ2AgdG8gdXBwZXIgY2FzZSBhbmQgdGhlIHJlbWFpbmluZ1xuICogdG8gbG93ZXIgY2FzZS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDMuMC4wXG4gKiBAY2F0ZWdvcnkgU3RyaW5nXG4gKiBAcGFyYW0ge3N0cmluZ30gW3N0cmluZz0nJ10gVGhlIHN0cmluZyB0byBjYXBpdGFsaXplLlxuICogQHJldHVybnMge3N0cmluZ30gUmV0dXJucyB0aGUgY2FwaXRhbGl6ZWQgc3RyaW5nLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmNhcGl0YWxpemUoJ0ZSRUQnKTtcbiAqIC8vID0+ICdGcmVkJ1xuICovXG5mdW5jdGlvbiBjYXBpdGFsaXplKHN0cmluZykge1xuICByZXR1cm4gdXBwZXJGaXJzdCh0b1N0cmluZyhzdHJpbmcpLnRvTG93ZXJDYXNlKCkpO1xufVxuXG4vKipcbiAqIERlYnVycnMgYHN0cmluZ2AgYnkgY29udmVydGluZ1xuICogW0xhdGluLTEgU3VwcGxlbWVudF0oaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvTGF0aW4tMV9TdXBwbGVtZW50XyhVbmljb2RlX2Jsb2NrKSNDaGFyYWN0ZXJfdGFibGUpXG4gKiBhbmQgW0xhdGluIEV4dGVuZGVkLUFdKGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0xhdGluX0V4dGVuZGVkLUEpXG4gKiBsZXR0ZXJzIHRvIGJhc2ljIExhdGluIGxldHRlcnMgYW5kIHJlbW92aW5nXG4gKiBbY29tYmluaW5nIGRpYWNyaXRpY2FsIG1hcmtzXShodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9Db21iaW5pbmdfRGlhY3JpdGljYWxfTWFya3MpLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGRlYnVyci5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGRlYnVycmVkIHN0cmluZy5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5kZWJ1cnIoJ2TDqWrDoCB2dScpO1xuICogLy8gPT4gJ2RlamEgdnUnXG4gKi9cbmZ1bmN0aW9uIGRlYnVycihzdHJpbmcpIHtcbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgcmV0dXJuIHN0cmluZyAmJiBzdHJpbmcucmVwbGFjZShyZUxhdGluLCBkZWJ1cnJMZXR0ZXIpLnJlcGxhY2UocmVDb21ib01hcmssICcnKTtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgZmlyc3QgY2hhcmFjdGVyIG9mIGBzdHJpbmdgIHRvIHVwcGVyIGNhc2UuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IFN0cmluZ1xuICogQHBhcmFtIHtzdHJpbmd9IFtzdHJpbmc9JyddIFRoZSBzdHJpbmcgdG8gY29udmVydC5cbiAqIEByZXR1cm5zIHtzdHJpbmd9IFJldHVybnMgdGhlIGNvbnZlcnRlZCBzdHJpbmcuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8udXBwZXJGaXJzdCgnZnJlZCcpO1xuICogLy8gPT4gJ0ZyZWQnXG4gKlxuICogXy51cHBlckZpcnN0KCdGUkVEJyk7XG4gKiAvLyA9PiAnRlJFRCdcbiAqL1xudmFyIHVwcGVyRmlyc3QgPSBjcmVhdGVDYXNlRmlyc3QoJ3RvVXBwZXJDYXNlJyk7XG5cbi8qKlxuICogU3BsaXRzIGBzdHJpbmdgIGludG8gYW4gYXJyYXkgb2YgaXRzIHdvcmRzLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMy4wLjBcbiAqIEBjYXRlZ29yeSBTdHJpbmdcbiAqIEBwYXJhbSB7c3RyaW5nfSBbc3RyaW5nPScnXSBUaGUgc3RyaW5nIHRvIGluc3BlY3QuXG4gKiBAcGFyYW0ge1JlZ0V4cHxzdHJpbmd9IFtwYXR0ZXJuXSBUaGUgcGF0dGVybiB0byBtYXRjaCB3b3Jkcy5cbiAqIEBwYXJhbS0ge09iamVjdH0gW2d1YXJkXSBFbmFibGVzIHVzZSBhcyBhbiBpdGVyYXRlZSBmb3IgbWV0aG9kcyBsaWtlIGBfLm1hcGAuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHdvcmRzIG9mIGBzdHJpbmdgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLndvcmRzKCdmcmVkLCBiYXJuZXksICYgcGViYmxlcycpO1xuICogLy8gPT4gWydmcmVkJywgJ2Jhcm5leScsICdwZWJibGVzJ11cbiAqXG4gKiBfLndvcmRzKCdmcmVkLCBiYXJuZXksICYgcGViYmxlcycsIC9bXiwgXSsvZyk7XG4gKiAvLyA9PiBbJ2ZyZWQnLCAnYmFybmV5JywgJyYnLCAncGViYmxlcyddXG4gKi9cbmZ1bmN0aW9uIHdvcmRzKHN0cmluZywgcGF0dGVybiwgZ3VhcmQpIHtcbiAgc3RyaW5nID0gdG9TdHJpbmcoc3RyaW5nKTtcbiAgcGF0dGVybiA9IGd1YXJkID8gdW5kZWZpbmVkIDogcGF0dGVybjtcblxuICBpZiAocGF0dGVybiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGhhc1VuaWNvZGVXb3JkKHN0cmluZykgPyB1bmljb2RlV29yZHMoc3RyaW5nKSA6IGFzY2lpV29yZHMoc3RyaW5nKTtcbiAgfVxuICByZXR1cm4gc3RyaW5nLm1hdGNoKHBhdHRlcm4pIHx8IFtdO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNhbWVsQ2FzZTtcbiIsIi8qKlxuICogbG9kYXNoIChDdXN0b20gQnVpbGQpIDxodHRwczovL2xvZGFzaC5jb20vPlxuICogQnVpbGQ6IGBsb2Rhc2ggbW9kdWxhcml6ZSBleHBvcnRzPVwibnBtXCIgLW8gLi9gXG4gKiBDb3B5cmlnaHQgalF1ZXJ5IEZvdW5kYXRpb24gYW5kIG90aGVyIGNvbnRyaWJ1dG9ycyA8aHR0cHM6Ly9qcXVlcnkub3JnLz5cbiAqIFJlbGVhc2VkIHVuZGVyIE1JVCBsaWNlbnNlIDxodHRwczovL2xvZGFzaC5jb20vbGljZW5zZT5cbiAqIEJhc2VkIG9uIFVuZGVyc2NvcmUuanMgMS44LjMgPGh0dHA6Ly91bmRlcnNjb3JlanMub3JnL0xJQ0VOU0U+XG4gKiBDb3B5cmlnaHQgSmVyZW15IEFzaGtlbmFzLCBEb2N1bWVudENsb3VkIGFuZCBJbnZlc3RpZ2F0aXZlIFJlcG9ydGVycyAmIEVkaXRvcnNcbiAqL1xuXG4vKiogVXNlZCBhcyByZWZlcmVuY2VzIGZvciB2YXJpb3VzIGBOdW1iZXJgIGNvbnN0YW50cy4gKi9cbnZhciBJTkZJTklUWSA9IDEgLyAwLFxuICAgIE1BWF9TQUZFX0lOVEVHRVIgPSA5MDA3MTk5MjU0NzQwOTkxLFxuICAgIE1BWF9JTlRFR0VSID0gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDgsXG4gICAgTkFOID0gMCAvIDA7XG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jVGFnID0gJ1tvYmplY3QgRnVuY3Rpb25dJyxcbiAgICBnZW5UYWcgPSAnW29iamVjdCBHZW5lcmF0b3JGdW5jdGlvbl0nLFxuICAgIHN5bWJvbFRhZyA9ICdbb2JqZWN0IFN5bWJvbF0nO1xuXG4vKiogVXNlZCB0byBtYXRjaCBsZWFkaW5nIGFuZCB0cmFpbGluZyB3aGl0ZXNwYWNlLiAqL1xudmFyIHJlVHJpbSA9IC9eXFxzK3xcXHMrJC9nO1xuXG4vKiogVXNlZCB0byBkZXRlY3QgYmFkIHNpZ25lZCBoZXhhZGVjaW1hbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCYWRIZXggPSAvXlstK10weFswLTlhLWZdKyQvaTtcblxuLyoqIFVzZWQgdG8gZGV0ZWN0IGJpbmFyeSBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNCaW5hcnkgPSAvXjBiWzAxXSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCBvY3RhbCBzdHJpbmcgdmFsdWVzLiAqL1xudmFyIHJlSXNPY3RhbCA9IC9eMG9bMC03XSskL2k7XG5cbi8qKiBVc2VkIHRvIGRldGVjdCB1bnNpZ25lZCBpbnRlZ2VyIHZhbHVlcy4gKi9cbnZhciByZUlzVWludCA9IC9eKD86MHxbMS05XVxcZCopJC87XG5cbi8qKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyB3aXRob3V0IGEgZGVwZW5kZW5jeSBvbiBgcm9vdGAuICovXG52YXIgZnJlZVBhcnNlSW50ID0gcGFyc2VJbnQ7XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RQcm90byA9IE9iamVjdC5wcm90b3R5cGU7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiBCdWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcyBmb3IgdGhvc2Ugd2l0aCB0aGUgc2FtZSBuYW1lIGFzIG90aGVyIGBsb2Rhc2hgIG1ldGhvZHMuICovXG52YXIgbmF0aXZlQ2VpbCA9IE1hdGguY2VpbCxcbiAgICBuYXRpdmVNYXggPSBNYXRoLm1heDtcblxuLyoqXG4gKiBUaGUgYmFzZSBpbXBsZW1lbnRhdGlvbiBvZiBgXy5yYW5nZWAgYW5kIGBfLnJhbmdlUmlnaHRgIHdoaWNoIGRvZXNuJ3RcbiAqIGNvZXJjZSBhcmd1bWVudHMuXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGFydCBUaGUgc3RhcnQgb2YgdGhlIHJhbmdlLlxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBUaGUgZW5kIG9mIHRoZSByYW5nZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBzdGVwIFRoZSB2YWx1ZSB0byBpbmNyZW1lbnQgb3IgZGVjcmVtZW50IGJ5LlxuICogQHBhcmFtIHtib29sZWFufSBbZnJvbVJpZ2h0XSBTcGVjaWZ5IGl0ZXJhdGluZyBmcm9tIHJpZ2h0IHRvIGxlZnQuXG4gKiBAcmV0dXJucyB7QXJyYXl9IFJldHVybnMgdGhlIHJhbmdlIG9mIG51bWJlcnMuXG4gKi9cbmZ1bmN0aW9uIGJhc2VSYW5nZShzdGFydCwgZW5kLCBzdGVwLCBmcm9tUmlnaHQpIHtcbiAgdmFyIGluZGV4ID0gLTEsXG4gICAgICBsZW5ndGggPSBuYXRpdmVNYXgobmF0aXZlQ2VpbCgoZW5kIC0gc3RhcnQpIC8gKHN0ZXAgfHwgMSkpLCAwKSxcbiAgICAgIHJlc3VsdCA9IEFycmF5KGxlbmd0aCk7XG5cbiAgd2hpbGUgKGxlbmd0aC0tKSB7XG4gICAgcmVzdWx0W2Zyb21SaWdodCA/IGxlbmd0aCA6ICsraW5kZXhdID0gc3RhcnQ7XG4gICAgc3RhcnQgKz0gc3RlcDtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYSBgXy5yYW5nZWAgb3IgYF8ucmFuZ2VSaWdodGAgZnVuY3Rpb24uXG4gKlxuICogQHByaXZhdGVcbiAqIEBwYXJhbSB7Ym9vbGVhbn0gW2Zyb21SaWdodF0gU3BlY2lmeSBpdGVyYXRpbmcgZnJvbSByaWdodCB0byBsZWZ0LlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgcmFuZ2UgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIGNyZWF0ZVJhbmdlKGZyb21SaWdodCkge1xuICByZXR1cm4gZnVuY3Rpb24oc3RhcnQsIGVuZCwgc3RlcCkge1xuICAgIGlmIChzdGVwICYmIHR5cGVvZiBzdGVwICE9ICdudW1iZXInICYmIGlzSXRlcmF0ZWVDYWxsKHN0YXJ0LCBlbmQsIHN0ZXApKSB7XG4gICAgICBlbmQgPSBzdGVwID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICAvLyBFbnN1cmUgdGhlIHNpZ24gb2YgYC0wYCBpcyBwcmVzZXJ2ZWQuXG4gICAgc3RhcnQgPSB0b0Zpbml0ZShzdGFydCk7XG4gICAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBlbmQgPSBzdGFydDtcbiAgICAgIHN0YXJ0ID0gMDtcbiAgICB9IGVsc2Uge1xuICAgICAgZW5kID0gdG9GaW5pdGUoZW5kKTtcbiAgICB9XG4gICAgc3RlcCA9IHN0ZXAgPT09IHVuZGVmaW5lZCA/IChzdGFydCA8IGVuZCA/IDEgOiAtMSkgOiB0b0Zpbml0ZShzdGVwKTtcbiAgICByZXR1cm4gYmFzZVJhbmdlKHN0YXJ0LCBlbmQsIHN0ZXAsIGZyb21SaWdodCk7XG4gIH07XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGluZGV4LlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbbGVuZ3RoPU1BWF9TQUZFX0lOVEVHRVJdIFRoZSB1cHBlciBib3VuZHMgb2YgYSB2YWxpZCBpbmRleC5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgdmFsaWQgaW5kZXgsIGVsc2UgYGZhbHNlYC5cbiAqL1xuZnVuY3Rpb24gaXNJbmRleCh2YWx1ZSwgbGVuZ3RoKSB7XG4gIGxlbmd0aCA9IGxlbmd0aCA9PSBudWxsID8gTUFYX1NBRkVfSU5URUdFUiA6IGxlbmd0aDtcbiAgcmV0dXJuICEhbGVuZ3RoICYmXG4gICAgKHR5cGVvZiB2YWx1ZSA9PSAnbnVtYmVyJyB8fCByZUlzVWludC50ZXN0KHZhbHVlKSkgJiZcbiAgICAodmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8IGxlbmd0aCk7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBnaXZlbiBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIHZhbHVlIGFyZ3VtZW50LlxuICogQHBhcmFtIHsqfSBpbmRleCBUaGUgcG90ZW50aWFsIGl0ZXJhdGVlIGluZGV4IG9yIGtleSBhcmd1bWVudC5cbiAqIEBwYXJhbSB7Kn0gb2JqZWN0IFRoZSBwb3RlbnRpYWwgaXRlcmF0ZWUgb2JqZWN0IGFyZ3VtZW50LlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSBhcmd1bWVudHMgYXJlIGZyb20gYW4gaXRlcmF0ZWUgY2FsbCxcbiAqICBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSXRlcmF0ZWVDYWxsKHZhbHVlLCBpbmRleCwgb2JqZWN0KSB7XG4gIGlmICghaXNPYmplY3Qob2JqZWN0KSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgdHlwZSA9IHR5cGVvZiBpbmRleDtcbiAgaWYgKHR5cGUgPT0gJ251bWJlcidcbiAgICAgICAgPyAoaXNBcnJheUxpa2Uob2JqZWN0KSAmJiBpc0luZGV4KGluZGV4LCBvYmplY3QubGVuZ3RoKSlcbiAgICAgICAgOiAodHlwZSA9PSAnc3RyaW5nJyAmJiBpbmRleCBpbiBvYmplY3QpXG4gICAgICApIHtcbiAgICByZXR1cm4gZXEob2JqZWN0W2luZGV4XSwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuLyoqXG4gKiBQZXJmb3JtcyBhXG4gKiBbYFNhbWVWYWx1ZVplcm9gXShodHRwOi8vZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1zYW1ldmFsdWV6ZXJvKVxuICogY29tcGFyaXNvbiBiZXR3ZWVuIHR3byB2YWx1ZXMgdG8gZGV0ZXJtaW5lIGlmIHRoZXkgYXJlIGVxdWl2YWxlbnQuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNvbXBhcmUuXG4gKiBAcGFyYW0geyp9IG90aGVyIFRoZSBvdGhlciB2YWx1ZSB0byBjb21wYXJlLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIHRoZSB2YWx1ZXMgYXJlIGVxdWl2YWxlbnQsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogdmFyIG9iamVjdCA9IHsgJ2EnOiAxIH07XG4gKiB2YXIgb3RoZXIgPSB7ICdhJzogMSB9O1xuICpcbiAqIF8uZXEob2JqZWN0LCBvYmplY3QpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEob2JqZWN0LCBvdGhlcik7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoJ2EnLCAnYScpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uZXEoJ2EnLCBPYmplY3QoJ2EnKSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uZXEoTmFOLCBOYU4pO1xuICogLy8gPT4gdHJ1ZVxuICovXG5mdW5jdGlvbiBlcSh2YWx1ZSwgb3RoZXIpIHtcbiAgcmV0dXJuIHZhbHVlID09PSBvdGhlciB8fCAodmFsdWUgIT09IHZhbHVlICYmIG90aGVyICE9PSBvdGhlcik7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYXJyYXktbGlrZS4gQSB2YWx1ZSBpcyBjb25zaWRlcmVkIGFycmF5LWxpa2UgaWYgaXQnc1xuICogbm90IGEgZnVuY3Rpb24gYW5kIGhhcyBhIGB2YWx1ZS5sZW5ndGhgIHRoYXQncyBhbiBpbnRlZ2VyIGdyZWF0ZXIgdGhhbiBvclxuICogZXF1YWwgdG8gYDBgIGFuZCBsZXNzIHRoYW4gb3IgZXF1YWwgdG8gYE51bWJlci5NQVhfU0FGRV9JTlRFR0VSYC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhcnJheS1saWtlLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzQXJyYXlMaWtlKGRvY3VtZW50LmJvZHkuY2hpbGRyZW4pO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoJ2FiYycpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNBcnJheUxpa2UoXy5ub29wKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQXJyYXlMaWtlKHZhbHVlKSB7XG4gIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIGlzTGVuZ3RoKHZhbHVlLmxlbmd0aCkgJiYgIWlzRnVuY3Rpb24odmFsdWUpO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIGNsYXNzaWZpZWQgYXMgYSBgRnVuY3Rpb25gIG9iamVjdC5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDAuMS4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGZ1bmN0aW9uLCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIF8uaXNGdW5jdGlvbihfKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzRnVuY3Rpb24oL2FiYy8pO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWx1ZSkge1xuICAvLyBUaGUgdXNlIG9mIGBPYmplY3QjdG9TdHJpbmdgIGF2b2lkcyBpc3N1ZXMgd2l0aCB0aGUgYHR5cGVvZmAgb3BlcmF0b3JcbiAgLy8gaW4gU2FmYXJpIDgtOSB3aGljaCByZXR1cm5zICdvYmplY3QnIGZvciB0eXBlZCBhcnJheSBhbmQgb3RoZXIgY29uc3RydWN0b3JzLlxuICB2YXIgdGFnID0gaXNPYmplY3QodmFsdWUpID8gb2JqZWN0VG9TdHJpbmcuY2FsbCh2YWx1ZSkgOiAnJztcbiAgcmV0dXJuIHRhZyA9PSBmdW5jVGFnIHx8IHRhZyA9PSBnZW5UYWc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSB2YWxpZCBhcnJheS1saWtlIGxlbmd0aC5cbiAqXG4gKiAqKk5vdGU6KiogVGhpcyBtZXRob2QgaXMgbG9vc2VseSBiYXNlZCBvblxuICogW2BUb0xlbmd0aGBdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLXRvbGVuZ3RoKS5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIHZhbGlkIGxlbmd0aCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzTGVuZ3RoKDMpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNMZW5ndGgoTnVtYmVyLk1JTl9WQUxVRSk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNMZW5ndGgoSW5maW5pdHkpO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzTGVuZ3RoKCczJyk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0xlbmd0aCh2YWx1ZSkge1xuICByZXR1cm4gdHlwZW9mIHZhbHVlID09ICdudW1iZXInICYmXG4gICAgdmFsdWUgPiAtMSAmJiB2YWx1ZSAlIDEgPT0gMCAmJiB2YWx1ZSA8PSBNQVhfU0FGRV9JTlRFR0VSO1xufVxuXG4vKipcbiAqIENoZWNrcyBpZiBgdmFsdWVgIGlzIHRoZVxuICogW2xhbmd1YWdlIHR5cGVdKGh0dHA6Ly93d3cuZWNtYS1pbnRlcm5hdGlvbmFsLm9yZy9lY21hLTI2Mi83LjAvI3NlYy1lY21hc2NyaXB0LWxhbmd1YWdlLXR5cGVzKVxuICogb2YgYE9iamVjdGAuIChlLmcuIGFycmF5cywgZnVuY3Rpb25zLCBvYmplY3RzLCByZWdleGVzLCBgbmV3IE51bWJlcigwKWAsIGFuZCBgbmV3IFN0cmluZygnJylgKVxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGFuIG9iamVjdCwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0KHt9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0KFsxLCAyLCAzXSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdChfLm5vb3ApO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNPYmplY3QobnVsbCk7XG4gKiAvLyA9PiBmYWxzZVxuICovXG5mdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICB2YXIgdHlwZSA9IHR5cGVvZiB2YWx1ZTtcbiAgcmV0dXJuICEhdmFsdWUgJiYgKHR5cGUgPT0gJ29iamVjdCcgfHwgdHlwZSA9PSAnZnVuY3Rpb24nKTtcbn1cblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgY2xhc3NpZmllZCBhcyBhIGBTeW1ib2xgIHByaW1pdGl2ZSBvciBvYmplY3QuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjAuMFxuICogQGNhdGVnb3J5IExhbmdcbiAqIEBwYXJhbSB7Kn0gdmFsdWUgVGhlIHZhbHVlIHRvIGNoZWNrLlxuICogQHJldHVybnMge2Jvb2xlYW59IFJldHVybnMgYHRydWVgIGlmIGB2YWx1ZWAgaXMgYSBzeW1ib2wsIGVsc2UgYGZhbHNlYC5cbiAqIEBleGFtcGxlXG4gKlxuICogXy5pc1N5bWJvbChTeW1ib2wuaXRlcmF0b3IpO1xuICogLy8gPT4gdHJ1ZVxuICpcbiAqIF8uaXNTeW1ib2woJ2FiYycpO1xuICogLy8gPT4gZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTeW1ib2wodmFsdWUpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWx1ZSA9PSAnc3ltYm9sJyB8fFxuICAgIChpc09iamVjdExpa2UodmFsdWUpICYmIG9iamVjdFRvU3RyaW5nLmNhbGwodmFsdWUpID09IHN5bWJvbFRhZyk7XG59XG5cbi8qKlxuICogQ29udmVydHMgYHZhbHVlYCB0byBhIGZpbml0ZSBudW1iZXIuXG4gKlxuICogQHN0YXRpY1xuICogQG1lbWJlck9mIF9cbiAqIEBzaW5jZSA0LjEyLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjb252ZXJ0LlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgY29udmVydGVkIG51bWJlci5cbiAqIEBleGFtcGxlXG4gKlxuICogXy50b0Zpbml0ZSgzLjIpO1xuICogLy8gPT4gMy4yXG4gKlxuICogXy50b0Zpbml0ZShOdW1iZXIuTUlOX1ZBTFVFKTtcbiAqIC8vID0+IDVlLTMyNFxuICpcbiAqIF8udG9GaW5pdGUoSW5maW5pdHkpO1xuICogLy8gPT4gMS43OTc2OTMxMzQ4NjIzMTU3ZSszMDhcbiAqXG4gKiBfLnRvRmluaXRlKCczLjInKTtcbiAqIC8vID0+IDMuMlxuICovXG5mdW5jdGlvbiB0b0Zpbml0ZSh2YWx1ZSkge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIHZhbHVlID09PSAwID8gdmFsdWUgOiAwO1xuICB9XG4gIHZhbHVlID0gdG9OdW1iZXIodmFsdWUpO1xuICBpZiAodmFsdWUgPT09IElORklOSVRZIHx8IHZhbHVlID09PSAtSU5GSU5JVFkpIHtcbiAgICB2YXIgc2lnbiA9ICh2YWx1ZSA8IDAgPyAtMSA6IDEpO1xuICAgIHJldHVybiBzaWduICogTUFYX0lOVEVHRVI7XG4gIH1cbiAgcmV0dXJuIHZhbHVlID09PSB2YWx1ZSA/IHZhbHVlIDogMDtcbn1cblxuLyoqXG4gKiBDb252ZXJ0cyBgdmFsdWVgIHRvIGEgbnVtYmVyLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgNC4wLjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBwcm9jZXNzLlxuICogQHJldHVybnMge251bWJlcn0gUmV0dXJucyB0aGUgbnVtYmVyLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLnRvTnVtYmVyKDMuMik7XG4gKiAvLyA9PiAzLjJcbiAqXG4gKiBfLnRvTnVtYmVyKE51bWJlci5NSU5fVkFMVUUpO1xuICogLy8gPT4gNWUtMzI0XG4gKlxuICogXy50b051bWJlcihJbmZpbml0eSk7XG4gKiAvLyA9PiBJbmZpbml0eVxuICpcbiAqIF8udG9OdW1iZXIoJzMuMicpO1xuICogLy8gPT4gMy4yXG4gKi9cbmZ1bmN0aW9uIHRvTnVtYmVyKHZhbHVlKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT0gJ251bWJlcicpIHtcbiAgICByZXR1cm4gdmFsdWU7XG4gIH1cbiAgaWYgKGlzU3ltYm9sKHZhbHVlKSkge1xuICAgIHJldHVybiBOQU47XG4gIH1cbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIHZhciBvdGhlciA9IHR5cGVvZiB2YWx1ZS52YWx1ZU9mID09ICdmdW5jdGlvbicgPyB2YWx1ZS52YWx1ZU9mKCkgOiB2YWx1ZTtcbiAgICB2YWx1ZSA9IGlzT2JqZWN0KG90aGVyKSA/IChvdGhlciArICcnKSA6IG90aGVyO1xuICB9XG4gIGlmICh0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUgPT09IDAgPyB2YWx1ZSA6ICt2YWx1ZTtcbiAgfVxuICB2YWx1ZSA9IHZhbHVlLnJlcGxhY2UocmVUcmltLCAnJyk7XG4gIHZhciBpc0JpbmFyeSA9IHJlSXNCaW5hcnkudGVzdCh2YWx1ZSk7XG4gIHJldHVybiAoaXNCaW5hcnkgfHwgcmVJc09jdGFsLnRlc3QodmFsdWUpKVxuICAgID8gZnJlZVBhcnNlSW50KHZhbHVlLnNsaWNlKDIpLCBpc0JpbmFyeSA/IDIgOiA4KVxuICAgIDogKHJlSXNCYWRIZXgudGVzdCh2YWx1ZSkgPyBOQU4gOiArdmFsdWUpO1xufVxuXG4vKipcbiAqIENyZWF0ZXMgYW4gYXJyYXkgb2YgbnVtYmVycyAocG9zaXRpdmUgYW5kL29yIG5lZ2F0aXZlKSBwcm9ncmVzc2luZyBmcm9tXG4gKiBgc3RhcnRgIHVwIHRvLCBidXQgbm90IGluY2x1ZGluZywgYGVuZGAuIEEgc3RlcCBvZiBgLTFgIGlzIHVzZWQgaWYgYSBuZWdhdGl2ZVxuICogYHN0YXJ0YCBpcyBzcGVjaWZpZWQgd2l0aG91dCBhbiBgZW5kYCBvciBgc3RlcGAuIElmIGBlbmRgIGlzIG5vdCBzcGVjaWZpZWQsXG4gKiBpdCdzIHNldCB0byBgc3RhcnRgIHdpdGggYHN0YXJ0YCB0aGVuIHNldCB0byBgMGAuXG4gKlxuICogKipOb3RlOioqIEphdmFTY3JpcHQgZm9sbG93cyB0aGUgSUVFRS03NTQgc3RhbmRhcmQgZm9yIHJlc29sdmluZ1xuICogZmxvYXRpbmctcG9pbnQgdmFsdWVzIHdoaWNoIGNhbiBwcm9kdWNlIHVuZXhwZWN0ZWQgcmVzdWx0cy5cbiAqXG4gKiBAc3RhdGljXG4gKiBAc2luY2UgMC4xLjBcbiAqIEBtZW1iZXJPZiBfXG4gKiBAY2F0ZWdvcnkgVXRpbFxuICogQHBhcmFtIHtudW1iZXJ9IFtzdGFydD0wXSBUaGUgc3RhcnQgb2YgdGhlIHJhbmdlLlxuICogQHBhcmFtIHtudW1iZXJ9IGVuZCBUaGUgZW5kIG9mIHRoZSByYW5nZS5cbiAqIEBwYXJhbSB7bnVtYmVyfSBbc3RlcD0xXSBUaGUgdmFsdWUgdG8gaW5jcmVtZW50IG9yIGRlY3JlbWVudCBieS5cbiAqIEByZXR1cm5zIHtBcnJheX0gUmV0dXJucyB0aGUgcmFuZ2Ugb2YgbnVtYmVycy5cbiAqIEBzZWUgXy5pblJhbmdlLCBfLnJhbmdlUmlnaHRcbiAqIEBleGFtcGxlXG4gKlxuICogXy5yYW5nZSg0KTtcbiAqIC8vID0+IFswLCAxLCAyLCAzXVxuICpcbiAqIF8ucmFuZ2UoLTQpO1xuICogLy8gPT4gWzAsIC0xLCAtMiwgLTNdXG4gKlxuICogXy5yYW5nZSgxLCA1KTtcbiAqIC8vID0+IFsxLCAyLCAzLCA0XVxuICpcbiAqIF8ucmFuZ2UoMCwgMjAsIDUpO1xuICogLy8gPT4gWzAsIDUsIDEwLCAxNV1cbiAqXG4gKiBfLnJhbmdlKDAsIC00LCAtMSk7XG4gKiAvLyA9PiBbMCwgLTEsIC0yLCAtM11cbiAqXG4gKiBfLnJhbmdlKDEsIDQsIDApO1xuICogLy8gPT4gWzEsIDEsIDFdXG4gKlxuICogXy5yYW5nZSgwKTtcbiAqIC8vID0+IFtdXG4gKi9cbnZhciByYW5nZSA9IGNyZWF0ZVJhbmdlKCk7XG5cbm1vZHVsZS5leHBvcnRzID0gcmFuZ2U7XG4iXX0=
