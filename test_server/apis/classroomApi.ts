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
            new RequestBody("classroom", DataType.object, Classroom),
        ]);
        route.post("/", (req, res, next) => {
            res.json("add classroom");
        });

        return route;
    }
}
