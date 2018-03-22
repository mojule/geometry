import { Point } from './point'
import { Line } from './line'

export const is = {
  number: ( value: any ): value is number => typeof value === 'number',
  point: ( value: any ): value is Point =>
    value && is.number( value.x ) && is.number( value.y ),
  line: ( value: any ): value is Line =>
    is.array( value ) && is.point( value[ 0 ] ) && is.point( value[ 1 ] ),
  array: ( value: any ): value is any[] => Array.isArray( value ),
}

export const trimAndFilter = ( strings: string[] ) =>
  strings.map( s => s.trim() ).filter( s => s !== '' )

export const splitOnCommaAndSpace = ( str: string ) =>
  trimAndFilter( str.split( /[, ]/ ) )

export type StringOrNumber = string | number
