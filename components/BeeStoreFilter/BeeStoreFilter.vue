<template>
  <view class="bee-store-filter-container">
    <view class="synthesize item">
      <view class="title" style="color: #fa5151">综合排序</view>
      <BeeIcon
        :src="require('../GoodsFilter/icons/red-arrow.png')"
        :size="14"
      ></BeeIcon>
    </view>

    <view class="right">
      <view class="menus item">
        <view class="title">品类</view>
        <BeeIcon :src="require('./image/code.png')" :size="14"></BeeIcon>
      </view>

      <view class="synthesize item">
        <view class="title">筛选</view>
        <BeeIcon :src="require('./image/filter.png')" :size="14"></BeeIcon>
      </view>
    </view>
  </view>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.bee-store-filter-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28upx 28upx 10upx 28upx;
  background-color: #fff;
  border-radius: 20upx 20upx 0 0;

  .right {
    display: flex;
    align-items: center;
  }

  .menus {
    margin-right: 100upx;
  }

  .item {
    display: flex;
    align-items: center;
  }
}
</style>
