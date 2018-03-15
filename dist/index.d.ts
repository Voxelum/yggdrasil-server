/// <reference types="express-serve-static-core" />
import 'reflect-metadata';
export interface PasswordMiddleware {
    process(password: string): Promise<string>;
}
export interface UserDBridge {
    findUserByName(username: string): Promise<User>;
    findUserById(id: string): Promise<User>;
}
export interface GameProfile {
    id: string;
    name: string;
    legacy: boolean;
}
export interface User {
    id: string;
    username: string;
    password: string;
    availableProfiles: GameProfile[];
    selectedProfile: GameProfile;
    properties: {
        [key: string]: string;
    };
}
export interface TokenServer {
    grantAccessToken(user: User, clientToken: string): Promise<string>;
    getProfileFromToken(accessToken: string): Promise<string>;
    revokeAccessToken(accessToken: string): Promise<string>;
    genClientToken(user: User): Promise<string>;
}
export declare function create(db: UserDBridge, tokens: TokenServer, middleware: PasswordMiddleware): Express.Application;
