import { User } from ".";
export declare function createTokenServer(): void;
export declare function grantAccessToken(user: User, clientToken: string): string;
export declare function genClientToken(user: User): string;
export declare function getProfileForToken(accessToken: string): string;
