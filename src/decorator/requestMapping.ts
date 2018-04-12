import * as lodash from "lodash";
import { RequestMappingCache } from "../cache";
import { CommonHelper } from "../helper";
import { RequestArgument, RequestMappingInfo, RequestMethod } from "../model";

export function requestMapping(path: string, method: RequestMethod, requestArguments: RequestArgument[]) {
    const cache = RequestMappingCache.getInstance();
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        const originalMethod = descriptor.value;
        descriptor.value = (...args: any[]) => {
            if (args.length === 1 && args[0] === "swagger") {
                const requestMappingInfo = new RequestMappingInfo();
                requestMappingInfo.unqiueKey = generateUniqueKey(path, method, requestArguments);
                requestMappingInfo.path = path;
                requestMappingInfo.method = method;
                cache.cacheRequestMappingInfo(requestMappingInfo);
                // save method
                return null;
            }
            const result = originalMethod.apply(this, args);
            return result;
        };
        return descriptor;
    };
}

function generateUniqueKey(path: string, method: RequestMethod, requestArguments: RequestArgument[]): string {
    const methodStr = RequestMethod[method];
    let requestArgumentStr: string;
    if (CommonHelper.isNullOrUndefined(requestArguments)) {
        requestArgumentStr = "";
    } else {
        const argNames = lodash.map(requestArguments, (x) => x.name);
        requestArgumentStr = lodash.join(argNames, "-");
    }

    return `path:${path}_method:${methodStr}_arg:${requestArgumentStr}`;
}
