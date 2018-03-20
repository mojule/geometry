export interface Point {
    x: number;
    y: number;
}
export declare const addPoint: (p1: Point, { x, y }: {
    x?: number;
    y?: number;
}) => Point;
export declare const subtractPoint: (p1: Point, { x, y }: {
    x?: number;
    y?: number;
}) => Point;
export declare const multiplyPoint: (p1: Point, { x, y }: {
    x?: number;
    y?: number;
}) => Point;
export declare const assertPoint: (p: Point) => void;
export declare const clonePoint: (p: Point) => Point;
export declare const point: (x?: string | number, y?: string | number) => Point;
export declare const emptyPoint: () => Point;
export declare const pointFromArray: (arr: (string | number)[]) => Point;
export declare const pointFromString: (str: string) => Point;
