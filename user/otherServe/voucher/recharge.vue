<template>
  <view class="recharge-page">
    <JBack dark width="50" height="50"></JBack>
    <view class="main">
      <view class="recharge-wrapper">
        <view class="title">充值金额</view>
        <view class="inp">
          <view class="icon">￥</view>
          <input
            class="input"
            v-model.number="payPrice"
            type="number"
            placeholder="请输入充值金额"
          />

          <view class="error">{{ errMsg }}</view>
          <view v-if="!errMsg" class="final-price"
            >充值获得：{{ finalPrice }} 代金劵</view
          >
        </view>

        <JButton @click="handleRecharge">充值</JButton>
      </view>
    </view>
  </view>
</template>

<script>
import { getVoucherConfigApi, rechargePrePayApi } from "../../../api/user";
import { payOrderGoodsApi } from "../../../api/goods";
import { getUserId } from "../../../utils";
import { payFn } from "../../../utils/pay";
import { PAY_TYPE } from "../../../constant";

export default {
  onLoad(options) {
    const { price } = options;
    if (price != -1) {
      this.payPrice = price * 1;
    }
    this.getVoucherConfig();
  },

  data() {
    return {
      payPrice: null,
      errMsg: "",
      voucherConfig: {},
    };
  },

  methods: {
    handleRecharge() {
      if (this.errMsg) {
        return;
      }

      if (!this.payPrice) {
        this.$showToast("请输入充值金额");
        return;
      }

      rechargePrePayApi({
        voucherNum: this.finalPrice,
        payGrade: this.payPrice,
        voucherId: this.voucherConfig.id,
        userId: getUserId(),
      }).then(({ data }) => {
        payOrderGoodsApi({
          orderNo: data.payOrderID,
          userId: getUserId(),
          payType: 2,
        }).then((res) => {
          payFn(res, PAY_TYPE.VOUCHER.value, data.payOrderID);
        });
      });

      // this.go("/pages/pay-result/pay-result");
    },

    // 获取代金卷配置
    getVoucherConfig() {
      getVoucherConfigApi().then(({ data }) => {
        this.voucherConfig = data[0];
      });
    },
  },

  watch: {
    payPrice(value) {
      if (value === 0) {
        this.errMsg = "充值金额不能等于零";
        return;
      } else if (value < 0) {
        this.errMsg = "充值金额不能小于零";
        return;
      } else if (
        (value + "").includes(".") &&
        (value + "").split(".")[1].length > 2
      ) {
        this.errMsg = "充值金额错误";
        return;
      } else {
        this.errMsg = "";
      }
    },
  },

  computed: {
    finalPrice() {
      return this.payPrice * this.voucherConfig.ratio;
    },
  },
};
</script>

<style lang="less" scoped>
.recharge-page {
  padding: 48upx;
  box-sizing: border-box;

  .main {
    padding: 32upx;
    box-sizing: border-box;
    margin-top: 40px;

    .recharge-wrapper {
      .inp {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 40upx;
        border-bottom: 1upx solid #ccc;
        padding-bottom: 10upx;
        margin-bottom: 400upx;

        .icon {
          font-weight: bold;
          font-size: 80upx;
        }

        .input {
          font-weight: bold;
          font-size: 128upx;
        }

        .uni-input-placeholder {
          font-size: 30px;
        }
      }

      .error {
        color: red;
        margin-top: 10upx;
        position: absolute;
        bottom: -60upx;
        left: 0;
      }

      .final-price {
        color: rgb(0, 0, 0);
        margin-top: 10upx;
        position: absolute;
        bottom: -132upx;
        left: 0;
      }
    }
  }
}
</style>