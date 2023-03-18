<template>
  <view class="index-container page">
    <view class="container">
      <view class="search-header">
        <BeeLocale></BeeLocale>
        <SearchBar></SearchBar>
        <PhotoSearch></PhotoSearch>
      </view>

      <Menus :data="menusData"></Menus>

      <view class="banner-wrapper">
        <image src="../../static/index/banner2.png" mode="" />
      </view>

      <view class="title">
        <text class="left-bar"></text>
        <text>附近商家</text>
        <text class="right-bar"></text>
      </view>
    </view>

    <view class="brand">
      <BeeStoreFilter></BeeStoreFilter>
      <view class="brand-list-wrapper">
        <BeeBrandHome
          v-for="item in $data._list"
          :key="item.id"
          :brand-info="item"
        ></BeeBrandHome>
        <LoadMore :status="$data._status"></LoadMore>
      </view>
    </view>

    <view
      @click="handleBackTop"
      :style="{ right: $data._scrollTop > 300 ? '20rpx' : '-200rpx' }"
      class="to-top"
    >
      <BeeIcon
        :size="80"
        :src="require('../../static/index/top-icon.png')"
      ></BeeIcon>
    </view>
  </view>
</template>

<script>
import { menusData } from './data'
import Menus from './cpns/Menus'
import Synthesize from './cpns/Synthesize.vue'
import { getSroreListApi } from '../../api/store'
import loadData from '../../mixin/loadData'

export default {
  components: { Menus, Synthesize },
  mixins: [
    loadData({
      api: getSroreListApi,
      mapKey: {
        list: 'brandList',
        totalPages: 'totalPages',
        size: 'size',
      },
      dataFn(data) {
        const ignoreBrandList = ['佛山市顺德区修江缘美食餐饮店', '测试门店呀']
        return data.filter(item => {
          return !ignoreBrandList.includes(item.name)
        })
      },
    }),
  ],
  data() {
    return {
      menusData: Object.freeze(menusData),
    }
  },
  onLoad() {
    this._loadData()
  },

  methods: {
    handleBackTop() {
      uni.pageScrollTo({
        scrollTop: 0,
        duration: 300,
      })
    },
  },
}
</script>

<style lang="less" scoped>
.index-container {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 3%, #f6f6f6 8%);

  .container {
    padding: 47.4upx 22.5upx 0 22.5upx;
    box-sizing: border-box;

    .search-header {
      display: flex;
      align-items: center;
      justify-content: space-between;

      /deep/ .search-bar-container {
        flex: 1;
        margin-right: 15upx;
      }
    }

    .banner-wrapper {
      margin-top: 20upx;
      image {
        width: 100%;
        height: 200upx;
        border-radius: 20upx;
      }
    }

    .title {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      font-weight: 500;
      margin-bottom: 20upx;
      margin-top: 20upx;

      .left-bar {
        margin-right: 10upx;
        display: block;
        width: 25upx;
        height: 6upx;
        background: linear-gradient(
          270deg,
          #07b9b9 0%,
          rgba(7, 185, 185, 0) 100%
        );
      }

      .right-bar {
        display: block;
        width: 25upx;
        height: 6upx;
        margin-left: 10upx;
        background: linear-gradient(
          to right,
          #07b9b9 0%,
          rgba(7, 185, 185, 0) 100%
        );
      }
    }
  }
  .brand-list-wrapper {
    padding: 0 20upx;
    box-sizing: border-box;
    padding-bottom: 140upx;
  }

  .to-top {
    position: fixed;
    top: 50%;
    right: 20upx;
    transition: right 350ms;
  }
}
</style>
