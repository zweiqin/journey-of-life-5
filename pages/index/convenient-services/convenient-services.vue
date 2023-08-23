<template>
	<view class="convenient-services-container">
		<!-- 顶部位置 -->
		<view class="header">
			<tui-icon name="arrowleft" color="#000" @click="handleBack"></tui-icon>
			<BeeLocale style="flex: 1">
				<view class="address-wrapper">
					<view class="current-addresss">位置：{{ $store.getters.currentCity }}</view>
					<BeeIcon :src="require('../../../static/index/bianmin/location.png')" :size="24"></BeeIcon>
				</view>
			</BeeLocale>
		</view>

		<!-- 搜索框 -->
		<SearchBar prevent @click="go('/pages/search-page/search-page')"></SearchBar>

		<!-- 中间轮播图 -->
		<view class="banner-wrapper">
			<image src="../../../static/index/ban1.png" mode="" />
		</view>
		<view class="mid">
			<view class="bar-list">
				<view v-for="item in items" :key="item.id" class="bar">
					<image :src="item.icon" mode="" @click="handleTo(item)" />
					<view class="text">{{ item.name }}</view>
				</view>
			</view>
		</view>
		<!-- <view class="text-list">
			<view class="left">精选</view>
			<view class="right">换一批</view>
			</view> -->

		<tui-modal
			:show="$data._isShowTuiModel" title="提示" content="您还未登录，是否先去登录？"
			@click="_handleClickTuiModel($event, 'login', '/pages/index/convenient-services/convenient-services')"
		></tui-modal>
	</view>
</template>

<script>
import showModel from '../../../mixin/showModel'
export default {
	data() {
		return {
			items: [
				{
					name: '加油',
					id: 3,
					icon: require('../../../static/index/convenient-services/oil.png'),
					url: '/pages/index/convenient-services/service-oil'
				},
				{
					name: '寄快递',
					id: 6,
					icon: require('../../../static/index/convenient-services/charge.png'),
					url: '/pages/index/convenient-services/kuai-di/index'
				}
			]
		}
	},
	mixins: [ showModel() ],
	methods: {
		handleBack() {
			this.$switchTab('/pages/index/index')
		},
		handleTo(item) {
			if (!this.isLogin()) {
				this.$data._isShowTuiModel = true
			} else {
				this.go(item.url)
			}
		}
	}
}
</script>

<style lang="less" scoped>
.convenient-services-container {
	width: 100%;
	min-height: 100vh;
	padding: 0 20upx;
	box-sizing: border-box;
	background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);

	.header {
		width: 100%;
		display: flex;
		align-items: center;

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
			width: 100vw;
			height: auto;
			// display: flex;
			// justify-content: space-between;
			// align-items: center;
			padding: 20upx 0 20upx 0;

			.bar {
				margin: 10rpx;
				width: 112upx;
				display: inline-flex;
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
