<template>
  <view class="coupon-list">
    <view v-if="couponData.length" class="list">
      <view class="item f-s-b" v-for="item in couponData" :key="item.id">
        <view class="coupon-info">
          <view class="info">
            <text class="p-color">￥{{ item.discount }}</text>
            <text class="f-w-500">{{ item.name }}</text>
            <text>(满{{ item.min }}元可用)</text>
          </view>

          <view v-if="item.endTime" class="f-c-77">有效期{{ formatTime(new Date(item.endTime)) }}</view>
        </view>
        <button class="uni-btn font-14 p-color">立即领取</button>
      </view>
    </view>

    <view v-else class="c-no-data f-center">
      暂无优惠劵
    </view>
  </view>
</template>

<script>
import { formatTime } from '../../../../utils'
export default {
  props: {
    couponData: {
      type: Array,
      required: true
    }
  },
  methods: {
    formatTime
  },
}
</script>

<style lang="less" scoped>
@import '~@/style/mixin.less';

.coupon-list {
  .list {
    .item {
      .pdd(30upx);
      height: 140upx;
      border-radius: 10px;
      opacity: 1;
      background: #FFFFFF;
      box-shadow: 0px 4px 10px 0px #E1B590;
      transition: all 350ms;
      margin-bottom: 10px;

      &:active {
        background-color: #ebebeb;
      }
    }

    .f-c-77 {
      margin-top: 14upx;
    }
  }
}
</style>