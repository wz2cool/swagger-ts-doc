import { RequestMethod } from "./requestMethod";
import { RequestParameter } from "./requestParameter";
import { ResponseBody } from "./responseBody";

export class RequestMappingInfo {
    public unqiueKey: string;
    public tag: string;
    public path: string;
    public method: RequestMethod;
    public requestArguments: RequestParameter[];
    public responseBody: ResponseBody;
    public summary: string;
}
