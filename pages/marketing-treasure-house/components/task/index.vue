<template>
  <view class="task-container">
    <view class="info">
      <view class="left">
        <view class="name">安缇可丽美容（佛山市云剪 20人）</view>
        <view class="task-c">12元；佣金5%</view>
        <view class="tags">
          <image
            class="tag1"
            src="../../../../static/images/square/tag1.png"
            mode=""
          />
          <view class="tag2">任务奖励</view>
        </view>
      </view>

      <image
        class="task-image"
        src="https://img0.baidu.com/it/u=561734853,2461096286&fm=253&fmt=auto&app=138&f=JPEG?w=889&h=500"
        mode=""
      />
    </view>

    <view class="requirement">
      <view class="requirement-item">
        要求：<view class="requirement-item-tag">广东省</view>
      </view>

      <view class="join">
        <img class="view" src="../../../../static/images/con-center/visited.png" alt="" />
        100+
        <button class="uni-btn">去报名</button>
      </view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.task-container {
  width: 100%;
  background-color: #fff;
  font-size: 28upx;
  padding: 26upx 30upx;
  box-sizing: border-box;
margin-top: 20upx;

  .info {
    display: flex;
    justify-content: space-between;

    .left {
      flex: 1;
      border-bottom: 1upx solid #d8d8d8;
      padding-bottom: 20upx;
      margin-right: 20upx;

      .name {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .task-c {
        color: #fa5151;
        margin: 20upx 0 30upx 0;
      }

      .tags {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 24upx;

        .tag1 {
          width: 140upx;
          height: 46upx;
          margin-right: 10upx;
        }

        .tag2 {
          height: 46upx;
          box-sizing: border-box;
          padding: 3px 6px;
          background-color: #efefef;
          border-radius: 10upx;
        }
      }
    }

    .task-image {
      flex-shrink: 0;
      width: 194upx;
      height: 194upx;
      object-fit: cover;
      border-radius: 20upx;
    }

    .name {
      font-size: 32upx;
    }
  }

  .requirement {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 28upx;

    .requirement-item {
      display: flex;
      align-items: center;

      .requirement-item-tag{
        border: 1upx solid #777;
        border-radius: 8upx;
        padding: 2px 4px;
      }
    }

    .join {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #777777;

      .view{
        width: 30upx;
        margin-right: 8upx;
      }
    }

    .uni-btn{
      width: 120upx;
      height: 44upx;
      line-height: 44upx;
      text-align: center;
      color: #fff;
      background-color: #FA5151;
      padding: 2px 5px;
      box-sizing: content-box;
      margin-left: 5px;
      font-size: 28upx;
    }
  }
}
</style>