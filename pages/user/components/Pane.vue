<template>
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

		<view class="menu-wrapper">
			<view class="row-wrapper">
				<view v-for="menu in renderMenu" :key="menu.name" class="item" @click="$emit('menu-click', menu)">
					<img class="icons" v-if="menu.iconUrl" :src="common.seamingImgUrl(menu.iconUrl)" alt="">
					<!-- 使用uniapp内置image组件渲染会经过很多的解析，在图片过大的情况下解析的过程会很长，造成很长时间的空白期 -->
					<!-- <image class="icons" v-if="menu.iconUrl" :src="common.seamingImgUrl(menu.iconUrl)" mode=""></image> -->
					<!-- <BeeIcon v-if="menu.iconUrl" :size="32" :src="common.seamingImgUrl(menu.iconUrl)"></BeeIcon> -->
					<image v-else style="width: 64upx; height: 64upx"> </image>
					<text class="menu-name">{{ menu.name }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { J_USER_INFO } from '../../../constant'
export default {
	name: 'Pane',
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
	beforeMount() {
		// console.log(this.menuData)
	},
	data() {
		return {
			userInfo: {}
		}
	},

	computed: {
		renderMenu() {
			if (!this.menuData) {
				return []
			}
			const haveMenuData = []
			try{
				this.menuData.forEach((item) => {
					const tempIconObj = this.permissionData.find((i) => i.iconName === item.name)
					if (tempIconObj) {
						if (!item.showRole) {
							haveMenuData.push({ ...item, iconUrl: tempIconObj.iconUrl })
						} else if (item.showRole && item.showRole.includes(this.userInfo.roleIds)) {
							haveMenuData.push({ ...item, iconUrl: tempIconObj.iconUrl })
						}
					}
				})
			}catch(e){
				console.log(e)
			}
			console.log(haveMenuData)
			return haveMenuData
			// const haveMenuCopyData = JSON.parse(JSON.stringify(this.menuData))
			// const intRow = Math.floor(this.menuData.length / this.colum)
			// if (intRow * this.colum - this.menuData.length !== 0) {
			// 	const replenishNum = Math.ceil(this.menuData.length / this.colum) * this.colum - this.menuData.length
			// 	const replenishMenu = new Array(replenishNum)
			// 	replenishMenu.fill({})
			// 	haveMenuCopyData.push(...replenishMenu)
			// }
			// return {
			// 	rowNumber: haveMenuCopyData.length / this.colum,
			// 	data: haveMenuCopyData
			// }
		}
	},
	created() {
		this.userInfo = uni.getStorageSync(J_USER_INFO)
	}

}
</script>

<style lang="less" scoped>
.icons {
	width: 66rpx;
	height: 66rpx;
}
.pane-wrapper {
	padding: 30upx 48upx 40upx 24upx;
	width: 100%;
	box-sizing: border-box;
	background-color: #fff;
	border-radius: 20rpx;
	margin-top: 24upx;

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

			text {
				font-size: 24upx;
			}
			.menu-name {
				font-size: 20rpx;
				line-height: 51rpx;
				color: #3D3D3D;
			}
		}
	}
}
</style>
