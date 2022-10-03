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
        <view class="numbers">
          <view class="add">+</view>
          <view class="currentNumber"></view>
          <view class="desc">-</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
import calendar from "../../uni_modules/uni-datetime-picker/components/uni-datetime-picker/calendar.vue";
export default {
  components: { calendar },
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
        .flex();
      }
    }
  }
}
</style>