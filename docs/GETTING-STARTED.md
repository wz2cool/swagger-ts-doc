## Getting started

`swagger-ts-doc` 返回有效 OpenAPI json文档

```javascript
import { SwaggerInfoProperty, swaggerJSDoc, SwaggerOptions } from "swagger-ts-doc";

const options = new SwaggerOptions();
options.info = new SwaggerInfoProperty();
options.info.version = "1.0.0";
options.info.title = "swagger-ts-demo";
// return openAPI json
const jsonDoc = swaggerJSDoc(options);
```

这个时候我们其实可以用express 来暴露我们产生的json。

```javascript
this.app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(jsDoc);
});
```

我们可以使用[swagger-ui-express](https://github.com/scottie1984/swagger-ui-express) 框架来寄宿swagger-ui.

### 怎样描述文档
使用apiModelProperty 作为对属性的描述, 主要作用是生成与之对应的 definitions 下的model。
```javascript
import { apiModelProperty, DataType } from "swagger-ts-doc";

export class AddStudentDto {
    @apiModelProperty(
        DataType.STRING, // 类型
        true, // 是否必填
        "学生姓名" //描述
        )
    public name: string;
    @apiModelProperty(DataType.INTEGER, true, "学生年龄")
    public age: number;
}
```

```javascript
registerRequestMapping(StudentApi, "/students", RequestMethod.POST,
    [
        // 这里的 AddStudentDto 可以连接到我们上面定义好的 AddStudentDto类中，
        new RequestBody("student", DataType.OBJECT, AddStudentDto, "新学生"),
    ],
    [
        new Response(HttpStatusCode.OK, DataType.STRING, "新学生ID"),
        new Response(HttpStatusCode.INTERNAL_SERVER_ERROR, DataType.STRING, "内部错误"),
        new Response(HttpStatusCode.CONFLICT, DataType.STRING, "学生姓名冲突"),
    ],
    "添加新学生");
    route.post("/", (req, res, next) => {
        if (!req.body.name) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
            res.json("学生姓名不能为空");
            return;
        }

        if (!req.body.age) {
            res.status(HttpStatusCode.INTERNAL_SERVER_ERROR);
            res.json("学生姓名不能为空");
            return;
        }

        if (lodash.findIndex(this.students, (x) => x.name === req.body.name) > -1) {
            res.status(HttpStatusCode.CONFLICT);
            res.json(`${req.body.name} 已经存在`);
            return;
        }

        const newOne = new Student();
        newOne.name = req.body.name;
        newOne.age = req.body.age;
        newOne.uuid = this.uuid();
        this.addStudent(newOne);
        res.status(HttpStatusCode.OK);
        res.json(newOne.uuid);
    });
```