<template>
	<view class="brand-page-container">
		<view class="top-container">
			<view class="search-header">
				<BeeBack>
					<view class="header-title">
						<BeeIcon :size="24" color="#fff" name="arrowleft"></BeeIcon>
						<h1>美食</h1>
					</view>
				</BeeBack>
				<SearchBar background="#fff"></SearchBar>
				<view class="control">
					<view class="item">
						<BeeIcon :size="24" :src="require('../../../static/brand/find-food/location.png')"></BeeIcon>
						<text>位置</text>
					</view>

					<view class="item">
						<BeeIcon :size="24" :src="require('../../../static/brand/find-food/dingdan.png')"></BeeIcon>
						<text>订单</text>
					</view>
				</view>
			</view>
			<view class="hot-search">
				热搜：<text>汉堡</text> <text>薯条</text> <text>奶茶</text>
				<text>鸡翅</text> <text>鸡腿</text>
			</view>
			<!-- <image
				class="banner-img"
				src="../../../static/brand/banner.png"
				mode=""
				/> -->
			<view class="menus-wrapper">
				<BeeMenus :data="menusData" @click="handleTo"></BeeMenus>
			</view>

			<view class="menus-wrapper">
				<TimeLimitedSeckill></TimeLimitedSeckill>
			</view>

			<view class="menus-wrapper">
				<view class="navs">
					<view class="nav-item active">餐厅</view>
					<view class="nav-item">优惠套餐</view>
					<view class="nav-item">单人餐</view>
				</view>
			</view>
		</view>

		<view class="brand">
			<FilterPane></FilterPane>
			<view class="brand-list-wrapper">
				<BigNameSpecials></BigNameSpecials>

				<BeeBrandPane v-for="item in $data._list" :key="item.id" :brand-info="item"></BeeBrandPane>
				<LoadMore :status="$data._status"></LoadMore>
			</view>
		</view>
	</view>
</template>

<script>
import loadData from '../../../mixin/loadData'
import { menusData } from './data'
import { getSroreListApi } from '../../../api/store'
import { filterBrandByMenuIdApi } from '../../../api/brand'
import TimeLimitedSeckill from './cpns/TimeLimitedSeckill.vue'
import BigNameSpecials from './cpns/BigNameSpecials.vue'
import FilterPane from './cpns/FilterPane.vue'
import { getNearbyFonndMenuApi } from '../../../api/brand'

export default {
	components: {
		TimeLimitedSeckill,
		BigNameSpecials,
		FilterPane
	},
	mixins: [
		loadData({
			api: filterBrandByMenuIdApi,
			mapKey: {
				list: 'tfBrandList',
				totalPages: 'total',
				size: 'size'
			},
			dataFn(data) {
				const ignoreBrandList = ['佛山市顺德区修江缘美食餐饮店', '测试门店呀']
				return data.filter((item) => !ignoreBrandList.includes(item.name))
			}
		})
	],
	data() {
		return {
			menusData: Object.freeze(menusData),
			currentNavs: 0,
			id: ''
		}
	},
	onLoad(options) {
		this.id = options.id
		this.$data._query.dressing = this.id
		this.$data._query = {
			...this.$data._query,
			longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
			latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
		}
		this._loadData()
		this.getMenus(options.id)
	},
	onPullDownRefresh() {
		this.$data.page = 1
		this._loadData()
		uni.stopPullDownRefresh()
	},
	methods: {
		// 获取menus
		async getMenus(id) {
			const { data } = await getNearbyFonndMenuApi({
				typeId: id
			})

			this.menusData = data
		},

		handleTo(item) {
			this.go(`/pages/store/fine-food/food-nearby/food-nearby?name=${item.storeName}&id=${item.id}`)
		}

	}
}
</script>

<style lang="less" scoped>
.brand-page-container {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 3%, #f6f6f6 8%);

  .top-container {
    width: 100%;
    min-height: 826upx;
    background: linear-gradient(0deg,
        rgba(246, 246, 246, 0.87) -3%,
        rgba(246, 246, 246, 0.87) 8%,
        rgba(246, 246, 246, 0.87) 14%,
        rgba(253, 164, 164, 0.87) 59%);

    .search-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 44upx 22upx 0;
      box-sizing: border-box;

      .header-title {
        display: flex;
        align-items: center;
      }

      h1 {
        font-size: 28upx;
        color: #fff;
        font-weight: normal;
        margin-right: 10upx;
      }

      /deep/ .search-bar-container {
        flex: 1;
        margin-right: 15upx;
      }

      .control {
        display: flex;
        align-items: center;

        .item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          color: #fff;
          font-size: 24upx;
          margin-left: 8upx;

          &:nth-child(1) {
            margin-left: 0;
          }
        }
      }
    }

    .hot-search {
      padding: 0 22upx;
      box-sizing: border-box;
      padding-left: 32upx;
      color: #fff;
      margin: 20upx 0 16upx 0;

      text {
        margin-right: 40upx;
        color: #fff;
      }
    }

    .banner-img {
      width: 100%;
      height: 244upx;
    }

    .menus-wrapper {
      padding: 0 20upx 22upx;
      box-sizing: border-box;

      /deep/ .menus-container {
        margin-top: 0;
      }
    }

    .navs {
      display: flex;
      align-items: center;

      .nav-item {
        margin-right: 56upx;
        color: #3d3d3d;

        &.active {
          color: #fa5151;
          font-weight: 500;
        }
      }
    }
  }

  .brand-list-wrapper {
    padding: 0 20upx;
    box-sizing: border-box;
  }
}
</style>
