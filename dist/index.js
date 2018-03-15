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
require("reflect-metadata");
var parse_body_1 = require("./parse.body");
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
function create(db, tokens, middleware) {
    var app = express_1.default();
    app.use(express_1.default.json());
    function authenticate(req) {
        return __awaiter(this, void 0, void 0, function () {
            var usr, decrp, clientToken, _a, accessToken, respObj, _b, targetId_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!req)
                            throw {
                                "error": "Unsupported Media Type",
                                "errorMessage": "The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method	",
                            };
                        return [4 /*yield*/, db.findUserByName(req.username)];
                    case 1:
                        usr = _c.sent();
                        return [4 /*yield*/, middleware.process(req.password)];
                    case 2:
                        decrp = _c.sent();
                        if (usr.password !== decrp)
                            throw {
                                error: 'ForbiddenOperationException',
                                errorMessage: 'Invalid credentials. Invalid username or password.'
                            };
                        _a = req.clientToken;
                        if (_a) return [3 /*break*/, 4];
                        return [4 /*yield*/, tokens.genClientToken(usr)];
                    case 3:
                        _a = (_c.sent());
                        _c.label = 4;
                    case 4:
                        clientToken = _a;
                        return [4 /*yield*/, tokens.grantAccessToken(usr, clientToken)];
                    case 5:
                        accessToken = _c.sent();
                        _b = {
                            clientToken: clientToken
                        };
                        return [4 /*yield*/, tokens.grantAccessToken(usr, clientToken)];
                    case 6:
                        respObj = (_b.accessToken = _c.sent(),
                            _b);
                        if (!req.agent) return [3 /*break*/, 8];
                        respObj.availableProfiles = usr.availableProfiles;
                        return [4 /*yield*/, tokens.getProfileFromToken(accessToken)];
                    case 7:
                        targetId_1 = _c.sent();
                        respObj.selectedProfile = usr.availableProfiles.filter(function (p) { return p.id === targetId_1; });
                        _c.label = 8;
                    case 8:
                        if (req.requestUser) {
                            respObj.user = {
                                id: usr.id,
                                properties: usr.properties
                            };
                        }
                        return [2 /*return*/, respObj];
                }
            });
        });
    }
    app.post('/authenticate', function (req, resp) {
        authenticate(parse_body_1.parse(req.body, AuthenticateRequest))
            .then(function (r) {
            resp.status(200)
                .contentType('application/json;charset=UTF-8')
                .send(r);
        })
            .catch(function (e) {
            resp.status(302)
                .contentType('application/json;charset=UTF-8')
                .send(e);
        });
    });
    app.post('/refresh', function (req, resp) {
    });
    app.post('/validate', function (req, resp) {
    });
    app.post('/signout', function (req, resp) {
    });
    app.post('/invalidate', function (req, resp) {
    });
    return app;
}
exports.create = create;
//# sourceMappingURL=index.js.map