import * as lodash from "lodash";
import { PropertyInfo } from "../model";
import { CommonHelper } from "../helper";

export class ApiModelCache {
    public static getInstance() {
        return this.instance;
    }

    private static instance = new ApiModelCache();
    private readonly propertyCache: { [modelName: string]: { [property: string]: PropertyInfo } } = {};
    private constructor() {
        // hide constructor
    }

    public cachePropertyInfo(propertyInfo: PropertyInfo): void {
        const modelName = propertyInfo.modelName;
        const propertyName = propertyInfo.propertyName;
        let propMap = this.propertyCache[modelName];
        if (CommonHelper.isNullOrUndefined(propMap)) {
            propMap = {};
            propMap[propertyName] = propertyInfo;
            this.propertyCache[modelName] = propMap;
        } else {
            propMap[propertyName] = propertyInfo;
        }
    }

    public getModelInfos(modleName: string): PropertyInfo[] {
        const propMap = this.propertyCache[modleName];
        if (CommonHelper.isNullOrUndefined(propMap)) {
            return [];
        }
        return lodash.values(propMap);
    }
}