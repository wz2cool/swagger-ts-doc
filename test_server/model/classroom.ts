import { ApiModelProperty, DataType } from "../../src";
import { Student } from "./student";

export class Classroom {
  // @ApiModelProperty(DataType.INTEGER, false, "班级ID")
  @ApiModelProperty({ dataType: DataType.INTEGER, description: "班级ID" })
  public id: number;
  // @ApiModelProperty(DataType.STRING, true, "班级名称")
  @ApiModelProperty({
    dataType: DataType.STRING,
    description: "班级名称",
    required: true
  })
  public name: string;
  // @ApiModelProperty(DataType.ARRAY, true, Student, "学生")
  @ApiModelProperty({
    dataType: DataType.ARRAY,
    required: true,
    // tslint:disable-next-line:object-literal-sort-keys
    refModel: Student,
    description: "学生"
  })
  public students: Student[];
  // @ApiModelProperty(DataType.ARRAY, true, DataType.STRING, "班级标记")
  @ApiModelProperty({
    dataType: DataType.ARRAY,
    required: true,
    // tslint:disable-next-line:object-literal-sort-keys
    refModel: DataType.STRING,
    description: "班级标记"
  })
  public tags: string[];
}
