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
        ref="filterAreaRef"
        class="filter-area animate__animated"
        :class="{
          animate__bounceInDown: ['0', '1', '2'].includes(currentFilter),
        }"
        :style="{
          height: ['0', '1', '2'].includes(currentFilter) ? '' : 0,
        }"
      >
        <ul>
          <li
            v-for="item in filterItems"
            @click="handleChooseFilterItem"
            :key="item.value"
          >
            {{ item.label }}
          </li>
        </ul>
      </view>
    </view>

    <!-- 优惠卷列表 -->
    <view class="coupon-list" ref="couponListRef">
      <view @click="closeMask" class="mask" ref="maskRef"></view>
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
import { getCouponListApi } from "../../api/user";
import { getUserId } from "../../utils";

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

  onLoad(){
    this.getCoupons()
  },

  methods: {
    // 切换tab
    switchTab(currentNav) {
      this.currentNav = currentNav;
    },

    // 切换filter
    handleFilterCoupon(item) {
      this.currentFilter = item.value;
      const mask = this.$refs.maskRef.$el;
      const wrapper = this.$refs.couponListRef.$el;
      this.$refs.filterAreaRef.$el.classList.add("animate__bounceInDown");

      if (item.value == "3") {
        mask.style.height = "0px";
      } else {
        mask.style.height = wrapper.getBoundingClientRect().height + "px";
      }
      this.$forceUpdate();
    },

    // 点击遮罩层
    closeMask() {
      this.currentFilter = "";
      this.$refs.maskRef.$el.style.display = "none";
      setTimeout(() => {
        this.$refs.maskRef.$el.style.height = "0";
        this.$refs.maskRef.$el.style.display = "block";
      });
    },

    // 选择该
    handleChooseFilterItem() {
      this.closeMask();
    },

    // 获取优惠劵
    getCoupons() {
      getCouponListApi({
        userId: getUserId(),
      }).then((res) => {
        console.log(res);
      });
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
      z-index: 11;
      overflow: hidden;
      transition: all 350ms;
      box-shadow: 0 0 34upx #fff;

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
