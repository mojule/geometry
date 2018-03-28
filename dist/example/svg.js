"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const arcDefaults = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
    r: 0,
    sweep: 0,
    'stroke-width': 2,
    stroke: '#222',
    fill: 'none'
};
exports.Arc = (options = {}) => {
    options = Object.assign({}, arcDefaults, options);
    const { x1, y1, x2, y2, r, sweep } = options;
    const d = [
        'M', x1, y1,
        'A', r, r, 0, sweep, 0, x2, y2
    ].join(' ');
    const attributes = {
        stroke: options.stroke,
        'stroke-width': options['stroke-width'],
        fill: options.fill,
        d
    };
    return exports.SvgElelement('path', attributes);
};
//# sourceMappingURL=svg.js.map