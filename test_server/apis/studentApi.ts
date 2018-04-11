import * as express from "express";
import { ApiModelCache } from "../../src/cache";
import { Student } from "../model/student";

export class StudentApi {
    public getRoute(): express.Router {
        const route = express.Router();

        route.post("/", (req, res, next) => {
            const student = new Student();
            

            const props = ApiModelCache.getInstance().getModelInfos("Student");
            res.json(props);
        });

        return route;
    }
}
