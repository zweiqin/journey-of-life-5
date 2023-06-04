<template>
	<view class="voucher-container">
		<JHeader tabbar="/pages/user/user" title="代金劵" width="50" height="50"></JHeader>

		<!-- 顶部的 -->
		<view class="voucher-pane">
			<view class="icon-wrapper">
				<JIcon width="40" height="40" type="voucher"></JIcon>
			</view>
			<view class="my-voucher">我的代金券 {{ allHistory.voucherNumber }}</view>
			<!-- <button class="uni-btn">签到有惊喜</button> -->
		</view>

		<!-- 黄色面板 -->
		<view class="data-total">
			<view v-for="item in totalVoucher" :key="item.label" class="total-item" @click="go(item.url)">
				<view class="title">
					<text class="text">{{ item.label }}</text>
					<JIcon v-if="item.url" width="40" height="40" type="right-arrow"></JIcon>
				</view>

				<view class="total-value" :style="{ color: item.color }">
					{{ allHistory[item.field] }}
					<text v-if="item.unit" class="unit" :style="{ color: item.color }">
						{{
							item.unit
						}}
					</text>
				</view>
			</view>
		</view>

		<PricePane title="代金券充值" :data="reCharges" is-recharge @opVoucher="opVoucher('recharge', $event)"></PricePane>
		<PricePane title="代金券转账" :data="transFormVoucher" @opVoucher="opVoucher('transform', $event)"></PricePane>

		<view class="footer-menus">
			<view class="footer-desc">代金券解释权归巨峰商城所属</view>
			<view v-if="!(userInfo.roleIds === 6)">
				<tui-button
					type="blue" width="220rpx" height="64rpx" margin="20upx auto"
					style="border-radius: 50rpx;"
					@click="isShowVoucherDialog = true"
				>
					设置代金券
				</tui-button>
			</view>
			<view class="navigators">
				<navigator v-for="item in footerMenus" :key="item.label" :url="item.url" hover-class="navigator-hover">
					<view class="to">{{ item.label }}</view>
				</navigator>
			</view>
		</view>
		<!-- 设置代金券dialog -->
		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确定', color: '#586c94' }]"
			:show="isShowVoucherDialog" title="设置代金券" @click="handleClickVoucherDialog"
		>
			<template #content>
				<tui-input v-model="tempVoucher" label="代金券" type="number" placeholder="请输入代金券数量" clearable></tui-input>
			</template>
		</tui-dialog>
	</view>
</template>

<script>
import { J_USER_INFO } from '../../../constant'
import {
	totalVoucher,
	reCharges,
	transFormVoucher,
	footerMenus
} from './config'
import PricePane from './components/price-pane.vue'
import { getAccountVoucherHistoryTimes, updateBrandSetVoucherApi } from '../../../api/user'
import { getUserId, getBrandId } from '../../../utils'

export default {
	name: 'Voucher',
	components: {
		PricePane
	},
	data() {
		return {
			totalVoucher,
			reCharges,
			transFormVoucher,
			footerMenus,
			allHistory: {
				balance: 0,
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
			if (e.index === 0) {
			} else if (e.index === 1) {
				if (!getBrandId()) return
				if (!this.tempVoucher) return this.$showToast('代金券数量不能为空')
				updateBrandSetVoucherApi({
					brandId: getBrandId(),
					voucherNum: this.tempVoucher
				}).then(({ data }) => {
					this.$showToast('设置成功')
				})
			}
			this.tempVoucher = ''
			this.isShowVoucherDialog = false
		},

		opVoucher(type, price) {
			const url =
				type === 'recharge'
					? '/user/otherServe/voucher/recharge'
					: '/user/otherServe/voucher/recharge-give'
			this.go(url + `?price=${price}`)
		},

		getVoucherHold() {
			getAccountVoucherHistoryTimes({
				userId: getUserId()
			}).then(({ data }) => {
				console.log(data)
				this.allHistory.voucherNumber = data.voucherHold
				this.allHistory.balance = data.account
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
		background: linear-gradient(360deg, #e92a2a 0%, #ff8f1f 100%);
		border-radius: 20upx;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin: 34upx 0 26upx 0;

		.icon-wrapper {
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			background-color: #fff;
			display: flex;
			justify-content: center;
			align-items: center;
		}

		.my-voucher {
			color: #fff;
			margin: 20upx 0;
			letter-spacing: 2px;
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
	}

	.data-total {
		height: 212upx;
		width: 100%;
		background: linear-gradient(180deg, #fff8c7, #fffcea);
		border-radius: 20upx;
		.flex();
		padding: 52upx 28upx 34upx 30upx;
		box-sizing: border-box;

		.total-item {
			.flex();
			flex-direction: column;

			.j-icon {
				vertical-align: -10upx;
			}

			.text {
				font-size: 28upx;
			}

			.total-value {
				font-size: 48upx;
				font-weight: 500;
				letter-spacing: 3px;
				margin-top: 10px;
			}

			.unit {
				font-size: 24upx;
			}
		}
	}

	.footer-menus {
		margin-top: 200upx;

		.footer-desc {
			position: relative;
			font-size: 24upx;
			text-align: center;
		}

		.navigators {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 24upx;

			uni-navigator {
				&:nth-child(3) {
					.to {
						border: none;
					}
				}
			}

			.to {
				color: #fa5151;
				padding: 0 32upx;
				border-right: 1upx solid #ccc;
			}
		}
	}
}
</style>
