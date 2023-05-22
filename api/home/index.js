/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-17 16:22:25
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-22 10:20:39
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\api\home\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { RuanRequest } from '../../utils'

/**
 * 获取首页商品列表
 * @returns
 */

export const getIndexDataApi = () => RuanRequest('/home/index', null, 'get')

/**
 * @description 获取分类
 * @param {
 *  id  {String} 二级分类类目,
 *  goodsType {String}  1-家具 2-材料
 * } data
 * @returns
 */

export const getGoodsTypesApi = (data) => RuanRequest('/catalog/index', data, 'get')

/**
 * @description 获取当前分类下的二级类目
 */

export const getTypeDetailList = (data) => RuanRequest('/catalog/current', data, 'get')

/**
 *@exports 根据id查询商品
 * @param {*} data
 * @returns
 */

export const getGoodsById = (data) => RuanRequest('/goods/list', data, 'get')

export const getUserCouponApi = (data) => RuanRequest('/coupon/getUserCoupon', data, 'get')

export const getAllCategoryList = () => RuanRequest('/catalog/all', {}, 'get')

export const getApponitGoodsApi = (data) => RuanRequest('/appointGoods/list', data, 'get')

/**
 *@exports 根据关键字查询商品
 * @param {*} data
 * @returns
 */

export const getDtsBrandGoods = (data) => RuanRequest('/dtsBrand/search', data, 'get')

