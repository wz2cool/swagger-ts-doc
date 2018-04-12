import * as lodash from "lodash";
import { CommonHelper } from "../helper";
import { RequestMappingInfo } from "../model";

export class RequestMappingCache {
    public static getInstance() {
        return this.instance;
    }

    private static instance = new RequestMappingCache();
    private readonly requestMappingCache: { [unqiueKey: string]: RequestMappingInfo } = {};
    private constructor() {
        // hide constructor
    }

    public cacheRequestMappingInfo(requestMappingInfo: RequestMappingInfo): void {
        const unqiueKey = requestMappingInfo.unqiueKey;
        this.requestMappingCache[unqiueKey] = requestMappingInfo;
    }

    public getRequestMappingInfos(): RequestMappingInfo[] {
        return lodash.values(this.requestMappingCache);
    }
}
