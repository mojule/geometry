import { Point } from './point';
export declare const is: {
    number: (value: any) => value is number;
    string: (value: any) => value is string;
    stringOrNumber: (value: any) => value is string | number;
    point: (value: any) => value is Point;
    line: (value: any) => value is [Point, Point];
    array: (value: any) => value is any[];
    numberArray: (value: any) => value is number[];
    stringArray: (value: any) => value is string[];
    stringOrNumberArray: (value: any) => value is (string | number)[];
    pointArray: (value: any) => value is Point[];
    lineArray: (value: any) => value is [Point, Point][];
};
export declare const trimAndFilter: (strings: string[]) => string[];
export declare const splitOnCommaAndSpace: (str: string) => string[];
export declare type StringOrNumber = string | number;
