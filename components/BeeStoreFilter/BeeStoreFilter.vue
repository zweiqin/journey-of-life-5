<template>
	<view class="bee-store-filter-container">
		<view>
			<tui-dropdown-list :show="dropdownShow" :top="55" background-color="#ffffff" @close="dropdownShow = false">
				<template #selectionbox>
					<view class="synthesize item" style="height: auto;color: #fa5151;" @click="dropdownShow = !dropdownShow">
						<view class="title">距离</view>
						<BeeIcon :src="require('../GoodsFilter/icons/red-arrow.png')" :size="14"></BeeIcon>
						<text style="font-size: 26upx;">{{ dropdownName || '' }}</text>
					</view>
				</template>
				<template #dropdownbox>
					<view style="width: fit-content;box-sizing: border-box;">
						<tui-list-view title="" color="#777" margin-top="2rpx" style="width: fit-content;min-width: 150upx;max-height: 28vh;overflow-y: auto;">
							<tui-list-cell
								padding="20rpx 0"
								style="width: fit-content;margin: 0 auto;border-bottom: 2upx solid #cccccc;"
								@click="handleClickDistance(0.5)"
							>
								500m内
							</tui-list-cell>
							<tui-list-cell
								padding="20rpx 0"
								style="width: fit-content;margin: 0 auto;border-bottom: 2upx solid #cccccc;"
								@click="handleClickDistance(1)"
							>
								1km内
							</tui-list-cell>
							<tui-list-cell
								padding="20rpx 0"
								style="width: fit-content;margin: 0 auto;border-bottom: 2upx solid #cccccc;"
								@click="handleClickDistance(2)"
							>
								2km内
							</tui-list-cell>
							<tui-list-cell
								padding="20rpx 0"
								style="width: fit-content;margin: 0 auto;border-bottom: 2upx solid #cccccc;"
								@click="handleClickDistance(3)"
							>
								3km内
							</tui-list-cell>
							<tui-list-cell
								padding="20rpx 0"
								style="width: fit-content;margin: 0 auto;border-bottom: 2upx solid #cccccc;"
								@click="handleClickDistance(5)"
							>
								5km内
							</tui-list-cell>
							<tui-list-cell
								padding="20rpx 0"
								style="width: fit-content;margin: 0 auto;border-bottom: 2upx solid #cccccc;"
								@click="handleClickDistance(10)"
							>
								10km内
							</tui-list-cell>
						</tui-list-view>
					</view>
				</template>
			</tui-dropdown-list>
		</view>

		<view class="right">
			<!-- <view class="menus item">
				<view class="title">品类</view>
				<BeeIcon :src="require('./image/code.png')" :size="14"></BeeIcon>
				</view> -->

			<view class="synthesize item" @click="handleClickFilter">
				<view class="title">筛选</view>
				<BeeIcon :src="require('./image/filter.png')" :size="14"></BeeIcon>
				<text style="margin-left: 10upx;font-size: 26upx;">{{ currentTypeName || '' }}</text>
			</view>
			<tui-drawer mode="right" :visible="drawerVisible" @close="closeDrawer">
				<view
					style="position: relative;width: 350upx;height: calc(100vh - 112upx);padding: 12upx;overflow-y: auto;box-sizing: border-box;"
				>
					<view style="margin: 20upx 0;color: #bbbec0;">请选择商家类型：</view>
					<view style="display: flex;justify-content: space-between;flex-wrap: wrap;">
						<view
							v-for="item in storeTypeList" :key="item.id"
							style="width: fit-content;margin: 10upx 0;padding: 11upx;color: #202124;"
							:style="{ 'border': currentTypeId === item.id ? '1upx solid #4285f4' : '1upx solid #f8eddf', 'backgroundColor': currentTypeId === item.id ? '#97e0fd' : '#f8eddf' }"
							@click="handleClickType(item)"
						>
							{{ item.storeName }}
						</view>
					</view>
					<view
						style="position: sticky;bottom: -12upx;display: flex;justify-content: space-between;background-color: #ffffff;"
					>
						<tui-button margin="10upx 8upx" height="60rpx" type="warning" shape="circle" @click="closeDrawer">
							取消
						</tui-button>
						<tui-button margin="10upx 8upx" height="60rpx" type="warning" shape="circle" @click="handleClickComfirm">
							确定
						</tui-button>
					</view>
				</view>
			</tui-drawer>
		</view>
	</view>
</template>

<script>
import { getStoreTypeAllListApi } from '../../api/user'
export default {
	name: 'BeeStoreFilter',
	data() {
		return {
			dropdownShow: false,
			dropdownName: false,
			drawerVisible: false,
			storeTypeList: [],
			currentTypeId: '',
			currentTypeName: ''
		}
	},
	methods: {
		handleClickFilter() {
			getStoreTypeAllListApi({})
				.then((res) => {
					this.storeTypeList = res.data || []
				})
			this.drawerVisible = true
			this.$emit('click-filter')
		},
		closeDrawer() {
			this.drawerVisible = false
		},
		handleClickType(item) {
			this.currentTypeId = item.id
			this.currentTypeName = item.storeName
		},
		handleClickComfirm() {
			this.$emit('confirm', { id: this.currentTypeId, storeName: this.currentTypeName })
			this.drawerVisible = false
		},
		handleClickDistance(distance) {
			this.$emit('select-distance', distance)
			this.dropdownName = distance + 'km'
			this.dropdownShow = false
		}
	}
}
</script>

<style lang="less" scoped>
.bee-store-filter-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	padding: 14upx 28upx 10upx;
	margin: 0 28upx;
	background-color: #fff;
	border-radius: 20upx 20upx 0 0;
	box-sizing: border-box;

	/deep/ .tui-dropdown-view {
		height: auto !important;
		width: fit-content;
		margin-left: -28upx;
	}

	.right {
		display: flex;
		align-items: center;
	}

	.menus {
		margin-right: 100upx;
	}

	.item {
		display: flex;
		align-items: center;
	}
}
</style>
