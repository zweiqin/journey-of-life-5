<template>
	<view class="voucher-container">
		<JHeader tabbar="/pages/user/user" title="代金劵" width="50" height="50">
			<template v-slot:ftFn>
				<span @click="go('/user/otherServe/voucher/voucher-turnover')" style="font-size: 30rpx;line-height: 51rpx;color: rgba(121, 121, 121, 0.83);">代金卷流水</span>
			</template>
		</JHeader>

		<!-- 顶部的 -->
		<view class="voucher-pane">
			<view class="icon-wrapper">
				<img src="./image/qian.png" alt="">
			</view>
			<view class="my-voucher">我的代金券 <img src="./image/right.png" alt=""></view>
			<view class="voucherNumber">
				￥{{ allHistory.voucherNumber }}
			</view>
			<!-- <button class="uni-btn">签到有惊喜</button> -->
		</view>

		<!-- 黄色面板 -->
	<!-- 	<view class="data-total">
			<view class="total-item" style="min-width: 20%;border-right: 2upx solid #c3c4c4;">
				<view class="title" style="display: flex;justify-content: center;">
					<text class="text">余额</text>
				</view>
				<view class="total-value" :style="{ color: '#FA5151' }">
					{{ allHistory.account || '-- ' }}
					<text class="unit" :style="{ color: '#FA5151' }">元</text>
				</view>
			</view>

			<view class="total-item" style="flex: 1;border-right: 2upx solid #c3c4c4;">
				<view class="title" style="display: flex;justify-content: center;">
					<text class="text">代金劵</text>
				</view>
				<view class="total-value">
					{{ allHistory.voucherNumber }}
				</view>
			</view>

			<view class="total-item" style="min-width: 25%;" @click="go('/user/otherServe/voucher/recharge-history')">
				<view class="title" style="display: flex;justify-content: center;">
					<text class="text">充值记录</text>
					<JIcon width="40" height="40" type="right-arrow"></JIcon>
				</view>
				<view class="total-value">
					{{ allHistory.rechrageHistory }}
					<text class="unit">次</text>
				</view>
			</view>
		</view> -->

		<PricePane title="代金券充值" :data="reCharges" is-recharge @opVoucher="opVoucher('recharge', $event)"></PricePane>
		<PricePane title="代金券转账" :data="transFormVoucher" @opVoucher="opVoucher('transform', $event)"></PricePane>
		<view class="footer-desc">代金券解释权归巨峰商城所属</view>
		<!-- <view class="footer-menus">
			
			<view v-if="userInfo.roleIds === 6">
				<tui-button type="blue" width="220rpx" height="64rpx" margin="20upx auto" style="border-radius: 50rpx;"
					@click="isShowVoucherDialog = true">
					设置代金券
				</tui-button>
			</view>
			<view class="navigators">
				<navigator v-for="item in footerMenus" :key="item.label" :url="item.url" hover-class="navigator-hover">
					<view class="to">{{ item.label }}</view>
				</navigator>
			</view>
		</view> -->
		<!-- 设置代金券dialog -->
		<!-- <tui-dialog style="position: relative;z-index: 888;"
			:buttons="[{ text: '取消' }, { text: '确定', color: '#586c94' }]" :show="isShowVoucherDialog" title="设置代金券"
			@click="handleClickVoucherDialog">
			<template #content>
				<tui-input v-model="tempVoucher" label="代金券" type="number" placeholder="请输入代金券比例">
					<template #right>
						<text>%</text>
					</template>
				</tui-input>
			</template>
		</tui-dialog> -->
	</view>
</template>

