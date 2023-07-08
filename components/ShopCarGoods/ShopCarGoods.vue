<template>
	<view class="goods-pane">
		<JAvatar radius="10" :size="120" :src="common.seamingImgUrl(goods.picUrl)"></JAvatar>
		<view class="goods-pane-right">
			<view class="goods-pane-name">{{ goods.goodsName.trim() }} </view>
			<view class="goods-pane-desc-content">
				<text class="goods-pane-desc">
					{{
						goods.specifications | getDesc
					}}
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
		width: 100%;
		margin-left: 30upx;
		font-size: 24upx;
		color: #000000;

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
			display: flex;
			justify-content: space-between;
			align-items: center;

			.goods-pane-price {
				color: #fa5151;
				font-size: 28upx;
			}

			.ops {
				width: 168upx;
				height: 40upx;
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
