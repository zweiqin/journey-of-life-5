<template>
  <view class="brand-manage-wrapper">
    <JHeader
      width="50"
      height="50"
      tabbar="/pages/user/user"
      title="我的门店"
    ></JHeader>

    <!--  -->
    <view class="header">
      <view class="avatar-info">
        <image
          class="avatar"
          src="https://img2.baidu.com/it/u=2421090168,324781765&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1671123600&t=66e4cf24c3cfb24800b8e12c041f9b30"
          mode=""
        />
        <text class="brand-name">飓风门店</text>
      </view>

      <view class="con">
        <image
          class="con-icon"
          src="../../../static/images/user/yongjin.png"
          mode=""
        />
        <text class="brand-name">收入佣金</text>
      </view>
    </view>

    <!-- 统计 -->
    <view class="total">
      <view class="total-item">
        <text style="color: #ff4d4d"
          >￥ <text class="total-price">918273</text>
        </text>
        <text>累计实收金额</text>
      </view>
      <view class="total-item">
        <text style="color: #ff4d4d"
          >￥ <text class="total-price">918273</text>
        </text>
        <text>可收入佣金金额</text>
      </view>
    </view>

    <!-- 门店状态 -->
    <view class="brand-status">
      <view class="status-name">门店状态</view>
      <view class="switch-bar"></view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.brand-manage-wrapper {
  min-height: 100vh;
  background-color: #f4f4f4;
  font-size: 28upx;

  .j-header-container {
    background-color: #fff;
    padding: 10px 0;
  }

  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 20upx 20upx;
    box-sizing: border-box;
    background-color: #ff4d4d;

    .avatar-info {
      display: flex;
      align-items: center;
      font-size: 32upx;
      font-weight: bold;
      color: #fff;
    }

    .avatar {
      width: 110upx;
      height: 110upx;
      border-radius: 50%;
      margin-right: 20upx;
    }

    .con {
      display: flex;
      align-items: center;
      background-color: #ff8286;
      color: #fff;
      padding: 20upx;
      border-radius: 20upx;
    }

    .con-icon {
      width: 42upx;
      height: 36upx;
      margin-right: 8upx;
    }
  }

  .total {
    display: flex;
    justify-content: space-between;
    padding: 20upx 0;
    background-color: #fff;

    &-item {
      flex: 0 0 50%;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-sizing: border-box;

      &:nth-child(1) {
        border-right: 1upx solid rgb(223, 223, 223);
      }

      .total-price {
        color: #ff4d4d;
        font-weight: bold;
        font-size: 36upx;
      }
    }
  }
}
</style>