<template>
  <view class="synthesize-container">
    <view class="left-wrapper">
      <view class="pane-title">福利大派送</view>
      <view class="info-detail">
        <image
          class="img1"
          src="../../../static/index/active/imag1.png"
          mode=""
        />

        <view class="goods-info">
          <view class="goods-name">网红休闲凳</view>
          <view class="price">最低￥<text>100</text></view>
          <button class="bee-btn">立即购买</button>
        </view>
      </view>
      <view class="left-footer">
        更多爆款推荐
        <BeeIcon
          :src="require('../../../static/index/active/arrow-right-fill.png')"
          :size="14"
        ></BeeIcon>
      </view>
    </view>
    <view class="right-wrapper">
      <view class="activing">
        <view class="pane-title">活动推荐</view>
        <view class="desc">活动惊喜不断</view>
        <view class="icon">
          <BeeIcon
            :src="require('../../../static/index/active/arrow-right-fill.png')"
            :size="14"
          ></BeeIcon>
        </view>
        <image
          class="pic"
          src="../../../static/index/active/04(1).png"
          mode=""
        />
      </view>
      <view class="ranking-list">
        <view class="pane-title">排行榜</view>
        <view class="desc">跟榜购好物</view>
        <view class="icon">
          <BeeIcon
            :src="require('../../../static/index/active/arrow-right-fill.png')"
            :size="14"
          ></BeeIcon>
        </view>
        <image
          class="pic"
          src="../../../static/index/active/02(1).png"
          mode=""
        />
      </view>
    </view>
  </view>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.synthesize-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 24upx;
  overflow: hidden;
  margin: 20upx 0 32upx 0;

  .pane-title {
    font-weight: 500;
  }

  .left-wrapper {
    position: relative;
    flex: 1;
    height: 364upx;
    background-color: #fff;
    padding-top: 32upx;
    padding-left: 16.6upx;
    box-sizing: border-box;

    .pane-title {
      margin-bottom: 40upx;
    }

    .info-detail {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      .img1 {
        margin-right: 20upx;
        width: 160upx;
        height: 133upx;
        flex-shrink: 0;
      }

      .goods-info {
        .goods-name {
          font-size: 24upx;
          color: #000000;
          font-weight: 500;
        }

        .price {
          font-size: 24upx;
          color: #000000;
          font-weight: 500;
          color: #fa5151;
          margin: 8upx 0;
          text {
            font-size: 32upx;
            color: #fa5151;
          }
        }

        .bee-btn {
          padding: 7.2upx 9upx;
          background-color: #fa5151;
          color: #fff;
          border-radius: 10upx;
        }
      }
    }

    .left-footer {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      align-items: flex-end;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 250upx;
      height: 80upx;
      background: url('../../../static/index/active/bar.png') no-repeat;
      background-size: cover;
      font-size: 24upx;
      padding: 0 0 10upx 16upx;
      box-sizing: border-box;

      /deep/ .icon-container {
        margin-left: 6upx;
      }
    }
  }

  .right-wrapper {
    width: 324upx;
    background-color: antiquewhite;

    .desc {
      font-size: 24upx;
      color: #999;
      margin: 9upx 0 24upx 0;
    }

    .icon {
      width: 42upx;
      height: 24upx;
      border-radius: 0 100px 100px 0;
      background-color: #d3eaea;
      display: flex;
      align-items: center;
      padding-bottom: 4upx;
      box-sizing: border-box;
      padding-right: 8upx;
      justify-content: flex-end;
    }

    .pic {
      position: absolute;
      width: 130upx;
      height: 130upx;
      bottom: 0;
      right: 0;
    }

    .activing {
      position: relative;
      padding: 30upx 18upx;
      box-sizing: border-box;
      width: 100%;
      height: 184upx;
      border-radius: 0px 20upx 0px 0px;
      background: linear-gradient(225deg, #d8ffff 3%, #fff, #fff);
    }

    .ranking-list {
      position: relative;
      padding: 30upx 18upx;
      box-sizing: border-box;
      width: 100%;
      height: 180upx;
      border-radius: 0px 0px 20upx 0px;
      background: linear-gradient(225deg, #fcdbdb, #fff, #fff);
    }
  }
}
</style>
