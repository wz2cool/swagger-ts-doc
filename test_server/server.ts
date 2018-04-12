import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import { RegisterApiModel, RegisterRequestMapping } from "../src";
import { StudentApi } from "./apis";
import { Student } from "./model/student";

export class Server {
    public static bootstrap(): Server {
        return new Server();
    }

    public readonly app: express.Application;
    constructor() {
        this.app = express();
        this.config();
    }

    private config(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.routes();
        this.initSwagger();
    }

    private routes(): void {
        const studentApi = new StudentApi();
        studentApi.addStudent(null);
        // RegisterRequestMapping(studentApi.addStudent);
        this.app.use("/ts_im_apis/students", studentApi.getRoute());
    }

    private initSwagger(): void {
        RegisterApiModel(Student);
    }
}
