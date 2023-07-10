<template>
	<view class="CommiditBigListCatainer">
		<view class="CommiditBigItem" v-if="(index <= 3 || isEveryList)" v-for="(item,index) in listTotal">
			<image src="../image/cai.png" mode=""></image>
			<view class="cmText">
				<p>泰正宗·头部按摩40分钟</p>
				<view class="msg_text">
					<span>40分钟</span><span class="PartingLine">|</span><span>推拿/按摩</span>
				</view>
				<view class="msg_moneys">
					<span>￥<span class="bigMnoey">{{ '666.' }}</span>{{ '00' }} <span class="isDiscount">{{ '4' }}折</span> </span>
					<span>￥{{ '99' }}</span>
				</view>
			</view>
			<view class="cm_btn">
				 <button type="default"> <image src="../image/spCar.png" mode=""></image> <span>抢购</span> </button>
				 <span>月售5+</span>
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
				listTotal: 12,
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
							  // console.log(1)
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
.CommiditBigListCatainer {
	font-family: 思源黑体;
	// display: flex;
	// flex-wrap: wrap;
	// justify-content: space-evenly;
	box-sizing: border-box;
	padding: 20rpx;
	background-color: white;
	.CommiditBigItem {
		margin-top: 5rpx;
		width: 712rpx;
		height: 142rpx;
		display: flex;
		align-items: center;
		> image {
			margin-left: 20rpx;
			width: 140rpx;
			height: 126rpx;
		}
		.cmText {
			margin-left: 18rpx;
			> p {
				font-size: 28rpx;
				font-weight: 600;
				color: #3D3D3D;
			}
			.msg_text {
				margin-top: 18rpx;
				font-size: 24rpx;
				font-weight: normal;
				color: #777777;
				.PartingLine {
					margin: 0 12rpx;
				}
			}
			.msg_moneys {
				margin-top: 14rpx;
				> span {
					line-height: 30rpx;
					margin-top: 6rpx;
					font-weight: 600;
					font-size: 26rpx;
					color: #FA5151;
					.bigMnoey {
						font-size: 30rpx;
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
				> span:nth-of-type(2) {
					margin-left: 5rpx;
					text-decoration:line-through;
				}
				> span:nth-of-type(2) {
					font-size: 20rpx;
					line-height: 40rpx;
					font-weight: normal;
					color: #777777;
				}
			}
		}
		.cm_btn {
			margin-left: 60rpx;
			> button {
				padding: 0;
				margin: 0;
				border-radius: 50rpx;
				margin-top: 3rpx;
				width: 162rpx;
				height: 52rpx;
				display: flex;
				align-items: center;
				justify-content: space-between;
				background-color: #ffbd59;
				> image {
					width: 28rpx;
					height: 28rpx;
					margin-left: 20rpx;
				}
				> span {
					min-width: 100rpx;
					// max-width: 80rpx;
					font-size: 24rpx;
					font-weight: normal;
					color: #FFFFFF;
					background-color: #ff6100;
				}
			}
			> span {
				margin-top: 4rpx;
				text-align: right;
				width: 96%;
				display: inline-block;
				font-size: 24rpx;
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
