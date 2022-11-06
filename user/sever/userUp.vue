<template>
  <view class="up-vip-container">
    <JHeader tabbar="/pages/user/user" :dark="false" title="会员升级"></JHeader>

    <view class="item" v-for="item in vips" :key="item.label">
      <view class="title">{{ item.label }}</view>
      <view class="vip-pane">
        <image
          class="vip-icon"
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/vlwhqwdgxqsb96z63itf.png"
          mode=""
        />
      </view>

      <view class="sub-title">{{ item.label }}权益</view>

      <image :style="item.style" :src="item.powerUrl" mode="" />

      <button class="apply-btn" @click="handleToUp(item)">
        <text>￥</text>
        <text class="vip-price">{{ item.price }}</text>
        <text class="text">{{ item.label }}</text>
      </button>

      <view class="tip"> 放心开通，不会自动续费 </view>

      <!-- <view class="apply-status" v-if="item.type === 4 && vipInfo">
        <button class="uni-btn" @click="handleToViewApplyTable(item.type)">
          申请表
        </button> -->
      <!-- <view class="status">{{ mapApplyStats(storeInfo.status) }}</view> -->
      <!-- <button
          v-if="[item.key].status === 0"
          class="uni-btn"
          @click="handleWhhithDrawApply(item.type)"
        >
          撤销申请
        </button>
      </view> -->

      <view class="apply-status" v-if="item.type === 1 && storeInfo">
        <button class="uni-btn" @click="handleToViewApplyTable(item.type)">
          申请表
        </button>
        <!-- <view class="status">{{ mapApplyStats(storeInfo.status) }}</view> -->
        <button
          v-if="storeInfo.userUpgradeInfo.status === 0"
          class="uni-btn"
          @click="handleWhhithDrawApply(item.type)"
        >
          撤销申请
        </button>

        <button
          class="uni-btn"
          style="background: #52aa44"
          @click="handlePay(1, 'pay')"
          v-if="
            storeInfo.userUpgradeInfo.status === 2 ||
            storeInfo.userUpgradeInfo.status === 3
          "
        >
          支付
        </button>

        <button
          @click="handlePay(1, 'try')"
          style="background: #2bcddd"
          class="uni-btn"
          v-if="
            storeInfo.userUpgradeInfo.status === 2 ||
            storeInfo.userUpgradeInfo.status === 3
          "
        >
          试用
        </button>
      </view>

      <view class="apply-status" v-if="item.type === 2 && marketingPlannerInfo">
        <button class="uni-btn" @click="handleToViewApplyTable(item.type)">
          申请表
        </button>
        <!-- <view class="status">{{ mapApplyStats(storeInfo.status) }}</view> -->
        <button
          v-if="marketingPlannerInfo.userUpgradeInfo.status === 0"
          class="uni-btn"
          @click="handleWhhithDrawApply(item.type)"
        >
          撤销申请
        </button>

        <button
          class="uni-btn"
          style="background: #52aa44"
          @click="handlePay(2, 'pay')"
          v-if="
            marketingPlannerInfo.userUpgradeInfo.status === 2 ||
            marketingPlannerInfo.userUpgradeInfo.status === 3
          "
        >
          支付
        </button>

        <button
          @click="handlePay(2, 'try')"
          style="background: #2bcddd"
          class="uni-btn"
          v-if="
            marketingPlannerInfo.userUpgradeInfo.status === 2 ||
            marketingPlannerInfo.userUpgradeInfo.status === 3
          "
        >
          试用
        </button>
      </view>
    </view>

    <view class="op">
      <button
        class="btn"
        @click="go('/user/marketing-tools/apply-vip-history')"
      >
        申请记录
      </button>
      <button class="btn">我的会员</button>
    </view>
  </view>
</template>

<script>
import {
  getApplyTableApi,
  widthDrawApi,
  payStoreAndYingApi,
  payTryStoreAndYingApi,
  houxucaozuoApi,
  applyVipApi,
  payVipApplySuccessApi,
} from "../../api/user";
import { getUserId } from "../../utils";
import { mapApplyStats, vips } from "./config";
import {
  J_STORE_INFO,
  J_USER_TOKEN,
  J_MARKETING_PLANNER,
  J_USER_INFO,
  J_REFRSH,
} from "../../constant";
import { payOrderGoodsApi } from "../../api/goods";

