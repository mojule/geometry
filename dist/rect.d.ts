import { Point, LoosePoint } from './point';
import { Size, LooseSize } from './size';
import { Line } from './line';
import { Corners } from './corner';
import { Edges } from './edge';
export interface Rect extends Point, Size {
}
export interface RectEdges extends Edges {
    top: number;
    right: number;
    bottom: number;
    left: number;
}
export interface RectCoordinates {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}
export interface RectCorners extends Corners {
    topLeft: Point;
    bottomRight: Point;
}
export interface RectAllCorners extends RectCorners {
    topRight: Point;
    bottomRight: Point;
}
export declare type RectPoints = [Point, Point];
export declare const RECT_TOP_LEFT = 0;
export declare const RECT_BOTTOM_RIGHT = 1;
export interface LooseRect extends LoosePoint, LooseSize {
}
export declare type RectArg = LooseRect | number;
export declare const translateRect: (r: Rect, by: LoosePoint) => Rect;
export declare const scaleRect: (r: Rect, by: RectArg) => Rect;
export declare const assertRect: (p: Rect) => void;
export declare const cloneRect: ({ x, y, width, height }: Rect) => Rect;
export declare const rect: (x?: string | number, y?: string | number, width?: string | number, height?: string | number) => Rect;
export declare const emptyRect: () => Rect;
export declare const rectFromArray: (arr: (string | number)[]) => Rect;
export declare const rectFromString: (str: string) => Rect;
export declare const rectFromSize: ({ width, height }: Size) => Rect;
export declare const rectFromPoint: ({ x, y }: Point) => Rect;
export declare const rectFromPointAndSize: ({ x, y }: Point, { width, height }: Size) => Rect;
export declare const rectFromLine: (l: Line) => {
    x: number;
    y: number;
    width: number;
    height: number;
};
export declare const rectCenter: (r: Rect) => Point;
export declare const rectFromEdges: (e: RectEdges) => Rect;
export declare const rectToEdges: (r: Rect) => RectEdges;
export declare const rectToCorners: (r: Rect) => RectAllCorners;
export declare const rectFromPoints: (topLeft: Point, bottomRight: Point) => Rect;
export declare const rectFromPointArray: (points: [Point, Point]) => Rect;
export declare const rectFromCorners: ({ topLeft, bottomRight }: RectCorners) => Rect;
