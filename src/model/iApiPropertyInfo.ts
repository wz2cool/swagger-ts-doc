import { DataType } from ".";

export interface IApiPropertyInfo {
  dataType: DataType;
  /**
   * @summary the
   */
  required?: boolean;
  /**
   * @summary the description of property.
   */
  description?: string;
  /**
   * @summary reference a definition.
   * @tutorial https://swagger.io/docs/specification/using-ref/
   */
  refModel?: { new (): any } | DataType;
}
