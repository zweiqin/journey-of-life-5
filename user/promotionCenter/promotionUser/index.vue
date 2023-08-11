<template>
	<view class="promotionUser">
		<view class="left">
			<image src="../image/userimg.png" mode="scaleToFill" class="userImg" />
			<view class="userDetail">
				<view class="name">蔡守腾</view>
				<view class="identity">
					<view v-for="item in 2" :key="item" class="moreidentity">123</view>
				</view>
			</view>
		</view>
		<view class="right">
			<image src="../image/share.png" mode="scaleToFill" class="share" />
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {}
	}
}
</script>

<style lang="less" scoped>
.promotionUser {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    .userImg {
      width: 80upx;
      height: 80upx;
      border-radius: 50%;
    }
    .userDetail {
      margin-left: 40upx;
      .name {
        padding-bottom: 10upx;
        font-size: 28upx;
        font-weight: 600;
      }
      .identity {
        font-size: 24upx;
        display: flex;
        .moreidentity {
          margin-right: 20upx;
        }
      }
    }
  }
  .right {
    .share {
      height: 40upx;
      width: 40upx;
    }
  }
}
</style>
