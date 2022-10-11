import { RuanRequest } from "../../utils";

// 获取门店列表
export const getSroreListApi = (data) => {
  return RuanRequest("/brand/list", data, "get");
};
