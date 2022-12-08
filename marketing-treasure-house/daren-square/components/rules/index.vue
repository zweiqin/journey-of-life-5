<template>
  <view class="rule-wrapper">
    <view class="rule-header">
      <view class="title">规则说明 </view>
      <view class="time">
        <JIcon width="32" height="32" type="cand"></JIcon>
        <text>活动截止日期 2022-12-06</text>
      </view>
    </view>

    <view class="rule-body">
      <view class="top-desc">
        <view>千粉以上团购达人账号：</view>
        <view
          >挂上指定门店定位：广州市都茂建建筑装饰装修有限公司
          （广东省深圳市光明区松明路7号附近)</view
        >
      </view>

      <view class="level">
        <view class="item">
          
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.rule-wrapper {
  // overflow: hidden;

  .rule-header {
    width: 100%;
    height: 100upx;
    background: linear-gradient(270deg, #fa5151, #ff9e33);
    border-radius: 20upx 20upx 0 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 36upx;
    box-sizing: border-box;
    color: #fff;

    .time {
      display: flex;
      align-items: center;

      .j-icon {
        margin-right: 10upx;
      }
    }
  }

  .rule-body {
    padding: 32upx 28upx;
    box-sizing: border-box;
    background-color: #fdf0ef;
    border: 1upx solid #fa5151;
    border-radius: 0 0 20upx 20upx;
    box-sizing: border-box;

    .top-desc{
      color: #777;
      padding-bottom: 34upx;
      border-bottom: 1upx solid #fa5151;
    }
  }
}
</style>