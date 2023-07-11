import { RuanRequest } from '../../utils'

/**
 *
 * @param {个人寄快递} data
 * @returns
 */

// 查询我个人寄快递的记录
export const getBianminRecordKuaidiApi = (data) => RuanRequest('/dtsBianminRecord', data, 'get')

// 可以寄快递的公司编码
export const getKuaidi100ComApi = (data) => RuanRequest('/kuaidi100/kuaidicom', data, 'get')

// C端寄件下单-价格查询
export const getKuaidi100PriceApi = (data) => RuanRequest('/kuaidi100/corderPrice', data)

// C端寄件下单
export const addKuaidi100CorderApi = (data) => RuanRequest('/kuaidi100/corder', data)

// // C端寄件下单-回调url
// export const orderCancelApi = (data) => RuanRequest('/kuaidi100/corderCb', data)

// C端寄件下单-取消
export const orderCancelApi = (data) => RuanRequest('/kuaidi100/corderCancel', data)

// // C端寄件下单-快递信息推送
// export const orderCancelApi = (data) => RuanRequest('/kuaidi100/corderTrackCb', data)
