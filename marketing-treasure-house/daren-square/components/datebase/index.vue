<template>
  <view class="images-list">
    <view class="wrapper">
      <view class="title">数据</view>
      <view>查看607/达人162/下载356</view>
    </view>

    <view class="imgs">
      <img
        class="img"
        v-for="item in 22"
        :key="item"
        src="https://img0.baidu.com/it/u=740679572,1472990262&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
        alt=""
      />
    </view>

    <view class="load-more" style="color: #777">加载更多</view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.images-list {
  .wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #777;

    .title {
      font-size: 32upx;
      font-weight: bold;
      color: #3d3d3d;
    }
  }

  .imgs {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    margin-top: 20upx;
  }

  .img {
    width: 80upx;
    height: 80upx;
    border-radius: 50%;
    object-fit: cover;
    margin-left: -10px;
    margin-bottom: 32upx;
  }

  .load-more {
    text-align: center;
  }
}
</style>