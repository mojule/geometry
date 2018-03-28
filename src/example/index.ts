import * as geometry from '..'

import {
  documentFragment, section, h1, h2, code, div, label, input
} from './h'

import { SvgElelement, svgSetAttributes, Arrow, Line, Point, Rect, Arc } from './svg'

const { line, point, size, util } = geometry

const {
  intersection, lineVector, midLine, length, unitVector, angle,
  bresenhamLine
} = line

const { translate, scale, rotate, vector } = point

const { rectSize, scaleSizeInSize } = size

const {
  approximatelyEqual, radiansToDegrees, degreesToRadians, alignCenter
} = util

const exampleSize = {
  width: 400,
  height: 400
}

const exampleCenter = {
  x: exampleSize.width / 2,
  y: exampleSize.height / 2
}

const cellSize = {
  width: 40,
  height: 40
}

const rows = exampleSize.width / cellSize.width
const columns = exampleSize.height / cellSize.height

const toCellUnit = ( value: number ) => value / cellSize.width

const Svg = ( ...childNodes: Node[] ) => {
  const svg = SvgElelement( 'svg', {
    viewBox: `0 0 ${ exampleSize.width + 2 } ${ exampleSize.height + 2 }`,
    width: exampleSize.width + 2,
    height: exampleSize.height + 2
  })

  const defs = SvgElelement( 'defs' )
  const vectorArrow = Arrow({ id: 'arrow', fill: 'red' })
  const lineArrow = Arrow({ id: 'lineArrow', fill: '#000' })
  const angleArrow = Arrow({ id: 'angleArrow', fill: '#aaa' })

  defs.appendChild( vectorArrow )
  defs.appendChild( lineArrow )
  defs.appendChild( angleArrow )
  svg.appendChild( defs )

  for( let row = 0; row <= rows; row++ ){
    const line = Line({
      x1: 0,
      y1: cellSize.height * row,
      x2: exampleSize.width,
      y2: cellSize.height * row,
      stroke: '#ccc',
      'stroke-width': 1,
      'marker-end': undefined
    })
    svg.appendChild( line )
  }

  for( let column = 0; column <= columns; column++ ){
    const line = Line({
      x1: cellSize.width * column,
      y1: 0,
      x2: cellSize.width * column,
      y2: exampleSize.height,
      stroke: '#ccc',
      'stroke-width': 1,
      'marker-end': undefined
    })

    svg.appendChild( line )
  }

  childNodes.forEach( node => svg.appendChild( node ) )

  return <SVGElement>svg
}

const ExampleSection = ( name: string, ...childNodes: Node[] ) => {
  return documentFragment(
    section(
      h1( name ),
      ...childNodes
    )
  )
}

