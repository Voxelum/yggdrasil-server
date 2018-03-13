"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var uuid_1 = require("uuid");
var app = express_1.default();
app.use(express_1.default.json());
console.log(uuid_1.v4());
console.log(uuid_1.v4().replace(/-/g, ''));
app.post('/authenticate', function (req, resp, next) {
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
app.listen(8080, function () {
    console.log('Server Start.');
});
//# sourceMappingURL=index.js.map