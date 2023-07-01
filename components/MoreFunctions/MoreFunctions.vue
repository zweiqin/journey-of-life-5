<template>
	<view class="MoreFunction">
		<!-- :style="maskStyle" 有点小bug 后期改 奇奇怪怪的跑起来了 -->
		<view class="mask animate__animated" :class="isBox?'animate__fadeOut':'animate__fadeIn'" @click="clossMore"></view>
		<view class="main animate__animated" :class="isBox?'animate__slideOutDown':'animate__slideInUp'">
			<view class="ButtonBox">
				<view class="ButtonBox_item">
					<view class="iconFonts">
						<img src="./image/xiaoxi-zhihui.png" alt="" srcset="">
					</view>
					<span>消息</span>
				</view>
				<view class="ButtonBox_item">
					<view class="iconFonts">
						<img src="./image/shouye-zhihui.png" alt="" srcset="">
					</view>
					<span>回到首页</span>
				</view>
				<view class="ButtonBox_item">
					<view class="iconFonts">
						<img src="./image/wode.png" alt="" srcset="">
					</view>
					<span>我的订单</span>
				</view>
				<view class="ButtonBox_item">
					<view class="iconFonts">
						<img src="./image/gouwuche.png" alt="" srcset="">
					</view>
					<span>购物车</span>
				</view>
				<view class="ButtonBox_item">
					<view class="iconFonts">
						<img src="./image/kefu.png" alt="" srcset="">
					</view>
					<span>官方客服</span>
				</view>
				<view class="ButtonBox_item">
					<view class="iconFonts">
						<img src="./image/yijianfankui.png" alt="" srcset="">
					</view>
					<span>意见反馈</span>
				</view>
				<view class="ButtonBox_item" @click="goToPages('/pages/complain/complain?id='+ goodsId)">
					<view class="iconFonts">
						<img src="./image/jinggao.png" alt="" srcset="">
					</view>
					<span>投诉</span>
				</view>
			</view>
			<button class="CancelBtn" @tap="clossMore">取消</button>
		</view>
	</view>
</template>

<script>
	export default {
		name: "MoreFunctions",
		props: {
			isShow: {
				type: Boolean,
			},
			goodsId: {
				type: [String,Number],
			}
		},
		data() {
			return {
				isBox: false,
			};
		},
		created() {
			this.isBox = this.isShow
			console.log(this.isBox)
		},
		computed: {
			maskStyle() {
				return {
					opacity: this.value ? 1 : 0,
					zIndex: this.value ? 12 : -1
				}
			},
		},
		methods: {
			clossMore() {
				this.isBox = true;
				setTimeout(()=> {
					this.$emit("clossMore")
				},400)
			},
			goToPages(url) {
				let that = this
				uni.navigateTo({
					url,
					success() {
						that.$emit("clossMore")
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.MoreFunction {
		.mask {
			position: fixed;
			top: 0px;
			left: 0px;
			background-color: none;
			width: 100vw;
			height: 100vh;
			font-size: 28upx;
			z-index: 10000001;
			--animate-duration: 0.3s;
			background-color: rgba(153, 153, 153, 0.6);
			z-index: 100;
			transition: all 500ms ease-in-out;
		}
		.main {
			z-index: 10000001;
			display: flex;
			--animate-duration: 0.3s;
			flex-direction: column;
			align-items: center;
			position: fixed;
			top: 1050rpx;
			left: 0;
			width: 100vw;
			border-top-left-radius: 50rpx;
			border-top-right-radius: 50rpx;
			height: 576rpx;
			background-color: #f0f0f0;
			.ButtonBox {
				margin-top: 55rpx;
				width: 696rpx;
				height: auto;
				display: flex;
				align-items: center;
				flex-wrap: wrap;
				padding-bottom: 20rpx;
				// justify-content: center;
				.ButtonBox_item {
					margin-left: 25rpx;
					margin-top: 20rpx;
					float: left;
					display: flex;
					flex-direction: column;
					align-items: center;
					.iconFonts {
						width: 106rpx;
						height: 106rpx;
						display: flex;
						align-items: center;
						justify-content: center;
						background-color: white;
						border-radius: 50%;
						margin-bottom: 20rpx;
						> img {
							width: 52rpx;
							height: 52rpx;
						}
					}
					> span {
						color: #989898;
						font-size: 28rpx;
					}
				}
			}
			.CancelBtn {
				width: 731rpx;
				height: 85rpx;
				line-height: 85rpx;
				background-color: white;
				border-radius: 100rpx;
				font-size: 47rpx;
				font-weight: 600;
			}
		}
	}
</style>