const Intersection = () => {
  let x1, y1, x2, y2, x3, y3, x4, y4, p

  while( !p ){
    x1 = Math.floor( Math.random() * exampleCenter.x )
    y1 = Math.floor( Math.random() * exampleCenter.y )
    x2 = Math.floor( Math.random() * exampleCenter.x + exampleCenter.x )
    y2 = Math.floor( Math.random() * exampleCenter.y + exampleCenter.y )
    x3 = Math.floor( Math.random() * exampleCenter.x )
    y3 = Math.floor( Math.random() * exampleCenter.y + exampleCenter.y )
    x4 = Math.floor( Math.random() * exampleCenter.x + exampleCenter.x )
    y4 = Math.floor( Math.random() * exampleCenter.y )

    p = intersection( x1, y1, x2, y2, x3, y3, x4, y4 )
  }

  const [ x, y ] = p

  let fx1, fy1, fx2, fy2, fx3, fy3, fx4, fy4
  let fp: [ number, number ] | undefined = [ 0, 0 ]

  while( fp ){
    fx1 = Math.floor( Math.random() * exampleSize.width )
    fy1 = Math.floor( Math.random() * exampleSize.height )
    fx2 = Math.floor( Math.random() * exampleSize.width )
    fy2 = Math.floor( Math.random() * exampleSize.height )
    fx3 = Math.floor( Math.random() * exampleSize.width )
    fy3 = Math.floor( Math.random() * exampleSize.height )
    fx4 = Math.floor( Math.random() * exampleSize.width )
    fy4 = Math.floor( Math.random() * exampleSize.height )

    fp = intersection( fx1, fy1, fx2, fy2, fx3, fy3, fx4, fy4 )
  }

  return documentFragment(
    h2( 'intersection( x1, y1, x2, y2, x3, y3, x4, y4 )' ),
    Svg(
      Line({ x1, y1, x2, y2 }),
      Line({ x1: x3, y1: y3, x2: x4, y2: y4 }),
      Point({ cx: x1, cy: y1 }),
      Point({ cx: x3, cy: y3 }),
      Point({ cx: x, cy: y, fill: 'red' })
    ),
    div(
      code(
        `intersection( ${ [ x1, y1, x2, y2, x3, y3, x4, y4 ].map( toCellUnit ).join( ', ' ) } )`,
      )
    ),
    div(
      code(
        `[ ${ toCellUnit( x ) }, ${ toCellUnit( y ) } ]`
      )
    ),
    Svg(
      Line({ x1: fx1, y1: fy1, x2: fx2, y2: fy2 }),
      Line({ x1: fx3, y1: fy3, x2: fx4, y2: fy4 }),
      Point({ cx: fx1, cy: fy1 }),
      Point({ cx: fx3, cy: fy3 })
    ),
    div(
      code(
        `intersection( ${ [ fx1, fy1, fx2, fy2, fx3, fy3, fx4, fy4 ].map( toCellUnit ).join( ', ' ) } )`,
      )
    ),
    div(
      code(
        `undefined`
      )
    )
  )
}

const LineVector = () => {
  const x1 = Math.floor( Math.random() * exampleCenter.x )
  const y1 = Math.floor( Math.random() * exampleCenter.y )
  const x2 = Math.floor( Math.random() * exampleCenter.x + exampleCenter.x )
  const y2 = Math.floor( Math.random() * exampleCenter.y + exampleCenter.y )

  const p = lineVector( x1, y1, x2, y2 )
  const [ x, y ] = p

  return documentFragment(
    h2( 'lineVector( x1, y1, x2, y2 )' ),
    Svg(
      Point({ cx: x1, cy: y1 }),
      Line({ x1, y1, x2, y2 }),
      Point({ cx: 0, cy: 0, fill: 'red' }),
      Line({ x1: 0, y1: 0, x2: x, y2: y, stroke: 'red', 'marker-end': 'url(#arrow)' })
    ),
    div(
      code(
        `lineVector( ${ [ x1, y1, x2, y2 ].map( toCellUnit ).join( ', ' ) } )`,
      )
    ),
    div(
      code(
        `[ ${ toCellUnit( x ) }, ${ toCellUnit( y ) } ]`
      )
    )
  )
}

const MidLine = () => {
  const x1 = Math.floor( Math.random() * exampleSize.width )
  const y1 = Math.floor( Math.random() * exampleSize.height )
  const x2 = Math.floor( Math.random() * exampleSize.width )
  const y2 = Math.floor( Math.random() * exampleSize.height )

  const p = midLine( x1, y1, x2, y2 )
  const [ x, y ] = p

  return documentFragment(
    h2( 'midLine( x1, y1, x2, y2 )' ),
    Svg(
      Point({ cx: x1, cy: y1 }),
      Line({ x1, y1, x2, y2 }),
      Point({ cx: x, cy: y, fill: 'red' })
    ),
    div(
      code(
        `midLine( ${ [ x1, y1, x2, y2 ].map( toCellUnit ).join( ', ' ) } )`,
      )
    ),
    div(
      code(
        `[ ${ toCellUnit( x ) }, ${ toCellUnit( y ) } ]`
      )
    )
  )
}

const Length = () => {
  const x1 = Math.floor( Math.random() * exampleSize.width )
  const y1 = Math.floor( Math.random() * exampleSize.height )
  const x2 = Math.floor( Math.random() * exampleSize.width )
  const y2 = Math.floor( Math.random() * exampleSize.height )

  const l = length( x1, y1, x2, y2 )

  return documentFragment(
    h2( 'length( x1, y1, x2, y2 )' ),
    Svg(
      Point({ cx: x1, cy: y1 }),
      Line({ x1, y1, x2, y2 })
    ),
    div(
      code(
        `length( ${ [ x1, y1, x2, y2 ].map( toCellUnit ).join( ', ' ) } )`,
      )
    ),
    div(
      code(
        String( toCellUnit( l ) )
      )
    )
  )
}

