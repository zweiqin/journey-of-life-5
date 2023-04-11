<template>
  <view class="brand-detail-container" v-if="brandDetail">
    <view class="bg">
      <BeeBack>
        <BeeIcon name="arrowleft" :size="24" color="#fff"></BeeIcon>
      </BeeBack>
      <BeeShare>
        <view class="share-wrapper">
          <text>分享</text>
          <BeeIcon :src="require('../../../static/brand/detail/share.png')" :size="24"></BeeIcon>
        </view>
      </BeeShare>
    </view>
    <view class="main-area">
      <BrandInfo :brandDetail="brandDetail"></BrandInfo>
    </view>

    <view class="main-area brand-pane">
      <view class="brand-detail-menus">
        <view class="item" @click="handleChangeNavs(item.value)" :class="{ active: currentMenu === item.value }"
          v-for="item in menusData" :key="item.value">{{
            item.name }}</view>
      </view>

      <view class="goods-list" style="width: 100%">
        <view class="goods" style="width: 100%" v-show="currentMenu === 0">
          <view v-if="brandDetail.goodsVoList && brandDetail.goodsVoList.length" class="f-s-b" style="flex-wrap: wrap;">
            <BrandGoods v-for="goods in brandDetail.goodsVoList" :key="goods.id" :goodsData="goods"></BrandGoods>
          </view>

          <view v-else class="no-data f-center">
            暂无数据
          </view>
        </view>
        <!-- <LoadMore :status="$data._status"></LoadMore> -->


      </view>

      <view v-show="currentMenu === 1" class="no-data f-center">
        暂无团购
      </view>

      <!-- <view class="no-data f-center">
        暂无优惠劵
      </view> -->

      <CouponList :couponData="couponList" v-show="currentMenu === 2"></CouponList>

      <view v-show="currentMenu === 3" class="no-data f-center">
        <view>
          暂无预约<text class="p-color" style="font-size: 36upx;">去预约</text>

        </view>
        <BeeAvatar radius="0upx" :width="179" :height="156" :src="require('../../../static/brand/detail/apponit.png')">
        </BeeAvatar>
      </view>

      <view v-show="currentMenu === 4" class="no-data f-center">
        暂无优会员
      </view>

      <view v-show="currentMenu === 5" class="no-data f-center">
        暂无抽奖
      </view>

      <!-- <view class="order-in-store">
        <view class="title"> 到店点餐 </view>
        <view class="goods-list">
          <BrandGoods v-for="goods in brandDetail.goodsVoList" :key="goods.id" :goodsData="goods"></BrandGoods>
        </view>
      </view> -->
    </view>

    <AppraisePane></AppraisePane>
    <RecommendList></RecommendList>

    <view class="shop-car-fixed">
      <BeeIcon :src="require('../../../static/brand/detail/shop-car.png')" :size="40"></BeeIcon>
    </view>
  </view>
</template>

<script>
import BrandGoods from './cpns/BrandGoods.vue'
import BrandInfo from './cpns/BrandInfo'
import { menusData } from './data'
import { getBrandDetailApi, getBrandCouponApi } from '../../../api/brand'
import { goodsListApi } from '../../../api/goods'
import loadData from '../../../mixin/loadData'
import AppraisePane from './cpns/AppraisePane.vue'
import RecommendList from './cpns/RecommendList.vue'
import CouponList from './cpns/CouponList.vue'

export default {
  components: {
    BrandInfo,
    BrandGoods,
    AppraisePane,
    RecommendList,
    CouponList
  },

  mixins: [loadData({ api: goodsListApi })],

  data() {
    return {
      menusData: Object.freeze(menusData),
      currentMenu: 0,
      brandId: null,
      brandDetail: {},
      couponList: []
    }
  },

  onLoad(options) {
    this.brandId = options.brandId
    this.getBrandDetail()
    this.$data._query.brandId = this.brandId
    // this._loadData()
  },

  methods: {
    async getBrandDetail() {
      const { data } = await getBrandDetailApi({ id: this.brandId, ...this.$store.getters.lonAndLat })
      this.brandDetail = data
      console.log(this.brandDetail)
    },

    // 切换 nav
    handleChangeNavs(value) {
      this.currentMenu = value
      switch (value) {
        case 2:
          if (!this.couponList.length) {
            this.getBrandCoupon()
          }
          break
      }
    },

    // 获取优惠劵
    async getBrandCoupon() {
      const { data } = await getBrandCouponApi({ brandId: this.brandId })
      this.couponList = data
      console.log(data);
    }
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

  .shop-car-fixed {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    right: 40upx;
    box-shadow: 0px 4px 10px 0px #D8D8D8;
    border-radius: 50%;
  }
}

.no-data, /deep/ .c-no-data {
  min-height: 200upx;
  color: #ccc;
  padding: 20upx 0;
  flex-direction: column;
}
</style>
