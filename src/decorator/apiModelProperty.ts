import { ApiModelCache } from "../cache";
import { CommonHelper } from "../helper";
import "reflect-metadata";
import { PropertyInfo } from "../model";

export function ApiModelProperty(required: boolean);
export function ApiModelProperty(notes: string);
export function ApiModelProperty(required: boolean, notes: string)
export function ApiModelProperty(a1?, a2?) {
    const cache = ApiModelCache.getInstance();
    return (target: any, propertyKey: string) => {
        if (CommonHelper.isNullOrUndefined(target)
            || CommonHelper.isNullOrUndefined(target.constructor)
            || CommonHelper.isNullOrUndefined(target.constructor.name)) {
            throw new Error("cannot find model from target.constructor.name");
        }

        let propertyRequired: boolean = false;
        let propertyNotes: string;
        if (typeof a1 === "boolean") {
            propertyRequired = a1;
        } else if (typeof a1 === "string") {
            propertyNotes = a1;
        }

        if (typeof a2 === "string") {
            propertyNotes = a2;
        }

        const propertyInfo = new PropertyInfo();
        propertyInfo.modelName = target.constructor.name;
        propertyInfo.propertyName = propertyKey;
        propertyInfo.propertyType = Reflect.getMetadata("design:type", target, propertyKey);
        propertyInfo.required = propertyRequired;
        propertyInfo.notes = propertyNotes;
        cache.cachePropertyInfo(propertyInfo);
    };
}