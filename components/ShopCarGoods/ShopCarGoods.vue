<template>
	<view class="goods-pane">
		<JAvatar radius="10" :size="imgSize" :src="common.seamingImgUrl(goods.picUrl)"></JAvatar>
		<view class="goods-pane-right">
			<view class="goods-pane-name">{{ goods.goodsName.trim() }} </view>
			<view class="goods-pane-desc-content">
				<text class="goods-pane-desc">
					{{ goods.specifications | getDesc }}
				</text>
			</view>
			<view class="goods-pane-footer">
				<text class="goods-pane-price">￥{{ goods.price }}</text>
				<view class="ops">
					<text class="item" @click="handleChangeNumber(-1, goods, store)">
						-
					</text>
					<text class="item">{{ goods.number }}</text>
					<text class="item" @click="handleChangeNumber(+1, goods, store)">
						+
					</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
// import { xxx } from '../../utils'
import {
	updateShopCarCountApi,
	deleteShopCarGoodsApi
} from '../../api/cart'
import { getUserId } from '../../utils'
export default {
	name: 'ShopCarGoods',
	filters: {
		getDesc(specifications) {
			if (!specifications || !specifications.length) {
				return ''
			}
			let str = ''
			for (const item of specifications) {
				str += item + ' '
			}
			return str
		}
	},
	props: {
		goods: {
			type: Object,
			required: true
		},
		store: {
			type: Object,
			required: true
		},
		imgSize: {
			type: Number,
			default: 120
		}

	},

	data() {
		return {
			isChangeNumber: false
		}
	},

	methods: {
		// 购物车数量的添加
		handleChangeNumber(number, goods, store) {
			if (this.isChangeNumber) {
				this.$showToast('操作太快啦~')
				return
			}
			const _this = this
			this.isChangeNumber = true
			if (number === -1 && goods.number === 1) {
				uni.showModal({
					title: '提示',
					content: '是否将该商品移出购物车？',
					success(res) {
						if (res.confirm) {
							_this.deleteGoods([ goods.productId ], store)
						}
					}
				})
				_this.isChangeNumber = false
			} else {
				uni.showLoading()
				updateShopCarCountApi({
					userId: getUserId(),
					goodsId: goods.goodsId,
					productId: goods.productId,
					number: goods.number + number,
					id: goods.id
				})
					.then(() => {
						// _this.getShopList()
						_this.$emit('success')
						_this.isChangeNumber = false
						uni.hideLoading()
					})
					.catch(() => {
						this.$showToast('数量修改失败')
						_this.isChangeNumber = false
						uni.hideLoading()
					})
			}
		},

		// 删除购物车的商品
		deleteGoods(productIds) {
			deleteShopCarGoodsApi({
				productIds,
				userId: getUserId()
			}).then(() => {
				// this.getShopList()
				this.$emit('success')
			})
		}

	}
}
</script>

<style lang="less" scoped>
.goods-pane {
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;

	.goods-pane-right {
		flex: 1;
		width: 0;
		margin-left: 30upx;
		color: #000000;

		.goods-pane-name {
			font-size: 30upx;
			white-space: nowrap;
			text-overflow: ellipsis;
			overflow: hidden;
		}

		.goods-pane-desc-content {
			// width: fit-content;
			// min-width: 55vw;
			// max-width: 55vw;
			width: 82%;
			margin: 14upx 0 10upx 0;
			padding: 4upx 8upx;
			background-color: #f1f1f0;
			border-radius: 6upx;
		}

		.goods-pane-desc {
			margin-right: 10upx;
			font-size: 20upx;
			color: #8F8D85;
		}

		.goods-pane-footer {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-top: 18upx;

			.goods-pane-price {
				font-size: 32upx;
				font-weight: bold;
				color: #fa5151;
			}

			.ops {
				width: 168upx;
				height: 40upx;
				font-size: 24upx;
				background-color: #f5f5f5;
				display: flex;
				align-items: center;

				.item {
					flex: 1;
					text-align: center;
					line-height: 40upx;
					color: #000;

					&:not(:nth-child(2)) {
						font-size: 18px;
					}
				}
			}
		}
	}
}
</style>
