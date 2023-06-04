/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-18 15:06:26
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-22 17:41:27
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\api\user\index.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

import { LTRequest, getUserId, RuanRequest } from '../../utils'

// 更新用户信息
export const updateUserInfoApi = (data) => RuanRequest('/user/update', data)

// 刷新用户信息
export const refrshUserInfoApi = (data) => RuanRequest('/user/refreshUser', data, 'get')

// 业务管理升级
export const upbussinessApi = (data) => LTRequest('/api/business/setMsgSentryStatus', data)
// 业务管理查询
export const queryMsgSentryListApi = (data) => LTRequest('/api/msgSentry/queryMsgSentryList', data)
// 业务管理新增
export const saveMsgSentryApi = (data) => LTRequest('/api/business/saveMsgSentry', data)
// addperformance:DWHTestUrl +'/api/performance/savePerformance', //业绩管理增加信息
// performanceList:DWHTestUrl +'/api/performance/getPerformanceList', //业绩管理查询
// performanceInfo:DWHTestUrl + '/api/performance/getPerformanceInfo', //业绩管理明细查询
// savePerformance:DWHTestUrl + '/api/performance/savePerformance', //业绩管理添加
export const addperformanceApi = (data) => LTRequest('/api/performance/savePerformance', data)
export const performanceListApi = (data) => LTRequest('/api/performance/getPerformanceList', data)
export const getPerformanceInfoApi = (data) => LTRequest('/api/performance/getPerformanceInfo', data)

/**
 * 获取营销画像的数据
 */

export const getMarketingPortraitDataApi = () => LTRequest(`/api/statistical/home/${getUserId()}`, null, 'get')

/**
 * @description 获取信息哨兵列表
 * @param {*} data
 */

export const getMsgSentryListApi = (data) => LTRequest('/api/msgSentry/queryMsgSentryList', data)

/**
 * 收集 -> 转化
 * @param {*} ids
 * @returns
 */

export const postConversionApi = (ids) => LTRequest(
	`/api/msgSentry/conversion/${ids.id}/${ids.userId}`,
	null,
	'get'
)

/**
 * @description 获取话术列表
 */

export const getWordsApi = (id) => LTRequest(`/api/msgSentry/queryMsgSayList/${id}`, null, 'get')

/**
 * @description 是否回访
 * @param {
 *    id: 信息哨兵id
 *    status: 下一个状态
 * } 请求数据
 */

export const changeUserStatusApi = (data) => LTRequest('/api/msgSentry/isConversion', data)

/**
 * @description 添加信息哨兵客户信息
 * @param {
 *   {
 *    "userName":"王霸",
 *    "userGender":1,
 *    "userTel":"18779579999",
 *    "userId":200
 *   }
 * } data
 */

export const addCustomerApi = (data) => LTRequest('/api/msgSentry/saveWxMsgSentry', data)

/**
 * 新增话术
 * @param {
 *   say: string 话术信息
 *   type: number 话术类型
 * } data
 * @returns
 */

export const addMyWordsApi = (data) => LTRequest('/api/msgSentry/saveMsgSay', data)

// 上传图片
export const uploadFle = (data) => RuanRequest('/storage/upload', data)

// 获取门店类型
export const getStoreTypesApi = () => RuanRequest('/storeType/list', {}, 'get')

// 提交申请门店
// 该字段决定保存或提交 （true 为提交）
export const submitApplyStoreInfo = (type, data) => RuanRequest('/userUpInfo/save?isSubmit=' + type, data)

// vip 预支付
export const applyVipApi = (data) => RuanRequest('/levelPay/VipPrepayBySyb', data)

// vip 升级成功
export const payVipApplySuccessApi = (data) => RuanRequest('/userUpInfo/upToVip', data, 'get')

// 获取申请记录
export const getApplyVipHistoryApi = (data) => RuanRequest('/upRecord/list', data, 'success')

// 所有的申请记录
export const getAllApplyVipHistoryListApi = (data) => RuanRequest('/userUpInfo/list', data, 'get')

// // 获取省市区地址
// export const getCitiesApi = (data) => RuanRequest('/region/list', data, 'get')

/**
 * 地图红包
 */

// 获取商家信息
export const getBusinessInfoByUserIdApi = () => RuanRequest('/api/redpack/getByUserId/' + getUserId(), {}, 'get')

// 发送红包
export const sendRedEnvelopeApi = (data) => LTRequest('/api/redpack/createMapredpack', data)

