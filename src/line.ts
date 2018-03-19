import { Point, createPoint } from './point'

export type Line = [ Point, Point ]

export const intersection = ( line1: Line, line2: Line ) : Point | undefined => {
  const [ p1, p2 ] = line1
  const [ p3, p4 ] = line2
  const x1 = p1.x
  const y1 = p1.y
  const x2 = p2.x
  const y2 = p2.y
  const x3 = p3.x
  const y3 = p3.y
  const x4 = p4.x
  const y4 = p4.y

  const denom = ( y4 - y3 ) * ( x2 - x1 ) - ( x4 - x3 ) * ( y2 - y1 )

  if( !denom ) return

  const ua = ( ( x4 - x3 ) * ( y1 - y3 ) - ( y4 - y3 ) * ( x1 - x3 ) ) / denom
  const ub = ( ( x2 - x1 ) * ( y1 - y3 ) - ( y2 - y1 ) * ( x1 - x3 ) ) / denom

  return {
    x: x1 + ua * ( x2 - x1 ),
    y: y1 + ua * ( y2 - y1 )
  }
}

// four numbers, four strings, two points
export type LineArg = Point | number | string | Point[] | number[] | string[]


export const createLine = ( ...args: LineArg[] ) : Line => {
  if( args.length === 0 ){
    return [ createPoint(), createPoint() ]
  }

  if( args.length === 1 )
}