export type Size = [ number, number ]

export const rectSize = ( x1: number, y1: number, x2: number, y2: number ): Size =>
  [ Math.abs( x2 - x1 ), Math.abs( y2 - y1 ) ]

export const scaleSizeInSize = ( w1: number, h1: number, w2: number, h2: number ) =>
  Math.min( w1 / w2, h1/ h2 )
