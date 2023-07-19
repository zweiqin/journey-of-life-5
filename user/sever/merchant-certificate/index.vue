<template>
	<view class="certificate-management-container">
		<JHeader tabbar="/pages/user/user" width="50" height="50" title="商家券包管理"></JHeader>
		<view style="width: 70%;margin: 14rpx auto 14rpx;">
			<tui-button type="blue" bold shape="circle" width="100%" @click="go(`/user/sever/merchant-certificate/coupon-form`)">
				发布优惠券
			</tui-button>
		</view>
		<BrandCouponList ref="refBrandCouponList" :brand-id="brandId" btn-text="撤销发布" @click-btn="(e) => handleCouponRevoke(e)"></BrandCouponList>
	</view>
</template>

<script>
import { getBrandCouponListApi, updateCouponRevokeApi } from '../../../api/user'
import { getUserId, getBrandId } from '../../../utils'

export default {
	name: 'MerchantCertificate',
	components: {},
	onLoad(options) { },
	data() {
		return {
			brandId: getBrandId()
		}
	},
	onShow() {
	},

	methods: {
		handleCouponRevoke(item) {
			uni.showModal({
				title: '提示',
				content: '确认撤销该优惠券？',
				success: (res) => {
					if (res.confirm) {
						updateCouponRevokeApi({ id: item.id }).then((res) => {
							this.$showToast('操作成功')
							this.$refs.refBrandCouponList.getBrandCouponList()
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.certificate-management-container {
	min-height: 100vh;
	padding: 40upx 24upx 140upx 24upx;
	box-sizing: border-box;
	background-color: #eeeeee;
}
</style>
