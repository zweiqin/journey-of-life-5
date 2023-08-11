<template>
	<view class="promotionFans">
		<view class="fansDetail">
			<image
				:src="common.seamingImgUrl('c3lf6qrk8xetm971qsux.jpg')"
				mode="scaleToFill"
				class="fansImg"
			/>
			<view class="fansInformation">
				<view class="top">
					<view class="information">
						<view class="fansName">张飞</view>
						<view class="fansId">123</view>
					</view>
					<view class="payNumber">支付订单数：11</view>
				</view>
				<view class="bottom">
					<view class="fansTime">2022-04-19 15:03:54</view>
					<view class="fansPayNumber">
						支付订单总额： <text class="fansMoney">￥217911.00</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'PromotionFans',
	props: {},
	data() {
		return {}
	}
}
</script>

<style lang="less" scoped>
.promotionFans {
  background: #faf9fc;
  padding: 14upx 12upx;
  .fansDetail {
    display: flex;
    font-size: 24upx;
    background: white;
    border-radius: 20upx;
    padding: 15upx 15upx;
    .fansImg {
      width: 80upx;
      height: 80upx;
      border-radius: 50%;
    }
    .fansInformation {
      flex: 1;
      .top {
        display: flex;
        justify-content: space-between;
        .information {
          display: flex;
          .fansName {
            font-weight: 600;
          }
          .fansId {
            margin-left: 26upx;
            padding: 2upx 12upx;
            border-radius: 40upx;
            background: #fcdbdb;
            color: #fa5151;
          }
        }
      }
      .bottom {
        margin-top: 10upx;
        display: flex;
        justify-content: space-between;
        .fansMoney {
          color: #fa5151;
        }
      }
    }
  }
}
</style>
