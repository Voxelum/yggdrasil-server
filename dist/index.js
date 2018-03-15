"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var uuid_1 = require("uuid");
require("reflect-metadata");
var parse_body_1 = require("./parse.body");
// export interface GameProfile {
//     id: string
//     name: string
//     legacy?: boolean
// }
var GameProfile = /** @class */ (function () {
    function GameProfile(object) {
        this.id = object.id;
        this.name = object.name;
        this.legacy = object.legacy;
    }
    __decorate([
        parse_body_1.Require(),
        __metadata("design:type", String)
    ], GameProfile.prototype, "id", void 0);
    __decorate([
        parse_body_1.Require(),
        __metadata("design:type", String)
    ], GameProfile.prototype, "name", void 0);
    __decorate([
        parse_body_1.Optional(),
        __metadata("design:type", Boolean)
    ], GameProfile.prototype, "legacy", void 0);
    return GameProfile;
}());
exports.GameProfile = GameProfile;
var Agent = /** @class */ (function () {
    function Agent(object) {
        this.name = object.name;
        this.version = object.version;
    }
    __decorate([
        parse_body_1.Require(),
        __metadata("design:type", String)
    ], Agent.prototype, "name", void 0);
    __decorate([
        parse_body_1.Require(),
        __metadata("design:type", Number)
    ], Agent.prototype, "version", void 0);
    return Agent;
}());
var AuthenticateRequest = /** @class */ (function () {
    function AuthenticateRequest(object) {
        this.username = object.username;
        this.password = object.password;
        this.clientToken = object.clientToken;
        this.requestUser = object.requestUser;
        this.agent = new Agent(object.agent);
    }
    __decorate([
        parse_body_1.Optional(),
        __metadata("design:type", Agent)
    ], AuthenticateRequest.prototype, "agent", void 0);
    __decorate([
        parse_body_1.Require(),
        __metadata("design:type", String)
    ], AuthenticateRequest.prototype, "username", void 0);
    __decorate([
        parse_body_1.Require(),
        __metadata("design:type", String)
    ], AuthenticateRequest.prototype, "password", void 0);
    __decorate([
        parse_body_1.Optional(),
        __metadata("design:type", String)
    ], AuthenticateRequest.prototype, "clientToken", void 0);
    __decorate([
        parse_body_1.Optional(),
        __metadata("design:type", Boolean)
    ], AuthenticateRequest.prototype, "requestUser", void 0);
    return AuthenticateRequest;
}());
var RefreshRequest = /** @class */ (function () {
    function RefreshRequest(object) {
        this.accessToken = object.accessToken;
        this.clientToken = object.clientToken;
        this.selectedProfile = new GameProfile(object.selectedProfile);
        this.requestUser = object.requestUser;
    }
    __decorate([
        parse_body_1.Require(),
        __metadata("design:type", String)
    ], RefreshRequest.prototype, "accessToken", void 0);
    __decorate([
        parse_body_1.Require(),
        __metadata("design:type", String)
    ], RefreshRequest.prototype, "clientToken", void 0);
    __decorate([
        parse_body_1.Optional(),
        __metadata("design:type", GameProfile)
    ], RefreshRequest.prototype, "selectedProfile", void 0);
    __decorate([
        parse_body_1.Optional(),
        __metadata("design:type", Boolean)
    ], RefreshRequest.prototype, "requestUser", void 0);
    return RefreshRequest;
}());
var ValidateRequest = /** @class */ (function () {
    function ValidateRequest(object) {
        this.accessToken = object.accessToken;
        this.clientToken = object.clientToken;
    }
    __decorate([
        parse_body_1.Require(),
        __metadata("design:type", String)
    ], ValidateRequest.prototype, "accessToken", void 0);
    __decorate([
        parse_body_1.Optional(),
        __metadata("design:type", String)
    ], ValidateRequest.prototype, "clientToken", void 0);
    return ValidateRequest;
}());
var SignoutRequest = /** @class */ (function () {
    function SignoutRequest(object) {
        this.username = object.username;
        this.password = object.password;
    }
    __decorate([
        parse_body_1.Require(),
        __metadata("design:type", String)
    ], SignoutRequest.prototype, "username", void 0);
    __decorate([
        parse_body_1.Require(),
        __metadata("design:type", String)
    ], SignoutRequest.prototype, "password", void 0);
    return SignoutRequest;
}());
function create(db, tokens, middleware) {
    var app = express_1.default();
    app.use(function (req, resp, next) {
        if (req.header('Content-Type') !== 'application/json') {
            resp.status(400)
                .contentType('application/json;charset=UTF-8')
                .send({
                error: 'Unsupported Media Type',
                errorMessage: 'The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method'
            });
        }
        next();
    });
    app.use(express_1.default.json());
    app.get("*", function (req, resp) {
        resp.status(400)
            .contentType('application/json;charset=UTF-8')
            .send({
            error: 'Method Not Allowed',
            errorMessage: 'The method specified in the request is not allowed for the resource identified by the request URI',
        });
    });
    function handle(handler, reqType) {
        app.post("/" + handler.name, function (req, resp) {
            var reqObj = parse_body_1.parse(req.body, reqType);
            if (!reqObj) {
                resp.status(400).send({
                    error: "IllegalArgumentException",
                    errorMessage: "credentials is null"
                });
                return;
            }
            handler(reqObj).then(function (r) {
                console.log(r);
                resp.status(r.status)
                    .contentType('application/json;charset=UTF-8')
                    .send(r.body);
            }).catch(function (e) {
                console.error(e);
                resp.status(e.status)
                    .contentType('application/json;charset=UTF-8')
                    .send(e.body);
            });
        });
    }
    function authenticate(req) {
        return __awaiter(this, void 0, void 0, function () {
            var usr, _a, _b, clientToken, token, respObj;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, db.findUserByName(req.username)];
                    case 1:
                        usr = _c.sent();
                        _a = !usr;
                        if (_a) return [3 /*break*/, 3];
                        _b = usr.password;
                        return [4 /*yield*/, middleware.process(req.password)];
                    case 2:
                        _a = _b !== (_c.sent());
                        _c.label = 3;
                    case 3:
                        if (_a)
                            throw {
                                status: 400,
                                body: {
                                    error: 'ForbiddenOperationException',
                                    errorMessage: 'Invalid credentials. Invalid username or password.'
                                }
                            };
                        clientToken = req.clientToken || uuid_1.v4();
                        return [4 /*yield*/, tokens.grant(usr, clientToken)];
                    case 4:
                        token = _c.sent();
                        respObj = {
                            clientToken: clientToken,
                            accessToken: token.accessToken,
                        };
                        if (req.agent) {
                            respObj.availableProfiles = usr.availableProfiles;
                            respObj.selectedProfile = usr.availableProfiles.filter(function (p) { return p.id === token.selectedProfile; });
                        }
                        if (req.requestUser) {
                            respObj.user = {
                                id: usr.id,
                                properties: usr.properties
                            };
                        }
                        return [2 /*return*/, { status: 200, body: respObj }];
                }
            });
        });
    }
    function refresh(req) {
        return __awaiter(this, void 0, void 0, function () {
            var token, usr, newToken, respObj;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tokens.validate(req.accessToken, req.clientToken)];
                    case 1:
                        token = _a.sent();
                        if (!token)
                            throw {
                                status: 400,
                                body: {
                                    error: 'ForbiddenOperationException',
                                    errorMessage: 'Invalid token.'
                                }
                            };
                        return [4 /*yield*/, db.findUserById(token.userId)];
                    case 2:
                        usr = _a.sent();
                        return [4 /*yield*/, tokens.grant(usr, req.clientToken)];
                    case 3:
                        newToken = _a.sent();
                        tokens.invalidate(req.accessToken, req.clientToken);
                        respObj = {
                            clientToken: req.clientToken,
                            accessToken: newToken.accessToken,
                        };
                        if (token.selectedProfile) {
                            respObj.selectedProfile = usr.availableProfiles.filter(function (p) { return p.id === newToken.selectedProfile; });
                        }
                        if (req.requestUser) {
                            respObj.user = {
                                id: usr.id,
                                properties: usr.properties
                            };
                        }
                        return [2 /*return*/, { status: 200, body: respObj }];
                }
            });
        });
    }
    function validate(req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tokens.validate(req.accessToken, req.clientToken)];
                    case 1:
                        if (_a.sent())
                            return [2 /*return*/, { status: 304, body: {} }];
                        else
                            throw {
                                status: 400,
                                body: {
                                    "error": "ForbiddenOperationException",
                                    errorMessage: "Invalid token.",
                                }
                            };
                        return [2 /*return*/];
                }
            });
        });
    }
    function invalidate(req) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, tokens.invalidate(req.accessToken, req.clientToken)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, { status: 304, body: {} }];
                }
            });
        });
    }
    function signout(req) {
        return __awaiter(this, void 0, void 0, function () {
            var usr, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, db.findUserByName(req.username)];
                    case 1:
                        usr = _c.sent();
                        _a = !usr;
                        if (_a) return [3 /*break*/, 3];
                        _b = usr.password;
                        return [4 /*yield*/, middleware.process(req.password)];
                    case 2:
                        _a = _b != (_c.sent());
                        _c.label = 3;
                    case 3:
                        if (_a)
                            throw {
                                status: 400,
                                body: {
                                    error: 'ForbiddenOperationException',
                                    errorMessage: 'Invalid credentials. Invalid username or password.'
                                }
                            };
                        return [4 /*yield*/, tokens.invalidateUser(usr.id)];
                    case 4:
                        _c.sent();
                        return [2 /*return*/, { status: 304, body: {} }];
                }
            });
        });
    }
    handle(authenticate, AuthenticateRequest);
    handle(refresh, RefreshRequest);
    handle(validate, ValidateRequest);
    handle(invalidate, ValidateRequest);
    handle(signout, SignoutRequest);
    app.post('*', function (req, resp) {
        resp.status(400);
        resp.send({
            error: 'Not Found',
            errorMessage: 'The server has not found anything matching the request URI'
        });
    });
    return app;
}
exports.create = create;
//# sourceMappingURL=index.js.map