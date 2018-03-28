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
//# sourceMappingURL=index.js.map