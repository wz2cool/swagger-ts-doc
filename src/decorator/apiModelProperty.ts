import { ApiModelCache } from "../cache";
import { CommonHelper } from "../helper";
import { ApiPropertyInfo } from "../model";
import { IApiPropertyInfo } from "../model/iApiPropertyInfo";

export function ApiModelProperty(info: IApiPropertyInfo) {
  const cache = ApiModelCache.getInstance();
  return (target: any, propertyKey: string) => {
    if (
      CommonHelper.isNullOrUndefined(target) ||
      CommonHelper.isNullOrUndefined(target.constructor) ||
      CommonHelper.isNullOrUndefined(target.constructor.name)
    ) {
      throw new Error("cannot find model from target.constructor.name");
    }

    const propertyInfo = new ApiPropertyInfo();
    propertyInfo.modelName = target.constructor.name;
    propertyInfo.propertyName = propertyKey;
    propertyInfo.dataType = info.dataType;
    propertyInfo.required = CommonHelper.isNullOrUndefined(info.required)
      ? false
      : info.required!;
    propertyInfo.description = info.description;
    if (CommonHelper.isNullOrUndefined(info.refModel)) {
      propertyInfo.refModel = info.refModel;
    }
    cache.cachePropertyInfo(propertyInfo);
  };
}
