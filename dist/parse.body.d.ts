export interface Type<T> extends Function {
    new (body: any): T;
}
export declare function parse<T>(body: any, type: Type<T>): T | undefined;
export declare function Require(): (target: any, key: string) => void;
export declare function Optional(): (target: any, key: string) => void;
