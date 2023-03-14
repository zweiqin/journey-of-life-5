<template>
  <view class="brand-detail-container">
    <view class="bg">
      <BeeBack>
        <BeeIcon name="arrowleft" :size="24" color="#fff"></BeeIcon>
      </BeeBack>
      <BeeShare>
        <view class="share-wrapper">
          <text>分享</text>
          <BeeIcon
            :src="require('../../../static/brand/detail/share.png')"
            :size="24"
          ></BeeIcon>
        </view>
      </BeeShare>
    </view>
    <view class="main-area">
      <BrandInfo :brandDetail="brandDetail"></BrandInfo>
    </view>

    <view class="main-area brand-pane">
      <view class="brand-detail-menus">
        <view
          class="item"
          :class="{ active: currentMenu === item.value }"
          v-for="item in menusData"
          :key="item.value"
          >{{ item.name }}</view
        >
      </view>

      <view class="goods-list">
        <BrandGoods
          v-for="goods in $data._list"
          :key="goods.id"
          :goodsData="goods"
        ></BrandGoods>
        <!-- <LoadMore :status="$data._status"></LoadMore> -->
      </view>

      <view class="order-in-store">
        <view class="title"> 到店点餐 </view>
        <view class="goods-list">
          <BrandGoods
            v-for="goods in $data._list.slice(0, 2)"
            :key="goods.id"
            :goodsData="goods"
          ></BrandGoods>
        </view>
      </view>
    </view>

    <AppraisePane></AppraisePane>
    <RecommendList></RecommendList>
  </view>
</template>

<script>
import BrandGoods from './cpns/BrandGoods.vue'
import BrandInfo from './cpns/BrandInfo'
import { menusData } from './data'
import { getStoreDetailApi } from '../../../api/store'
import { goodsListApi } from '../../../api/goods'
import loadData from '../../../mixin/loadData'
import AppraisePane from './cpns/AppraisePane.vue'
import RecommendList from './cpns/RecommendList.vue'

export default {
  components: {
    BrandInfo,
    BrandGoods,
    AppraisePane,
    RecommendList
  },

  mixins: [loadData({ api: goodsListApi })],

  data() {
    return {
      menusData: Object.freeze(menusData),
      currentMenu: 0,
      brandId: null,
      brandDetail: {},
    }
  },

  onLoad(options) {
    this.brandId = options.brandId
    this.getBrandDetail()
    this.$data._query.brandId = this.brandId
    this._loadData()
  },

  methods: {
    async getBrandDetail() {
      const { data } = await getStoreDetailApi(this.brandId)
      this.brandDetail = data.brand
      console.log(this.brandDetail)
    },
  },
}
</script>

<style lang="scss" scoped>
.brand-detail-container {
  width: 100vw;
  min-height: 100vh;
  background-color: #f6f6f6;
  .bg {
    width: 100%;
    height: 480upx;
    background-color: #fa5151;
    padding: 60upx 20upx 0 20upx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .share-wrapper {
      display: flex;
      align-items: center;
      color: #fff;
    }
  }

  .main-area {
    padding: 24upx;
    box-sizing: border-box;
    margin-top: -356upx;
  }

  .brand-pane {
    background-color: #fff;
    padding: 34upx 20upx 0 20upx;
    box-sizing: border-box;
    margin-top: 0;

    .brand-detail-menus {
      display: flex;
      align-items: center;
      justify-content: space-between;

      .item {
        color: #000;
        padding-bottom: 8upx;
        border-bottom: 4upx solid transparent;

        &.active {
          border-bottom-color: #fa5151;
        }
      }
    }

    .goods-list {
      margin-top: 20upx;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
    }
  }

  .order-in-store {
    .title {
      border-left: 6upx solid #000;
      line-height: 12px;
      padding-left: 10upx;
      color: #000;
      font-weight: 500;
    }
  }
}
</style>
