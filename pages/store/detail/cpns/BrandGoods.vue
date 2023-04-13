<template>
  <view class="brand-goods-container" v-if="goodsData">
    <tui-lazyload-img @click="go('/pages/store/goods-detail/goods-detail?goodsId=' + goodsData.id)" class=" goods-img"
      mode="scaleToFill" width="340rpx" height="176rpx" :src="goodsData.picUrl"></tui-lazyload-img>

    <view class=" brand-goods-name">
      {{ goodsData.name }}
    </view>

    <view class="time">
      <view class="wrapper" @click="go('/pages/store/goods-detail/goods-detail?goodsId=' + goodsData.id)">
        <view class="price-wrapper">
          <text class="price-text">￥{{ goodsData.counterPrice }}</text>
          <text class="price-tag">4折</text>
        </view>
      </view>

      <BeeIcon @click="$emit('add-car', goodsData)" :size="22"
        :src="require('../../../../static/brand/detail/add-icon.png')"></BeeIcon>
    </view>

    <view class="text_3">
      <text>促销价共省71.2元</text>
    </view>
  </view>
</template>

<script>
import { getRandom } from '../../../../utils'
export default {
  props: {
    goodsData: {
      type: Object,
      required: true,
    },
  },

  methods: {
    getRandom,
  },
}
</script>

<style lang="less" scoped>
.brand-goods-container {
  width: 340upx;
  margin-bottom: 40upx;

  .brand-goods-name {
    color: #3d3d3d;
    font-weight: 500;
    width: 340upx;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .time {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 13upx 0;

    .wrapper {
      .price-text {
        color: #fa5151;
        font-weight: bold;
        font-size: 28upx;
      }

      .price-tag {
        padding: 0 10upx;
        border: 1upx solid #fa5151;
        font-size: 20upx;
        color: #fa5151;
        border-radius: 8upx;
        margin-left: 9upx;
      }
    }

    .bee-btn {
      width: 102upx;
      height: 44upx;
      background-color: #fa5151;
      border-radius: 10upx;
      color: #fff;
    }
  }

  .text_3 {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10upx;

    text {
      font-size: 24upx;

      &:nth-child(1) {
        color: #777;
        font-size: 20upx;
      }

      &:nth-child(2) {
        color: #00b578;
      }
    }
  }
}
</style>
