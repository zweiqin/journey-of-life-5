<template>
	<view class="panel">
		<view class="header">
			<img
				class="avatar" :src="storeInfo.brand.logo ||
					common.seamingImgUrl('alo7i1qewcuj4305mrr3.png')
				" alt=""
			/>
			<view class="info">
				<view class="name">{{ storeInfo.brand.name }}</view>
				<view class="tem">
					<Rate :rate="5" :size="10"></Rate>
					<view class="type">{{ getTypes(storeInfo.brand.brandgenre) }}</view>
					<view class="year">10年老店</view>
				</view>
			</view>
			<button class="btn" @click="handleEnterStore">进店</button>
		</view>

		<!-- 三张图 -->
		<view v-if="storeInfo.goodsList.length >= 3" class="goods-layout three">
			<view @click="handleEnterStore">
				<easy-loadimage
					class="store" :loading-mode="lazyLoadingMode" :scroll-top="scrollTop"
					:image-src="storeInfo.brand.picUrl"
				></easy-loadimage>
			</view>

			<view class="right">
				<view @click="handleViewDetail(storeInfo.goodsList[1])">
					<easy-loadimage
						:loading-mode="lazyLoadingMode" :scroll-top="scrollTop" class="img"
						style="border-radius: 0 20upx 0 0" :image-src="storeInfo.goodsList[1].picUrl"
					></easy-loadimage>
				</view>

				<view @click="handleViewDetail(storeInfo.goodsList[2])">
					<easy-loadimage
						:loading-mode="lazyLoadingMode" class="img" style="border-radius: 0 0 20upx 0"
						:scroll-top="scrollTop" :image-src="storeInfo.goodsList[2].picUrl"
					></easy-loadimage>
				</view>
			</view>

			<view class="price-icon price-icon-1">
				￥{{ storeInfo.goodsList[1].retailPrice }}
			</view>
			<view class="price-icon price-icon-2">
				￥{{ storeInfo.goodsList[2].retailPrice }}
			</view>
		</view>

		<!-- 一张图 -->
		<view
			v-if="storeInfo.goodsList.length === 1" class="goods-layout one animate__flipInX"
			@click="handleViewDetail(storeInfo.goodsList[0])"
		>
			<easy-loadimage
				:loading-mode="lazyLoadingMode" class="img" :scroll-top="scrollTop"
				:image-src="storeInfo.goodsList[0].picUrl"
			></easy-loadimage>
			<view class="price-icon">￥{{ storeInfo.goodsList[0].retailPrice }}</view>
		</view>

		<!-- 两张图 -->
		<!-- <view class="goods-layout two" v-if="info.goodsList.length === 2">
			<view @click="handleViewDetail(info.goodsList[0])">
			<easy-loadimage
			:loading-mode="lazyLoadingMode"
			class="img"
			:scroll-top="scrollTop"
			:image-src="info.goodsList[0].picUrl"
			></easy-loadimage>
			</view>

			<view @click="handleViewDetail(info.goodsList[1])">
			<easy-loadimage
			:loading-mode="lazyLoadingMode"
			class="img"
			:scroll-top="scrollTop"
			:image-src="info.goodsList[1].picUrl"
			></easy-loadimage>
			</view>

			<view class="price-icon" style="left: 0; top: 20upx"
			>￥{{ info.goodsList[0].retailPrice }}</view
			><view
			class="price-icon"
			style="top: 20upx; right: 0; border-radius: 100px 0 0 100px"
			>￥{{ info.goodsList[1].retailPrice }}</view
			>
			</view> -->
	</view>
</template>

