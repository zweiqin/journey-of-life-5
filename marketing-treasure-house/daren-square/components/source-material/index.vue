<template>
  <view class="source-material-container">
    <view class="title">商家素材</view>
    <view class="navs">
      <view
        :class="{
          active: currentTab == 0,
        }"
        @click="switchTab(0)"
        class="navs-item"
        >产品/菜品</view
      >
      <view
        :class="{
          active: currentTab == 1,
        }"
        @click="switchTab(1)"
        class="navs-item"
        >环境范围</view
      >
      <view
        :class="{
          active: currentTab == 2,
        }"
        @click="switchTab(2)"
        class="navs-item"
        >门店火爆</view
      >
      <view
        :class="{
          active: currentTab == 3,
        }"
        @click="switchTab(3)"
        class="navs-item"
        >其他</view
      >
      <view :style="{ left: barLeft + 'px' }" class="bar"></view>
    </view>

    <view class="wrapper">
      <Product></Product>
    </view>
  </view>
</template>

<script>
import Product from './components/product.vue'
export default {
  components: {
    Product
  },
  data() {
    return {
      currentTab: 0,
      barLeft: 0,
    };
  },
  mounted() {
    this.setBarPosition();
  },
  methods: {
    setBarPosition() {
      const _this = this;
      this.$nextTick(() => {
        const query = uni.createSelectorQuery().in(this);
        query
          .select(".active")
          .boundingClientRect((data) => {
            console.log(data.width);
            _this.barLeft = data.left + data.width / 2 - 16 - 12;
            console.log(this.barLeft);
          })
          .exec();
      });
    },

    switchTab(currentTab) {
      this.currentTab = currentTab;
      this.setBarPosition();
    },
  },
};
</script>

<style lang="less" scoped>
.source-material-container {
  margin-top: 50upx;
  .title {
    font-size: 32upx;
    font-weight: bold;
  }

  .wrapper{
    margin-top: 18upx;
  }

  .navs {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 32upx 0 20upx 0;

    &-item {
      color: #777;
    }

    .bar {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 50upx;
      height: 3px;
      transition: all 350ms;
      background:linear-gradient(to bottom, #FA5151, #FF8F1F);
    }
  }
}
</style>