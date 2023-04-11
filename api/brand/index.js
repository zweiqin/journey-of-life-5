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
export const getGoodsDetailInfoApi = () => {
  return request2({
    url: "/dtsGoods/goodsDetails",
    method: "GET",
    data,
    loading: true,
  });
};
