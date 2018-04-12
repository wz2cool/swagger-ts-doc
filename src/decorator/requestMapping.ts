import { RequestArgument, RequestMethod } from "../model";

export function requestMapping(path: string, method: RequestMethod, requestArguments: RequestArgument[]) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        const originalMethod = descriptor.value;
        descriptor.value = (...args: any[]) => {
            console.log(`path: ${path}`);
            if (args.length === 1 && args[0] === "swagger") {
                // save method
                return null;
            }

            const result = originalMethod.apply(this, args);
            return result;
        };
        return descriptor;
    };
}
