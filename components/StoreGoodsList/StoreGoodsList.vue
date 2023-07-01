<template>
	<view class="store-goods-list-container">
		<view
			v-if="brandDetail.categoryList && brandDetail.categoryList.length"
			style="display: flex;box-sizing: border-box;"
		>
			<view style="background-color: #f3f3f3;">
				<view
					v-for="item in brandDetail.categoryList" :key="item.serverNameOne"
					style="max-width: 140upx;padding: 20upx 36upx;word-break: break-all;box-sizing: border-box;"
					:style="{ backgroundColor: item.id === currentTab ? '#ffffff' : 'transparent' }"
					@click="(currentTab = item.id) && (currentGoods = brandDetail.categoryList.find(part => part.id === item.id).goodsList || [])"
				>
					{{ item.name }}
				</view>
			</view>
			<view style="flex: 1;padding: 20upx;">
				<view v-if="currentGoods && currentGoods.length">
					<view v-for="item in currentGoods" :key="item.id">
						<StoreGoods
							:goods-data="item" @click-content="(e) => $emit('click-content', e)"
							@add-car="(e) => $emit('add-car', e)"
						></StoreGoods>
					</view>
				</view>
				<view v-else style="margin: 40upx 0;text-align: center;">
					暂无商品~
				</view>
			</view>
		</view>
		<view v-else class="no-data">
			暂无数据
		</view>
	</view>
</template>

<script>
export default {
	props: {
		brandDetail: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
			currentTab: '',
			currentGoods: []
		}
	},

	watch: {
		brandDetail: {
			handler(newVal) {
				if (newVal) {
					if (this.brandDetail.categoryList && this.brandDetail.categoryList.length) {
						(this.currentTab = this.brandDetail.categoryList[0].id) && (this.currentGoods = this.brandDetail.categoryList[0].goodsList || [])
					}
				}
			},
			immediate: true,
			deep: true
		}
	},

	methods: {
	}
}
</script>

<style lang="less" scoped>
.store-goods-list-container {
	width: 100%;

	.no-data {
		display: flex;
		align-items: center;
		justify-content: center;
		min-height: 200upx;
		color: #ccc;
		padding: 20upx 0;
		flex-direction: column;
	}
}
</style>
