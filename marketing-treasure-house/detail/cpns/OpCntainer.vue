<template>
	<view class="op-container" :style="opContainerStyle">
		<view class="back" @click="handleBack">
			<tui-icon color="#fff" name="arrowleft"></tui-icon>
		</view>

		<view class="right-container">
			<view class="image-wrapper">
				<image class="image" src="../../../static/square/detail/marks.png" mode="" @click="$showToast('功能未开放', 'none')" />
			</view>
			<view class="image-wrapper">
				<image class="image" src="../../../static/square/detail/home.png" mode="" @click="$switchTab('/pages/marketing-treasure-house/marketing-treasure-house')" />
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		scrollTop: {
			type: Number,
			default: 0
		}
	},

	computed: {
		opContainerStyle() {
			return {
				position: this.scrollTop > 200 ? 'fixed' : 'static',
				background: this.scrollTop > 200 ? '#fff' : ''
			}
		}
	},

	methods: {
		handleBack() {
			uni.navigateBack({
				delta: 1
			})
		}
	}
}
</script>

<style lang="less" scoped>
.op-container {
	height: 120upx;
	width: 100%;
	top: 0;
	left: 0;
	right: 0;
	transition: all 350ms;
	// background-color: aqua;

	display: flex;
	align-items: center;
	justify-content: space-between;

	.right-container {
		display: flex;
		align-items: center;
	}

	.image-wrapper {
		width: 72upx;
		height: 72upx;
		background-color: rgba(0, 0, 0, 0.2);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-right: 20upx;

		.image {
			width: 40upx;
			height: 40upx;
		}
	}
}
</style>
