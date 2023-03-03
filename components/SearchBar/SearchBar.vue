<template>
  <view
    class="search-bar-container"
    :style="{
      height: height,
      borderColor: color,
    }"
  >
    <BeeIcon :src="require('./search.png')"></BeeIcon>
    <input class="f-12" type="text" placeholder="输入您想搜索的商品" />

    <button class="bee-btn" :style="{ background: color }">
      {{ btnText }}
    </button>
  </view>
</template>

<script>
export default {
  props: {
    height: {
      type: String,
      default: '72upx',
    },

    color: {
      type: String,
      default: '#FA5151',
    },

    btnText: {
      type: String,
      default: '搜索',
    },
  },
}
</script>

<style lang="less" scoped>
.search-bar-container {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  border: 2upx solid #fa5151;
  padding: 16upx 122upx 16upx 16upx;
  box-sizing: border-box;
  border-radius: 100px;

  input {
    flex: 1;
    color: #999999;
    margin-left: 14upx;
  }

  .bee-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    color: #f9f9f9;
    right: 0;
    top: -2upx;
    width: 120upx;
    height: 72upx;
    border-radius: 100px;
  }
}
</style>
