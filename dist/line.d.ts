import { Point } from './point';
import { Size } from './size';
import { Rect } from './rect';
export interface Line {
    start: Point;
    end: Point;
}
export declare const intersection: (l1: Line, l2: Line) => Point | undefined;
export declare const assertLine: (l: Line) => void;
export declare const line: (start: Point, end: Point) => Line;
export declare const lineFromValues: (x1?: string | number, y1?: string | number, x2?: string | number, y2?: string | number) => Line;
export declare const lineFromPoint: (p: Point) => Line;
export declare const emptyLine: () => Line;
export declare const cloneLine: (l: Line) => {
    start: Point;
    end: Point;
};
export declare const lineFromArray: (arr: (string | number)[]) => Line;
export declare const lineFromString: (str: string) => Line;
export declare const lineFromSize: (s: Size) => Line;
export declare const lineFromRect: (r: Rect) => Line;
