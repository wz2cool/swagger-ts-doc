import { dtoField } from "tsbatis";
import { ApiModelProperty, DataType } from "../../src";

export class Student {
  // @apiModelProperty(DataType.INTEGER, false)
  @ApiModelProperty({
    dataType: DataType.INTEGER
  })
  @dtoField()
  public id: number;
  //   @apiModelProperty(DataType.STRING, true)
  @ApiModelProperty({
    dataType: DataType.STRING,
    required: true
  })
  @dtoField()
  public name: string;
  //   @apiModelProperty(DataType.INTEGER, true)
  @ApiModelProperty({
    dataType: DataType.INTEGER,
    required: true
  })
  @dtoField()
  public age: number;
  //   @apiModelProperty(DataType.STRING, false, "test")
  @ApiModelProperty({
    dataType: DataType.STRING,
    description: "test"
  })
  @dtoField()
  public note: string;
}
