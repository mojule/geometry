import { is, StringOrNumber, splitOnCommaAndSpace } from './util'
import { Point } from './point'
import { Line } from './line'

export interface Size {
  width: number
  height: number
}

export interface LooseSize {
  width?: number,
  height?: number
}

export type SizeArg = LooseSize | number

export const assertSize = ( s: Size ) => {
  if( !is.size( s ) ) throw Error( 'Expected a Size' )
}

export const scaleSize = ( s: Size, by: SizeArg ) : Size => {
  if( is.number( by ) ){
    return {
      width: s.width * by,
      height: s.height * by
    }
  }

  const { width = 1, height = 1 } = by

  return {
    width: s.width * width,
    height: s.height * height
  }
}

export const offsetSize = ( s: Size, by: SizeArg ) : Size => {
  if( is.number( by ) ){
    return {
      width: s.width + by,
      height: s.height + by
    }
  }

  const { width = 0, height = 0 } = by

  return {
    width: s.width + width,
    height: s.height + height
  }
}

export const cloneSize = ( { width, height }: Size ) : Size =>
  ({ width, height })

export const size = ( width: StringOrNumber = 0, height: StringOrNumber = 0 ) : Size => {
  width = Number( width )
  height = Number( height )

  return { width, height }
}

export const emptySize = () => size()

export const sizeFromArray = ( arr: StringOrNumber[] ) => size( ...arr )

export const sizeFromString = ( str: string ) =>
  sizeFromArray( splitOnCommaAndSpace( str ) )

export const sizeFromPoint = ( p: Point ) : Size => ({
  width: p.x,
  height: p.y
})

export const sizeFromLine = ( l: Line ): Size => ({
  width: l.end.x - l.start.x,
  height: l.end.y - l.start.y
})

export const sizeCenter = ( { width, height }: Size ): Point => ({
  x: width / 2,
  y: height / 2
})
