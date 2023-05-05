<template>
	<swiper :style="{ height }" class="swiper">
		<swiper-item v-for="(image, index) in list" :key="index">
			<tui-lazyload-img
				width="100%" :height="height" :src="imageKey ? image[imageKey] : image"
				:mode="mode" @click="$emit('click', image)"
			></tui-lazyload-img>
		</swiper-item>
	</swiper>
</template>

<script>
export default {
	props: {
		list: {
			type: Array,
			required: true
		},

		imageKey: {
			type: String,
			default: ''
		},

		width: {
			type: String,
			default: ''
		},

		height: {
			type: String,
			default: '370rpx'
		},

		mode: {
			type: String,
			default: 'widthFix'
		}
	}
}
</script>

<style lang="scss" scoped></style>
