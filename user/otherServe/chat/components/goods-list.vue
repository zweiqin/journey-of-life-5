<template>
	<view
		v-if="shopCarInfo && shopCarInfo.brandCartgoods" class="goods-container" :style="{
			background: shopCarInfo.brandCartgoods.length
				? 'rgb(239, 239, 239)'
				: '#fff'
		}"
	>
		<view style="width: 100%;display: flex;justify-content: center;">
			<tui-tabs
				style="width: 686upx;padding: 0 0upx 0 0upx;overflow: hidden;" :slider-width="105" :padding="32"
				item-width="229rpx" selected-color="#000000" bold slider-bg-color="#ff0000"
				:tabs="[{ name: '巨蜂自营' }, { name: '本地生活' }, { name: '预约' }]" :current-tab="currentTab"
				@change="handleSwitchTab"
			></tui-tabs>
		</view>

		<scroll-view v-if="shopCarInfo.brandCartgoods.length" class="scroll-wrapper" scroll-y="true">
			<view v-for="data in shopCarInfo.brandCartgoods" v-if="data" :key="data.brandId" class="goods-pane">
				<view class="brand">
					<view class="brand-info">
						<text class="brand-name">{{ data.brandName }}</text>
					</view>
					<view class="goods-list">
						<view v-for="goods in data.cartList" :key="goods.id" class="item">
							<view class="goods-info">
								<image class="goods-image" :src="common.seamingImgUrl(goods.picUrl)"></image>

								<view class="goods-wrapper">
									<navigator url="">
										<view class="goods-name">{{ goods.goodsName }}</view>
									</navigator>
									<view class="selected-star">{{ goods.specifications[0] }} x {{ goods.number }}</view>
									<view class="goods-op">
										<view class="goods-price">￥{{ goods.price }}</view>
										<button
											:style="{
												background: '#FFC117'
											}" class="uni-btn" @click="handleOpGoods(goods)"
										>
											发送
										</button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>

		</scroll-view>

		<JNoData v-else type="order-shop"></JNoData>
	</view>
</template>

<script>
import {
	getShopCarListApi
} from '../../../../api/cart'
import { getUserId } from '../../../../utils'
export default {
	components: {},
	data() {
		return {
			shopCarInfo: { brandCartgoods: [] },
			currentTab: 0
		}
	},
	computed: {},
	created() {
		this.getShopList()
	},
	methods: {
		handleSwitchTab(e) {
			this.currentTab = e.index
			this.shopCarInfo = { brandCartgoods: [] }
			this.getShopList()
		},
		// 获取购物车列表
		getShopList() {
			this.loadingStatus = 'loading'
			getShopCarListApi({
				userId: getUserId(),
				type: this.currentTab
			})
				.then(({ data }) => {
					this.shopCarInfo = data.brandCartgoods ? data : { brandCartgoods: [] }
					uni.hideLoading()
					this.loadingStatus = 'noMore'
				})
				.catch(() => {
					uni.hideLoading()
					this.loadingStatus = 'noMore'
				})
		},
		// 点击操作按钮
		handleOpGoods(goods) {
			console.log(goods)
			this.$emit('send', { meaning: 'goods', msg: { id: goods.id, goodsSn: goods.goodsSn || '', goodsName: goods.goodsName || '' } })
		}
	}
}
</script>

<style lang="less" scoped>
.goods-container {
	flex: 1;
	// background-color: rgb(239, 239, 239);
	box-sizing: border-box;
	padding: 10upx;
	// background-color: #fff;

	.tui-tabs-view {
		/deep/ .tui-tabs-slider {
			margin-left: -32upx;
		}
	}

	.scroll-wrapper {
		height: calc(100vh - 240upx);
	}
}

@import '../../../../style/mixin.less';

.goods-pane {
	box-sizing: border-box;
	background-color: #fff;
	width: 99%;
	padding: 20upx;
	margin: 20upx auto;
	border-bottom: 1upx solid #ccc;
	border-radius: 20upx;

	.brand {
		&-info {
			.h-flex(flex-start);
			margin-bottom: 30upx;
		}

		&-name {
			font-size: 28upx;
			margin: 0 32upx;
			font-weight: 500;
			color: #605D52;
		}
	}

	.goods-list {
		.item {
			margin-bottom: 30upx;
			.h-flex(flex-start);

			.goods-info {
				.h-flex(flex-start);
				flex: 1;

				.goods-name {
					color: #3A3629;
					font-size: 28upx;
					// font-weight: 500;
				}

				.selected-star {
					font-size: 24upx;
					color: #8F8D85;
					line-height: 2;
					margin: 20upx 0 30upx 0;
					width: 420upx;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					border-radius: 24upx;
					background: #F1F1F0;
					text-indent: 0.8em;
				}

				.goods-image {
					width: 168upx;
					height: 168upx;
					object-fit: cover;
					border-radius: 10upx;
					flex-direction: 0;
					margin: 0 22upx 0 26upx;
				}

				.goods-wrapper {
					flex: 1;
				}

				.goods-op {
					.h-flex(space-between);

					.goods-price {
						color: #fa5151;
						font-size: 28upx;
						font-weight: 500;
						color: #141000;
					}

					.uni-btn {
						border: 1upx solid #3d3d3d;
						padding: 0 28upx;
						color: #3d3d3d;
						line-height: 2.5;
						font-size: 28upx;
						margin-left: 30upx;
					}
				}
			}
		}
	}
}
</style>
