<template>
  <view class="daren-square-container">
    <view class="header">达人广场</view>

    <Navs></Navs>
  </view>
</template>

<script>
import Navs from "./components/navs";
export default {
  components: {
    Navs,
  },
};
</script>

<style lang="less" scoped>
.daren-square-container {
  font-size: 28upx;
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: #f6f6f6;

  .header {
    background-color: #fff;
    text-align: center;
    font-size: 32upx;
    padding: 54upx 0 54upx 0;
    font-weight: bold;
  }
}
</style>