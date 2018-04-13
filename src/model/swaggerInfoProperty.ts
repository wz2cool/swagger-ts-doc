import { SwaggerContactProperty } from "./swaggerContactProperty";
import { SwaggerLicenseProperty } from "./swaggerLicenseProperty";

export class SwaggerInfoProperty {
    public title: string;
    public version: string;
    public termsOfService: string;
    public description: string;
    public contact: SwaggerContactProperty;
    public license: SwaggerLicenseProperty;
}
