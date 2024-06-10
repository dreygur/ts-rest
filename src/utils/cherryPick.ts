/**
 * Create an object composed of the cherry picked object properties
 * @param object 
 * @param keys 
 * @returns
 */
export default function (object: any, keys: string[]) {
    return keys.reduce((obj: any, key) => {
        if (obj && Object.prototype.hasOwnProperty.call(object, key)) {
            obj[key] = object[key];
        }
        return obj;
    }, {} as any);
}