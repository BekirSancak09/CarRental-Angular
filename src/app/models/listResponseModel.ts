import { ResponseModel } from "./responseModel";

/// extends inheritins;
export interface ListResponseModel<T> extends ResponseModel {

    data:T[];
}