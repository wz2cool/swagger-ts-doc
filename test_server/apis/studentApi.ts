import * as express from "express";
import { MappingProvider } from "tsbatis";
import {
    DataType,
    PathVariable,
    registerRequestMapping,
    RequestBody,
    requestMapping,
    RequestMethod,
    RequestParam,
} from "../../src";
import { ApiModelCache } from "../../src/cache";
import { Student } from "../model/student";

export class StudentApi {
    private students: Student[];
    constructor() {
        this.students = [];
    }

    public getRoute(): express.Router {
        const route = express.Router();

        route.post("/", (req, res, next) => {
            const input = MappingProvider.toDtoObject<Student>(Student, req.body);
            console.log("result", JSON.stringify(input));
            const a = this.students;
            this.addStudent(input);
            res.json("");
        });

        route.post("/:id", (req, res, next) => {
            const groupId = req.params.id;
            console.log("groupId", groupId);
            this.deleteStudent(groupId);
            res.json("");
        });


        registerRequestMapping(this.addStudent);
        registerRequestMapping(this.deleteStudent);
        registerRequestMapping(this.modifyStudent);
        registerRequestMapping(this.getStudents);
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
