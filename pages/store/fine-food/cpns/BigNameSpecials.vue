<template>
  <view class="big-name-specials-container">
    <view class="header-pane">
      <BeeIcon
        :src="require('../../../../static/brand/find-food/big-name.png')"
        :size="24"
      ></BeeIcon>
      <text class="text1"> 大牌特惠 </text>
      <text style="color: #fa5151">·</text>
      <text class="text2">今日限时抢购</text>
    </view>

    <view class="active-wrapper">
      <view class="brand-container">
        <BeeAvatar
          :size="40"
          src="https://img0.baidu.com/it/u=2321861901,1167402466&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889"
          radius="10rpx"
        ></BeeAvatar>
        <view class="brand-detail">
          <view class="brand-name"
            >凤凰轩（龙江旗舰店）</view
          >

          <view class="rate-wrapper">
            <BeeIcon
              :src="
                require('../../../../components/BeeBrandPane/images/star.png')
              "
              :size="12"
            ></BeeIcon>

            <text class="text1">4.5分</text>
            <text class="text2">烧烤店</text>
          </view>
        </view>
      </view>

      <view class="goods-pane">
        <BeeAvatar
          src="https://img2.baidu.com/it/u=2124341643,4053261271&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          radius="10rpx"
          :height="90"
          :width="93"
        ></BeeAvatar>
        <view class="goods-info">
          <view class="goods-name">宠粉专享·卤汁牛肉</view>
          <view class="time">周一至周五可用 超实惠，味道浓郁留香</view>
          <view class="price-pane">
            <view class="price-detail">
              <view class="price-text-1">
                <text class="icon">￥</text>
                <text class="price-text">105</text>
                <text class="tag">5折</text>
                <text class="old-price">￥205</text>
              </view>

              <view class="hot-wrapper">
                <BeeIcon
                  :src="require('../../../../static/brand/find-food/hot.png')"
                  :size="12"
                ></BeeIcon>
                <text> 爆卖93万+ </text>
                <text> 每单省100元 </text>
              </view>
            </view>
            <button class="bee-btn">立即抢购</button>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.big-name-specials-container {
  width: 100%;
  .header-pane {
    height: 80upx;
    display: flex;
    align-items: center;
    border-radius: 20upx 20upx 0 0;
    padding-left: 28upx;
    box-sizing: border-box;
    background: linear-gradient(
      180deg,
      #fde1e1 0%,
      rgba(255, 255, 255, 0) 230%
    );

    text {
      letter-spacing: 2px;
      font-weight: 500;
      margin-left: 12upx;

      &.text1 {
        color: #fa5151;
      }

      &.text2 {
        color: #955311;
      }
    }
  }

  .active-wrapper {
    padding: 20upx;
    background-color: #fff;
    border-radius: 0 0 20upx 20upx;

    .brand-container {
      display: flex;
      align-items: center;

      .brand-detail {
        flex: 1;
        margin-left: 20upx;

        .brand-name {
          width: 560upx;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          color: #000;
          font-weight: 500;
        }

        .rate-wrapper {
          display: flex;
          align-items: center;

          text {
            font-size: 24upx;
            margin-top: 8upx;

            &.text1 {
              color: #fa5151;
              margin: 8upx 4upx 0;
            }

            &.text2 {
              color: #999;
            }
          }
        }
      }
    }
  }

  .goods-pane {
    display: flex;
    align-items: flex-start;
    margin-top: 30upx;

    .goods-info {
      margin-left: 20upx;
      flex: 1;

      .goods-name {
        font-size: 32upx;
        font-weight: 500;
        margin: 0 0 4upx;
      }

      .time {
        color: #ffa015;
      }

      .price-pane {
        height: 84upx;
        width: 100%;
        background: #fff5dd;
        border-radius: 10upx;
        display: flex;
        justify-content: space-between;
        margin-top: 20upx;
        // padding: 10upx;
        box-sizing: border-box;

        .price-detail {
          flex: 1;
          padding-left: 10upx;
          box-sizing: border-box;

          .price-text-1 {
            display: flex;
            align-items: flex-end;
            margin-top: 4upx;

            .icon {
              color: #fa5151;
              font-size: 24upx;
            }

            .price-text {
              color: #fa5151;
              font-weight: 500;
              font-size: 32upx;
              line-height: 1;
            }

            .tag {
              font-size: 24upx;
              color: #fa5151;
              border: 1upx solid #fa5151;
              padding: 0 6upx;
              border-radius: 6upx;
              margin: 0 6upx 0 14upx;
            }

            .old-price {
              color: #999;
              font-size: 20upx;
              text-decoration: line-through;
            }
          }

          .hot-wrapper {
            display: flex;
            align-items: center;
            font-size: 20upx;
            color: #ff8838;

            text {
              font-size: 20upx;
              margin: 8upx 8upx 0;
            }
          }
        }

        .bee-btn {
          width: 200upx;
          height: 100%;
          background: url('../../../../static/brand/find-food/btn-bg.png')
            no-repeat;
          background-size: cover;
          text-align: right;
          line-height: 80upx;
          color: #fff;
          box-sizing: border-box;
          padding-right: 20upx;
          font-size: 24upx;
        }
      }
    }
  }
}
</style>
