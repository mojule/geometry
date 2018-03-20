import { Point } from './point'
import { Line } from './line'

export const is = {
  number: ( value: any ): value is number => typeof value === 'number',
  string: ( value: any ): value is string => typeof value === 'string',
  stringOrNumber: ( value: any ): value is StringOrNumber =>
    is.number( value ) || is.string( value ),
  point: ( value: any ): value is Point =>
    value && is.number( value.x ) && is.number( value.y ),
  line: ( value: any ): value is Line =>
    is.array( value ) && is.point( value[ 0 ] ) && is.point( value[ 1 ] ),
  array: ( value: any ): value is any[] => Array.isArray( value ),
  numberArray: ( value: any ): value is number[] =>
    is.array( value ) && value.every( is.number ),
  stringArray: ( value: any ): value is string[] =>
    is.array( value ) && value.every( is.string ),
  stringOrNumberArray: ( value: any ): value is StringOrNumber[] =>
    is.array( value ) && value.every( is.stringOrNumber ),
  pointArray: ( value: any ): value is Point[] =>
    is.array( value ) && value.every( is.point ),
  lineArray: ( value: any ): value is Line[] =>
    is.array( value ) && value.every( is.line )
}

export const trimAndFilter = ( strings: string[] ) =>
  strings.map( s => s.trim() ).filter( s => s !== '' )

export const splitOnCommaAndSpace = ( str: string ) =>
  trimAndFilter( str.split( /[, ]/ ) )

export type StringOrNumber = string | number
