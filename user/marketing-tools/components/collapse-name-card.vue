<template>
  <view class="collapse-name-card">
    <view class="collapse-header" @click="handleCollapse">
      <view class="title">基本信息</view>
      <JIcon
        :class="{
          isCollapse: isCollapse,
        }"
        width="36"
        height="44"
        type="right-arrow"
      ></JIcon>
    </view>

    <view
      ref="mainContentRef"
      class="collapse-wrapper"
      :style="{
        height: !isCollapse ? height + 'px' : 0,
      }"
    >
      <slot></slot>
    </view>

  </view>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      height: "",
    };
  },

  mounted() {
    this.$nextTick(() => {
      const location = this.$refs.mainContentRef.$el.getBoundingClientRect();
      this.height = location.height;
    });
  },

  props: {
    title: {
      type: String,
    },
  },

  methods: {
    handleCollapse() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style lang="less" scoped>
.collapse-name-card {
  width: 100%;
  padding-bottom: 20upx;

  .collapse-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // background-color: rgb(206, 206, 206);
    width: 100%;
    font-size: 28upx;
    color: #3d3d3d;
    font-weight: bold;

    .j-icon {
      transition: all 350ms;
    }

    .isCollapse {
      transform: rotate(90deg);
    }
  }

  .collapse-wrapper {
    transition: all 350ms;
    // background-color: aqua;
    overflow: hidden;
  }


}
</style>