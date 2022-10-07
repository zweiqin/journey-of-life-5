<template>
  <view class="evaluate-container">
    <view class="evaluate-container-header">
      <view class="evaluate-container-header-item">
        <text class="count">5.0</text>
        <text class="text">综合评分</text>
      </view>
      <view class="evaluate-container-header-item">
        <text class="count">100+</text>
        <text class="text">评价数</text>
      </view>
    </view>

    <view class="evaluate-item">
      <view class="cust-info">
        <JAvatar
          src="https://img2.baidu.com/it/u=1577053018,3245596189&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
          :size="80"
        ></JAvatar>
        <view class="info-wrapper">
          <view class="name">黄苟</view>
          <Rate :rate="5" :size="13"></Rate>
        </view>
        <view class="time">2022-06-06 03：01：00</view>
      </view>

      <view class="evaluate-text">
        正品，质量非常好!!!正品，质量非常好!!!正品，质量非常好!!!正品，质量非常好!!!正品，质量非常好!!!
      </view>

      <view class="goods-info">
        <JAvatar
          src="http://t14.baidu.com/it/u=3604961094,856486922&fm=224&app=112&f=JPEG?w=500&h=500&s=0061D115E44676EE5AFD4D610300E030"
          :size="80"
          radius="10"
        ></JAvatar>

        <view class="goods-wrapper">
          <view class="goods-name"
            >舒克宽头高密旋洁牙刷舒克宽头高密旋洁牙刷舒克宽头高密旋洁牙刷</view
          >
          <view style="display: flex; justify-content: space-between"
            ><view class="goods-price">￥27.98</view>
            <view class="saled">已售 200+</view>
          </view>
        </view>
      </view>
    </view>

    <view class="evaluate-item">
      <view class="cust-info">
        <JAvatar
          src="https://img2.baidu.com/it/u=1577053018,3245596189&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
          :size="80"
        ></JAvatar>
        <view class="info-wrapper">
          <view class="name">黄苟</view>
          <Rate :rate="5" :size="13"></Rate>
        </view>
        <view class="time">2022-06-06 03：01：00</view>
      </view>

      <view class="evaluate-text">
        正品，质量非常好!!!正品，质量非常好!!!正品，质量非常好!!!正品，质量非常好!!!正品，质量非常好!!!
      </view>

      <view class="goods-info">
        <JAvatar
          src="http://t14.baidu.com/it/u=3604961094,856486922&fm=224&app=112&f=JPEG?w=500&h=500&s=0061D115E44676EE5AFD4D610300E030"
          :size="80"
          radius="10"
        ></JAvatar>

        <view class="goods-wrapper">
          <view class="goods-name"
            >舒克宽头高密旋洁牙刷舒克宽头高密旋洁牙刷舒克宽头高密旋洁牙刷</view
          >
          <view style="display: flex; justify-content: space-between"
            ><view class="goods-price">￥27.98</view>
            <view class="saled">已售 200+</view>
          </view>
        </view>
      </view>
    </view>

    <view class="evaluate-item">
      <view class="cust-info">
        <JAvatar
          src="https://img2.baidu.com/it/u=1577053018,3245596189&fm=253&fmt=auto&app=138&f=JPEG?w=400&h=400"
          :size="80"
        ></JAvatar>
        <view class="info-wrapper">
          <view class="name">黄苟</view>
          <Rate :rate="5" :size="13"></Rate>
        </view>
        <view class="time">2022-06-06 03：01：00</view>
      </view>

      <view class="evaluate-text">
        正品，质量非常好!!!正品，质量非常好!!!正品，质量非常好!!!正品，质量非常好!!!正品，质量非常好!!!
      </view>

      <view class="goods-info">
        <JAvatar
          src="http://t14.baidu.com/it/u=3604961094,856486922&fm=224&app=112&f=JPEG?w=500&h=500&s=0061D115E44676EE5AFD4D610300E030"
          :size="80"
          radius="10"
        ></JAvatar>

        <view class="goods-wrapper">
          <view class="goods-name"
            >舒克宽头高密旋洁牙刷舒克宽头高密旋洁牙刷舒克宽头高密旋洁牙刷</view
          >
          <view style="display: flex; justify-content: space-between"
            ><view class="goods-price">￥27.98</view>
            <view class="saled">已售 200+</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import valueAddedServices from "../../logistics/value-added-services.vue";
import Rate from "../../components/rate";

export default {
  components: { valueAddedServices, Rate },
};
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin.less";

.evaluate-container {
  width: 100%;

  &-header {
    .flex();
    margin-bottom: 40upx;

    .evaluate-container-header-item {
      width: 334upx;
      height: 150upx;
      background: linear-gradient(
        131deg,
        #ff8f1f 0%,
        rgba(250, 81, 81, 0) 100%
      );
      border-radius: 10upx;

      .flex(center, center);
      flex-direction: column;

      &:last-child {
        background: linear-gradient(
          133deg,
          #07b9b9 0%,
          rgba(7, 185, 185, 0) 100%,
          rgba(7, 185, 185, 0) 100%
        );
      }

      .count {
        font-size: 48upx;
        color: #fff;
      }

      .text {
        font-size: 28upx;
        color: #fff;
        margin-top: 10upx;
      }
    }
  }

  .evaluate-item {
    margin-bottom: 40upx;

    .cust-info {
      .flex(center, flex-start);

      .info-wrapper {
        margin-left: 22upx;
        flex: 1;
        font-size: 24upx;

        .name {
          margin-bottom: 10upx;
        }
      }

      .time {
        font-size: 20upx;
        color: #777;
      }
    }

    .evaluate-text {
      margin: 22upx 0 28upx 0;
      font-size: 24upx;
      color: @c3d;
    }
  }

  .goods-info {
    .flex();
    font-size: 24upx;

    .goods-wrapper {
      margin-left: 32upx;
      color: @c3d;
      flex: 1;
      .goods-name {
        width: 300upx;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        margin-bottom: 10upx;
      }
    }

    .goods-price,
    .saled {
      color: #fa5151;
    }
  }
}
</style>