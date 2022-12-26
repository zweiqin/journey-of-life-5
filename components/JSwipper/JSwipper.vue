<template>
  <swiper
    class="j-swiper-container"
    :style="{
      height: swiperHeight + 80 + 'upx',
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
      <view class="flex" v-else-if="data && data.length">
        <slot name="store-title"></slot>
        <view class="swiper-item" v-for="(goods, index) in data" :key="index">
          <JGoods
            class="j-goods"
            ref="jGoodsRef"
            :scrollTop="scrollTop"
            :data="goods"
            v-if="type === 'goods'"
          ></JGoods>
          <JStorePane
            :data="goods"
            class="store-pane-pane"
            ref="jStoreDetailRef"
            v-else
          ></JStorePane>
        </view>
      </view>
      <NoData style="height: 400upx" v-else></NoData>
      <uni-load-more
        v-show="data && data.length"
        style="margin: 0 auto"
        :status="status"
        iconType="snow"
      ></uni-load-more>
    </swiper-item>
  </swiper>
</template>

<script>
import NoData from "../no-data";
export default {
  components: {
    NoData,
  },
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
    status: {
      type: String,
      default: "loading",
    },
    scrollTop: Number,
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

    data() {
      this.setSwiperHeight();
    },
  },

  methods: {
    handleAwipperChange(e) {
      const current = e.detail.current;
      console.log(e);
      this.$emit("change", current);
    },

    setSwiperHeight() {
      this.$nextTick(() => {
        let number = 0;
        let itemHeight = 0;

        setTimeout(() => {
          if (this.data && this.data.length) {
            itemHeight =
              this.type === "goods"
                ? (this.$refs.jGoodsRef[0].$el.clientHeight + 20) * 2
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
        }, 1000);
      });
    },
  },
};
</script>

<style lang="less" scoped>
.j-swiper-container {
  margin: 10upx 0 5upx;
  .swiper-item-wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    // .swiper-item{
    //   width: 100%;
    // }
  }
}

.flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>