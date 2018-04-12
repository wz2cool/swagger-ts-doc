import { RequestArgument } from "./requestArgument";
import { RequestMethod } from "./requestMethod";

export class RequestMappingInfo {
    public unqiueKey: string;
    public path: string;
    public method: RequestMethod;
    public requestArguments: RequestArgument[];

}
