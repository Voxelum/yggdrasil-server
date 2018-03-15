import express from 'express'
import { v4 } from 'uuid'
import 'reflect-metadata'
import { Require, Optional, parse } from './parse.body'

export interface PasswordMiddleware {
    process(password: string): Promise<string>;
}

export interface UserDBridge {
    findUserByName(username: string): Promise<User>;
    findUserById(id: string): Promise<User>;
}

export interface GameProfile {
    id: string,
    name: string,
    legacy: boolean,
}
export interface User {
    id: string,
    username: string,
    password: string,
    availableProfiles: GameProfile[],
    selectedProfile: GameProfile,
    properties: { [key: string]: string },
}

export interface TokenServer {
    grantAccessToken(user: User, clientToken: string): Promise<string>
    getProfileFromToken(accessToken: string): Promise<string>
    revokeAccessToken(accessToken: string): Promise<string>

    genClientToken(user: User): Promise<string>
}

class Agent {
    @Require()
    name: string
    @Require()
    version: number
    constructor(object: any) {
        this.name = object.name;
        this.version = object.version;
    }
}
class AuthenticateRequest {
    @Optional()
    agent?: Agent
    @Require()
    username: string
    @Require()
    password: string
    @Optional()
    clientToken?: string
    @Optional()
    requestUser?: boolean

    constructor(object: any) {
        this.username = object.username;
        this.password = object.password;
        this.clientToken = object.clientToken;
        this.requestUser = object.requestUser;
        this.agent = new Agent(object.agent);
    }
}

export function create(db: UserDBridge, tokens: TokenServer, middleware: PasswordMiddleware): Express.Application {
    const app = express();
    app.use(express.json());

    async function authenticate(req?: AuthenticateRequest) {
        if (!req) throw {
            "error": "Unsupported Media Type",
            "errorMessage": "The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method	",
        };
        const usr = await db.findUserByName(req.username);
        const decrp = await middleware.process(req.password);
        if (usr.password !== decrp) throw {
            error: 'ForbiddenOperationException',
            errorMessage: 'Invalid credentials. Invalid username or password.'
        };
        const clientToken = req.clientToken || await tokens.genClientToken(usr);
        const accessToken = await tokens.grantAccessToken(usr, clientToken);

        const respObj: any = {
            clientToken,
            accessToken: await tokens.grantAccessToken(usr, clientToken),
        };

        if (req.agent) { // emmmmmm
            respObj.availableProfiles = usr.availableProfiles;
            const targetId = await tokens.getProfileFromToken(accessToken);
            respObj.selectedProfile = usr.availableProfiles.filter(p => p.id === targetId)
        }
        if (req.requestUser) {
            respObj.user = {
                id: usr.id,
                properties: usr.properties
            }
        }
        return respObj;
    }
    app.post('/authenticate', (req, resp) => {
        authenticate(parse(req.body, AuthenticateRequest))
            .then(r => {
                resp.status(200)
                    .contentType('application/json;charset=UTF-8')
                    .send(r);
            })
            .catch(e => {
                resp.status(302)
                    .contentType('application/json;charset=UTF-8')
                    .send(e);
            })
    })

    app.post('/refresh', (req, resp) => {

    })

    app.post('/validate', (req, resp) => {

    })

    app.post('/signout', (req, resp) => {

    })

    app.post('/invalidate', (req, resp) => {

    })

    return app;
}



