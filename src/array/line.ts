import { Point } from "./point";

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

export const vector = ( x1: number, y1: number, x2: number, y2: number ): Point =>
  [ x2 - x1, y2 - y1 ]

export const midLine = ( x1: number, y1: number, x2: number, y2: number ): Point =>
  [ ( x1 + x2 ) / 2, ( y1 + y2 ) / 2 ]
