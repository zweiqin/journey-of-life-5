/**
 * Liu Ruiliu 新版本地生活接口
 */
import { request2 } from "../../utils/request";

// 本地生活商家列表(首页)
export const getHomeBrandListApi = (data) => {
  return request2({
    url: "/dtsBrand/list",
    method: "GET",
    data,
  });
};

// 获取类目列表
export const getCategoryListApi = (data) => {
  return request2({
    url: "/dtsStoreType/list",
    data,
    method: "GET",
  });
};

// 根据父节点获取子节点
export const getSubMenuByPidApi = (data) => {
  return request2({ url: "/dtsStoreType/groundFloor", method: "GET", data });
};

// 查询附近美食子节点
export const getNearbyFonndMenuApi = (data) => {
  return request2({
    url: "/dtsStoreType/typeList",
    method: "GET",
    data,
  });
};

// 筛选商家
export const filterBrandByMenuIdApi = (data) => {
  return request2({
    url: "/dtsBrand/fatherBrand",
    data,
    method: "GET",
  });
};

// 商家详情
export const getBrandDetailApi = (data) => {
  return request2({
    url: "/dtsBrand/merchantDetails",
    method: "GET",
    data,
  });
};

// 查询门店优惠劵
export const getBrandCouponApi = (data) => {
  return request2({
    url: "/dtsCoupon/getCoupon",
    method: "GET",
    data,
  });
};

// 查询商品详情
export const getGoodsDetailInfoApi = (data) => {
  return request2({
    url: "/dtsGoods/goodsDetails",
    method: "GET",
    data,
    loading: true,
  });
};

// 本店更多推荐
export const getMoreGoodsApi = (data) => {
  return request2({
    url: "/dtsBrand/goodsMore",
    method: "GET",
    data,
  });
};

// 更多地点推荐
export const getMoreCityRecommendApi = (data) => {
  return request2({
    url: "/dtsBrand/goodsAddress",
    data,
    method: "GET",
  });
};

// 添加购物车
export const addShopCarApi = (data) => {
  return request2({
    url: "/dtsCart/addCart",
    data,
    method: "POST",
    loading: true,
  });
};

// 提交预约
export const submitApponitApi = (data) => {
  return request2({
    url: "/dtsAppointment/saveAppointment",
    data,
    method: "POST",
  });
};

// 获取服务详情
export const getApponitListApi = (data) => {
  return request2({
    url: "/dtsAppointment/myAppointment",
    data,
    method: "GET",
  });
};

// 取消预约
export const cancelApponitApi = (data) => {
  return request2({
    url: "/dtsAppointment/cancel",
    data,
    method: "POST",
    loading: true,
  });
};

// 收藏
export const folleBrandApi = (data) => {
  return request2({
    url: "/dtsCollect/setCollect",
    data,
    method: "GET",
  });
};
