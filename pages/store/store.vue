<template>
  <view class="store-detail" style="padding-bottom: 100upx">
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

    <!-- <view class="navs">
        <view class="item" v-for="item in storeLabelList" :key="item.name">{{
          item.name
        }}</view>
      </view> -->

    <JTabs
      @change="handleChangeCurrentPane"
      :activeIndex="currentActive"
      :tabs="storeLabelList"
      class="j-tabs"
      noScrollBar
    ></JTabs>

    <!-- <view class="list-wrapper">
      <JSwipper
        @change="handleChangeCurrentPane"
        :activeIndex="currentActive"
        :tabs="storeLabelList"
        :data="data"
        type="store"
      >
        <template #store-title>
          <view class="active-pane">
            <ActivePane></ActivePane>
            <ActivePane type="recommend"></ActivePane>
          </view>
        </template>
      </JSwipper>
    </view> -->

    <view class="store-list">
      <view class="header">
        <ActivePane></ActivePane>
        <ActivePane type="recommend"></ActivePane>
      </view>

      <view v-if="homeStores.length">
        <JStorePane
          v-for="item in homeStores"
          :data="item"
          :key="item.id"
        ></JStorePane>
      </view>

      <!-- <view v-else class="no-data"> 暂无门店信息 </view> -->
      <JNoData v-else text="暂无门店信息" type="store"></JNoData>
    </view>
  </view>
</template>

<script>
import ActivePane from "./components/active-pane.vue";
import { getStoreAndGoods } from "../../api/store";
import { J_STORE_TYPES, J_LOACTION } from "../../constant";
import { getStoreTypesApi } from "../../api/user";

export default {
  components: {
    ActivePane,
  },

  onLoad() {
    this.getStoreList();
  },

  onShow() {
    uni.removeStorageSync(J_LOACTION);
    this.getStoreTypes();
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

      query: {
        brandgenreId: null,
        page: 1,
        size: 10,
      },

      totalPage: 0,

      data: [],
      loadingStatus: "hidden",
    };
  },

  methods: {
    // 切换门店类型
    handleChangeCurrentPane(index) {
      this.currentActive = index;
      const store = this.storeLabelList[index];
      if (store.value === 0) {
        this.query.brandgenreId = null;
      } else {
        this.query.brandgenreId = store.value;
      }
      this.query.page = 1;
      this.getStoreList();
    },

    // 获取门店列表
    getStoreList(isMore) {
      getStoreAndGoods(this.query).then(({ data }) => {
        this.totalPage = data.totalPage;
        if (isMore) {
          this.data.push(data.brandList);
        } else {
          this.data = data.brandList;
        }
      });
    },

    // 获取门店类型
    getStoreTypes() {
      const _this = this;
      let types = uni.getStorageSync(J_STORE_TYPES);

      if (!types) {
        getStoreTypesApi({
          page: 1,
          size: 30,
        })
          .then(({ data }) => {
            types = data.items;
            this.$forceUpdate();

            uni.setStorageSync(J_STORE_TYPES, data.items);
          })
          .catch((err) => {
            console.log(err);
            _this.$showToast("门店类型获取失败");
          });
      } else {
        this.storeLabelList = types.map((item) => {
          return {
            name: item.storeName,
            value: item.id,
          };
        });

        this.storeLabelList.unshift({
          name: "综合",
          value: 0,
        });
      }
    },
  },

  onReachBottom() {
    if (this.query.page >= this.totalPage) {
      this.loadingStatus = "noMore";
      return;
    }

    if (this.query.size > this.data.length) {
      return;
    }

    this.page++;
    this.getStoreList(true);
  },

  computed: {
    homeStores() {
      return this.data.filter((item) => {
        return item.goodsList.length >= 1;
      });
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

.navs {
  display: flex;
  padding: 0 16upx;
  box-sizing: border-box;
  font-size: 28upx;
  overflow-x: scroll;

  .item {
    white-space: nowrap;
    margin-right: 96upx;
    color: #3d3d3d;
    height: 40upx;
    line-height: 40upx;
  }
}

.j-tabs {
  box-sizing: border-box;
  padding: 0 16upx;
  margin-bottom: -30upx;

  /deep/ .item {
    font-size: 24upx;
  }

  /deep/ .item-active {
    font-weight: bold;
  }
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

.store-list {
  padding: 16upx;
  box-sizing: border-box;

  .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20upx;
  }
}

.no-data {
  width: 100%;
  height: 200upx;
  text-align: center;
  line-height: 200upx;
  color: #b9b9b9;
}
</style>