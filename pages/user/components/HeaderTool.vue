<template>
	<view class="header-tool-wrapper">
		<view class="item" @click="$emit('menu-click', { url: '/user/otherServe/chat/chat' })">
			<image class="icon" src="../../../static/user-center/menus/h-message.png"></image>
		</view>

		<view class="item">
			<image class="icon" src="../../../static/user-center/menus/h-code.png"></image>
		</view>

		<view class="item" @click="$emit('menu-click', { url: '/user/info/detail' })">
			<image class="icon" src="../../../static/user-center/menus/h-setting.png"></image>
		</view>
	</view>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.header-tool-wrapper {
	display: flex;
	align-items: center;
	justify-content: flex-end;
	margin-bottom: 6upx;

	.item {
		margin-left: 56upx;
	}

	.icon {
		width: 48upx;
		height: 48upx;
	}
}
</style>
