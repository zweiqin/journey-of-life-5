<template>
	<view class="store-application-container">
		<JHeader width="50" height="50" title="商家信息"></JHeader>
		<view class="header">
			<img src="" class="back" alt="" />
		</view>
		<FieldPaneSA v-model="form.accountInfo" :fields="applyStoreOne" title="账号信息"></FieldPaneSA>

		<FieldPaneSA v-model="form.storeInfo" :fields="applyStoreTow" title="门店信息"></FieldPaneSA>

		<JUpload
			v-for="item in uploadFields" :key="item.label" :title="item.label" :img-url="form.imgs[item.field]"
			@upload="handleSaveImg(item.field, $event)" @delete="handleDeleteImg(item.field)"
		></JUpload>
		<view class="buts">
			<button class="btn" @click="submit()">
				提交
			</button>
		</view>
	</view>
</template>

<script>
import FieldPaneSA from './components/field-pane-sa.vue'
import { updateBrandSettleInsApi, getSuperiorUserApi } from '../../api/user'
import { J_USER_INFO } from '../../constant'
import { getUserId } from '../../utils'
// import { getAddressLongitudeAndLatitude } from '../../utils'

export default {
	name: 'StoreApplication',
	components: {
		FieldPaneSA
	},
	onLoad(options) {
		// this.form.accountInfo.code = options.code || ''
		this.packageId = options.packageId * 1
		getSuperiorUserApi({ userId: getUserId() })
			.then((res) => {
				// console.log(res.data)
				if (res.data && res.data.code) this.form.accountInfo.code = res.data.code
			})
	},
	data() {
		return {
			applyStoreOne: [
				{
					label: '营销策划师所在区域：',
					field: 'plannerArea',
					type: 'area',
					placeholder: '请选择营销策划师所在区域'
				},
				{
					label: '邀请码：',
					field: 'code',
					type: 'inputSelect',
					placeholder: '可用于绑定营销策划师或分公司'
				},
				{
					label: '登录账号：',
					field: 'username',
					type: 'input',
					placeholder: '请填写登录账号（至少为6位）用于登录'
				},
				{
					label: '联系电话：',
					type: 'input',
					field: 'phone',
					placeholder: '请填写手机号码',
					warnText: '（注：账号/密码用于您登陆PC端管理后台，请务必牢记）'
				},
				{
					label: '入驻说明',
					type: 'textarea',
					field: 'explain',
					placeholder: '请填写入驻说明'
				}
			],
			applyStoreTow: [
				{
					label: '门店名称：',
					field: 'name',
					type: 'input',
					placeholder: '请填写门店名称'
				},
				{
					label: '门店类型层级：',
					field: 'brandgenreLevel',
					type: 'radio',
					placeholder: '请选择门店类型层级'
				},
				{
					label: '所属类型：',
					field: 'brandgenre',
					type: 'type',
					placeholder: '请选择门店类型'
				},
				{
					label: '开始营业时间：',
					field: 'startTime',
					type: 'time',
					placeholder: '请选择开始营业时间'
				},
				{
					label: '结束营业时间：',
					field: 'endTime',
					type: 'time',
					placeholder: '请选择结束营业时间'
				},
				{
					label: '门店经纬度：',
					field: 'lonAndLatString',
					type: 'location',
					placeholder: '请选择门店经纬度'
				},
				{
					label: '所在城市：',
					type: 'area',
					field: 'areaId',
					placeholder: '省份、城市、区县、乡镇'
				},
				{
					label: '详细地址（门牌号）',
					type: 'textarea',
					field: 'address',
					placeholder: '请填写详细地址'
				},
				{
					label: '门店介绍',
					type: 'textarea',
					field: 'desc',
					placeholder: '请填写门店简介'
				}
			],
			uploadFields: [
				{
					label: '门店logo',
					field: 'picUrl'
				},
				{
					label: '营业执照',
					field: 'licenseUrl'
				},
				{
					label: '法人身份证人像面',
					field: 'idcardProsUrl'
				},
				{
					label: '法人身份证国徽面',
					field: 'idcardConsUrl'
				}
			],
			form: {
				accountInfo: {
					code: '',
					username: uni.getStorageSync(J_USER_INFO).phone
				},
				storeInfo: {},
				imgs: {}
			},
			packageId: ''
		}
	},

	methods: {
		handleSaveImg(field, imgUrl) {
			this.form.imgs[field] = imgUrl
			this.$forceUpdate()
		},

		// 点击提交按钮
		submit() {
			const data = {
				...this.form.imgs,
				...this.form.storeInfo,
				...this.form.accountInfo,
				userId: getUserId(),
				longitude: this.form.storeInfo.lonAndLatString ? this.form.storeInfo.lonAndLatString.split(',')[0] : '',
				latitude: this.form.storeInfo.lonAndLatString ? this.form.storeInfo.lonAndLatString.split(',')[1] : '',
				packageId: this.packageId
			}
			// if (!data.code) {
			// 	this.$showToast('缺少邀请码')
			// 	return
			// }
			if (!data.username) {
				this.$showToast('请输入要登录的帐号')
				return
			}
			if (data.username.length < 6) {
				this.$showToast('登录帐号至少为六位')
				return
			}
			if (
				!/^1[3456789]\d{9}$/.test(data.phone)
			) {
				this.$showToast('联系电话格式错误')
				return
			}
			if (!data.name) {
				this.$showToast('请填写门店名称')
				return
			}
			if (!data.brandgenre) {
				this.$showToast('请选择门店所属类型')
				return
			}
			if (!data.areaId) {
				this.$showToast('请选择门店所在城市')
				return
			}
			if (!data.address) {
				this.$showToast('请填写门店详细地址')
				return
			}
			if (!data.desc) {
				this.$showToast('请填写门店介绍')
				return
			}
			if (!data.picUrl) {
				this.$showToast('请上传门店logo')
				return
			}
			if (!data.licenseUrl) {
				this.$showToast('请上传营业执照')
				return
			}
			if (!data.idcardProsUrl) {
				this.$showToast('请上传法人身份证人像面')
				return
			}
			if (!data.idcardConsUrl) {
				this.$showToast('请上传法人身份证国徽面')
				return
			}
			if (!data.packageId) return this.$showToast('缺少套餐信息')
			// getAddressLongitudeAndLatitude(data.address.replace('-', '')).then((res) => {
			// 	data.longitude = res.result.location.lng
			// 	data.latitude = res.result.location.lat
			// })
			uni.showModal({
				title: '提示',
				content: '确认提交门店申请？',
				success: (res) => {
					if (res.confirm) {
						updateBrandSettleInsApi(data).then((res) => {
							this.$showToast('提交成功，请等待审核')
							setTimeout(() => {
								// uni.navigateBack()
								this.$switchTab('/pages/user/user')
							}, 2000)
						})
					}
				}
			})
		},

		// 删除当前图片
		handleDeleteImg(field) {
			this.form.imgs[field] = ''
			this.$forceUpdate()
		}
	}
}
</script>

<style lang="less" scoped>
.store-application-container {
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
