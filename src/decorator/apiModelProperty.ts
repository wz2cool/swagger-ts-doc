import { ApiModelCache } from "../cache";
import { CommonHelper } from "../helper";
import { ApiPropertyInfo, DataTypes } from "../model";

export function ApiModelProperty(dataType: DataTypes);
// tslint:disable-next-line:unified-signatures
export function ApiModelProperty(dataType: DataTypes, required: boolean);
// tslint:disable-next-line:unified-signatures
export function ApiModelProperty(dataType: DataTypes, notes: string);
export function ApiModelProperty(dataType: DataTypes, a1?, a2?) {
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

        const propertyInfo = new ApiPropertyInfo();
        propertyInfo.modelName = target.constructor.name;
        propertyInfo.propertyName = propertyKey;
        propertyInfo.dataType = DataTypes[dataType];
        propertyInfo.required = propertyRequired;
        propertyInfo.notes = propertyNotes;
        cache.cachePropertyInfo(propertyInfo);
    };
}
