<template>
  <view class="goods-detail-container">

    <!-- 图片区域 -->
    <view class="top-image-wrapper">
      <image src="https://img2.baidu.com/it/u=631516092,1411937024&fm=253&fmt=auto&app=120&f=JPEG?w=1280&h=800">
      </image>

      <view class="header-tool">
        <BeeBack>
          <BeeIcon :size="24" color="#fff" name="arrowleft"></BeeIcon>
        </BeeBack>

        <BeeShare>
          <view class="share-container">
            <BeeIcon :size="24" :src="require('../../../static/brand/detail/share.png')"></BeeIcon>
          </view>
        </BeeShare>
      </view>
    </view>

    <!-- 商品详情 -->
    <view class="goods-pane">
      <view class="goods-name">红烧肉</view>
      <view class="price-wrapper">
        <text class="icon">￥</text>
        <view class="current-price">88</view>
        <view class="old-price">￥89</view>
        <view class="tag">8.8折</view>
      </view>

      <view class="item">
        <view class="item-title">服务</view>
        <view class="item-value"> 随时退·过期自动退·免预约 <text class="salse-number">已售16份</text></view>
      </view>

      <view class="item">
        <view class="item-title">须知</view>
        <view class="item-value"> 有效期30天·单次最多可用2张</view>
      </view>
    </view>

    <view class="other-container">
      <!-- 评价 -->
      <Evaluate></Evaluate>

      <!-- 推荐 -->
      <RecommendPane></RecommendPane>
    </view>

    <!-- 更多地点推荐 -->
    <RecommendCity></RecommendCity>

    <!-- 底部操作栏 -->
    <OpFooter></OpFooter>
  </view>
</template>

<script>
import Evaluate from './cpns/Evaluate.vue';
import RecommendPane from './cpns/RecommendPane'
import RecommendCity from './cpns/RecommendCity.vue';
import OpFooter from './cpns/OpFooter.vue';
export default {
  components: { Evaluate, RecommendPane, RecommendCity, OpFooter }
}
</script>

<style lang="less" scoped>
.goods-detail-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f6f6f6;
  padding-bottom: 100upx;

  .top-image-wrapper {
    position: relative;
    width: 100%;
    height: 540upx;

    image {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .header-tool {
      top: 30upx;
      position: absolute;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      padding-right: 60upx;
      padding-left: 18upx;
      box-sizing: border-box;
    }
  }

  .goods-pane {
    padding: 34upx 44upx;
    background-color: #fff;
    box-sizing: border-box;

    .goods-name {
      font-size: 40upx;
      font-weight: bold;
    }

    .price-wrapper {
      display: flex;
      align-items: center;

      .icon {
        color: #FA5151;
        font-size: 28upx;
        font-weight: 500;
      }

      .current-price {
        position: relative;
        top: -4upx;
        font-size: 48upx;
        color: #FA5151;
        font-weight: 500;
      }

      .old-price {
        color: #777;
        font-size: 24upx;
        text-decoration: line-through;
        margin: 0 12upx 0 8upx;
      }

      .tag {
        background-color: #FCDBDB;
        font-size: 20upx;
        line-height: 1.5;
        color: red;
        padding: 2upx 8upx;
      }
    }

    .item {
      display: flex;
      align-items: center;
      color: #999999;
      font-size: 24upx;
      margin-top: 8upx;

      .item-title {
        margin-right: 12upx;
        flex-shrink: 0;
      }

      .salse-number {
        margin-left: 140upx;
      }
    }
  }

  .other-container {
    padding: 0 20upx;
    box-sizing: border-box;

    /deep/ .pane-wrapper {
      padding: 32upx 24upx;
      box-sizing: border-box;
      background-color: #fff;
      border-radius: 20upx;
      margin-top: 30upx;
    }
  }


}
</style>