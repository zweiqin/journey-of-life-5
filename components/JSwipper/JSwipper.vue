<template>
  <swiper
    class="j-swiper-container"
    :style="{
      height: swiperHeight + 'upx',
    }"
    :current="activeIndex"
    @change="handleAwipperChange"
  >
    <swiper-item
      class="swiper-item-wrapper"
      v-for="(item, index) in tabs"
      :key="index"
    >
      <slot v-if="isSlot" :name="item.slotName"></slot>
      <view
        v-else
        class="swiper-item"
        v-for="(goods, index) in data"
        :key="index"
      >
        <JGoods></JGoods>
      </view>
    </swiper-item>
  </swiper>
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
    data: {
      type: Array,
    },
    isSlot: {
      type: Boolean,
      default: false,
    },
    height: [Number, String],
  },

  mounted() {
    this.setSwiperHeight();
  },

  data() {
    return {
      swiperHeight: 0,
    };
  },

  watch: {
    height() {
      this.setSwiperHeight();
    },
  },

  methods: {
    handleAwipperChange(e) {
      const current = e.detail.current;
      this.$emit("change", current);
    },

    setSwiperHeight() {
      this.$nextTick(() => {
        let number = 0;
        if (this.data && this.data.length) {
          number = Math.floor(this.data.length / 2);
          if (this.data.length - number * 2 !== 0) {
            number++;
          }
        }

        this.swiperHeight = this.height ? this.height : number * 480;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.j-swiper-container {
  margin: 10upx 0 5upx;
  .swiper-item-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>