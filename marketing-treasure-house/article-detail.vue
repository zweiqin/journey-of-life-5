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
        【行业解析】国内材料市场价格大幅上涨 家具行业持续扩大需求
      </h1>
      <view class="info">
        <view class="time">2022年9月21日 星期三</view>
        <view class="author">巨蜂发布</view>
      </view>
      <image
        src="https://img0.baidu.com/it/u=341143845,1756073482&fm=253&fmt=auto&app=138&f=JPEG?w=1477&h=500"
        class="adva"
        mode=""
      />

      <view class="content">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam vitae
        incidunt laboriosam quia accusamus. Vitae harum accusantium eos earum
        tenetur adipisci, consectetur culpa at, ab expedita dolor hic tempore
        officiis! Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
        id iure provident odio quam saepe pariatur asperiores nobis consequuntur
        sapiente quibusdam distinctio ullam ratione modi, quae unde expedita
        similique eos Lorem ipsum dolor sit, amet consectetur adipisicing elit.
        Quam soluta aliquid ab eius culpa ut dolorum ratione reprehenderit magni
        voluptatibus cumque, voluptatem totam molestiae itaque odio molestias
        doloremque quo illum?Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Obcaecati hic eius rem, nostrum modi laborum aut nisi dolor atque
        impedit ut delectus eaque natus quas eum repudiandae optio aspernatur.
        Totam? tenetur adipisci, consectetur culpa at, ab expedita dolor hic
        tempore officiis! Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Nulla id iure provident odio quam saepe pariatur asperiores nobis
        consequuntur sapiente quibusdam distinctio ullam ratione modi, quae unde
        expedita similique eos Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Quam soluta aliquid ab eius culpa ut dolorum ratione
        reprehenderit magni voluptatibus cumque, voluptatem totam molestiae
        itaque odio molestias doloremque quo illum?Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Obcaecati hic eius rem, nostrum modi
        laborum aut nisi dolor atque impedit ut delectus eaque natus quas eum
        repudiandae optio aspernatur. Totam?tenetur adipisci, consectetur culpa
        at, ab expedita dolor hic tempore officiis! Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Nulla id iure provident odio quam saepe
        pariatur asperiores nobis consequuntur sapiente quibusdam distinctio
        ullam ratione modi, quae unde expedita similique eos Lorem ipsum dolor
        sit, amet consectetur adipisicing elit. Quam soluta aliquid ab eius
        culpa ut dolorum ratione reprehenderit magni voluptatibus cumque,
        voluptatem totam molestiae itaque odio molestias doloremque quo
        illum?Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
        hic eius rem, nostrum modi laborum aut nisi dolor atque impedit ut
        delectus eaque natus quas eum repudiandae optio aspernatur. Totam?
      </view>

      <view class="recomment">
        <view class="tag">相关阅读</view>

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
@import "../style/mixin.less";

.article-detail-container {
  padding: 24upx;
  box-sizing: border-box;

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

    .content {
      .margin(20upx, 20upx);
      font-size: 24upx;
      color: #3d3d3d;
      line-height: 1.5;
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