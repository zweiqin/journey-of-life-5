<template>
	<view class="coupon-form-container">
		<JHeader width="50" height="50" title="优惠券表单"></JHeader>
		<FieldPaneCF v-model="form.basicInfo" :fields="couponFormOne" title="基本信息"></FieldPaneCF>

		<view class="buts">
			<button class="btn" @click="submit()">
				提交
			</button>
		</view>
	</view>
</template>

<script>
import FieldPaneCF from './components/field-pane-cf.vue'
import { addCouponReleaseApi } from '../../../api/user'
import { J_USER_INFO } from '../../../constant'
import { getUserId, getBrandId } from '../../../utils'
// import { getAddressLongitudeAndLatitude } from '../../utils'

export default {
	name: 'CouponForm',
	components: {
		FieldPaneCF
	},
	onLoad(options) {
		if (options.id) { }
	},
	data() {
		return {
			couponFormOne: [
				{
					label: '优惠券名称：',
					field: 'name',
					type: 'input',
					placeholder: '请输入优惠券名称'
				},
				{
					label: '优惠券介绍',
					type: 'textarea',
					field: 'desc',
					placeholder: '请填写优惠券介绍'
				},
				{
					label: '优惠券标签：',
					field: 'tag',
					type: 'input',
					placeholder: '请输入优惠券标签'
				},
				{
					label: '优惠券数量：',
					field: 'total',
					type: 'input',
					placeholder: '请输入优惠券数量'
				},
				{
					label: '优惠金额：',
					field: 'discount',
					type: 'input',
					placeholder: '请输入优惠金额'
				},
				{
					label: '最低消费金额：',
					field: 'min',
					type: 'input',
					placeholder: '请输入最低消费金额'
				},
				{
					label: '是否限领一张：',
					field: 'limit',
					type: 'radio',
					placeholder: '是否限领一张'
				},
				{
					label: '类型：',
					field: 'type',
					type: 'radio',
					placeholder: '请选择优惠券类型'
				},
				{
					label: '状态：',
					field: 'status',
					type: 'radio',
					placeholder: '请选择优惠券状态'
				},
				{
					label: '商品限制类型：',
					field: 'goodsType',
					type: 'radio',
					placeholder: '请选择商品限制类型'
				},
				{
					label: '商品类型：',
					field: 'goodsValueOne',
					type: 'picker',
					placeholder: '请选择商品类型'
				},
				{
					label: '商品：',
					field: 'goodsValueTwo',
					type: 'picker',
					placeholder: '请选择商品'
				},
				{
					label: '时间限制类型：',
					field: 'timeType',
					type: 'radio',
					placeholder: '请选择时间限制类型'
				},
				{
					label: '有效天数：',
					field: 'days',
					type: 'input',
					placeholder: '请输入有效天数'
				},
				{
					label: '开始时间：',
					field: 'startTime',
					type: 'time',
					placeholder: '请选择开始时间'
				},
				{
					label: '截至时间：',
					field: 'endTime',
					type: 'time',
					placeholder: '请选择截至时间'
				}
			],
			form: {
				basicInfo: {}
			}
		}
	},

	methods: {
		// 点击提交按钮
		submit() {
			const data = {
				name: this.form.basicInfo.name,
				desc: this.form.basicInfo.desc,
				tag: this.form.basicInfo.tag,
				total: this.form.basicInfo.total,
				discount: this.form.basicInfo.discount,
				min: this.form.basicInfo.min,
				limit: this.form.basicInfo.limit,
				type: this.form.basicInfo.type ? Number(this.form.basicInfo.type) : '',
				status: this.form.basicInfo.status ? Number(this.form.basicInfo.status) : '',
				goodsType: this.form.basicInfo.goodsType ? Number(this.form.basicInfo.goodsType) : '',
				goodsValue: this.form.basicInfo.goodsType === '0' ? '[]' : this.form.basicInfo.goodsType === '1' ? JSON.parse(this.form.basicInfo.goodsValueOne) : this.form.basicInfo.goodsType === '2' ? JSON.parse(this.form.basicInfo.goodsValueTwo) : '',
				timeType: this.form.basicInfo.timeType ? Number(this.form.basicInfo.timeType) : '',
				days: this.form.basicInfo.timeType === '0' ? this.form.basicInfo.days : '',
				startTime: this.form.basicInfo.timeType === '1' ? this.form.basicInfo.startTime : '',
				endTime: this.form.basicInfo.timeType === '1' ? this.form.basicInfo.endTime : ''
			}
			console.log(data)
			if (!data.name) {
				this.$showToast('缺少优惠券名称')
				return
			}
			if (!data.total) {
				this.$showToast('缺少优惠券数量')
				return
			}
			if (!data.discount) {
				this.$showToast('缺少优惠金额')
				return
			}
			if (!data.min) {
				this.$showToast('缺少最低消费金额')
				return
			}
			if (!data.limit) {
				this.$showToast('请选择是否限领一张')
				return
			}
			if (typeof data.type !== 'number') {
				this.$showToast('请选择优惠券类型')
				return
			}
			if (typeof data.status !== 'number') {
				this.$showToast('请选择优惠券状态')
				return
			}
			if (typeof data.goodsType !== 'number') {
				this.$showToast('请选择商品限制类型')
				return
			}
			if (typeof data.goodsType === 'number' && data.goodsType === 1 && !data.goodsValue) {
				this.$showToast('请选择商品类型')
				return
			}
			if (typeof data.goodsType === 'number' && data.goodsType === 2 && !data.goodsValue) {
				this.$showToast('请选择商品')
				return
			}
			if (typeof data.timeType !== 'number') {
				this.$showToast('请选择时间限制类型')
				return
			}
			if (typeof data.timeType === 'number' && data.timeType === 0 && !data.days) {
				this.$showToast('请选择有效天数')
				return
			}
			if (typeof data.timeType === 'number' && data.timeType === 1 && !data.startTime) {
				this.$showToast('请选择开始时间')
				return
			}
			if (typeof data.timeType === 'number' && data.timeType === 1 && !data.endTime) {
				this.$showToast('请选择结束时间')
				return
			}
			uni.showModal({
				title: '提示',
				content: '确认提交优惠券表单？',
				success: (res) => {
					if (res.confirm) {
						addCouponReleaseApi(data).then((res) => {
							this.$showToast('发布优惠券成功')
							setTimeout(() => {
								uni.navigateBack()
							}, 2000)
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.coupon-form-container {
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
