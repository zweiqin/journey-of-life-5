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
export const getAppointGoodsApi = data => {
  return RuanRequest("/appointGoods/list", data, 'get')
}

// 预约商品购买
export const payAppointGoodsApi = data => {
  return RuanRequest('/appointOrder/fastout', data)
}

// 预约商品提交订单
export const payAppointOrderApi = data => {
  return RuanRequest('/appointOrder/submit', data)
}

// 优惠劵
export const getCouponListApi = data => {
  return RuanRequest('/coupon/list', data, 'get')
}

// 个人可领取优惠劵
export const getCanPickCouponApi = data => {
  return RuanRequest("/coupon/getUserCoupon", data, 'get')
}

// 个人优惠劵列表
export const getMyCouponList = data => {
  return RuanRequest('/coupon/mylist', data, 'get')
}

// 门店订阅
export const subscribeStoreApi = data => {
  return RuanRequest("/userAccount/Rss", data, 'get')
}