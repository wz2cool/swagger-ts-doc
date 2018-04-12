import { DataType } from ".";

export abstract class RequestArgument {
    public name: string;
    public dataType: DataType;

    constructor(name: string, dataType: DataType) {
        this.name = name;
        this.dataType = dataType;
    }
}
