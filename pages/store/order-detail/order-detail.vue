<template>
	<view class="order-detail-container">
		<view class="order-detail-header">
			<BeeBack>
				<view class="title">
					<BeeIcon name="arrowleft" :size="24" color="#000000"></BeeIcon>
					<text class="title">订单详情</text>
				</view>
			</BeeBack>

			<!-- <BeeShare>
				<view class="share-container">
				<text>分享</text>
				<BeeIcon :size="20" :src="require('../../../static/brand/order-detail/share.png')"></BeeIcon>
				</view>
				</BeeShare> -->
		</view>

		<view class="pane f-s-b" @click="go('/user/site/site-manage?appoint=true')">
			<view v-if="startAddress.detailedAddress" class="address-text">{{ startAddress.detailedAddress }}</view>
			<view v-else class="address-text">请选择地址</view>
			<tui-icon :size="24" name="gps"></tui-icon>
		</view>

		<view class="order-main-area pane">
			<view class="goods-item">
				<BeeAvatar
					:size="60" radius="10upx"
					src="https://img0.baidu.com/it/u=833683927,1099936825&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1422"
				></BeeAvatar>
				<view class="good-detial">
					<view class="name">{{ goodsDetail.goodsName }}</view>
					<view class="font-12 f-c-77">已选：{{ goodsDetail.productInfo.product.specifications.join(',') }}</view>
					<view class="price-text">
						<view class="price-wrapper">
							<text class="current-price">￥{{ goodsDetail.productInfo.product.price }}</text>
							<!-- <text class="old-price">￥987</text> -->
						</view>
						<view class="op">
							<BeeIcon
								:size="22" :src="require('../../../static/brand/order-detail/jian.png')"
								@click="handleOpNumber(-1)"
							></BeeIcon>
							<text class="number">{{ goodsDetail.productInfo.number }}</text>
							<BeeIcon
								:size="22" :src="require('../../../static/brand/order-detail/add.png')"
								@click="handleOpNumber(+1)"
							></BeeIcon>
						</view>
					</view>
				</view>
			</view>
		</view>

		<!-- <view class="total pane">
			<view class="item">
			<view class="title">菜品数</view>
			<view class="value">菜品数</view>
			</view>
			<view class="item">
			<view class="title">菜品数</view>
			<view class="value">
			优惠劵 <BeeIcon name="arrowright"></BeeIcon>
			</view>
			</view>
			<view class="item no font-16">
			小计
			<text class="total-price font-16 p-color">
			￥987
			</text>
			</view>
			</view> -->

		<CouponUse :brand-id="goodsDetail.brandId" @choose="handleChooseCoupon"></CouponUse>

		<view class="footer-container f-s-b">
			<view class="finl-price">
				<text>
					实付
				</text>
				<text class="p-color">￥ <text style="font-size: 48upx;" class="f-w-500">{{ orderCost.actualPrice }}</text></text>
			</view>
			<button class="bee-btn r-5 f-w-500 f-center" @click="handleToPay">{{ grouponRulesId && !grouponLinkId ? '发起团购' : grouponRulesId && grouponLinkId ? '加入团购' : '提交订单' }}</button>
		</view>
	</view>
</template>

<script>
import { payShopCarApi, updateShopCarCountApi } from '../../../api/cart'
import { submitOrderApi, payOrderGoodsApi, firstAddCar } from '../../../api/goods'
import { getAddressListApi } from '../../../api/address'
import { J_SELECT_ADDRESS } from '../../../constant'

