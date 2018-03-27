import { Point } from './point'
import { radiansToDegrees } from './util';

export type Line = [ number, number, number, number ]

export const intersection = ( x1: number, y1: number, x2: number, y2: number, x3: number, y3: number, x4: number, y4: number  ): Point | undefined => {
  const denom = ( y4 - y3 ) * ( x2 - x1 ) - ( x4 - x3 ) * ( y2 - y1 )

  if( !denom ) return

  const ua = ( ( x4 - x3 ) * ( y1 - y3 ) - ( y4 - y3 ) * ( x1 - x3 ) ) / denom
  const ub = ( ( x2 - x1 ) * ( y1 - y3 ) - ( y2 - y1 ) * ( x1 - x3 ) ) / denom
  const x = x1 + ua * ( x2 - x1 )
  const y = y1 + ua * ( y2 - y1 )

  return [ x, y ]
}

export const lineVector = ( x1: number, y1: number, x2: number, y2: number ): Point =>
  [ x2 - x1, y2 - y1 ]

export const midLine = ( x1: number, y1: number, x2: number, y2: number ): Point =>
  [ ( x1 + x2 ) / 2, ( y1 + y2 ) / 2 ]

export const length = ( x1: number, y1: number, x2: number, y2: number ): number =>
  Math.sqrt( Math.pow( ( x2 - x1 ), 2 ) + Math.pow( ( y2 - y1 ), 2 ) )

export const unitVector = ( x1: number, y1: number, x2: number, y2: number ): Point => {
  const l = length( x1, y1, x2, y2 )
  const [ vX, vY ] = lineVector( x1, y1, x2, y2 )

  return [ vX / l, vY / l ]
}

export const angleRadians = ( x1: number, y1: number, x2: number, y2: number ) : number =>
  Math.atan2( y2 - y1, x2 - y1 )

export const angle = ( x1: number, y1: number, x2: number, y2: number ) : number =>
  radiansToDegrees( angleRadians( x1, y1, x2, y2 ) )

export const bresenhamLine = ( x1: number, y1: number, x2: number, y2: number ): number[] => {
  x1 = Math.floor( x1 )
  x2 = Math.floor( x2 )
  y1 = Math.floor( y1 )
  y2 = Math.floor( y2 )

  const line: number[] = [ x1, y1 ]

  const dX = Math.abs( x2 - x1 )
  const dY = Math.abs( y2 - y1 )
  const sX = x1 < x2 ? 1 : -1
  const sY = y1 < y2 ? 1 : -1
  let err = dX - dY

  while( x1 !== x2 || y1 !== y2 ){
    const err2 = 2 * err

    if( err2 > dY * -1 ){
      err -= dY
      x1 += sX
    }

    if( err2 < dX ){
      err += dX
      y1 += sY
    }

    line.push( x1 )
    line.push( y1 )
  }

  return line
}
