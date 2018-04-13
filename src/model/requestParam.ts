import { CommonHelper } from "../helper";
import { DataType } from "./dataType";
import { RequestArgument } from "./requestArgument";

export class RequestParam extends RequestArgument {
    public required: boolean;

    constructor(name: string, dataType: DataType);
    // tslint:disable-next-line:unified-signatures
    constructor(name: string, dataType: DataType, required: boolean);
    // tslint:disable-next-line:unified-signatures
    constructor(name: string, dataType: DataType, description: string);
    // tslint:disable-next-line:unified-signatures
    constructor(name: string, dataType: DataType, required: boolean, description: string)
    constructor(name: string, dataType: DataType, a1?, a2?) {
        if (typeof a1 === "string") {
            super(name, dataType, a1);
        } else if (typeof a1 === "boolean") {
            super(name, dataType, a2);
            this.required = a1;
        }

        if (CommonHelper.isNullOrUndefined(a1)) {
            this.required = false;
        }
    }
}
