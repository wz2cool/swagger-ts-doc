import { apiModelProperty, DataType } from "../../src";
import { Student } from "./student";

export class Classroom {
    @apiModelProperty(DataType.INTEGER, false, "班级ID")
    public id: number;
    @apiModelProperty(DataType.STRING, true, "班级名称")
    public name: string;
    @apiModelProperty(DataType.ARRAY, true, Student, "学生")
    public students: Student[];
    @apiModelProperty(DataType.ARRAY, true, DataType.STRING, "班级标记")
    public tags: string[];
}
