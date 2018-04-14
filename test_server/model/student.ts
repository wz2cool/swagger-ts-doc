import { dtoField } from "tsbatis";
import { apiModelProperty, DataType } from "../../src";

export class Student {
    @apiModelProperty(DataType.INTEGER, false)
    @dtoField()
    public id: number;
    @apiModelProperty(DataType.STRING, true)
    @dtoField()
    public name: string;
    @apiModelProperty(DataType.INTEGER, true)
    @dtoField()
    public age: number;
    @apiModelProperty(DataType.STRING, false, "test")
    @dtoField()
    public note: string;
}