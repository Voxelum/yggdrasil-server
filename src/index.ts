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

export class GameProfile {
    @Require()
    id: string
    @Require()
    name: string
    @Optional()
    legacy?: boolean

    constructor(object: any) {
        this.id = object.id;
        this.name = object.name;
        this.legacy = object.legacy;
    }
}
export interface User {
    id: string,
    username: string,
    password: string,
    availableProfiles: GameProfile[],
    selectedProfile: GameProfile,
    properties: { [key: string]: string },
}

export interface AccessTokenServer {
    grant(user: User, clientToken: string): Promise<string>

    getProfile(accessToken: string, clientToken: string): Promise<string | undefined>
    getUser(accessToken: string, clientToken: string): Promise<string>

    validate(accessToken: string, clientToken?: string): Promise<boolean>
    invalidate(accessToken: string, clientToken: string): Promise<void>
    invalidateByPassword(username: string, password: string): Promise<void>
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


class RefreshRequest {
    @Require()
    accessToken: string
    @Require()
    clientToken: string
    @Optional()
    selectedProfile?: GameProfile
    @Optional()
    requestUser?: boolean

    constructor(object: any) {
        this.accessToken = object.accessToken;
        this.clientToken = object.clientToken;
        this.selectedProfile = new GameProfile(object.selectedProfile);
        this.requestUser = object.requestUser;

    }
}

class ValidateRequest {
    @Require()
    accessToken: string
    @Optional()
    clientToken?: string

    constructor(object: any) {
        this.accessToken = object.accessToken;
        this.clientToken = object.clientToken;
    }

}
export function create(db: UserDBridge, tokens: AccessTokenServer, middleware: PasswordMiddleware): Express.Application {
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
        const clientToken = req.clientToken || v4(); // await tokens.genClientToken(usr);
        const accessToken = await tokens.grant(usr, clientToken);

        const respObj: any = {
            clientToken,
            accessToken,
        };

        if (req.agent) { // emmmmmm
            respObj.availableProfiles = usr.availableProfiles;
            const targetId = await tokens.getProfile(accessToken, clientToken);
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


    async function refresh(req?: RefreshRequest) {
        if (!req) throw {
            "error": "Unsupported Media Type",
            "errorMessage": "The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method	",
        }
        if (!(await tokens.validate(req.accessToken, req.clientToken))) throw {
            error: 'ForbiddenOperationException',
            errorMessage: 'Invalid token.'
        }
        const usr = await db.findUserById(await tokens.getUser(req.accessToken, req.clientToken));
        const accessToken = await tokens.grant(usr, req.clientToken);
        tokens.invalidate(req.accessToken, req.clientToken);


        const respObj: any = {
            clientToken: req.clientToken,
            accessToken,
        };

        if (usr.selectedProfile) {
            respObj.selectedProfile = usr.selectedProfile;
        }
        if (req.requestUser) {
            respObj.user = {
                id: usr.id,
                properties: usr.properties
            }
        }
        return req;
    }


    app.post('/refresh', (req, resp) => {
        refresh(parse(req.body, RefreshRequest))
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

    async function validate(req?: ValidateRequest) {
        if (!req) throw {
            "error": "Unsupported Media Type",
            "errorMessage": "The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method	",
        }
        if (await tokens.validate(req.accessToken, req.clientToken))
            return {}
        else {
            throw {
                "error": "ForbiddenOperationException",
                errorMessage: "Invalid token.",
            }
        }
    }

    app.post('/validate', (req, resp) => {


    })

    app.post('/signout', (req, resp) => {

    })

    app.post('/invalidate', (req, resp) => {

    })

    return app;
}



