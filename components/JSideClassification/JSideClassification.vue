<template>
  <view class="j-side-classification">
    <view
      class="aside"
      :style="{
        width: sideWidth ? sideWidth * 1 + 'upx' : '',
      }"
    >
      <view class="item active">日用品</view>
      <view class="item">护肤品</view>
      <view class="item">化妆品</view>
    </view>

    <view class="main-area">
      <slot></slot>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    sideWidth: [Number, String],
    name: {
      type: String,
      default: "name",
    },
    value: {},
  },
};
</script>

<style lang="scss" scoped>
.j-side-classification {
  display: flex;
  margin-top: 10upx;
  width: 100%;

  .aside {
    flex-shrink: 0;
    width: 130upx;

    .item {
      font-size: 24upx;
      transition: all 350ms;

      &:not(:last-child) {
        margin-bottom: 54upx;
      }

      &.active {
        color: #3662ec;
      }
    }
  }

  .main-area{
    flex: 1;
  }
}
</style>