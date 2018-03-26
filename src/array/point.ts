export type Point = [ number, number ]

export const translatePoint = ( x: number, y: number, a: number, b: number = a ) : Point =>
  [ x + a, y + b ]

export const scalePoint = ( x: number, y: number, a: number, b: number = a ) : Point =>
  [ x * a, y * b ]

export const rotatePoint = ( x: number, y: number, radians: number, oX: number = 0, oY: number = 0 ): Point => {
  const hasOrigin = oX !== 0 && oY !== 0
  const cos = Math.cos( radians )
  const sin = Math.sin( radians )

  let tX = x
  let tY = y

  if( hasOrigin ){
    const [ sX, sY ] = scalePoint( oX, oY, -1 )
    const t = translatePoint( x, y, sX, sY )

    tX = t[ 0 ]
    tY = t[ 1 ]
  }

  const rX = ( tX * cos ) - ( tY * sin )
  const rY = ( tY * cos ) + ( tY * sin )

  if( !hasOrigin ) return [ rX, rY ]

  return translatePoint( rX, rY, oX, oY )
}
