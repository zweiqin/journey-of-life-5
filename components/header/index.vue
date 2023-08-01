<template>
	<view class="header-container">
		<img
			class="back"
			:src="common.seamingImgUrl('qt4o7j0jglkweyicy1fw.png')"
			alt=""
			@click="back"
		/>
		<view>{{ title }}</view>
	</view>
</template>

<script>
export default {
	props: {
		title: {
			type: String,
			required: true
		},
		redirect: String
	},
	methods: {
		back() {
			if (this.redirect) {
				this.$switchTab(this.redirect)
				return
			}
			uni.navigateBack()
		}
	}
}
</script>

<style lang="less" scoped>
.header-container {
  width: 100%;
  height: 100upx;
  line-height: 100upx;
  padding: 0 20upx;
  box-sizing: border-box;
  text-align: center;
  color: #3d3d3d;

  .back {
    width: 46upx;
    float: left;
    margin-top: 30upx;
  }
}
</style>
