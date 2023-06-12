<template>
	<view class="certificate-management-container">
		<JHeader tabbar="/pages/user/user" width="50" height="50" title="商家券包管理"></JHeader>
		<view style="width: 70%;margin: 14rpx auto 14rpx;">
			<tui-button type="blue" bold shape="circle" width="100%" @click="go(`/user/sever/merchant-certificate/coupon-form`)">
				发布优惠券
			</tui-button>
		</view>
		<view class="main">
			<view v-if="couponList && couponList.length">
				<view v-for="item in couponList" :key="item.id" class="item">
					<view class="left" :style="{ background: '#FFA74D' }">
						<view class="money">￥<text>{{ item.discount }}</text></view>
						<view class="full">满{{ item.min }}可用</view>
					</view>
					<view class="right">
						<view class="type" :style="{ background: '#FFA74D' }">{{ item.name }}</view>
						<view class="rule">{{ item.desc }}</view>
						<view v-if="item.days" class="rule">有效天数：{{ item.days }}</view>
						<view class="list">
							<view class="time" style="flex: 1;width: 0;">
								<view v-if="item.startTime && item.endTime">
									<view style="width: fit-content;">可使用时间范围：</view>
									<view style="display: flex;flex-wrap: wrap;">
										<view>{{ new Date(item.startTime).toLocaleString() || '--' }}至</view>
										<view>{{ new Date(item.endTime).toLocaleString() || '--' }}</view>
									</view>
								</view>
							</view>
							<view class="order" @click="handleCouponRevoke(item)">撤销发布</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<tui-no-data>暂无优惠券</tui-no-data>
			</view>
		</view>
		<LoadMore v-show="couponList.length" :status="status"></LoadMore>
	</view>
</template>

<script>
import { getBrandCouponListApi, addCouponReleaseApi, updateCouponRevokeApi } from '../../../api/user'
import { J_USER_INFO } from '../../../constant'
import { getUserId, getBrandId } from '../../../utils'

export default {
	name: 'MerchantCertificate',
	components: {},
	onLoad(options) { },
	data() {
		return {
			couponList: [],
			status: 'none'
		}
	},
	onShow() {
		this.getBrandCouponList()
	},

	methods: {
		getBrandCouponList() {
			if (!getBrandId()) return
			uni.showLoading({
				title: '加载中'
			})
			this.status = 'loading'
			getBrandCouponListApi({ brandId: getBrandId() })
				.then(({ data }) => {
					this.couponList = data
					uni.hideLoading()
					this.status = 'none'
				})
				.catch(() => {
					uni.hideLoading()
					this.status = 'none'
				})
		},
		handleCouponRevoke(item) {
			uni.showModal({
				title: '提示',
				content: '确认撤销该优惠券？',
				success: (res) => {
					if (res.confirm) {
						updateCouponRevokeApi({ id: item.id }).then((res) => {
							this.$showToast('操作成功')
							this.getBrandCouponList()
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.certificate-management-container {
	min-height: 100vh;
	padding: 40upx 24upx 140upx 24upx;
	box-sizing: border-box;
	background-color: #eeeeee;
	.main {
		padding: 0upx 4upx 40upx 4upx;

		.item {
			margin-bottom: 22upx;
			box-sizing: border-box;
			width: 100%;
			// height: 226upx;
			border-radius: 10upx;
			box-shadow: 0upx 4upx 10upx 0upx rgba(0, 0, 0, 0.1);
			background: #FFFFFF;
			display: flex;

			.left {
				width: 29%;
				// padding: 28upx 18upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-radius: 10upx 0upx 0upx 10upx;
				color: #FFFFFF;

				.money {
					font-size: 36upx;
					font-weight: 500;

					text {
						font-size: 56upx;
						font-weight: 500;
					}
				}

				.full {
					font-size: 28upx;
				}
			}

			.right {
				width: 71%;
				padding: 24upx 20upx 26upx 18upx;
				box-sizing: border-box;

				.type {

					// width: 110upx;
					width: fit-content;
					height: 40upx;
					padding: 0 20upx;
					border-radius: 100upx;
					background: #89AEFC;
					color: #FFFFFF;
					font-size: 24upx;
					font-weight: 500;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.rule {
					padding-top: 4upx;
					padding-bottom: 2upx;
					font-size: 28upx;
					color: #3D3D3D;
				}

				.list {
					padding-top: 20upx;
					display: flex;
					justify-content: space-between;
					align-items: center;

					.time {
						font-size: 20upx;
						color: #777777;
					}

					.order {
						width: 148upx;
						height: 40upx;
						border-radius: 100upx;
						background: #FF4654;
						font-size: 24upx;
						font-weight: 500;
						color: #FFFFFF;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
		}
	}
}
</style>
