import * as lodash from "lodash";
import { CommonHelper } from "../helper";
import {
    ApiPropertyInfo,
    DataType,
    PathVariable,
    RequestArgument,
    RequestBody,
    RequestMappingInfo,
    RequestMethod,
    RequestParam,
} from "../model";

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

    public static generatePaths(requestMappingInfos: RequestMappingInfo[]): any {
        const pathGroup = lodash.groupBy(requestMappingInfos, "path");
        const result: any = {};
        for (const key in pathGroup) {
            if (pathGroup.hasOwnProperty(key)) {
                const pathDef: any = {};
                const groupRequestMappingInfos = pathGroup[key];
                for (const requestMappingInfo of groupRequestMappingInfos) {
                    const tags: string[] = [requestMappingInfo.tag];
                    const consumes: string[] = ["application/json"];
                    const produces: string[] = ["application/json"];
                    const parameters: any[] = [];
                    const responses: any[] = [];

                    if (!CommonHelper.isNullOrUndefined(requestMappingInfo.requestArguments)) {
                        for (const requestArgument of requestMappingInfo.requestArguments) {
                            const parameter = SwaggerGenerator.generatePathParameter(requestArgument);
                            parameters.push(parameter);
                        }
                    }

                    const successResponse: any = {};
                    successResponse["200"] = { description: "OK" };
                    responses.push(successResponse);

                    const methodDef: any = {};
                    methodDef.tags = tags;
                    methodDef.consumes = consumes;
                    methodDef.produces = produces;
                    methodDef.parameters = parameters;
                    methodDef.responses = responses;
                    const requestMethod = RequestMethod[requestMappingInfo.method].toLowerCase();
                    pathDef[requestMethod] = methodDef;
                }
                result[key] = pathDef;
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

    public static generatePathParameter(requestArgument: RequestArgument): any {
        const result: any = {};
        if (requestArgument instanceof RequestBody) {
            result.in = "body";
            result.name = requestArgument.name;
            result.required = true;
            const refModel: any = {};
            const modelName = SwaggerGenerator.getModelName(requestArgument.objectBody);
            refModel.$ref = `#/definitions/${modelName}`;
            result.schema = refModel;
        } else if (requestArgument instanceof RequestParam) {
            result.in = "query";
            result.name = requestArgument.name;
            result.required = requestArgument.required;
            const typeDef: any = {};
            typeDef.type = requestArgument.dataType;
            result.schema = typeDef;
        } else if (requestArgument instanceof PathVariable) {
            result.in = "path";
            result.name = requestArgument.name;
            result.required = true;
            const typeDef: any = {};
            typeDef.type = requestArgument.dataType;
            result.schema = typeDef;
        }
        return result;
    }

    public static getModelName(o: { new(): any }): string {
        if (CommonHelper.isNullOrUndefined(o)) {
            return "";
        }

        const testObj = typeof o === "function" ? new o() : o;
        return (testObj.constructor as any).name;
    }
}
