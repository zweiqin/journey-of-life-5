<template>
  <view class="article-detail-container">
    <view class="article-detail-header">
      <JBack dark width="50" height="50"></JBack>
      <image
        class="share"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/aktde54t8chvkgy9lwbi.png"
        mode=""
      />
    </view>

    <view class="article-detail-content">
      <h1 class="title">
        {{ articleInfo.title }}
      </h1>
      <view class="info">
        <view class="time">{{ articleInfo.updateTime }}</view>
        <view class="author">{{ articleInfo.author }}</view>
      </view>
      <image :src="articleInfo.imgUrl" class="adva" mode="" />

      <view
        class="content"
        v-if="!articleInfo.isVip"
        v-html="articleInfo.content"
      ></view>
      <view class="attention" v-else>
        在疫情肆虐的上半年，九牧王的线上微商城月 GMV 基本平均保持在 1000w+
        的水平，其中私域用户贡献占到 90% 。私域会员增长了 10
        万多，其中新会员增加了 30% ，新会员的 GMV 占微商城总 GMV 的 30%
        ，复购率增加 70% 以上。
      </view>

      <view class="recomment">
        <view class="tag">相关阅读</view>

        <!-- <view
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
          <image
            class="article-cover"
            src="https://img2.baidu.com/it/u=829931824,271545605&fm=253&fmt=auto&app=138&f=JPEG?w=450&h=228"
          />
        </view> -->
        <ArticlePane status="more" :data="recommentList"></ArticlePane>
      </view>
    </view>
  </view>
</template>

<script>
import {
  getIndustryInformationDetalApi,
  getIndustryInformationListApi,
} from "../api/marketing-treasure-house";
import ArticlePane from "../pages/marketing-treasure-house/components/article-pane.vue";
import { getRandom } from "../utils";

export default {
  components: {
    ArticlePane,
  },
  onLoad(options) {
    this.articleId = options.id;
    this.getArticleDetail();

    getIndustryInformationListApi({
      page: getRandom(0, 10),
      size: 10,
    }).then(({ data }) => {
      this.recommentList = data.items.slice(0, 5);
    });
  },
  data() {
    return {
      articleId: null,
      articleInfo: {},
      recommentList: [],
    };
  },
  methods: {
    handleToViewArticleDeatil() {
      uni.navigateTo({
        url: "/marketing-treasure-house/article-detail",
      });
    },

    // 获取文章详情
    getArticleDetail() {
      getIndustryInformationDetalApi(this.articleId * 1)
        .then((res) => {
          this.articleInfo = res.data;
        })
        .catch(() => {
          this.$showToast("文章详情获取失败");
          setTimeout(() => {
            uni.navigateBack();
          }, 2000);
        });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/mixin.less";

.article-detail-container {
  padding: 24upx;
  box-sizing: border-box;

  .attention {
    position: relative;
    text-align: center;
    margin: 40upx 0;
    color: #ccc !important;

    &::after {
      content: "该案例为vip尊享，请先开通vip";
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      color: #07b9b9;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 28upx;
      letter-spacing: 2px;
      background: linear-gradient(
        to bottom,
        rgb(255, 255, 255),
        rgba(238, 238, 238, 0.582),
        rgb(255, 255, 255)
      );
    }
  }

  .article-detail-header {
    .flex();

    .share {
      width: 40upx;
      height: 40upx;
    }
  }

  .article-detail-content {
    h1 {
      font-size: 36upx;
      margin-top: 14upx;
    }

    .info {
      color: #999;
      font-size: 20upx;
      .flex(center, flex-start);
      .margin(28upx, 8upx);

      .time {
        margin-right: 40upx;
      }
    }

    .adva {
      width: 100%;
      object-fit: cover;
      border-radius: 20upx;
      height: 156upx;
    }

    .content,
    .attention {
      .margin(20upx, 20upx);
      font-size: 24upx;
      color: #3d3d3d;
      line-height: 2;
    }

    .recomment {
      .tag {
        font-size: 24upx;
        color: #fff;
        background-color: #07b9b9;
        padding: 6upx 22upx;
        display: inline-flex;
        border-radius: 4upx;
        margin-top: 8upx;
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
          font-size: 24upx;
        }

        &-cover {
          width: 142upx;
          height: 108upx;
          border-radius: 10upx;
          margin-left: 20upx;
        }
      }
    }
  }
}
</style>