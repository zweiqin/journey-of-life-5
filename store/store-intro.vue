<template>
  <view class="store-intro-container">
    <view
      class="bg"
      :style="{
        'background-image': `url(${brandInfo.picUrl})`,
      }"
    ></view>

    <view class="main">
      <JBack></JBack>

      <view class="store-card">
        <view class="store-top">
          <image class="store-avatar" :src="brandInfo.picUrl" mode="" />

          <view class="store-base-info">
            <view class="store-name">{{ brandInfo.name }}</view>
            <view class="rate">
              <Rate :rate="5"></Rate>
              <text>5.0分</text>
            </view>
            <view class="topic">商城热销榜</view>
          </view>
        </view>

        <view class="time"
          >营业时间：{{ brandInfo.startTime }} ~ {{ brandInfo.endTime }}
        </view>

        <view class="time" style="border: none">
          <image class="icon" src="/static/images/store/flag.png" mode="" />
          {{ brandInfo.address }}</view
        >

        <view class="icons">
          <view class="icon-wrapper">
            <image class="icon" src="/static/images/store/dis.png" mode="" />
            <text>到这去</text>
          </view>

          <view class="icon-wrapper">
            <image class="icon" src="/static/images/store/phone.png" mode="" />
            <text>电话</text>
          </view>
        </view>
      </view>

      <view class="pane">
        <view class="pane-title">门店介绍</view>
        <view class="container">
          {{ brandInfo.desc }}
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { getStoreDetailApi } from "../api/store";
import Rate from "../components/rate";
export default {
  components: {
    Rate,
  },
  data() {
    return {
      brandInfo: null,
      brandId: null,
    };
  },
  onLoad(options) {
    this.brandId = options.brandId;
    this.getStoreDetail();
  },

  methods: {
    getStoreDetail() {
      const _this = this;
      getStoreDetailApi(this.brandId).then(({ data }) => {
        _this.brandInfo = data.brand;
      });
    },
  },
};
</script>

<style lang="less" scoped>
.store-intro-container {
  position: relative;
  width: 100%;
  font-size: 28upx;

  .icon {
    width: 36upx;
    height: 36upx;
    object-fit: cover;
  }

  /deep/ .j-back-container {
    margin-left: 20upx;
  }

  .bg {
    height: 466upx;
    background-size: cover;
    filter: blur(7px);
  }

  .main {
    position: absolute;
    padding: 16upx;
    box-sizing: border-box;
    top: 78upx;
    width: 100%;

    .store-card {
      padding: 30upx 20upx;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 20upx;
      width: 100%;
      box-shadow: 0px 1px 5px 0px rgba(0, 0, 0, 0.302);
      margin-top: 56upx;

      .store-top {
        display: flex;
        border-bottom: 1upx solid #d8d8d8;
        padding-bottom: 20upx;

        .store-avatar {
          width: 160upx;
          height: 160upx;
          border-radius: 10upx;
          object-fit: cover;
          flex-shrink: 0;
          margin-right: 40upx;
        }

        .store-base-info {
          flex: 1;

          .store-name {
            font-size: 32upx;
            font-weight: bold;
          }

          .rate {
            display: flex;
            align-items: center;
            color: #fa5151;
            margin: 12upx 0 14upx 0;
          }

          .topic {
            padding: 2upx 60upx 2upx 19upx;
            background: linear-gradient(
              101deg,
              #fff8c6 0%,
              rgba(255, 248, 198, 0) 100%
            );
            color: #9e662c;
          }
        }
      }

      .time {
        display: flex;
        align-items: center;
        padding: 22upx 0 32upx 0;
        border-bottom: 1upx solid #d8d8d8;

        .icon {
          margin-right: 10upx;
        }
      }

      .icons {
        display: flex;
        justify-content: end;
        font-size: 24upx;

        .icon {
          margin-bottom: 10upx;
        }

        .icon-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          margin-left: 30upx;
        }
      }
    }

    .pane{
      margin-top: 28upx;

      &-title{
        border-left: 4upx solid #fa5151;
        padding-left: 20upx;
      }

      .container{
        padding: 20upx 0;
      }
    }
  }
}
</style>