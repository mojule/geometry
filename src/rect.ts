import { Point, LoosePoint, translatePoint, clonePoint, point } from './point'
import { Size, LooseSize, sizeFromLine, sizeCenter } from './size'
import { is, StringOrNumber, splitOnCommaAndSpace } from './util'
import { Line } from './line'
import { Corners } from './corner'
import { Edges } from './edge'

export interface Rect extends Point, Size {}

export interface RectEdges extends Edges {
  top: number
  right: number
  bottom: number
  left: number
}

export interface RectCoordinates {
  x1: number
  y1: number
  x2: number
  y2: number
}

export interface RectCorners extends Corners {
  topLeft: Point
  bottomRight: Point
}

export interface RectAllCorners extends RectCorners {
  topRight: Point
  bottomRight: Point
}

export type RectPoints = [ Point, Point ]

export const RECT_TOP_LEFT = 0
export const RECT_BOTTOM_RIGHT = 1

export interface LooseRect extends LoosePoint, LooseSize {}

export type RectArg = LooseRect | number

export const translateRect = ( r: Rect, by: LoosePoint ) : Rect => {
  const p = translatePoint( r, by )

  return {
    x: p.x,
    y: p.y,
    width: r.width,
    height: r.height
  }
}

export const scaleRect = ( r: Rect, by: RectArg ) : Rect => {
  if( is.number( by ) ){
    return {
      x: r.x * by,
      y: r.y * by,
      width: r.width * by,
      height: r.height * by
    }
  }

  const { x = 1, y = 1, width = 1, height = 1 } = by

  return {
    x: r.x * x,
    y: r.y * y,
    width: r.width * width,
    height: r.height * height
  }
}

export const assertRect = ( p: Rect ) => {
  if( !is.rect( p ) ) throw Error( 'Expected a Rect' )
}

export const cloneRect = ( { x, y, width, height }: Rect ) : Rect =>
  ({ x, y, width, height })

export const rect = ( x: StringOrNumber = 0, y: StringOrNumber = 0, width: StringOrNumber = 0, height: StringOrNumber = 0 ) : Rect => {
  x = Number( x )
  y = Number( y )
  width = Number( width )
  height = Number( height )

  return { x, y, width, height }
}

export const emptyRect = () => rect()

export const rectFromArray = ( arr: StringOrNumber[] ) => rect( ...arr )

export const rectFromString = ( str: string ) =>
  rectFromArray( splitOnCommaAndSpace( str ) )

export const rectFromSize = ( { width, height }: Size ): Rect => ({
  x: 0,
  y: 0,
  width, height
})

export const rectFromPoint = ( { x, y }: Point ): Rect => ({
  x: 0,
  y: 0,
  width: x,
  height: y
})

export const rectFromPointAndSize = ( { x, y }: Point, { width, height } : Size ): Rect =>
  ({ x, y, width, height })

export const rectFromLine = ( l: Line ) => {
  const { start, end } = l

  const { x, y } = start
  const { width, height } = sizeFromLine( l )

  return { x, y, width, height }
}

export const rectCenter = ( r: Rect ) => {
  const sizeP = sizeCenter( r )

  return translatePoint( r, sizeP )
}

export const rectFromEdges = ( e: RectEdges ): Rect => ({
  x: e.left,
  y: e.top,
  width: e.right - e.left,
  height: e.bottom - e.top
})

export const rectToEdges = ( r: Rect ): RectEdges => ({
  top: r.y,
  right: r.x + r.width,
  bottom: r.y + r.height,
  left: r.x
})

export const rectToCorners = ( r: Rect ): RectAllCorners => ({
  topLeft: clonePoint( r ),
  topRight: translatePoint( r, { x: r.width } ),
  bottomRight: translatePoint( r, { x: r.width, y: r.height } ),
  bottomLeft: translatePoint( r, { y: r.height } )
})

export const rectFromPoints = ( topLeft: Point, bottomRight: Point ): Rect =>
  ({
    x: topLeft.x,
    y: topLeft.y,
    width: bottomRight.x - topLeft.x,
    height: bottomRight.y - topLeft.y
  })

export const rectFromPointArray = ( points: RectPoints ): Rect =>
  rectFromPoints( points[ RECT_TOP_LEFT ], points[ RECT_BOTTOM_RIGHT ] )

export const rectFromCorners = ( { topLeft, bottomRight }: RectCorners ) =>
  rectFromPoints( topLeft, bottomRight )
