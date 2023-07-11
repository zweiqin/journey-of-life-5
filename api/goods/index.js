import { getUserId, RuanRequest } from '../../utils'

/**
 * @description 查询商品详情
 * @param {*} id 商品id
 */

export const getGoodsDetailApi = (id, userId) => RuanRequest('/goods/detail', { id, userId }, 'get')

/**
 * @description 收藏操作
 * @param {
 *    userId: Number,
 *    type: Number 如果是0则是商品收藏，如果是1则是专题收藏
 *    valueId: Number 类型为0：商品id，类型为1：专题id
 * } data
 */

export const getCollectListApi = (data) => RuanRequest('/collect/list', data, 'get')

export const collectionApi = (data) => RuanRequest('/collect/addordelete', data)

/**
 * @description 大家都在看
 * @param {*} categoryId
 * @returns
 */

export const everyLookApi = (categoryId) => RuanRequest('/goods/related', { id: categoryId }, 'get')

/**
 * @description 获取购物车数据
 * @returns
 */

export const getShopCarApi = (data) => RuanRequest('/cart/index', data, 'get')

/**
 * @description 添加购物车
 * @param {
 *  "userId": 219,
 *  "goodsId": 1,
 *  "productId": 1,
 *  "number": 1
 * } data
 * @returns
 */

export const addShopCarApi = (data) => RuanRequest('/cart/add', data)

/**
 * @description 获取购物车数量
 * @returns
 */

export const getCarShopNumberApi = (data) => RuanRequest('/cart/goodscount', data, 'get')

// 提交订单
export const submitOrderApi = (data) => RuanRequest('/order/submit', data)

// 快速添加购物车
export const firstAddCar = (data) => RuanRequest('/cart/fastadd', data)

export const payOrderGoodsApi = (data) => RuanRequest('/api/syb/orderPayH5', data)

export const getPayOrderResultApi = (data) => RuanRequest('/api/syb/getIsPaySucceed', data, 'get')

// 获取预约商品详情
export const getApponitGoodsDetailApi = (goodsId) => RuanRequest(
	'/appointGoods/detail',
	{
		userId: getUserId(),
		id: goodsId
	},
	'get'
)

// 获取当前门店的商品
export const goodsListApi = (data) => RuanRequest('/goods/list', data, 'get')

// 获取商品类目
export const getIndexCategoryListApi = (data) => RuanRequest('/goods/category', data, 'get')
