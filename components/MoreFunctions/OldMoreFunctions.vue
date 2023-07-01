<template>
	<view class="j-specification">
		<view class="mask" :style="maskStyle" @click="$emit('input', false)"></view>
		<view class="main" :style="{
				bottom: value ? bottom + 'upx' : -2000 + 'upx'
			}">
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
				<view class="ButtonBox_item">
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
	name: 'JSpecification',
	props: {
		data: {
			type: Object,
			required: true
		},
		value: {
			type: Boolean,
			required: true
		},

		bottom: {
			type: Number,
			required: true
		}
	},

	data() {
		return {
			
		}
	},
	methods: {
		
	}
}
</script>

<style lang="less" scoped>
.j-specification {
	font-size: 28upx;

	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(153, 153, 153, 0.6);
		z-index: 100;
		transition: all 500ms ease-in-out;
	}

	.main {
		z-index: 10000001;
		display: flex;
		--animate-duration: 0.5s;
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
