<template>
	<view class="j-back-container">
		<image
			:style="{
				width: width * 1 + 'upx',
				height: height * 1 + 'upx'
			}" :src="dark
				? common.seamingImgUrl('qt4o7j0jglkweyicy1fw.png')
				: common.seamingImgUrl('eo1rayuh8vu1qtnbdj0l.png')
			" mode="" @click="handleBack"
		/>
	</view>
</template>

<script>
export default {
	name: 'JBack',
	props: {
		tabbar: {
			type: String
		},
		width: {
			type: [Number, String],
			default: 16
		},
		height: {
			type: [Number, String],
			default: 28
		},
		dark: Boolean
	},
	methods: {
		handleBack() {
			if (this.tabbar) {
				this.$switchTab(this.tabbar)
				return
			}
			uni.navigateBack()
		}
	}
}
</script>
