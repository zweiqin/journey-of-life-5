<template>
	<view class="CommiditListCatainer">
		<view class="CommidItem" v-if="(index <= 3 || isEveryList)" v-for="(item,index) in listTotal">
			<image src="../image/cai.png" mode=""></image>
			<p>牛马王打卡双人套餐</p>
			<view class="msg_moneys">
				<span>￥<span class="bigMnoey">{{ '666.' }}</span>{{ '00' }} <span class="isDiscount">{{ '4' }}折</span> </span>
				 <button type="default"> <image src="../image/spCar.png" mode=""></image> <span>抢购</span> </button>
			</view>
			<view class="msg_shoping">
				<span> ￥{{ '999' }} </span> <span> 月销 {{ '200万+' }} </span>
			</view>
		</view>
		<view class="isEvery" v-if="listTotal > 4" @click="goCommidityTop()">
			<span>{{ isEveryList?'收起':'展开全部' }}</span> <image :class="{rota: isEveryList}" src="../image/every.png"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isBigCommidItem: true,  // 暂时用于模仿单排的商品
				isEveryList: false,
				listTotal: 20,
			};
		},
		methods: {
			goCommidityTop() {
				let that = this
				if(!this.isEveryList) {
					this.isEveryList = true
				}else {
					uni.pageScrollTo({
						  scrollTop: 428, //到达距离顶部的top值
						  duration: 200, //过渡时间
						  success() {
							  // that.isEveryList = false
							  let timer = setTimeout(() => {
								  that.isEveryList = false
								  clearTimeout(timer)
							  },200)
						  }
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.CommiditListCatainer {
	// display: flex;
	// flex-wrap: wrap;
	// justify-content: space-evenly;
	padding-bottom: 20rpx;
	background-color: white;
	.big {
		box-sizing: border-box !important;
		margin: 0rpx !important;
		padding: 20rpx 20rpx !important;
		width: 100vw !important;
	}
	.CommidItem {
		float: left;
		margin-left: 25rpx;
		margin-top: 20rpx;
		width: 340rpx;
		padding-bottom: 18rpx;
		// z-index: 0 !important;
		// height: 340rpx;
		> image {
			z-index: 0 !important;
			border-radius: 10rpx;
			width: 100%;
			height: 140rpx;
		}
		> p {
			font-size: 28rpx;
			font-weight: 600;
			color: #3D3D3D;
		}
		.msg_moneys {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: space-between;
			// min-height: 26rpx;
			> span {
				margin-top: 6rpx;
				font-weight: 600;
				font-size: 24rpx;
				color: #FA5151;
				.bigMnoey {
					font-size: 28rpx;
				}
				.isDiscount {
					font-size: 12rpx;
					margin-left: 15rpx;
					border-radius: 5rpx;
					box-sizing: border-box;
					padding: 0rpx 4rpx;
					border: 1rpx solid #FA5151;
				}
			}
			> button {
				padding: 0;
				margin: 0;
				border-radius: 50rpx;
				margin-top: 3rpx;
				width: 130rpx;
				height: 42rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #ffbd59;
				> image {
					width: 28rpx;
					height: 28rpx;
					margin-left: 12rpx;
				}
				> span {
					min-width: 80rpx;
					// max-width: 80rpx;
					font-size: 24rpx;
					font-weight: normal;
					color: #FFFFFF;
					background-color: #ff6100;
				}
			}
		}
		.msg_shoping {
			display: flex;
			justify-content: space-between;
			> span:nth-of-type(1) {
				text-decoration:line-through;
			}
			> span {
				font-size: 20rpx;
				line-height: 40rpx;
				font-weight: normal;
				color: #777777;
			}
		}
	}
	.isEvery {
		width: 100vw;
		font-size: 28rpx;
		font-weight: normal;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #777777;
		> image {
			margin-left: 8rpx;
			width: 20rpx;
			height: 20rpx;
		}
		.rota {
			// ransition: all 1s;
			transform: rotate(-90deg);
		}
	}
}
</style>
