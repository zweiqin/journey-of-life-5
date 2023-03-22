<template>
  <view
    class="bee-brand-home-container"
    @click="go('/pages/store/detail/detail?brandId=' + brandInfo.id)"
    v-if="brandInfo"
  >
    <swiper class="swiper" autoplay>
      <swiper-item>
        <tui-lazyload-img
          width="706rpx"
          radius="20rpx 20rpx 0 0"
          height="250rpx"
          src="https://img0.baidu.com/it/u=1287724578,945344928&fm=253&fmt=auto&app=138&f=JPEG?w=585&h=392"
        ></tui-lazyload-img>
      </swiper-item>
    </swiper>

    <view class="brand-info">
      <BeeAvatar :src="brandInfo.picUrl.includes('http') ? brandInfo.picUrl : 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/' + brandInfo.picUrl" :size="80" radius="20rpx"></BeeAvatar>
      <view class="brand-info-detail">
        <view class="info-1">
          <view class="brand-name">{{ brandInfo.name }}</view>

          <button class="bee-btn">进入门店</button>
        </view>

        <view class="tags">
          <view class="tag">
            <BeeIcon
              class="icon"
              :src="require('./image/zan.png')"
              width="43.4rpx"
              height="44rpx"
            ></BeeIcon>
            <text>好评推荐</text>
          </view>

          <view class="tag">
            <BeeIcon
              width="43.4rpx"
              height="44rpx"
              class="icon"
              :src="require('./image/pinzhi.png')"
            ></BeeIcon>
            <text>品质保证</text>
          </view>
        </view>

        <view class="info-2">
          <text>367人访问</text>
          <text>13人关注</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    brandInfo: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.bee-brand-home-container {
  border-radius: 20upx;
  overflow: hidden;
  margin-top: 40upx;

  .brand-info {
    display: flex;
    align-items: center;
    padding: 22upx 28upx;
    box-sizing: border-box;
    background-color: #fff;

    .brand-info-detail {
      margin-left: 28upx;
      flex: 1;

      .info-1 {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .brand-name {
          width: 220upx;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }

        .bee-btn {
          color: #fa5151;
        }
      }

      .tags {
        display: flex;
        align-items: center;
        margin: 20upx 0;

        .tag {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 40upx;
          border-radius: 6upx;
          font-size: 24upx;

          .icon {
            position: relative;
            top: 0upx;
            left: -2upx;
          }

          text {
            padding: 0 11upx;
          }

          &:nth-child(1) {
            border: 1upx solid #ffc300;
            margin-right: 12upx;

            text {
              color: #ffbb04;
            }
          }

          &:nth-child(2) {
            border: 1upx solid #42a0f0;

            text {
              color: #42a0f0;
            }
          }
        }
      }

      .info-2 {
        display: flex;
        align-items: center;

        text {
          font-size: 28upx;
          color: #999;
          &:nth-child(1) {
            margin-right: 28upx;
          }
        }
      }
    }
  }
}
</style>
