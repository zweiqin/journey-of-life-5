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
      <view class="swiper-item" v-for="(goods, index) in data" :key="index"
        ><JGoods></JGoods
      ></view>
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
  },

  mounted() {
    this.$nextTick(() => {
      let number = 0;
      number = Math.floor(this.data.length / 2);
      if (this.data.length - number * 2 !== 0) {
        number++;
      }
      this.swiperHeight = number * 480;
    });
  },

  data() {
    return {
      swiperHeight: 0,
    };
  },

  methods: {
    handleAwipperChange(e) {
      const current = e.detail.current;
      this.$emit("change", current);
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