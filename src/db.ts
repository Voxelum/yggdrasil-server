import { UserDBridge, User } from '.'
import * as fs from 'fs'

export class MemoryUserDB implements UserDBridge {
    constructor(
        readonly map: { [id: string]: User }
    ) {}
    findUserByName(username: string): Promise<User> {
        return Promise.resolve(Object.keys(this.map).map(id => this.map[id])[0])
    }
    findUserById(id: string): Promise<User> {
        return Promise.resolve(this.map[id]);
    }
}

export class FileUserDB implements UserDBridge {
    constructor(
        readonly rootFolder: string
    ) {}
    findUserByName(username: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
    findUserById(id: string): Promise<User> {
        throw new Error("Method not implemented.");
    }
}
