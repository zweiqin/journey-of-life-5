<template>
	<view class="photo-search-container" @click="handleClick">
		<!-- 拍照搜 -->
		<image class="photo-icon" src="./photo.png" mode="" />
		<text>拍照搜</text>
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
.photo-search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .photo-icon {
    width: 48upx;
    height: 48upx;
    flex-shrink: 0;
  }

  text {
    font-size: 24upx;
  }
}
</style>
