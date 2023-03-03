<template>
  <view class="index-container page">
    <view class="container">
      <view class="search-header">
        <SearchBar></SearchBar>
        <PhotoSearch></PhotoSearch>
      </view>

      <Menus :data="menusData"></Menus>

      <view class="banner-wrapper">
        <image src="../../static/index/banner.png" mode="" />
      </view>

      <Synthesize></Synthesize>

      <view class="banner-wrapper">
        <image src="../../static/index/banner2.png" mode="" />
      </view>

      <view class="title">
        <text class="left-bar"></text>
        <text>好物推荐</text>
        <text class="right-bar"></text>
      </view>
    </view>
    <view class="goods-list">
      <view class="pane">
        <GoodsFilter :scrollTop="scrollTop"></GoodsFilter>

        <view class="goods-wrapper">
          <NewGoods
            v-for="item in goodsList"
            :key="item.id"
            :data="item"
          ></NewGoods>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { menusData } from './data'
import Menus from './cpns/Menus'
import Synthesize from './cpns/Synthesize.vue'
import { getGoodsById } from '../../api/home'

export default {
  components: { Menus, Synthesize },
  data() {
    return {
      menusData: Object.freeze(menusData),
      scrollTop: 0,
      query: {
        page: 1,
        size: 20,
        isNew: true,
        order: 'desc',
        sort: 'add_time',
      },
      goodsList: [],
      totalPages: 2,
    }
  },
  onLoad() {},
  mounted() {
    this.getGoodsList()
  },
  methods: {
    getGoodsList(isLoadMore) {
      uni.showLoading({
        title: '加载中',
      })
      getGoodsById(this.query).then(({ data }) => {
        console.log(data)
        this.totalPages = data.totalPages
        if (isLoadMore) {
          this.goodsList.push(...data.goodsList)
        } else {
          this.goodsList = data.goodsList
        }
      })
      uni.hideLoading()
    },
  },
  onPageScroll(e) {
    this.scrollTop = e.scrollTop
  },
  onReachBottom() {
    if (this.query.page >= this.totalPages) {
      uni.showToast({
        title: '没有更多了',
        duration: 2000,
      })
      return
    }

    if (this.query.size > this.goodsList) {
      return
    }

    this.query.page++
    this.getGoodsList(true)
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

  .goods-list {
    padding-bottom: 100upx;
    // margin: 20upx 0;
    padding: 20.4upx 22.5upx 0 22.5upx;
    box-sizing: border-box;
    background: linear-gradient(to bottom, #fff, #f6f6f6 8%);
    border-radius: 20upx 20upx 0 0;

    .pane {
      .goods-wrapper {
        margin-top: 32upx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;

        /deep/ .goods-container {
          margin-bottom: 14upx;
        }
      }
    }
  }
}
</style>
