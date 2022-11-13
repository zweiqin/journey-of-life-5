<template>
  <view class="article-panel">
    <view v-for="item in data" :key="item.data">
      <view class="article" @click="handleToViewArticleDeatil(item)">
        <view class="article-info">
          <view class="name">{{ item.title }}</view>
          <view class="time">{{ item.updateTime }}</view>
        </view>
        <easy-loadimage
          :loading-mode="lazyLoadingMode"
          class="article-cover"
          :scroll-top="scrollTop"
          :image-src="item.imgUrl"
        ></easy-loadimage>
      </view>
    </view>
    <uni-load-more
      v-show="data && data.length && status !== 'more'"
      style="margin: 20upx auto"
      :status="status"
      iconType="snow"
      :contentText="contentText"
    ></uni-load-more>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    status: {
      type: String,
      default: "loading",
    },
    scrollTop: Number
  },

  data() {
    return {
      contentText: {
        contentnomore: "我也是有底线的",
      },
    };
  },

  methods: {
    handleToViewArticleDeatil(article) {
      if (!article || !article.id) {
        this.$showToast("文章错误");
        return;
      }
      uni.navigateTo({
        url: "/marketing-treasure-house/article-detail?id=" + article.id,
      });
    },
  },
};
</script>

<style lang="less" scoped>
.article-panel {
  width: 100%;
  .time {
    color: #999;
    font-size: 24upx;
    margin: 50upx 0 0 0;
  }

  .article {
    display: flex;
    justify-content: space-between;
    padding: 24upx 0;
    border-bottom: 1upx solid #d8d8d8;

    .article-info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    .name {
      font-size: 24upx;
      color: #3d3d3d;
      font-weight: bold;
    }

    .time {
      color: #999999;
      margin: 14upx 0 0 0;
    }

    &-cover {
      width: 142upx;
      height: 108upx;
      border-radius: 10upx;
      margin-left: 20upx;
      flex-shrink: 0;
    }
  }
}
</style>