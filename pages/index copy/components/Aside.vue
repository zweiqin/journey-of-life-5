<template>
  <view class="aside-container">
    <view
      @click="handleOp(item.event)"
      class="item"
      v-for="item in asides"
      :key="item.img"
    >
      <image class="img" :src="item.img" mode="" />
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      asides: [
        {
          img: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/663dw027pr7kuwxwa7l0.png",
          event: "home",
        },
        {
          img: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/sym4ny6lbd4f2ozru7ai.png",
          event: "top",
        },
      ],
    };
  },

  methods: {
    handleOp(eventName) {
      this.$emit("op", eventName);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../style/mixin.less";

.aside-container {
  .item {
    height: 80upx;
    width: 80upx;
    box-sizing: border-box;
    border-radius: 50%;
    background-color: #fa5151;
    .flex(center, center);

    &:last-child {
      margin-top: 16upx;

      .img {
        width: 34upx;
        height: 40upx;
      }
    }

    .img {
      width: 36upx;
      height: 36upx;
    }
  }
}
</style>