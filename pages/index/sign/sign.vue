<template>
	<view class="sign">
		<view class="head">
			<image src="../../../static/index/earn-money/back.png" mode="" @click="handleBack" />
			<text>每日签到领大礼</text>
		</view>
		
		<image src="../../../static/index/sign/bg.png" mode="" class="bg"/>

		<view class="middle">
			<view class="date">
				<youlanSignIn type="sign" @change="signDate" />
			</view>
			<view class="main">
				<view class="integral">
					<view class="i-left">
						<view class="i-name">当前积分</view>
						<view class="i-list">
							<text>9552</text>
							<image src="../../../static/index/sign/go.png" mode="" />
						</view>
					</view>
					<view class="i-right" @click="go('/pages/index/sign/points-mall')">前往积分商城</view>
				</view>
				<view class="mid">
					<view class="head-img">
						<image src="../../../static/index/sign/left.png" mode="" />
						<text>积分兑换</text>
						<image src="../../../static/index/sign/right.png" mode="" />
					</view>
					<view class="exchange">
						<view class="ex-name">可兑换</view>
						<view class="heng"></view>
						<view class="sub-list">
							<view class="sub" v-for="sub in subs" :key="sub.id">
								<image :src="sub.icon" mode="" />
								<text>{{ sub.name }}</text>
							</view>
						</view>
					</view>
					<view class="text-list">
						<view class="name">积分商城</view>
						<view class="more">
							<text>查看更多</text>
							<image src="../../../static/index/sign/more.png" mode="" />
						</view>
					</view>
					<view class="goods-list">
						<view class="goods" v-for="item in items" :key="item.id">
							<image :src="item.icon" mode="" />
							<view class="goods-name">{{ item.name }}</view>
							<text>兑换积分: {{ item.number }}</text>
							<view class="click">点击兑换</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

import youlanSignIn from '../../../components/youlan-SignIn/youlan-SignIn.vue'
import JCalendar from '../../../components/j-calendar/j-calendar.vue'
import { subs, items } from './data'
export default {
	name: "Sign",
	props: {

	},
	data() {
		return {
			subs,
			items,
		}
	},
	methods: {
		handleBack() {
			uni.switchTab({
				url: '/pages/index/index',
			})
		},

		updateSign(item) {
			console.log(item);

		},
		refeshSignData(item) {
			console.log(item);
		},
		signDate(item) {
			console.log(item);
		}
	},
	components: {
		youlanSignIn,
		JCalendar
	},
	created() { }
}
</script>

<style lang="less" scoped>
.sign {
	width: 100vw;
	min-height: 100vh;
	background: linear-gradient(0deg, #FD1A02 0%, #FD7831 65%, #FD4722 100%);

	.head {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 60upx;
		padding-bottom: 24upx;
		background: linear-gradient(174deg, #FE5C22 15%, #FE933F 77%);

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

	.bg {
		width: 100%;
		height: 610upx;
		position: absolute;
	}

	.middle {
		padding: 0 20upx;
		position: relative;
    padding-top: 86px;
		.date {
			// position: absolute;
			// top: 308upx;
			// padding: 0 20upx;
		}

		.main {
			// padding: 0 20upx;
			// margin-top: 400upx;
			padding-bottom: 40upx;
			padding-top: 28upx;
			.integral {
				width: 100%;
				// height: 114upx;
				border-radius: 20upx;
				box-sizing: border-box;
				background: linear-gradient(270deg, #515972 0%, #66708B 100%);
				padding: 14upx 36upx 18upx 36upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 36upx;

				.i-left {
					.i-name {
						font-size: 24upx;
						color: #FFFFFF;
					}

					.i-list {
						display: flex;
						align-items: center;

						text {
							font-size: 36upx;
							font-weight: 500;
							color: #FFFFFF;
							padding-right: 28upx;
						}

						image {
							width: 48upx;
							height: 48upx;
						}
					}
				}

				.i-right {
					width: 232upx;
					height: 62upx;
					border-radius: 100upx;
					background: linear-gradient(90deg, #F44B06 0%, #FC9214 100%);
					font-size: 28upx;
					font-weight: 500;
					color: #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.mid {
				width: 100%;
				// height: 725px;
				border-radius: 20upx;
				background: #FFF6E5;
				box-sizing: border-box;
				border: 2upx solid #E1B590;
				padding: 0 24upx;
				padding-bottom: 20upx;

				.head-img {
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 60upx 0upx 68upx 0upx;

					image {
						width: 64upx;
						height: 30upx;
					}

					text {
						font-size: 48upx;
						font-weight: bold;
						color: #911A00;
						padding: 0 48upx;
					}
				}

				.exchange {
					width: 100%;
					border-radius: 20upx;
					background: #FFFFFF;
					padding: 26upx 28upx 40upx 28upx;
					box-sizing: border-box;

					.ex-name {
						font-size: 28upx;
						font-weight: 500;
						color: #3D3D3D;
						// margin-bottom: 18upx;
					}

					.heng {
						width: 100%;
						height: 2upx;
						background: linear-gradient(90deg, #FFFFFF 0%, #D8D8D8 47%, #FFFFFF 100%);
						margin-top: 18upx;
						margin-bottom: 20upx;
					}

					.sub-list {
						position: relative;
						display: flex;
						justify-content: space-between;

						// white-space: nowrap;
						// &::after {
						// 	content: '';
						// 	position: absolute;
						// 	left: 33%;
						// 	top: 50%;
						// 	width: 196upx;
						// 	height: 2upx;
						// 	transform: rotate(90deg);
						// 	background: linear-gradient(270deg, #FFFFFF 0%, #D8D8D8 50%, #FFFFFF 100%);
						// }

						.sub {
							display: flex;
							flex-direction: column;
							align-items: center;

							image {
								width: 224upx;
								height: 142upx;
							}

							text {
								font-size: 24upx;
								color: #3D3D3D;
								padding-top: 6upx;
							}
						}

					}

				}

				.text-list {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 52upx 20upx 26upx 24upx;

					.name {
						font-size: 28upx;
						font-weight: 500;
						color: #3D3D3D;
					}

					.more {
						display: flex;
						align-items: center;

						text {
							font-size: 24upx;
							color: #999999;
						}

						image {
							width: 28upx;
							height: 28upx;
						}
					}
				}

				.goods-list {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;

					.goods {
						width: 310upx;
						// height: 380upx;
						border-radius: 20upx;
						background: #FFFFFF;
						display: flex;
						flex-direction: column;
						align-items: center;
						margin-bottom: 28upx;

						image {
							width: 224upx;
							height: 142upx;
							margin: 30upx 0 20upx 0;
						}

						text {
							margin: 8upx 0upx 14upx 0upx;
							font-size: 24upx;
							color: #3662EC;
						}

						.goods-name {
							font-size: 24upx;
							color: #3D3D3D;
						}

						.click {
							width: 184upx;
							height: 44upx;
							border-radius: 20upx;
							background: linear-gradient(90deg, #F55808 0%, #FB8D13 100%);
							font-size: 28upx;
							font-weight: 500;
							color: #FFFFFF;
							display: flex;
							justify-content: center;
							align-items: center;
							margin-bottom: 34upx;
						}
					}
				}
			}
		}
	}
}
</style>