<script>
import Rate from '../rate'
export default {
	components: {
		Rate
	},
	props: {
		storeInfo: Object,
		scrollTop: Number
	},
	data() {
		return {
			info: {}
		}
	},

	// watch: {
	//   storeInfo: {
	//     handler(value) {
	//       console.log("来了门店信息", value);
	//       this.storeInfo = value;
	//     },

	//     immediate: true,
	//     deep: true,
	//   },
	// },
	methods: {
		/**
		 * @description 点击进店
		 */

		handleEnterStore() {
			uni.navigateTo({
				url: '/store/store-detail?storeId=' + this.storeInfo.brand.id
			})
		},

		// 获取types
		getTypes(value) {
			const stores = [
				{
					storeName: '综合',
					id: 0
				},
				{
					id: 14,
					storeName: '附近美食',
					addTime: '2022-10-31 11:41:35',
					updateTime: '2022-10-31 11:41:35',
					deleted: false
				},
				{
					id: 21,
					storeName: '美甲美睫',
					addTime: '2022-10-31 11:43:50',
					updateTime: '2022-10-31 11:43:50',
					deleted: false
				},
				{
					id: 20,
					storeName: '运动健身',
					addTime: '2022-10-31 11:43:38',
					updateTime: '2022-10-31 11:43:38',
					deleted: false
				},
				{
					id: 19,
					storeName: '亲子',
					addTime: '2022-10-31 11:43:26',
					updateTime: '2022-10-31 11:43:26',
					deleted: false
				},
				{
					id: 18,
					storeName: '住宿',
					addTime: '2022-10-31 11:43:16',
					updateTime: '2022-10-31 11:43:16',
					deleted: false
				},
				{
					id: 17,
					storeName: '丽人/美发',
					addTime: '2022-10-31 11:43:05',
					updateTime: '2022-10-31 11:43:05',
					deleted: false
				},
				{
					id: 16,
					storeName: '游玩',
					addTime: '2022-10-31 11:42:34',
					updateTime: '2022-10-31 11:42:34',
					deleted: false
				},
				{
					id: 15,
					storeName: '休闲娱乐',
					addTime: '2022-10-31 11:42:22',
					updateTime: '2022-10-31 11:42:22',
					deleted: false
				}
			]

			return this.setTypes(stores, value)
		},

		setTypes(types, type) {
			const item = types.find((item) => item.id === type)
			return item && item.storeName
		},

		handleViewDetail(info) {
			uni.navigateTo({
				url: '/pages/prod/prod?goodsId=' + info.id
			})
		}
	}
}
</script>

<style lang="less" scoped>
.panel {
	margin-bottom: 52upx;

	.header {
		display: flex;
		align-items: center;
		margin-bottom: 20upx;

		.avatar {
			width: 80upx;
			height: 80upx;
			border-radius: 50%;
			margin-right: 28upx;
		}

		.info {
			flex: 1;

			.name {
				color: #3d3d3d;
				font-size: 24upx;
				font-weight: bold;
				margin-bottom: 12upx;
			}

			.tem {
				display: flex;
				align-items: center;
			}

			.rate {
				margin-right: 6upx;

				img {
					width: 22upx;
					height: 22upx;
					vertical-align: -4upx;
					margin-right: 4upx;
				}
			}

			.tem,
			.year {
				color: #3d3d3d;
				font-size: 20upx;
			}

			.type {
				padding: 0 14upx 0 4upx;
				border-right: 4upx solid #ccc;
			}

			.year {
				padding-left: 14upx;
			}
		}

		.btn {
			display: flex;
			justify-content: center;
			align-items: center;
			width: 110upx;
			height: 36upx;
			background-color: #07b9b9;
			border-radius: 40upx;
			color: #fff;
			font-size: 20upx;
			padding-top: 2upx;
		}
	}

	.goods-layout {
		display: flex;
		width: 100%;
		justify-content: space-between;

		.store {
			width: 496upx;
			height: 300upx;
			border-radius: 20upx 0 0 20upx;
			margin-right: 6upx;
			overflow: hidden;
		}

		.right {
			display: flex;
			justify-content: space-between;
			flex-direction: column;
			flex: 1;

			.img {
				height: 146upx;
				overflow: hidden;
			}
		}
	}

	.one {
		position: relative;
		width: 100%;
		border-radius: 20upx;
		overflow: hidden;

		.img {
			width: 100%;
			height: 300upx;
			object-fit: cover;
		}

		.price-icon {
			position: absolute;
			left: 0;
			top: 20upx;
			width: 110upx;
			height: 54upx;
			background-color: rgba(0, 0, 0, 0.3);
			border-radius: 0 100px 100px 0;
			color: #fff;
			font-size: 28upx;
			text-align: center;
			line-height: 54upx;
		}
	}

	.two {
		position: relative;
		display: flex;
		justify-content: space-between;
		width: 100%;
		height: 300upx;

		.img {
			border-radius: 20upx;
			width: 49.3%;
			object-fit: cover;
		}

		.price-icon {
			position: absolute;
			top: 20upx;
			width: 110upx;
			height: 54upx;
			background-color: rgba(0, 0, 0, 0.3);
			border-radius: 0 100px 100px 0;
			color: #fff;
			font-size: 28upx;
			text-align: center;
			line-height: 54upx;
		}
	}

	.three {
		position: relative;

		.price-icon {
			position: absolute;
			width: 110upx;
			height: 54upx;
			background-color: rgba(0, 0, 0, 0.3);
			border-radius: 0 100px 100px 0;
			color: #fff;
			font-size: 28upx;
			text-align: center;
			line-height: 54upx;

			&-1 {
				width: 76upx;
				height: 32upx;
				right: 0;
				font-size: 24upx;
				line-height: 32upx;
				top: 26upx;
			}

			&-2 {
				width: 76upx;
				height: 32upx;
				right: 0;
				font-size: 24upx;
				line-height: 32upx;
				bottom: 20upx;
			}
		}
	}
}
</style>
