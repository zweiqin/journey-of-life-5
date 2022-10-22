<template>
  <view class="activity-list-container">
    <view class="header">
      <JHeader
        width="50"
        height="50"
        tabbar="/pages/store/store"
        title="周边活动推荐"
      ></JHeader>
    </view>

    <view class="navs">
      <view
        class="nav-item"
        :class="{
          active: item.value === currentTab,
        }"
        v-for="item in tabs"
        :key="item.name"
        @click="switchTab(item.value)"
        >{{ item.name }}</view
      >
    </view>

    <view class="activity-list">
      <!-- <view class="activity-item" v-for="item in 4" :key="item">
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
      </view> -->
      <view class="no-data">暂无活动推荐</view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      tabs: [
        {
          name: "周边商圈活动推荐",
          value: 0,
        },
        {
          name: "抖音本地生活服务",
          value: 1,
        },
      ],

      currentTab: 0,
    };
  },

  methods: {
    switchTab(index) {
      this.currentTab = index;
    },

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

.activity-list-container {
  padding: 40upx 16upx;
  box-sizing: border-box;

  .navs {
    display: flex;
    align-items: center;
    justify-content: space-around;
    color: #000;
    font-size: 28upx;
    margin: 30upx 64upx;

    .nav-item {
      position: relative;
      padding-bottom: 20upx;
      transition: all 350ms;

      &::after {
        content: "";
        transition: all 350ms;
      }

      &.active {
        transition: all 350ms;

        &::after {
          position: absolute;
          left: 50%;
          top: 48upx;
          transform: translateX(-50%);
          content: "";
          display: flex;
          height: 4upx;
          width: 60%;
          background-color: #f40;
        }
      }
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

  .no-data{
    width: 100%;
    height: 200px;
    text-align: center;
    line-height: 200px;
    color: #ccc;
  }
}
</style>