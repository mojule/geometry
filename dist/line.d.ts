import { Point } from './point';
export declare type Line = [Point, Point];
export declare const intersection: (line1: [Point, Point], line2: [Point, Point]) => Point | undefined;
