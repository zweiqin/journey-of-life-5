<template>
  <view class="my-task">
    <!-- 您还不是达人，<button
      class="uni-btn"
      @click="go('/marketing-treasure-house/daren-square/daren-center')"
    >
      成为达人
    </button> -->

    <Task v-for="item in list" :key="item.id" :data="item"></Task>
    <view v-if="!list.length" class="no-data"> 暂无任务~ </view>
  </view>
</template>

<script>
import Task from '../task/index.vue'
export default {
  components: {
    Task,
  },

  props: {
    list: {
      type: Array,
      required: true,
    },
  },
}
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
