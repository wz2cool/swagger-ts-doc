export class CommonHelper {
    public static isNullOrUndefined(value: any): boolean {
        return value === null
            || typeof value === "undefined";
    }

    public static isBlank(value: string): boolean {
        return CommonHelper.isNullOrUndefined(value)
            || value.trim() === "";
    }

    public static isNotBlank(value: string): boolean {
        return !CommonHelper.isBlank(value);
    }

    public static isArray(value: any): boolean {
        const result = value instanceof Array;
        return result;
    }

    public static getModelName(o: new () => any): string {
        if (CommonHelper.isNullOrUndefined(o)) {
            return "";
        }

        const testObj = typeof o === "function" ? new o() : o;
        return (testObj.constructor as any).name;
    }

    private constructor() {
        // hide constructor
    }
}
