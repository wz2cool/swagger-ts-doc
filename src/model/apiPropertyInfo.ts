import { DataType } from "../model";

export class ApiPropertyInfo {
    public modelName: string;
    public propertyName: string;
    public dataType: DataType;
    public required: boolean;
    public description: string;
    public refModel: { new(): any } | DataType;
}
