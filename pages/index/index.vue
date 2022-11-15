<template>
  <view class="index-container" ref="indexPageRef">
    <!-- <wx-open-launch-weapp
      id="launch-btn"
      username="gh_6303db43d6d6"
      path="pages/mine/minebind.html"
    >
      <button class="btn">打开小程序</button>
    </wx-open-launch-weapp> -->

    <view class="search-bar">
      <JLocale></JLocale>
      <input type="text" />
      <img class="location" src="../../static/images/store/search.png" alt="" />
    </view>

    <!-- 轮播 -->
    <view
      class="banner"
      :style="{
        background: isShowItemPane ? bannerComputed : '',
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
        :style="{
          height: isShowItemPane ? 0 : '',
        }"
      >
        <swiper-item v-for="banner in bannerList" :key="banner.id">
          <img class="banner-img" :src="banner.picUrl" alt="" />
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
          'box-shadow': isShowItemPane
            ? '0px 1px 2px 0px rgba(0, 0, 0, 0.1)'
            : '',
          'margin-bottom': isShowItemPane ? '' : '-5px',
        }"
        @nav-click="handleNavItemClick"
        :navs="navs"
      ></JNavs>

      <view v-show="!isShowItemPane">
        <!-- 活动面板 -->
        <view class="active-wrapper">
          <Active
            class="animate__animated animate__backInLeft"
            url="/home/activity-recommendation"
            icon="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/eorq9fz6tsncy7tsi3l9.png"
            title="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/3sgn8nqyuhc244p73ms2.png"
            background="linear-gradient(180deg, #FFE5CC, rgba(255,255,255,0))"
            left="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/1y72hcdwczhnctxghono.png"
            right="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/p97jz8ckatuf5g6jhhnq.png"
          ></Active>

          <Active
            class="animate__animated animate__backInRight"
            style="padding: 27upx 12upx"
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
        <view class="home-banner animate__animated animate__flipInX">
          <img
            class="img"
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/6kn9oln5hpuexgpebtrj.png"
            alt=""
          />

          <img
            class="vip-text"
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/xd7rf3gaapi84hj96du6.png"
            alt=""
          />

          <button class="btn" @click="go('/user/sever/userUp')">
            立即开通
          </button>
        </view>

        <view class="footer-home">
          <view class="footer-navs">
            <view
              @click="handleSwitchTab('preferential')"
              class="footer-nav-item"
              :class="{ active: currentIndex === 'preferential' }"
              >特惠专区</view
            >

            <view
              @click="handleSwitchTab('hotGoodsList')"
              :class="{ active: currentIndex === 'hotGoodsList' }"
              class="footer-nav-item"
              >爆品选购</view
            >
          </view>

          <view class="footer-goods-wrapper">
            <!-- <view
              @click="handleToViewDetail(item)"
              class="footer-goods"
              v-for="item in footerData"
              :key="item.id"
            >
              <image class="goods-img" :src="item.picUrl" mode="" />

              <view class="goods-info">
                <view class="goods-title">{{ item.name }}</view>
                <view class="goods-price">￥{{ item.retailPrice }}</view>
              </view>
            </view> -->

            <JGoods
              v-for="item in footerData"
              :key="item.id"
              :data="item"
              :scroll-top="scrollTop"
            ></JGoods>
          </view>
        </view>
      </view>

      <view v-if="isShowItemPane && !noData">
        <JTabs
          ref="jTabsRef"
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
          :scroll-top="scrollTop"
          :status="listLoading"
        ></JSwipper>
      </view>

      <noData
        v-show="!labelList.length && isShowItemPane"
        text="该分类下暂无商品"
      ></noData>
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
import NoData from "../../components/no-data";
import { getIndexDataApi } from "../../api/home";
import {
  J_LOACTION,
  J_REFRSH,
  J_STORE_TYPES,
  J_TOKEN_EXPIRE,
  J_USER_TOKEN,
} from "../../constant";
import { getTypeDetailList, getGoodsById } from "../../api/home";
import { J_ORDER_NO } from "../../constant";
import { getPayOrderResultApi } from "../../api/goods";
import { grantVoucherApi } from "../../api/user";
import { whoami } from "../../api/auth";
import { getUserId } from "../../utils";

