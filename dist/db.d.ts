import { UserDBridge, User } from '.';
export declare class MemoryUserDB implements UserDBridge {
    readonly map: {
        [id: string]: User;
    };
    constructor(map: {
        [id: string]: User;
    });
    findUserByName(username: string): Promise<User>;
    findUserById(id: string): Promise<User>;
}
export declare class FileUserDB implements UserDBridge {
    readonly rootFolder: string;
    constructor(rootFolder: string);
    findUserByName(username: string): Promise<User>;
    findUserById(id: string): Promise<User>;
}
