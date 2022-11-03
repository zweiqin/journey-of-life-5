<template>
  <view class="prod-container">
    <!-- 轮播图 -->
    <view class="carousel-wrapper">
      <JCarousel :list="goodsInfo.gallery" :height="370"></JCarousel>
      <JIcon type="back"></JIcon>
    </view>
  </view>
</template>

<script>
import { getGoodsDetailApi } from "../../api/goods";
export default {
  onLoad(options) {
    this.goodsId = options.goodsId;
    this.getOrderGoodsDetail();
  },

  data() {
    return {
      goodsId: null, // 商品id
      brandId: null, // 商品门店id
      goodsInfo: null, // 商品详情
    };
  },

  methods: {
    // 获取商品详情
    getOrderGoodsDetail() {
      getGoodsDetailApi(this.goodsId).then(({ data }) => {
        console.log(data);
        this.brandId = data.brand.id;
        this.goodsInfo = data.info;
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>