import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import { registerApiModel, registerRequestMapping, swaggerJSDoc } from "../src";
import { ApiPropertyInfo, DataType, SwaggerOptions, SwaggerInfoProperty } from "../src/model";
import { StudentApi } from "./apis";
import { Student } from "./model/student";
import { ApiModelCache, RequestMappingCache } from "../src/cache";

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
        this.testSwagger();
    }

    private routes(): void {
        const studentApi = new StudentApi();
        registerRequestMapping(studentApi.addStudent);
        registerRequestMapping(studentApi.deleteStudent);
        registerRequestMapping(studentApi.modifyStudent);
        registerRequestMapping(studentApi.getStudents);
        this.app.use("/ts_im_apis/students", studentApi.getRoute());
    }

    private initSwagger(): void {
        registerApiModel(Student);
    }

    private testSwagger(): void {
        const options = new SwaggerOptions();
        options.info = new SwaggerInfoProperty();
        options.info.version = "1.0.0";
        options.info.title = "testSwagger";

        const jsDoc = swaggerJSDoc(options);
        console.log(jsDoc);
    }
}
