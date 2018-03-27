export declare type Point = [number, number];
export declare const translate: (x: number, y: number, a: number, b?: number) => [number, number];
export declare const scale: (x: number, y: number, a: number, b?: number) => [number, number];
export declare const rotateRadians: (x: number, y: number, radians: number, oX?: number, oY?: number) => [number, number];
export declare const rotate: (x: number, y: number, degrees: number, oX?: number, oY?: number) => [number, number];
export declare const vectorRadians: (radians: number, length: number) => [number, number];
export declare const vector: (degrees: number, length: number) => [number, number];
