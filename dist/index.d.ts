/// <reference types="express" />
import express from 'express';
import 'reflect-metadata';
export interface PasswordMiddleware {
    process(password: string): Promise<string>;
}
export interface UserDBridge {
    findUserByName(username: string): Promise<User | undefined>;
    findUserById(id: string): Promise<User>;
}
export declare class GameProfile {
    id: string;
    name: string;
    legacy?: boolean;
    constructor(object: any);
}
export interface User {
    id: string;
    username: string;
    password: string;
    availableProfiles: GameProfile[];
    properties: {
        [key: string]: string;
    };
}
export interface Token {
    accessToken: string;
    clientToken: string;
    userId: string;
    selectedProfile: string;
}
export interface AccessTokenServer {
    grant(user: User, clientToken: string): Promise<Token>;
    validate(accessToken: string, clientToken?: string): Promise<Token | undefined>;
    invalidate(accessToken: string, clientToken?: string): Promise<void>;
    invalidateUser(userId: string): Promise<void>;
}
export declare function create(db: UserDBridge, tokens: AccessTokenServer, middleware: PasswordMiddleware): express.Application;
