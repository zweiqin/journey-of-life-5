<template>
	<view class="earn-money">
		<view class="title-container">
			<!-- <tui-icon @click="handleBack" class="back-icon" name="arrowleft" color="#fff"></tui-icon> -->
			<image src="../../../static/index/earn-money/back.png" mode="" @click="handleBack" />
			<text>赚钱中心</text>
		</view>
		<view class="background">
			<image src="../../../static/index/earn-money/background.png" mode="" />
		</view>
		<view class="main">
			<view class="main-top">
				<view class="top-img">
					<image src="../../../static/index/earn-money/active-task.png" mode="" />
				</view>
				<view class="top-text">我的任务></view>
				<view class="item-list">
					<view v-for="item in items" :key="item.id" class="item">
						<image :src="item.icon" mode="" />
					</view>
				</view>
			</view>
			<view class="main-bot">
				<view class="bot-img">
					<image src="../../../static/index/earn-money/activate-membership.png" mode="" />
				</view>
				<view class="data">
					<view class="left">
						<image src="../../../static/index/earn-money/head.png" mode="" />
					</view>
					<view class="mid">
						<view class="grade">我的会员:<text>合伙人</text></view>
						<view class="info-list">
							<view class="info">会员信息</view>
							<view class="check">点我查看></view>
						</view>
					</view>
				</view>
				<view class="bar">
					<image src="../../../static/index/earn-money/bar.png" mode="" />
				</view>
				<view class="level-list">
					<view v-for="level in levels" :key="level.id" class="level">
						<view class="level-name">{{ level.name }}</view>
						<view class="money">{{ level.number }}<text>{{ level.unit }}</text></view>
						<view class="register">{{ level.title }}</view>
					</view>
				</view>
				<view class="explain">
					<view class="first">• 以活动期间同一账户累计实付金额为准，不含已充值未消费金额、奖励金、优惠券等</view>
					<view class="second"><text>• 会员一切解释权归巨蜂所属</text>, 放心开通 不自动续费</view>
				</view>
			</view>
			<view class="main-foot">
				<view class="text">会员规则</view>
				<!-- <view class="why">?</view> -->
			</view>
		</view>
	</view>
</template>

<script>
import { items, levels } from './data'
export default {
	name: 'EarnMoney',
	props: {

	},
	data() {
		return {
			items,
			levels
		}
	},
	created() { },
	methods: {
		handleBack() {
			this.$switchTab('/pages/index/index')
		}
	}
}
</script>

<style lang="less" scoped>
.earn-money {
	width: 100vw;
	min-height: 100vh;
	background: radial-gradient(76% 61% at 50% 56%, #FFB773 0%, #FF2C0F 100%);

	.title-container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 60upx;

		image {
			width: 56upx;
			height: 56upx;
			position: absolute;
			left: 22upx;
		}

		text {
			color: #fff;
			font-size: 36upx;
			font-weight: 500;
		}
	}

	.background {
		padding-top: 40upx;

		image {
			width: 100%;
			height: 310upx;
		}
	}

	.main {
		padding: 0 20upx;
		position: relative;
		top: -40upx;

		.main-top {
			width: 100%;
			// height: 362upx;
			border-radius: 8upx;
			background: #FDFAFA;
			margin-bottom: 20upx;
			padding: 26upx 20upx 20upx 20upx;
			box-sizing: border-box;

			.top-img {
				display: flex;
				justify-content: center;
				padding-bottom: 8upx;

				// padding-top: 26upx;
				image {
					width: 316upx;
					height: 48upx;
				}
			}

			.top-text {
				font-size: 28upx;
				// font-weight: 350;
				color: #3D7DFF;
				text-align: right;
				line-height: 32upx;
				padding-bottom: 20upx;
			}

			.item-list {
				display: flex;
				justify-content: space-between;

				.item {
					image {
						width: 152upx;
						height: 192upx;
					}
				}
			}
		}

		.main-bot {
			width: 100%;
			// height: 954upx;
			border-radius: 8upx;
			background: #FFFFFF;
			padding: 40upx 20upx 60upx 20upx;
			box-sizing: border-box;

			.bot-img {
				display: flex;
				justify-content: center;

				image {
					width: 316upx;
					height: 48upx;
				}
			}

			.data {
				display: flex;
				// justify-content: space-between;
				align-items: center;
				padding: 34upx 0;

				.left {
					padding-right: 20upx;

					image {
						width: 150upx;
						height: 152upx;
					}
				}

				.mid {
					width: 100%;

					.grade {
						font-size: 32upx;
						color: #DE2511;

						text {
							font-size: 32upx;
							padding-left: 16upx;
						}
					}

					.info-list {
						padding-top: 12upx;
						display: flex;
						align-items: center;
						justify-content: space-between;

						.info {
							font-size: 28upx;
							font-weight: 300;
							color: #333333;

						}

						.check {
							font-size: 28upx;
							line-height: 32upx;
							color: #3D7DFF;
						}
					}

				}

			}

			.bar {
				padding-bottom: 40upx;

				image {
					width: 100%;
					height: 76upx;
				}
			}

			.level-list {
				display: flex;
				flex-wrap: wrap;
				justify-content: space-between;

				.level {
					width: 326upx;
					height: 152upx;
					border-radius: 8upx;
					background: #FFF8E6;
					border: 0.5px solid rgba(255, 93, 0, 0.38);
					box-sizing: border-box;
					margin-bottom: 20upx;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;

					.level-name {
						font-size: 30upx;
						line-height: 42upx;
						color: #000000;
					}

					.money {
						font-size: 48upx;
						line-height: 68upx;
						color: #FA5151;

						text {
							font-size: 32upx;
						}
					}

					.register {
						font-size: 36upx;
						line-height: 68upx;
						color: #999999;
					}
				}
			}

			.explain {
				font-size: 24upx;
				line-height: 36upx;
				font-weight: 400;
				color: #999999;

				.first {}

				.second {
					text {
						color: #3D7DFF;
					}
				}
			}
		}

		.main-foot {
			display: flex;
			align-items: center;
			justify-content: center;
			height: 70upx;

			.text {
				font-size: 24upx;
				line-height: 48upx;
				color: #000000;
				padding-right: 10upx;
			}

			image {
				width: 26upx;
				height: 30upx;
			}

			.why {
				width: 22upx;
				height: 22upx;
				font-size: 20upx;
				border: 2upx solid #000000;
				border-radius: 24upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
}
</style>
