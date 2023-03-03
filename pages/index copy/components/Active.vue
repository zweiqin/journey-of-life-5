<template>
  <view
    class="active-container"
    :style="{
      background: background,
    }"
    @click="handleTo"
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
        :src="left"
        alt=""
      />
      <img
        class="img"
        :src="right"
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
    url: String,
    left: String,
    right: String
  },

  methods: {
    handleTo() {
      uni.navigateTo({
        url: this.url,
      });
    },
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