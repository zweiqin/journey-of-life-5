<template>
  <view class="talent-list-container">
    <view class="header-titl-wrapper">
      <tui-icon @click="handleBack" name="arrowleft" color="#000" :size="24"></tui-icon>
      <view class="title">营销达人</view>
    </view>

    <view class="wrapper" v-show="currentNavs === 1">
      <TalentPane :data="item" v-for="item in talentList" :key="item.id"></TalentPane>
      <LoadMore :status="talentStatus"></LoadMore>

      <view class="no-data" v-if="!talentList.length"> 暂无达人~ </view>
    </view>
  </view>
</template>

<script>
import TalentPane from './cpns/TalentPane.vue'
import { getTalentListApi, getMarketingPlannerListApi } from '../../api/square'
export default {
  components: {
    TalentPane,
  },
  data() {
    return {
      currentNavs: 1,

      // 抖音达人
      talentQuery: {
        page: 1,
        limit: 50,
      },
      talentList: [],
      talentTotal: 0,
      talentStatus: 'none',

      // 营销策划师
      marketingPlannerQuery: {
        page: 1,
        limit: 50,
      },
      marketingPlannerList: [],
      marketingPlannerTotal: 0,
      marketingPlannerStatus: 'none',
    }
  },

  methods: {
    handleSwitchTab(tag) {
      this.currentNavs = tag
    },

    // 获取达人信息
    async getTalentList(isLoadMore) {
      this.talentStatus = 'loading'
      const { data } = await getTalentListApi(this.talentQuery)
      this.talentStatus = 'none'

      if (isLoadMore) {
        this.talentList.push(...data.list)
      } else {
        this.talentList = data.list
      }

      this.talentTotal = Math.ceil(data.total / this.talentQuery.limit)
      console.log(this.talentList)
    },

    // 获取营销策划师列表
    async getMarketingPlannerList(isLoadMore) {
      this.marketingPlannerStatus = 'loading'
      const { data } = await getMarketingPlannerListApi(
        this.marketingPlannerQuery
      )
      this.marketingPlannerStatus = 'none'

      if (isLoadMore) {
        this.marketingPlannerList.push(...data.list)
      } else {
        this.marketingPlannerList = data.list
      }

      console.log(this.marketingPlannerList)

      this.marketingPlannerTotal = Math.ceil(
        data.total / this.marketingPlannerQuery.limit
      )
    },

    // 返回
    handleBack() {
      uni.switchTab({
        url: '/pages/marketing-treasure-house/marketing-treasure-house',
      })
    },
  },

  onLoad() {
    this.getTalentList()
    // this.getMarketingPlannerList()
  },

  onReachBottom() {
    if (this.currentNavs === 0) {
      if (this.talentQuery.limit > this.talentList.length) {
        return
      }

      if (this.talentQuery.page >= this.talentTotal) {
        this.talentStatus = 'no-more'
        return
      }

      this.talentQuery.page++
      this.getTalentList(true)
    } else {
      if (this.marketingPlannerQuery.limit > this.marketingPlannerList.length) {
        return
      }

      if (this.marketingPlannerQuery.page >= this.marketingPlannerTotal) {
        this.talentStatus = 'no-more'
        return
      }

      this.marketingPlannerQuery.page++
      this.getMarketingPlannerList(true)
    }
  },
}
</script>

<style lang="less" scoped>
view,
text {
  line-height: 1.5;
}

.talent-list-container {
  width: 100%;
  min-height: 100vh;
  background-color: #f6f6f6;

  .header-titl-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 104upx;
    width: 100%;
    background-color: #fff;
    padding: 0 30upx;
    box-sizing: border-box;

    .back-icon {
      position: absolute;
      top: 50%;
      left: 30upx;
      transform: translateY(-50%);
    }

    .title {
      position: relative;
      color: #000000;
      font-size: 32upx;

      &::after {
        position: absolute;
        bottom: -8upx;
        left: 50%;
        transform: translateX(-50%);
        content: '';
        display: block;
        width: 0;
        height: 4upx;
        background: linear-gradient(90deg, #fa5151 0%, #ffa44b 100%);
        transition: all 350ms;
      }

      &.active {
        color: #261919;
        font-weight: 500;

        &::after {
          width: 56upx;
        }
      }
    }
  }

  .swiper {
    height: calc(100vh - 104upx);
    box-sizing: border-box;
  }

  .swiper-item {
    height: 100%;
    overflow: auto;

    .wrapper {
      height: calc(100vh - 104upx);
      padding: 24upx;
      overflow: auto;
    }
  }

  .no-data {
    text-align: center;
    line-height: 200px;
    color: #ccc;
  }
}
</style>
