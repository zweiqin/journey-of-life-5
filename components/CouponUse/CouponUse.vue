<template>
	<view>
		<view class="line-pane" @click="drawerVisible = true">
			<view class="title">优惠劵</view>
			<view style="display: flex;align-items: center;">
				<view class="desc" style="color: #999">{{ couponName }}</view>
				<tui-icon name="arrowright" size="22" color="#979797" style="padding: 2upx 0 2upx 8upx;"></tui-icon>
			</view>
		</view>
		<tui-drawer mode="bottom" :visible="drawerVisible" @close="drawerVisible = false">
			<view style="height: 55vh;padding: 20upx;overflow-y: auto;">
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
									<view class="order" @click="handleChooseCoupon(item)">选择</view>
								</view>
							</view>
						</view>
					</view>
					<view v-else>
						<tui-no-data>暂无优惠券</tui-no-data>
					</view>
				</view>
			</view>
		</tui-drawer>
	</view>
</template>

<script>
import { getCouponSelectlistApi } from '../../api/user'
import { getUserId } from '../../utils'

export default {
	name: 'CouponUse',

	components: {},
	props: {
		brandId: {
			type: [Number, String],
			required: true
		}
	},
	data() {
		return {
			drawerVisible: false,
			couponName: '暂无优惠劵可用',
			couponList: [
			// 	{
			// 	'id': 3,
			// 	'name': '新用户优惠券',
			// 	'desc': '全场通用',
			// 	'tag': '无限制',
			// 	'min': 99,
			// 	'discount': 3,
			// 	'status': 1,
			// 	'startTime': '2019-04-19',
			// 	'endTime': '2019-11-13'
			// }
			]
		}
	},
	created() {
		// this.getCouponSelectlist()
	},
	beforeMount() { },
	methods: {
		getCouponSelectlist() {
			console.log(this.brandId)
			getCouponSelectlistApi({
				userId: getUserId(),
				brandId: this.brandId
			})
				.then(({ data }) => {
					console.log(data)
					this.couponList = data.couponVoList || []
				})
		},
		handleChooseCoupon(item) {
			console.log(item)
			this.couponName = item.name
			this.$emit('choose', { id: item.id, name: item.name })
		}

	}
}
</script>

<style lang="scss" scoped>
.line-pane {
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 100upx;
	margin: 20upx 0;
	padding: 20upx 18upx;
	background-color: #fff;

}

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
</style>
