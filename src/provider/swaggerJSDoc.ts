import { ApiModelCache, RequestMappingCache } from "../cache";
import { SwaggerHelper } from "../helper";
import { SwaggerOptions } from "../model";

export function swaggerJSDoc(options: SwaggerOptions): string {
    const apiModelCache = ApiModelCache.getInstance();
    const requestMappingCache = RequestMappingCache.getInstance();
    const definitions = SwaggerHelper.generateDefinitions(apiModelCache.getPropertyCache());
    const paths = SwaggerHelper.generatePaths(requestMappingCache.getRequestMappingInfos());

    const result: any = {};
    result.info = options.info;
    result.schemes = ["http", "https"];
    result.definitions = definitions;
    result.paths = paths;
    result.swagger = "2.0";
    return JSON.stringify(result);
}
