import * as crypto from 'crypto';
import * as fs from 'fs';

export interface GameProfile {
    id: string,
    name: string,
    legacy: boolean,
}
export interface User {
    id: string,
    email: string,
    password: string,
    availableProfiles: GameProfile[],
    selectedProfile: GameProfile,
    properties: { [key: string]: string },
}

export interface PasswordMiddleware {
    process(password: string): Promise<string>;
}
export class None implements PasswordMiddleware {
    process(provided: string): Promise<string> {
        return Promise.resolve(provided);
    }
}
export class Hash implements PasswordMiddleware {
    constructor(private algorithm: string, private encoding: crypto.HexBase64Latin1Encoding = 'base64') { }
    process(provided: string) {
        return Promise.resolve(crypto.createHash(this.algorithm).update(provided).digest(this.encoding));
    }
}
export abstract class RSA implements PasswordMiddleware {
    constructor(protected encoding: string = 'base64') { }
    async process(provided: string): Promise<string> {
        return crypto.privateDecrypt(await this.privateKey(), new Buffer(provided, this.encoding)).toString(this.encoding);
    }
    protected abstract privateKey(): Promise<string | crypto.RsaPrivateKey>;
}
export class MemoryRSA extends RSA {
    constructor(encoding: string = 'base64', private _privateKey: string) {
        super(encoding);
    }
    protected privateKey() {
        return Promise.resolve(this._privateKey);
    }
}
export class FileRSA extends RSA {
    constructor(encoding: string = 'base64', private privateKeyFile: string) {
        super(encoding);
    }
    protected privateKey() {
        return new Promise<string | crypto.RsaPrivateKey>((resolve, reject) => {
            fs.readFile(this.privateKeyFile, (err, data) => {
                if (err) { reject(err) }
                else {
                    resolve(data.toString(this.encoding));
                }
            })
        });
    }
}
export interface UserDBridge {
    findUserByName(username: string): Promise<User>;
    findUserById(id: string): Promise<User>;
}


