<template>
  <view
    class="active-container"
    :style="{
      background: background,
    }"
  >
    <view class="header">
      <img v-if="title" class="title" :src="title" alt="" />
      <view class="other">
        <slot></slot>
      </view>
      <img v-if="icon" class="icon" :src="icon" alt="" />
    </view>

    <view class="main">
      <img
        class="img"
        src="https://img0.baidu.com/it/u=93190956,80470959&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
        alt=""
      />
      <img
        class="img"
        src="https://img0.baidu.com/it/u=2346763455,2850959081&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=450"
        alt=""
      />
    </view>
  </view>
</template>

<script>
export default {
  props: {
    title: String,
    icon: String,
    background: String,
  },
};
</script>

<style lang="less" scoped>
@import "../../../style/var.less";
@import "../../../style/mixin.less";

.active-container {
  border-radius: @r10;
  background-color: aqua;
  padding: 22upx 12upx;
  box-sizing: border-box;
  width: 348upx;
  box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.1);

  .header {
    margin-bottom: 24upx;
    .flex();
    .title {
      height: 34upx;
    }

    .other {
      flex: 1;
      text-align: center;
    }

    .icon {
      width: 50upx;
    }
  }

  .main {
    width: 100%;
    .flex();

    .img {
      width: 160upx;
      height: 224upx;
      border-radius: @r5;
      object-fit: cover;
    }
  }
}
</style>