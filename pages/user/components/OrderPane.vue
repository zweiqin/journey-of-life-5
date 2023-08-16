<template>
	<view class="order-pane">
		<view class="title-wrapper">
			<view class="title-item" :class="{ active: currentMenu === 0 }" @click="currentMenu = 0">商城订单</view>
			<view class="title-item" :class="{ active: currentMenu === 1 }" @click="currentMenu = 1">
				本地生活订单
				<!-- <tui-badge
					v-show="$store.getters.xxx.xxx" type="danger" absolute :scale-ratio="0.8"
					translate-x="40%" top="-10rpx"
					right="-20rpx"
					>
					{{ $store.getters.xxx.xxx }}
					</tui-badge> -->
			</view>
		</view>

		<view class="menus-container">
			<swiper :current="currentMenu" class="swiper" @change="handleSwitchSwiper">
				<swiper-item class="swiper-item">
					<view
						v-for="item in orderTypesMall" :key="item.label" class="menu-item"
						@click="$emit('menu-click', { ...item, type: 0 })"
					>
						<BeeIcon
							v-if="item.key === 'all'" :size="28" class="menu-icon"
							:src="data.iconUrl ? common.seamingImgUrl(data.iconUrl) : data.icon"
						></BeeIcon>
						<BeeIcon
							v-else-if="item.key === 'awaitPay'" :size="28" class="menu-icon"
							:src="require('../../../static/user-center/menus/order.png')"
						></BeeIcon>
						<BeeIcon
							v-else-if="item.key === 'awaitShipped'" :size="28" class="menu-icon"
							:src="require('../../../static/user-center/menus/order.png')"
						></BeeIcon>
						<BeeIcon
							v-else-if="item.key === 'awaitReceipt'" :size="28" class="menu-icon"
							:src="require('../../../static/user-center/menus/order.png')"
						></BeeIcon>
						<BeeIcon
							v-else-if="item.key === 'awaitEvaluate'" :size="28" class="menu-icon"
							:src="require('../../../static/user-center/menus/order.png')"
						></BeeIcon>
						<BeeIcon
							v-else-if="item.key === 'hasRefunded'" :size="28" class="menu-icon"
							:src="require('../../../static/user-center/menus/order.png')"
						></BeeIcon>
						<text class="menu-title">{{ item.label }}</text>
					</view>
				</swiper-item>

				<swiper-item class="swiper-item">
					<view
						v-for="item in orderTypesStore" :key="item.label" class="menu-item"
						@click="$emit('menu-click', { ...item, type: 1 })"
					>
						<BeeIcon
							v-if="item.key === 'awaitPay'" :size="28" class="menu-icon"
							:src="require('../../../static/user-center/menus/order.png')"
						>
						</BeeIcon>
						<BeeIcon
							v-else-if="item.key === 'hasPay'" :size="28" class="menu-icon"
							:src="require('../../../static/user-center/menus/order.png')"
						></BeeIcon>
						<BeeIcon
							v-else-if="item.key === 'hasWritten'" :size="28" class="menu-icon"
							:src="require('../../../static/user-center/menus/order.png')"
						></BeeIcon>
						<BeeIcon
							v-else-if="item.key === 'hasExpired'" :size="28" class="menu-icon"
							:src="require('../../../static/user-center/menus/order.png')"
						></BeeIcon>
						<BeeIcon
							v-else-if="item.key === 'hasCancel'" :size="28" class="menu-icon"
							:src="require('../../../static/user-center/menus/order.png')"
						></BeeIcon>
						<BeeIcon
							v-else-if="item.key === 'hasRefunded'" :size="28" class="menu-icon"
							:src="require('../../../static/user-center/menus/order.png')"
						></BeeIcon>
						<text class="menu-title">{{ item.label }}</text>
						<!-- <tui-badge
							v-show="$store.getters.xxx.xxx" type="danger" absolute :scale-ratio="0.8"
							translate-x="40%"
							top="-6rpx"
							>
							{{ $store.getters.xxx.xxx }}
							</tui-badge> -->
					</view>
				</swiper-item>
			</swiper>
		</view>
	</view>
</template>

<script>
import { orderTypesMall, orderTypesStore } from '../../../user/orderForm/config'

export default {
	name: 'OrderPane',
	props: {
		data: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			currentMenu: 0,
			orderTypesMall,
			orderTypesStore
		}
	},

	methods: {
		handleSwitchSwiper(e) {
			this.currentMenu = e.detail.current
		}
	}
}
</script>

<style lang="less" scoped>
view,
text {
	line-height: 1.5 !important;
}

.order-pane {
	padding: 32upx 24upx;
	background-color: #fff;
	border-radius: 24upx;

	.title-wrapper {
		display: flex;
		align-items: center;
		color: #b3b2ad;
		font-size: 28upx;
		padding-bottom: 24upx;
		border-bottom: 1upx solid #f1f1f0;

		.title-item {
			position: relative;
			margin-right: 40upx;
			font-weight: 500;

			&.active {
				color: #141000;
			}
		}
	}

	.menus-container {
		font-size: 28upx;

		.swiper {
			margin-top: 28upx;
			height: 120upx;

			.swiper-item {
				padding: 28upx 30upx 32upx 30upx;
				box-sizing: border-box;
				display: flex;
				align-items: center;
				justify-content: space-between;

				.menu-item {
					text-align: center;
				}
			}
		}
	}
}
</style>
