<template>
  <view class="j-red-envelope-container">
    <view class="header">
      <JAvatar :size="48" :src="avatar"></JAvatar>
      <view class="from">{{ name }}的红包</view>
    </view>
    <view class="desc">{{ desc || '恭喜发财，财源滚滚' }}</view>
    <image class="bg-img" :src="src" mode="" />
  </view>
</template>

<script>
export default {
  props: {
    avatar: String,
    desc: String,
    src: String,
    name: String,
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.j-red-envelope-container {
  width: 100%;
  height: 1080upx;
  background-color: #fa5151;
  border-radius: 30upx;
  padding: 60upx 40upx 92upx 40upx;
  box-sizing: border-box;

  .header {
    width: 100%;
    .flex(center, center);

    .from {
      font-size: 32upx;
      color: #fff;
      margin-left: 18upx;
    }
  }

  .desc {
    text-align: center;
    font-size: 36upx;
    color: #fff200;
    margin: 20upx 0 36upx 0;
  }

  .bg-img {
    width: 100%;
    height: 780upx;
    object-fit: cover;
    border-radius: 30upx;
  }
}
</style>