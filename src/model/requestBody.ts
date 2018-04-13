import { DataType } from "./dataType";
import { RequestArgument } from "./requestArgument";

export class RequestBody extends RequestArgument {
    public refModel: { new(): any };

    constructor(name: string, dataType: DataType);
    // tslint:disable-next-line:unified-signatures
    constructor(name: string, dataType: DataType, refModel: { new(): any });
    // tslint:disable-next-line:unified-signatures
    constructor(name: string, dataType: DataType, description: string);
    // tslint:disable-next-line:unified-signatures
    constructor(name: string, dataType: DataType, refModel: { new(): any }, description: string)
    constructor(name: string, dataType: DataType, a1?, a2?) {
        if (typeof a1 === "string") {
            super(name, dataType, a1);
        } else if (typeof a1 === "function") {
            super(name, dataType, a2);
            this.refModel = a1;
        }
    }
}
