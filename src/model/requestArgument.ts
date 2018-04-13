import { DataType } from "./dataType";

export abstract class RequestArgument {
    public name: string;
    public dataType: DataType;
    public description: string;

    constructor(name: string, dataType: DataType, description: string) {
        this.name = name;
        this.dataType = dataType;
        this.description = description;
    }
}
