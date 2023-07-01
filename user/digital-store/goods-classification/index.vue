<template>
	<view class="goods-classification-container">
		<JHeader tabbar="/pages/user/user" width="50" height="50" title="商品分类"></JHeader>
		<view v-if="xxxList && xxxList.length">
			<view v-for="(item, index) in xxxList" :key="index" class="" style="padding-bottom: 35upx;">

			</view>
		</view>
		<LoadMore v-show="xxxList.length" :status="status"></LoadMore>
		<view v-if="xxxList && !xxxList.length && loadingStatus !== 'loading'" class="no-data">
			暂无xxx~
		</view>
	</view>
</template>

<script>
import { getSelectCategoryApi, addCategoryApi, updateCategoryNameApi } from '../../../api/user'
import { J_USER_INFO } from '../../../constant'
import { getUserId, getBrandId } from '../../../utils'

export default {
	name: 'GoodsClassification',
	components: { },
	onLoad(options) { },
	data() {
		return {
		}
	},
	onShow() {
		this.getxxxList()
	},

	methods: {
		getxxxList(isLoadmore) {
			if (!getUserId()) return
			this.status = 'loading'
			this.loadingStatus = 'loading'
			getSelectCategoryApi(this.grouponRecordQuery)
				.then(({ data }) => {
					console.log(data)
					this.totalPages = data.totalPages
					if (isLoadmore) {
						this.grouponRecordList.push(...data.items)
					} else {
						this.grouponRecordList = data.items
					}
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
				.catch(() => {
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
		}
	},
	onReachBottom() { }
}
</script>

<style lang="less" scoped>
.goods-classification-container {
	min-height: 100vh;
	padding: 40upx 24upx 140upx 24upx;
	box-sizing: border-box;
	background-color: #eeeeee;

	.no-data {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 180upx;
		color: #999999;
		font-size: 36upx;
		letter-spacing: 2px;
	}
}
</style>
