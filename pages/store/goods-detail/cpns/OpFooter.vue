<template>
  <view class="op-footer-container">
    <view class="total-price">
      <text class="money-icon">￥</text>
      <text class="total-orice">{{ totalPrice }}</text>
      <!-- <text class="orgin-price">￥87</text>
      <view class="discount">8.8折</view> -->
    </view>
    <view class="btn-wrapper">
      <button class="bee-btn add-order">加入订单</button>
      <button class="bee-btn pay" @click="$emit('pay')">立即购买</button>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    totalPrice: {
      type: [Number, String]
    }
  }
}
</script>

<style lang="less" scoped>
.op-footer-container {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  height: 120upx;
  padding: 16upx 22upx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 1000;

  .total-price {
    position: relative;

    .money-icon {
      color: #FA5151;
    }

    .total-orice {
      color: #FA5151;
      font-weight: bold;
      font-size: 50upx;
    }

    .orgin-price {
      font-size: 24upx;
      color: #777;
      text-decoration: line-through;
    }

    .discount {
      text-align: center;
      line-height: 28upx;
      position: absolute;
      width: 66upx;
      height: 28upx;
      background-color: #FCDBDB;
      border-radius: 100upx 100px 100px 0px;
      top: 6upx;
      right: -16upx;
      font-size: 20upx;
      transform: scale(0.8);
      color: #FA5151;
    }
  }

  .btn-wrapper {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }

  .bee-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 262upx;
    height: 88upx;
    box-sizing: border-box;
    border-radius: 10upx;
    transition: all 350ms;

    &.add-order {
      border: 2upx solid #FA5151;
      color: #FA5151;
      font-size: 30upx;
      font-weight: 500;
      width: 208upx;

      &:active {
        background-color: #ff9999;
      }
    }

    &.pay {
      background-color: #FA5151;
      color: #fff;
      margin-left: 16upx;

      &:active {
        opacity: 0.3;
      }
    }
  }
}
</style>