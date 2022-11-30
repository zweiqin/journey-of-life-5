<template>
  <view class="coupon-container">
    <view class="coupon-list" v-if="couponList.length">
      <view class="coupon-item" v-for="coupon in couponList" :key="coupon.id">
        <view class="c-wrapper">
          <view class="left">
            <view class="c-title">全场9.5折</view>
          </view>
          <view class="right">领取</view>
        </view>
      </view>
    </view>

    <JNoData width="380" type="coupon" text="暂无优惠劵"></JNoData>
  </view>
</template>

<script>
import { getCouponListApi } from "../../api/store";
import { getUserId } from "../../utils";
export default {
  data() {
    return {
      couponList: [],
    };
  },
  methods: {
    getCouponList(brandId) {
      const _this = this;
      uni.showLoading();
      getCouponListApi({
        brandId: brandId,
        userId: getUserId(),
      }).then(({ data }) => {
        _this.couponList = data.data;
        uni.hideLoading();
      });
    },
  },
};
</script>

<style lang="less" scoped>
.coupon-item {
  .c-wrapper {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    left: 0;
    z-index: 3;
  }
  position: relative;
  width: 676upx;
  height: 260upx;

  &::before {
    position: absolute;
    content: "";
    width: 676upx;
    height: 260upx;
    background: url("../../static/images/store/c.png") no-repeat;
    background-size: cover;
    top: 0px;
    left: 0px;
    z-index: 2;
  }

  &::after {
    position: absolute;
    content: "";
    width: 676upx;
    height: 260upx;
    background: url("../../static/images/store/c-bg.png") no-repeat;
    background-size: cover;
    top: -12upx;
    left: -12upx;
    z-index: 1;
  }

  .left {
    flex: 3;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .c-title {
      font-weight: bold;
      font-size: 72upx;
      color: #fff;
    }
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    box-sizing: border-box;
    border-left: 3px dotted #fff;
    color: #fff;
  }
}
</style>