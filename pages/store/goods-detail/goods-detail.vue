<template>
	<view v-if="goodsDetail" class="goods-detail-container">

		<!-- 图片区域 -->
		<view class="top-image-wrapper">
			<BeeSwiper
				height="540rpx" :list="goodsDetail.info.gallery.map(item => common.seamingImgUrl(item))" mode="aspectFit"
				@click="handlePreviewImg"
			></BeeSwiper>

			<view class="header-tool">
				<BeeBack>
					<BeeIcon :size="24" color="#fff" name="arrowleft"></BeeIcon>
				</BeeBack>

				<view class="share-container" @click="isMoreFunction = true">
					<BeeIcon :size="24" :src="require('../../../static/brand/detail/share.png')"></BeeIcon>
				</view>
			</view>
		</view>

		<!-- 商品详情 -->
		<view class="goods-pane">
			<view class="goods-name">{{ goodsDetail.info.name }}</view>
			<view class="price-wrapper">
				<text class="icon">￥</text>
				<view class="current-price">
					{{ goodsDetail.info.retailPrice }} <text v-if="goodsDetail.info.unit">
						/ {{
							goodsDetail.info.unit
						}}
					</text>
				</view>
				<!-- <view class="old-price">￥89</view>
					<view class="tag">8.8折</view> -->
			</view>

			<view class="item">
				<view class="item-title">服务</view>
				<view class="item-value"> 随时退·过期自动退·免预约 <text class="salse-number">已售{{ goodsDetail.info.sales }}份</text></view>
			</view>

			<view class="item">
				<view class="item-title">须知</view>
				<view class="item-value"> 有效期30天·单次最多可用2张</view>
			</view>
		</view>

		<view class="other-container">
			<!-- 评价 -->
			<!-- <Evaluate :data="goodsDetail"></Evaluate> -->
			<CommentCard ref="refCommentCard" :goods-id="goodsId" background-color="#ffffff"></CommentCard>

			<!-- 宝贝详情 -->
			<view v-if="goodsDetail.info.detail" id="goods-detail" class="goods-detail">
				<text>宝贝详情</text>
			</view>

			<UParse v-if="goodsDetail.info.detail" :content="goodsInfoDetail"></UParse>

			<!-- 详情 -->

			<!-- 推荐 -->
			<RecommendPane :data="recommendGoods"></RecommendPane>
		</view>

		<!-- 更多地点推荐 -->
		<RecommendCity :data="recommendBrandList"></RecommendCity>

		<!-- 底部操作栏 -->
		<OpFooter
			v-if="orderType"
			:btn-text="orderType === '2' ? '立即预约' : grouponRulesId && !grouponLinkId ? '发起团购' : grouponRulesId && grouponLinkId ? '加入团购' : ''"
			:total-price="goodsDetail.info.retailPrice" @pay="handlePay" @add="handleAdd"
		></OpFooter>

		<JSpecification ref="specificationRef" v-model="showSpecification" :data="goodsDetail" :bottom="120"></JSpecification>
		<MoreFunctions v-if="isMoreFunction" :goods-id="goodsId" @clossMore="_clossMore"></MoreFunctions>
	</view>
</template>

<script>
import MoreFunctions from '@/components/MoreFunctions/MoreFunctions.vue'
// import Evaluate from './cpns/Evaluate.vue'
import RecommendPane from './cpns/RecommendPane'
import RecommendCity from './cpns/RecommendCity.vue'
import OpFooter from './cpns/OpFooter.vue'
import uParse from '../../../components/u-parse/u-parse.vue'
import { marked } from 'marked'
import { getMoreGoodsApi, getMoreCityRecommendApi } from '../../../api/brand'
import { getGoodsDetailApi, addShopCarApi } from '../../../api/goods'
import { J_ONE_PAY_GOODS, J_RESERVATION_PAY_GOODS } from '../../../constant'

