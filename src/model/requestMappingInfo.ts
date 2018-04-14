import { RequestMethod } from "./requestMethod";
import { RequestParameter } from "./requestParameter";
import { Response } from "./response";

export class RequestMappingInfo {
    public unqiueKey: string;
    public tag: string;
    public path: string;
    public method: RequestMethod;
    public requestParameter: RequestParameter[];
    public response: Response;
    public summary: string;
}
