<template>
  <view class="index-container">
    <view class="search-bar">
      <view class="local-wrapper">
        <img
          class="location"
          src="../../static/images/index/location.png"
          alt=""
        />
        <text class="locale">佛山市</text></view
      >
      <input type="text" />
      <img class="location" src="../../static/images/store/search.png" alt="" />
    </view>

    <!-- 轮播 -->
    <view class="banner">
      <swiper
        class="swiper"
        indicator-dots
        autoplay
        indicator-color="#fff"
        indicator-active-color="#fff"
      >
        <swiper-item>
          <img
            src="https://img0.baidu.com/it/u=281212525,3135931031&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            alt=""
          />
        </swiper-item>
        <swiper-item>
          <img
            src="https://img2.baidu.com/it/u=2075742647,1178517082&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=428"
            alt=""
          />
        </swiper-item>
        <swiper-item>
          <img
            src="https://img2.baidu.com/it/u=3592206539,1858276708&fm=253&fmt=auto&app=138&f=JPEG?w=600&h=354"
            alt=""
          />
        </swiper-item>
      </swiper>
    </view>

    <view class="main">
      <JNavs :navs="navs"></JNavs>

      <!-- 活动面板 -->
      <view class="active-wrapper">
        <Active
          icon="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/eorq9fz6tsncy7tsi3l9.png"
          title="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/3sgn8nqyuhc244p73ms2.png"
          background="linear-gradient(180deg, #FFE5CC, rgba(255,255,255,0))"
        ></Active>
        <Active
          title="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/fopsiop6q7gh6l9pyomb.png"
          background="linear-gradient(180deg, #FCDBDB, rgba(255,255,255,0))"
          icon="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/raoa68uwyb2emu7mocv9.png"
        >
          <view class="active-slot">跟榜购好物</view>
        </Active>
      </view>

      <!-- 活动banner -->
      <view class="home-banner">
        <img
          class="img"
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/6kn9oln5hpuexgpebtrj.png"
          alt=""
        />

        <button class="btn">立即开通</button>
      </view>

      <!-- 附近联盟商家 -->
      <Panel title="附近联盟商家" routeText="更多">
        <view class="store-wrapper">
          <Goods></Goods>
          <Goods></Goods>
          <Goods></Goods>
          <Goods></Goods>
          <Goods></Goods>
          <Goods></Goods>
          <Goods></Goods>
          <Goods></Goods>
          <Goods></Goods>
          <Goods></Goods>
          <Goods></Goods>
          <Goods></Goods>
          <Goods></Goods>
          <Goods>v</Goods>
        </view>
      </Panel>
    </view>
  </view>
</template>

<script>
import { homeNavs } from "./config";
import Active from "./components/Active.vue";
import Panel from "../../components/panel";
import Goods from "../../components/goods";

export default {
  components: {
    Active,
    Panel,
    Goods,
  },
  data() {
    return {
      navs: homeNavs,
    };
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
@import "../../style/var.less";

.index-container {
  padding-bottom: 180upx;
  // 搜索
  .search-bar {
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    width: 95%;
    height: 72upx;
    top: 54upx;
    left: 50%;
    padding: 16upx 24upx;
    transform: translateX(-50%);
    background-color: #fff;
    color: #000000;
    font-size: 24upx;
    border-radius: 50upx;
    z-index: 200;

    .local-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .locale {
        padding: 0 10upx;
        border-right: 1px solid #ccc;
      }
    }

    .location {
      width: 40upx;
    }

    input {
      flex: 1;
      padding: 0 30upx;
    }
  }
  // 轮播
  .banner {
    width: 100%;
    height: 552upx;
    border-radius: 0 0 20upx 20upx;
    overflow: hidden;

    .swiper {
      width: 100%;
      height: 552upx;

      /deep/ .uni-swiper-dot-active {
        border-radius: 0;
        width: 40upx !important;
      }

      /deep/ .uni-swiper-dot {
        border-radius: 0px;
        height: 4upx;
        width: 4upx;
        margin-right: 6upx;
      }

      img {
        width: 100%;
        height: 552upx;
      }
    }
  }

  .main {
    padding: 34upx 16upx;
    box-sizing: border-box;

    // 活动面板
    .active-wrapper {
      .flex();
      margin-bottom: 34upx;
      .active-slot {
        font-size: @f12;
        color: #e1b590;
      }
    }

    // banner
    .home-banner {
      position: relative;
      width: 100%;
      margin-bottom: 30upx;
      .img {
        width: 100%;
      }

      .btn {
        position: absolute;
        right: 32upx;
        bottom: 24upx;
        padding: 16upx;
        margin: 0;
        height: auto;
        line-height: 1;
        font-size: 24upx;
        color: #fff;
        background: linear-gradient(270deg, #fa5151, #ff8f1f);
      }
    }

    //
    .store-wrapper {
      .flex();
      padding-top: 8px;
      flex-wrap: wrap;
    }
  }
}
</style>