export default {
  data() {
    return {
      vips,
      storeInfo: null,
      vipInfo: null,
      marketingPlannerInfo: null,
      isReLoad: true,
    };
  },

  onShow() {
    this.getApplyHistory();
  },

  methods: {
    getApplyHistory() {
      const _this = this;

      getApplyTableApi({
        userId: getUserId(),
      }).then((res) => {
        this.vipInfo =
          res.data.items.find((item) => item.newGrade === 4) || null;
        this.storeInfo =
          res.data.items.find((item) => item.newGrade === 1) || null;
        this.marketingPlannerInfo =
          res.data.items.find((item) => item.newGrade === 2) || null;
        console.log(this.vipInfo);
        // if (this.vipInfo.upgradeOrder.payStatus === 2) {
        //   const info = uni.getStorageSync(J_USER_INFO);
        //   console.log(info);
        //   // payVipApplySuccessApi({}).then(() => {
        //   //   this.$showToast("升级vip", "success");
        //   // });
        // }

        if (this.storeInfo && this.storeInfo.status !== 1) {
          if (this.isReLoad) {
            if (
              this.storeInfo.upgradeOrder &&
              this.storeInfo.upgradeOrder.payStatus === 2
            ) {
              houxucaozuoApi({
                userId: getUserId(),
                id: this.storeInfo.ticketsId,
              })
                .then((res) => {
                  uni.setStorageSync(J_REFRSH, "refrush");
                  _this.$showToast("商家升级成功", "success");
                  _this.getApplyHistory();
                  this.isReLoad = false;
                })
                .catch((err) => {});
            }
          }
        }

        if (
          this.marketingPlannerInfo &&
          this.marketingPlannerInfo.status !== 1
        ) {
          if (this.isReLoad) {
            if (
              this.marketingPlannerInfo.upgradeOrder &&
              this.marketingPlannerInfo.upgradeOrder.payStatus === 2
            ) {
              houxucaozuoApi({
                userId: getUserId(),
                id: this.marketingPlannerInfo.ticketsId,
              })
                .then((res) => {
                  uni.setStorageSync(J_REFRSH, "refrush");
                  _this.$showToast("营销策划师升级成功", "success");
                  _this.getApplyHistory();
                  this.isReLoad = false;
                })
                .catch((err) => {});
            }
          }
        }

        // if (this.storeInfo) {
        //   houxucaozuoApi({
        //     userId: getUserId(),
        //     id: this.storeInfo.ticketsId,
        //   }).then(res => {
        //     console.log(res);
        //   }).catch(err => {

        //   })
        // }

        if (this.storeInfo) {
          uni.setStorageSync(J_STORE_INFO, {
            info: this.storeInfo.userUpgradeInfo,
            status: this.storeInfo.userUpgradeInfo.status,
            ticketsId: this.storeInfo.ticketsId,
          });
        }

        if (this.marketingPlannerInfo) {
          uni.setStorageSync(J_MARKETING_PLANNER, {
            info: this.marketingPlannerInfo.userUpgradeInfo,
            status: this.marketingPlannerInfo.userUpgradeInfo.status,
            ticketsId: this.marketingPlannerInfo.ticketsId,
          });
        }
      });
    },

    handleToUp(item) {
      if (item.type === 4) {
        const userInfo = uni.getStorageSync(J_USER_INFO);
        console.log(userInfo.userLevel);
        if (userInfo.userLevel >= 1) {
          this.$showToast(
            `您已经是${userInfo.userLevelDesc}等级了，无需升级vip`
          );
        }

        return;
      }
      if (item.type === 1 && this.storeInfo) {
        return;
      }

      if (item.type === 2 && this.marketingPlannerInfo) {
        return;
      }

      if (item.type === 4) {
        applyVipApi({
          userId: getUserId(),
        }).then(({ data }) => {
          payOrderGoodsApi({
            orderNo: data.payOrderID,
            userId: getUserId(),
            payType: 4,
          }).then((res) => {
            const form = document.createElement("form");
            form.setAttribute("action", res.url);
            form.setAttribute("method", "POST");
            const data = JSON.parse(res.data);
            let input;
            for (const key in data) {
              input = document.createElement("input");
              input.name = key;
              input.value = data[key];
              form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
          });
        });
        return;
      }

      uni.navigateTo({
        url: item.url,
      });
    },

    mapApplyStats,

    handleToViewApplyTable(type) {
      if (type === 1) {
        this.go("/user/marketing-tools/store-application?type=table");
      } else {
        this.go("/user/marketing-tools/marketing-planner?type=table");
      }
    },

    handleWhhithDrawApply(type) {
      const _this = this;
      if (type === 1) {
        uni.showModal({
          title: "提示",
          content: "是否要撤销商家申请？",
          success: function (res) {
            if (res.confirm) {
              _this.widthDraw(_this.storeInfo.ticketsId);
            }
          },
        });
      } else {
        uni.showModal({
          title: "提示",
          content: "是否要撤销营销策划师申请？",
          success: function (res) {
            if (res.confirm) {
              _this.widthDraw(_this.marketingPlannerInfo.ticketsId);
            }
          },
        });
      }
    },

    widthDraw(id) {
      const _this = this;
      widthDrawApi({
        userId: getUserId(),
        token: uni.getStorageSync(J_USER_TOKEN),
        id,
      }).then(() => {
        uni.showToast({
          title: "撤销成功",
          duration: 2000,
        });
      });
    },

    handlePay(type, payType) {
      if (type === 1) {
        const api =
          payType === "pay" ? payStoreAndYingApi : payTryStoreAndYingApi;
        api({
          userId: getUserId(),
          upOrderId: this.storeInfo.ticketsId,
        }).then(({ data }) => {
          payOrderGoodsApi({
            orderNo: data.payOrderID,
            userId: getUserId(),
            payType: 4,
          }).then((res) => {
            const form = document.createElement("form");
            form.setAttribute("action", res.url);
            form.setAttribute("method", "POST");
            const data = JSON.parse(res.data);
            let input;
            for (const key in data) {
              input = document.createElement("input");
              input.name = key;
              input.value = data[key];
              form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
          });
        });
      } else if (type === 2) {
        const api =
          payType === "pay" ? payStoreAndYingApi : payTryStoreAndYingApi;
        api({
          userId: getUserId(),
          upOrderId: this.marketingPlannerInfo.ticketsId,
        }).then(({ data }) => {
          payOrderGoodsApi({
            orderNo: data.payOrderID,
            userId: getUserId(),
            payType: 4,
          }).then((res) => {
            const form = document.createElement("form");
            form.setAttribute("action", res.url);
            form.setAttribute("method", "POST");
            const data = JSON.parse(res.data);
            let input;
            for (const key in data) {
              input = document.createElement("input");
              input.name = key;
              input.value = data[key];
              form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
          });
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.up-vip-container {
  padding: 30upx 18upx;
  box-sizing: border-box;
  height: 100vh;
  overflow: scroll;
  background: url(https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/zwaljjiyz29rx6l3m5vl.png)
    no-repeat;
  font-size: 24upx;
  color: #3d3d3d;
  padding-bottom: 200upx;

  .item {
    width: 100%;
    background-color: #fff;
    border: 1upx solid #d8d8d8;
    border-radius: 20upx;
    padding: 24upx 32upx;
    box-sizing: border-box;
    margin-top: 60upx;

    .title {
      font-size: 28upx;
    }

    .vip-pane {
      .flex(center, center);
      width: 100%;
      margin: 32upx 0 66upx 0;
      border-radius: 20upx;
      height: 180upx;
      border: 1upx solid #ffc300;
      background: linear-gradient(
        180deg,
        #fff8c6 0%,
        rgba(255, 248, 198, 0) 100%
      );

      .vip-icon {
        width: 142upx;
        height: 128upx;
      }
    }

    .sub-title {
      color: #fa5151;
      font-size: 24upx;
    }

    .apply-btn {
      font-size: 48upx;
      color: #fff;
      box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.302);
      border-radius: 10px 10px 10px 10px;
      background: linear-gradient(270deg, #ff8f1f 0%, #ffc300 100%);
      margin: 30upx 0 0 0;

      .vip-price {
        font-size: 72upx;
      }

      .text {
        font-size: 36upx;
        font-weight: bold;
        vertical-align: 14upx;
        margin-left: 10upx;
      }
    }

    .tip {
      text-align: center;
      // padding-top: 24upx;
      padding-bottom: 24upx;
      margin-top: 50upx;
      font-size: 24upx;
      color: #999;
    }
  }

  .op {
    padding: 20upx 18upx;
    box-sizing: border-box;
    font-size: 32upx;
    color: #000;
    .flex();
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;

    .btn {
      .flex(center, center);
      width: 310upx;
      color: rgb(255, 255, 255);
      height: 70upx;
      border: 1upx solid #ff0000;
      margin: 0;
      border-radius: 100px;
      background: rgb(236, 0, 0);
    }
  }

  .apply-status {
    display: flex;
    width: 100%;
    height: 73upx;
    background-color: #fff;
    border-top: 1upx solid #dfdfdf;
    padding-top: 20px;
    margin-top: 20px;
    justify-content: flex-end;

    .uni-btn {
      padding: 20upx 40upx;
      margin-left: 20upx;
      color: #fff;
      font-size: 28upx;
      letter-spacing: 2px;

      &:nth-child(1) {
        background: #ff8f1f;
      }

      &:nth-child(2) {
        background: #999;
      }
    }
  }
}
</style>
