<template>
  <view class="goods-pane">
    <JAvatar
      :radius="10"
      :size="120"
      src="https://img2.baidu.com/it/u=1443258330,1345238306&fm=253&fmt=auto&app=138&f=JPEG?w=310&h=230"
    ></JAvatar>

    <view class="goods-pane-right">
      <view class="goods-pane-name">BILLY 毕利 / OXBERG 奥克伯家具餐桌奥克伯家具餐桌奥克伯家具餐桌</view>
      <view class="goods-pane-desc-content">
        <text class="goods-pane-desc">家庭餐桌带椅子</text>
        <text class="goods-pane-desc">灰色</text>
      </view>
      <view class="goods-pane-footer">
        <text class="goods-pane-price">￥300</text>
        <view ref="numbersRef" class="numbers">
          <view class="item" @click="changeNumber(-1)">-</view>
          <view class="currentNumber">{{ goodsNumber }}</view>
          <view class="item" @click="changeNumber(1)">+</view>
        </view>

        <button ref="addCarRef" class="add-car" @click="handleAddCar">
          加入购物车
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      goodsNumber: 1,
    };
  },
  methods: {
    handleAddCar() {
      this.$refs.addCarRef.$el.style.flex = "0";
      this.$refs.numbersRef.$el.style.opacity = "1";
      if (!this.goodsNumber) {
        this.goodsNumber = 1;
      }
    },

    changeNumber(number) {
      this.goodsNumber = number + this.goodsNumber;
      if (this.goodsNumber <= 0) {
        this.$refs.addCarRef.$el.style.flex = "";
        this.$refs.numbersRef.$el.style.opacity = "0";
        this.goodsNumber = 0;
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin.less";

.goods-pane {
  .flex();
  width: 100%;

  .goods-pane-right {
    width: 100%;
    margin-left: 30upx;
    font-size: @f12;
    color: @c0;

    .goods-pane-name {
      width: 520upx;
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }

    .goods-pane-desc-content {
      margin: 14upx 0 10upx 0;
    }

    .goods-pane-desc {
      font-size: 20upx;
      margin-right: 10upx;
    }

    .goods-pane-footer {
      .flex();

      .goods-pane-price {
        color: #fa5151;
        font-size: 28upx;
      }

      .numbers {
        .flex(center, flex-end);
        opacity: 0;
        flex: 1;
        font-size: 36upx;
        overflow: hidden;
        transition: all 350ms;

        .currentNumber {
          color: #fa5151;
          margin: 0 5px;
        }

        .item {
          width: 48upx;
          height: 48upx;
          border-radius: 50%;
          color: #fff;
          text-align: center;
          line-height: 44upx;

          &:first-child {
            border: 1.5px solid #fa5151;
            color: #fa5151;
          }

          &:last-child {
            background-color: #fa5151;
          }
        }
      }

      .add-car {
        flex: 0 0 146upx;
        padding: 0;
        margin: 0;
        line-height: 1;
        font-size: 24upx;
        color: #fff;
        height: 46upx;
        text-align: center;
        line-height: 46upx;
        background-color: #fa5151;
        transition: all 200ms;
        overflow: hidden;
        flex-shrink: 0;
      }
    }
  }
}
</style>