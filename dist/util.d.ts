import { Point } from "./point";
export declare const is: {
    number: (value: any) => value is number;
    string: (value: any) => value is string;
    array: (value: any) => value is any[];
    numberArray: (value: any) => value is number[];
    stringArray: (value: any) => value is string[];
    point: (value: any) => value is Point;
};
export declare const trimAndFilter: (strings: string[]) => string[];
