import {
  is, trimAndFilter, splitOnCommaAndSpace, StringOrNumber
} from './util'

import { Size } from './size'
import { Edges } from './edge'
import { Line } from './line';

export interface Point {
  x: number
  y: number
}

export interface PointEdges extends Edges {
  top: number
  left: number
}

export interface LoosePoint {
  x?: number,
  y?: number
}

export type PointArg = LoosePoint | number

export const translatePoint = ( p: Point, { x = 0, y = 0 }: LoosePoint ) : Point => ({
  x: p.x + x,
  y: p.y + y
})

export const scalePoint = ( p: Point, by: PointArg ) : Point => {
  if( is.number( by ) ){
    return {
      x: p.x * by,
      y: p.y * by
    }
  }

  const { x = 1, y = 1 } = by

  return {
    x: p.x * x,
    y: p.y * y
  }
}

export const rotatePoint = ( p: Point, degrees: number ): Point => {
  const radians = degrees * Math.PI / 180
  const cos = Math.cos( radians )
  const sin = Math.sin( radians )

  const x = ( p.x * cos ) - ( p.y * sin )
  const y = ( p.y * cos ) + ( p.x * sin )

  return { x, y }
}

export const rotateAround = ( p: Point, origin: Point, degrees: number ): Point => {
  const translate = scalePoint( origin, -1 )
  const translatedPoint = translatePoint( p, translate )
  const rotatedPoint = rotatePoint( translatedPoint, degrees )

  return translatePoint( rotatedPoint, origin )
}

export const assertPoint = ( p: Point ) => {
  if( !is.point( p ) ) throw Error( 'Expected a Point' )
}

export const clonePoint = ( { x, y }: Point ) : Point => ({ x, y })

export const point = ( x: StringOrNumber = 0, y: StringOrNumber = 0 ) : Point => {
  x = Number( x )
  y = Number( y )

  return { x, y }
}

export const emptyPoint = () => point()

export const pointFromArray = ( arr: StringOrNumber[] ) => point( ...arr )

export const pointFromString = ( str: string ) =>
  pointFromArray( splitOnCommaAndSpace( str ) )

export const pointFromSize = ( s: Size ): Point => ({
  x: s.width,
  y: s.height
})

export const pointToEdges = ( p: Point ): PointEdges => ({
  top: p.y,
  left: p.x
})

export const pointFromEdges = ( e: PointEdges ) => ({
  x: e.left,
  y: e.top
})

export const vector = ( l: Line ) => ({
  x: l.end.x - l.start.x,
  y: l.end.y - l.start.y
})
