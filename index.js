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
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
require("reflect-metadata");
function Require() {
    return function (target, key) {
        if (!Reflect.hasMetadata('requires', target.constructor)) {
            Reflect.defineMetadata('requires', [], target.constructor);
        }
        var type = Reflect.getMetadata("design:type", target, key);
        Reflect.getMetadata('requires', target.constructor).push({ type: type, key: key, optional: false });
    };
}
exports.Require = Require;
function Optional() {
    return function (target, key) {
        if (!Reflect.hasMetadata('requires', target.constructor)) {
            Reflect.defineMetadata('requires', [], target.constructor);
        }
        var type = Reflect.getMetadata("design:type", target, key);
        Reflect.getMetadata('requires', target.constructor).push({ type: type, key: key, optional: true });
    };
}
exports.Optional = Optional;
var Agent = /** @class */ (function () {
    function Agent(object) {
        this.name = object.name;
        this.version = object.version;
    }
    __decorate([
        Require(),
        __metadata("design:type", String)
    ], Agent.prototype, "name", void 0);
    __decorate([
        Require(),
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
        Require(),
        __metadata("design:type", Agent)
    ], AuthenticateRequest.prototype, "agent", void 0);
    __decorate([
        Require(),
        __metadata("design:type", String)
    ], AuthenticateRequest.prototype, "username", void 0);
    __decorate([
        Require(),
        __metadata("design:type", String)
    ], AuthenticateRequest.prototype, "password", void 0);
    __decorate([
        Optional(),
        __metadata("design:type", String)
    ], AuthenticateRequest.prototype, "clientToken", void 0);
    __decorate([
        Optional(),
        __metadata("design:type", String)
    ], AuthenticateRequest.prototype, "requestUser", void 0);
    return AuthenticateRequest;
}());
function validate(object, type, strict) {
    if (strict === void 0) { strict = true; }
    var requires = Reflect.getMetadata('requires', type);
    if (!requires)
        return;
    var keys = Object.keys(object);
    console.log(keys);
    for (var _i = 0, requires_1 = requires; _i < requires_1.length; _i++) {
        var e = requires_1[_i];
        var key = e.key, type_1 = e.type, optional = e.optional;
        if (object[key] === undefined) {
            if (!optional)
                throw new Error("Missing required field " + key);
            else
                continue;
        }
        keys.splice(keys.indexOf(e.key), 1);
        var actualType = typeof (object[key]); //typeof object[key]
        if (actualType === 'object')
            validate(object[key], type_1, strict);
        else if (Object.getPrototypeOf(object[key]).constructor !== type_1) {
            throw new Error("Type mismatch " + key + ": expect " + Object.getPrototypeOf(object[key]).constructor + ", actual " + type_1);
        }
    }
    console.log(keys);
    if (strict && keys.length !== 0)
        throw new Error('Redundent properties exist!');
}
function parseBody(body, type) {
    validate(body, type.prototype.constructor, true);
    return new type(body);
}
var a = parseBody({ username: 'asd', agent: { name: 'a', version: 0 }, password: '', a: 2 }, AuthenticateRequest);
console.log(a);
function create(db, middleware) {
    var app = express_1.default();
    app.use(express_1.default.json());
    app.post('/authenticate', function (req, resp) {
        console.log(req.body);
        var payload = req.body;
        if (!payload.agent.name || !payload.agent.version || !payload.username || !payload.password) {
            var err = {
                "error": "Unsupported Media Type",
                "errorMessage": "The server is refusing to service the request because the entity of the request is in a format not supported by the requested resource for the requested method	",
            };
            resp.status(301);
            resp.send(err);
        }
        db.findUserByName(payload.username)
            .then(function (user) {
            resp.status(200);
        })
            .catch(function (err) {
        });
        resp.send({
            "accessToken": "random access token",
            "clientToken": "client identifier",
            "availableProfiles": [
                {
                    "id": "profile identifier",
                    "name": "player name",
                    "legacy": false // In practice, this field only appears in the response if true. Default to false.
                }
            ],
            "selectedProfile": {
                "id": "uuid without dashes",
                "name": "player name",
                "legacy": false
            },
            "user": {
                "id": "user identifier",
                "properties": [
                    {
                        "name": "preferredLanguage",
                        "value": "en" // Java locale format (https://docs.oracle.com/javase/8/docs/api/java/util/Locale.html#toString--)
                    },
                    {
                        "name": "twitch_access_token",
                        "value": "twitch oauth token" // OAuth 2.0 Token; alphanumerical; e.g. https://api.twitch.tv/kraken?oauth_token=[...]
                        // the Twitch API is documented here: https://github.com/justintv/Twitch-API
                    }
                ]
            }
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
__export(require("./user"));
//# sourceMappingURL=index.js.map