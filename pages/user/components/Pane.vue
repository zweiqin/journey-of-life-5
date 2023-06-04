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
					<BeeIcon v-if="menu.iconUrl" :size="32" :src="common.seamingImgUrl(menu.iconUrl)"></BeeIcon>
					<image v-else style="width: 64upx; height: 64upx"> </image>
					<text class="menu-name">{{ menu.name }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
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

	computed: {
		renderMenu() {
			if (!this.menuData) {
				return []
			}
			const haveMenuData = []
			this.menuData.forEach((item) => {
				const tempIconObj = this.permissionData.find((i) => i.iconName === item.name)
				if (tempIconObj) haveMenuData.push({ ...item, iconUrl: tempIconObj.iconUrl })
			})
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
	}

}
</script>

<style lang="less" scoped>
.pane-wrapper {
	padding: 30upx 48upx 40upx 24upx;
	width: 100%;
	box-sizing: border-box;
	background-color: #fff;
	border-radius: 10upx;
	margin-top: 24upx;

	.title-wrapper {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.left {
			display: flex;
			align-items: center;

			h3 {
				color: #000000;
				font-weight: 500;
				font-size: 28upx;
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
		}
	}
}
</style>
