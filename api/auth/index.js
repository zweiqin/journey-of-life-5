import { RuanRequest } from '../../utils'

// 校验登录
export const whoami = (id) => RuanRequest('/auth/checkLogin', {
	userId: id
})

// 注册
export const userRegisterApi = (data) => RuanRequest('/auth/register', data)

// 登录
export const userLoginApi = (data) => RuanRequest('/auth/login', data)

// 重置密码
export const resetPasswodApi = (data) => RuanRequest('/auth/reset', data)

// 获取公共号配置
export const getConfigApi = (data) => RuanRequest('/qrCode/getSignature', data, 'get')

// 微信登录
export const wxLoginApi = (data) => RuanRequest('/dtsWxUser/login', data, 'get')

// 获取验证码
export const getCodeApi = (data) => RuanRequest('/dtsWxUser/getCode', data, 'get')

// 绑定手机号
export const bindMobileForWXApi = (data) => RuanRequest('/dtsWxUser/bindingWxPhone', data, 'get')

// 用户不绑定手机号码情况下调用接口
export const updateNotBindingWxPhone = (data) => RuanRequest('/dtsWxUser/isNotBindingWxPhone', data)
