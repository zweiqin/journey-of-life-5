<template>
  <view class="voucher-history-container">
    <view class="time"> 2022年9月支出账单 </view>
    <view class="item">
      <JIcon type="voucher-recharge" width="50" height="45"></JIcon>
      <view class="voucher-detail">
        <view class="voucher-price voucher-detail-item">
          <text>代金券充值</text>
          <text>￥30</text>
        </view>

        <view class="voucher-text voucher-detail-item">
          <text style="margin: 18upx 0 10upx 0">138 0013 8000</text>
        </view>

        <view class="voucher-text voucher-detail-item">
          <text>09-10 18:00:47</text>
          <text>充值成功</text>
        </view>
      </view>
      <view class="icon">
        <JIcon width="42" height="46" type="right-arrow"></JIcon>
      </view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "../../../../style/mixin.less";
.voucher-history-container {
  width: 100%;
  border-bottom: 1upx solid #d8d8d8;
  font-size: 28upx;

  .time {
    padding-bottom: 10upx;
    padding: 30upx 0 18upx 32upx;
    box-sizing: border-box;
  }

  .item {
    padding: 30upx 18upx 18upx 32upx;
    box-sizing: border-box;
    display: flex;

    .voucher-detail {
      flex: 1;
      margin: 0 28upx 0 32upx;

      .voucher-detail-item {
        .flex();

        &.voucher-price {
          font-weight: bold;
          font-size: 32upx;
        }

        &.voucher-text {
          color: #999;
          font-size: 24upx;
        }
      }
    }

    .icon {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>