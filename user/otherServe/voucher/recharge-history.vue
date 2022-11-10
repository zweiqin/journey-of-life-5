<template>
  <view class="recharge-history-list">
    <JHeader title="代金劵充值记录" width="50" height="50"></JHeader>

    <!-- <VoucherHistoryItem></VoucherHistoryItem> -->

    <view class="voucher-recharge-history" v-if="data.length">
      <view class="voucher-charge-item" v-for="item in data" :key="item.id">
        <view class="order-info">
          <view class="order-no">{{ item.orderId }}</view>
          <view
            class="order-status"
            :style="{
              color: [0, 1, 3].includes(item.status) ? '#ccc' : '#409eff',
              'border-color': [0, 1, 3].includes(item.status)
                ? '#ccc'
                : '#409eff',
            }"
            >{{ item.status | fomartStatus }}</view
          >
        </view>

        <view class="voucher-recharge-time">
          <view class="time">{{ item.updateTime }}</view>
          <view class="vouchher-number"
            >{{ item.payGrade }}个
            <JIcon width="40" height="40" type="color-voucher"></JIcon>
          </view>
        </view>
      </view>
    </view>

    <JNoData v-else type="voucher-null" text="暂无充值记录"></JNoData>
  </view>
</template>

<script>
// import VoucherHistoryItem from "./components/vouche-history";
import { getVoucherRechargeHistoryApi } from "../../../api/user";
import { getUserId } from "../../../utils";
import { mapVoucherRechargeStatus } from "./config";

export default {

  data() {
    return {
      data: [],
    };
  },

  onLoad() {
    this.getVoucherRechargeHistory();
  },

  filters: {
    fomartStatus(status) {
      const item = mapVoucherRechargeStatus.find(
        (item) => item.value === status
      );
      return item.label;
    },
  },

  methods: {
    getVoucherRechargeHistory() {
      uni.showLoading({
        title: "加载中",
      });
      getVoucherRechargeHistoryApi({
        userId: getUserId(),
      }).then(({ data }) => {
        this.data = data;
        uni.hideLoading();
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.recharge-history-list {
  padding: 30upx 24upx;
  box-sizing: border-box;
  font-size: 28upx;

  .voucher-recharge-history {
    padding: 10upx;
    box-sizing: border-box;

    .voucher-charge-item {
      background-color: #fff;
      padding: 20upx;
      box-sizing: border-box;
      margin-bottom: 20upx;
      border-bottom: 1upx solid rgb(207, 207, 207);

      .order-info {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .order-no {
          color: #000;
        }

        .order-status {
          font-size: 24upx;
          padding: 4upx 14upx;
          border: 1upx solid #f40;
          border-radius: 10upx;
        }
      }

      .voucher-recharge-time {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 20upx;

        .time {
          font-size: 24upx;
          color: rgb(143, 142, 142);
        }

        .vouchher-number {
          display: flex;
          align-items: center;
          color: #8cc53c;
        }
      }
    }
  }
}
</style>