import { DataType } from "./dataType";

export interface IApiPropertyInfo {
  /**
   * @summary the type of property.
   */
  dataType: DataType;
  /**
   * @summary whether property is required.
   * @default false
   */
  required?: boolean;
  /**
   * @summary the description of property.
   * @default ""
   */
  description?: string;
  /**
   * @summary reference a definition.
   * @tutorial https://swagger.io/docs/specification/using-ref/
   * @default undefined
   */
  refModel?: { new (): any } | DataType;
}
