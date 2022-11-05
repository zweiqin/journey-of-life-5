<template>
  <view class="recharge-history-list">
    <JHeader title="代金劵充值记录" width="50" height="50"></JHeader>

    <!-- <VoucherHistoryItem></VoucherHistoryItem> -->

    <JNoData type="voucher-null" text="暂无充值记录"></JNoData>
  </view>
</template>

<script>
import VoucherHistoryItem from "./components/vouche-history";
export default {
  components: {
    VoucherHistoryItem,
  },
};
</script>

<style lang="scss" scoped>
.recharge-history-list {
  padding: 30upx 24upx;
  box-sizing: border-box;
}
</style>