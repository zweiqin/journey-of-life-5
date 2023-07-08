<template>
	<view class="navGationBar">
		<view class="navSlotBox">
			<slot></slot>
		</view>
		<view class="navButton" @click="redireatTo">
			<img src="../image/right.png" alt="">
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			navUrl: {
				type: String,
				default: "/user/my-tools/daily-attendance/index"
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			redireatTo() {
				console.log(this.navUrl)
				uni.navigateTo({
					url: this.navUrl
				})
			}
		},
		created() {
			// console.log(this.navUrl)
		}
	}
</script>

<style lang="scss">
.navGationBar {
	display: flex;
	align-items: center;
	box-sizing: border-box;
	// background-color: white;
	position: relative;
	width: 100%;
	min-height: 74rpx;
	padding: 8rpx 0rpx;
	padding-bottom: 14rpx;
	.navButton {
		> img {
			width: 22rpx;
			height: 30rpx;
			position: absolute;
			transform:translateY(-50%);
			top: 50%;
			right: 40rpx;
		}
	}
}
</style>
