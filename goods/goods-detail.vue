<template>
  <view class="goods-detail-container">
    <view class="detail-info">
      <image
        class="background-img"
        src="https://img1.baidu.com/it/u=1348534255,776639974&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
        mode=""
      />
      <view class="icons">
        <JBack tabbar="/pages/index/index"></JBack>
        <view class="right">
          <image
            class="icon"
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/7sie7zjfe51lk6wnmxsb.png"
            mode=""
          />
          <image
            class="icon"
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/11ndambq3umo4c3imxqx.png"
            mode=""
          />
        </view>
      </view>
    </view>

    <view class="goods-price">
      <view class="old-price"><text class="icon">￥</text>123</view>
      <view class="new-price">原价:￥198.9</view>
    </view>

    <view class="main">
      <view class="item tags">
        <view class="tag">已售 1000+</view>
        <view class="tag">回购率 98.8%</view>
      </view>

      <view class="vip-tip">
        <view class="vip-card">会员卡</view>
        开通会员即可获得10元优惠券
      </view>

      <view class="goods-name"
        >凯佳蒂家具现代简约轻奢主卧大床皮益2022新 款意式极简软皮包皮</view
      >

      <view class="goods-navs item">
        <view class="nav-item active">评价</view>
        <view class="nav-item">详情</view>
        <view class="nav-item">推荐</view>
      </view>

      <view class="goods-evaluate">
        <view class="goods-evaluate-header">
          <text>商品评价（910+）</text>
          <view class="more">
            查看更多
            <img
              class="icon"
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/9j6yq49fs4db7ivrxbf2.png"
              alt=""
            />
          </view>
        </view>

        <view class="goods-evaluate-item">
          <view class="user-info">
            <JAvatar
              src="https://img2.baidu.com/it/u=3257696087,4133159528&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300"
            ></JAvatar>
            <view class="user-detail-info">
              <view class="name">梁生</view>
              <view class="time">2022-10-1</view>
            </view>
          </view>

          <view class="text"> 床非常大气，质量很不错，外观也很漂亮。 </view>
        </view>

        <view class="goods-evaluate-item">
          <view class="user-info">
            <JAvatar
              src="https://img2.baidu.com/it/u=3257696087,4133159528&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300"
            ></JAvatar>
            <view class="user-detail-info">
              <view class="name">梁生</view>
              <view class="time">2022-10-1</view>
            </view>
          </view>

          <view class="text"> 床非常大气，质量很不错，外观也很漂亮。 </view>
        </view>

        <view class="goods-evaluate-item">
          <view class="user-info">
            <JAvatar
              src="https://img2.baidu.com/it/u=3257696087,4133159528&fm=253&fmt=auto&app=138&f=JPEG?w=300&h=300"
            ></JAvatar>
            <view class="user-detail-info">
              <view class="name">梁生</view>
              <view class="time">2022-10-1</view>
            </view>
          </view>

          <view class="text"> 床非常大气，质量很不错，外观也很漂亮。 </view>
        </view>
      </view>

      <JLineTitle title="商品详情"></JLineTitle>
      <view class="img-detail">
        <img
          class="img"
          src="https://img2.baidu.com/it/u=352895390,1403684937&fm=253&fmt=auto&app=138&f=JPEG?w=1103&h=500"
          alt=""
        />
        <img
          src="https://img2.baidu.com/it/u=2798158109,4144482831&fm=253&fmt=auto&app=138&f=JPEG?w=612&h=352"
          class="img"
          alt=""
        />
      </view>

      <JLineTitle title="为您推荐"></JLineTitle>
    </view>
  </view>
</template>

<script>
export default {
  mounted() {},
};
</script>

<style lang="less" scoped>
@import "../style/var.less";
@import "../style/mixin.less";

.goods-detail-container {
  .detail-info {
    position: relative;
    width: 100%;
    height: 720upx;
    padding: 34upx 24upx;
    box-sizing: border-box;
    .flex(flex-start);
    flex-direction: column;

    .background-img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
    }

    .icons {
      width: 100%;
      .flex();

      .icon {
        width: 40upx;
        height: 40upx;

        &:last-child {
          margin-left: 30upx;
        }
      }
    }
  }

  .goods-price {
    width: 100%;
    height: 94upx;
    padding: 0 28upx;
    .flex(center, flex-start);
    box-sizing: border-box;
    background: linear-gradient(to bottom, #fa5151, #fb9999);

    .old-price {
      font-size: 56upx;
      font-weight: bold;
      color: #fff;

      .icon {
        font-size: 40upx;
        font-weight: normal;
      }
    }

    .new-price {
      font-size: 28upx;
      color: #fa5151;
      background-color: #fff;
      padding: 2upx 20upx;
      margin-left: 20upx;
      border-radius: 40px;
    }
  }

  .main {
    padding: 30upx 40upx;
    box-sizing: border-box;

    .item {
      width: 100%;
    }

    .tags {
      font-size: 24upx;
      color: #fa5151;
      .flex(center, flex-start);

      .tag {
        border: 1upx solid #fa5151;
        padding: 4upx 12upx;
        margin-right: 24upx;
        border-radius: 10upx;
      }
    }

    .vip-tip {
      position: relative;
      width: 594upx;
      height: 60upx;
      line-height: 60upx;
      border-radius: 10upx;
      background: linear-gradient(99deg, #ffc300, #feecaf);
      font-size: 28upx;
      color: #9e7e7e;
      padding-left: 180upx;
      box-sizing: border-box;
      margin: 18upx 0;

      .vip-card {
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 150upx;
        border-radius: 10upx;
        background: linear-gradient(98deg, #ff8f1f, #fcbc17);
        font-size: 24upx;
        color: #fff;
        text-align: center;
        line-height: 60upx;
      }
    }

    .goods-name {
      font-size: 30upx;
      color: @c3d;
      line-height: 1.5;
      font-weight: 500;
    }

    .goods-navs {
      position: sticky;
      top: -1px;
      padding: 20upx 0;
      display: flex;
      justify-content: space-around;
      align-items: center;
      font-size: 24upx;
      color: #3d3d3d;
      background-color: #fff;

      .nav-item {
        border-bottom: 2px solid transparent;
        padding-bottom: 10upx;

        &.active {
          color: #fa5151;
          border-bottom: 2px solid #fa5151;
        }
      }
    }

    .goods-evaluate {
      margin: 20upx 0;

      &-header {
        .flex();
        font-size: 24upx;
        color: #3d3d3d;
        font-weight: bold;
        margin-bottom: 20upx;

        .more {
          color: #fa5151;
          font-weight: normal;

          .icon {
            width: 12upx;
            height: 20upx;
            margin-left: 12upx;
          }
        }
      }
      .goods-evaluate-item {
        margin: 40upx 0;
        .user-info {
          display: flex;

          .user-detail-info {
            font-size: 20upx;
            margin-left: 16upx;

            .name {
              color: #3d3d3d;
              margin-bottom: 10upx;
            }

            .time {
              color: #777;
            }
          }
        }

        .text {
          font-size: 24upx;
          margin-top: 16upx;
        }
      }
    }

    .img-detail {
      margin: 34upx 0;
      width: 100%;

      .img {
        width: 100%;
      }
    }
  }
}
</style>
