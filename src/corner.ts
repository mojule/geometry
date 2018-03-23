import { Point } from './point'

export type Corner = 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight'

export interface Corners {
  topLeft?: Point
  topRight?: Point
  bottomLeft?: Point
  bottomRight?: Point
}
