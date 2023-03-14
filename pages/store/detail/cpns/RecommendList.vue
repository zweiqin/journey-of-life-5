<template>
  <view class="recommend-list-container">
    <view class="recommend-title">
      <BeeIcon
        :src="require('../../../../static/brand/detail/recoo.png')"
      ></BeeIcon>
      <text>你可能推荐兴趣的地点</text>
      <BeeIcon
        :src="require('../../../../static/brand/detail/recoo.png')"
      ></BeeIcon>
    </view>

    <BeeBrandPane
      v-for="item in $data._list"
      :key="item.id"
      :brand-info="item"
    ></BeeBrandPane>
    <LoadMore :status="$data._status"></LoadMore>
  </view>
</template>

<script>
import loadData from '../../../../mixin/loadData'
import { getSroreListApi } from '../../../../api/store'

export default {
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
  mounted() {
    this._loadData()
  },
}
</script>

<style lang="less" scoped>
.recommend-list-container {
  width: 100%;
  background-color: #fff;
  margin-top: 20upx;
  padding: 20upx 0;
  box-sizing: border-box;

  .recommend-title {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
