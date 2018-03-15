import { User, GameProfile, AccessTokenServer, Token } from ".";
import { v4 } from 'uuid'

export class SimpleAccessTokenServer implements AccessTokenServer {
    private tokenMap: { [accessToken: string]: Token } = {};
    grant(user: User, clientToken: string): Promise<Token> {
        const token: Token = {
            accessToken: v4().replace(/ /g, ''),
            clientToken: clientToken,
            userId: user.id,
            selectedProfile: user.availableProfiles[0].id,
        }
        this.tokenMap[token.accessToken] = token;
        return Promise.resolve(token);
    }
    validate(accessToken: string, clientToken?: string | undefined): Promise<Token | undefined> {
        const token = this.tokenMap[accessToken];
        if (!token || (clientToken && token.clientToken !== token.clientToken)) return Promise.resolve(undefined);
        return Promise.resolve(token);
    }
    invalidate(accessToken: string, clientToken?: string | undefined): Promise<void> {
        delete this.tokenMap[accessToken];
        return Promise.resolve();
    }
    invalidateUser(userId: string): Promise<void> {
        Object.keys(this.tokenMap)
            .filter(t => this.tokenMap[t].userId === userId)
            .forEach(t => delete this.tokenMap[t]);
        return Promise.resolve();
    }
}