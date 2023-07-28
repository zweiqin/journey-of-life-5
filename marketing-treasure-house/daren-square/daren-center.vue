<template>
	<view class="my-center">
		<!-- <h1>成为达人</h1> -->
		<image src="../../static/images/square/icon5.png" mode="" />
		<view class="desc">
			您还没完成达人入驻流程， 入驻达人成功后才能使用该功能哦
		</view>

		<button
			class="uni-btn"
			@click="go('/marketing-treasure-house/daren-square/apply-daren')"
		>
			成为达人
		</button>
		<button class="uni-btn" @click="handleBack">返回</button>
	</view>
</template>

<script>
export default {
	methods: {
		handleBack() {
			this.$switchTab('/pages/marketing-treasure-house/marketing-treasure-house')
		}
	}
}
</script>

<style lang="less" scoped>
.my-center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 32upx;
  padding-top: 52upx;

  // h1 {
  //   font-size: 32upx;
  //   font-weight: bold;
  // }

  image {
    width: 390upx;
    margin: 50upx 0 40upx 0;
  }

  .desc {
    width: 650upx;
    font-weight: 24upx;
    color: #777;
    text-align: center;
    line-height: 1.5;
    margin-bottom: 222upx;
  }

  .uni-btn {
    width: 408upx;
    height: 70upx;
    text-align: center;
    line-height: 70upx;
    border: 2upx solid #d8d8d8;
    border-radius: 0;
    margin-bottom: 22upx;
  }
}
</style>
