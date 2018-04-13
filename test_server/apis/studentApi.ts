import * as express from "express";
import * as lodash from "lodash";
import { MappingProvider } from "tsbatis";
import {
    DataType,
    PathVariable,
    registerRequestMapping,
    RequestBody,
    RequestMethod,
    RequestParam,
    ResponseBody,
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

        registerRequestMapping(StudentApi, "/students", RequestMethod.POST, [
            new RequestBody("student", DataType.object, Student),
        ], new ResponseBody(DataType.string));
        route.post("/", (req, res, next) => {
            const input = MappingProvider.toDtoObject<Student>(Student, req.body);
            console.log("result", JSON.stringify(input));
            const a = this.students;
            this.addStudent(input);
            res.json("");
        });

        registerRequestMapping(StudentApi, "/students/{id}", RequestMethod.DELETE, [
            new PathVariable("id", DataType.integer),
        ], new ResponseBody(DataType.string));
        route.delete("/:id", (req, res, next) => {
            const id = req.params.id;
            this.deleteStudent(id);
            res.json("");
        });

        registerRequestMapping(StudentApi, "/students/{id}", RequestMethod.PUT, [
            new PathVariable("id", DataType.integer),
            new RequestBody("student", DataType.object, Student),
        ], new ResponseBody(DataType.string));
        route.put("/:id", (req, res, next) => {
            const id = req.params.id;
            const input = MappingProvider.toDtoObject<Student>(Student, req.body);
            input.id = id;
            this.modifyStudent(input);
            res.json("");
        });

        registerRequestMapping(StudentApi, "/students", RequestMethod.GET, [], new ResponseBody(DataType.string));
        route.get("/", (req, res, next) => {
            res.json(this.getStudents());
        });

        return route;
    }

    public addStudent(newOne: Student): void {
        this.students.push(newOne);
    }

    public deleteStudent(id: number): void {
        this.students = lodash.remove(this.students, (x: Student) => {
            return x.id === id;
        });
    }

    public modifyStudent(s: Student): void {
        this.students = lodash.remove(this.students, (x: Student) => {
            return x.id === s.id;
        });
        this.students.push(s);
    }

    public getStudents(): Student[] {
        return this.students;
    }
}
