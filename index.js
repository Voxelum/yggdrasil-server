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
});
app.post('/refresh', function (req, resp) {
});
app.post('/validate', function (req, resp) {
});
app.post('/signout', function (req, resp) {
});
app.post('/invalidate', function (req, resp) {
});
console.log('app start');
app.listen(8080);
//# sourceMappingURL=index.js.map