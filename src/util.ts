import { Point } from './point'
import { Line } from './line'
import { Size } from './size'
import { Rect } from './rect'

export type StringOrNumber = string | number

export const is = {
  number: ( value: any ): value is number => typeof value === 'number',
  point: ( value: any ): value is Point =>
    value && is.number( value.x ) && is.number( value.y ),
  line: ( value: any ): value is Line =>
    value && is.point( value.start ) && is.point( value.end ),
  size: ( value: any ): value is Size =>
    value && is.number( value.width ) && is.number( value.height ),
  rect: ( value: any ): value is Rect =>
    value && is.point( value ) && is.size( value ),
  array: ( value: any ): value is any[] => Array.isArray( value ),
}

export const trimAndFilter = ( strings: string[] ) =>
  strings.map( s => s.trim() ).filter( s => s !== '' )

export const splitOnCommaAndSpace = ( str: string ) =>
  trimAndFilter( str.split( /[, ]/ ) )
