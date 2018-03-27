import { degreesToRadians } from "./util";

export type Point = [ number, number ]

export const translate = ( x: number, y: number, a: number, b: number = a ) : Point =>
  [ x + a, y + b ]

export const scale = ( x: number, y: number, a: number, b: number = a ) : Point =>
  [ x * a, y * b ]

const rotateAround = ( x: number, y: number, radians: number, oX: number, oY: number ): Point => {
  const [ sX, sY ] = scale( oX, oY, -1 )
  const [ tX, tY ] = translate( x, y, sX, sY )
  const [ rX, rY ] = rotateRadians( tX, tY, radians )

  return translate( rX, rY, oX, oY )
}

export const rotateRadians = ( x: number, y: number, radians: number, oX: number = 0, oY: number = 0 ): Point => {
  if( oX !== 0 || oY !== 0 ) return rotateAround( x, y, radians, oX, oY )

  const cos = Math.cos( radians )
  const sin = Math.sin( radians )

  const rX = ( x * cos ) - ( y * sin )
  const rY = ( y * cos ) + ( x * sin )

  return [ rX, rY ]
}

export const rotate = ( x: number, y: number, degrees: number, oX: number = 0, oY: number = 0 ): Point =>
  rotateRadians( x, y, degreesToRadians( degrees ), oX, oY )

export const vectorRadians = ( radians: number, length: number ): Point =>
  [ Math.cos( radians ) * length, Math.sin( radians ) * length ]

export const vector = ( degrees: number, length: number ): Point =>
  vectorRadians( degreesToRadians( degrees ), length )
