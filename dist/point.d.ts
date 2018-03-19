export interface Point {
    x: number;
    y: number;
}
export interface Point3 extends Point {
    z: number;
}
export declare const add: (p1: Point, {x, y}: {
    x?: number;
    y?: number;
}) => Point;
export declare const add3: (p1: Point3, {x, y, z}: {
    x?: number;
    y?: number;
    z?: number;
}) => Point3;
export declare const subtract: (p1: Point, {x, y}: {
    x?: number;
    y?: number;
}) => Point;
export declare const subtract3: (p1: Point3, {x, y, z}: {
    x?: number;
    y?: number;
    z?: number;
}) => Point3;
export declare const multiply: (p1: Point, {x, y}: {
    x?: number;
    y?: number;
}) => Point;
export declare const multiply3: (p1: Point3, {x, y, z}: {
    x?: number;
    y?: number;
    z?: number;
}) => Point3;
export declare type PointArg = Point | Point3 | string | number | number[] | string[];
export declare const createPoint: (...args: PointArg[]) => Point;
