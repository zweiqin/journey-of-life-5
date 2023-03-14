<template>
  <view
    class="hot-goods-container"
    @click="go('/pages/prod/prod?goodsId=' + data.id)"
    v-if="data"
  >
    <view class="image-wrapper">
      <tui-lazyload-img
        width="348rpx"
        height="300rpx"
        mode="scaleToFill"
        :src="data.picUrl"
      ></tui-lazyload-img>

      <view class="bar">
        <view class="stock">剩余:100件</view>
        <view class="hot-tag">
          <image
            class="hot-icon"
            src="../../../../static/index/hot/fire-fill.png"
            mode=""
          />
          <text>爆款</text>
        </view>
      </view>
    </view>

    <view class="goods-info">
      <view class="goods-name">{{ data.name }} </view>
      <view class="tags">
        <view class="tag">优惠促销</view>
        <view class="tag">官方补贴</view>
      </view>
      <view class="price-buy">
        <view class="price-text"><text>￥</text>{{ data.counterPrice }}</view>
        <button class="uni-btn">立即购买</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.hot-goods-container {
  width: 348upx;
  border-radius: 20upx;
  overflow: hidden;

  .image-wrapper {
    position: relative;

    .bar {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 50upx;
      background: linear-gradient(180deg, #f687c4 0%, #ee6868 100%);
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 12upx;

      .hot-tag {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 94upx;
        height: 36upx;
        border-radius: 100upx;
        background: linear-gradient(0deg, #de2511 0%, #eb2f96 100%);

        .hot-icon {
          width: 28upx;
          height: 28upx;
        }

        text {
          color: #fff;
          font-size: 24upx;
        }
      }

      .stock {
        font-size: 24upx;
        color: #fff;
        font-weight: 500;
      }
    }
  }

  .goods-info {
    padding: 12upx 18upx;
    background-color: #fff;

    .goods-name {
      width: 300upx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #000;
    }

    .tags {
      display: flex;
      align-items: center;
      margin: 12upx 0 20upx 0;

      .tag {
        color: #fa5151;
        border: 1upx solid #fa5151;
        padding: 0 6upx;
        border-radius: 10upx;
        font-size: 20upx;

        &:nth-child(1) {
          margin-right: 10upx;
        }
      }
    }

    .price-buy {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .price-text {
        font-size: 36upx;
        color: #ee6868;

        text {
          font-size: 28upx;
        }
      }

      .uni-btn {
        padding: 12upx 24upx;
        background-color: #fa5151;
        font-size: 24upx;
        color: #fff;
      }
    }
  }
}
</style>
