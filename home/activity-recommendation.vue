<template>
  <view class="activity-recommendation-container">
    <view class="header">
      <JBack tabbar="/pages/index/index"></JBack>
      <h1>活动推荐</h1>
    </view>

    <view class="activity-item">
      <view class="address">盈信广场</view>
      <JAvatar
        src="https://img2.baidu.com/it/u=3005487131,826536428&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=753"
        size="200"
        radius="10"
      ></JAvatar>
      <view class="info">
        <view class="activity-text">活动：盈信广场美食狂欢日</view>
        <view class="activity-text">时间：2022-08-07至2022-08-10</view>
        <view class="activity-text">地点：佛山顺德区盈信广场</view>
        <view class="op">
          <view
            >导航去这里
            <image
              class="icon"
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gous09leumg1u3fykzfb.png"
              mode=""
            />
          </view>

          <button class="join" @click="handleJoin">点击参与</button>
        </view>
      </view>
    </view>

    <view class="activity-item">
      <view class="address">盈信广场</view>
      <JAvatar
        src="https://img2.baidu.com/it/u=3005487131,826536428&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=753"
        size="200"
        radius="10"
      ></JAvatar>
      <view class="info">
        <view class="activity-text">活动：盈信广场美食狂欢日</view>
        <view class="activity-text">时间：2022-08-07至2022-08-10</view>
        <view class="activity-text">地点：佛山顺德区盈信广场</view>
        <view class="op">
          <view
            >导航去这里
            <image
              class="icon"
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gous09leumg1u3fykzfb.png"
              mode=""
            />
          </view>

          <button class="join" @click="handleJoin">点击参与</button>
        </view>
      </view>
    </view>

    <view class="activity-item">
      <view class="address">盈信广场</view>
      <JAvatar
        src="https://img2.baidu.com/it/u=3005487131,826536428&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=753"
        size="200"
        radius="10"
      ></JAvatar>
      <view class="info">
        <view class="activity-text">活动：盈信广场美食狂欢日</view>
        <view class="activity-text">时间：2022-08-07至2022-08-10</view>
        <view class="activity-text">地点：佛山顺德区盈信广场</view>
        <view class="op">
          <view
            >导航去这里
            <image
              class="icon"
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gous09leumg1u3fykzfb.png"
              mode=""
            />
          </view>

          <button class="join" @click="handleJoin">点击参与</button>
        </view>
      </view>
    </view>

    <view class="activity-item">
      <view class="address">盈信广场</view>
      <JAvatar
        src="https://img2.baidu.com/it/u=3005487131,826536428&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=753"
        size="200"
        radius="10"
      ></JAvatar>
      <view class="info">
        <view class="activity-text">活动：盈信广场美食狂欢日</view>
        <view class="activity-text">时间：2022-08-07至2022-08-10</view>
        <view class="activity-text">地点：佛山顺德区盈信广场</view>
        <view class="op">
          <view
            >导航去这里
            <image
              class="icon"
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/gous09leumg1u3fykzfb.png"
              mode=""
            />
          </view>

          <button class="join" @click="handleJoin">点击参与</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  methods: {
    handleJoin() {
      uni.navigateTo({
        url: "/home/activity-detail",
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../style/mixin.less";

.activity-recommendation-container {
  min-height: 100vh;
  background: linear-gradient(180deg, #ec328f, #fce4f1);
  box-sizing: border-box;
  padding: 50upx 16upx;

  .header {
    display: flex;
    margin-bottom: 40upx;
    h1 {
      font-size: 32upx;
      color: #fff;
      flex: 1;
      text-align: center;
    }
  }

  .activity-item {
    position: relative;
    background-color: #fff;
    padding: 86upx 42upx 24upx 24upx;
    box-sizing: border-box;
    border-radius: 20upx;
    .flex();
    margin-bottom: 22upx;

    &:last-child {
      margin-bottom: 0;
    }

    .address {
      position: absolute;
      background-color: #07b9b9;
      left: 0;
      top: 20upx;
      padding: 8upx 44upx 8upx 24upx;
      border-radius: 0 40px 40px 0;
      font-size: 24upx;
      color: #fff;
    }

    .info {
      flex: 1;
      margin-left: 48upx;

      .activity-text {
        font-size: 24upx;
        color: #3d3d3d;
        margin-bottom: 10upx;
      }

      .op {
        display: flex;
        justify-content: space-between;
        color: #3662ec;
        font-size: 24upx;
        margin-top: 20upx;

        .icon {
          width: 36upx;
          height: 32upx;
          vertical-align: -4upx;
        }

        .join {
          background-color: #fa5151;
          padding: 0 28upx;
          line-height: 2;
          color: #fff;
          font-size: 24upx;
          border-radius: 40px;
          margin: 0;
        }
      }
    }
  }
}
</style>