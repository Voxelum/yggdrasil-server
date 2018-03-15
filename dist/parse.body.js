"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function validate(object, type, strict) {
    if (strict === void 0) { strict = true; }
    var requires = Reflect.getMetadata('requires', type);
    if (!requires)
        return;
    var keys = Object.keys(object);
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
    if (strict && keys.length !== 0)
        throw new Error('Redundent properties exist!');
}
function parse(body, type) {
    try {
        validate(body, type.prototype.constructor, true);
    }
    catch (e) {
        return undefined;
    }
    return new type(body);
}
exports.parse = parse;
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
//# sourceMappingURL=parse.body.js.map