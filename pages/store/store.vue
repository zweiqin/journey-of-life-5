<template>
  <view class="brand-page-container">
    <view class="top-container">
      <view class="search-header">
        <BeeLocale></BeeLocale>
        <SearchBar background="#fff"></SearchBar>
        <PhotoSearch></PhotoSearch>
      </view>
      <!-- <image class="banner-img" src="../../static/brand/banner.png" mode="" /> -->
      <view class="menus-wrapper">
        <BeeMenus :data="menusData"></BeeMenus>
      </view>
      <view class="banner-wrapper" @click="go('/user/sever/userUp')">
        <image src="../../static/index/banner2.png" mode="" />
      </view>
    </view>

    <view class="brand">
      <BeeStoreFilter></BeeStoreFilter>
      <view class="brand-list-wrapper">
        <BeeBrandPane v-for="item in $data._list" :key="item.id" :brand-info="item"></BeeBrandPane>
        <LoadMore :status="$data._status"></LoadMore>
      </view>
    </view>
  </view>
</template>

<script>
import loadData from '../../mixin/loadData'
import { menusData } from './data'
import { getSroreListApi } from '../../api/store'
export default {
  data() {
    return {
      menusData: Object.freeze(menusData),
    }
  },
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
  onLoad() {
    this._loadData()
  },
  onPullDownRefresh() {
    this.$data.page = 1
    this._loadData()
    uni.stopPullDownRefresh()
  },
}
</script>

<style lang="less" scoped>
.brand-page-container {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 3%, #f6f6f6 8%);

  .top-container {
    width: 100%;
    background: #f6f6f6;
    // min-height: 826upx;

    // background: linear-gradient(
    //   0deg,
    //   rgba(246, 246, 246, 0.87) -3%,
    //   rgba(246, 246, 246, 0.87) 8%,
    //   rgba(246, 246, 246, 0.87) 14%,
    //   rgba(253, 164, 164, 0.87) 59%
    // );

    .search-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 44upx 22upx 10upx;
      box-sizing: border-box;

      /deep/ .search-bar-container {
        flex: 1;
        margin-right: 15upx;
      }
    }

    .banner-img {
      width: 100%;
      height: 244upx;
    }

    .menus-wrapper {
      padding: 0 22upx 20upx;
      box-sizing: border-box;

      /deep/ .menus-container {
        margin-top: 0;
      }
    }

    .banner-wrapper {
      margin-top: 20upx;
      padding: 0 20upx;
      box-sizing: border-box;

      image {
        width: 100%;
        height: 200upx;
        border-radius: 20upx;
      }
    }
  }

  .brand {
    margin-top: 20upx;

    .brand-list-wrapper {
      padding: 0 20upx;
      box-sizing: border-box;
      padding-bottom: 140upx;
    }
  }
}
</style>
