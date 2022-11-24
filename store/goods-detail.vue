<template>
  <view class="goods-wrapper">
    <view class="carousel">
      <Carousel
        :list="[
          'https://img0.baidu.com/it/u=662922582,1508648529&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=583',
        ]"
        :height="370"
        :top="0"
        :radius="0"
      ></Carousel>
      <img
        @click="back"
        class="back"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ozsrolc809fc5y260e8c.png"
        alt=""
      />
    </view>

    <view class="promotion">
      <view class="left">
        <view class="top"> ￥<text class="number">123</text> </view>

        <view class="bottom">
          <view class="tag">已售100+</view>
          <view class="tag">回购率100%</view>

          <view class="ops">
            <JIcon width="46" height="40" type="collect-heart"></JIcon>
            <view class="share">
              <JIcon type="white-share" width="27" height="27"> </JIcon>
              分享
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="container">
      <view class="goods-name"
        >凯佳蒂家具现代简约轻奢主卧大床皮益2022新 款意式极简软皮包皮
      </view>

      <view class="rest">
        <view></view>
        <view></view>
      </view>
    </view>
  </view>
</template>

<script>
import Carousel from "../components/carousel";

export default {
  components: {
    Carousel,
  },
};
</script>

<style lang="less" scoped>
.goods-wrapper{
  background-color: #3b4a50;
  min-height: 100vh;
  height: auto;
}

.carousel {
  position: relative;
  z-index: 10;
  background-color: #fff;
  .back {
    position: absolute;
    top: 28upx;
    left: 10upx;
    width: 48upx;
    height: 48upx;
  }
}

.promotion {
  background-color: #fff;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 28upx 16upx 0;
  // background-color: #089a9d;
  box-sizing: border-box;
  border-radius: 20upx 20upx 0 0;
  margin-top: -28upx;
  z-index: 11;

  .left {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    box-sizing: border-box;
    flex: 1;
    height: 100%;

    .top {
      display: flex;
      align-items: center;
      color: #f40;
      font-size: 36upx;
      margin-bottom: 16upx;
      .number {
        font-size: 60upx;
      }

      .tag {
        color: #3b4a50;
        padding: 14upx 24upx;
        border-radius: 20upx 20upx 20upx 0;
        margin-left: 22upx;
        background: linear-gradient(
          276deg,
          #c7f5f5 53%,
          #ffffff 100%,
          rgba(199, 245, 245, 0) 100%
        );

        .price {
          padding: 0;
        }
      }
    }

    .bottom {
      color: #fff;
      font-size: 28upx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      .tag {
        padding: 2upx 22upx;
        border: 1upx solid #f40;
        color: #fff;
        border-radius: 10upx;
        margin-right: 18upx;
        color: #f40;
      }

      .ops {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        text-align: right;
        flex: 1;

        .share {
          margin-left: 20upx;
          display: flex;
          padding: 10upx 16upx 10upx 20upx;
          align-items: center;
          background: linear-gradient(90deg, #fa5151 0%, #eb2f96 100%);
          border-radius: 200upx 0 0 0200upx;

          /deep/ .j-icon {
            margin-right: 10upx;
          }
        }
      }
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #09b8b8;
    padding-top: 16upx;
    padding-right: 28upx;
    padding-bottom: 12upx;
    box-sizing: border-box;

    .fast {
      .text {
        width: 100upx;
      }

      .icon {
        width: 30upx;
      }
    }

    .time {
      display: flex;
      margin: 6upx 0;

      .item {
        width: 12upx;
        height: 28upx;
        text-align: center;
        line-height: 28upx;
        background-color: #fff;
        padding: 4upx;
        margin-right: 8upx;
        font-size: 20upx;
      }
    }

    .on-time {
      font-size: 20upx;
      color: #fff;
    }
  }
}

.container {
  padding: 20upx;
  box-sizing: border-box;
  background-color: #fff;

  .goods-name{
    line-height: 1.5;
    font-weight: bold;
  }
}
</style>