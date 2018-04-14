import { DataType } from "./dataType";
import { HttpStatusCode } from "./httpStatusCode";

export class Response {
    public code: HttpStatusCode;
    public dataType: DataType;
    public refModel: { new(): any } | DataType;
    public description: string;

    constructor(code: HttpStatusCode, dataType: DataType)
    // tslint:disable-next-line:unified-signatures
    constructor(code: HttpStatusCode, dataType: DataType, refModel: { new(): any } | DataType);
    // tslint:disable-next-line:unified-signatures
    constructor(code: HttpStatusCode, dataType: DataType, description: string);
    // tslint:disable-next-line:unified-signatures
    constructor(code: HttpStatusCode, dataType: DataType, refModel: { new(): any } | DataType, description: string)
    constructor(code: HttpStatusCode, dataType: DataType, a1?, a2?) {
        this.dataType = dataType;
        this.code = code;
        if (typeof a1 === "string") {
            this.description = a1;
        } else if (typeof a1 === "function" || Number.isInteger(a1)) {
            this.refModel = a1;
            this.description = a2;
        }
    }
}
