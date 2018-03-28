import { degreesToRadians } from '../util'

export const svgSetAttributes = ( el: Element, attributes: any ) => {
  Object.keys( attributes ).forEach( name => {
    (<any>el).setAttributeNS( null, name, attributes[ name ] )
  })

  return el
}

export const SvgElelement = ( name: string, attributes: any = {} ) => {
  const el: any = document.createElementNS( 'http://www.w3.org/2000/svg', name )

  return svgSetAttributes( el, attributes )
}

const lineDefaults = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0,
  stroke: '#222',
  'stroke-width': 2,
  'marker-end': 'url(#lineArrow)'
}

export const Line = ( attributes: any = {} ) => {
  attributes = Object.assign( {}, lineDefaults, attributes )

  let { x1, y1, x2, y2 } = attributes

  x1 += 0.5
  y1 += 0.5
  x2 += 0.5
  y2 += 0.5

  Object.assign( attributes, { x1, y1, x2, y2 } )

  return SvgElelement( 'line', attributes )
}

const pointDefaults = {
  cx: 0,
  cy: 0,
  r: 4,
  fill: '#222'
}

export const Point = ( attributes: any = {} ) => {
  attributes = Object.assign( {}, pointDefaults, attributes )

  let { cx, cy } = attributes

  cx += 0.5
  cy += 0.5

  Object.assign( attributes, { cx, cy } )

  return SvgElelement( 'circle', attributes )
}

const arrowDefaults = { id: 'arrow', fill: 'red' }

export const Arrow = ( attributes: any = {} ) => {
  attributes = Object.assign( {}, pointDefaults, attributes )

  const { id, fill } = attributes

  const marker = SvgElelement( 'marker', {
    id,
    markerWidth: 10,
    markerHeight: 10,
    refX: 9,
    refY: 3,
    orient: 'auto',
    markerUnits: 'strokeWidth'
  })
  const path = SvgElelement( 'path', {
    d: 'M0,0 L0,6 L9,3 z',
    fill
  })

  marker.appendChild( path )

  return marker
}

const rectDefaults = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
  'stroke-width': 1,
  stroke: '#222',
  fill: '#ccc'
}

export const Rect = ( attributes: any = {} ) => {
  attributes = Object.assign( {}, rectDefaults, attributes )

  let { x, y } = attributes

  x += 0.5
  y += 0.5

  Object.assign( attributes, { x, y } )

  return SvgElelement( 'rect', attributes )
}

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
}

export const Arc = ( options: any = {} ) => {
  options = Object.assign( {}, arcDefaults, options )

  const { x1, y1, x2, y2, r, sweep } = options

  const d = [
    'M', x1, y1,
    'A', r, r, 0, sweep, 0, x2, y2
  ].join( ' ' )

  const attributes = {
    stroke: options.stroke,
    'stroke-width': options[ 'stroke-width' ],
    fill: options.fill,
    d
  }

  return SvgElelement( 'path', attributes )
}