const UnitVector = () => {
  const x1 = Math.floor( Math.random() * exampleCenter.x )
  const y1 = Math.floor( Math.random() * exampleCenter.y )
  const x2 = Math.floor( Math.random() * exampleCenter.x + exampleCenter.x )
  const y2 = Math.floor( Math.random() * exampleCenter.y + exampleCenter.y )

  const p = unitVector( x1, y1, x2, y2 )
  const [ x, y ] = p

  const s = scale( x, y, cellSize.width )
  const [ sX, sY ] = s


  return documentFragment(
    h2( 'unitVector( x1, y1, x2, y2 )' ),
    Svg(
      Point({ cx: x1, cy: y1 }),
      Line({ x1, y1, x2, y2 }),
      Point({ cx: 0, cy: 0, fill: 'red' }),
      Line({ x1: 0, y1: 0, x2: sX , y2: sY, stroke: 'red', 'marker-end': 'url(#arrow)' })
    ),
    div(
      code(
        `unitVector( ${ [ x1, y1, x2, y2 ].map( toCellUnit ).join( ', ' ) } )`,
      )
    ),
    div(
      code(
        `[ ${ x }, ${ y } ]`
      )
    )
  )
}

const Angle = () => {
  const x1 = Math.floor( Math.random() * exampleSize.width )
  const y1 = Math.floor( Math.random() * exampleSize.height )
  const x2 = Math.floor( Math.random() * exampleSize.width )
  const y2 = Math.floor( Math.random() * exampleSize.height )

  const a = angle( x1, y1, x2, y2 )

  return documentFragment(
    h2( 'angle( x1, y1, x2, y2 )' ),
    Svg(
      Point({ cx: x1, cy: y1 }),
      Line({ x1, y1, x2, y2 })
    ),
    div(
      code(
        `angle( ${ [ x1, y1, x2, y2 ].map( toCellUnit ).join( ', ' ) } )`,
      )
    ),
    div(
      code(
        String( a )
      )
    )
  )
}

const BresenhamLine = () => {
  const x1 = Math.floor( Math.random() * 10 )
  const y1 = Math.floor( Math.random() * 10 )
  const x2 = Math.floor( Math.random() * 10 )
  const y2 = Math.floor( Math.random() * 10 )

  const l = bresenhamLine( x1, y1, x2, y2 )
  const len = l.length / 2
  const rects: Node[] = []

  for( let i = 0; i < len; i++ ){
    const x = l[ i * 2 ]
    const y = l[ i * 2 + 1 ]

    const rect = Rect({
      x: x * cellSize.width,
      y: y * cellSize.height,
      width: cellSize.width,
      height: cellSize.height
    })

    rects.push( rect )
  }

  const lx1 = ( x1 + 1 ) * cellSize.width - ( cellSize.width / 2 )
  const ly1 = ( y1 + 1 ) * cellSize.height - ( cellSize.height / 2 )
  const lx2 = ( x2 + 1 ) * cellSize.width - ( cellSize.width / 2 )
  const ly2 = ( y2 + 1 ) * cellSize.height - ( cellSize.height / 2 )

  return documentFragment(
    h2( 'bresenhamLine( x1, y1, x2, y2 )' ),
    Svg(
      ...rects,
      Point({ cx: lx1, cy: ly1 }),
      Line({ x1: lx1, y1: ly1, x2: lx2, y2: ly2 })
    ),
    div(
      code(
        `bresenhamLine( ${ [ x1, y1, x2, y2 ].join( ', ' ) } )`,
      )
    ),
    div(
      code(
        `[ ${ l.join( ', ' ) } ]`
      )
    )
  )
}

