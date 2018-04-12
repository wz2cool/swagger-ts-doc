import { RequestArgument, RequestMethod } from "../model";

export function requestMapping(path: string, method: RequestMethod, requestArguments: RequestArgument[]) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        const originalMethod = descriptor.value;
        descriptor.value = (...args: any[]) => {
            if (args.length === 1 && args[0] === "swagger") {
                console.log("target: " + JSON.stringify(target));
                console.log("propertyKey: " + propertyKey);

                // save method
                return null;
            }
            const result = originalMethod.apply(this, args);
            return result;
        };
        return descriptor;
    };
}
