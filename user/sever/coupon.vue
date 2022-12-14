<template>
  <view class="coupon-container">
    <view class="header">
      <JHeader
        tabbar="/pages/user/user"
        width="50"
        height="50"
        title="优惠劵"
      ></JHeader>
    </view>

    <!-- navs -->
    <view class="navs">
      <view
        class="nav-item"
        :class="{
          active: nav.value === currentNav,
        }"
        @click="switchTab(nav.value)"
        v-for="nav in couponNavs"
        :key="nav.value"
        >{{ nav.label }}</view
      >
    </view>

    <!-- 优惠卷列表 -->
    <view class="coupon-list" ref="couponListRef">
      <!-- <Coupon></Coupon>
      <Coupon expire></Coupon>
      <Coupon></Coupon>
      <Coupon></Coupon> -->
    </view>

    <JNoData text="暂无优惠劵" type="coupon-color"></JNoData>
  </view>
</template>

<script>
import Coupon from "./components/CouponItem.vue";
import { couponNavs } from "./config";
import { getMyCouponListApi } from "../../api/coupon";
import { getUserId } from "../../utils";

export default {
  components: {
    Coupon,
  },
  data() {
    return {
      couponNavs,
      currentNav: -1,
      currentFilter: "",
      query: {
        page: 1,
        size: 10
      }
    };
  },

  onLoad() {
    this.getCoupons();
  },

  methods: {
    // 切换tab
    switchTab(currentNav) {
      this.currentNav = currentNav;
      this.getCoupons()
    },

    // 获取优惠劵
    getCoupons() {
      uni.showLoading({
        title: "加载中",
      });
      getMyCouponListApi({
        userId: getUserId(),
        brandId: 0,
        ...this.query
      }).then((res) => {
        console.log(res);
        uni.hideLoading()
      });
    },
  },
};
</script>

<style lang="less" scoped>
.coupon-container {
  // header
  .header {
    padding: 32upx;
    padding-bottom: 0;
    box-sizing: border-box;
  }

  // navs
  .navs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 38upx 22upx;
    padding: 0 32upx;
    box-sizing: border-box;

    .nav-item {
      color: #000;
      font-size: 28upx;

      &.active {
        color: #fa5151;
      }
    }
  }

  // 优惠卷列表
  .coupon-list {
    position: relative;
    padding: 0 32upx;
    box-sizing: border-box;

    .mask {
      position: absolute;
      width: 100%;
      height: 0;
      left: 0;
      top: 0;
      background: rgba(54, 51, 51, 0.76);
      z-index: 10;
      transition: all 350ms 350ms;
    }

    .coupon-item-container {
      margin-bottom: 20upx;
    }
  }
}
</style>
