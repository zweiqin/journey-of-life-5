import { RuanRequest } from '../../utils'

/**
 *
 * @param {订单列表查询} data
 * @returns
 */

export const getOrderListApi = (data) => RuanRequest('/order/list', data, 'get')

// /**
//  *
//  * @param {订单列表查询-新} data
//  * @returns
//  */

// export const getOrderListApi = (data) => RuanRequest('/dtsOrder/list', data, 'get')

/**
 *
 * @param {删除订单} data
 * @returns
 */

export const orderCancelApi = (data) => RuanRequest('/order/cancel', data)

/**
 *
 * @param {确认收货} data
 * @returns
 */

export const getOrderConfirmApi = (data) => RuanRequest('/order/confirm', data)

/**
 *
 * @param {订单删除} data
 * @returns
 */

export const orderDeleteApi = (data) => RuanRequest('/order/delete', data)

/**
 *
 * @param {订单申请退款} data
 * @returns
 */

// export const orderRefundApi = (data) => RuanRequest('/order/refund', data)

export const orderRefundApi = (data) => RuanRequest('/dtsOrder/refunded', data) // 新

export const getOrderDetailApi = (data) => RuanRequest('/order/detail', data, 'get')

/**
 * 确认收货
 */

export const receiveGoodsApi = (data) => RuanRequest('/order/confirm', data)

/**
 * 评论
 */

export const sendCommentApi = (data) => RuanRequest('/order/comment', data)

// 发表评论
export const addCommentPostApi = (data) => RuanRequest('/comment/post', data)

// 评论数量
export const getCommentCountApi = (data) => RuanRequest('/comment/count', data, 'get')

// 评论列表
export const getCommentListApi = (data) => RuanRequest('/comment/list', data, 'get')

// 用户的评价列表
export const getUserCommentApi = (data) => RuanRequest('/dtsComment/userComment', data, 'get')
