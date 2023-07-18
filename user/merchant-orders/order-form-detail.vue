<template>
	<view v-if="data" class="order-detail">
		<JHeader width="50" height="50" title="商家订单详情"></JHeader>

		<!-- 订单信息 -->
		<view class="order-info">
			<view class="view-order-status" :style="{ 'color': bg }">
				{{ data.orderInfo.orderStatusText }}
			</view>

			<!-- 有商城或本地的商品 -->
			<view v-if="(data.orderInfo.orderType === 0) || (data.orderInfo.orderType === 1)">
				<view style="margin-bottom: 16upx;font-size: 30upx;font-weight: bold;">{{ data.orderInfo.address }}</view>
				<view style="display: flex;flex-wrap: wrap;margin-bottom: 20upx;font-size: 28upx;color: #8D8D8D;">
					<view>收货人：</view>
					<view>{{ `${data.orderInfo.consignee} ${data.orderInfo.mobile}` }}</view>
				</view>
			</view>
			<!-- 只有预约的商品 -->
			<view v-else-if="data.orderInfo.orderType === 2">
				<view style="margin-bottom: 20upx;font-size: 30upx;font-weight: bold;">提货地址：{{ data.orderInfo.brandName }}</view>
			</view>

			<view class="goods-info">
				<view style="font-weight: bold;">商品信息</view>
				<view
					v-for="item in data.orderGoods" :key="item.id"
					style="border-bottom: 1upx dotted #ccc; padding-bottom: 20upx"
				>
					<view v-if="commentGoodsId ? item.id == commentGoodsId : true" class="goods-item">
						<image :src="common.seamingImgUrl(item.picUrl)" class="goods-img" mode="" />
						<view class="goods-info-content">
							<view class="goods-name">{{ item.goodsName }}</view>
							<view class="sp">{{ item.specifications | fomatSp }}</view>
							<view class="goods-price">
								<text style="font-size: 24upx;">￥</text>
								<text>{{ item.price }}</text>
							</view>
						</view>
						<view class="goods-number">x{{ item.number }}</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 详细信息 -->
		<view class="detail-info pane">
			<view class="detail-info-title">订单信息</view>
			<view class="line">
				<view class="title">商品总额</view>
				<view class="text" style="color: red">
					<text style="font-size: 24upx;">￥</text>
					<text>{{ data.orderInfo.goodsPrice }}</text>
				</view>
			</view>
			<view class="line">
				<view class="title">实付款</view>
				<view class="text" style="color: red">
					<text style="font-size: 24upx;">￥</text>
					<text>{{ data.orderInfo.actualPrice }}</text>
				</view>
			</view>
			<view class="line">
				<view class="title">下单时间</view>
				<view class="text">{{ data.orderInfo.addTime }}</view>
			</view>
			<view class="line">
				<view class="title">订单编号</view>
				<view class="text">
					<text>{{ data.orderInfo.orderSn }}</text>
					<text style="margin-left: 12upx;color: #0061C8;" @click="$copy(data.orderInfo.orderSn)">复制</text>
				</view>
			</view>
			<view class="line">
				<view class="title">备注</view>
				<view class="text">{{ data.orderInfo.message || '无备注' }}</view>
			</view>
			<view class="line">
				<view class="title">交易号</view>
				<view class="text">
					<text>{{ data.orderInfo.id || '--' }}</text>
					<text style="margin-left: 12upx;color: #0061C8;" @click="$copy(data.orderInfo.id)">复制</text>
				</view>
			</view>
			<view class="line">
				<view class="title">遇到问题</view>
				<view class="text" style="display: flex;" @click="go('/user/sever/customer-service/customer-service')">
					<BeeIcon src="../../static/images/icon/kefu.png" :size="20"></BeeIcon>
					<text style="margin-left: 16upx;">联系客服</text>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
import { getOrderDetailApi } from '../../api/order'
import { getUserId } from '../../utils'

export default {
	name: 'OrderFormDetail',
	filters: {
		fomatSp(value) {
			let str = ''
			for (const item of value) {
				str += item + ', '
			}
			return str.substr(0, str.length - 2)
		}
	},
	data() {
		return {
			orderId: null,
			data: null,
			commentGoodsId: null,
			evForm: {
				userId: getUserId(),
				star: 5,
				content: '',
				hasPicture: true,
				picUrls: []
			}
		}
	},

	onLoad(options) {
		this.orderId = options.id
		this.commentGoodsId = options.goodsId
		this.getOrderDetail()
	},

	computed: {
		bg() {
			const data = {
				'已取消(系统)': '#959595'
			}
			return data[this.data.orderInfo.orderStatusText]
		}
	},

	methods: {
		// 获取订单详情
		getOrderDetail() {
			uni.showLoading()
			getOrderDetailApi({
				userId: getUserId(),
				orderId: this.orderId
			}).then(({ data }) => {
				this.data = data
				console.log(data)
			})
			uni.hideLoading()
		}
	}
}
</script>

<style lang="less" scoped>
.order-detail {
	width: 100%;
	min-height: 100vh;
	background-color: #ffffff;
	padding-bottom: 110upx;
	// box-sizing: border-box;

	/deep/ .j-header-container {
		padding: 20upx;
		box-sizing: border-box;
	}

	.pane {
		padding: 40upx;
		box-sizing: border-box;
		background-color: #fff;
	}

	.order-info {
		padding: 20upx 40upx;

		.view-order-status {
			display: flex;
			align-items: center;
			margin-bottom: 20upx;
			box-sizing: border-box;
			// background-image: linear-gradient(to right, #fa5151, #fddbdb);
			color: #FF0000;
			font-size: 34upx;
			font-weight: bold;

			.j-icon {
				margin-right: 20upx;
			}
		}

		.goods-info {
			padding: 20upx 0;

			.goods-item {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-top: 30upx;

				.goods-img {
					width: 126upx;
					height: 126upx;
					border-radius: 12upx;
					margin-right: 20upx;
				}

				.goods-info-content {
					flex: 1;
					font-size: 24upx;
					color: #3d3d3d;

					.goods-name {
						font-size: 28upx;
						font-weight: bold;
						width: 380upx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.sp {
						margin: 8upx 0 10upx;
					}

					.goods-price {
						font-size: 28upx;
						color: #FA5151;
					}
				}
			}
		}
	}

	.detail-info {
		margin-top: 20upx;

		.detail-info-title {
			font-weight: bold;
			margin-bottom: 10upx;
		}

		.line {
			display: flex;
			justify-content: space-between;
			font-size: 28upx;
			padding: 16upx 0 16upx 12upx;

			.title {
				min-width: 142upx;
				color: #3d3d3d;
				text-align: justify;
				text-align-last: justify;
			}

			.text {
				font-weight: bold;
			}
		}
	}

}
</style>
