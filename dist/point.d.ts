import { Size } from './size';
import { Edges } from './edge';
import { Line } from './line';
export interface Point {
    x: number;
    y: number;
}
export interface PointEdges extends Edges {
    top: number;
    left: number;
}
export interface LoosePoint {
    x?: number;
    y?: number;
}
export declare type PointArg = LoosePoint | number;
export declare const translatePoint: (p: Point, { x, y }: LoosePoint) => Point;
export declare const scalePoint: (p: Point, by: PointArg) => Point;
export declare const rotatePoint: (p: Point, degrees: number) => Point;
export declare const rotateAround: (p: Point, origin: Point, degrees: number) => Point;
export declare const assertPoint: (p: Point) => void;
export declare const clonePoint: ({ x, y }: Point) => Point;
export declare const point: (x?: string | number, y?: string | number) => Point;
export declare const emptyPoint: () => Point;
export declare const pointFromArray: (arr: (string | number)[]) => Point;
export declare const pointFromString: (str: string) => Point;
export declare const pointFromSize: (s: Size) => Point;
export declare const pointToEdges: (p: Point) => PointEdges;
export declare const pointFromEdges: (e: PointEdges) => {
    x: number;
    y: number;
};
export declare const vector: (l: Line) => {
    x: number;
    y: number;
};
