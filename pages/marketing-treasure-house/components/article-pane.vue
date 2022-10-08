<template>
  <view class="article-panel">
    <view v-for="item in 4" :key="item">
      <view class="time">2022年9月21日 星期三</view>
      <view
        class="article"
        v-for="item in 4"
        :key="item"
        @click="handleToViewArticleDeatil"
      >
        <view class="article-info">
          <view class="name"
            >震惊！！！家居产业再迎新机遇，市场再次 迎来大发展</view
          >
          <view class="time">11:23</view>
        </view>
        <img
          class="article-cover"
          src="https://img2.baidu.com/it/u=829931824,271545605&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=228"
        />
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    handleToViewArticleDeatil() {
      uni.navigateTo({
        url: "/marketing-treasure-house/article-detail",
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
    padding: 24upx 0;
    border-bottom: 1upx solid #d8d8d8;

    .name {
      font-size: 24upx;
      color: #3d3d3d;
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
    }
  }
}
</style>