<template>
  <view class="apply-daren">
    <view class="pane">
      <JHeader width="50" height="50" title="成为达人"></JHeader>

      <view class="pane-title">选择名片平台</view>
      <view class="select">
        <view class="choose">请选择名片平台</view>
        <image
          class="icon"
          src="../../static/images/square/right-arrow.png"
          mode=""
        />
      </view>
    </view>

    <view class="pane">
      <view class="title">账号信息</view>

      <view class="pane-title">抖音名</view>
      <view class="select">
        <input type="text" placeholder="请输入抖音名" />
      </view>

      <view class="pane-title">抖音ID</view>
      <view class="select">
        <input type="text" placeholder="请输入抖音ID" />
      </view>
    </view>

    <view class="pane">
      <view class="title">达人信息</view>

      <view class="pane-title">请选择性别</view>
      <view class="select">
        <view class="choose">性别</view>
        <image
          class="icon"
          src="../../static/images/square/right-arrow.png"
          mode=""
        />
      </view>

      <view class="pane-title">接单地域</view>
      <view class="select">
        <view class="choose">抖音</view>
        <image
          class="icon"
          src="../../static/images/square/right-arrow.png"
          mode=""
        />
      </view>

      <view class="pane-title">团购等级</view>
      <view class="select">
        <view class="choose">抖音</view>
        <image
          class="icon"
          src="../../static/images/square/right-arrow.png"
          mode=""
        />
      </view>
    </view>

    <view class="pane">
      <view class="title">联系信息</view>

      <view class="pane-title">联系人电话</view>
      <view class="select">
        <input type="text" placeholder="请输入联系人电话" />
      </view>

      <view class="pane-title">联系人微信</view>
      <view class="select">
        <input type="text" placeholder="请输入联系人微信号" />
      </view>
    </view>

    <view class="pane">
      <view class="title"
        >系统消息设置（可多选，小程序，APP里面的消息通知）</view
      >

      <view class="message-item">
        <view class="pane-title">接收实探消息</view>
        <switch style="transform: scale(0.7)" />
      </view>

      <view class="message-item">
        <view class="pane-title">接收云探消息</view>
        <switch style="transform: scale(0.7)" />
      </view>
    </view>

    <view class="pane agreement" style="background-color: transparent">
      <view class="radio active"></view>
      我已阅读<text class="text">《达人入驻须知》</text>
    </view>

    <button class="uni-btn">提交</button>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.apply-daren {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: #f6f6f6;
  font-size: 28upx;
  padding-bottom: 60upx;

  .pane {
    background-color: #fff;
    margin-bottom: 22upx;
    padding: 20upx 24upx;
    box-sizing: border-box;

    .title {
      font-size: 32upx;
      font-weight: bold;
    }

    &-title {
      margin-top: 32upx;
      font-size: 32upx;
    }

    .icon {
      width: 40upx;
      height: 40upx;
    }

    .message-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20upx 0;
      border-bottom: 1upx solid #d8d8d8;

      &:last-child {
        border-bottom: none;
      }

      .pane-title {
        margin-top: 0;
      }
    }

    .select {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 26upx;

      &:last-child {
        input {
          border-bottom: none;
        }
      }

      .choose {
        flex: 1;
      }

      input {
        flex: 1;
        font-size: 28upx;
        border-bottom: #d8d8d8 1px solid;
        padding-bottom: 20upx;
      }
    }
  }

  .agreement {
    font-size: 28upx;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .radio {
      position: relative;
      width: 32upx;
      height: 32upx;
      border-radius: 50%;
      border: 1upx solid #777;
      margin-right: 20upx;

      &.active {
        border-color: #fa5151;

        &::after {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          content: "";
          width: 20upx;
          height: 20upx;
          border-radius: 50%;
          background-color: #fa5151;
        }
      }
    }

    .text {
      color: #fa5151;
    }
  }

  .uni-btn {
    width: 716upx;
    height: 76upx;
    background: linear-gradient(270deg, #fa5151, #ff9e33);
    color: #fff;
    font-size: 36upx;
    margin: 100upx auto auto auto;
    text-align: center;
    line-height: 76upx;
  }
}
</style>