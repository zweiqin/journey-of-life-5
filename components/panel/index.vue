<!-- * @Author: 13008300191 904947348@qq.com
	* @Date: 2022-09-12 16:17:04
	* @LastEditors: 13008300191 904947348@qq.com
	* @LastEditTime: 2022-09-26 10:27:08
	* @FilePath: \团蜂商城 - 副本\tuan-uniapp\components\panel\index.vue
	* @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE -->
<template>
	<view class="panel">
		<view class="header">
			<text class="title">{{ title }}</text>
			<view v-if="routeText" class="route-wrapper" @click="handleToLink">
				<text class="route">{{ routeText }}</text>
				<img class="icon" :src="common.seamingImgUrl('8jef23u4szet1cnjuec5.png')" alt="icon" />
			</view>
		</view>

		<slot></slot>
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true
		},

		routeText: {
			type: String
		},

		route: {
			type: String
		}
	},
	methods: {
		handleToLink() {
			if (!this.route) {
				return
			}
			uni.navigateTo({
				url: this.route
			})
		}
	}
}
</script>

<style lang="less" scoped>
.panel {
	width: 100%;
	margin-bottom: 40upx;

	.header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 10upx;

		.title,
		.route {
			line-height: 32upx;
		}

		.title {
			color: #3d3d3d;
			font-size: 24upx;
			font-weight: bold;
		}

		.icon {
			width: 12upx;
		}

		.route-wrapper {
			display: flex;
			align-items: center;

			.route {
				color: #999999;
				font-size: 20upx;
				margin-right: 10upx;
			}
		}
	}
}
</style>
