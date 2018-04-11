import * as bodyParser from "body-parser";
import * as express from "express";
import * as path from "path";
import { StudentApi } from "./apis";

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
    }

    private routes(): void {
        const studentApi = new StudentApi();
        this.app.use("/ts_im_apis/students", studentApi.getRoute());

    }
}
