<template>
  <view class="j-goods-container">
    <image
      class="img"
      src="https://img1.baidu.com/it/u=2665200862,3572141497&fm=253&fmt=auto?w=750&h=500"
      alt=""
    />
    <view class="info">
      <view class="name">我要核试验的回复那话是</view>
      <view class="tags">
        <view class="tag">七天无理由退货</view>
        <view class="tag">品牌正品</view>
      </view>

      <view class="op">
        <view class="j-goods-price">￥30</view>
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
      if(!this.goodsNumber){
        this.goodsNumber = 1
      }
    },

    changeNumber(number) {
      this.goodsNumber = number + this.goodsNumber;
      if (this.goodsNumber <= 0) {
        this.$refs.addCarRef.$el.style.flex = "";
        this.$refs.numbersRef.$el.style.opacity = "0";
        this.goodsNumber = 0
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin.less";

.j-goods-container {
  width: 348upx;
  height: 480upx;
  display: flex;
  flex-direction: column;
  margin-bottom: 40upx;
  overflow: hidden;

  .img {
    width: 100%;
    height: 300upx;
    border-radius: 40upx 40upx 0 0;
  }

  .info {
    width: 100%;
    padding: 10upx;
    box-sizing: border-box;
    /* background-color: #f40; */

    .name {
      width: 308upx;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 24upx;
      color: #3d3d3d;
    }

    .tags {
      display: flex;
      margin: 12upx 0 23upx 0;

      .tag {
        border: 1upx solid #777777;
        font-size: 20upx;
        padding: 4upx 8upx;
        border-radius: 10px;
        margin-right: 10upx;
      }
    }

    .op {
      .flex();
      .j-goods-price {
        font-size: 36upx;
        color: #fa5151;
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