<template>
	<view class="coupons">
		<view class="title-container">
			<image src="../../../static/index/coupons/return.png" mode="" @click="handleBack" />
			<text>领券中心</text>
		</view>
		<view v-show="currentTab === 1">
			<view class="main">
				<view style="margin-bottom: 20rpx;">
					<tui-button type="danger" style="margin: 0 auto;" bold shape="circle" width="60%" height="64rpx" @click="handleReceiveAll">
						一键领取
					</tui-button>
				</view>
				<view v-if="receiveCouponList && receiveCouponList.length">
					<view v-for="item in receiveCouponList" :key="item.id" class="item">
						<view class="left" :style="{ background: '#FFA74D' }">
							<view class="money">￥<text>{{ item.discount }}</text></view>
							<view class="full">满{{ item.min }}可用</view>
						</view>
						<view class="right">
							<view class="type" :style="{ background: '#FFA74D' }">{{ item.name }}</view>
							<view class="rule">{{ item.desc }}</view>
							<view v-if="item.days" class="rule">有效天数：{{ item.days }}</view>
							<view class="list">
								<view class="time"><text v-if="item.startTime && item.endTime">{{ item.startTime }}-{{ item.endTime }}</text></view>
								<view class="order" @click="handleReceive(item)">立即领取</view>
							</view>
						</view>
					</view>
				</view>
				<view v-else>
					<tui-no-data>暂无可领取优惠券</tui-no-data>
				</view>
			</view>
		</view>
		<view v-show="currentTab === 2">
			<!-- <view class="nav-list">
				<view
				v-for="nav in navs" :key="nav.id" class="nav" :class="{ active: currentnav === nav.id }"
				@click="handlePick(nav)"
				>
				{{ nav.text }}
				</view>
				</view>
				<view class="select-list">
				<view v-for="select in selects" :key="select.id" class="select">
				<view class="text">{{ select.name }}</view>
				<image :src="select.icon" mode="" />
				</view>
				<text>管理</text>
				</view> -->
			<view class="main">
				<view v-for="item in myCouponList" :key="item.id" class="item">
					<view class="left" :style="{ background: '#FFA74D' }">
						<view class="money">￥<text>{{ item.discount }}</text></view>
						<view class="full">满{{ item.min }}可用</view>
					</view>
					<view class="right">
						<view class="type" :style="{ background: '#FFA74D' }">{{ item.name }}</view>
						<view class="rule">{{ item.desc }}</view>
						<view class="list">
							<view class="time"><text v-if="item.startTime && item.endTime">{{ item.startTime }}-{{ item.endTime }}</text></view>
							<!-- <view class="order">立即使用</view> -->
						</view>
					</view>
				</view>
			</view>
			<LoadMore v-show="myCouponList.length" :status="status"></LoadMore>
			<view v-if="myCouponList && !myCouponList.length && loadingStatus !== 'loading'" class="no-data">
				暂无优惠券，快去领取吧~
			</view>
		</view>
		<view class="foot">
			<view
				v-for="sub in subs" :key="sub.id" class="sub" :class="{ active: currentTab === sub.id }"
				@click="handleChoice(sub)"
			>
				<tui-icon
					:name="sub.icon" :size="48" unit="upx"
					:style="{ color: currentTab === sub.id ? '#FA5151' : '' }"
				></tui-icon>
				<text>{{ sub.name }}</text>
			</view>
		</view>
	</view>
</template>

