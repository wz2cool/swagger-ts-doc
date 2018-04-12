import { apiModelProperty, DataTypes } from "../../src";

export class Student {
    @apiModelProperty(DataTypes.string, true)
    public name: string;
    @apiModelProperty(DataTypes.integer, true)
    public age: number;
    @apiModelProperty(DataTypes.string, "test")
    public note: string;
}