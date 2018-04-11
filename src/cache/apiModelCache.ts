import * as lodash from "lodash";
import { CommonHelper } from "../helper";
import { ApiPropertyInfo } from "../model";

export class ApiModelCache {
    public static getInstance() {
        return this.instance;
    }

    private static instance = new ApiModelCache();
    private readonly propertyCache: { [modelName: string]: { [property: string]: ApiPropertyInfo } } = {};
    private constructor() {
        // hide constructor
    }

    public cachePropertyInfo(propertyInfo: ApiPropertyInfo): void {
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

    public getModelInfos(modleName: string): ApiPropertyInfo[] {
        const propMap = this.propertyCache[modleName];
        if (CommonHelper.isNullOrUndefined(propMap)) {
            return [];
        }
        return lodash.values(propMap);
    }
}
