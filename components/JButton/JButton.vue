<template>
  <view class="j-button" @click="$emit('click')" :style="btnStyle"><slot></slot></view>
</template>

<script>
const mapBtnTextColor = {
  primary: "#fff",
  info: "#999999",
  danger: "#fff",
};

const mapBtnType = {
  primary: "#00B578",
  info: "#EFEFEF",
  danger: "#FA5151",
};

export default {
  props: {
    width: {
      type: [Number, String],
      default: 458,
    },
    height: {
      type: [Number, String],
      default: 86,
    },
    type: {
      type: String,
      default: "primary",
    },
  },

  computed: {
    btnStyle() {
      return {
        width: this.width + "upx",
        height: this.height + "upx",
        backgroundColor: mapBtnType[this.type],
        color: mapBtnTextColor[this.type],
      };
    },
  },
};
</script>

<style lang="less" scoped>
.j-button {
  font-size: 48upx;
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  border-radius: 100px;
}
</style>