import { Point } from './point';
import { Line } from './line';
export interface Size {
    width: number;
    height: number;
}
export interface LooseSize {
    width?: number;
    height?: number;
}
export declare type SizeArg = LooseSize | number;
export declare const assertSize: (s: Size) => void;
export declare const scaleSize: (s: Size, by: SizeArg) => Size;
export declare const offsetSize: (s: Size, by: SizeArg) => Size;
export declare const cloneSize: ({ width, height }: Size) => Size;
export declare const size: (width?: string | number, height?: string | number) => Size;
export declare const emptySize: () => Size;
export declare const sizeFromArray: (arr: (string | number)[]) => Size;
export declare const sizeFromString: (str: string) => Size;
export declare const sizeFromPoint: (p: Point) => Size;
export declare const sizeFromLine: (l: Line) => Size;
export declare const sizeCenter: ({ width, height }: Size) => Point;
