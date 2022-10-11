<template>
  <view class="index-container" ref="indexPageRef">
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
    <view
      class="banner"
      :style="{
        background: isShowItemPane ? currentNav.background : '',
        borderRadius: isShowItemPane ? '0' : '',
      }"
    >
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

    <view
      class="main"
      :style="{
        top: isShowItemPane ? '-418upx' : '',
      }"
    >
      <JNavs
        class="navs"
        :style="{
          padding: isShowItemPane ? '20upx' : '',
        }"
        @nav-click="handleNavItemClick"
        :navs="navs"
      ></JNavs>

      <view v-show="!isShowItemPane">
        <!-- 活动面板 -->
        <view class="active-wrapper">
          <Active
            url="/home/activity-recommendation"
            icon="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/eorq9fz6tsncy7tsi3l9.png"
            title="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/3sgn8nqyuhc244p73ms2.png"
            background="linear-gradient(180deg, #FFE5CC, rgba(255,255,255,0))"
            left="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/1y72hcdwczhnctxghono.png"
            right="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/p97jz8ckatuf5g6jhhnq.png"
          ></Active>

          <Active
            url="/home/ranking-list"
            title="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/fopsiop6q7gh6l9pyomb.png"
            background="linear-gradient(180deg, #FCDBDB, rgba(255,255,255,0))"
            icon="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/raoa68uwyb2emu7mocv9.png"
            left="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/fo37zvx4ociws9zr1uzu.png"
            right="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/z9cyu6zondn6mlmo4un2.png"
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
            <Goods
              v-for="store in storeList"
              :key="store.id"
              :url="store.picUrl"
              :desc="store.desc"
              :name="store.name"
            ></Goods>
          </view>
        </Panel>
      </view>

      <view v-if="isShowItemPane">
        <JTabs
          @change="handleChangeCurrentPane"
          :activeIndex="currentActive"
          :tabs="labelList"
          class="j-tabs"
        ></JTabs>

        <JSwipper
          @change="handleChangeCurrentPane"
          :activeIndex="currentActive"
          :tabs="labelList"
          :data="data"
          type="goods"
          :status="listLoading"
        ></JSwipper>
      </view>
    </view>
    <JAside
      @op="handleOp"
      :style="{
        right: isShowItemPane ? '40upx' : '',
      }"
    ></JAside>
  </view>
</template>

<script>
import { homeNavs } from "./config";
import Active from "./components/Active.vue";
import Panel from "../../components/panel";
import Goods from "../../components/goods";
import JAside from "./components/Aside.vue";
import { getSroreListApi } from "../../api/store";
import {
  getTypeDetailList,
  getGoodsById,
  getAllCategoryList,
} from "../../api/home";

export default {
  components: {
    Active,
    Panel,
    Goods,
    JAside,
  },
  data() {
    return {
      navs: homeNavs,
      isShowItemPane: false,
      currentNav: {},
      labelList: [],
      currentActive: 0,
      data: [{}, {}, {}, {}, {}],

      storeList: [],
      totalPages: 1,

      // 分类类目
      currentCategoryId: 0,
      currentCategoryList: [],

      // 请求数据
      queryInfo: {
        page: 1,
        size: 10,
        totalPage: 0,
      },
      listLoading: "loading",
    };
  },

  onLoad() {
    this.getStoreList();
  },

  methods: {
    // 点击navs
    handleNavItemClick(nav) {
      this.currentCategoryId = nav.id;
      this.getOrderList();
      this.$refs.swipperRef.$el.style.height = 0;
      nav.background = nav.background.replace("137deg", "to bottom");
      this.currentNav = nav;
      this.currentActive = 0;
      this.queryInfo = {
        page: 1,
        size: 10,
        totalPage: 0,
      };
      this.isShowItemPane = true;
    },

    handleChangeCurrentPane(index) {
      this.currentActive = index;
      this.queryInfo = {
        page: 1,
        size: 10,
        totalPage: 0,
      };
      this.getOrderList();
    },

    // aside 两个操作icon
    handleOp(eventName) {
      if (eventName === "home") {
        this.$refs.swipperRef.$el.style.height = "";
        this.isShowItemPane = false;
      } else {
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 300,
        });
      }
    },

    // 获取首页门店
    async getStoreList() {
      const res = await getSroreListApi({
        page: 1,
        size: 10,
      });

      this.totalPages = res.data.totalPages;
      this.storeList = res.data.brandList;
    },

    // 根据一级类目查询二级类目
    async getOrderList(isLoadMore) {
      const res = await getTypeDetailList({ id: this.currentCategoryId });
      this.labelList = res.data.currentSubCategory;

      const listRes = await getGoodsById({
        categoryId: this.labelList[this.currentActive].id,
        page: this.queryInfo.page,
        size: this.queryInfo.size,
      });

      if (isLoadMore) {
        this.data.push(...listRes.data.goodsList);
      } else {
        this.data = listRes.data.goodsList;
      }

      this.queryInfo.totalPage = listRes.data.totalPages;
      this.listLoading = "";
    },
  },

  watch: {
    isShowItemPane(value) {
      if (value) {
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 300,
        });
      }
    },
  },

  onReachBottom() {
    if (this.queryInfo.page >= this.queryInfo.totalPage) {
      this.listLoading = "nomore";
      return;
    }
    this.listLoading = "loading";
    this.queryInfo.page++;
    this.getOrderList(true);
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
@import "../../style/var.less";

.index-container {
  padding-bottom: 180upx;
  height: 100vh;

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
    border-radius: 0 0 40upx 40upx;
    transition: all 350ms 100ms;
    overflow: hidden;

    .swiper {
      width: 100%;
      height: 552upx;
      transition: all 350ms;

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
    // background-color: #fff;
    position: relative;
    top: 0;
    transition: all 350ms;

    .navs {
      background-color: #fff;
      border-radius: 20upx;
      box-sizing: border-box;
      box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.1);
      padding-bottom: 0 !important;
    }

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

  .j-tabs {
    padding-left: 10px;
    padding-right: 10px;
  }
}

.aside-container {
  position: fixed;
  bottom: 140upx;
  right: -100%;
  transition: all 350ms 350ms;
}
</style>
