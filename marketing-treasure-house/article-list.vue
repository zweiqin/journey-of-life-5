<template>
  <view class="article-list-container">
    <view class="article-list-header">
      <JBack
        tabbar="/pages/marketing-treasure-house/marketing-treasure-house"
        dark
        width="50"
        height="50"
      ></JBack>
      <view class="title">{{ title }}</view>
    </view>

    <ArticleList
      :status="loadingStatus"
      :data="articleListData"
      class="article-list"
    ></ArticleList>
  </view>
</template>

<script>
import { getIndustryInformationListApi } from "../api/marketing-treasure-house";
import ArticleList from "../pages/marketing-treasure-house/components/article-pane.vue";

export default {
  components: {
    ArticleList,
  },
  data() {
    return {
      title: "",
      loadingStatus: "loading",
      query: {
        page: 1,
        size: 10,
      },
      total: 0,
      articleListData: [],
      isLoading: false,
    };
  },
  onLoad(options) {
    this.title = options.title;
    this.query.type = options.type;
    this.getArticleList();
  },

  methods: {
    getArticleList(isLoadMore) {
      this.loadingStatus = "loading";
      getIndustryInformationListApi({ ...this.query }).then(({ data }) => {
        this.total = data.total;
        if (isLoadMore) {
          this.articleListData.push(...data.items);
        } else {
          this.articleListData = data.items;
        }

        this.loadingStatus = "more";
        this.isLoading = false;
      });
    },
  },

  onReachBottom() {
    if (this.articleListData.length >= this.total) {
      this.loadingStatus = "noMore";
      return;
    }
    if (this.isLoading) {
      return;
    }

    this.isLoading = true;
    this.query.page++;
    this.getArticleList(true);
  },
};
</script>

<style lang="less" scoped>
.article-list-container {
  padding: 34upx;
  box-sizing: border-box;

  .article-list-header {
    display: flex;
    align-items: center;
    font-size: 32upx;
    color: #3d3d3d;
    margin-bottom: 40upx;

    .title {
      flex: 1;
      font-weight: bold;
      text-align: center;
    }
  }

  .article-list {
    margin-top: -26upx;
  }
}
</style>