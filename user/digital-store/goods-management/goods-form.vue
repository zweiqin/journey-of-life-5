<template>
	<view class="goods-form-container">
		<JHeader width="50" height="50" title="商品表单"></JHeader>
		<FieldPaneGF v-model="form.basicInfo" :fields="applyStoreOne" title="基本信息"></FieldPaneGF>

		<FieldPaneGF v-model="form.relatesInfo" :fields="applyStoreTow" title="关联信息"></FieldPaneGF>

		<JUpload
			:title="uploadFields[0].label" :img-url="form.imgs[uploadFields[0].field]"
			@upload="handleSaveImg(uploadFields[0].field, $event)" @delete="handleDeleteImg(uploadFields[0].field)"
		></JUpload>

		<JMoreUpload
			:title="uploadFields[1].label" :imgs="form.imgs[uploadFields[1].field]"
			@upload="handleSaveImg(uploadFields[1].field, $event)" @delete="handleDeleteImg(uploadFields[1].field)"
		></JMoreUpload>
		<!-- <tui-upload :value="form.imgs[uploadFields[1].field]" :serverUrl="serverUrl" :limit="5" @complete="result" @remove="remove"></tui-upload> -->
		<view class="buts">
			<button class="btn" @click="submit()">
				提交
			</button>
		</view>
	</view>
</template>

<script>
import FieldPaneGF from './components/field-pane-gf.vue'
import { createGoodsBrandApi, updateGoodsBrandApi } from '../../../api/user'
import { getGoodsDetailApi } from '../../../api/goods'
import { J_USER_INFO } from '../../../constant'
import { getUserId, getBrandId } from '../../../utils'
// import { getAddressLongitudeAndLatitude } from '../../utils'

