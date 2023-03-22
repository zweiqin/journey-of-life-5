<template>
  <view class="daren-square-container">
    <!-- <view class="header">达人广场</view> -->
    <Navs></Navs>
    <view class="pane">
      <view
        v-for="item in tabConfig"
        :key="item.value"
        class="pane-item"
        @click="handleSwitchTab(item.value)"
        :class="{ active: currentTab === item.value }"
      >
        <text>{{ item.text }}</text>
      </view>
    </view>
    <OfficialMission :list="taskList" v-if="currentTab == 0"></OfficialMission>
    <MyTask :list="taskList" v-else></MyTask>
  </view>
</template>

<script>
import Navs from './components/navs'
import MyTask from './components/my-task'
import OfficialMission from './components/officialMission'
import { getTaskListApi } from '../../api/square'
import { J_USER_ID } from '../../constant'

export default {
  components: {
    Navs,
    OfficialMission,
    MyTask,
  },
  data() {
    return {
      currentTab: 0,
      tabConfig: [
        {
          text: '官方任务',
          value: 0,
        },
      ],

      taskQuery: {
        page: 1,
        limit: 20,
      },
      taskTotals: 0,
      taskList: [],
      userId: '',
    }
  },

  onLoad() {
    this.getTaskList()
    this.userId = uni.getStorageSync(J_USER_ID)
    if (this.userId) {
      this.tabConfig.push({
        text: '我的任务',
        value: 1,
      })
    }
  },

  methods: {
    handleSwitchTab(currentTab) {
      this.currentTab = currentTab
      this.taskQuery.page = 1
      this.taskList = []
      if (currentTab === 1) {
        this.taskQuery.userId = this.userId
      } else {
        this.taskQuery.userId = ''
      }

      this.getTaskList()
    },

    async getTaskList(isLoadMore) {
      const { data } = await getTaskListApi(this.taskQuery)
      console.log(data)
      if (isLoadMore) {
        this.taskList.push(...data.list)
      } else {
        this.taskList = data.list
      }

      this.taskTotals = Math.ceil(data.total / this.taskQuery.limit)
    },
  },
}
</script>

<style lang="less" scoped>
.daren-square-container {
  font-size: 28upx;
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: #f6f6f6;
  padding-bottom: 160upx;

  .header {
    background-color: #fff;
    text-align: center;
    font-size: 32upx;
    padding: 54upx 0 54upx 0;
    font-weight: bold;
  }

  .pane {
    display: flex;
    padding: 0 15upx;
    box-sizing: border-box;
    justify-content: space-between;
    background-color: #fff;
    margin-top: 20upx;
    border-bottom: 1upx solid #d8d8d8;

    &-item {
      text-align: center;
      width: 268upx;
      font-size: 32upx;
      padding: 28upx 0;

      &::after {
        transition: all 350ms;
      }

      &.active {
        color: #fa5151;
        position: relative;
        font-weight: bold;

        &::after {
          width: 100%;
          height: 6upx;
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          background: #f40;
        }
      }
    }
  }
}
</style>
