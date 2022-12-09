<template>
  <view class="local-life">
    <view class="pane">
      <view class="search">
        <JLocale></JLocale>
        <JIcon type="search" width="40" height="40"></JIcon>
      </view>
      <Navs></Navs>
    </view>

    <view class="main">
      <StorePane
        v-for="brand in storeList"
        :key="brand.id"
        :data="brand"
      ></StorePane>

      <uni-load-more
        :contentText="contentText"
        :status="loadingStatus"
      ></uni-load-more>
    </view>
  </view>
</template>

<script>
import Navs from "./components/navs";
import StorePane from "./components/store-pane";
import { getSroreListApi } from "../../api/store";
export default {
  components: {
    Navs,
    StorePane,
  },

  data() {
    return {
      storeList: [],
      totalPage: 0,
      queryInfo: {
        page: 1,
        size: 10,
      },
      loadingStatus: "loading",
      contentText: {
        contentdown: "上拉显示更多",
        contentrefresh: "正在加载...",
        contentnomore: "没有更多门店了",
      },
    };
  },

  onLoad() {
    this.getStoreList();
  },

  methods: {
    async getStoreList(type) {
      uni.showLoading({
        title: "加载中",
      });
      const { data } = await getSroreListApi({ ...this.queryInfo });
      this.totalPage = data.totalPages;
      if (type === "loadmore" && type !== "pushDown") {
        this.storeList.push(...data.brandList);
      } else {
        this.storeList = data.brandList;
      }
      uni.hideLoading();
      if (type === "pushDown") {
        uni.stopPullDownRefresh();
      }
    },
  },

  onPullDownRefresh() {
    this.queryInfo = {
      page: 1,
      size: 10,
    };
    this.getStoreList("pushDown");
  },

  onReachBottom() {
    if (this.storeList.length < this.queryInfo.size) {
      this.loadingStatus = "no-more";
      return;
    }

    if (this.queryInfo.page >= this.totalPage) {
      this.loadingStatus = "no-more";
      return;
    }

    this.queryInfo.page++;
    this.getStoreList("loadmore");
  },
};
</script>

<style lang="less" scoped>
.local-life {
  background-color: #f6f6f6;
  min-height: 100vh;
  padding-bottom: 100upx;

  .pane {
    width: 100%;
    background-color: #fff;
    padding: 0 16upx;
    box-sizing: border-box;
  }

  .search {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 1upx solid #777777;
    height: 72upx;
    border-radius: 100px;
    padding: 0 26upx;
    box-sizing: border-box;
    margin-top: 60upx;
  }

  .main {
    background-color: #f6f6f6;
    padding: 12upx 16upx;
    box-sizing: border-box;
  }
}
</style>