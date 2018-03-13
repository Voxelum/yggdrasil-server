"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http_1 = require("http");
var req = http_1.request({
    host: "localhost",
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    path: "/authenticate",
    port: 8080,
}, (function (res) {
    res.on('data', function (s) {
        console.log(s.toString());
    });
}));
req.write(JSON.stringify({
    "agent": {
        // "name": "Minecraft",                // For Mojang's other game Scrolls, "Scrolls" should be used
        "version": 1 // This number might be increased
        // by the vanilla client in the future
    },
    // "username": "mojang account name",      // Can be an email address or player name for
    // unmigrated accounts
    "password": "mojang account password",
    "clientToken": "client identifier",
    "requestUser": true // optional; default: false; true adds the user object to the response
}));
req.end();
//# sourceMappingURL=test.js.map