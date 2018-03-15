import { User, AccessTokenServer, Token } from ".";
export declare class SimpleAccessTokenServer implements AccessTokenServer {
    private tokenMap;
    grant(user: User, clientToken: string): Promise<Token>;
    validate(accessToken: string, clientToken?: string | undefined): Promise<Token | undefined>;
    invalidate(accessToken: string, clientToken?: string | undefined): Promise<void>;
    invalidateUser(userId: string): Promise<void>;
}
