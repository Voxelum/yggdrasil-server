/// <reference types="express-serve-static-core" />
import { PasswordMiddleware, UserDBridge } from './user';
import 'reflect-metadata';
export declare function Require(): (target: any, key: string) => void;
export declare function Optional(): (target: any, key: string) => void;
export declare function create(db: UserDBridge, middleware: PasswordMiddleware): Express.Application;
export * from './user';
