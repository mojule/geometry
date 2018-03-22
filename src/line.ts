import { Point, point, clonePoint } from './point'
import { is, splitOnCommaAndSpace, StringOrNumber } from './util'

export type Line = [ Point, Point ]

export const LINE_START = 0
export const LINE_END = 1

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

export const assertLine = ( l: Line ) => {
  if( !is.line( l ) ) throw Error( 'Expected a Line' )
}

export const line = ( x1: StringOrNumber = 0, y1: StringOrNumber = 0, x2: StringOrNumber = 0, y2: StringOrNumber = 0 ): Line =>
  [ point( x1, y1 ), point( x2, y2 ) ]

export const lineFromPoints = ( start: Point, end: Point ): Line =>
  [ clonePoint( start ), clonePoint( end ) ]

export const emptyLine = (): Line => [ point(), point() ]

export const cloneLine = ( l: Line ) => <Line>l.map( clonePoint )

export const lineFromArray = ( arr: StringOrNumber[] ) =>
  line( ...arr )

export const lineFromString = ( str: string ) =>
  lineFromArray( splitOnCommaAndSpace( str ) )
