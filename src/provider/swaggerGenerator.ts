import * as lodash from "lodash";
import { ApiPropertyInfo, DataType } from "../model";

export class SwaggerGenerator {
    public static generateJsonDocument(): string {
        return "";
    }

    public static generateDefinitions(
        propertyCache: { [modelName: string]: { [property: string]: ApiPropertyInfo } }): any {
        const result = {};
        for (const modelName in propertyCache) {
            if (propertyCache.hasOwnProperty(modelName)) {
                const propertyMap = propertyCache[modelName];
                const apiPropertyInfos = lodash.values(propertyMap);
                result[modelName] = SwaggerGenerator.generateModelDefinition(apiPropertyInfos);
            }
        }
        return result;
    }

    public static generateModelDefinition(apiPropertyInfos: ApiPropertyInfo[]): any {
        const required: string[] = [];
        const properties: any[] = [];

        for (const apiPropertyInfo of apiPropertyInfos) {
            const propertyName = apiPropertyInfo.propertyName;
            if (apiPropertyInfo.required) {
                required.push(propertyName);
            }
            const propDef: any = {};
            const propTypeDef: any = {};
            propTypeDef.type = apiPropertyInfo.dataType;
            propDef[propertyName] = propTypeDef;
            properties.push(propDef);
        }

        const modelDef: any = {};
        modelDef.type = "object";
        modelDef.required = required;
        modelDef.properties = properties;
        return modelDef;
    }
}