const Translate = () => {
  const x1 = Math.floor( Math.random() * exampleCenter.x )
  const y1 = Math.floor( Math.random() * exampleCenter.y )
  const t = Math.floor( Math.random() * exampleCenter.x )
  const x2 = Math.floor( Math.random() * exampleCenter.x )
  const y2 = Math.floor( Math.random() * exampleCenter.y )

  const [ tx1, ty1 ] = translate( x1, y1, t )
  const [ tx2, ty2 ] = translate( x1, y1, x2, y2 )

  return documentFragment(
    h2( 'translate( x, y, t )' ),
    Svg(
      Point({ cx: x1, cy: y1 }),
      Point({ cx: tx1, cy: ty1, fill: 'red' })
    ),
    div(
      code(
        `translate( ${ [ x1, y1, t ].map( toCellUnit ).join( ', ' ) } )`,
      )
    ),
    div(
      code(
        `[ ${ [ tx1, ty1 ].map( toCellUnit ).join( ', ' ) } ]`
      )
    ),
    h2( 'translate( x1, y1, x2, y2 )' ),
    Svg(
      Point({ cx: x1, cy: y1 }),
      Point({ cx: tx2, cy: ty2, fill: 'red' })
    ),
    div(
      code(
        `translate( ${ [ x1, y1, x2, y2 ].map( toCellUnit ).join( ', ' ) } )`,
      )
    ),
    div(
      code(
        `[ ${ [ tx2, ty2 ].map( toCellUnit ).join( ', ' ) } ]`
      )
    )
  )
}

const Scale = () => {
  const x1 = Math.floor( Math.random() * exampleCenter.x )
  const y1 = Math.floor( Math.random() * exampleCenter.y )
  const s = Math.random() * 2
  const x2 = Math.random() * 2
  const y2 = Math.random() * 2

  const [ sx1, sy1 ] = scale( x1, y1, s )
  const [ sx2, sy2 ] = scale( x1, y1, x2, y2 )

  return documentFragment(
    h2( 'scale( x, y, t )' ),
    Svg(
      Point({ cx: x1, cy: y1 }),
      Point({ cx: sx1, cy: sy1, fill: 'red' })
    ),
    div(
      code(
        `scale( ${ [ x1, y1 ].map( toCellUnit ).join( ', ' ) }, ${ s } )`
      )
    ),
    div(
      code(
        `[ ${ [ sx1, sy1 ].map( toCellUnit ).join( ', ' ) } ]`
      )
    ),
    h2( 'scale( x1, y1, x2, y2 )' ),
    Svg(
      Point({ cx: x1, cy: y1 }),
      Point({ cx: sx2, cy: sy2, fill: 'red' })
    ),
    div(
      code(
        `scale( ${ [ x1, y1 ].map( toCellUnit ).join( ', ' ) }, ${ [ x2, y2 ].join( ', ' ) } )`
      )
    ),
    div(
      code(
        `[ ${ [ sx2, sy2 ].map( toCellUnit ).join( ', ' ) } ]`
      )
    )
  )
}

