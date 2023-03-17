<template>
  <view class="filter-pane-container">
    <view class="main-nav">
      <view class="main-nav-item active"> 附近 </view>
      <view class="main-nav-item"> </view>
      <view class="main-nav-item">
        智能排序
        <tui-icon :size="14" color="#000" name="arrowdown"></tui-icon>
      </view>
      <view class="main-nav-item">
        筛选
        <tui-icon :size="14" color="#000" name="arrowdown"></tui-icon>
      </view>
    </view>

    <scroll-view scroll-x="true">
      <view class="tags">
        <view class="tag">附近1km</view>
        <view class="tag">超值半价</view>
        <view class="tag">上榜餐厅</view>
        <view class="tag">早餐</view>
        <view class="tag">晚餐</view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.filter-pane-container {
  padding: 24upx 28upx;
  box-sizing: border-box;
  border-radius: 24upx 24upx 0 0;
  background: linear-gradient(180deg, #FFFFFF, #F6F6F6);
  margin-top: 20upx;

  .main-nav {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .main-nav-item {
      &.active {
        color: #fa5151;
        font-weight: 500;
      }
    }
  }

  .tags {
    display: flex;
    white-space: nowrap;
    margin-top: 20upx;

    .tag {
      padding: 0 20upx;
      background-color: #fff;
      border-radius: 8upx;
      font-size: 24upx;
      line-height: 40upx;
      color: #955311;
      margin-right: 30upx;
    }
  }
}
</style>