export default {
	name: 'GoodsDetail',
	components: { RecommendPane, RecommendCity, OpFooter, UParse: uParse, MoreFunctions },
	data() {
		return {
			orderType: '',
			goodsId: null,
			goodsDetail: null,
			recommendGoods: [],
			recommendBrandList: [],
			spData: [],
			showSpecification: false,
			grouponRulesId: '',
			grouponLinkId: '',
			distributionId: '',
			isMoreFunction: false
		}
	},
	onLoad(options) {
		this.goodsId = options.goodsId
		this.grouponRulesId = options.rulesId || ''
		this.grouponLinkId = options.linkId || ''
		this.distributionId = options.distributionId || ''
		this.orderType = options.orderType || ''
		this.getGoodsDetail()
	},

	computed: {
		goodsInfoDetail() {
			return this.goodsDetail.info.detail
				? marked(this.goodsDetail.info.detail)
				: ''
		}
	},

	methods: {
		// 获取门店详情
		async getGoodsDetail() {
			const { data } = await getGoodsDetailApi(
				this.goodsId,
				this.userId
			)
			this.goodsDetail = data
			this.spData = {
				info: {
					name: data.name,
					unit: data.unit,
					picUrl: data.picUrl
				},
				productList: data.productList,
				specificationList: data.specificationList
			}
			console.log(data)
			this.getMoreGoods()
			this.getMoreCityRecommend()
		},

		// 获取本店更多推荐
		async getMoreGoods() {
			const { data } = await getMoreGoodsApi({
				brandId: this.goodsDetail.brand.id,
				goodsId: this.goodsId
			})

			this.recommendGoods = data.slice(0, 10)
			console.log(this.recommendGoods)
		},

		// 更多地点推荐
		async getMoreCityRecommend() {
			const { data } = await getMoreCityRecommendApi({
				longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
				latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
			})

			this.recommendBrandList = data.filter((item) => item.goods && item.id !== this.goodsDetail.brandId)
			console.log(data)
		},

		// 预览图片
		handlePreviewImg(item) {
			uni.previewImage({
				urls: [ item ]
			})
		},

		// 点击支付
		async handlePay() {
			const goodsInfo = await this.getSpacification()
			if (this.orderType == 1) {
				uni.setStorageSync(J_ONE_PAY_GOODS, {
					currentGoodsImg: goodsInfo.product.url || this.goodsDetail.info.picUrl,
					currentSpecification: goodsInfo.spStr,
					currentPrice: goodsInfo.product.price,
					number: goodsInfo.number,
					status: 0,
					...this.goodsDetail,
					selectedProduct: goodsInfo,
					brandId: this.goodsDetail.brand.id
				})
				this.go(`/pages/store/order-detail/order-detail?orderType=${this.orderType}&rulesId=${this.grouponRulesId}&linkId=${this.grouponLinkId}&distributionId=${this.distributionId}`)
			} else if (this.orderType == 2) {
				if (!this.goodsDetail || !this.goodsDetail.info || !this.goodsDetail.brand) return this.$showToast('缺少商品信息')
				uni.setStorageSync(J_RESERVATION_PAY_GOODS, {
					cardsInfo: [ {
						brandCartgoods: [ {
							brandId: this.goodsDetail.brand.id,
							goodsId: goodsInfo.product.goodsId,
							goodsName: this.goodsDetail.info.name,
							goodsSn: this.goodsDetail.info.goodsSn,
							number: goodsInfo.number,
							picUrl: goodsInfo.product.url,
							productId: goodsInfo.product.id,
							price: goodsInfo.product.price,
							specifications: goodsInfo.product.price.specifications,
							brandName: this.goodsDetail.brand.name
						} ],
						brandId: this.goodsDetail.brand.id,
						brandName: this.goodsDetail.brand.name
					} ],
					pay: goodsInfo.product.price * goodsInfo.number
				})
				this.go('/user/otherServe/pay-reservation/index')
			}
		},

		// 点击加入
		async handleAdd() {
			console.log(this.goodsDetail)
			try {
				// const { data } = await getGoodsDetailApi(
				// 	this.goodsDetail.info.id,
				// 	this.userId
				// )
				if (this.goodsDetail.productList[0].goodsId) {
					await addShopCarApi({
						'userId': this.userId,
						'brandId': this.goodsDetail.info.brandId,
						'goodsId': this.goodsDetail.info.id,
						'checked': 1,
						'number': 1,
						'productId': this.goodsDetail.productList[0].id,
						'type': this.orderType,
						'distributionId': this.distributionId
					})
					this.$showToast('购物车添加成功')
				} else {
					this.$showToast('商品参数出错，无法添加！')
				}
			} catch (error) {
				console.log(error)
			}
		},

		// 获取商品规格参数
		getSpacification() {
			return new Promise((resolve, reject) => {
				if (this.showSpecification) {
					const goodsInfo = this.$refs.specificationRef.getVal()
					if (goodsInfo.number > goodsInfo.product.number) {
						this.$showToast('该货品库存为' + goodsInfo.product.number)
						reject()
					}
					resolve(goodsInfo)
				} else {
					this.showSpecification = true
				}
			})
		},
		_clossMore() {
			this.isMoreFunction = false
		}
	}
}
</script>

