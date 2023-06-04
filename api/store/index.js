import { RuanRequest } from '../../utils'

// 获取门店列表
export const getSroreListApi = (data) => RuanRequest('/brand/list', data, 'get')

// 门店详情
export const getStoreDetailApi = (storeId) => RuanRequest('/brand/detail', { id: storeId }, 'get')

export const getStoreAndGoods = (data) => RuanRequest('/brand/listBySelect', data, 'get')

// 获取预约商品
export const getAppointGoodsApi = (data) => RuanRequest('/appointGoods/list', data, 'get')

// 预约商品购买
export const payAppointGoodsApi = (data) => RuanRequest('/appointOrder/fastout', data)

// 预约商品提交订单
export const payAppointOrderApi = (data) => RuanRequest('/appointOrder/submit', data)

// 个人可领取优惠劵
export const getCanPickCouponApi = (data) => RuanRequest('/coupon/getUserCoupon', data, 'get')

// 个人优惠劵列表
export const getMyCouponList = (data) => RuanRequest('/coupon/mylist', data, 'get')

// 门店订阅
export const subscribeStoreApi = (data) => RuanRequest('/userAccount/Rss', data, 'get')
