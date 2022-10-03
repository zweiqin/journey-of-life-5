<template>
  <view class="j-tabs-container" ref="tabsContainerRef">
    <scroll-view style="position: relative" scroll-x="true">
      <view class="scroll-wrapper-container">
        <view
          class="item"
          :class="{
            'item-active': activeIndex === index,
          }"
          v-for="(item, index) in tabs"
          :key="item.name"
          @click="handleCurrentChange(index)"
        >
          {{ item.name }}
        </view>
      </view>
    </scroll-view>
    <view ref="scrollBarRef" class="scroll-bar"></view>
  </view>
</template>

<script>
export default {
  props: {
    tabs: {
      type: Array,
      required: true,
    },

    activeIndex: {
      type: Number,
      default: 0,
    },
  },

  watch: {
    activeIndex() {
      this.$nextTick(() => {
        this.setScrollBar();
      });
    },
  },

  mounted() {
    this.setScrollBar();
  },

  methods: {
    setScrollBar() {
      // scrollBarRef
      const currentEl = document.querySelector(".item-active");
      const baseLeft = document
        .querySelector(".j-tabs-container")
        .getBoundingClientRect().left;

      if (currentEl) {
        const locale = currentEl.getBoundingClientRect();
        this.$refs.scrollBarRef.$el.style.left = locale.left - baseLeft + "px";
        this.$refs.scrollBarRef.$el.style.width = locale.width + "px";
      }
    },

    handleCurrentChange(index) {
      this.$emit("change", index);
    },
  },
};
</script>

<style lang="less" scoped>
.j-tabs-container {
  position: relative;

  .scroll-wrapper-container {
    display: flex;
    margin: 22upx 0 28upx 0;

    .item {
      font-size: 24upx;
      color: #3d3d3d;
      margin-right: 52upx;
    }

    .item-active {
      color: #fa5151;
      transition: all 350ms;
    }
  }

  .scroll-bar {
    height: 4upx;
    background-color: #fa5151;
    width: 30px;
    border-radius: 10px;
    position: absolute;
    transition: all 350ms;
    bottom: 7px;
  }
}
</style>