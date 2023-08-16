<template>
	<view class="shop-car-container">

		<scroll-view
			refresher-enabled refresher-background="#3f3d3d" scroll-y style="height: 100%;"
			scroll-with-animation
		>
			<!-- <view class="shop-list">
				<view class="shop-car-list">

				<view class="shop-goods-list">
				<view v-if="brandDetail.goodsVoList && brandDetail.goodsVoList.length">
				<view v-for="(item, index) in brandDetail.goodsVoList" :key="item.id" class="goods-item">
				<JAvatar radius="10" :size="120" :src="common.seamingImgUrl(item.picUrl)"></JAvatar>

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
				<view v-else>
				<tui-no-data>暂无数据</tui-no-data>
				</view>
				</view>
				</view>
				</view> -->
			<view class="store-goods-list-container">
				<view
					v-if="brandDetail.categoryList && brandDetail.categoryList.length"
					style="display: flex;box-sizing: border-box;"
				>
					<view style="background-color: #f3f3f3;">
						<view
							v-for="item in brandDetail.categoryList" :key="item.serverNameOne"
							style="max-width: 144upx;padding: 20upx 28upx;word-break: break-all;box-sizing: border-box;"
							:style="{ backgroundColor: item.id === currentTab ? '#ffffff' : 'transparent' }"
							@click="(currentTab = item.id) && (currentGoods = brandDetail.categoryList.find(part => part.id === item.id).goodsList || [])"
						>
							{{ item.name }}
						</view>
					</view>
					<view style="flex: 1;padding: 20upx;">
						<view v-if="currentGoods && currentGoods.length">
							<view v-for="item in currentGoods" :key="item.id">
								<StoreGoods :goods-data="item" :show-icon="false" :show-tag="false" :show-msg="false" show-sn>
									<template #button>
										<tui-button
											v-if="showSelectBtn" type="warning" width="120rpx" height="50rpx"
											shape="circle"
											@click="handleChooseGoods(item)"
										>
											选择
										</tui-button>
										<slot name="button" :data="item"></slot>
									</template>
								</StoreGoods>
							</view>
						</view>
						<view v-else style="margin: 40upx 0;text-align: center;">
							暂无商品~
						</view>
					</view>
				</view>
				<view v-else class="no-data">
					暂无数据
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
import {
	getBrandDetailApi
} from '../../api/brand'
import { getUserId } from '../../utils'

export default {
	name: 'BrandGoodsList',
	components: {},
	props: {
		showSelectBtn: {
			type: Boolean,
			default: true
		},
		brandId: {
			type: [String, Number],
			required: true
		}
	},

	data() {
		return {
			currentTab: '',
			currentGoods: [],
			brandDetail: {}
		}
	},

	computed: {},

	watch: {
		brandDetail: {
			handler(newVal) {
				if (newVal) {
					if (this.brandDetail.categoryList && this.brandDetail.categoryList.length) {
						(this.currentTab = this.brandDetail.categoryList[0].id) && (this.currentGoods = this.brandDetail.categoryList[0].goodsList || [])
					}
				}
			},
			immediate: true,
			deep: true
		}
	},

	created() {
		this.getGoodsList()
	},

	methods: {
		// 获取商品列表
		async getGoodsList() {
			if (!this.brandId) return
			uni.showLoading({
				title: '加载中'
			})
			const { data } = await getBrandDetailApi({
				id: this.brandId,
				longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
				latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1],
				userId: getUserId()
			})
			this.brandDetail = data || {}
			uni.hideLoading()
		},

		// 选择
		handleChooseGoods(goods) {
			// this.$emit('send', { goodsId: goods.id, goodsName: goods.name || '' })
			this.$emit('send', goods)
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
@import "../../style/var.less";

.shop-car-container {
	height: 100%;
	padding: 32upx 10upx;
	box-sizing: border-box;

	// .shop-list {
	// 	// height: 100%;
	// 	// overflow-y: auto;

	// 	.shop-car-list {
	// 		margin-bottom: 20px;
	// 	}

	// 	.goods-item {
	// 		.flex();
	// 		box-sizing: border-box;
	// 		margin-top: 30upx;

	// 		.goods-pane-right {
	// 			width: 100%;
	// 			margin-left: 30upx;
	// 			font-size: @f12;
	// 			color: @c0;

	// 			.goods-pane-name {
	// 				width: 404upx;
	// 				white-space: nowrap;
	// 				text-overflow: ellipsis;
	// 				overflow: hidden;
	// 			}

	// 			.goods-pane-desc-content {
	// 				margin: 14upx 0 10upx 0;
	// 			}

	// 			.goods-pane-desc {
	// 				font-size: 20upx;
	// 				margin-right: 10upx;
	// 			}

	// 			.goods-pane-footer {
	// 				.flex();

	// 				.goods-pane-price {
	// 					color: #fa5151;
	// 					font-size: 28upx;
	// 				}

	// 				.ops {
	// 					margin-right: 40rpx;
	// 					background-color: #f5f5f5;
	// 				}
	// 			}
	// 		}
	// 	}

	// 	.no-data {
	// 		.flex(center, center);
	// 		min-height: 180upx;
	// 		color: #999999;
	// 		font-size: 36upx;
	// 		letter-spacing: 2px;
	// 	}
	// }
	.store-goods-list-container {
		width: 100%;
		font-size: 32upx;

		.no-data {
			display: flex;
			align-items: center;
			justify-content: center;
			min-height: 200upx;
			color: #ccc;
			padding: 20upx 0;
			flex-direction: column;
		}
	}
}
</style>
