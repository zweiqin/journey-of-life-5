<template>
	<view class="brand-detail-container">
		<!-- 顶部的导航按钮 -->
		<view class="navgation_top">
			<view class="imgbg">
				<image src="./image/fanhui.png" mode=""></image>
			</view>
			<view class="fnButton">
				<view class="imgbg">
					<image src="./image/aixin.png" mode=""></image>
				</view>
				<view class="imgbg">
					<image src="./image/more.png" mode=""></image>
				</view>
				<view class="imgbg">
					<image src="./image/spCar.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 轮播图 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item>
				<img class="bannerItem" src="./image/banner.png" alt="">
			</swiper-item>
			<swiper-item>
				<img class="bannerItem" src="./image/banner.png" alt="">
			</swiper-item>
		</swiper>
		<view class="main">
			<!-- 商品信息栏 -->
			<InformationBar></InformationBar>
			<!-- 优惠卷栏 -->
			<view class="favorable">
				<navGationBar>
					<view class="favorableItem">
						<span>￥1</span><span>领</span>
					</view>
					<view class="favorableItem">
						<span>￥100</span><span>领</span>
					</view>
					<view class="favorableItem">
						<span>￥200</span><span>领</span>
					</view>
				</navGationBar>
			</view>
			<TabBar></TabBar>
		</view>
	</view>
</template>

<script>
	import InformationBar from "./components/InformationBar.vue";
	import navGationBar from "./components/NavigationBar.vue";
	import TabBar from "./components/TabBar.vue"
	export default {
		name: 'Detail',
		components: {
			InformationBar,
			navGationBar,
			TabBar
		}
	}
</script>

<style lang="scss" scoped>
	.brand-detail-container {
		position: relative;
		width: 100vw;
		height: auto;
		margin: 0;
		padding: 0;
		.navgation_top {
			box-sizing: border-box;
			margin-top: 72rpx;
			padding: 0rpx 40rpx;
			width: 100vw;
			z-index: 3;
			position: absolute;
			top: 10rpx;
			display: flex;
			justify-content: space-between;
			image {
				width: 38rpx;
				height: 38rpx;
			}
			.imgbg {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 66rpx;
				height: 66rpx;
				border-radius: 50%;
				background: rgba(0, 0, 0, 0.61);
			}
			.fnButton {
				display: flex;
				.imgbg {
					margin-left: 10rpx;
				}
			}
		}
		.swiper {
			z-index: 2;
			width: 100vw;
			height: 400rpx;
			.bannerItem {
				width: 100vw;
				height: 400rpx;
			}
		}
		.main {
			background: #F6F6F6;
			clear: both;
			position: relative;
			.favorable {
				box-sizing: border-box;
				padding: 0rpx 18rpx;
				margin-top: 10px;
				width: 100vw;
				background-color: white;
				border-radius: 25rpx;
				.favorableItem {
					margin-right: 30rpx;
					border-radius: 5rpx;
					display: inline-block;
					background-color: #FF5353;
					font-size: 24rpx;
					font-weight: normal;
					color: #FFFFFF;
					> span {
						font-size: 28rpx;
						box-sizing: border-box;
					}
					> span:nth-of-type(1) {
						padding: 5rpx 10rpx;
						border-right: 1px dashed white;
					}
					> span:nth-of-type(2) {
						padding: 5rpx 8rpx;
					}
				}
			}
		}
		.main::before{
			content:'';
			width:100%;
			height:356rpx;
			display:block;
			overflow:hidden;
			clear:both;
			visibility:hidden
		}
	}
</style>