export function requestMapping(path: string) {
    return (target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<any>) => {
        const originalMethod = descriptor.value;

        descriptor.value = (...args: any[]) => {
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
