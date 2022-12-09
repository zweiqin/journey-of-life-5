<template>
  <view class="officia-mission-container">
    <view class="filter-wrapper">
      <view class="filter-item">
        <text>全部任务</text>
        <image
          src="../../../../static/images/square/play-fill.png"
          mode=""
          class="icon"
        />
      </view>

      <view class="filter-item">
        <text>全部平台</text>
        <image
          src="../../../../static/images/square/play-fill.png"
          mode=""
          class="icon"
        />
      </view>

      <view class="filter-item">
        <text>粉丝效应</text>
        <image
          src="../../../../static/images/square/play-fill.png"
          mode=""
          class="icon"
        />
      </view>
    </view>

    <view
      style="animation-duration: 300ms"
      class="task-wrapper animate__animated animate__fadeInUp"
    >
      <Task full></Task>
      <Task></Task>
    </view>
  </view>
</template>

<script>
import Task from "../task";
export default {
  components: {
    Task,
  },
};
</script>

<style lang="less" scoped>
.officia-mission-container {
  .filter-wrapper {
    padding: 20upx 40upx 16upx 40upx;
    display: flex;
    justify-content: space-between;
    background-color: #fff;

    .filter-item {
      display: flex;
      align-items: center;
    }

    .icon {
      width: 28upx;
      height: 28upx;
    }
  }
}
</style>