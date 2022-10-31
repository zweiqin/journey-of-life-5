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

    <!-- filters -->
    <view class="filters-wrapper">
      <view
        class="filter-item"
        v-for="filter in couponFilters"
        :key="filter.value"
        @click="handleFilterCoupon(filter)"
      >
        <view class="title">{{ filter.label }}</view>
        <JIcon
          width="20"
          height="20"
          v-if="filter.type === 'select'"
          type="filter"
        ></JIcon>
      </view>

      <view
        class="filter-area animate__animated"
        :class="{
          animate__bounceInDown: ['0', '1', '2'].includes(currentFilter),
        }"
        :style="{
          height: ['0', '1', '2'].includes(currentFilter) ? '' : 0,
        }"
      >
        <ul>
          <li v-for="item in filterItems" :key="item.value">
            {{ item.label }}
          </li>
        </ul>
      </view>
    </view>

    <!-- 优惠卷列表 -->
    <view class="coupon-list">
      <Coupon></Coupon>
      <Coupon expire></Coupon>
      <Coupon></Coupon>
      <Coupon></Coupon>
    </view>
  </view>
</template>

<script>
import Coupon from "./components/CouponItem.vue";
import { couponNavs, couponFilters } from "./config";
export default {
  components: {
    Coupon,
  },
  data() {
    return {
      couponNavs,
      couponFilters,
      currentNav: 0,
      currentFilter: "",
    };
  },

  methods: {
    // 切换tab
    switchTab(currentNav) {
      this.currentNav = currentNav;
    },

    // 切换filter
    handleFilterCoupon(item) {
      this.currentFilter = item.value;
    },
  },

  computed: {
    filterItems() {
      if (this.currentFilter == "3") {
        return "";
      }

      return (
        this.currentFilter &&
        this.couponFilters.find((item) => item.value === this.currentFilter)
          .children
      );
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

  // filters
  .filters-wrapper {
    position: relative;
    width: 100%;
    height: 80upx;
    border-top: 1upx solid #d8d8d8;
    border-bottom: 1upx solid #d8d8d8;
    margin-bottom: 34upx;
    display: flex;
    justify-content: space-around;
    align-items: center;

    .filter-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24upx;
      color: #3d3d3d;
    }

    .title {
      margin-right: 10upx;
    }

    .j-icon {
      margin-top: 6upx;
    }

    .filter-area {
      position: absolute;
      width: 100%;
      background-color: #ffffff;
      left: 0;
      top: 80upx;
      z-index: 10;
      overflow: hidden;
      transition: all 350ms;

      ul {
        padding: 20upx 36upx;
        box-sizing: border-box;

        li {
          line-height: 2;
          font-size: 24upx;
        }
      }
    }
  }

  // 优惠卷列表
  .coupon-list {
    padding: 0 32upx;
    box-sizing: border-box;

    .coupon-item-container {
      margin-bottom: 20upx;
    }
  }
}
</style>