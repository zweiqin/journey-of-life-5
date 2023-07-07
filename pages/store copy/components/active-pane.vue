<template>
	<view
		class="acctive-pane-container"
		:style="{
			background:
				type === 'active'
					? 'linear-gradient(159deg, #FA5151 5%, #FFFFFF 100%)'
					: 'linear-gradient(156deg, #FF8F1F 3%, #FFFFFF 96%)'
		}"
		@click="handleToList"
	>
		<view class="header">
			<image
				class="active-title"
				:src="
					type === 'active'
						? common.seamingImgUrl('lsg844jnw9mr3gqxuxds.png')
						: common.seamingImgUrl('oxvqkpvwfk2x3psjkz0k.png')
				"
				mode=""
			/>
			<image
				class="right-arrow"
				:src="common.seamingImgUrl('eo1rayuh8vu1qtnbdj0l.png')"
				mode=""
			/>
		</view>

		<view class="imgs">
			<image
				class="img"
				:src="
					type === 'active'
						? common.seamingImgUrl('vmutr4p1olagtpw9hwnh.png')
						: common.seamingImgUrl('0etmpshgl6x0gu8c815b.png')
				"
				mode=""
			/>
			<image
				class="img"
				:src="
					type === 'active'
						? common.seamingImgUrl('lsjlchz7s1i24yq20v37.png')
						: common.seamingImgUrl('xc5dgpvvyagsmbmvusma.png')
				"
				mode=""
			/>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: 'active'
		}
	},

	methods: {
		handleToList() {
			const _this = this
			uni.navigateTo({
				url:
					_this.type === 'active'
						? '/store/activity-list'
						: '/store/explosives-list'
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../../style/mixin.less";
@import "../../../style/var.less";

.acctive-pane-container {
  width: 350.76upx;
  height: 205.88upx;
  padding: 24upx 8upx;
  box-sizing: border-box;
  border-radius: 10upx;

  .header {
    .flex();
    padding: 0 10upx;
    box-sizing: border-box;
    margin-bottom: 14upx;
  }

  .active-title {
    width: 112upx;
    height: 24upx;
  }

  .right-arrow {
    width: 12upx;
    height: 20upx;
    transform: rotate(180deg);
  }

  .imgs {
    .flex();
    .img {
      width: 162upx;
      height: 132upx;
      object-fit: cover;
    }
  }
}
</style>
