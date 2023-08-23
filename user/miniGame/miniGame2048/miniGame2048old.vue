<template>
	<view>
		<web-view :webview-styles="webviewStyles" src="/hybrid/html/game2048.html"></web-view>
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
		}
	}
</script>

<style lang="scss" scoped>

</style>
