<template>
	<view class="j-specification-screen">

		<tui-landscape
			:show="showSpecification" :position="1" :mask-closable="true" icon-left="50rpx"
			icon-right="50rpx"
			@close="showSpecification = false"
		>
			<view
				style="position: relative;width: 600upx;max-height: 75vh;padding: 46upx 46upx 0;box-sizing: border-box;overflow-y: auto;background-color: #ffffff;border-radius: 40upx;"
			>
				<view v-if="product" style="display: flex;align-items: center;">
					<image
						style="width: 180upx;height: 180upx;"
						:src="common.seamingImgUrl((product && product.url) || goodsDetail.info.picUrl)" mode=""
					/>
					<view
						style="flex: 1;margin-left: 40upx;word-break: break-all;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
					>
						<text style="font-size: 34upx;font-weight: bold;">{{ goodsDetail.info.name }}</text>
					</view>
				</view>
				<view v-if="goodsDetail.specificationList">
					<view v-for="item in goodsDetail.specificationList" :key="item.name" style="margin-top: 20upx;">
						<view style="font-size: 26upx;color: #a5a4a4;">{{ item.name }}</view>
						<view style="display: flex;flex-wrap: wrap;margin-top: 10upx;font-size: 28upx;">
							<view
								v-for="tag in item.valueList" :key="tag.id"
								style="width: fit-content;padding: 6upx 28upx;margin-right: 20upx;border-radius: 20upx;" :style="{
									border: sps[item.name] == tag.value ? '1upx solid #ffbd87' : '1upx solid #c2c2c2',
									backgroundColor: sps[item.name] == tag.value ? '#fffce3' : 'transparent'
								}" @click="handleChoose(item.name, tag)"
							>
								{{ tag.value }}
							</view>
						</view>
					</view>
				</view>
				<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 20upx;">
					<view>数量</view>
					<view>
						<uni-number-box v-model="number" :min="1" :max="maxNumber"></uni-number-box>
					</view>
				</view>
				<view style="position: sticky;bottom: 0;margin-top: 40upx;padding-bottom: 20upx;background-color: #ffffff;">
					<view style="padding: 12upx 46upx;margin: 0 -46upx;font-size: 28upx;color: #868686;background-color: #efefef;">
						<text>已选规格：</text>
						<text>{{ spStr }}</text>
					</view>
					<view style="display: flex;justify-content: space-between;align-items: center;margin-top: 20upx;">
						<view>
							<view v-if="product">
								<text style="font-size: 28upx;">总计</text>
								<text style="margin-left: 10upx;font-size: 38upx;color: #ff0505;">￥{{ product.price * number }}</text>
							</view>
						</view>
						<view>
							<view v-if="!showSelectBtn">
								<tui-button
									type="danger" width="240rpx" height="64rpx" margin="0 10rpx 0 0"
									style="border-radius: 14rpx;"
									@click="addShopCar"
								>
									{{ btnText || '+ 加入购物车' }}
								</tui-button>
							</view>
							<view v-else>
								<tui-button
									type="danger" width="240rpx" height="64rpx" margin="0 10rpx 0 0"
									style="border-radius: 14rpx;"
									@click="handleClickBtn"
								>
									{{ btnText }}
								</tui-button>
							</view>
						</view>
					</view>
				</view>
			</view>
		</tui-landscape>
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import { getGoodsDetailApi, addShopCarApi } from '../../api/goods'
import { getUserId } from '../../utils'
export default {
	name: 'JSpecificationScreen',
	props: {
		// goodsId: {
		// 	type: [Number, String],
		// 	required: true
		// },
		data: {
			type: Object
		},
		orderType: {
			type: [Number, String],
			default: ''
		},
		maxNumber: {
			type: Number,
			default: 100
		},
		showSelectBtn: {
			type: Boolean,
			default: false
		},
		showSuccessToast: {
			type: Boolean,
			default: true
		},
		btnText: {
			type: String,
			default: ''
		}
	},

	data() {
		return {
			showSpecification: false,
			goodsDetail: {},
			number: 1,
			sps: {},
			spStr: '请选择商品规格',
			product: null

		}
	},

	computed: {

	},

	watch: {
		number() {
			this.getSpStr()
		}
	},

	methods: {
		async open(goodsId) {
			uni.showLoading()
			this.goodsDetail = {}
			this.number = 1
			this.sps = {}
			this.spStr = '请选择商品规格'
			this.product = null
			let data
			if (this.data && this.data.info) {
				data = this.data
			} else {
				const res = await getGoodsDetailApi(
					// goodsInfo.id,
					goodsId,
					getUserId()
				)
				data = res.data
			}
			uni.hideLoading()
			this.goodsDetail = data
			console.log(data)
			for (const sp of data.specificationList) {
				this.sps[sp.name] = sp.valueList[0].value
			}
			this.getSpStr()
			this.product = this.getProduct()
			this.showSpecification = true
		},

		// 添加购物车
		async addShopCar(goodsInfo) {
			if (this.isLogin()) {
				try {
					if (this.showSpecification) {
						const tempGoodsInfo = {
							number: this.number,
							product: this.product,
							spStr: this.spStr
						}
						if (tempGoodsInfo.number > tempGoodsInfo.product.number) {
							this.$showToast('该货品库存为' + tempGoodsInfo.product.number)
							return
						}
						if (tempGoodsInfo.product.goodsId) {
							await addShopCarApi({
								'userId': getUserId(),
								'brandId': this.goodsDetail.info.brandId,
								'goodsId': this.goodsDetail.info.id, // tempGoodsInfo.product.goodsId一样的
								'checked': 1,
								'number': tempGoodsInfo.number,
								'productId': tempGoodsInfo.product.id,
								'type': this.orderType
							})
							if (this.showSuccessToast) this.ttoast('购物车添加成功')
							this.showSpecification = false
							this.$emit('success')
						} else {
							this.ttoast('商品参数出错，无法添加！')
						}
					} else {
						this.$showToast('请先开启规格弹窗显示')
						// console.log(goodsInfo)
						// if (data.productList[0].goodsId) {
						// 	await addShopCarApi({
						// 		'userId': this.userId,
						// 		'brandId': goodsInfo.brandId,
						// 		'goodsId': goodsInfo.id,
						// 		'checked': 1,
						// 		'number': 1,
						// 		'productId': data.productList[0].id,
						// 		'type': this.orderType
						// 	})
						// 	this.ttoast('购物车添加成功')
						// } else {
						// 	this.ttoast('商品参数出错，无法添加！')
						// }
					}
				} catch (error) {
					console.log(error)
					// this.ttoast({
					// 	type: 'fail',
					// 	title: '添加失败'
					// })
				}
			} else {
				this.$data._isShowTuiModel = true
			}
		},

		// 选择
		handleClickBtn() {
			if (this.showSpecification) {
				const tempGoodsInfo = {
					number: this.number,
					product: this.product,
					spStr: this.spStr
				}
				if (tempGoodsInfo.number > tempGoodsInfo.product.number) {
					this.$showToast('该货品库存为' + tempGoodsInfo.product.number)
					return
				}
				if (tempGoodsInfo.product.goodsId) {
					this.$emit('select', {
						'brandId': this.goodsDetail.info.brandId,
						'goodsId': this.goodsDetail.info.id,
						'number': tempGoodsInfo.number,
						'productId': tempGoodsInfo.product.id,
						'brandName': this.goodsDetail.brand.name,
						'goodsName': this.goodsDetail.info.name,
						'goodsSn': this.goodsDetail.info.goodsSn,
						'price': tempGoodsInfo.product.price,
						'picUrl': tempGoodsInfo.product.url,
						'specifications': tempGoodsInfo.product.specifications,
						'spStr': tempGoodsInfo.spStr,
						'pay': tempGoodsInfo.product.price * tempGoodsInfo.number
					})
					this.showSpecification = false
				} else {
					this.ttoast('商品参数出错！')
				}
			} else {
				this.$showToast('请先开启规格弹窗显示')
			}
		},

		// 点击选择
		handleChoose(name, tag) {
			this.sps[name] = tag.value
			this.getSpStr()
			this.product = this.getProduct()
			this.$forceUpdate()
		},

		// 获取规格字符串
		getSpStr() {
			let str = ''
			for (const sp in this.sps) {
				str += this.sps[sp] + '，'
			}
			this.spStr = str + this.number + this.goodsDetail.info.unit
		},

		// 获取product
		getProduct() {
			let currentProduct = null
			this.goodsDetail.productList.forEach((item) => {
				let tag = true
				for (const sp in this.sps) {
					if (!item.specifications.includes(this.sps[sp])) {
						tag = false
						break
					}
				}
				if (tag) {
					currentProduct = item
				}
			})
			return currentProduct || this.goodsDetail.productList[0]
		}

	}
}
</script>

<style lang="less" scoped>
.j-specification-screen {
}
</style>
