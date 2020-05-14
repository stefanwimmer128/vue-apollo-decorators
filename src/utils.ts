import {
    Many,
} from "./types";

export function extend<T, S>(target: T, source: S): T & S;
export function extend(target: any, ...sources: any) {
    for (let i = 0; i < sources.length; i++)
        for (const key in sources[i])
            if (Object.prototype.hasOwnProperty.call(sources[i], key))
                target[key] = sources[i][key];
    return target;
}

export function merge<T>(target: T[], ...sources: Many<T>[]): T[] {
    for (let i = 0; i < sources.length; i++)
        target.concat(sources[i]);
    return target;
}
