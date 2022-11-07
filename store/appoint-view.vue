<template>
  <view class="apponit-view-container">
    <view class="back" style="margin-left: 10px">
      <JBack></JBack>
    </view>

    <view class="navs">
      <view
        @click="changeApponitPane(0)"
        :class="{ active: currentTab === 0 }"
        class="item"
        >商品预约</view
      >
      <view
        @click="changeApponitPane(1)"
        :class="{ active: currentTab === 1 }"
        class="item"
        >活动预约</view
      >
    </view>

    <!-- active -->
    <!-- <view class="main">
      <view v-if="currentTab === 0" class="goods-apponit-wrapper">
        <ApponitGoods></ApponitGoods>
        <ApponitGoods></ApponitGoods>
        <ApponitGoods></ApponitGoods>
        <ApponitGoods></ApponitGoods>
        <ApponitGoods></ApponitGoods>
        <ApponitGoods></ApponitGoods>
        <ApponitGoods></ApponitGoods>
      </view>

      <view v-if="currentTab === 1">
        <JActive></JActive>
        <JActive></JActive>
        <JActive></JActive>
        <JActive></JActive>
        <JActive></JActive>
        <JActive></JActive>
        <JActive></JActive>
        <JActive></JActive>
      </view>
    </view> -->

    <JNoData type="active" text="暂无活动"></JNoData>
  </view>
</template>

<script>
import ApponitGoods from "./components/apponit-goods";

export default {
  data() {
    return {
      currentTab: 0,
    };
  },

  components: {
    ApponitGoods,
  },

  methods: {
    // 改变面板
    changeApponitPane(data) {
      this.currentTab = data;
    },
  },
};
</script>

<style lang="scss" scoped>
.apponit-view-container {
  position: relative;
  padding: 80upx 18upx;
  box-sizing: border-box;
  background: linear-gradient(180deg, #fa5151, #fff);
  font-size: 28upx;
  color: #fff;
  min-height: 100vh;

  /deep/ .text {
    color: #fff;
  }

  /deep/ .j-back-container{
    position: relative;
    z-index: 12;
  }

  &::after {
    content: "";
    position: absolute;
    display: block;
    width: 100%;
    height: 400upx;
    background: url("https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/rp6rbbcs6geya3iwj8g7.png")
      no-repeat;
    background-size: cover;
    top: 10px;
    left: 0;
    z-index: 9;
  }

  .navs {
    position: relative;
    z-index: 10;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 84upx 0 30upx 0;

    .item {
      padding-bottom: 18upx;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: 0;
        width: 80%;
        height: 4upx;
        border-radius: 20px;
        background-color: transparent;
        transition: all 350ms;
      }

      &.active {
        &::after {
          background-color: #fff;
        }
      }
    }
  }

  .main {
    position: relative;
    z-index: 11;
    background-color: #ffffff;
    border-radius: 20upx;
    padding: 18upx;
    box-sizing: border-box;
  }
}
</style>