<template>
  <view class="apply-vip-history-container">
    <JHeader width="50" height="50" title="申请历史"></JHeader>
    <view class="header">
      <view
        class="item"
        v-for="item in vipUpNavs"
        :key="item.value"
        :class="{ active: query.applicationType === item.value }"
        @click="handleSwitchTab(item.value)"
        >{{ item.label }}</view
      >
    </view>

    <ul v-if="historyList && historyList.length">
      <li v-for="item in historyList" :key="item.id">
        <view class="vip-icon">
          <image
            class="icon"
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/wgk2r94me3kexvaogug4.png"
            mode=""
          />
        </view>

        <view class="info">
          <view class="info-top">
            <view class="name"
              >{{ mapApplyType(item.applicationType) }}
              <image
                class="vip-icon-top"
                src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/0yofrsucrnpvcombuya9.png"
                mode=""
              />
            </view>
            <view class="status">{{ item.status | fomartStatus }}</view>
          </view>

          <!-- <view class="info-middle">剩余天数：<text>1年</text></view> -->
          <view class="info-bottom">
            <view class="time">更新时间：{{ item.updatetime }}</view>
            <view class="detail">详情</view>
          </view>
        </view>
      </li>

      <uni-load-more
        v-show="loadingStatus !== 'hidden'"
        :status="loadingStatus"
      ></uni-load-more>
    </ul>

    <JNoData v-else text="暂无申请记录" type="king"></JNoData>
  </view>
</template>

<script>
import { mapApplyType, mapApplyStatus, vipUpNavs } from "./config";
import { getAllApplyVipHistoryListApi } from "../../api/user";
import { getUserId } from "../../utils";

export default {
  data() {
    return {
      vipUpNavs,
      historyList: [],
      totalList: 0,
      loadingStatus: "loading",
      query: {
        userId: getUserId(),
        page: 1,
        limit: 10,
        applicationType: null,
      },
    };
  },

  onLoad() {
    this.loadData();
  },

  methods: {
    mapApplyType,
    // 获取所有数据
    loadData(loadMore) {
      this.loadingStatus = "loading";
      getAllApplyVipHistoryListApi({ ...this.query }).then(({ data }) => {
        this.totalList = data.total;
        if (loadMore) {
          this.historyList.push(...data.items);
        } else {
          this.historyList = data.items;
        }
        this.loadingStatus = "hidden";
      });
    },

    // 点击切换tab
    handleSwitchTab(tab) {
      this.query.applicationType = !tab ? null : tab;
      this.loadData();
    },
  },

  filters: {
    fomartStatus(value) {
      const currentStatus = mapApplyStatus.find((item) => item.value === value);
      return currentStatus && currentStatus.label;
    },
  },

  onReachBottom() {
    if (this.historyList.length < this.query.limit) {
      return;
    }

    if (this.historyList.length >= this.totalList) {
      this.loadingStatus = "noMore";
      return;
    }

    this.query.page++;
    this.loadData(true);
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.apply-vip-history-container {
  padding: 46upx;
  box-sizing: border-box;

  .header {
    .flex();
    font-size: 24upx;
    color: #3d3d3d;
    margin-top: 34upx;
    padding-bottom: 20upx;
    border-bottom: 1upx solid #d8d8d8;

    .item {
      &.active {
        color: #fa5151;
      }
    }
  }

  ul {
    width: 100%;
    padding: 0;
    li {
      width: 100%;
      padding: 46upx 0;
        border-bottom: 1upx solid #d8d8d8;

      .flex();

     &:last-child{
       border: none;
     }



      .vip-icon {
        width: 160upx;
        height: 160upx;
        border-radius: 20upx;
        overflow: hidden;
        background: linear-gradient(180deg, #fa5151 0%, #ff8f1f 100%);
        .flex(center, center);
        margin-right: 60upx;

        .icon {
          width: 100upx;
          height: 89.6upx;
          text-align: center;
        }
      }

      .info {
        font-size: 24upx;
        color: #3d3d3d;
        flex: 1;

        .info-top {
          .flex();

          .vip-icon-top {
            width: 42upx;
            height: 40upx;
            margin-left: 10upx;
          }
        }

        .info-bottom {
          .flex();
          margin-top: 40upx;
          .detail {
            color: #999;
          }
        }

        .info-middle {
          margin: 16upx 0;
        }

        .name {
          font-size: 36upx;
        }
      }
    }
  }
}
</style>