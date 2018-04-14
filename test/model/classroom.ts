import { apiModelProperty, DataType } from "../../src";
import { Student } from "./student";

export class Classroom {
    @apiModelProperty(DataType.integer, false, "班级ID")
    public id: number;
    @apiModelProperty(DataType.string, true, "班级名称")
    public name: string;
    @apiModelProperty(DataType.array, true, Student, "学生")
    public students: Student[];
    @apiModelProperty(DataType.array, true, DataType.string, "班级标记")
    public tags: string[];
}