// 获取红包列表
export const getRedEnvelopeListApi = () => RuanRequest('/api/redpack/queryList', {}, 'get')

// 领取红包
export const receiveRedEnvelopeApi = (data) => RuanRequest('/api/redpack/getReceiveMapredpack', data)

// 查询用户足迹
export const getUserViewHistoryApi = (data) => RuanRequest('/footprint/list', data, 'get')

// 获取收藏数据
export const getUserCollectionListApi = (data) => RuanRequest('/collect/list', data, 'get')

// 查询会员升级的信息
export const getStoreSaveInfoApi = (data) => RuanRequest('/userUpInfo/read', data, 'get')

// // 获取申请记录表
// export const getApplyTableApi = (data) => RuanRequest('/upRecord/list', data, 'get')

// 撤销会员升级申请
export const widthDrawApi = (data) => RuanRequest('/userUpInfo/revoke', data, 'get')

// 营销/门店 升级预支付
export const payStoreAndYingApi = (data) => RuanRequest('/levelPay/SalesmanPrepayBySyb', data)

// 营销/门店 试用预支付
export const payTryStoreAndYingApi = (data) => RuanRequest('/levelPay/TryStorePrepayBySyb', data)

// 后续操作
export const houxucaozuoApi = (data) => RuanRequest('/userUpInfo/signin', data, 'get')

// // 优惠劵
// // 查询用户优惠劵
// export const getUserCouponListApi = (data) => RuanRequest('/coupon/getUserCoupon', data, 'get')

// 代金劵
// 获取代金劵配置
export const getVoucherConfigApi = () => RuanRequest('/voucher/getVoucher', {}, 'get')

// 代金劵预支付
export const rechargePrePayApi = (data) => RuanRequest('/voucherRecord/prepayBySyb', data)

// 获取代金劵持有
export const getVoucherNumberApi = (data) => RuanRequest('/voucher/getVoucherHold', data, 'get')

// 代金劵发放
export const grantVoucherApi = (data) => RuanRequest('/voucher/add', data)

// 代金劵转增
export const giveVoucherToUserApi = (data) => RuanRequest('/voucher/circula', data)

// 查找用户
export const searchUserApi = (data) => RuanRequest('/voucher/query', data, 'get')

// 代金劵充值记录
export const getVoucherRechargeHistoryApi = (data) => RuanRequest('/voucher/getVoucherOrder', data, 'get')

// 代金劵流水
export const getVoucherTansformApi = (data) => RuanRequest('/voucher/getVoucherCircula', data, 'get')

// 代金劵，余额统计及充值次数
export const getAccountVoucherHistoryTimes = (data) => RuanRequest('/voucher/getMoney', data, 'get')

/**
 * 邀请码
 */

// 获取邀请码
export const getQrCodeByH5Api = (data) => RuanRequest('/qrCode/getQrCodeByH5', data, 'get')

// // 绑定上级
// export const bindLastUserApi = (data) => RuanRequest('/bindUser/add', data)

/**
 * 名片
 */

// 新建名片
export const buildNewMyCardApi = (data) => RuanRequest('/businessCard/add', data)

// 获取名片列表
export const getNameCardList = (data) => RuanRequest('/businessCard/list', data, 'get')

// 修改明信片背景色
export const changeNameCardBgApi = (data) => RuanRequest('/businessCard/updateBgColor', data)

// 获取名片详情
export const getNameCardDetailApi = (data) => RuanRequest('/businessCard/detail', data, 'get')

// 修改名片
export const updateNameCardApi = (data) => RuanRequest('/businessCard/update', data)

export const promotionCommissionApi = (data) => RuanRequest('/promotion/commission', data, 'get')
// 推广中心

export const promotionOrderAndFansApi = (data) => RuanRequest('/promotion/orderAndFans', data, 'get')

// 申请区域代理
export const applyRegionagentApi = (data) => RuanRequest('/regionagent/saveRegionAgent', data)

// 查询区域代理状态
export const getApplyRegionagentStatusApi = (data) => RuanRequest('/regionagent/queryIsApproved', data, 'get')

/**
 * 页面或总体接口
 */

// 查询H5的用户角色授权菜单
export const getRolePermissionMenuApi = (data) => RuanRequest('/rolePermission/h5RoleMenu', data, 'get')

// 门店分类树
export const getStoreTypeTreeApi = (data) => RuanRequest('/dtsStoreType/typeTree', data, 'get')

