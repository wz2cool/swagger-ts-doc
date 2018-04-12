import { CommonHelper } from "../helper";
import { DataType } from "./dataType";
import { RequestArgument } from "./requestArgument";

export class RequestParam extends RequestArgument {
    public required: boolean;

    constructor(name: string, dataType: DataType, required?: boolean) {
        super(name, dataType);
        this.required = CommonHelper.isNullOrUndefined(required) ? false : required;
    }
}
