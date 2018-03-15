"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var _1 = require(".");
var db_1 = require("./db");
var password_1 = require("./password");
var tokens_1 = require("./tokens");
_1.create(new db_1.MemoryUserDB({
    ci010: {
        id: 'awduaiwh',
        username: 'ci010',
        password: 'pass',
        availableProfiles: [{ id: 'first', name: 'ci010' }],
        properties: {},
    }
}), new tokens_1.SimpleAccessTokenServer(), new password_1.None())
    .listen(8080, function () {
    console.log('server started');
});
//# sourceMappingURL=test.server.js.map