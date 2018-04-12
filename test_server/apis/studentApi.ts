import * as express from "express";
import { DataType, log, RequestBody, requestMapping, RequestMethod, RequestParam, PathVariable } from "../../src";
import { ApiModelCache } from "../../src/cache";
import { Student } from "../model/student";

export class StudentApi {
    private students: Student[] = [];

    public getRoute(): express.Router {
        const route = express.Router();

        route.post("/student", (req, res, next) => {
            const props = ApiModelCache.getInstance().getModelInfos("Student");
            this.addStudent(null);
            res.json(props);
        });

        return route;
    }

    @requestMapping("/students", RequestMethod.POST, [
        new RequestBody("student", DataType.object, Student),
    ])
    public addStudent(newOne: Student): void {
        this.students.push(newOne);
    }

    @requestMapping("/students/{id}", RequestMethod.DELETE, [
        new PathVariable("id", DataType.integer),
    ])
    public deleteStudent(id: number): void {
        //
    }

    @requestMapping("/students/{id}", RequestMethod.PUT, [
        new PathVariable("id", DataType.integer),
        new RequestBody("student", DataType.object, Student),
    ])
    public modifyStudent(s: Student): void {

    }

    @requestMapping("/students", RequestMethod.GET, [])
    public getStudents(): void {

    }
}