<script>
import { getUserCouponReceiveApi, getUserCouponListApi, updateCollectReceiveApi, updateCollectReceiveAllApi } from '../../../api/user'
import { getUserId } from '../../../utils'
export default {
	name: 'Coupons',
	props: {},
	data() {
		return {
			// navs: [
			// 	{ id: 1, text: '未使用' },
			// 	{ id: 2, text: '已使用' },
			// 	{ id: 3, text: '已过期' },
			// 	{ id: 4, text: '分享' }
			// ],
			// selects: [
			// 	{ id: 1, name: '类型', icon: require('../../../static/index/coupons/eject-fill.png') },
			// 	{ id: 2, name: '状态', icon: require('../../../static/index/coupons/eject-fill.png') },
			// 	{ id: 3, name: '优惠', icon: require('../../../static/index/coupons/eject-fill.png') }
			// ],
			// items: [
			// 	{
			// 		id: 1,
			// 		unit: '￥',
			// 		number: 500,
			// 		full: '满1500可用',
			// 		type: '全场券',
			// 		rule: '单品可用',
			// 		remain: '剩余时间：00:25:00',
			// 		background: '#8AADFE'
			// 	},
			// 	{
			// 		id: 2,
			// 		unit: '￥',
			// 		number: 500,
			// 		full: '满1500可用',
			// 		type: '品牌券',
			// 		rule: '耐克、李宁、阿迪、官方旗舰店都可用...',
			// 		time: '2022.03.16-2022.04.05',
			// 		background: '#FFA74D'
			// 	},
			// 	{
			// 		id: 3,
			// 		unit: '￥',
			// 		number: 500,
			// 		full: '满1500可用',
			// 		type: '全场券',
			// 		rule: '适用本平台自营商品可用',
			// 		time: '2022.03.16-2022.04.05',
			// 		background: '#FE4652'
			// 	}
			// ],
			subs: [
				{ id: 1, name: '领取优惠券', icon: 'coupon' },
				{ id: 2, name: '我的券包', icon: 'people-fill' }
			],
			// currentnav: 1,
			currentTab: 1,
			myCouponQuery: {
				page: 1,
				size: 10,
				userId: getUserId(),
				brandId: ''
			},
			totalPages: 0,
			status: 'none',
			loadingStatus: 'noMore',
			myCouponList: [],
			receiveCouponList: []
		}
	},
	onLoad(options) {
		this.currentTab = options.currentTab * 1 || 1
		if (this.currentTab === 1) {
			this.getUserCouponReceive()
		} else if (this.currentTab === 2) {
			this.getUserCouponList()
		}
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		// handlePick(item) {
		// 	this.currentnav = item.id
		// },
		getUserCouponReceive() {
			if (!getUserId()) return
			uni.showLoading()
			getUserCouponReceiveApi({
				userId: getUserId(),
				brandId: 1001079
			})
				.then(({ data }) => {
					console.log(data)
					this.receiveCouponList = data.couponList
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		getUserCouponList(isLoadmore) {
			if (!getUserId()) return
			this.status = 'loading'
			this.loadingStatus = 'loading'
			getUserCouponListApi(this.myCouponQuery)
				.then(({ data }) => {
					console.log(data)
					this.totalPages = data.totalPages
					if (isLoadmore) {
						this.myCouponList.push(...data.data)
					} else {
						this.myCouponList = data.data
					}
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
				.catch(() => {
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
		},
		handleChoice(item) {
			this.currentTab = item.id
			if (item.id === 1) {
				this.receiveCouponList = []
				this.getUserCouponReceive()
			} else if (item.id === 2) {
				this.myCouponList = []
				this.totalPages = 0
				this.myCouponQuery.page = 1
				this.myCouponQuery.size = 10
				this.getUserCouponList()
			}
		},
		handleReceive(item) {
			updateCollectReceiveApi({
				userId: getUserId(),
				couponId: item.id
			})
				.then(({ data }) => {
					this.$showToast('领取成功', 'success')
					this.getUserCouponReceive()
				})
		},
		handleReceiveAll() {
			updateCollectReceiveAllApi({
				userId: getUserId(),
				brandId: 1001079
			})
				.then(({ data }) => {
					this.$showToast('领取成功', 'success')
					this.getUserCouponReceive()
				})
		}
	},
	onReachBottom() {
		if (this.currentTab === 2) {
			if (this.myCouponQuery.page >= this.totalPages) {
				this.status = 'no-more'
				return
			}
			if (this.myCouponQuery.size > this.myCouponList.length) {
				return
			}
			this.myCouponQuery.page++
			this.getUserCouponList(true)
		}
	}
}
</script>

<style lang="less" scoped>
.coupons {
	width: 100vw;
	min-height: 100vh;
	background: #F9FAFC;

	.title-container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 60upx;
		padding-bottom: 48upx;
		background: #FFFFFF;

		image {
			width: 56upx;
			height: 56upx;
			position: absolute;
			left: 22upx;
		}

		text {
			color: rgba(0, 0, 0, 0.85);
			font-size: 36upx;
			font-weight: 500;
		}
	}

	.nav-list {
		padding: 0 40upx;
		padding-bottom: 24upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #FFFFFF;

		.nav {
			font-size: 28upx;
			color: rgba(0, 0, 0, 0.85);

			&.active {
				color: #FA5151;
				font-size: 28upx;
			}
		}
	}

	.select-list {
		padding: 0 48upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 80upx;
		border-top: 0.5px solid #D8D8D8;
		border-bottom: 0.5px solid #D8D8D8;
		background: #FFFFFF;

		.select {
			display: flex;
			align-items: center;

			.text {
				font-size: 24upx;
				font-weight: 350;
				line-height: 34upx;
				color: #3D3D3D;
			}

			image {
				width: 28upx;
				height: 28upx;
			}
		}

		text {
			font-size: 24upx;
			font-weight: 350;
			line-height: 34upx;
			color: #3D3D3D;
		}
	}

	.main {
		padding: 0upx 30upx 40upx 30upx;

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

	.foot {
		width: 100%;
		height: 110upx;
		background: #FFFFFF;
		box-shadow: 0upx 8upx 20upx 0upx rgba(0, 0, 0, 0.3);
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.sub {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #999999;

			&.active {
				color: #FA5151;
			}

			// image {
			// 	width: 48upx;
			// 	height: 48upx;
			// }

			text {
				font-size: 24upx;

			}
		}
	}

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
