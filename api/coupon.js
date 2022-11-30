import { RuanRequest } from '../utils'

export const getMyCouponListApi = data => {
  return RuanRequest('/coupon/mylist', data, 'get')
}