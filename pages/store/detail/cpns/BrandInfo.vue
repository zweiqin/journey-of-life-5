<template>
  <view class="brand-info-container" v-if="brandDetail">
    <view class="brand-name">{{ brandDetail.name }}</view>
    <view class="rate">
      <BeeIcon :src="require('../../../../components/BeeBrandPane/images/star.png')" :size="12"></BeeIcon>
      <text>{{ brandDetail.starTotal || 0 }}</text>
      <text>月售{{ brandDetail.salesVolume }}</text>
      <text>人均{{ brandDetail.perCapita }}</text>
    </view>
    <view class="open-time"> 营业时间：{{ brandDetail.startTime }}-{{ brandDetail.endTime }} </view>
    <scroll-view scroll-x="true">
      <view class="goods-list">
        <tui-lazyload-img class="goods-img" mode="scaleToFill" width="250rpx" height="210rpx" radius="20rpx 0 0 20rpx"
          src="https://img0.baidu.com/it/u=3921347565,3035353655&fm=253&fmt=auto&app=138&f=JPEG?w=654&h=500"></tui-lazyload-img>
        <tui-lazyload-img class="goods-img" mode="scaleToFill" width="250rpx" height="210rpx"
          src="https://img0.baidu.com/it/u=221342467,1244905005&fm=253&fmt=auto&app=138&f=JPEG?w=752&h=500"></tui-lazyload-img>
        <tui-lazyload-img class="goods-img" mode="scaleToFill" width="250rpx" height="210rpx" radius=" 0 20rpx 20rpx 0 "
          src="https://img1.baidu.com/it/u=3046089692,1632656795&fm=253&fmt=auto&app=138&f=JPEG?w=665&h=500"></tui-lazyload-img>
      </view>
    </scroll-view>
    <view class="brand-status">
      店铺状态：<text class="status">{{ brandDetail.status ? '打烊啦~' : '营业中' }}</text>
    </view>
    <view class="tags" v-if="brandDetail.businessSlogan">
      <view class="tag" v-for="item in  brandDetail.businessSlogan.split(',')" :key="item">{{ item }}</view>
    </view>

    <view class="address-info">
      <view class="address-detail-info">
        <view class="address-text">{{ brandDetail.address }}</view>
        <view style="color: #777" class="address-text">距你{{ brandDetail.distance ? (brandDetail.distance /
          1000).toFixed(2) : 0
        }}公里，驾车{{ brandDetail.driveTime }}分钟</view>
      </view>
      <view class="op-menus">
        <BeeMakePhone :phone="brandDetail.phone">
          <view class="item">
            <BeeIcon :size="26" :src="require('../../../../static/brand/detail/phone.png')"></BeeIcon>
            <text>电话</text>
          </view>
        </BeeMakePhone>

        <BeeNavigation>
          <view class="item" @click="$emit('navgation')">
            <BeeIcon :size="26" :src="require('../../../../static/brand/detail/location.png')"></BeeIcon>
            <text>到这去</text>
          </view>
        </BeeNavigation>

        <view class="item" @click="$emit('follow')">
          <BeeIcon :size="26" :src="require('../../../../static/brand/detail/collection.png')"></BeeIcon>
          <text>{{ brandDetail.is ? '取消收藏' : '收藏' }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    brandDetail: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.brand-info-container {
  padding: 28upx 34upx;
  box-sizing: border-box;
  background-color: #fff;
  border-radius: 40upx 40upx 0 0;

  .brand-name {
    font-weight: bold;
    color: #000;
    font-size: 32upx;
  }

  .rate {
    display: flex;
    align-items: center;
    margin: 8upx 0 16upx 0;

    text {
      font-size: 24upx;

      &:nth-child(2) {
        color: #fb782d;
        margin: 0 16upx 0 8upx;
      }

      &:nth-child(3) {
        color: #777;
      }

      &:nth-child(4) {
        color: #000000;
        margin-left: 16upx;
      }
    }
  }

  .open-time {
    padding: 0 20upx;
    border-radius: 10upx;
    background-color: #f6f6f6;
    color: #777;
    display: inline-block;
  }

  .goods-list {
    margin: 34upx 0 12upx 0;
    white-space: nowrap;

    .goods-img {
      margin-right: 12upx;
    }
  }

  .brand-status {
    font-size: 24upx;

    .status {
      color: #fa5151;
      font-size: 24upx;
      font-weight: 500;
    }
  }

  .tags {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    margin: 12upx 0 32upx 0;

    .tag {
      font-size: 24upx;
      padding: 0 12upx;
      // background-color: #ff0505;
      background-color: #f6f6f6;
      color: #fff;
      border-radius: 10upx;
      margin-right: 10upx;
      color: #3d3d3d;
    }
  }

  .address-info {
    width: 100%;
    display: flex;
    align-items: center;
  }

  .op-menus {
    display: flex;
    align-items: center;

    .item {
      display: flex;
      align-items: center;
      flex-direction: column;
      margin-left: 30upx;

      text {
        font-size: 24upx;
        margin-top: 4upx;
        white-space: nowrap;
      }
    }
  }

  .address-detail-info {
    flex: 1;

    .address-text {
      width: 360upx;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      color: #000000;
      font-weight: 500;
    }
  }
}
</style>
