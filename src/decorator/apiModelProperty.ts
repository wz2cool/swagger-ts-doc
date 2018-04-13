import { ApiModelCache } from "../cache";
import { CommonHelper } from "../helper";
import { ApiPropertyInfo, DataType } from "../model";

export function apiModelProperty(dataType: DataType, required: boolean);
// tslint:disable-next-line:unified-signatures
export function apiModelProperty(dataType: DataType, required: boolean, refModel: { new(): any } | DataType);
// tslint:disable-next-line:unified-signatures
export function apiModelProperty(dataType: DataType, required: boolean, notes: string);
export function apiModelProperty(dataType: DataType, required: boolean, a1?, a2?) {
    const cache = ApiModelCache.getInstance();
    return (target: any, propertyKey: string) => {
        if (CommonHelper.isNullOrUndefined(target)
            || CommonHelper.isNullOrUndefined(target.constructor)
            || CommonHelper.isNullOrUndefined(target.constructor.name)) {
            throw new Error("cannot find model from target.constructor.name");
        }

        let internalRefModel: { new(): any } = null;
        let propertyNotes: string;
        if (typeof a1 === "function" || Number.isInteger(a1)) {
            internalRefModel = a1;
        } else if (typeof a1 === "string") {
            propertyNotes = a1;
        }

        if (typeof a2 === "string") {
            propertyNotes = a2;
        }

        const propertyInfo = new ApiPropertyInfo();
        propertyInfo.modelName = target.constructor.name;
        propertyInfo.propertyName = propertyKey;
        propertyInfo.dataType = dataType;
        propertyInfo.required = required;
        propertyInfo.notes = propertyNotes;
        propertyInfo.refModel = internalRefModel;
        cache.cachePropertyInfo(propertyInfo);
    };
}
