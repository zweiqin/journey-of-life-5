<template>
  <view
    class="j-line-title"
    :style="{
      background: color,
    }"
  >
    <text :style="{ color: color }" ref="textRef" class="text">{{
      title
    }}</text>
  </view>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      required: true,
    },

    color: String,
  },
  mounted() {
    this.$nextTick(() => {
      const textEl = this.$refs.textRef.$el;
      const { height } = textEl.getBoundingClientRect();
      textEl.style.top = -(height / 2) + "px";
    });
  },
};
</script>

<style lang="less" scoped>
.j-line-title {
  position: relative;
  height: 1px;
  width: 300upx;
  background-color: #d8d8d8;
  border-radius: 50%;
  margin: 18upx auto;

  .text {
    position: absolute;
    color: #3d3d3d;
    font-size: 24upx;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    padding: 0 10px;
  }
}
</style>