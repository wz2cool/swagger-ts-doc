import { CommonHelper } from "../helper";
import { DataType } from "./dataType";
import { RequestArgument } from "./requestArgument";

export class RequestParam extends RequestArgument {
    public required: boolean;

    constructor(name: string, dataType: DataType, description: string, required?: boolean) {
        super(name, dataType, description);
        this.required = CommonHelper.isNullOrUndefined(required) ? false : required;
    }
}
