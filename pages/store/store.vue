<template>
  <view class="store-detail">
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

    <view class="banner">
      <swiper
        ref="swipperRef"
        class="swiper"
        indicator-dots
        autoplay
        indicator-color="#fff"
        indicator-active-color="#fff"
      >
        <swiper-item>
          <img
            src="https://img0.baidu.com/it/u=3866459166,2693507635&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=667"
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

    <JTabs
      @change="handleChangeCurrentPane"
      :activeIndex="currentActive"
      :tabs="storeLabelList"
      class="j-tabs"
    ></JTabs>

    <view class="list-wrapper">
      <JSwipper
        @change="handleChangeCurrentPane"
        :activeIndex="currentActive"
        :tabs="storeLabelList"
        :data="[{}, {}, {}, {}]"
        type="store"
      >
        <template #store-title>
          <view class="active-pane">
            <ActivePane></ActivePane>
            <ActivePane type="recommend"></ActivePane>
          </view>
        </template>
      </JSwipper>
    </view>
  </view>
</template>

<script>
import ActivePane from "./components/active-pane.vue";
export default {
  components: {
    ActivePane,
  },
  data() {
    return {
      storeLabelList: [
        {
          name: "综合",
          value: 0,
        },
        {
          name: "家具店",
          value: 1,
        },
        {
          name: "日用百货",
          value: 2,
        },
        {
          name: "汽车店",
          value: 3,
        },
        {
          name: "酒店",
          value: 4,
        },
      ],
      currentActive: 0,
    };
  },

  methods: {
    handleChangeCurrentPane(index) {
      this.currentActive = index;
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
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

.banner {
  width: 100%;
  height: 552upx;
  border-radius: 0 0 40upx 40upx;
  transition: all 350ms 100ms;
  overflow: hidden;

  .swiper {
    width: 100%;
    height: 552upx;
    transition: all 350ms;
    border-radius: 0 0 40upx 40upx;

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

.j-tabs {
  padding: 0 16upx;
  box-sizing: border-box;
}

.list-wrapper {
  padding: 0 22upx 22upx 22upx;
  box-sizing: border-box;
}

/deep/ .scroll-wrapper-container {
  justify-content: space-between;
}

.active-pane {
  width: 100%;
  .flex();
  margin-bottom: 20upx;
}
</style>