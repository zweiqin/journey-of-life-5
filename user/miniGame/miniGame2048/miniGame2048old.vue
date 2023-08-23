<template>
	<view>
		<web-view :webview-styles="webviewStyles" src="https://www.tfwuye.cn/#/minigame"></web-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				webviewStyles: {
					width: '750rpx',
					height: '150vh'
				}
			};
		},
		methods: {
			goBack: function() {
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss" scoped>
.navgationTop {
	box-sizing: border-box;
	width: 100vw;
	height: 88rpx;
	padding: 0 34rpx;
	display: flex;
	align-items: center;
	background-color: none;
	z-index: 999;
	.back {
		width: 60rpx;
		height: 60rpx;
	}
	.defaultBody {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		font-size: 34rpx;
		color: black;
		font-weight: 550;
	}
}
</style>
