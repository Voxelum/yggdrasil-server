
export interface Type<T> extends Function {
    new(body: any): T;
}

function validate(object: any, type: any, strict: boolean = true) {
    const requires = Reflect.getMetadata('requires', type);
    if (!requires) return;

    const keys = Object.keys(object);
    for (const e of requires) {
        const { key, type, optional } = e;
        if (object[key] === undefined) {
            if (!optional) throw new Error(`Missing required field ${key}`);
            else continue;
        }
        keys.splice(keys.indexOf(e.key), 1)
        const actualType = typeof (object[key]); //typeof object[key]
        if (actualType === 'object') validate(object[key], type, strict);
        else if (Object.getPrototypeOf(object[key]).constructor !== type) {
            throw new Error(`Type mismatch ${key}: expect ${Object.getPrototypeOf(object[key]).constructor}, actual ${type}`);
        }
    }
    if (strict && keys.length !== 0) throw new Error('Redundent properties exist!')
}
export function parse<T>(body: any, type: Type<T>) {
    try {
        validate(body, type.prototype.constructor, true);
    } catch (e) {
        return undefined;
    }
    return new type(body);
}


export function Require() {
    return (target: any, key: string) => {
        if (!Reflect.hasMetadata('requires', target.constructor)) {
            Reflect.defineMetadata('requires', [], target.constructor)
        }
        const type = Reflect.getMetadata("design:type", target, key);
        Reflect.getMetadata('requires', target.constructor).push({ type, key, optional: false });
    }
}
export function Optional() {
    return (target: any, key: string) => {
        if (!Reflect.hasMetadata('requires', target.constructor)) {
            Reflect.defineMetadata('requires', [], target.constructor)
        }
        const type = Reflect.getMetadata("design:type", target, key);
        Reflect.getMetadata('requires', target.constructor).push({ type, key, optional: true });
    }
}