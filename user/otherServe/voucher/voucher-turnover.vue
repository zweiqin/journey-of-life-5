<template>
  <view class="voucher-turnover-container">
    <JHeader width="50" height="50" title="代金劵流水"></JHeader>

    <view class="filter-wrapper">
      <button
        :class="{
          active: currentTab === 'holdId',
        }"
        @click="handleChangeTab('holdId')"
        class="uni-btn"
      >
        转赠
      </button>
      <button
        :class="{
          active: currentTab === 'userId',
        }"
        @click="handleChangeTab('userId')"
        class="uni-btn"
      >
        收到
      </button>
    </view>

    <view class="list-wrapper" v-if="data.length">
      <VoucherHistoryItem
        v-for="item in data"
        :key="item.id"
        :data="item"
        :type="currentTab"
      ></VoucherHistoryItem>
    </view>

    <JNoData v-else type="voucher-null" text="暂无代金劵流水记录"></JNoData>
  </view>
</template>

<script>
import { getVoucherTansformApi } from "../../../api/user";
import { getUserId } from "../../../utils";
import VoucherHistoryItem from "./components/vouche-history";

export default {
  onLoad() {
    this.getVoucherTansform();
  },
  components: {
    VoucherHistoryItem,
  },
  data() {
    return {
      data: [],
      currentTab: "holdId",
    };
  },
  methods: {
    getVoucherTansform() {
      const _this = this;
      uni.showLoading({
        title: "加载中",
      });
      getVoucherTansformApi({
        [this.currentTab]: getUserId(),
        page: 1,
        limit: 100,
      }).then(({ data }) => {
        _this.data = data;
        console.log(data);
        uni.hideLoading();
      });
    },

    handleChangeTab(key) {
      this.currentTab = key;
      this.getVoucherTansform();
    },
  },
};
</script>

<style lang="less" scoped>
.voucher-turnover-container {
  padding: 46upx;
  box-sizing: border-box;

  .filter-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    margin: 30upx 0;

    .uni-btn {
      font-size: 28upx;
      padding: 18upx 30upx;
      border: 1upx solid #00b578;
      border-radius: 4px;
      color: #00b578;
      transition: all 350ms;

      &.active {
        background-color: #00b578;
        color: #fff;
      }

      &:nth-child(1) {
        margin-right: 20upx;
      }
    }
  }

  .list-wrapper {
    margin: 66upx 0;
    margin-bottom: 0;
  }
}
</style>