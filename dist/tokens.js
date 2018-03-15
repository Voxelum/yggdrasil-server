"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uuid_1 = require("uuid");
var SimpleAccessTokenServer = /** @class */ (function () {
    function SimpleAccessTokenServer() {
        this.tokenMap = {};
    }
    SimpleAccessTokenServer.prototype.grant = function (user, clientToken) {
        var token = {
            accessToken: uuid_1.v4().replace(/ /g, ''),
            clientToken: clientToken,
            userId: user.id,
            selectedProfile: user.availableProfiles[0].id,
        };
        this.tokenMap[token.accessToken] = token;
        return Promise.resolve(token);
    };
    SimpleAccessTokenServer.prototype.validate = function (accessToken, clientToken) {
        var token = this.tokenMap[accessToken];
        if (!token || (clientToken && token.clientToken !== token.clientToken))
            return Promise.resolve(undefined);
        return Promise.resolve(token);
    };
    SimpleAccessTokenServer.prototype.invalidate = function (accessToken, clientToken) {
        delete this.tokenMap[accessToken];
        return Promise.resolve();
    };
    SimpleAccessTokenServer.prototype.invalidateUser = function (userId) {
        var _this = this;
        Object.keys(this.tokenMap)
            .filter(function (t) { return _this.tokenMap[t].userId === userId; })
            .forEach(function (t) { return delete _this.tokenMap[t]; });
        return Promise.resolve();
    };
    return SimpleAccessTokenServer;
}());
exports.SimpleAccessTokenServer = SimpleAccessTokenServer;
//# sourceMappingURL=tokens.js.map