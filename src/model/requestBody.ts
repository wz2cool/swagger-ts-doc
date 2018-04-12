import { DataType, RequestArgument } from ".";

export class RequestBody extends RequestArgument {
    public objectBody: new () => any;

    constructor(name: string, dataType: DataType, objectBody?: new () => any) {
        super(name, dataType);
        this.objectBody = objectBody;
    }
}
