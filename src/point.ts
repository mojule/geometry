import {
  is, trimAndFilter, splitOnCommaAndSpace, StringOrNumber
} from './util'

export interface Point {
  x: number
  y: number
}

export interface LoosePoint {
  x?: number,
  y?: number
}

export type PointArg = LoosePoint | number

export const translate = ( p1: Point, { x = 0, y = 0 }: LoosePoint ) : Point => ({
  x: p1.x + x,
  y: p1.y + y
})

export const scale = ( p1: Point, by: PointArg ) : Point => {
  if( is.number( by ) ){
    return {
      x: p1.x * by,
      y: p1.y * by
    }
  }

  const { x = 1, y = 1 } = by

  return {
    x: p1.x * x,
    y: p1.y * y
  }
}

export const assertPoint = ( p: Point ) => {
  if( !is.point( p ) ) throw Error( 'Expected a Point' )
}

export const clonePoint = ( p: Point ) : Point => {
  const { x, y } = p

  return { x, y }
}

export const point = ( x: StringOrNumber = 0, y: StringOrNumber = 0 ) : Point => {
  x = Number( x )
  y = Number( y )

  return { x, y }
}

export const emptyPoint = () => point()

export const pointFromArray = ( arr: StringOrNumber[] ) => point( ...arr )

export const pointFromString = ( str: string ) =>
  pointFromArray( splitOnCommaAndSpace( str ) )
