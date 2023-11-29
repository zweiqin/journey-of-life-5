<template>
	<view style="margin-top: 24upx;">
		<view>
			<view v-for="menu in specialPane" :key="menu.name" style="margin-bottom: 24upx;">
				<view v-if="menu.name === '我的订单'">
					<OrderPane
						:data="menu"
						@menu-click="(e) => $emit('menu-click', { ...menu, url: `/user/orderForm/order-form?currentStatus=${e.value}&currentType=${e.type}` })"
					>
					</OrderPane>
				</view>
				<view v-else-if="menu.name === '客服中心'">
					<DragButton
						text="客服在线" :icon-src="menu.iconUrl ? common.seamingImgUrl(menu.iconUrl) : menu.icon" is-dock
						exist-tab-bar @btnClick="go(menu.url)"
					/>
				</view>
			</view>
		</view>

		<view class="pane-wrapper">
			<view class="title-wrapper">
				<view class="left">
					<h3>{{ title }}</h3>
					<slot name="title"></slot>
				</view>
				<view class="right">
					<slot name="right"></slot>
				</view>
			</view>

			<view class="row-wrapper">
				<view v-for="menu in renderMenu" :key="menu.name" class="item" @click="$emit('menu-click', menu)">
					<BeeIcon
						v-if="menu.iconUrl || menu.icon" :size="32"
						:src="menu.iconUrl ? common.seamingImgUrl(menu.iconUrl) : menu.icon"
					></BeeIcon>
					<text class="menu-name">{{ menu.name }}</text>
				</view>
			</view>

			<view style="display: flex;flex-wrap: wrap;">
				<view v-for="menu in specialPane" :key="menu.name" @click="$emit('menu-click', menu)">
					<view
						v-if="menu.name === '小账本'"
						style="display: flex;justify-content: space-between;align-items: center;width: 272upx;margin: 12upx 10upx 0;padding: 20upx 14upx;background-color: #f8f5ed;border-radius: 10upx;"
					>
						<view>
							<view style="margin-bottom: 6upx;font-size: 32upx;color: #8E6251;">我的账户</view>
							<view style="font-size: 22upx;color: #A29898;">账本收益实时更新</view>
						</view>
						<image
							style="width: 82upx;height: 82upx;"
							:src="menu.iconUrl ? common.seamingImgUrl(menu.iconUrl) : menu.icon" mode="widthFix"
						></image>
					</view>
					<view
						v-else-if="menu.name === '每日签到'"
						style="display: flex;justify-content: space-between;align-items: center;width: 272upx;margin: 12upx 10upx 0;padding: 20upx 14upx;background-color: #f8f5ed;border-radius: 10upx;"
					>
						<view>
							<view style="margin-bottom: 6upx;font-size: 32upx;color: #8E6251;">签到</view>
							<view style="font-size: 22upx;color: #A29898;">每日签到惊喜不断</view>
						</view>
						<image
							style="width: 82upx;height: 82upx;"
							:src="menu.iconUrl ? common.seamingImgUrl(menu.iconUrl) : menu.icon" mode="widthFix"
						></image>
					</view>
					<view
						v-else-if="menu.name === '我的收藏'"
						style="display: flex;justify-content: space-between;align-items: center;width: 272upx;margin: 12upx 10upx 0;padding: 20upx 14upx;background-color: #f8f5ed;border-radius: 10upx;"
					>
						<view>
							<view style="margin-bottom: 6upx;font-size: 32upx;color: #8E6251;">我的收藏</view>
							<view style="font-size: 22upx;color: #A29898;">收藏商品和店铺</view>
						</view>
						<image
							style="width: 82upx;height: 82upx;"
							:src="menu.iconUrl ? common.seamingImgUrl(menu.iconUrl) : menu.icon" mode="widthFix"
						></image>
					</view>
					<view
						v-else-if="menu.name === '我的券包'"
						style="display: flex;justify-content: space-between;align-items: center;width: 272upx;margin: 12upx 10upx 0;padding: 20upx 14upx;background-color: #f8f5ed;border-radius: 10upx;"
					>
						<view>
							<view style="margin-bottom: 6upx;font-size: 32upx;color: #8E6251;">我的卡券</view>
							<view style="font-size: 22upx;color: #A29898;">天天抢兑5折券</view>
						</view>
						<image
							style="width: 82upx;height: 82upx;"
							:src="menu.iconUrl ? common.seamingImgUrl(menu.iconUrl) : menu.icon" mode="widthFix"
						></image>
					</view>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
