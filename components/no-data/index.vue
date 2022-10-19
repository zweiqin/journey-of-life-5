<template>
  <view class="empty-container">
    <img
      v-if="img"
      class="empty-img"
      src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ncs28ma9a3ac5ufebzsw.png"
      alt=""
    />

    <view
      :style="{
        color: color,
      }"
      >{{ text }}</view
    >
  </view>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: "暂无数据",
    },

    color: String,
    img: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
@import "../../style/var.less";

.empty-container {
  width: 100%;
  height: 100%;
  .flex();
  flex-direction: column;
  color: @c9;
  padding-top: 60upx;

  .empty-img {
    .img(80%, 80%);
    margin-bottom: 20px;
  }
}
</style>