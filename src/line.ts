import { Point, point, clonePoint, pointFromSize } from './point'
import { is, splitOnCommaAndSpace, StringOrNumber } from './util'
import { Size } from './size'
import { Rect } from './rect'

export interface Line {
  start: Point
  end: Point
}

export const intersection = ( l1: Line, l2: Line ) : Point | undefined => {
  const x1 = l1.start.x
  const y1 = l1.start.y
  const x2 = l1.end.x
  const y2 = l1.end.y
  const x3 = l2.start.x
  const y3 = l2.start.y
  const x4 = l2.end.x
  const y4 = l2.end.y

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

export const line = ( start: Point, end: Point ): Line =>
  ({ start, end })

export const lineFromValues = ( x1: StringOrNumber = 0, y1: StringOrNumber = 0, x2: StringOrNumber = 0, y2: StringOrNumber = 0 ): Line =>
  ({
    start: point( x1, y1 ),
    end: point( x2, y2 )
  })

export const lineFromPoint = ( p: Point ): Line => line( point(), p )

export const emptyLine = (): Line => line( point(), point() )

export const cloneLine = ( l: Line ) => ({
  start: clonePoint( l.start ),
  end: clonePoint( l.end )
})

export const lineFromArray = ( arr: StringOrNumber[] ) =>
  lineFromValues( ...arr )

export const lineFromString = ( str: string ) =>
  lineFromArray( splitOnCommaAndSpace( str ) )

export const lineFromSize = ( s: Size ): Line => line( point(), pointFromSize( s ) )

export const lineFromRect = ( r: Rect ) : Line =>
  line( clonePoint( r ), point( r.width + r.x, r.height + r.y ) )
