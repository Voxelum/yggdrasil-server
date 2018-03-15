import { User, GameProfile, AccessTokenServer } from ".";

export class SimpleAccessTokenServer implements AccessTokenServer {
    grant(user: User, clientToken: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    getProfile(accessToken: string, clientToken: string): Promise<string> {
        throw new Error("Method not implemented.");
    }
    validate(accessToken: string, clientToken: string): Promise<boolean> {
        throw new Error("Method not implemented.");
    }
    invalidate(accessToken: string, clientToken: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    invalidateByPassword(username: string, password: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}