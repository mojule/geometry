import { Point } from "./point";

export const is = {
  number: ( value: any ): value is number => typeof value === 'number',
  string: ( value: any ): value is string => typeof value === 'string',
  array: ( value: any ): value is any[] => Array.isArray( value ),
  numberArray: ( value: any ): value is number[] =>
    is.array( value ) && value.every( is.number ),
  stringArray: ( value: any ): value is string[] =>
    is.array( value ) && value.every( is.string ),
  point: ( value: any ): value is Point =>
    value && is.number( value.x ) && is.number( value.y )
}

export const trimAndFilter = ( strings: string[] ) =>
  strings.map( s => s.trim() ).filter( s => s !== '' )

export const commaOrSpaceSplit = ( string: string[] )