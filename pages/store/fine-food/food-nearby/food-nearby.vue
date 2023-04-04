<template>
  <view class="food-nearby-page-container">
    <view class="fixed-container">
      <view class="search-container">
        <view class="search-header">
          <BeeBack>
            <view class="header-title">
              <BeeIcon :size="24" color="#000" name="arrowleft"></BeeIcon>
              <h1>附近美食</h1>
            </view>
          </BeeBack>
          <SearchBar background="#fff"></SearchBar>
          <view class="control">
            <view class="item">
              <BeeIcon
                :size="24"
                :src="
                  require('../../../../static/brand/find-food/food-nearby/location.png')
                "
              ></BeeIcon>
              <text>位置</text>
            </view>
          </view>
        </view>
      </view>

      <view class="menus-wrapper">
        <view
          @click="handleChooseMenu(item)"
          class="item"
          :class="{ active: currentMenu === item.id }"
          v-for="item in menus"
          :key="item.id"
        >
          <!-- <BeeIcon :size="40" :src="item.icon"></BeeIcon> -->
          <text>{{ item.name }}</text>
        </view>
      </view>

      <FilterPane></FilterPane>
    </view>

    <view class="brand-list">
      <BeeBrandPane
        v-for="item in $data._list"
        :key="item.id"
        :brand-info="item"
      ></BeeBrandPane>
      <LoadMore :status="$data._status"></LoadMore>
    </view>
  </view>
</template>

<script>
import loadData from '../../../../mixin/loadData'
import { getSroreListApi } from '../../../../api/store'
import FilterPane from './cpns/FilterPane.vue'
import { menus } from './data'
export default {
  components: {
    FilterPane,
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
  data() {
    return {
      currentMenu: 1001002,
      menus: Object.freeze(menus),
    }
  },

  onLoad() {
    this._loadData()
  },

  methods: {
    handleChooseMenu(item) {
      this.currentMenu = item.id
    },
  },
}
</script>

<style lang="scss" scoped>
.food-nearby-page-container {
  width: 100vw;
  min-height: 100vh;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, #f6f6f6 0%);

  .fixed-container {
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
        color: #000;
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
          color: #000;
          font-size: 24upx;
          margin-left: 8upx;

          &:nth-child(1) {
            margin-left: 0;
          }
        }
      }
    }

    .menus-wrapper {
      white-space: nowrap;
      display: flex;
      align-items: center;
      overflow: scroll;
      padding: 20upx 20upx 0 20upx;

      .item {
				height: 48upx;
        position: relative;
        // width: 120upx;
        // height: 160upx;
        // display: flex;
        // align-items: center;
        // justify-content: center;
        // flex-direction: column;
        font-size: 24upx;
        // padding: 16upx 12upx;
        box-sizing: border-box;
        margin-right: 48upx;
        border-radius: 10upx;
        flex-shrink: 0;
        // background-color: #fff;

        // &.active {
        //   border: 1upx solid #fa5151;

        //   &::after {
        //     content: '';
        //     bottom: 0;
        //     right: 0;
        //     width: 28upx;
        //     height: 22upx;
        //     position: absolute;
        //     display: block;
        //     background: url('../../../../static/brand/find-food/food-nearby/menus/active.png')
        //       no-repeat;
        //     background-size: cover;
        //   }
        // }

				&::after {
					content: '';
					position: absolute;
					left: 50%;
					transform: translateX(-50%);
					bottom: 0;
					width: 0;
					height: 4upx;
					border-radius: 10upx;
					background-color: #FB5D5D;
					transition: all 350ms ease-in;
				}

				&.active {
					font-size: 28upx;
					font-weight: 500;

					&::after {
						width: 48upx;
					}
				}


      }
    }
  }

  .brand-list{
    padding: 0 20upx;
    box-sizing: border-box;
    
  }
}
</style>
