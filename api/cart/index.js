/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-22 09:39:58
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-23 09:58:54
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\api\cate\cataAdd.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { RuanRequest } from '../../utils'

/**
 * 购物车添加
 * @returns
 */
export const getCartAddApi = data => {
  return RuanRequest('/cart/add', data)
}

// 获取购物车列表
export const getShopCarListApi = data => {
  return RuanRequest('/cart/allIndex', data, 'get')
}
/**
 *
 * @param {获取购物车商品数量} data
 * @returns
 */
export const getCartGoodscountApi = data => {
  return RuanRequest('/cart/goodscount', data, 'get')
}

// 修改商品的勾选状态
export const changeShopCarStatusApi = data => {
  return RuanRequest('/cart/checked', data)
}
/**
 *
 * @param {修改购物车商品数量} data
 * @returns
 */
export const updateShopCarCountApi = data => {
  return RuanRequest('/cart/update', data)
}
/**
 *
 * @param {商品信息删除} data
 * @returns
 */
export const deleteShopCarGoodsApi = data => {
  return RuanRequest('/cart/delete', data)
}
/**
 *
 * @param {购物车结算} data
 * @returns
 */
export const payShopCarApi = data => {
  return RuanRequest('/cart/checkout', data, 'get')
}

// 全平台购物车下单
export const payAllShopCarApi = data => {
  return RuanRequest('/cart/allCheckout', data)
}

// 全平台下单
export const payAllGoodsSubmit = data => {
  return RuanRequest('/order/allSubmit', data)
}


// 移入收藏
export const addCollectionsApi = data => {
  return RuanRequest("/collect/addBatch", data)
}