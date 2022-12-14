<template>
  <view class="my-task">
    您还不是达人，<button
      class="uni-btn"
      @click="go('/marketing-treasure-house/daren-square/daren-center')"
    >
      成为达人
    </button>
  </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.my-task {
  font-size: 32upx;
  display: flex;
  height: 200px;
  justify-content: center;
  align-items: center;

  .uni-btn {
    color: #fa5151;
  }
}
</style>