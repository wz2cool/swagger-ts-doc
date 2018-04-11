import { ApiModelProperty, DataTypes } from "../../src";

export class Student {
    @ApiModelProperty(DataTypes.string, true)
    public name: string;
    @ApiModelProperty(DataTypes.integer, true)
    public age: number;
    @ApiModelProperty(DataTypes.string, "test")
    public note: string;
}