export default {
  components: {
    Active,
    Panel,
    Goods,
    JAside,
    NoData,
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
      noData: false,

      preferential: [],
      hotGoodsList: [],
      footerData: [],
      currentIndex: "preferential",
      scrollTop: 0,
      bannerList: [],

      footerQuery: {
        page: 1,
        size: 20,
        order: "desc",
        sort: "add_time",
        totalPages: 0,
      },
      mapMethod: {
        voucher: this.grantVoucher,
      },
    };
  },

  onLoad() {
    this.getHomeData();
    this.getFooterData();
    whoami(getUserId()).then(({ data }) => {
      console.log(data);
      uni.setStorageSync(J_TOKEN_EXPIRE, data.expireTime);
      uni.setStorageSync(J_USER_TOKEN, data.token);
    });

    const orderInfo = uni.getStorageSync(J_ORDER_NO);
    if (orderInfo) {
      this.orderInfo = orderInfo;
      getPayOrderResultApi({
        payOrderNo: orderInfo.orderNo,
      }).then((res) => {
        this.isPay = res.errno;
        this.mapMethod[orderInfo.type]();
      });
    }
  },

  onShow() {
    uni.removeStorageSync(J_LOACTION);
    const refrsh = uni.getStorageSync(J_REFRSH);
    uni.removeStorageSync(J_STORE_TYPES);
  },

  methods: {
    // 获取底部商品数据
    getFooterData(isLoadMore) {
      this.footerQuery.isNew = this.currentIndex === "preferential";
      this.footerQuery.isHot = !this.footerQuery.isNew;
      if (this.footerQuery.isHot) {
        delete this.footerQuery.isNew;
      }
      const _this = this;
      getGoodsById({ ...this.footerQuery }).then(({ data }) => {
        if (isLoadMore) {
          _this.footerData.push(...data.goodsList);
        } else {
          _this.footerData = data.goodsList;
        }
        _this.footerQuery.totalPages = data.totalPages;
        uni.hideLoading();
      });
    },

    // 点击navs
    handleNavItemClick(nav) {
      this.currentCategoryId = nav.id;
      this.getOrderList();
      // this.$refs.swipperRef.$el.style.height = 0;
      nav.background = nav.background.replace("137deg", "to bottom");
      this.currentNav = nav;
      this.currentActive = 0;
      this.queryInfo = {
        page: 1,
        size: 10,
        totalPage: 0,
      };
      this.isShowItemPane = true;

      this.$nextTick(() => {
        this.$refs.jTabsRef.setScrollBar();
      });
    },

    // 获取首页数据
    getHomeData() {
      getIndexDataApi().then(({ data }) => {
        this.preferential = data.newGoodsList;
        this.hotGoodsList = data.hotGoodsList;
        // this.footerData = this.preferential;
        this.bannerList = data.topicList.filter((item) => {
          return (
            item.title !== "团蜂科技开业盛典" &&
            item.title !== "千姿万丽内衣专场"
          );
        });
      });
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
        this.isShowItemPane = false;
      } else {
        uni.pageScrollTo({
          scrollTop: 0,
          duration: 300,
        });
      }
    },

    //
    handleSwitchTab(index) {
      this.currentIndex = index;
      this.footerQuery = {
        page: 1,
        size: 20,
        order: "desc",
        sort: "add_time",
        totalPages: 0,
      };

      this.getFooterData();
    },

    // 根据一级类目查询二级类目
    async getOrderList(isLoadMore) {
      const res = await getTypeDetailList({ id: this.currentCategoryId });
      this.labelList = res.data.currentSubCategory;

      if (!this.labelList.length) {
        this.noData = true;
      } else {
        this.noData = false;
      }

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

    handleToViewDetail(info) {
      this.go("/pages/prod/prod?goodsId=" + info.id);
    },

    grantVoucher() {
      const _this = this;
      grantVoucherApi({
        orderId: _this.orderInfo.jfOrder,
      }).then(() => {
        uni.removeStorageSync(J_ORDER_NO);
      });
    },
  },

  computed: {
    bannerComputed() {
      console.log(
        this.currentNav.background.slice(
          0,
          this.currentNav.background.length - 1
        ) + ", #fff)"
      );
      return (
        this.currentNav.background.slice(
          0,
          this.currentNav.background.length - 1
        ) + ", #fff)"
      );
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
    if (this.isShowItemPane) {
      if (this.queryInfo.page >= this.queryInfo.totalPage) {
        this.listLoading = "nomore";
        return;
      }
      this.listLoading = "loading";
      this.queryInfo.page++;
      this.getOrderList(true);
    } else {
      if (this.footerData.length < this.footerQuery.size) {
        return;
      }

      if (this.footerQuery.totalPages <= this.footerQuery.page) {
        this.$showToast("亲，已经到底了");
        return;
      }

      uni.showLoading({
        title: "加载中",
      });

      this.footerQuery.page++;
      this.getFooterData(true);
    }
  },

  onPageScroll(scrollTop) {
    this.scrollTop = scrollTop.scrollTop;
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
    // opacity: 0;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    width: 95%;
    height: 72upx;
    top: 32upx;
    left: 50%;
    padding: 16upx 24upx;
    transform: translateX(-50%);
    background-color: #fff;
    color: #000000;
    font-size: 24upx;
    border-radius: 50upx;
    z-index: 200;

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

      .banner-img {
        width: 100%;
        height: 552upx;
        object-fit: cover;
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
      padding-bottom: 0 !important;
      margin-bottom: 40upx;
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

      .vip-text {
        position: absolute;
        height: 34upx;
        top: 56upx;
        left: 28upx;
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

.footer-home {
  padding-bottom: 100upx;

  .footer-navs {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #3d3d3d;
    font-size: 28upx;
    transition: all 350ms;

    .footer-nav-item {
      padding-bottom: 10upx;
      border-bottom: 4upx solid transparent;
      transition: all 350ms;

      &:nth-child(1) {
        margin-right: 20px;
      }

      &.active {
        color: #fa5151;
        border-bottom-color: #fa5151;
      }
    }
  }

  .footer-goods-wrapper {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    // background-color: #f7f7f7;
    margin-top: 30upx;

    .footer-goods {
      width: 348upx;
      border-radius: 40upx 40upx 0 0;
      overflow: hidden;
      margin-bottom: 30upx;

      .goods-img {
        width: 100%;
        height: 290upx;
        object-fit: cover;
        display: block;
      }

      .goods-info {
        width: 348upx;
        padding: 20upx;
        box-sizing: border-box;
        background-color: #fff;

        .goods-title {
          width: 100%;
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
          font-size: 24upx;
        }
      }

      .goods-price {
        width: 100%;
        text-align: center;
        color: #fa5151;
        font-size: 24upx;
        margin-top: 20upx;
        font-size: 30upx;
      }
    }
  }
}
</style>
