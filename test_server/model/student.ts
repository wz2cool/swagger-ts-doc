import { apiModelProperty, DataType } from "../../src";

export class Student {
    @apiModelProperty(DataType.string, true)
    public name: string;
    @apiModelProperty(DataType.integer, true)
    public age: number;
    @apiModelProperty(DataType.string, "test")
    public note: string;
}