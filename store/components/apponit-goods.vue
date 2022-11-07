<template>
  <view class="apponit-goods-container">
    <image
      class="goods-img"
      src="https://img0.baidu.com/it/u=1199506365,281604388&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1667840400&t=122fd3f324f607d67ae111fee67dfbc6"
      mode=""
    />

    <view class="info">
      <view class="goods-title"
        >loglogloglogloglogloglogloglogloglogloglogloglogloglogloglog</view
      >
      <view class="tags">
        <view class="tag">官方直售</view>
        <view class="tag">新品首发</view>
      </view>

      <view class="sale-time">
        <view class="desc">开售时间</view>
        <view class="time">2022-10-18 18：00</view>
      </view>

      <view class="price-info">
        <view class="price">
          <text class="icon">￥</text>
          <text class="price-">199.9</text>
        </view>

        <button class="uni-btn">立即预约</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.apponit-goods-container {
  display: flex;
  font-size: 28upx;
  color: #3d3d3d;
  margin-bottom: 26upx;

  .goods-img {
    width: 200upx;
    height: 200upx;
    border-radius: 20upx;
    flex-shrink: 0;
    margin-right: 22upx;
  }

  .info {
    flex: 1;
    .goods-title {
      width: 432upx;
      font-weight: bold;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .tags {
      display: flex;
      font-size: 24upx;
      margin: 18upx 0;

      .tag {
        padding: 2upx 14upx;
        color: #fa5151;
        border: 1upx solid #fa5151;
        border-radius: 4px;

        &:first-child {
          margin-right: 10upx;
        }
      }
    }

    .sale-time {
      display: flex;
      justify-content: flex-start;
      align-items: center;

      font-size: 20upx;
      color: #999;
      .time {
        color: #3662ec;
        margin-left: 10upx;
      }
    }

    .price-info {
      color: #fa5151;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 6px;

      .price {
        font-size: 36upx;

        .icon {
          font-size: 24upx;
        }
        .price- {
          font-size: 36upx;
        }
      }

      .uni-btn {
        width: 166upx;
        height: 50upx;
        background-color: #fa5151;
        font-size: 24upx;
        color: #fff;
        line-height: 50upx;
      }
    }
  }
}
</style>