import OrderPane from './OrderPane.vue'
import { J_USER_INFO } from '../../../constant'
export default {
	name: 'Pane',
	components: {
		OrderPane
	},
	props: {
		title: {
			type: String,
			required: true
		},

		menuData: {
			type: Array
		},

		permissionData: {
			type: Array
		},

		colum: {
			type: Number,
			default: 4
		}
	},
	data() {
		return {
			userInfo: {},
			specialPane: [],
			renderMenu: []
		}
	},

	computed: {
		// renderMenu() {
		// 	const haveMenuCopyData = JSON.parse(JSON.stringify(this.menuData))
		// 	const intRow = Math.floor(this.menuData.length / this.colum)
		// 	if (intRow * this.colum - this.menuData.length !== 0) {
		// 		const replenishNum = Math.ceil(this.menuData.length / this.colum) * this.colum - this.menuData.length
		// 		const replenishMenu = new Array(replenishNum)
		// 		replenishMenu.fill({})
		// 		haveMenuCopyData.push(...replenishMenu)
		// 	}
		// 	return {
		// 		rowNumber: haveMenuCopyData.length / this.colum,
		// 		data: haveMenuCopyData
		// 	}
		// }
	},
	watch: {
		permissionData: {
			handler(newVal) {
				if (!this.menuData) return this.renderMenu = this.specialPane = []
				const haveSpecialData = []
				const haveMenuData = []
				this.menuData.forEach((item) => {
					const tempIconObj = this.permissionData.find((i) => i.iconName === item.name)
					if (tempIconObj) {
						if (item.name === '我的订单' || item.name === '客服中心' || item.name === '小账本' || item.name === '每日签到' || item.name === '我的券包' || item.name === '我的收藏') {
							if (!item.showRole) {
								haveSpecialData.push({ ...item, iconUrl: tempIconObj.iconUrl })
							} else if (item.showRole && item.showRole.includes(this.userInfo.roleIds)) {
								haveSpecialData.push({ ...item, iconUrl: tempIconObj.iconUrl })
							}
						} else if (!item.showRole) {
							haveMenuData.push({ ...item, iconUrl: tempIconObj.iconUrl })
						} else if (item.showRole && item.showRole.includes(this.userInfo.roleIds)) {
							haveMenuData.push({ ...item, iconUrl: tempIconObj.iconUrl })
						}
					}
				})
				this.specialPane = haveSpecialData
				this.renderMenu = haveMenuData
			},
			immediate: true,
			deep: true
		}
	},

	beforeMount() {
		// console.log(this.menuData)
	},
	created() {
		this.userInfo = uni.getStorageSync(J_USER_INFO)
	}

}
</script>

<style lang="less" scoped>
.pane-wrapper {
	padding: 30upx 24upx 40upx;
	width: 100%;
	box-sizing: border-box;
	background-color: #ffffff;
	border-radius: 20rpx;

	.title-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.left {
			display: flex;
			align-items: center;

			h3 {
				font-size: 28rpx;
				font-weight: bold;
				line-height: 51rpx;
				color: #3D3D3D;
			}
		}
	}

	.row-wrapper {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-wrap: wrap;
		width: 100%;

		.item {
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			width: 25%;
			margin-top: 28upx;
			transition: 350ms all;
			border-radius: 4px;

			&:active {
				background-color: #f0f0f0;
			}

			.menu-name {
				font-size: 28rpx;
				line-height: 51rpx;
				color: #3D3D3D;
			}
		}
	}
}
</style>
