<template>
  <!-- <view
    v-if="data"
    class="task-container"
    @click="go('/marketing-treasure-house/daren-square/task-detail?id=' + data.id)"
  > -->
  <view
    v-if="data"
    class="task-container"
  >
    <view class="info">
      <view class="left">
        <view class="name">{{ data.name }}</view>
        <view class="task-c"
          >{{ data.unitPrice }}元；佣金{{ data.possessGold }}%</view
        >
        <view class="tags">
          <image
            class="tag1"
            src="../../../../static/images/square/tag1.png"
            mode=""
          />
          <view class="tag2">任务奖励</view>
        </view>
      </view>

      <view style="position: relative">
        <image
          class="task-image"
          :src="
            'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/' +
            data.avatar
          "
          mode=""
        />
        <view class="mask" v-if="full">
          <image src="../../../../static/images/square/icon3.png" mode="" />
        </view>
      </view>
    </view>

    <view class="requirement">
      <view class="requirement-item">
        要求：<view class="requirement-item-tag">{{ data.regionName }}</view>
      </view>

      <view class="join">
        <img
          class="view"
          src="../../../../static/images/con-center/visited.png"
          alt=""
        />
        100+
        <button class="uni-btn" :style="{ background: full ? '#4968F6' : '' }">
          {{ full ? '已爆满' : '去报名' }}
        </button>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    full: {
      type: Boolean,
      default: false,
    },

    data: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
.task-container {
  width: 100%;
  background-color: #fff;
  font-size: 28upx;
  padding: 26upx 30upx;
  box-sizing: border-box;
  margin-top: 20upx;

  .info {
    display: flex;
    justify-content: space-between;

    .left {
      flex: 1;
      border-bottom: 1upx solid #d8d8d8;
      padding-bottom: 20upx;
      margin-right: 20upx;

      .name {
        display: -webkit-box;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
      }

      .task-c {
        color: #fa5151;
        margin: 20upx 0 30upx 0;
      }

      .tags {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-size: 24upx;

        .tag1 {
          width: 140upx;
          height: 46upx;
          margin-right: 10upx;
        }

        .tag2 {
          height: 46upx;
          box-sizing: border-box;
          padding: 3px 6px;
          background-color: #efefef;
          border-radius: 10upx;
        }
      }
    }

    .task-image {
      flex-shrink: 0;
      width: 194upx;
      height: 194upx;
      object-fit: cover;
      border-radius: 20upx;
      background-color: #e6e6e6;
    }

    .name {
      font-size: 32upx;
    }
  }

  .mask {
    position: absolute;
    width: 194upx;
    height: 194upx;
    background-color: rgba(216, 216, 216, 0.7);
    top: 0;
    left: 0;
    border-radius: 20upx;

    image {
      margin-top: 37upx;
      margin-left: 37upx;
      width: 120upx;
      height: 120upx;
    }
  }

  .requirement {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 28upx;

    .requirement-item {
      display: flex;
      align-items: center;

      .requirement-item-tag {
        border: 1upx solid #777;
        border-radius: 8upx;
        padding: 2px 4px;
      }
    }

    .join {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #777777;

      .view {
        width: 30upx;
        margin-right: 8upx;
      }
    }

    .uni-btn {
      width: 120upx;
      height: 44upx;
      line-height: 44upx;
      text-align: center;
      color: #fff;
      background-color: #fa5151;
      padding: 2px 5px;
      box-sizing: content-box;
      margin-left: 5px;
      font-size: 28upx;
    }
  }
}
</style>