<script>
	import {
		J_USER_INFO
	} from '../../../constant'
	import {
		reCharges,
		transFormVoucher,
		footerMenus
	} from './config'
	import PricePane from './components/price-pane.vue'
	import {
		getAccountVoucherHistoryTimes,
		updateBrandSetVoucherApi
	} from '../../../api/user'
	import {
		getUserId,
		getBrandId
	} from '../../../utils'

	export default {
		name: 'Voucher',
		components: {
			PricePane
		},
		data() {
			return {
				reCharges,
				transFormVoucher,
				footerMenus,
				allHistory: {
					account: 0,
					voucherNumber: 0,
					rechrageHistory: 0
				},
				userInfo: {},
				isShowVoucherDialog: false,
				tempVoucher: ''
			}
		},

		onLoad() {
			this.userInfo = uni.getStorageSync(J_USER_INFO)
		},

		onShow() {
			this.getVoucherHold()
		},

		methods: {
			async handleClickVoucherDialog(e) {
				console.log(e)
				if (e.index === 0) {} else if (e.index === 1) {
					if (!getBrandId()) return
					if (!this.tempVoucher) return this.$showToast('代金券数量不能为空')
					updateBrandSetVoucherApi({
						brandId: getBrandId(),
						voucherNum: this.tempVoucher
					}).then(({
						data
					}) => {
						this.$showToast('设置成功')
					})
				}
				this.tempVoucher = ''
				this.isShowVoucherDialog = false
			},

			opVoucher(type, price) {
				const url =
					type === 'recharge' ?
					'/user/otherServe/voucher/recharge' :
					'/user/otherServe/voucher/recharge-give'
				this.go(url + `?price=${price}`)
			},

			getVoucherHold() {
				getAccountVoucherHistoryTimes({
					userId: getUserId()
				}).then(({
					data
				}) => {
					console.log(data)
					this.allHistory.voucherNumber = data.voucherHold
					this.allHistory.account = data.account
					this.allHistory.rechrageHistory = data.voucherCount
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	@import "../../../style/mixin.less";

	.voucher-container {
		padding: 40upx;
		box-sizing: border-box;
		font-size: 28upx;
		color: #3d3d3d;

		.voucher-pane {
			height: 304upx;
			// background: linear-gradient(360deg, #e92a2a 0%, #ff8f1f 100%);
			border-radius: 20upx;
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			margin: 34upx 0 26upx 0;

			.icon-wrapper {
				width: 92upx;
				height: 92upx;
				border-radius: 50%;
				background-color: #F6C545;
				display: flex;
				justify-content: center;
				align-items: center;
				> img {
					width: 50rpx;
					height: 51rpx;
				}
			}

			.my-voucher {
				margin-top: 18rpx;
				font-weight: 600;
				display: flex;
				align-items: center;
				font-size: 30rpx;
				line-height: 51rpx;
				color: #3D3D3D;
				> img {
					width: 28rpx;
					height: 28rpx;
				}
			}

			.uni-btn {
				width: 248upx;
				height: 54upx;
				background: linear-gradient(to bottom, #ff8f1f, #ff8f1f, #fff8c6);
				.flex(center, center);
				border-radius: 100px;
				color: #fff;
				font-size: 28upx;
			}
			
			.voucherNumber {
				margin-top: 26rpx;
				font-size: 55rpx;
				font-weight: 900;
				line-height: 51rpx;
				color: #3D3D3D;
			}
		}

		.data-total {
			display: flex;
			// justify-content: space-between;
			flex-wrap: nowrap;
			height: fit-content;
			overflow-x: auto;
			font-size: 36upx;
			background: linear-gradient(180deg, #fff8c7, #fffcea);
			border-radius: 20upx;
			margin: 0;
			padding: 18upx 8upx 4upx 10upx;
			box-sizing: border-box;

			.total-item {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: column;
				padding: 20upx 20upx;

				.text {
					font-size: 28upx;
				}

				.total-value {
					// font-size: 48upx;
					// font-weight: 500;
					// letter-spacing: 3px;
					margin-top: 10px;
				}

				.unit {
					font-size: 24upx;
				}
			}
		}
		.footer-desc {
			width: 100%;
			position: fixed;
			left: 0;
			bottom: 18rpx;
			text-align: center;
			font-size: 24rpx;
			font-weight: normal;
			line-height: 51rpx;
			color: #3D3D3D;
		}
		// .footer-menus {
		// 	margin-top: 200upx;

		// 	.footer-desc {
		// 		position: relative;
		// 		font-size: 24upx;
		// 		text-align: center;
		// 	}

		// 	.navigators {
		// 		display: flex;
		// 		justify-content: center;
		// 		align-items: center;
		// 		margin-top: 24upx;

		// 		uni-navigator {
		// 			&:nth-child(3) {
		// 				.to {
		// 					border: none;
		// 				}
		// 			}
		// 		}

		// 		.to {
		// 			color: #fa5151;
		// 			padding: 0 32upx;
		// 			border-right: 1upx solid #ccc;
		// 		}
		// 	}
		// }
	}
</style>