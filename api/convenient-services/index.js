import { getUserId, KuaiDiRequest, getBrandId } from '@/utils'

/**
 *
 * @param {个人寄快递} data
 * @returns
 */

// 获取快递公司列表
export const getKuaiDiCorporation = (data) => KuaiDiRequest('/kuaidi100/getCompanies', data, 'get')

// 查询跟踪快递状态
export const getKuaiDiMethods = (data) => KuaiDiRequest('/kuaidi100/queryTrack', data, 'get')

// 查询我个人寄快递的记录                     测试数据，最终将以USERID为准     672950279         getUserId()  
export const getBianminRecordKuaidiApi = (data) => KuaiDiRequest('/dtsBianminRecord', { ...data, userId:  getUserId()   }, 'get')

// 查询我个人寄快递记录的消息事件
export const getKuaiDiRecordMsg = (data) => KuaiDiRequest('/dtsBianminRecordMsg', data, 'get')

// 可以寄快递的公司编码
export const getKuaidi100ComApi = (data) => KuaiDiRequest('/kuaidi100/kuaidicom', data, 'get')

// C端寄件下单-价格查询
export const getKuaidi100PriceApi = (data) => KuaiDiRequest('/kuaidi100/cloud/corderPrice', data)

// C端寄件下单
export const addKuaidi100CorderApi = (data) => KuaiDiRequest('/kuaidi100/corder', data)

// // C端寄件下单-回调url
// export const orderCancelApi = (data) => KuaiDiRequest('/kuaidi100/corderCb', data)

// C端寄件下单-取消
export const orderCancelApi = (data) => KuaiDiRequest('/kuaidi100/corderCancel', data)

// // C端寄件下单-快递信息推送
// export const orderCancelApi = (data) => KuaiDiRequest('/kuaidi100/corderTrackCb', data)
