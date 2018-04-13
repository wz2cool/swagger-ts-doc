import { apiModelProperty, DataType } from "../../src";
import { Student } from "./student";

export class Classroom {
    @apiModelProperty(DataType.integer, false)
    public id: number;
    @apiModelProperty(DataType.string, true)
    public name: string;
    @apiModelProperty(DataType.array, true)
    public students: Student[];
}
