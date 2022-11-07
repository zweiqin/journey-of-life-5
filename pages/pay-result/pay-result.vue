<template>
  <view class="pay-result">
    <JHeader width="50" height="50" title="支付结果"></JHeader>

    <view class="pay-header">
      <JIcon type="voucher-recharge" width="132" height="120"></JIcon>
      <h1>订单支付</h1>
      <view class="nick-name">你妈妈喊你回家吃饭</view>
    </view>

    <view class="main">
      <view class="item">
        <view class="title">当前状态</view>
        <view class="value"> 支付成功</view>
      </view>

      <view class="item">
        <view class="title">支付金额</view>
        <view class="value">￥30</view>
      </view>

      <view class="item">
        <view class="title">支付时间</view>
        <view class="value">2022-01-02</view>
      </view>

      <view class="item">
        <view class="title">交易单号</view>
        <view class="value">58421128489816631165244489126363555</view>
      </view>

      <view class="item">
        <view class="title">备注说明</view>
        <view class="value"
          >若超过24小时未能到账，可联系商城客服， 感谢您的理解。</view
        >
      </view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.pay-result {
  padding: 34upx;
  box-sizing: border-box;
  font-size: 28upx;

  .pay-header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 88upx 0;

    h1 {
      font-size: 48upx;
      margin: 20upx 0 8upx 0;
    }
  }

  .main {
    .item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 56upx;

      .title {
        white-space: nowrap;
        margin-right: 140upx;
      }

      .value{
        word-break: break-all;
      }
    }
  }
}
</style>