import * as express from "express";
import * as lodash from "lodash";
import { MappingProvider } from "tsbatis";
import {
    DataType,
    HttpStatusCode,
    PathVariable,
    registerRequestMapping,
    RequestBody,
    RequestMethod,
    RequestParam,
    Response,
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

        registerRequestMapping(StudentApi, "/students", RequestMethod.POST,
            [
                new RequestBody("student", DataType.OBJECT, Student, "学生"),
            ],
            [
                new Response(HttpStatusCode.OK, DataType.STRING),
            ]);
        route.post("/", (req, res, next) => {
            const input = MappingProvider.toDtoObject<Student>(Student, req.body);
            console.log("result", JSON.stringify(input));
            const a = this.students;
            this.addStudent(input);
            res.json("");
        });

        registerRequestMapping(StudentApi, "/students/{id}", RequestMethod.DELETE, [
            new PathVariable("id", DataType.INTEGER, "学生ID"),
        ],
            [
                new Response(HttpStatusCode.OK, DataType.STRING),
            ]);
        route.delete("/:id", (req, res, next) => {
            const id = req.params.id;
            this.deleteStudent(id);
            res.json("");
        });

        registerRequestMapping(StudentApi, "/students/{id}", RequestMethod.PUT, [
            new PathVariable("id", DataType.INTEGER, "学生ID"),
            new RequestBody("student", DataType.OBJECT, Student, "学生"),
        ],
            [
                new Response(HttpStatusCode.OK, DataType.STRING),
            ]);
        route.put("/:id", (req, res, next) => {
            const id = req.params.id;
            const input = MappingProvider.toDtoObject<Student>(Student, req.body);
            input.id = id;
            this.modifyStudent(input);
            res.json("");
        });

        registerRequestMapping(
            StudentApi,
            "/students",
            RequestMethod.GET, [],
            [
                new Response(HttpStatusCode.OK, DataType.ARRAY, Student, "return all students")]);
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
