<template>
  <view class="marketing-treasure-house-container">
    <view class="view-bg"></view>
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

    <view class="main">
      <JNavs class="navs" @nav-click="handleNavItemClick" :navs="navs"></JNavs>

      <img
        style="width: 100%"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/kt23gi8yd5dzptviv2wl.png"
        alt=""
      />

      <JLineTitle color="#FA5151" title="免费案例"></JLineTitle>

      <ArticlePane :status="loadingStatus" :data="allList"></ArticlePane>
    </view>
  </view>
</template>

<script>
import { navs } from "./config";
import ArticlePane from "./components/article-pane.vue";
import { getIndustryInformationListApi } from "../../api/marketing-treasure-house";

export default {
  components: {
    ArticlePane,
  },
  onLoad() {
    this.getArticleList();
  },
  data() {
    return {
      navs,
      allList: [],
      queryInfo: {
        page: 1,
        size: 10,
        isVip: false,
      },
      total: 0,
      loadingStatus: "loading",
      isLoading: false,
    };
  },
  onReachBottom() {
    console.log("我好累");
    if (this.allList.length >= this.queryInfo.total) {
      this.loadingStatus = "noMore";
      return;
    }

    if (this.isLoading) {
      return;
    }

    this.queryInfo.page++;
    this.loadingStatus = 'loading'
    this.isLoading = true
    this.getArticleList(true);
  },
  methods: {
    handleNavItemClick(nav) {
      uni.navigateTo({
        url: nav.url,
      });
    },

    async getArticleList(isLoadmore) {
      const res = await getIndustryInformationListApi({ ...this.queryInfo });
      if (isLoadmore) {
        this.allList.push(...res.data.items);
      } else {
        this.allList = res.data.items;
      }
      this.total = res.data.total;

      this.loadingStatus = "more";
      this.isLoading = false;
    },
  },
};
</script>

<style lang="less" scoped>
.j-line-title {
  margin: 40upx auto;
}
.marketing-treasure-house-container {
  padding-top: 160upx;
  padding-bottom: 120upx;

  .view-bg {
    position: absolute;
    top: 0;
    left: 0;
    background: url("https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/2rlfz31333yt1dzs9wiv.png")
      no-repeat;
    height: 700upx;
    width: 100%;
  }

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

  .main {
    position: relative;
    padding: 20upx;
    box-sizing: border-box;
    z-index: 200;

    .navs {
      background-color: #fff;
      padding: 32upx 40upx 10upx;
      box-sizing: border-box;
      border-radius: 20upx;
      box-shadow: 0px 1px 2px 0px rgb(223, 223, 223);
    }
  }
}
</style>