export default {
	name: 'OrderDetail',
	data() {
		return {
			goodsDetail: {},
			carId: null,
			orderCost: {},
			startAddress: {},
			couponId: 0,
			grouponRulesId: '',
			grouponLinkId: ''
		}
	},
	onLoad(options) {
		try {
			options.productInfo = JSON.parse(options.productInfo)
			this.grouponRulesId = options.rulesId || ''
			this.grouponLinkId = options.linkId || ''
		} catch (error) {
		}
		this.goodsDetail = options
		console.log(this.goodsDetail)
		this.addShopCar()
	},
	onShow() {
		this.getAddressList()
	},
	methods: {
		// 获取收货地址
		async getAddressList() {
			const address = uni.getStorageSync(J_SELECT_ADDRESS)
			if (address) {
				this.startAddress = address
				return
			}
			const { data } = await getAddressListApi({
				userId: this.userId
			})
			const _this = this
			data.forEach((address) => {
				if (address.isDefault) {
					_this.startAddress = address
				}
			})
			if (!this.startAddress) {
				this.startAddress = data[0]
			}
			this.startAddress = data[0] || {}
		},

		// 立即添加购物车
		async addShopCar() {
			const { data } = await firstAddCar({
				userId: this.userId,
				goodsId: this.goodsDetail.goodsId,
				productId: this.goodsDetail.productInfo.product.id,
				number: this.goodsDetail.productInfo.number
			})
			this.carId = data
			this.calcPrice()
		},

		// 修改数量
		async handleOpNumber(number) {
			if (number < 0 && this.goodsDetail.productInfo.number == 1) {
				return
			}
			this.goodsDetail.productInfo.number += number
			try {
				await updateShopCarCountApi({
					userId: this.userId,
					goodsId: this.goodsDetail.goodsId,
					productId: this.goodsDetail.productInfo.product.id,
					number: this.goodsDetail.productInfo.number,
					id: this.carId
				})
				this.calcPrice()
			} catch (error) {
				this.ttoast({
					title: '修改失败',
					type: 'fail'
				})
				this.goodsDetail.productInfo.number += -number
			}
		},

		handleChooseCoupon(item) {
			this.couponId = item.id
			this.calcPrice()
		},

		// 计算价格
		async calcPrice() {
			uni.showLoading({
				title: '加载中...'
			})
			const { data } = await payShopCarApi({
				useVoucher: false,
				brandId: this.goodsDetail.brandId,
				userId: this.userId,
				grouponRulesId: this.grouponRulesId,
				couponId: this.couponId,
				cartId: this.carId,
				number: this.goodsDetail.productInfo.number
			})
			uni.hideLoading()
			this.orderCost = data
		},

		// 提交订单支付
		handleToPay() {
			if (!this.startAddress.id) {
				this.ttoast({
					type: 'fail',
					title: '请选择地址'
				})
				return
			}
			const _this = this
			const submitData = {
				userId: this.userId,
				cartId: this.carId,
				couponId: this.couponId,
				grouponRulesId: this.grouponRulesId,
				grouponLinkId: this.grouponLinkId,
				brandId: this.goodsDetail.brandId,
				useVoucher: false,
				addressId: this.startAddress.id
			}
			submitOrderApi(submitData).then(({ data }) => {
				console.log(data)
				payOrderGoodsApi({
					orderNo: data.orderSn,
					userId: _this.userId,
					payType: 1
				}).then((res) => {
					const payData = JSON.parse(res.h5PayUrl)
					const form = document.createElement('form')
					form.setAttribute('action', payData.url)
					form.setAttribute('method', 'POST')
					const data = JSON.parse(payData.data)
					let input
					for (const key in data) {
						input = document.createElement('input')
						input.name = key
						input.value = data[key]
						form.appendChild(input)
					}
					document.body.appendChild(form)
					form.submit()
					document.body.removeChild(form)
				})
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '~@/style/mixin.less';

.order-detail-container {
  .pdd(27upx 22upx);
  min-height: 100vh;
  background-color: #F6F6F6;

  .order-detail-header {
    .flex();

    .title {
      .flex();
    }

    .share-container {
      .flex();

      text {
        margin-right: 8upx;
      }
    }
  }

  .pane {
    background-color: #fff;
    margin-top: 22upx;
    border-radius: 20upx;
    .pdd(32upx 26upx);
  }

  .total {
    .item {
      .flex();
      margin-top: 6upx;

      &:nth-child(1) {
        margin-top: 0
      }

      .value {
        .flex(flex-starty);
      }

      &.no {
        justify-content: flex-end
      }
    }
  }

  .order-main-area {
    .goods-item {
      .flex();
      margin-bottom: 40upx;

      .good-detial {
        flex: 1;
        margin-left: 8upx;

        .price-text {
          .flex();
        }

        .name {
          width: 500upx;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          color: #3d3d3d;
          font-weight: 500;
          margin-left: 10upx;
        }

        .price-text {
          margin-top: 8upx;

          text {
            font-size: 28upx;
            color: #fa5151;

            &.old-price {
              text-decoration: line-through;
              color: #999;
            }
          }
        }

        .op {
          .flex();

          .number {
            width: 28upx;
            height: 28upx;
            text-align: center;
            line-height: 28upx;
            color: #000;
            margin: 0 8upx;
          }
        }
      }
    }
  }

  .footer-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120upx;
    background-color: #fff;
    .pdd(16upx);

    .bee-btn {
      width: 432upx;
      height: 88upx;
      background-color: #FF973F;
      color: #fff;
      transition: all 500ms;

      &:active {
        opacity: 0.1;
      }
    }
  }
}
</style>
