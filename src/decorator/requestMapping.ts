export function requestMapping(path: string) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        const originalMethod = descriptor.value;

        descriptor.value = (...args: any[]) => {
            // pre
            console.log("The method args are: " + JSON.stringify(args));
            // run and store result
            const result = originalMethod.apply(this, args);
            // post
            console.log("The return value is: " + result);
            // return the result of the original method (or modify it before returning)
            return result;
        };

        return descriptor;
    };
}
