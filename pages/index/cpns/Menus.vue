<template>
  <view class="menus-container">
    <view
      class="menu-bar-item"
      :style="{ width: 100 / column + '%' }"
      v-for="item in data"
      :key="item.name"
    >
      <BeeIcon :src="item.icon" :size="40"></BeeIcon>
      <text>{{ item.name }}</text>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },

    column: {
      type: Number,
      default: 4,
    },
  },
}
</script>

<style lang="scss" scoped>
.menus-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  background-color: #fff;
  padding: 30upx 0;
  border-radius: 20upx;
  margin-top: 33upx;

  .menu-bar-item {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    margin-bottom: 24upx;
  }
}
</style>
