<template>
	<view class="points-mall">
		<view class="head">
			<image src="../../../static/index/earn-money/back.png" mode="" @click="handleBack" />
			<text>积分商城</text>
		</view>
		<view class="head-image">
			<image src="../../../static/index/sign/head-img.png" mode="" />
			<text>谢芳菲</text>
		</view>
		<view class="heng"></view>
		<view class="list">
			<view class="left">
				<view class="text">累计积分（分）</view>
				<view class="number">56200</view>
			</view>
			<view class="shu"></view>
			<view class="right">
				<view class="text">连续签到（天）</view>
				<view class="number">20</view>
			</view>
		</view>
		<view class="background">
			<view class="item" v-for="good in goods" :key="good.id">
				<view class="good">
					<image :src="good.icon" mode="" />
				</view>
				<view class="info">
					<view class="good-name">{{ good.name }}</view>
					<view class="price">券后: <text style="font-size: 28upx;color: #FA5151;padding-left: 8upx;">￥{{ good.discount }}</text><text
							style="font-size: 24upx;color: #999999;text-decoration: line-through;">￥{{ good.price }}</text></view>
				</view>
				<view class="exchange">
					<view class="num">
						<view class="ex-price">￥<text>{{ good.number }}</text></view>
						<view class="ex-integral">{{ good.integral }}分</view>
					</view>
					<view class="click">点击兑换</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { goods } from './data'
export default {
	name: "Points-mall",
	props: {

	},
	data() {
		return {
			goods,
		}
	},
	methods: {
		handleBack() {
			uni.navigateTo({
				url: '/pages/index/sign/sign',
			})
		},
	},
	created() { }
}
</script>

<style lang="less" scoped>
.points-mall {
	background: linear-gradient(180deg, rgba(245, 155, 35, 0.92) -3%, rgba(245, 155, 35, 0.92) 39%, #F5900A 98%);
	width: 100vw;
	min-height: 100vh;

	.head {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 60upx;
		padding-bottom: 24upx;
		// background: linear-gradient(174deg, #FE5C22 15%, #FE933F 77%);

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

	.head-image {
		display: flex;
		flex-direction: column;
		align-items: center;
		// justify-content: center;

		image {
			width: 80upx;
			height: 80upx;
		}

		text {
			font-size: 32upx;
			font-weight: 500;
			color: #FFFFFF;
			padding-top: 8upx;
			padding-bottom: 16upx;
		}
	}

	.heng {
		width: 438upx;
		height: 2upx;
		background: #FFB785;
		margin: auto;
	}

	.list {
		padding: 22upx 120upx 40upx 120upx;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.left {
			display: flex;
			flex-direction: column;
			align-items: center;

			.text {
				font-size: 28upx;
				color: #FFFFFF;
			}

			.number {
				font-size: 48upx;
				font-weight: bold;
				color: #FFFFFF;
			}
		}

		.shu {
			width: 2upx;
			height: 56upx;
			background: #FFB785;
		}

		.right {
			display: flex;
			flex-direction: column;
			align-items: center;

			.text {
				font-size: 28upx;
				color: #FFFFFF;
			}

			.number {
				font-size: 48upx;
				font-weight: bold;
				color: #FFFFFF;
			}
		}
	}

	.background {
		padding: 34upx 26upx 0 26upx;
		box-sizing: border-box;
		width: 100%;
		border-radius: 40upx 40upx 0upx 0upx;
		background: #FFFFFF;

		.item {
			width: 100%;
			height: 290upx;
			display: flex;
			justify-content: space-between;
			padding-bottom: 18upx;

			.good {
				// width: 224upx;
				// height: 142upx;
				display: flex;
				align-items: center;

				image {
					width: 224upx;
					height: 142upx;
				}
			}


			.info {
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.good-name {
					font-size: 24upx;
					font-weight: 500;
					color: #3D3D3D;
				}

				.price {
					font-size: 24upx;
					color: #3D3D3D;
				}

			}

			.exchange {
				background: linear-gradient(180deg, #FFF8E6 0%, #FCDBDB 100%);
				padding: 48upx 10upx 22upx 10upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.num {
					display: flex;
					flex-direction: column;
					align-items: center;

					.ex-price {
						font-size: 36upx;
						color: #FA5151;

						text {
							font-size: 48upx;
						}
					}

					.ex-integral {
						font-size: 32upx;
						color: #911A00;
					}
				}

				.click {
					width: 150upx;
					height: 44upx;
					border-radius: 20upx;
					background: linear-gradient(90deg, #F55808 0%, #FB8D13 100%);
					font-size: 24upx;
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
