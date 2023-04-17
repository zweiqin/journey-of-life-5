<template>
  <view class="brand-info-container" v-if="data">
    <view class="name-info-wrapper">
      <image class="avatar" :src="data.avatar" mode="" />

      <view class="info">
        <view class="name-container">
          <view class="name">{{ data.nickname }}</view>
          <!-- <view class="order">31.7k人已订阅</view> -->
        </view>

        <view class="desc">
          <text>{{ data.text1 || '营销达人' }}</text>
          <text>{{ data.text2 || '自媒体' }}</text>
          <text>{{ data.text3 || '佛山 · 顺德' }}</text>
        </view>
      </view>
    </view>

    <view class="merit-container">
      <view class="f-f-s f-w-500">
        <image src="../../../static/square/detail/tag.png"></image>
        <text>个人标签</text>
      </view>

      <view class="introduct">
        {{ data.introduce || '无介绍' }}
      </view>

    </view>

  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.brand-info-container {
  background-color: #fff;
  border-radius: 24upx;
  box-sizing: border-box;
  padding: 20upx 20upx 0;
  margin-top: -152upx;

  .name-info-wrapper {
    width: 100%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;

    .avatar {
      position: relative;
      top: -52upx;
      width: 158upx;
      height: 158upx;
      border-radius: 32upx;
      flex-shrink: 0;
      margin-right: 24upx;
      padding: 2upx;
    }

    .info {
      flex: 1;

      .name-container {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .name {
          font-size: 34upx;
          color: #141000;
          font-weight: bold;
        }

        .order {
          font-size: 24upx;
          color: #8f8d85;
        }
      }

      .desc {
        margin-top: 10upx;

        text {
          padding: 0 16upx;
          border-right: 1upx solid #b3b2ad;
          font-size: 24upx;
          color: #3a3629;

          &:nth-child(1) {
            padding-left: 0;
          }

          &:nth-child(3) {
            border-right: none;
          }
        }
      }
    }
  }

  .merit-container {
    position: relative;
    top: -24upx;
    border-top: 1upx solid #3d3d3d;
    padding-top: 10upx;

    .introduct {
      color: #888;
      font-size: 24upx;
      margin-top: 10upx;
    }

    image {
      width: 48upx;
      height: 48upx;
    }

    .item {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .icon {
        width: 48upx;
        height: 48upx;
      }

      text {
        font-size: 24upx;
        margin-top: 20upx;
      }
    }
  }

  .more {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: #8f8d85;
    font-size: 24upx;
    margin-top: 64upx;
  }
}
</style>
