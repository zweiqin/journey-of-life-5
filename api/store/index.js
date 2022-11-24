import { RuanRequest } from "../../utils";

// 获取门店列表
export const getSroreListApi = (data) => {
  return RuanRequest("/brand/list", data, "get");
};

// 门店详情
export const getStoreDetailApi = (storeId) => {
  return RuanRequest("/brand/detail", { id: storeId }, "get");
};

export const getStoreAndGoods = (data) => {
  return RuanRequest("/brand/listBySelect", data, "get");
};

// 获取预约商品
// export const getAppointGoodsApi = data => {
//   return RuanRequest("", data)
// }
