<template>
	<view class="convenient-services-container">
		<!-- 顶部位置 -->
		<view class="header">
			<tui-icon name="arrowleft" color="#000" @click="handleBack"></tui-icon>
			<BeeAddress>
				<view class="address-wrapper">
					<view class="current-addresss">位置：广东省佛山市</view>
					<BeeIcon :src="require('../../../static/index/bianmin/location.png')" :size="24"></BeeIcon>
				</view>
			</BeeAddress>
		</view>

		<!-- 搜索框 -->
		<SearchBar></SearchBar>

		<!-- 中间轮播图 -->
		<view class="banner-wrapper">
			<image src="../../../static/index/ban1.png" mode="" />
		</view>
		<view class="mid">
			<view class="bar-list">


				<view class="bar" v-for="item in items" :key="item.id" @click="go(item.url)">
					<image :src="item.icon" mode="" />
					<view class="text">{{ item.name }}</view>
				</view>

				<!-- <view class="bar" v-for="item in items" :key="item.id">
					<image :src="item.icon" mode="" @click="jump(item.id)"/>
					<view class="text">{{ item.name }}</view>
				</view> -->


			</view>
			<view class="coupon-list">
				<view class="coupon" v-for="item in coupons" :key="item.id">
					<image :src="item.icon" mode="" />
				</view>
			</view>
		</view>
		<view class="text-list">
			<view class="left">精选</view>
			<view class="right">换一批</view>
		</view>
		<GasStation></GasStation>
		<GasStation></GasStation>
		<GasStation></GasStation>
		<GasStation></GasStation>
	</view>
</template>

<script>
import { items, coupons } from './data'
import md5 from 'js-md5'
import { RuanRequest } from "../../../utils";
export default {
	data() {
		return {
			items,
			coupons
		}
	},
	methods: {
		handleBack() {
			uni.switchTab({
				url: '/pages/index/index',
			})
		},
		jump(id) {
			if (id == 3) {
				const app_key = "264225480815872";
				const timestamp = Date.now();
				RuanRequest("/tuanyou/gettoken", null, "post").then(({ data }) => {
					const app_secret = "25c72804618743707a00d93e486271f6";
					const paramObj = {
						'app_key': app_key,
						'token': data,
						'timestamp': timestamp,
					};
					const paramObjKeys = Object.keys(paramObj);
					const paramObjKeysSort = paramObjKeys.sort();
					var strs = "" + app_secret;
					for (var i = 0; i < paramObjKeysSort.length; i++) {
						strs = strs + paramObjKeysSort[i] + paramObj[key];
					}
					strs = strs + app_secret;
					const sign = md5(strs);
					var path = "https://test05-motorcade-wap.newlink.com/?";
					path = path + "app_key=" + app_key;
					path = path + "&token=" + data;
					path = path + "&timestamp=" + timestamp;
					path = path + "&sign=" + sign;
					uni.navigateToMiniProgram({
						appId: 'wx1f1ea04b716771be',
						path: path,
						// extraData: {
						//   'data1': 'test'
						// },
						success(res) {
							console.log(res);
						},
						fail(res) {
							console.log(res);
						}
					})
				});;
			}
		}
	},
}
</script>

<style lang="less" scoped>
.convenient-services-container {
	width: 100%;
	min-height: 100vh;
	padding: 20upx;
	box-sizing: border-box;
	background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);

	.header {
		width: 100%;
		display: flex;
		align-items: center;

		/deep/ .bee-address-container {
			flex: 1;
		}

		.address-wrapper {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.current-addresss {
				font-size: 32upx;
				font-weight: 500;
			}
		}
	}

	.banner-wrapper {
		padding: 28upx 0;

		image {
			width: 100%;
			height: 200upx;
			border-radius: 20upx;
		}
	}

	.mid {
		padding: 0upx 22upx;
		border-radius: 20upx 20upx 0upx 0upx;
		background: linear-gradient(180deg, #FFFFFF 0%, #FDFAFA 122%);

		.bar-list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 44upx 0 68upx 0;

			.bar {
				width: 112upx;
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 80upx;
					height: 80upx;
				}

				.text {
					font-size: 28upx;
					color: #000000;
				}
			}
		}

		.coupon-list {
			display: flex;
			justify-content: space-between;
			padding-bottom: 30upx;

			.coupon {
				image {
					width: 152upx;
					height: 192upx;
				}
			}
		}
	}

	.text-list {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 28upx 20upx 30upx 20upx;

		.left {
			font-size: 32upx;
			font-weight: 500;
			color: #000000;
		}

		.right {
			width: 90upx;
			height: 34upx;
			border-radius: 10upx;
			border: 2upx solid #D8D8D8;
			font-size: 24upx;
			color: #999999;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
