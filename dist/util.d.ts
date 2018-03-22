import { Point } from './point';
export declare const is: {
    number: (value: any) => value is number;
    point: (value: any) => value is Point;
    line: (value: any) => value is [Point, Point];
    array: (value: any) => value is any[];
};
export declare const trimAndFilter: (strings: string[]) => string[];
export declare const splitOnCommaAndSpace: (str: string) => string[];
export declare type StringOrNumber = string | number;
