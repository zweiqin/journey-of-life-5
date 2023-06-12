<template>
	<view class="up-vip-container">
		<view style="padding: 30upx 20upx;color: #000000;background-color: #ff9900;">
			<JHeader tabbar="/pages/user/user" title="会员升级" width="50" height="50"></JHeader>
		</view>
		<view class="head-wrapper">
			<JAvatar :src="userInfo.avatarUrl" size="150" radius="50%" border="5upx solid #ffffff"></JAvatar>
			<view style="margin-top: 10upx;">{{ userInfo.nickName || '--' }}</view>
			<view style="margin-top: 10upx;">会员类别：{{ common.explainMembership(userInfo.roleIds) }}</view>
		</view>
		<view style="padding: 38upx;">
			<view style="font-size: 32upx;font-weight: bold;">我的会员</view>
			<view style="display: flex;align-items: center;margin-top: 20upx;font-size: 28upx;">
				<JAvatar
					src="../../static/user-center/server/purchase-record.png" size="62" radius="50%"
					border="5upx solid #ffffff"
				></JAvatar>
				<BeeCommissionAgreement left-text="关闭" right-text="确认">
					<view style="margin-left: 20upx;">《佣金协议》</view>
				</BeeCommissionAgreement>
			</view>
			<view style="display: flex;align-items: center;margin-top: 20upx;font-size: 28upx;" @click="getPackageMemberList()">
				<JAvatar
					src="../../static/user-center/server/refresh-request.png" size="62" radius="50%"
					border="5upx solid #ffffff"
				></JAvatar>
				<view style="margin-left: 20upx;">刷新会员申请</view>
			</view>
		</view>
		<view style="padding: 0 38upx 140upx;">
			<view style="font-size: 32upx;font-weight: bold;">会员升级</view>
			<view style="display: flex;justify-content: space-between;flex-wrap: wrap;margin-top: 40upx;">
				<view
					v-for="item in packageMemberList" :key="item.id"
					style="position: relative;display: flex;flex-direction: column;justify-content: center;align-items: center;width: 30%;padding: 30upx 8upx;background-color: #fdf8e2;"
					:style="{ 'border': selectedPackageId === item.id ? '5upx solid #FF9900' : '' }"
					@click="selectedPackageId = item.id"
				>
					<JAvatar
						src="../../static/user-center/server/member-upgrade.png" size="102" radius="50%"
						border="5upx solid #ffffff"
					></JAvatar>
					<view style="margin-top: 4upx;font-size: 26upx;font-weight: bold;color: #424890;">{{ item.title }}</view>
					<view style="margin-top: 18upx;font-weight: bold;color: #FF9900;">
						<text style="font-size: 26upx;">￥</text><text
							style="font-size: 48upx;"
						>
							{{ item.amount }}
						</text>
					</view>
					<view v-if="item.id === selectedPackageId" style="position: absolute;right: 0;bottom: 0;padding: 5upx;border-radius: 100% 0 0;background-color: #ff9900;">
						<tui-icon name="check" color="#FFFFFF" size="38" unit="upx"></tui-icon>
					</view>
				</view>
			</view>
			<view style="margin-top: 40upx;font-size: 32upx;font-weight: bold;">升级权益</view>
			<view style="padding: 20upx;margin-top: 28upx;background-color: #f6f6f6;">
				<view>会员升级权益</view>
				<view v-if="selectedPackageId" style="margin-top: 32upx;overflow-x: auto;">
					<view style="display: flex;">
						<view v-for="item in (packageMemberList.find(i => i.id === selectedPackageId) || {}).packageServices || []" :key="item.id" style="margin-right: 32upx;text-align: center;">
							<JAvatar :src="common.seamingImgUrl(item.iconUrl)" size="58"></JAvatar>
							<view style="white-space: nowrap;">{{ item.title }}</view>
						</view>
					</view>
				</view>
				<view v-else style="margin-top: 32upx;font-size: 26upx;">请选择会员套餐！</view>
			</view>
		</view>

		<view style="position: fixed;bottom: 0;width: 100vw;padding: 30upx;background-color: #ffffff;;box-sizing: border-box;">
			<tui-button type="warning" width="100%" height="80upx" @click="handleMemberUpgrade">
				<text v-if="selectedPackageId" style="padding-right: 16upx;">
					<text style="font-size: 26upx;">￥</text><text
						style="font-size: 42upx;font-weight: bold;"
					>
						{{ (packageMemberList.find(i => i.id === selectedPackageId) || {}).amount }}
					</text>
				</text>
				<text style="font-size: 28upx;">立即开通</text>
			</tui-button>
		</view>
	</view>
</template>

<script>
import {
	getPackageMemberListApi,
	upgradeOrderAddOrderApi,
	upgradeDoesItExistApi
} from '../../api/user'
import { getUserId, updateToken } from '../../utils'
import {
	J_USER_INFO,
	J_PAY_TYPE
} from '../../constant'
import { payOrderGoodsApi } from '../../api/goods'
import { payFn } from '../../utils/pay'

