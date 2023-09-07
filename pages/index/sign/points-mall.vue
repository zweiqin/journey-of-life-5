<template>
	<view class="points-mall">
		<view class="points-wrapper">
			<view class="head">
				<image src="../../../static/index/earn-money/back.png" mode="" @click="handleBack" />
				<text>积分商城</text>
			</view>
			<view class="head-image">
				<image
					:src="userInfo.userId ? common.seamingImgUrl(userInfo.avatarUrl) : require('../../../static/user-center/default-avatar.png')"
					mode=""
				/>
				<text>{{ userInfo.nickName || '--' }}</text>
			</view>
			<view class="heng"></view>
			<view class="list">
				<view class="left">
					<view class="text">累计积分（分）</view>
					<view class="number">{{ signDetails.totalNum }}</view>
				</view>
				<view class="shu"></view>
				<view class="right">
					<view class="text">连续签到（天）</view>
					<view class="number">{{ signDetails.days }}</view>
				</view>
			</view>
		</view>
		<view class="background">
			<view v-if="integralGoodsList && integralGoodsList.length">
				<view v-for="good in integralGoodsList" :key="good.id" class="item">
					<view class="good">
						<image :src="common.seamingImgUrl(good.picUrl)" mode="" />
					</view>
					<view class="info">
						<view class="good-name">{{ good.name }}</view>
						<view class="price">
							积分抵后: <text style="font-size: 34upx;color: #FA5151;margin-right: 8upx;padding-left: 8upx;">￥0</text>
							<text style="font-size: 24upx;color: #999999;text-decoration: line-through;">
								￥{{ good.price }}
							</text>
						</view>
					</view>
					<view class="exchange">
						<view class="num">
							<view class="ex-price"><text>使用积分</text></view>
							<view class="ex-integral">{{ good.price }}</view>
						</view>
						<view class="click" @click="handlePopup(good)">查看详情</view>
						<view class="click" @click="confirmExchange(good)">点击兑换</view>
					</view>
				</view>
			</view>
			<view v-else>
				<tui-no-data :fixed="false" style="padding: 80upx 0;">暂无积分商品</tui-no-data>
			</view>
			<LoadMore v-show="integralGoodsList.length" :status="status"></LoadMore>
		</view>

		<tui-bottom-popup :show="isShowGoodsDetailPopup" @close="(popupDetail = {}) && (isShowGoodsDetailPopup = false)">
			<view style="height: 100%;padding: 0 0 20upx;background-color: #f8f6f6;overflow-y: auto;box-sizing: border-box;">
				<view v-if="popupDetail && popupDetail.info" style="width: 100%;">
					<Carousel
						:list="popupDetail.info.gallery.length
							? popupDetail.info.gallery.map(i => common.seamingImgUrl(i))
							: [ common.seamingImgUrl(popupDetail.info.picUrl) ]
						" :height="390" :top="0" :radius="0"
					></Carousel>
					<view v-if="popupDetail.info.detail" style="margin: 24upx 0 12upx;text-align: center;">
						<text>- 宝贝详情 -</text>
					</view>
					<UParse v-if="popupDetail.info.detail" :content="popupInfoDetail"></UParse>
				</view>
			</view>
		</tui-bottom-popup>

		<!-- 使用积分兑换商品dialog -->
		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确定兑换', color: '#586c94' }]"
			:show="isShowExchangeDialog" title="兑换商品" @click="handleClickExchangeDialog"
		>
			<template #content>
				<view>
					<view
						style="display: flex;justify-content: space-between;align-items: center;margin-bottom: 30upx;"
						@click="go('/user/site/site-manage?appoint=true')"
					>
						<view style="display: flex;align-items: center;">
							<JIcon width="26" height="34" type="locale"></JIcon>
							<view style="margin-left: 18upx;">
								<view v-if="!startAddress">请选择收货地址</view>
								<view v-else style="text-align: left;">
									<view>收件人：{{ startAddress.name }} {{ startAddress.mobile }}</view>
									<view>{{ startAddress.detailedAddress }}</view>
								</view>
							</view>
						</view>
						<JIcon type="right-arrow" width="34" height="40"></JIcon>
					</view>
					<view
						style="display: flex;justify-content: space-between;align-items: center;padding: 20upx 6upx;color: #444444;"
					>
						<view v-if="selectdGoodsMsg.productId" style="display: flex;align-items: center;">
							<image style="width: 160upx;height: 160upx;" :src="common.seamingImgUrl(selectdGoodsMsg.picUrl)" mode="" />
							<view style="margin-left: 12upx;">
								<view>{{ selectdGoodsMsg.goodsName }}</view>
								<view>{{ selectdGoodsMsg.spStr }}</view>
								<view style="font-weight: 700;">需 {{ selectdGoodsMsg.pay }} 积分</view>
							</view>
						</view>
						<view v-else>请选择规格</view>
						<tui-button width="120rpx" height="72rpx" :size="28" type="danger" shape="circle" @click="handleSelectGoods">
							{{ selectdGoodsMsg.productId ? '更改' : '选择' }}
						</tui-button>
					</view>
					<view>
						<tui-textarea
							v-model="submitData.opForm.message" :border-top="false" :border-bottom="false"
							background-color="#f6f6f6" padding="26rpx 20rpx" flex-start label="备注："
							placeholder="请输入备注"
						></tui-textarea>
					</view>
				</view>
			</template>
		</tui-dialog>

		<JSpecificationScreen
			ref="refJSpecificationScreen" btn-text="确认选择" show-select-btn :show-success-toast="false"
			:data="goodsDetail" @select="handleSelectdGoods"
		></JSpecificationScreen>
	</view>
