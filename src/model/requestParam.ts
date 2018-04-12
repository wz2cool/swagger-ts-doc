import { DataType, RequestArgument } from ".";
import { CommonHelper } from "../helper";

export class RequestParam extends RequestArgument {
    public required: boolean;

    constructor(name: string, dataType: DataType, required?: boolean) {
        super(name, dataType);
        this.required = CommonHelper.isNullOrUndefined(required) ? false : required;
    }
}
