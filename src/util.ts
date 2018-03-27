export const radiansToDegrees = ( radians: number ) => radians * 180 / Math.PI

export const degreesToRadians = ( degrees: number ) => degrees * Math.PI / 180

export const approximatelyEqual = ( a: number, b: number, epsilon: number = 0.001 ) =>
  Math.abs( b - a ) <= epsilon

export const alignCenter = ( parent: number, child: number ) =>
  ( parent - child ) / 2
