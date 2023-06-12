<template>
	<tui-lazyload-img
		class="image-wrapper" :width="width ? width * 2 + 'rpx' : size * 2 + 'rpx'"
		:height="height ? height * 2 + 'rpx' : size * 2 + 'rpx'" :src="src" :radius="radius"
		:background-color="backgroundColor" mode="scaleToFill" @click="$emit('click')"
	></tui-lazyload-img>
</template>

<script>
export default {
	props: {
		src: {
			type: String,
			default: ''
		},

		size: {
			type: Number,
			default: 80
		},

		width: {
			type: Number
		},

		height: {
			type: Number
		},

		radius: {
			type: String,
			default: '50%'
		},
		backgroundColor: {
			type: String,
			default: '#fff'
		}
	}
}
</script>

<style lang="less" scoped>
.image-wrapper {
	flex-shrink: 0;
}
</style>
