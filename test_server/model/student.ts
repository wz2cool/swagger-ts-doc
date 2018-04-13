import { dtoField } from "tsbatis";
import { apiModelProperty, DataType } from "../../src";

export class Student {
    @apiModelProperty(DataType.integer, false)
    @dtoField()
    public id: number;
    @apiModelProperty(DataType.string, true)
    @dtoField()
    public name: string;
    @apiModelProperty(DataType.integer, true)
    @dtoField()
    public age: number;
    @apiModelProperty(DataType.string, false, "test")
    @dtoField()
    public note: string;
}