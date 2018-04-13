import { DataType } from "./dataType";

export class ResponseBody {
    public name: string;
    public dataType: DataType;
    public refModel: { new(): any };

    constructor(name: string, dataType: DataType, refModel?: { new(): any }) {
        this.name = name;
        this.dataType = dataType;
        this.refModel = refModel;
    }
}
