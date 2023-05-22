<template>
	<view class="shop-car-container">

		<scroll-view
			refresher-enabled refresher-background="#3f3d3d" :scroll-y="true" style="height: 100%;"
			scroll-with-animation @scrolltolower="handleScrolltolower"
		>
			<view class="shop-list">
				<view class="shop-car-list">

					<view class="shop-goods-list">
						<view v-for="(item, index) in goodsList" :key="item.id" class="goods-item">
							<JAvatar radius="10" :size="120" :src="item.picUrl"></JAvatar>

							<view class="goods-pane-right">
								<view class="goods-pane-name">{{ item.name.trim() }} </view>
								<view class="goods-pane-desc-content">
									<text class="goods-pane-desc">
										商品编号：{{ item.goodsSn }}
									</text>
								</view>
								<view class="goods-pane-footer">
									<text class="goods-pane-price">￥{{ item.retailPrice }}</text>
									<view class="ops">
										<tui-button type="warning" width="120rpx" height="50rpx" shape="circle" @click="handleChooseGoods(item)">选择</tui-button>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>

				<LoadMore v-show="goodsList.length" :status="status"></LoadMore>
				<view v-if="goodsList && !goodsList.length && loadingStatus !== 'loading'" class="no-data">
					暂无商品，快去添加吧~
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
// import {
// 	getgoodsListApi
// } from '../../../../api/cart'
import {
	goodsListApi
} from '../../../../api/goods'
import { getUserId, getBrandId } from '../../../../utils'

export default {
	name: 'GoodsList',
	components: {},

	data() {
		return {
			opList: [],
			goodsList: [],
			carTotalInfo: [],
			query: {
				page: 1,
				size: 10,
				brandId: getBrandId()
			},
			totalPages: 0,
			status: 'none',
			loadingStatus: 'noMore',
			isChangeNumber: false,
			opGoodsList: []
		}
	},

	computed: { },

	created() {
		this.getGoodsList()
	},

	methods: {
		// 获取商品列表
		getGoodsList(isLoadmore) {
			this.status = 'loading'
			this.loadingStatus = 'loading'
			if (!getBrandId()) return
			goodsListApi(this.query)
				.then(({ data }) => {
					this.totalPages = data.totalPages
					if (isLoadmore) {
						this.goodsList.push(...data.goodsList)
					} else {
						this.goodsList = data.goodsList
					}
					uni.hideLoading()
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
				.catch(() => {
					uni.hideLoading()
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
		},

		handleScrolltolower(e) {
			if (this.query.page >= this.totalPages) {
				this.status = 'no-more'
				return
			}
			if (this.query.size > this.goodsList.length) {
				return
			}
			this.query.page++
			this.getGoodsList(true)
		},

		// 选择
		handleChooseGoods(goods) {
			this.$emit('send', { goodsId: goods.id, goodsName: goods.name || '' })
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../../../style/mixin.less";
@import "../../../../style/var.less";

.shop-car-container {
	height: 100%;
	padding: 32upx 32upx;
	box-sizing: border-box;

	.icon {
		width: 34upx;
		height: 34upx;
		flex-shrink: 0;
		margin-right: 24upx;
	}

	.shop-list {
		// height: 100%;
		// overflow-y: auto;

		.shop-car-list {
			margin-bottom: 20px;
		}

		.goods-item {
			.flex();
			box-sizing: border-box;
			margin-top: 30upx;

			.goods-pane-right {
				width: 100%;
				margin-left: 30upx;
				font-size: @f12;
				color: @c0;

				.goods-pane-name {
					width: 404upx;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
				}

				.goods-pane-desc-content {
					margin: 14upx 0 10upx 0;
				}

				.goods-pane-desc {
					font-size: 20upx;
					margin-right: 10upx;
				}

				.goods-pane-footer {
					.flex();

					.goods-pane-price {
						color: #fa5151;
						font-size: 28upx;
					}

					.ops {
						margin-right: 40rpx;
						background-color: #f5f5f5;
					}
				}
			}
		}

		.no-data {
			.flex(center, center);
			min-height: 180upx;
			color: #999999;
			font-size: 36upx;
			letter-spacing: 2px;
		}
	}
}
</style>