<style lang="less" scoped>
.goods-detail-container {
	width: 100%;
	min-height: 100vh;
	background-color: #f6f6f6;
	padding-bottom: 100upx;

	.top-image-wrapper {
		position: relative;
		width: 100%;
		height: 540upx;

		image {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}

		.header-tool {
			top: 30upx;
			position: absolute;
			display: flex;
			align-items: center;
			justify-content: space-between;
			width: 100%;
			padding-right: 60upx;
			padding-left: 18upx;
			box-sizing: border-box;
		}
	}

	.goods-pane {
		padding: 34upx 44upx;
		background-color: #fff;
		box-sizing: border-box;

		.goods-name {
			font-size: 40upx;
			font-weight: bold;
		}

		.price-wrapper {
			display: flex;
			align-items: center;

			.icon {
				color: #FA5151;
				font-size: 28upx;
				font-weight: 500;
			}

			.current-price {
				position: relative;
				top: -4upx;
				font-size: 48upx;
				color: #FA5151;
				font-weight: 500;
			}

			.old-price {
				color: #777;
				font-size: 24upx;
				text-decoration: line-through;
				margin: 0 12upx 0 8upx;
			}

			.tag {
				background-color: #FCDBDB;
				font-size: 20upx;
				line-height: 1.5;
				color: red;
				padding: 2upx 8upx;
			}
		}

		.item {
			display: flex;
			align-items: center;
			color: #999999;
			font-size: 24upx;
			margin-top: 8upx;

			.item-title {
				margin-right: 12upx;
				flex-shrink: 0;
			}

			.salse-number {
				margin-left: 140upx;
			}
		}
	}

	.other-container {
		padding: 0 20upx;
		box-sizing: border-box;

		/deep/ .pane-wrapper {
			padding: 32upx 24upx;
			box-sizing: border-box;
			background-color: #fff;
			border-radius: 20upx;
			margin-top: 30upx;
		}
	}

}

.goods-detail {
	position: relative;
	width: 100%;
	height: 65upx;
	background-color: #f1f2f6;
	display: flex;
	justify-content: center;
	align-items: center;

	text {
		position: relative;
		z-index: 2;
		background-color: #f1f2f6;
		padding: 0 4px;
	}

	&::after {
		content: "";
		position: absolute;
		width: 400upx;
		height: 1upx;
		background-color: #d8d8d8;
		top: 50%;
		z-index: 1;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}

.recommd-container {
	.goods-detail {
		text {
			color: #e95d20;
		}

		&::after {
			background-color: #e95d20;
		}
	}
}
</style>
