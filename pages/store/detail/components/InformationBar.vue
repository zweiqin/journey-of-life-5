<template>
	<view class="Information_container">
		<p>格莱美惠</p>
		<!-- navUrl绑定跳转按钮的路由路径 -->
		<navGationBar :navUrl="'xxx'">
			<view class="mark">
				<span class="star"><image class="stares" src="../image/star.png" mode=""></image>4.9</span>
				<span class="sell">月售2101</span>
				<span class="average">人均￥66</span>
			</view>
			<view class="advantage">
				<span>有包间</span>
				<span>空调开放</span>
				<span>可电话预约</span>
			</view>
		</navGationBar>
		<navGationBar>
			<view class="shopStatus">
				<!-- Class isProfessional 代表营业中的颜色 -->
				<p>店铺状态：<span class="isRest">休息中</span></p>
				<p>营业时间：21:00-次日5:00</p>
			</view>
		</navGationBar>
		<view class="address">
			<view class="addresText">
				<p>禅城区唐东二街22号厂内14号</p>
				<p>距你14.8公里，驾车35分钟</p>
			</view>
			<view class="addresBtn">
				<view class="btnItem">
					<view class="images imagesblue">
						<image src="../image/phone.png" mode=""></image>
					</view>
					<p>电话</p>
				</view>
				<view class="btnItem">
					<view class="images imagesgreen">
						<image src="../image/addres.png" mode=""></image>
					</view>
					<p>到这去</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import navGationBar from "./NavigationBar.vue"
	export default {
		components: {
			navGationBar
		},
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss" scoped>
	.stares {
		width: 24rpx;
		height: 24rpx;
	}
	.Information_container {
		box-sizing: border-box;
		font-family: 思源黑体;
		position: absolute;
		top: -20rpx;
		border-top-right-radius: 30rpx;
		border-top-left-radius: 30rpx;
		width: 100vw;
		background-color: white;
		padding: 14rpx 18rpx;
		> p {
			font-size: 18px;
			font-weight: 600;
			letter-spacing: 0.1em;
			color: #000000;
		}
		
		.mark {
			> span {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				font-size: 24rpx;
				line-height: 24rpx;
				font-weight: normal;
			}
			.star {
				color: #FB782D;
			}
			.sell {
				margin-left: 16rpx;
				color: #777777;
			}
			.average {
				margin-left: 34rpx;
				color: #000000;
			}
		}
		.advantage {
			> span {
				margin-top: 6rpx;
				margin-right: 20rpx;
				display: inline-block;
				padding: 10rpx;
				height: 26rpx;
				border-radius: 10rpx;
				background: #FF8000;
				font-size: 24rpx;
				font-weight: normal;
				line-height: 24rpx;
				color: #FFFFFF;
			}
		}
		.shopStatus {
			> p:nth-of-type(1) {
				font-weight: 400;
				font-size: 24rpx;
				line-height: 24px;
				color: #3D3D3D;
				.isRest {
					color: #2E2E2E;
				}
				.isProfessional {
					color: #FA5151;
				}
			}
			> p:nth-of-type(2) {
				box-sizing: border-box;
				padding: 0 10rpx;
				display: inline-block;
				border-radius: 5rpx;
				background: #F6F6F6;
				font-size: 24rpx;
				font-weight: normal;
				color: #777777;
			}
		}
		.address {
			display: flex;
			justify-content: space-between;
			margin-top: 10rpx;
			.addresText {
				> p {
					line-height: 30rpx;
				}
				> p:nth-of-type(1) {
					font-size: 24rpx;
					font-weight: 600;
					color: #000000;
				}
				> p:nth-of-type(2) {
					margin-top: 5rpx;
					font-size: 24rpx;
					font-weight: normal;
					color: #777777;
				}
			}
			.addresBtn {
				display: flex;
				.btnItem {
					margin: 0rpx 15rpx;
					display: flex;
					flex-direction: column;
					align-items: center;
					> p {
						margin-top: 12rpx;
						font-size: 24rpx;
						font-weight: normal;
						line-height: 24rpx;
						color: #3D3D3D;
					}
					.imagesblue:nth-of-type(1) {
						background-color: #0256ff15;
					}
					.imagesgreen:nth-of-type(1) {
						background: linear-gradient(140deg, #53e88c51 -3%, #15be7837 106%);
					}
					.images {
						width: 60.57rpx;
						height: 60.57rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						border-radius: 50%;
						> image {
							width: 50%;
							height: 50%;
						}
					}
				}
			}
		}
	}
</style>