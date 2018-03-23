import { Point } from './point';
import { Line } from './line';
import { Size } from './size';
import { Rect } from './rect';
export declare type StringOrNumber = string | number;
export declare const is: {
    number: (value: any) => value is number;
    point: (value: any) => value is Point;
    line: (value: any) => value is Line;
    size: (value: any) => value is Size;
    rect: (value: any) => value is Rect;
    array: (value: any) => value is any[];
};
export declare const trimAndFilter: (strings: string[]) => string[];
export declare const splitOnCommaAndSpace: (str: string) => string[];
