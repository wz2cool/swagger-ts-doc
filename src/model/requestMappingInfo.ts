import { RequestMethod } from "./requestMethod";
import { RequestParameter } from "./requestParameter";
import { Response } from "./response";

export class RequestMappingInfo {
    public unqiueKey: string;
    public tag: string;
    public path: string;
    public method: RequestMethod;
    public requestParameters: RequestParameter[];
    public responses: Response[];
    public summary: string;
}
