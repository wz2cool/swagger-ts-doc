import { DataType } from "./dataType";

export class Response {
    public dataType: DataType;
    public refModel: { new(): any } | DataType;
    public description: string;

    constructor(dataType: DataType)
    // tslint:disable-next-line:unified-signatures
    constructor(dataType: DataType, refModel: { new(): any } | DataType);
    // tslint:disable-next-line:unified-signatures
    constructor(dataType: DataType, description: string);
    // tslint:disable-next-line:unified-signatures
    constructor(dataType: DataType, refModel: { new(): any } | DataType, description: string)
    constructor(dataType: DataType, a1?, a2?) {
        this.dataType = dataType;
        if (typeof a1 === "string") {
            this.description = a1;
        } else if (typeof a1 === "function" || Number.isInteger(a1)) {
            this.refModel = a1;
            this.description = a2;
        }
    }
}
