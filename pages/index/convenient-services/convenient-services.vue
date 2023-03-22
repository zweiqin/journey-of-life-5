<template>
  <view class="convenient-services-container">
    <!-- 顶部位置 -->
    <view class="header">
      <tui-icon name="arrowleft" color="#000"></tui-icon>
      <BeeAddress>
        <view class="address-wrapper">
          <view class="current-addresss">位置：广东省佛山市</view>
          <BeeIcon
            :src="require('../../../static/index/bianmin/location.png')"
            :size="24"
          ></BeeIcon>
        </view>
      </BeeAddress>
    </view>

    <!-- 搜索框 -->
    <SearchBar></SearchBar>

    <!-- 中间轮播图 -->
    
  </view>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.convenient-services-container {
  width: 100%;
  min-height: 100vh;
  padding: 20upx;
  box-sizing: border-box;
  background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);

  .header {
    width: 100%;
    display: flex;
    align-items: center;

    /deep/ .bee-address-container {
      flex: 1;
    }

    .address-wrapper {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .current-addresss {
        font-size: 32upx;
        font-weight: 500;
      }
    }
  }
}
</style>
