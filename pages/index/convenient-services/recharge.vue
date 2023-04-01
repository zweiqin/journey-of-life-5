<template>
	<view class="recharge">
		<view class="head">
			<image src="../../../static/index/convenient-services/return.png" mode="" @click="back" />
			<text>充值</text>
		</view>
		<view class="main">
			<view class="title-list">
				<view class="text">加油充值</view>
				<view class="why">?</view>
			</view>
			<view class="price-list">
				<view class="item" v-for="item in prices" :key="item.id" @click="handleToAmount(item.price)">
					<view class="number">{{ item.price }}元</view>
					<view class="money">售价{{ item.price }}元</view>
				</view>
				<view class="customize" @click="handleToCustomize">
					<view class="first">更多面额</view>
					<view class="second">自定义</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>

import { prices } from './data'
export default {
	data() {
		return {
			prices,

		};
	},
	components: {

	},

	onShow() {

	},

	methods: {
		back() {
			uni.navigateTo({ url: '/pages/index/convenient-services/service-oil' })
		},
		handleToAmount(item) {
			console.log(item);
			uni.navigateTo({
				url: `/pages/index/convenient-services/amount?price=${item}`
			})
		},
		handleToCustomize() {
			uni.navigateTo({
				url: `/pages/index/convenient-services/amount`
			})
		}


	},
};
</script>

<style lang="less" scoped>
.recharge {
	width: 100vw;
	min-height: 100vh;

	.head {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 36upx;

		image {
			width: 56upx;
			height: 56upx;
			position: absolute;
			left: 30upx;
		}

		text {
			color: rgba(0, 0, 0, 0.85);
			font-size: 36upx;
			font-weight: 500;
		}
	}

	.main {
		padding: 40upx 40upx 0 40upx;

		.title-list {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.text {
				font-size: 28upx;
				color: #000000;
			}

			.why {
				color: #999999;
				font-size: 28upx;
				font-weight: 500;
				width: 40upx;
				height: 40upx;
				border: 2upx solid #999999;
				border-radius: 40upx;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}

		.price-list {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-between;
			margin-top: 28upx;

			.item {
				border-radius: 10upx;
				box-sizing: border-box;
				border: 1upx solid #FA5151;
				width: 194upx;
				height: 140upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin-bottom: 40upx;

				.number {
					font-size: 36upx;
					font-weight: 500;
					color: #000000;
				}

				.money {
					font-size: 28upx;
					font-weight: 350;
					color: #000000;
				}
			}

			.customize {
				border-radius: 10upx;
				box-sizing: border-box;
				border: 1upx solid #FA5151;
				width: 194upx;
				height: 140upx;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				margin-bottom: 40upx;

				.first {
					font-size: 36upx;
					color: #FF0000;
				}

				.second {
					font-size: 28upx;
					font-weight: 350;
					color: #000000;
				}
			}
		}
	}
}
</style>