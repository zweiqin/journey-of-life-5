<template>
  <view class="price-pane">
    <view class="header">
      <view class="header-title">{{ title }}</view>
      <view v-if="isRecharge" class="help">?</view>
    </view>

    <view class="prices">
      <view class="price-item" v-for="item in data" :key="item">
        <view class="text">{{ item }}元</view>
        <view v-if="isRecharge" class="desc">售价{{ item }}元</view>
      </view>

      <view class="price-item other-btn" v-if="isRecharge">
        <view class="text">更多面额</view>
        <view class="desc">自定义</view>
      </view>

      <view class="price-item recharge-other-btn" v-else> 其他金额 </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: String,
    isRecharge: Boolean,
    data: Array,
  },
};
</script>

<style lang="less" scoped>
@import "../../../../style/mixin.less";

.price-pane {
  width: 100%;
  font-size: 28upx;
  color: #3d3d3d;

  .header {
    .flex();
    padding: 32upx 0;
    .help {
      color: #999;
      border: 1upx solid #999;
      width: 40upx;
      height: 40upx;
      text-align: center;
      line-height: 40upx;
      border-radius: 50%;
    }
  }

  .prices {
    width: 100%;
    display: flex;
    flex-wrap: wrap;

    .flex();
    .price-item {
      width: 194upx;
      height: 140upx;
      flex-shrink: 0;
      .flex(center, center);
      flex-direction: column;
      border: 1upx solid #fa5151;
      border-radius: 10upx;
      margin-bottom: 40upx;

      .text {
        font-size: 36upx;
        font-weight: bold;
      }

      .desc {
        margin-top: 16upx;
      }

      &.recharge-other-btn {
        font-size: 36upx;
        color: #3662ec;
      }

      &.other-btn {
        .text {
          font-size: 36uxp;
          color: #00b578;
        }
      }
    }
  }
}
</style>