export default {
	name: 'UserUp',
	data() {
		return {
			userInfo: uni.getStorageSync(J_USER_INFO) || {},
			packageMemberList: [],
			selectedPackageId: ''
		}
	},

	onShow() {
		this.getPackageMemberList()
		updateToken()
		this.userInfo = uni.getStorageSync(J_USER_INFO) || {}
	},

	methods: {
		getPackageMemberList() {
			uni.showLoading({
				title: '加载中'
			})
			getPackageMemberListApi().then((res) => {
				console.log(res)
				this.packageMemberList = res.data
				this.userInfo = uni.getStorageSync(J_USER_INFO) || {},
				uni.hideLoading()
			})
				.catch((e) => {
					uni.hideLoading()
				})
		},

		handleMemberUpgrade() {
			const selectedPackage = this.packageMemberList.find((i) => i.id === this.selectedPackageId)
			if (!selectedPackage) return this.$showToast('请选择会员套餐！')
			if (!getUserId()) return
			console.log(this.userInfo.roleIds)
			upgradeDoesItExistApi({
				userId: getUserId(),
				packageId: this.selectedPackageId
			}).then(({ data: result }) => {
				console.log(result)
				if (this.userInfo.roleIds === 10 && selectedPackage.roleIds === 4) {
					if (result) return this.$showToast('已提交申请，请等待审核！')
					this.go(`/user/marketing-tools/marketing-planner?packageId=${this.selectedPackageId}`)
				} else if (this.userInfo.roleIds === 5 && selectedPackage.roleIds === 4) {
					if (result) {
						upgradeOrderAddOrderApi({
							id: result.id
						}).then(({ data }) => {
							payOrderGoodsApi({
								orderNo: data,
								userId: getUserId(),
								payType: 4
							}).then((res) => {
								payFn(res, J_PAY_TYPE.VIP.value)
							})
						})
					} else {
						return this.$showToast('未查询到申请记录')
					}
				} else if (this.userInfo.roleIds === 10 && selectedPackage.roleIds === 3) {
					if (result) return this.$showToast('已提交申请，请等待审核！')
					this.go(`/user/marketing-tools/marketing-planner?packageId=${this.selectedPackageId}`)
				} else if (this.userInfo.roleIds === 5 && selectedPackage.roleIds === 3) {
					if (result) {
						upgradeOrderAddOrderApi({
							id: result.id
						}).then(({ data }) => {
							payOrderGoodsApi({
								orderNo: data,
								userId: getUserId(),
								payType: 4
							}).then((res) => {
								payFn(res, J_PAY_TYPE.VIP.value)
							})
						})
					} else {
						return this.$showToast('未查询到申请记录')
					}
				} else if (this.userInfo.roleIds === 10 && selectedPackage.roleIds === 6) {
					if (result) return this.$showToast('已提交申请，请等待审核！')
					this.go(`/user/marketing-tools/store-application?packageId=${this.selectedPackageId}`)
				} else if (this.userInfo.roleIds === 7 && selectedPackage.roleIds === 6) {
					if (result) {
						upgradeOrderAddOrderApi({
							id: result.id
						}).then(({ data }) => {
							payOrderGoodsApi({
								orderNo: data,
								userId: getUserId(),
								payType: 4
							}).then((res) => {
								payFn(res, J_PAY_TYPE.VIP.value)
							})
						})
					} else {
						return this.$showToast('未查询到申请记录')
					}
				} else if (this.userInfo.roleIds === 6 || this.userInfo.roleIds === 4 || this.userInfo.roleIds === 3 || this.userInfo.roleIds === 2) {
					return this.$showToast(`您的会员类型为：${this.common.explainMembership(this.userInfo.roleIds)}。不满足申请条件，无法开通！`)
				} else if (this.userInfo.roleIds === 5 && selectedPackage.roleIds === 6) {
					return this.$showToast(`您的会员类型为：${this.common.explainMembership(this.userInfo.roleIds)}。不满足申请条件，无法开通！`)
				} else if (this.userInfo.roleIds === 7 && (selectedPackage.roleIds === 4 || selectedPackage.roleIds === 3)) {
					return this.$showToast(`您的会员类型为：${this.common.explainMembership(this.userInfo.roleIds)}。不满足申请条件，无法开通！`)
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.up-vip-container {
	position: relative;
	box-sizing: border-box;
	height: 100vh;
	overflow-y: auto;
	font-size: 24upx;
	color: #3d3d3d;

	.head-wrapper {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 380upx;
		font-size: 28upx;
		color: #ffffff;
		background: url('../../static/user-center/server/user-up-head.png') no-repeat center/cover;
	}
}
</style>
