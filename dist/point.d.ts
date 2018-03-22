export interface Point {
    x: number;
    y: number;
}
export interface LoosePoint {
    x?: number;
    y?: number;
}
export declare type PointArg = LoosePoint | number;
export declare const translate: (p1: Point, { x, y }: LoosePoint) => Point;
export declare const scale: (p1: Point, by: PointArg) => Point;
export declare const assertPoint: (p: Point) => void;
export declare const clonePoint: (p: Point) => Point;
export declare const point: (x?: string | number, y?: string | number) => Point;
export declare const emptyPoint: () => Point;
export declare const pointFromArray: (arr: (string | number)[]) => Point;
export declare const pointFromString: (str: string) => Point;