// 区域编码ID调用下级区域
export const getAreaListOneApi = (data) => RuanRequest('/dtsArea/listOne', data, 'get')

// 商品类别
export const getGoodsTypeApi = (data) => RuanRequest('/dtsStoreType/goodsType', data, 'get')

/**
 * 地图红包
 */

// // 判断是否是商家
// export const getCouponMagicIsBindingApi = (data) => RuanRequest('/couponMagic/isBinding', data, 'get')

// 查询优惠券或者红包券模板
export const getCouponMagicListApi = (data) => RuanRequest('/couponMagic/listUser', data, 'get')

// 查询优惠券或者红包券模板详情
export const getCouponMagicDetailsApi = (data) => RuanRequest('/couponMagic/magicDetails', data, 'get')

// 创建优惠券或者红包券模板
export const addCouponMagicApi = (data) => RuanRequest('/couponMagic/create', data)

// 编辑优惠券或者红包券模板
export const updateCouponMagicApi = (data) => RuanRequest('/couponMagic/update', data)

// 查询系统模板
export const getWrapAdminMagicApi = (data) => RuanRequest('/dtsWrapAdminMagic/adminMagic', data, 'get')

// 系统模板ID查询红包模板
export const getMagicListIdApi = (data) => RuanRequest('/couponMagic/listId', data, 'get')

// 查询商家范围内地图红包
export const getWrapRedReleaseApi = (data) => RuanRequest('/dtsWrapRed/releaseWrap', data, 'get')

// 用户或商家发布红包
export const addWrapRedReleaseApi = (data) => RuanRequest('/dtsWrapRed/release', data)

// 用户领取红包
export const addWrapRedReceiveApi = (data) => RuanRequest('/dtsWrapRed/receiveWrap', data)

/**
 * 会员升级
 */

// 查询会员套餐（会员升级页）
export const getPackageMemberListApi = (data) => RuanRequest('/dtsPackageMember/list', data, 'get')

// 申请成为普通营销策划师（会员升级页判断进入申请）
export const upgradeRequestApplyForApi = (data) => RuanRequest('/dtsUpgradeRequest/applyFor', data)

// 查询所有分公司
export const getBranchOfficeApi = (data) => RuanRequest('/dtsUser/branchOffice', data, 'get')

// 用户申请列表（用户页点申请记录进去）
export const upgradeRequestSelectApplyApi = (data) => RuanRequest('/dtsUpgradeRequest/selectApply', data, 'get')

// 商家免费入驻（会员升级页判断进入 或 用户页点商家入驻进入 或 普通用户扫策推码进入）
export const updateBrandSettleInsApi = (data) => RuanRequest('/dtsBrand/settleIns', data)

// 通过区域编码查询所在区域的策划师
export const getPlannerCollectionApi = (data) => RuanRequest('/dtsUser/plannerCollection', data, 'get')

// 用户购买会员升级创建订单（会员升级页购买创建订单）
export const upgradeOrderAddOrderApi = (data) => RuanRequest('/dtsJfUpgradeOrder/addOrder', data)

// 商家扫营销策划师码绑定
export const bindUserSaoMaApi = (data) => RuanRequest('/dtsUser/saoMa', data)

// 用户扫码商家的二维码
export const bindSaoMaBrandApi = (data) => RuanRequest('/dtsBrandUser/saoMaBrand', data)

// 商家查看粉丝
export const getBrandUserFansListApi = (data) => RuanRequest('/dtsBrandUser/fansList', data, 'get')

// 查询策划师旗下的商家
export const getSelectBrandListApi = (data) => RuanRequest('/dtsBrand/selectBrandList', data, 'get')

// 查看自己的区域内未绑定的商家（初级或高级策划师查询，查询哪些商家未绑定策划师）
export const getBePendingApi = (data) => RuanRequest('/dtsUser/bePending', data, 'get')

/**
 * 商品管理
 */

// 查询商家商品列表
export const getBrandGoodsBrandApi = (data) => RuanRequest('/dtsGoods/brandGoods', data, 'get')

// 商家新增商品
export const createGoodsBrandApi = (data) => RuanRequest('/dtsBrandUser/createGoods', data)

// 商家编辑商品
export const updateGoodsBrandApi = (data) => RuanRequest('/dtsBrandUser/updateGoods', data)

/**
 * 优惠券管理
 */

