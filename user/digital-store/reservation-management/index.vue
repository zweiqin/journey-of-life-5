<template>
	<view class="reservation-management-container">
		<JHeader tabbar="/pages/user/user" width="50" height="50" title="预约项目列表"></JHeader>
		<view style="width: 70%;margin: 14rpx auto 14rpx;">
			<tui-button
				type="blue" bold shape="circle" width="100%"
				@click="go(`/user/digital-store/reservation-management/reservation-form`)"
			>
				新增预约项目
			</tui-button>
		</view>
		<view v-if="reservationList && reservationList.length">
			<view v-for="(item, index) in reservationList" :key="index" class="" style="padding-bottom: 35upx;">
				<tui-card
					:title="{ text: `${item.name}` }" :tag="{ text: `${new Date(item.addTime).toLocaleString() || '--'}` }"
					:image="{ url: common.seamingImgUrl(item.picUrl), width: 88 }" style="margin: 0;"
				>
					<template #body>
						<view style="padding: 10upx 32upx;">
							<view>描述：{{ item.desc }}</view>
							<view>排序：{{ item.sortOrder }}</view>
						</view>
					</template>
					<template #footer>
						<view style="padding: 0 20rpx 20rpx;text-align: right;">
							<tui-button
								type="warning" width="120rpx" height="50rpx" margin="0 20upx 0"
								style="border-radius: 50rpx;display: inline-block;"
								@click="go(`/user/digital-store/reservation-management/reservation-form?id=${item.id}`)"
							>
								编辑
							</tui-button>
							<tui-button
								type="danger" width="120rpx" height="50rpx" style="border-radius: 50rpx;display: inline-block;"
								@click="handleAppointmentDelete(item)"
							>
								删除
							</tui-button>
						</view>
					</template>
				</tui-card>
			</view>
		</view>
		<view v-else>
			<tui-no-data>暂无数据</tui-no-data>
		</view>
		<LoadMore v-show="reservationList.length" :status="status"></LoadMore>
	</view>
</template>

<script>
import { getBrandAppointmentCategoryApi, deleteBrandAppointmentCategoryApi } from '../../../api/user'
import { J_USER_INFO } from '../../../constant'
import { getUserId, getBrandId } from '../../../utils'

export default {
	name: 'ReservationManagement',
	data() {
		return {
			reservationList: [],
			status: 'none'
		}
	},
	onShow() {
		this.getBrandReservationList()
	},

	methods: {
		getBrandReservationList() {
			if (!getBrandId()) return
			uni.showLoading({
				title: '加载中'
			})
			this.status = 'loading'
			getBrandAppointmentCategoryApi({ brandId: getBrandId() })
				.then(({ data }) => {
					this.reservationList = data || []
					uni.hideLoading()
					this.status = 'none'
				})
				.catch(() => {
					uni.hideLoading()
					this.status = 'none'
				})
		},
		handleAppointmentDelete(item) {
			uni.showModal({
				title: '提示',
				content: '确定要删除当前预约项目？',
				success: (res) => {
					if (res.confirm) {
						deleteBrandAppointmentCategoryApi({
							userId: getUserId(),
							id: item.id
						}).then((res) => {
							this.$showToast('删除成功', 'success')
							this.getBrandReservationList()
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.reservation-management-container {
	min-height: 100vh;
	padding: 40upx 24upx 140upx 24upx;
	box-sizing: border-box;
	background-color: #eeeeee;
}
</style>
