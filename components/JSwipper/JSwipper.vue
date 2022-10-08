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
      <view class="flex" v-else>
        <view class="swiper-item" v-for="(goods, index) in data" :key="index">
          <JGoods v-if="type === 'goods'"></JGoods>
          <JStorePane ref="jStoreDetailRef" v-else></JStorePane>
        </view>
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
    type: {
      type: String,
      default: "goods",
    },
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
        let itemHeight = 0;

        if (this.data && this.data.length) {
          itemHeight =
            this.type === "goods"
              ? 480
              : (this.$refs.jStoreDetailRef[0].$el.clientHeight + 10) * 2;

          number =
            this.type === "goods"
              ? Math.floor(this.data.length / 2)
              : this.data.length;

          if (this.type === "goods" && this.data.length - number * 2 !== 0) {
            number++;
          }
        }

        this.swiperHeight = this.height ? this.height : number * itemHeight;
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

.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>