// 查询商家商品列表
export const getBrandGoodsListApi = (data) => RuanRequest('/dtsGoods/brandGoods', data, 'get')

/**
 * 提现
 */

// 查询用户密码信息
export const getPwdSelectByIdApi = (data) => RuanRequest('/dtsPwd/selectById', data, 'get')

// 修改提现密码
export const updateWithdrawalPwdApi = (data) => RuanRequest('/dtsPwd/', data)

// 查询银行卡信息
export const getPwdSelectBankApi = (data) => RuanRequest('/withdrawalBank/selectBank', data, 'get')

// 添加用户银行信息
export const addWithdrawalBankCardApi = (data) => RuanRequest('/withdrawalBank/add', data)

// 查询银行信息
export const getBankCardOwnershipApi = (data) => RuanRequest('/dtsBankCardOwnership/list', data, 'get')

// 提现金额手续费计算
export const getWithdrawalCountApi = (data) => RuanRequest('/dtsUserWithdrawal/count', data)

// 提现申请
export const addWithdrawalApplyApi = (data) => RuanRequest('/dtsUserWithdrawal/apply', data)

/**
 * 区域代理
 */

// 申请成为区域代理
export const updateApplyRegionalAgentApi = (data) => RuanRequest('/dtsUpgradeRequest/applyRegionalAgent', data)

/**
 * 用户收益
 */

// 普通人用户收益
export const getUserIncomeApi = (data) => RuanRequest('/dtsUser/userIncome', data, 'get')

// 普通用户收益记录（目前只有红包）
export const getRevenueRecordsApi = (data) => RuanRequest('/dtsUser/revenueRecords', data, 'get')

/**
 * 用户绑定关系
 */

// 所有生成并返推广码
export const getExtensionCodeApi = (data) => RuanRequest('/dtsUserActivityInfoCode/createCode', data, 'get')

// 所有用户的绑定码（扫码绑定）
export const updateUserBindingUserApi = (data) => RuanRequest('/dtsUserActivityBinding/userBindingUser', data)

// 用户粉丝类别筛选
export const getMyFansListApi = (data) => RuanRequest('/dtsUser/myFansList', data, 'get')

// 用户的粉丝统计
export const getMyFansStatisticsApi = (data) => RuanRequest('/dtsUser/myFansStatistics', data, 'get')

/**
 * 商家订单
 */

// 商家的订单
export const getSelectBrandOrderApi = (data) => RuanRequest('/dtsBrand/selectBrandOrder', data, 'get')

/**
 * 代金券
 */

// 商家代金券设置
export const updateBrandSetVoucherApi = (data) => RuanRequest('/dtsBrand/setVoucher', data)

/**
 * 代金券
 */

// 生成用户订单的核销码
export const getVerificationCodeHxCodeApi = (data) => RuanRequest('/dtsUserVerificationCode/getHxCode', data, 'get')

// 输入code核销码核销
export const updateSetHxCodeApi = (data) => RuanRequest('/dtsUserVerificationCode/setHxCode', data)

/**
 * 领券中心和优惠券
 */

// 领卷中心专门商城的卷
export const getCouponListApi = (data) => RuanRequest('/coupon/list', data, 'get')

// 用户收藏添加或删除
export const updateCollectAddordeleteApi = (data) => RuanRequest('/collect/addordelete', data)

// 个人优惠券列表
export const getUserCouponListApi = (data) => RuanRequest('/coupon/list', data, 'get')

// 个人可领取优惠券列表
export const getUserCouponReceiveApi = (data) => RuanRequest('/coupon/getUserCoupon', data, 'get')

// 优惠券领取
export const updateCollectReceiveApi = (data) => RuanRequest('/collect/receive', data)

// 一键领取优惠券
export const updateCollectReceiveAllApi = (data) => RuanRequest('/collect/receiveAll', data)

/**
 * 商家优惠券
 */

// 查询商家的优惠卷
export const getBrandCouponListApi = (data) => RuanRequest('/dtsCoupon/getCoupon', data, 'get')

// 商家发布优惠卷
export const addCouponReleaseApi = (data) => RuanRequest('/dtsCoupon/releaseCoupon', data)

// 商家撤销优惠卷
export const updateCouponRevokeApi = (data) => RuanRequest('/dtsCoupon/revokeCoupon', data)

// 领卷中心
export const getCouponNeckApi = (data) => RuanRequest('/dtsCoupon/neckCoupon', data, 'get')
