<template>
  <view class="banner-container">
    <view class="banner">
      <view class="title-container">
        <text>爆款中心</text>
        <tui-icon
          @click="handleBack"
          class="back-icon"
          name="arrowleft"
          color="#fff"
        ></tui-icon>
      </view>
      <view class="images">
        <image
          class="title1"
          src="../../../../static/index/hot/title3.png"
          mode=""
        />
        <image
          class="title2"
          src="../../../../static/index/hot/title1.png"
          mode=""
        />
        <image
          class="title3"
          src="../../../../static/index/hot/title2.png"
          mode=""
        />

        <view class="coupon-container">
          <view class="main-title">全场最低3折起</view>
          <view class="sub-title">无门槛优惠券 可重叠使用</view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    handleBack() {
      uni.switchTab({
        url: '/pages/index/index',
      })
    },
  },
}
</script>

<style lang="less" scoped>
.banner-container {
  background: radial-gradient(76% 61% at 50% 56%, #ffb773 0%, #ff2c0f 100%);
  padding-top: 60upx;
}
.banner {
  position: relative;
  background: url('../../../../static/index/hot/bg.png') no-repeat 57% center;
  background-size: cover;
  height: 484upx;

  .title-container {
    width: 100%;
    text-align: center;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    text {
      color: #fff;
      font-size: 36upx;
      font-weight: 500;
    }

    .back-icon {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .images {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding-top: 104upx;

    .title1 {
      height: 74upx;
      width: 254upx;
    }

    .title2 {
      height: 40upx;
      width: 314upx;
      margin-bottom: 20upx;
    }

    .title3 {
      height: 54upx;
      width: 408upx;
    }

    .coupon-container {
      position: relative;
      width: 806upx;
      height: 232upx;
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;

      .main-title {
        position: absolute;
        color: #fa5151;
        font-size: 48upx;
        font-weight: 500;
        z-index: 3;
        left: 50%;
        top: 48upx;
        transform: translateX(-55%);
      }

      .sub-title {
        position: absolute;
        color: #fa5151;
        font-size: 24upx;
        font-weight: 500;
        z-index: 3;
        left: 50%;
        top: 116upx;
        transform: translateX(-64%);
      }

      &::after {
        content: '';
        display: block;
        position: absolute;
        width: 806upx;
        height: 232upx;
        background: url('../../../../static/index/hot/coupon.png') no-repeat;
        background-size: cover;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
      }
    }
  }
}
</style>
