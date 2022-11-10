<template>
  <view class="voucher-history-container">
    <!-- <view class="time"> 2022年9月支出账单 </view> -->
    <view class="item">
      <JIcon
        :type="type === 'userId' ? 'voucher-transform' : 'voucher-recharge'"
        width="50"
        height="45"
      ></JIcon>
      <view class="voucher-detail">
        <view class="voucher-price voucher-detail-item">
          <text
            >{{ type === "userId" ? "转自" : "转给" }}：{{
              data.userName
            }}</text
          >
          <text
            ><JIcon
              style="margin-right: 5px"
              type="color-voucher"
              width="30"
              height="30"
            ></JIcon
            >{{ data.number }}</text
          >
        </view>

        <view class="voucher-text voucher-detail-item">
          <text style="margin: 18upx 0 10upx 0">
            {{ type === "userId" ? "转赠者ID" : "赠与者ID：" }}
            {{ data.userId }}</text
          >
        </view>

        <view class="voucher-text voucher-detail-item">
          <text>{{ data.addTime }}</text>
          <!-- <text>充值成功</text> -->
        </view>
      </view>
      <!-- <view class="icon">
        <JIcon width="42" height="46" type="right-arrow"></JIcon>
      </view> -->
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
    type: {
      type: String,
      default: "holdId",
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../../../style/mixin.less";
.voucher-history-container {
  width: 100%;
  border-bottom: 1upx solid #d8d8d8;
  font-size: 28upx;
  margin-bottom: 30px;
  padding-bottom: 20upx;

  .time {
    padding-bottom: 10upx;
    padding: 30upx 0 18upx 32upx;
    box-sizing: border-box;
  }

  .item {
    // padding: 30upx 18upx 18upx 32upx;
    // box-sizing: border-box;
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