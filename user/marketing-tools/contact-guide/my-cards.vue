<template>
  <view class="my-card">
    <view class="my-card-background"> </view>
    <view class="main">
      <view class="my-card-header">
        <JBack></JBack>
        <h2>名片夹</h2>
      </view>

      <view class="card-info">
        <view class="title">总名片数</view>
        <view class="card-number">1</view>
      </view>

      <view class="my-card-change"> 更换背景 </view>

      <view class="card-list">
        <view class="create-card-time">2022-10月</view>
        <view class="card-wrapper">
          <image
            class="avatar"
            src="https://img2.baidu.com/it/u=2489310734,2696445903&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1666890000&t=cc887312c46802d0388c02e63705b350"
            mode=""
          />

          <view class="detail-info">
            <view class="name-wrapper">
              <view class="name">庞文龙</view>
              <JIcon width="36" height="36" type="share"></JIcon>
            </view>

            <view class="text text1">营销策划师</view>
            <view class="text">广东团蜂科技有限公司</view>
          </view>
        </view>
      </view>
    </view>

    <view class="my-card-footer">
      <button class="uni-btn build">新建名片</button>
      <button class="uni-btn cards">我的名片</button>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.my-card {
  width: 100%;
  padding-bottom: 116upx;

  &-background {
    width: 100%;
    height: 384upx;
    background-color: #183869ff;
  }

  .main {
    position: absolute;
    left: 0;
    top: 92upx;
    width: 100%;
    padding: 0 30upx;
    box-sizing: border-box;

    .my-card-header {
      display: flex;
      align-items: center;

      h2 {
        color: #fff;
        font-size: 30upx;
        margin-top: -4upx;
        margin-left: 30upx;
      }
    }

    .card-info {
      height: 320upx;
      width: 100%;
      background-color: #ffe5cc;
      border-radius: 20upx;
      box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-size: 32upx;
      color: #3d3d3d;
      margin: 60upx 0 20upx 0;

      .card-number {
        font-size: 72upx;
        color: #804208;
        font-weight: bold;
        margin-top: 56upx;
        font-family: fangsong;
      }
    }

    .my-card-change {
      text-align: center;
      color: #999999;
      font-size: 24upx;
    }

    .card-list {
      margin-top: 30upx;

      .create-card-time {
        font-size: 24upx;
        color: #999;
      }

      .card-wrapper {
        width: 100%;
        padding: 50upx 26upx;
        box-sizing: border-box;
        border-radius: 20upx;
        box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.302);
        margin-top: 20upx;
        display: flex;
        justify-content: space-between;
        align-items: center;

        .avatar {
          width: 120upx;
          height: 120upx;
          object-fit: cover;
          border-radius: 20upx;
          margin-right: 26upx;
          flex-shrink: 0;
        }

        .detail-info {
          flex: 1;

          .name-wrapper {
            display: flex;
            justify-content: space-between;
            align-items: center;
            font-size: 32upx;
            font-weight: bold;
          }

          .text {
            color: #3d3d3d;
            font-size: 24upx;

            &.text1 {
              margin: 14upx 0 10upx 0;
            }
          }
        }
      }
    }
  }

  .my-card-footer {
    position: fixed;
    left: 0;
    bottom: -1px;
    width: 100%;
    height: 115upx;
    display: flex;
    padding: 22upx 30upx;
    box-sizing: border-box;
    align-items: center;
    background-color: #fff;

    .build {
      flex: 1;
      margin-right: 24upx;
      border: 1upx solid #999999;
      color: #999;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 100px;
    }

    .cards {
      display: flex;
      justify-content: center;
      align-items: center;
      flex: 2;
      height: 100%;
      border-radius: 100px;
      background-color: #0087f5;
      color: #fff;
    }
  }
}
</style>