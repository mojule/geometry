import { is, trimAndFilter } from "./util";

export interface Point {
  x: number
  y: number
}

export interface Point3 extends Point {
  z: number
}

export const add = ( p1: Point, { x = 0, y = 0 } ) : Point => ({
  x: p1.x + x,
  y: p1.y + y
})

export const add3 = ( p1: Point3, { x = 0, y = 0, z = 0 } ) : Point3 => ({
  x: p1.x + x,
  y: p1.y + y,
  z: p1.z + z
})

export const subtract = ( p1: Point, { x = 0, y = 0 } ) : Point => ({
  x: p1.x - x,
  y: p1.y - y
})

export const subtract3 = ( p1: Point3, { x = 0, y = 0, z = 0 } ) : Point3 => ({
  x: p1.x - x,
  y: p1.y - y,
  z: p1.z - z
})

export const multiply = ( p1: Point, { x = 0, y = 0 } ) : Point => ({
  x: p1.x * x,
  y: p1.y * y
})

export const multiply3 = ( p1: Point3, { x = 0, y = 0, z = 0 } ) : Point3 => ({
  x: p1.x * x,
  y: p1.y * y,
  z: p1.z * z
})

export type PointArg = Point | number | string | number[] | string[]

export const createPoint = ( ...args: PointArg[] ) : Point => {
  if( args.length === 0 ) return { x: 0, y: 0 }

  if( args.length === 1 ){
    let value = args[ 0 ]

    if( is.point( value ) ){
      return {
        x: value.x,
        y: value.y
      }
    }

    if( is.string( value ) ){
      value = trimAndFilter( value.split( /[, ]/ ) )
    }

    if( is.array( value ) ){
      return {
        x: Number( value[ 0 ] ),
        y: Number( value[ 1 ] )
      }
    }

    throw Error( 'Unexpected args' )
  }

  return {
    x: Number( args[ 0 ] ),
    y: Number( args[ 1 ] )
  }
}
