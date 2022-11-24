<template>
  <view
    class="store-goods"
    @click="go('/store/goods-detail?goodsId=' + data.id)"
  >
    <image class="goods-avatar" :src="data.picUrl" mode="" />
    <view class="info">
      <view class="name">{{ data.name }}</view>
      <view class="saled">已售：{{ data.sales || 0 }}</view>
      <view class="op">
        <view class="price-wrapper">
          ￥<text class="price-text">{{ data.retailPrice }}</text>
        </view>

        <view class="sp-wrapper">
          <button class="uni-btn" v-if="!number" @click.stop="handleAddCar">
            加入购物车
          </button>
          <view class="ops" v-else>
            <view class="op1" @click.stop="removeGoods">-</view>
            <view class="number">{{ number }}</view>
            <view class="op2" @click.stop="handleAddCar">+</view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true,
    },

    number: {
      type: Number,
      required: true,
    },
  },
  methods: {
    handleAddCar() {
      this.$emit("add", +1);
    },

    removeGoods() {
      if (this.number - 1 <= 0) {
        this.$emit("remove");
        return;
      }

      this.$emit("add", -1);
    },
  },
};
</script>

<style lang="less" scoped>
.store-goods {
  display: flex;
  justify-content: space-between;
  font-size: 28upx;
  margin-bottom: 32upx;

  .goods-avatar {
    width: 130upx;
    height: 130upx;
    border-radius: 10upx;
    margin-right: 20upx;
  }

  .info {
    flex: 1;
    display: flex;
    justify-content: space-between;
    flex-direction: column;
  }

  .saled {
    font-size: 24upx;
    color: #5c5c5c;
  }

  .op {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .ops {
      display: flex;

      .number {
        width: 48upx;
        height: 48upx;
        text-align: center;
      }

      .op1,
      .op2 {
        width: 48upx;
        height: 48upx;
        color: #fff;
        background-color: #fa5151;
        border-radius: 50%;
        box-sizing: border-box;
        font-size: 40upx;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-bottom: 4px;
      }
    }

    .price-wrapper {
      font-size: 24upx;
      color: #fa5151;

      .price-text {
        font-size: 28upx;
      }
    }

    .uni-btn {
      font-size: 28upx;
      color: #fff;
      padding: 10upx 14upx;
      background-color: #fa5151;
    }
  }
}
</style>