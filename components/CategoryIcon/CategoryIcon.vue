<template>
	<view style="display: flex;flex-direction: column;align-items: center;" @click="go('/pages/index/selectCommodity/selectCommodity')">
		<tui-icon class="search-icon" name="manage" color="#000000" :size="18"></tui-icon>
		<text style="font-size: 26upx;">分类</text>
	</view>
</template>

<script>
export default {
	methods: {
		handleClick() {
			uni.showToast({
				title: '功能未开放',
				duration: 2000,
				icon: 'none'
			})
		}
	}
}
</script>

<style lang="less" scoped>
</style>
