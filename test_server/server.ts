import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import { RegisterApiModel, RegisterRequestMapping, SwaggerGenerator } from "../src";
import { ApiPropertyInfo, DataType } from "../src/model";
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

        this.testGeneratePaths();
    }

    private routes(): void {
        const studentApi = new StudentApi();
        RegisterRequestMapping(studentApi.addStudent);
        this.app.use("/ts_im_apis/students", studentApi.getRoute());
    }

    private initSwagger(): void {
        RegisterApiModel(Student);
    }

    private testGenerateDefinitions(): void {
        const cache = ApiModelCache.getInstance().getPropertyCache();
        const result = SwaggerGenerator.generateDefinitions(cache);

        console.log(JSON.stringify(result));
    }

    private testGeneratePropertyInfo(): void {
        const apiPropertyInfos: ApiPropertyInfo[] = [];
        const namePropertyInfo = new ApiPropertyInfo();
        namePropertyInfo.dataType = "string";
        namePropertyInfo.propertyName = "name";
        namePropertyInfo.required = true;
        const agePropertyInfo = new ApiPropertyInfo();
        agePropertyInfo.dataType = "integer";
        agePropertyInfo.propertyName = "age";
        apiPropertyInfos.push(namePropertyInfo);
        apiPropertyInfos.push(agePropertyInfo);

        const test = SwaggerGenerator.generateModelDefinition(apiPropertyInfos);
        console.log(JSON.stringify(test));
    }

    private testGeneratePaths(): void {
        const cache = RequestMappingCache.getInstance();
        const result = SwaggerGenerator.generatePaths(cache.getRequestMappingInfos());
        console.log(JSON.stringify(result));
    }
}
