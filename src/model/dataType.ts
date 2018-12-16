/**
 * @summary The data type of a schema is defined by the type keyword, for example, type: string.
 * @tutorial https://swagger.io/docs/specification/data-models/data-types/
 */
export enum DataType {
  STRING,
  NUMBER,
  INTEGER,
  BOOLEAN,
  ARRAY,
  // tslint:disable-next-line:trailing-comma
  OBJECT
}
