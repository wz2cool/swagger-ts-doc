import * as express from "express";

export class StudentApi {
    public getRoute(): express.Router {
        const route = express.Router();

        route.post("/", (req, res, next) => {
            const result = {};
            res.json(result);
        });

        return route;
    }
}