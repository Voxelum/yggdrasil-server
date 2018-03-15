"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var MemoryUserDB = /** @class */ (function () {
    function MemoryUserDB(map) {
        this.map = map;
    }
    MemoryUserDB.prototype.findUserByName = function (username) {
        var _this = this;
        return Promise.resolve(Object.keys(this.map).map(function (id) { return _this.map[id]; })[0]);
    };
    MemoryUserDB.prototype.findUserById = function (id) {
        return Promise.resolve(this.map[id]);
    };
    return MemoryUserDB;
}());
exports.MemoryUserDB = MemoryUserDB;
var FileUserDB = /** @class */ (function () {
    function FileUserDB(rootFolder) {
        this.rootFolder = rootFolder;
    }
    FileUserDB.prototype.findUserByName = function (username) {
        throw new Error("Method not implemented.");
    };
    FileUserDB.prototype.findUserById = function (id) {
        throw new Error("Method not implemented.");
    };
    return FileUserDB;
}());
exports.FileUserDB = FileUserDB;
//# sourceMappingURL=db.js.map