const Rotate = () => {
  let x1, y1, d1
  let [ rx1, ry1 ] = [ -1, -1 ]

  while( rx1 < 0 || rx1 > exampleSize.width || ry1 < 0 || ry1 > exampleSize.height ){
    x1 = Math.floor( Math.random() * exampleSize.width )
    y1 = Math.floor( Math.random() * exampleSize.height )
    d1 = Math.random() * 360 - 180
    const r = rotate( x1, y1, d1 )
    rx1 = r[ 0 ]
    ry1 = r[ 1 ]
  }

  let x2, y2, d2, oX, oY
  let [ rx2, ry2 ] = [ -1, -1 ]

  while( rx2 < 0 || rx2 > exampleSize.width || ry2 < 0 || ry2 > exampleSize.height ){
    x2 = Math.floor( Math.random() * exampleSize.width )
    y2 = Math.floor( Math.random() * exampleSize.height )
    d2 = Math.random() * 360 - 180
    oX = Math.floor( Math.random() * exampleSize.width )
    oY = Math.floor( Math.random() * exampleSize.height )
    const r = rotate( x2, y2, d2, oX, oY )
    rx2 = r[ 0 ]
    ry2 = r[ 1 ]
  }

  return documentFragment(
    h2( 'rotate( x, y, degrees )' ),
    Svg(
      Point({ cx: 0, cy: 0, fill: '#aaa' }),
      Line({ x1: 0, y1: 0, x2: x1, y2: y1, stroke: '#aaa', 'marker-end': 'url(#angleArrow)' } ),

      Point({ cx: x1, cy: y1 }),
      Line({ x1: 0, y1: 0, x2: rx1, y2: ry1, stroke: '#aaa', 'marker-end': 'url(#angleArrow)' } ),

      Point({ cx: rx1, cy: ry1, fill: 'red' }),
    ),
    div(
      code(
        `rotate( ${ [ x1, y1 ].map( toCellUnit ).join( ', ' ) }, ${ d1 } )`
      )
    ),
    div(
      code(
        `[ ${ [ rx1, ry1 ].map( toCellUnit ).join( ', ' ) } ]`
      )
    ),
    h2( 'rotate( x, y, degrees, oX, oY )' ),
    Svg(
      Point({ cx: oX, cy: oY, fill: '#aaa' }),
      Line({ x1: oX, y1: oY, x2, y2, stroke: '#aaa', 'marker-end': 'url(#angleArrow)' } ),

      Point({ cx: x2, cy: y2 }),
      Line({ x1: oX, y1: oY, x2: rx2, y2: ry2, stroke: '#aaa', 'marker-end': 'url(#angleArrow)' } ),

      Point({ cx: rx2, cy: ry2, fill: 'red' })
    ),
    div(
      code(
        `rotate( ${ [ x2, y2 ].map( toCellUnit ).join( ', ' ) }, ${ d2 }, ${ [ oX, oY ].map( toCellUnit ).join( ', ' ) } )`
      )
    ),
    div(
      code(
        `[ ${ [ rx2, ry2 ].map( toCellUnit ).join( ', ' ) } ]`
      )
    )
  )
}

const ArcTest = () => {
  const polarToCartesian = ( cx, cy, r, degrees ) => {
    const radians = degreesToRadians( degrees )
    const x = cx + ( r * Math.cos( radians ) )
    const y = cy + ( r * Math.sin( radians ) )

    return [ x, y ]
  }

  const arcPath = ({ cx, cy, r, start, end }) => {
    const [ x1, y1 ] = polarToCartesian( cx, cy, r, end )
    const [ x2, y2 ] = polarToCartesian( cx, cy, r, start )
    const largeArcFlag = end - start <= 180 ? 0 : 1

    const d = [ 'M', x1, y1, 'A', r, r, 0, largeArcFlag, 0, x2, y2 ].join( ' ' )

    return d
  }

  const options = {
    cx: exampleCenter.x,
    cy: exampleCenter.y,
    r: exampleCenter.x / 2,
    start: 0,
    end: 90
  }

  const arc = SvgElelement( 'path', {
    fill: 'none',
    'stroke-width': 2,
    stroke: '#000',
    d: arcPath( options )
  })

  const update = () => {
    (<any>arc).setAttributeNS( null, 'd', arcPath( options ) )
  }

  const inputs = Object.keys( options ).map( key => {
    const editor = input(
      {
        type: 'number',
        value: String( options[ key ] )
      }
    )

    editor.addEventListener( 'change', () => {
      options[ key ] = editor.valueAsNumber
      update()
    })

    return div( label( editor, key ) )
  })

  return documentFragment(
    h2( 'arc test' ),
    Svg( arc ),
    ...inputs
  )
}

document.addEventListener( 'DOMContentLoaded', () => {
  const lineExamples = ExampleSection(
    'line',
    Intersection(),
    LineVector(),
    MidLine(),
    Length(),
    UnitVector(),
    Angle(),
    BresenhamLine()
  )

  const pointExamples = ExampleSection(
    'point',
    Translate(),
    Scale(),
    Rotate()
  )

  const sizeExamples = ExampleSection( 'size' )
  const utilsExamples = ExampleSection( 'utils' )

  const examples = documentFragment(
    ArcTest(),
    lineExamples, pointExamples, sizeExamples, utilsExamples
  )

  document.body.appendChild( examples )
})
