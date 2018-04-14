# swagger-ts-doc
swagger-ts-doc 的灵感来自于swagger-jsdoc, swagger-jsdoc 会根据注释来生成对应的swagger描述, 搭配swagger-ui-express可以实现比较好的API文档,那么这里swagger-ts-doc 则是利用typescript 强类型的特新去生成swagger描述。

## 目标
swagger-ts-doc 参照了java的swagger文档生成方式，可以提供强类型的描述去产生对应的swagger API文档描述。

## 安装
```bash
$ npm install swagger-ts-doc --save
```

### 快速入门
[Get started](./docs/GETTING-STARTED.md) by documenting your code.

### Demo 程序
```bash
$ git clone https://github.com/wz2cool/swagger-ts-doc-demo.git
$ cd swagger-ts-doc-demo
$ npm install
$ npm start
```
打开浏览器：http://localhost:3000/api-docs
