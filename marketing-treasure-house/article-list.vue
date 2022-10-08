<template>
  <view class="article-list-container">
    <view class="article-list-header">
      <JBack
        tabbar="/pages/marketing-treasure-house/marketing-treasure-house"
        dark
        width="50"
        height="50"
      ></JBack>
      <view class="title">{{ nav.label }}</view>
    </view>

    <ArticleList class="article-list"></ArticleList>
  </view>
</template>

<script>
import { getNavInfo } from "../pages/marketing-treasure-house/config";
import ArticleList from "../pages/marketing-treasure-house/components/article-pane.vue";

export default {
  components: {
    ArticleList,
  },
  data() {
    return {
      nav: {},
    };
  },
  onLoad(options) {
    this.nav = getNavInfo(options.title * 1);
    console.log(this.nav);
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

    .title {
      flex: 1;
      font-weight: bold;
      text-align: center;
    }
  }

  .article-list{
    margin-top: -26upx;
  }
}
</style>