import { RequestMethod } from "../model";

export function registerRequestMapping(method: (...args: any[]) => any) {
    method("swagger");
}
