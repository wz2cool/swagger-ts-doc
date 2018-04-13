import { DataType } from "./dataType";

export class ResponseBody {
    public dataType: DataType;
    public refModel: { new(): any } | DataType;

    constructor(dataType: DataType, refModel?: { new(): any } | DataType) {
        this.dataType = dataType;
        this.refModel = refModel;
    }
}