</template>

<script>
import { J_USER_INFO, J_SELECT_ADDRESS } from '../../../constant'
import { getAddressListApi } from '../../../api/address'
import { getUserSigninContinuousApi, getIntegralGoodsListApi, getIntegralGoodsDetailApi } from '../../../api/user'
import { firstAddCar, submitOrderApi } from '../../../api/goods'
import { getUserId, payFn } from '../../../utils'
import uParse from '../../../components/u-parse/u-parse.vue'
import { marked } from 'marked'
export default {
	name: 'PointsMall',
	components: {
		UParse: uParse
	},
	data() {
		return {
			userInfo: uni.getStorageSync(J_USER_INFO) || {},
			signDetails: { number: '', totalNum: '', days: '' },
			currentTab: 0,
			integralGoodsList: [
				{
					'id': 3,
					'name': '小写',
					'gallery': '["6b11mqg1auz1d6r2h2o9.png"]',
					'brief': '合格分级管控高科技黄金卡',
					'isOnSale': 1,
					'picUrl': 'lb8nnhmed5jg3zreowr5.png',
					'detail': '<p><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/4jafeu62h4a8an45yvmr.png" alt="" width="473" height="474" /></p>',
					'sales': 0,
					'browse': 0,
					'price': 99,
					'unit': '盒',
					'addTime': '2023-07-07T06:33:37.000+0000',
					'updateTime': '2023-07-07T06:35:29.000+0000',
					'deleted': 0
				},
				{
					'id': 2,
					'name': '大写',
					'gallery': '["pjkkhlwfci28d83d9tlv.png"]',
					'brief': '公司大富豪非结构化',
					'isOnSale': 1,
					'picUrl': '96dlzfihq4msnn0055jf.png',
					'detail': '<p><img src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/00aa6q3zl5gfno3xom85.png" alt="" width="473" height="474" /></p>',
					'sales': 0,
					'browse': 0,
					'price': 999988,
					'unit': '个',
					'addTime': '2023-07-07T06:28:47.000+0000',
					'updateTime': '2023-07-07T06:35:45.000+0000',
					'deleted': 0
				}
			],
			query: {
				page: 1,
				size: 10
			},
			totalPages: 0,
			status: 'none',

			isShowGoodsDetailPopup: false,
			popupDetail: {},

			isShowExchangeDialog: false,
			selectdGoodsMsg: {
				goodsId: '',
				productId: '',
				picUrl: '',
				goodsName: '',
				spStr: '',
				pay: ''
			},
			goodsDetail: {},
			submitData: {
				userId: getUserId(),
				cartId: '',
				addressId: '',
				couponId: '',
				grouponRulesId: '',
				grouponLinkId: '',
				brandId: '',
				opForm: {
					message: '',
					useVoucher: false
				}
			},
			startAddress: '' // 收货地址
		}
	},
	onLoad() {
		this.getUserData()
		this.getIntegralGoodsList()
	},
	onShow() {
		this.getAddressList()
	},
	computed: {
		popupInfoDetail() {
			return this.popupDetail ? this.popupDetail.info.detail ? marked(this.popupDetail.info.detail) : '' : ''
		}
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		// 获取地址
		async getAddressList() {
			const address = uni.getStorageSync(J_SELECT_ADDRESS)
			if (address) {
				this.startAddress = address
				return
			}
			const { data } = await getAddressListApi({
				userId: getUserId()
			})
			data.forEach((address) => {
				if (address.isDefault) this.startAddress = address
			})
			if (!this.startAddress) this.startAddress = data[0]
			if (this.startAddress) this.submitData.addressId = this.startAddress.id
		},
		getUserData() {
			getUserSigninContinuousApi({
				userId: getUserId()
			}).then((res) => {
				this.signDetails = res.data || { number: '', totalNum: '', days: '' }
			})
		},
		getIntegralGoodsList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			this.status = 'loading'
			getIntegralGoodsListApi(this.query)
				.then(({ data }) => {
					this.totalPages = data.totalPages
					if (isLoadmore) {
						this.integralGoodsList.push(...data.goodsList)
					} else {
						this.integralGoodsList = data.goodsList
					}
					uni.hideLoading()
					this.status = 'none'
				})
				.catch(() => {
					uni.hideLoading()
					this.status = 'none'
				})
		},
		handlePopup(item) {
			this.popupDetail = {}
			uni.showLoading()
			getIntegralGoodsDetailApi({ id: item.id })
				.then(({ data }) => {
					this.popupDetail = {
						specificationList: data.specifications,
						groupon: [],
						issue: [],
						userHasCollect: data.userHasCollect,
						shareImage: null,
						goodsCoupons: [],
						comment: {
							data: [],
							count: 0
						},
						attribute: [],
						brand: data.brand,
						productList: data.products && data.products.length ? data.products.map((item) => ({ ...item, specifications: item.specifications && item.specifications.length ? JSON.parse(item.specifications) : [] })) : [],
						info: { ...data.goods, gallery: data.goods.gallery && data.goods.gallery.length ? JSON.parse(data.goods.gallery) : [] }
					}
					this.isShowGoodsDetailPopup = true
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		confirmExchange(item) {
			if (typeof this.signDetails.totalNum !== 'number') return this.$showToast('获取积分失败')
			if (this.signDetails.totalNum < this.selectdGoodsMsg.pay) return this.$showToast('积分不足')
			this.selectdGoodsMsg.goodsId = item.id
			this.isShowExchangeDialog = true
		},
		handleSelectGoods() {
			uni.showLoading()
			getIntegralGoodsDetailApi({ id: this.selectdGoodsMsg.goodsId })
				.then(({ data }) => {
					this.submitData.brandId = data.goods.brandId
					this.goodsDetail = {
						specificationList: data.specifications,
						groupon: [],
						issue: [],
						userHasCollect: data.userHasCollect,
						shareImage: null,
						goodsCoupons: [],
						comment: {
							data: [],
							count: 0
						},
						attribute: [],
						brand: data.brand,
						productList: data.products && data.products.length ? data.products.map((item) => ({ ...item, specifications: item.specifications && item.specifications.length ? JSON.parse(item.specifications) : [] })) : [],
						info: { ...data.goods, gallery: data.goods.gallery && data.goods.gallery.length ? JSON.parse(data.goods.gallery) : [] }
					}
					this.$nextTick(() => this.$refs.refJSpecificationScreen.open())
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		handleSelectdGoods(e) {
			this.selectdGoodsMsg.productId = e.productId
			this.selectdGoodsMsg.picUrl = e.picUrl
			this.selectdGoodsMsg.goodsName = e.goodsName
			this.selectdGoodsMsg.spStr = e.spStr
			this.selectdGoodsMsg.pay = e.pay
		},
		handleClickExchangeDialog(e) {
			if (e.index === 0) {
				this.resetSelectdGoods()
				this.resetSubmitData()
				this.goodsDetail = {}
				this.isShowExchangeDialog = false
			} else if (e.index === 1) {
				if (!getUserId()) return
				if (!this.selectdGoodsMsg.goodsId) return this.$showToast('缺少商品数据')
				if (!this.selectdGoodsMsg.productId) return this.$showToast('请选择商品规格')
				if (!this.submitData.addressId) return this.$showToast('请选择地址')
				if (typeof this.signDetails.totalNum !== 'number') return this.$showToast('获取积分失败')
				if (this.signDetails.totalNum < this.selectdGoodsMsg.pay) return this.$showToast('积分不足')
				firstAddCar({
					userId: getUserId(),
					goodsId: '',
					productId: '',
					number: 1,
					useVoucher: this.submitData.opForm.useVoucher,
					type: ''
				})
					.then(({ data }) => {
						this.submitData.cartId = data
					})
				submitOrderApi(this.submitData).then(({ data }) => {
					this.isShowExchangeDialog = false
					this.resetSelectdGoods()
					this.resetSubmitData()
					this.goodsDetail = {}
					payFn(data, 10)
				})
			}
		},
		resetSubmitData() {
			this.submitData.opForm.message = ''
			this.submitData.brandId = ''
			this.submitData.cartId = ''
		},
		resetSelectdGoods() {
			this.selectdGoodsMsg.goodsId = ''
			this.selectdGoodsMsg.productId = ''
			this.selectdGoodsMsg.picUrl = ''
			this.selectdGoodsMsg.goodsName = ''
			this.selectdGoodsMsg.spStr = ''
			this.selectdGoodsMsg.pay = ''
		}
	},
	onReachBottom() {
		if (this.query.page >= this.totalPages) {
			this.status = 'no-more'
			return
		}
		if (this.query.size > this.integralGoodsList.length) {
			return
		}
		this.query.page++
		this.getIntegralGoodsList(true)
	}
}
</script>

<style lang="less" scoped>
.points-mall {
	width: 100vw;
	min-height: 100vh;

	.points-wrapper {
		padding-bottom: 48upx;
		background: linear-gradient(180deg, rgba(245, 155, 35, 0.92) -3%, rgba(245, 155, 35, 0.92) 39%, #F5900A 98%);

		.head {
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			padding-top: 60upx;
			padding-bottom: 24upx;
			// background: linear-gradient(174deg, #FE5C22 15%, #FE933F 77%);

			image {
				width: 56upx;
				height: 56upx;
				position: absolute;
				left: 22upx;
			}

			text {
				color: #fff;
				font-size: 36upx;
				font-weight: 500;
			}
		}

		.head-image {
			display: flex;
			flex-direction: column;
			align-items: center;
			// justify-content: center;

			image {
				width: 80upx;
				height: 80upx;
			}

			text {
				font-size: 32upx;
				font-weight: 500;
				color: #FFFFFF;
				padding-top: 8upx;
				padding-bottom: 16upx;
			}
		}

		.heng {
			width: 438upx;
			height: 2upx;
			background: #FFB785;
			margin: auto;
		}

		.list {
			padding: 22upx 120upx 40upx 120upx;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.left {
				display: flex;
				flex-direction: column;
				align-items: center;

				.text {
					font-size: 28upx;
					color: #FFFFFF;
				}

				.number {
					font-size: 48upx;
					font-weight: bold;
					color: #FFFFFF;
				}
			}

			.shu {
				width: 2upx;
				height: 56upx;
				background: #FFB785;
			}

			.right {
				display: flex;
				flex-direction: column;
				align-items: center;

				.text {
					font-size: 28upx;
					color: #FFFFFF;
				}

				.number {
					font-size: 48upx;
					font-weight: bold;
					color: #FFFFFF;
				}
			}
		}
	}

	.background {
		margin-top: -48upx;
		padding: 34upx 26upx 0 26upx;
		box-sizing: border-box;
		width: 100%;
		border-radius: 40upx 40upx 0upx 0upx;
		background-color: #ffffff;

		.item {
			width: 100%;
			height: 290upx;
			display: flex;
			justify-content: space-between;
			padding-bottom: 18upx;

			.good {
				// width: 224upx;
				// height: 142upx;
				display: flex;
				align-items: center;

				image {
					width: 224upx;
					height: 142upx;
				}
			}

			.info {
				display: flex;
				flex-direction: column;
				justify-content: space-around;

				.good-name {
					font-size: 24upx;
					font-weight: 500;
					color: #3D3D3D;
				}

				.price {
					font-size: 24upx;
					color: #3D3D3D;
				}

			}

			.exchange {
				background: linear-gradient(180deg, #FFF8E6 0%, #FCDBDB 100%);
				padding: 48upx 10upx 22upx 10upx;
				display: flex;
				flex-direction: column;
				justify-content: space-between;

				.num {
					display: flex;
					flex-direction: column;
					align-items: center;

					.ex-price {
						font-size: 28upx;
						color: #FA5151;
					}

					.ex-integral {
						margin-top: 12upx;
						font-size: 32upx;
						color: #911A00;
					}
				}

				.click {
					width: 150upx;
					height: 44upx;
					border-radius: 20upx;
					background: linear-gradient(90deg, #F55808 0%, #FB8D13 100%);
					font-size: 24upx;
					color: #FFFFFF;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}
		}
	}

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}

}
</style>
