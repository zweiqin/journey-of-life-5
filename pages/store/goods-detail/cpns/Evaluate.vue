<template>
  <view class="evaluate-container pane-wrapper">
    <h3>评价</h3>
    <view class="main">
      <view class="title-wrapper">
        <h4>商品所属门店评价(1264)条</h4>
        <!-- <view class="more">
          <text class="more-btn"> 查看全部 </text>
          <BeeIcon name="arrowright"></BeeIcon>
        </view> -->
      </view>

      <view class="values">
        <view class="tag"> <tui-icon :size="12" name="agree-fill"></tui-icon>环境真棒(22)</view>
        <view class="tag">服务热情(10)</view>
        <view class="tag">口味超赞(22)</view>
        <view class="tag">食物超赞(12)</view>
        <view class="tag">性价比高(19)</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.evaluate-container {
  h3 {
    padding-bottom: 10upx;
    position: relative;
    font-size: 34upx;

    &::after {
      position: absolute;
      content: '';
      display: block;
      height: 4upx;
      width: 660upx;
      left: 50%;
      background: linear-gradient(270deg, #FFFFFF 0%, #D8D8D8 52%, #FFFFFF 100%);
      transform: translateX(-50%);
      bottom: 0;
    }
  }

  .main {
    .title-wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 10upx;

      h4 {
        font-size: 28upx;
      }

      .more {
        display: flex;
        align-items: center;

        .more-btn {
          color: #777;
          font-size: 24upx;
        }
      }
    }

    .values {
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      .tag {
        color: #777;
        font-size: 24upx;
        padding: 2upx 8upx;
        background-color: #F6F6F6;
        border-radius: 4upx;
        margin-right: 12upx;
        margin-bottom: 10upx;
      }
    }
  }
}
</style>