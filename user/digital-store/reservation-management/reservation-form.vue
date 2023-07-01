<template>
	<view class="goods-form-container">
		<JHeader width="50" height="50" title="预约项目表单"></JHeader>
		<FieldPaneRF v-model="form.basicInfo" :fields="reservationInfo" title="基本信息"></FieldPaneRF>

		<JUpload
			:title="uploadFields[0].label" :img-url="form.imgs[uploadFields[0].field]"
			@upload="handleSaveImg(uploadFields[0].field, $event)" @delete="handleDeleteImg(uploadFields[0].field)"
		></JUpload>

		<view class="buts">
			<button class="btn" @click="submit()">
				提交
			</button>
		</view>
	</view>
</template>

<script>
import FieldPaneRF from './components/field-pane-rf.vue'
import { addBrandAppointmentCategoryApi, updateBrandAppointmentCategoryApi, getBrandAppointmentIdApi } from '../../../api/user'
import { J_USER_INFO } from '../../../constant'
import { getUserId, getBrandId } from '../../../utils'
// import { getAddressLongitudeAndLatitude } from '../../utils'

export default {
	name: 'ReservationForm',
	components: {
		FieldPaneRF
	},
	onLoad(options) {
		if (options.id) {
			this.getAppointmentDetail(options.id)
		}
	},
	data() {
		return {
			reservationInfo: [
				{
					label: '预约项目名称：',
					field: 'name',
					type: 'input',
					placeholder: '请输入预约项目名称'
				},
				{
					label: '预约项目描述',
					type: 'textarea',
					field: 'desc',
					placeholder: '请填写预约项目描述'
				},
				{
					label: '所属公共项目：',
					field: 'pid',
					type: 'picker',
					placeholder: '请选择所属公共项目'
				},
				{
					label: '关联商品：',
					field: 'gooIds',
					type: 'table',
					placeholder: '请选择关联商品'
				}
			],
			uploadFields: [
				{
					label: '图片',
					field: 'picUrl'
				}
			],
			form: {
				basicInfo: {
					id: '',
					name: '',
					desc: '',
					pid: '',
					gooIds: [],
					goodsObj: []
				},
				imgs: {
					picUrl: ''
				}
			}
		}
	},

	methods: {
		// 获取预约项目详情
		async getAppointmentDetail(id) {
			uni.showLoading()
			this.form.basicInfo.id = id
			const res = await getBrandAppointmentIdApi(id)
			uni.hideLoading()
			if (res.errno === 0) {
				this.form.basicInfo.name = (res.data && res.data.name) || ''
				this.form.basicInfo.desc = (res.data && res.data.desc) || ''
				this.form.basicInfo.pid = (res.data && res.data.pid) || ''
				this.form.basicInfo.gooIds = (res.data && res.data.gooIds) || []
				this.form.basicInfo.goodsObj = (res.data && res.data.gooIds && res.data.gooIds.map((i) => ({ id: i, name: '--' }))) || []
				this.form.imgs.picUrl = (res.data && res.data.picUrl) || ''
			}
		},

		handleSaveImg(field, imgUrl) {
			console.log(field, imgUrl)
			if (field === 'picUrl') {
				this.form.imgs[field] = imgUrl
			}
			this.$forceUpdate()
		},

		// 点击提交按钮
		submit() {
			const data = {
				...this.form.imgs,
				...this.form.basicInfo,
				brandId: getBrandId()
			}
			console.log(data)
			if (!data.brandId) {
				this.$showToast('缺少商家信息')
				return
			}
			if (!data.name) {
				this.$showToast('缺少预约项目名称')
				return
			}
			if (!data.pid) {
				this.$showToast('缺少归属的公共项目')
				return
			}
			// if (!data.desc) {
			// 	this.$showToast('缺少预约项目描述')
			// 	return
			// }
			if (!data.picUrl) {
				this.$showToast('缺少图片')
				return
			}
			if (!data.gooIds || !data.gooIds.length) {
				this.$showToast('缺少关联商品')
				return
			}
			uni.showModal({
				title: '提示',
				content: '确认提交预约项目表单？',
				success: (res) => {
					if (res.confirm) {
						if (data.goods.id) {
							updateBrandAppointmentCategoryApi(data).then((res) => {
								this.$showToast('修改预约项目成功')
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							})
						} else {
							addBrandAppointmentCategoryApi(data).then((res) => {
								this.$showToast('添加预约项目成功')
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
