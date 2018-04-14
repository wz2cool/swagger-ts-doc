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
import { Classroom, Student } from "../model";

export class ClassroomApi {
    private classroom: Classroom[];
    constructor() {
        this.classroom = [];
    }

    public getRoute(): express.Router {
        const route = express.Router();

        registerRequestMapping(ClassroomApi, "/classrooms", RequestMethod.POST,
            [
                new RequestBody("classroom", DataType.object, Classroom),
            ],
            [
                new Response(HttpStatusCode.OK, DataType.object, Classroom, "教室添加成功"),
                new Response(HttpStatusCode.INTERNAL_SERVER_ERROR, DataType.object, "内部错误"),
            ],
            "添加教室");
        route.post("/", (req, res, next) => {
            res.json("add classroom");
        });

        return route;
    }
}
