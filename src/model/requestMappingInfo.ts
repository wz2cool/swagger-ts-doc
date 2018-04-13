import { RequestArgument } from "./requestArgument";
import { RequestMethod } from "./requestMethod";
import { ResponseBody } from "./responseBody";

export class RequestMappingInfo {
    public unqiueKey: string;
    public tag: string;
    public path: string;
    public method: RequestMethod;
    public requestArguments: RequestArgument[];
    public responseBody: ResponseBody;
}