export default {
	name: 'GoodsForm',
	components: {
		FieldPaneGF
	},
	onLoad(options) {
		if (options.id) {
			this.getGoodsDetail(options.id)
		}
	},
	data() {
		return {
			applyStoreOne: [
				{
					label: '商品编号：',
					field: 'goodsSn',
					type: 'input',
					placeholder: '请输入商品编号'
				},
				{
					label: '商品名称：',
					field: 'name',
					type: 'input',
					placeholder: '请输入商品名称'
				},
				{
					label: '专柜价格：',
					type: 'input',
					field: 'counterPrice',
					placeholder: '请输入专柜价格'
				},
				{
					label: '当前价格：',
					type: 'input',
					field: 'retailPrice',
					placeholder: '请输入当前价格'
				},
				{
					label: '是否新品：',
					field: 'isNew',
					type: 'radio',
					placeholder: '是否新品'
				},
				{
					label: '是否热卖：',
					field: 'isHot',
					type: 'radio',
					placeholder: '是否热卖'
				},
				{
					label: '是否在售：',
					field: 'isOnSale',
					type: 'radio',
					placeholder: '是否在售'
				},
				{
					label: '是否支持代金券：',
					field: 'supportVoucher',
					type: 'radio',
					placeholder: '是否支持代金券'
				},
				{
					label: '是否是预约商品：',
					field: 'isAppoint',
					type: 'radio',
					placeholder: '是否是预约商品'
				},
				{
					label: '开售时间：',
					field: 'startTime',
					type: 'time',
					placeholder: '请选择开售时间'
				},
				{
					label: '结束时间：',
					field: 'endTime',
					type: 'time',
					placeholder: '请选择结束时间'
				},
				{
					label: '商品单位：',
					field: 'unit',
					type: 'input',
					placeholder: '请填写商品单位'
				},
				{
					label: '关键字：',
					field: 'keywords',
					type: 'dialog',
					placeholder: '请输入关键字'
				},
				{
					label: '所属分类：',
					field: 'categoryId',
					type: 'picker',
					placeholder: '请选择所属分类'
				},
				// {
				// 	label: '所属品牌商：',
				// 	field: 'brandId',
				// 	type: 'picker',
				// 	placeholder: '请选择所属品牌商'
				// },
				{
					label: '商品简介',
					type: 'textarea',
					field: 'brief',
					placeholder: '请填写商品简介'
				},
				{
					label: '商品详细介绍',
					type: 'textarea',
					field: 'detail',
					placeholder: '请填写商品详细介绍'
				}
			],
			applyStoreTow: [
				{
					label: 'ID：',
					field: 'id',
					type: 'input',
					placeholder: '请输入商品ID'
				},
				{
					label: '商品规格：',
					field: 'specifications',
					type: 'table',
					placeholder: '请填写商品规格'
				},
				{
					label: '商品库存：',
					field: 'products',
					type: 'table',
					placeholder: '请填写商品库存'
				},
				{
					label: '商品参数：',
					field: 'attributes',
					type: 'table',
					placeholder: '请填写商品参数'
				},
				{
					label: '商品优惠券：',
					field: 'goodsCoupons',
					type: 'table',
					placeholder: '请填写商品商品优惠券'
				}
			],
			uploadFields: [
				{
					label: '商品图片',
					field: 'picUrl'
				},
				{
					label: '宣传画廊',
					field: 'gallery'
				}
			],
			form: {
				basicInfo: {
					goodsSn: '',
					name: '',
					counterPrice: '',
					retailPrice: '',
					isNew: '',
					isHot: '',
					isOnSale: '',
					supportVoucher: '',
					isAppoint: '',
					startTime: '',
					endTime: '',
					unit: '',
					keywords: '',
					categoryId: '',
					brief: '',
					detail: '',
					timeType: 1
				},
				relatesInfo: {
					id: '',
					specifications: '',
					products: [],
					attributes: [],
					goodsCoupons: []
				},
				imgs: {
					picUrl: '',
					gallery: []
				}
			}
		}
	},

	methods: {
		// 获取商品详情
		async getGoodsDetail(id) {
			uni.showLoading()
			this.form.relatesInfo.id = id
			const res = await getGoodsDetailApi(id)
			uni.hideLoading()
			if (res.errno === 0) {
				this.form.basicInfo.goodsSn = res.data.info.goodsSn || ''
				this.form.basicInfo.name = res.data.info.name || ''
				this.form.basicInfo.counterPrice = res.data.info.counterPrice || ''
				this.form.basicInfo.retailPrice = res.data.info.retailPrice || ''
				this.form.basicInfo.isNew = String(res.data.info.isNew) || ''
				this.form.basicInfo.isHot = String(res.data.info.isHot) || ''
				this.form.basicInfo.isOnSale = String(res.data.info.isOnSale) || ''
				this.form.basicInfo.supportVoucher = String(res.data.info.supportVoucher) || ''
				this.form.basicInfo.isAppoint = String(res.data.info.isAppoint) || ''
				this.form.basicInfo.startTime = res.data.info.startTime || ''
				this.form.basicInfo.endTime = res.data.info.endTime || ''
				this.form.basicInfo.unit = res.data.info.unit || ''
				this.form.basicInfo.keywords = res.data.info.keywords || ''
				this.form.basicInfo.categoryId = res.data.info.categoryId || ''
				this.form.basicInfo.brief = res.data.info.brief || ''
				this.form.basicInfo.detail = res.data.info.detail || ''
				this.form.basicInfo.timeType = typeof res.data.info.timeType === 'number' ? res.data.info.timeType : 1
				this.form.relatesInfo.specifications = res.data.specificationList.map((item) => item.valueList).flat() || []
				this.form.relatesInfo.products = res.data.productList || []
				this.form.relatesInfo.attributes = res.data.attribute || []
				this.form.relatesInfo.goodsCoupons = res.data.goodsCoupons.map((item) => ({
					...item,
					isTimeBox: String(item.isTimeBox)
				})) || []
				this.form.imgs.picUrl = res.data.info.picUrl || ''
				this.form.imgs.gallery = res.data.info.gallery || []
			}
		},

		handleSaveImg(field, imgUrl) {
			console.log(field, imgUrl)
			if (field === 'picUrl') {
				this.form.imgs[field] = imgUrl
			} else if (field === 'gallery') {
				this.form.imgs[field].push(imgUrl)
			}
			this.$forceUpdate()
			console.log(this.form.imgs[this.uploadFields[0].field])
		},

		// 点击提交按钮
		submit() {
			const data = {
				...this.form.relatesInfo,
				goodsCoupons: this.form.relatesInfo.goodsCoupons.map((item) => ({
					...item,
					isTimeBox: item.isTimeBox === 'true' ? true : item.isTimeBox === 'false' ? false : ''
				})) || [],
				goods: {
					...this.form.imgs,
					...this.form.basicInfo,
					isNew: this.form.basicInfo.isNew === 'true' ? true : this.form.basicInfo.isNew === 'false' ? false : '',
					isHot: this.form.basicInfo.isHot === 'true' ? true : this.form.basicInfo.isHot === 'false' ? false : '',
					isOnSale: this.form.basicInfo.isOnSale === 'true' ? true : this.form.basicInfo.isOnSale === 'false' ? false : '',
					supportVoucher: this.form.basicInfo.supportVoucher === 'true' ? true : this.form.basicInfo.supportVoucher === 'false' ? false : '',
					isAppoint: this.form.basicInfo.isAppoint === 'true' ? true : this.form.basicInfo.isAppoint === 'false' ? false : '',
					brandId: getBrandId(),
					id: this.form.relatesInfo.id
				}
			}
			console.log(data)
			if (!data.goods.brandId) {
				this.$showToast('缺少商家信息')
				return
			}
			if (!data.goods.name) {
				this.$showToast('缺少商品名称')
				return
			}
			if (!data.goods.counterPrice) {
				this.$showToast('缺少专柜价格')
				return
			}
			if (!data.goods.retailPrice) {
				this.$showToast('缺少当前价格')
				return
			}
			if (!data.goods.unit) {
				this.$showToast('缺少商品单位')
				return
			}
			if (!data.goods.categoryId) {
				this.$showToast('缺少所属分类')
				return
			}
			if (!data.goods.picUrl) {
				this.$showToast('缺少商品图片')
				return
			}
			if (!data.goods.gallery || !data.goods.gallery.length) {
				this.$showToast('缺少商品宣传画廊图片')
				return
			}
			if (!data.specifications || !data.specifications.length) {
				this.$showToast('缺少商品规格')
				return
			}
			if (
				!/^1[3456789]\d{9}$/.test(data.phone)
			) {
				this.$showToast('联系电话格式错误')
				return
			}
			uni.showModal({
				title: '提示',
				content: '确认提交商品表单？',
				success: (res) => {
					if (res.confirm) {
						if (data.goods.id) {
							updateGoodsBrandApi(data).then((res) => {
								this.$showToast('修改商品成功')
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							})
						} else {
							createGoodsBrandApi(data).then((res) => {
								this.$showToast('添加商品成功')
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							})
						}
					}
				}
			})
		},

		// 删除当前图片
		handleDeleteImg(field, imgUrl) {
			if (field === 'picUrl') {
				this.form.imgs[field] = ''
			} else if (field === 'gallery') {
				this.form.imgs[field].splice(this.form.imgs[field].findIndex((item) => item === imgUrl), 1)
			}
			this.$forceUpdate()
			console.log(this.form.imgs[field])
		}
	}
}
</script>

<style lang="less" scoped>
.goods-form-container {
	padding: 40upx 40upx 140upx 40upx;
	box-sizing: border-box;

	.buts {
		position: fixed;
		bottom: -1px;
		z-index: 2;
		padding: 20upx 40upx;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #fff;
		width: 100%;
		box-sizing: border-box;
		margin-top: 272upx;
	}

	.btn {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 72upx;
		width: 306upx;
		font-size: 32upx;
		color: #fff;
		margin: 0;
		background-color: #07b9b9;
		border-radius: 100px;

		&:last-child {
			background-color: #fa5151;
		}

		&.withdraw {
			width: 100%;
			background: #999;
			letter-spacing: 10upx;
		}
	}
}
</style>
