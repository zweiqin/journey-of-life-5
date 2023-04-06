<template>
  <view class="recommend-city-container">
    <h2 class="title">更多好吃好玩的地点推荐</h2>

    <view class="list-container">
      <view class="item" v-for="item in 6" :key="item">
        <view class="title-wrapper">
          <view class="brand-name">
            <BeeIcon :src="require('../../../../static/brand/goods-detial/brand-icon.png')" :size="14"></BeeIcon>
            <text class="brand-name-text">美的鹭湖深林度假村</text>
          </view>
          <view class="dist">距你2.8km</view>
        </view>

        <view class="brand-info">
          <BeeAvatar :size="60" radius="10upx"
            src="https://img0.baidu.com/it/u=3675430611,1506122173&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=749">
          </BeeAvatar>
          <view class="brand-info-container">
            <view class="goods-name hidden">
              【大水车·海参盆菜】海参鲍汁佛跳墙
            </view>
            <view class="desc hidden">鲍鱼·清远鸡·金汤·海参·鱼翅·...</view>
            <view class="price-text">
              <text class="current-price">￥123</text>
              <text class="old-price">￥987</text>
              <text class="sale-number">已售87</text>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.recommend-city-container {
  padding: 30upx;
  background-color: #fff;
  width: 100%;
  margin-top: 32upx;
  background: linear-gradient(180deg, #FFFFFF 4%, #F6F6F6 27%);
  box-sizing: border-box;

  .title {
    font-size: 34upx;
    font-weight: 500;
  }

  .item {
    padding: 30upx 30upx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 20upx;
    margin-bottom: 20upx;


    .title-wrapper {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10upx;
      margin-bottom: 30upx;

      &::after {
        position: absolute;
        content: '';
        display: block;
        height: 4upx;
        width: 660upx;
        left: 50%;
        background: linear-gradient(270deg, #e9e9e9, #D8D8D8, #e6e6e6 100%);
        transform: translateX(-50%);
        bottom: 0;
      }

      .brand-name {
        display: flex;
        align-items: center;

        .brand-name-text {
          margin-left: 6upx;
          font-size: 28upx;
          margin-top: 4upx;
        }
      }

      .dist {
        margin-left: 6upx;
        color: #777777;
        font-size: 24upx;
      }
    }

    .brand-info {
      display: flex;
      align-items: center;

      .brand-info-container {
        flex: 1;
        margin-left: 12upx;

        .goods-name {
          font-weight: 500;
        }

        .desc {
          color: #777777;
          font-size: 24upx;
        }

        .hidden {
          width: 460upx;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }

        .price-text {
          text {
            font-size: 24upx;
            color: #777;

            &.current-price {
              color: #FA5151;
            }

            &.old-price {
              text-decoration: line-through;
              margin-right: 30upx;
            }
          }
        }
      }
    }
  }
}
</style>