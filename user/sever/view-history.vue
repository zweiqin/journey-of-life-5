<template>
  <view class="view-history-container">
    <JHeader width="50" height="50" :title="currentPageInfo.title"></JHeader>
    <view class="navs">
      <view
        class="item"
        :class="{ active: currentPage === item.value }"
        v-for="item in labelList"
        :key="item.label"
        >{{ item.name }}</view
      >
    </view>

    <view class="timer">
      <image
        class="timer-icon"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/208t5z0ldi4odit8lbsn.png"
        mode=""
      />

      <view class="timer-title">时间</view>

      <view @click="openCalendar" style="display: flex; align-items: center">
        {{ currentTime }}
        <JIcon type="right-arrow"></JIcon>
      </view>
    </view>

    <view class="list-wrapper">
    </view>

    <uni-calendar
      ref="calendar"
      class="uni-calendar--hook"
      :clear-date="true"
      :date="info.date"
      :insert="info.insert"
      :lunar="info.lunar"
      @confirm="handleChoonseCanlar"
      @close="handleCloseCanlar"
    />
  </view>
</template>

<script>
import { getUserViewHistoryApi } from "../../api/user";
import { getUserId } from "../../utils";

const mapCurrentInfo = {
  collection: {
    title: "我的足迹",
  },

  history: {
    title: "我的收藏",
  },

  follow: {
    title: "我的订阅",
  },
};

export default {
  data() {
    return {
      currentPage: "",
      currentPageInfo: "",
      historyList: {},
      labelList: [
        {
          name: "收藏",
          value: "collection",
        },
        {
          name: "历史",
          value: "history",
        },
        {
          name: "订阅",
          value: "follow",
        },
      ],
      currentActive: 0,
      info: {
        range: true,
        insert: false,
        selected: [],
      },
      currentTime: "",
    };
  },
  onLoad(options) {
    this.currentPage = options.page;
    this.currentPageInfo = mapCurrentInfo[this.currentPage];
    const time = new Date();
    this.currentTime =
      time.getFullYear() + "年" + " " + (time.getMonth() + 1) + "月";

    getUserViewHistoryApi({
      page: 0,
      size: 10,
      userId: getUserId(),
    }).then(({ data }) => {
      for (const item of data.footprintList) {
        const key = item.addTime.split(" ")[0];
        if (!this.historyList[key]) {
          this.historyList[key] = [item];
        } else {
          this.historyList[key].push(item);
        }
      }
    });
  },

  methods: {
    // 切换nav
    handleChangeCurrentPane(index) {
      this.currentActive = index;
    },

    // 打开日历
    openCalendar() {
      this.$refs.calendar.open();
    },

    // 选择日历
    handleChoonseCanlar(e) {},

    // 关闭日历
    handleCloseCanlar() {},
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.view-history-container {
  padding: 74upx 32upx;
  box-sizing: border-box;

  .navs {
    .flex();
    font-size: 24upx;
    padding: 34upx 0 30upx 0;
    border-bottom: 1upx solid #d8d8d8;

    .active {
      color: #fa5151ff;
    }
  }

  .timer {
    font-size: 28upx;
    color: #3d3d3d;
    font-weight: 500;
    display: flex;
    align-items: center;
    margin: 32upx 0;

    .timer-icon {
      width: 40upx;
      height: 44upx;
    }

    .timer-title {
      margin: 0 80upx 0 22upx;
    }

    .j-icon {
      width: 30upx;
      height: 32upx;
      transform: rotate(90deg);
      margin-left: 20upx;
    }
  }
}
</style>