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
import { Classroom, Student } from "../model";

export class ClassroomApi {
    private classroom: Classroom[];
    constructor() {
        this.classroom = [];
    }

    public getRoute(): express.Router {
        const route = express.Router();

        registerRequestMapping(ClassroomApi, "/classrooms", RequestMethod.POST, [
            new RequestBody("classroom", DataType.object, "classroom", Classroom),
        ], new ResponseBody(DataType.object, Classroom), "添加教室");
        route.post("/", (req, res, next) => {
            res.json("add classroom");
        });

        return route;
    }
}
