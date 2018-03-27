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
//# sourceMappingURL=index.js.map