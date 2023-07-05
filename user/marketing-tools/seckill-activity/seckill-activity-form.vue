<template>
	<view class="seckill-activity-form-container">
		<JHeader width="50" height="50" title="秒杀活动表单"></JHeader>
		<FieldPaneSeckilla v-model="form.basicInfo" :fields="seckillActivityInfo" title="基本信息"></FieldPaneSeckilla>

		<view class="buts">
			<button class="btn" @click="submit()">
				提交
			</button>
		</view>
	</view>
</template>

<script>
import FieldPaneSeckilla from './components/field-pane-seckilla.vue'
import { addSeckillGoodsApi } from '../../../api/user'
import { J_USER_INFO } from '../../../constant'
import { getUserId, getBrandId } from '../../../utils'
// import { getAddressLongitudeAndLatitude } from '../../utils'

export default {
	name: 'SeckillActivityForm',
	components: {
		FieldPaneSeckilla
	},
	onLoad(options) {
		if (options.id) {
			// this.getxxxDetail(options.id)
		}
	},
	data() {
		return {
			seckillActivityInfo: [
				{
					label: '秒杀活动名称：',
					field: 'name',
					type: 'input',
					placeholder: '请输入秒杀活动名称'
				},
				{
					label: '开始时间：',
					field: 'startTime',
					type: 'time',
					placeholder: '请选择开始时间'
				},
				{
					label: '结束时间：',
					field: 'endTime',
					type: 'time',
					placeholder: '请选择结束时间'
				},
				{
					label: '关联商品：',
					field: 'goods',
					type: 'table',
					placeholder: '请选择关联商品'
				}
			],
			form: {
				basicInfo: {
					id: '',
					name: '',
					startTime: '',
					endTime: '',
					goods: []
				}
			}
		}
	},

	methods: {
		// 获取秒杀活动详情
		// async getxxxDetail(id) {
		// 	uni.showLoading()
		// 	this.form.basicInfo.id = id
		// 	const res = await getBrandxxxIdApi(id)
		// 	uni.hideLoading()
		// 	if (res.errno === 0) {
		// 		this.form.basicInfo.name = (res.data && res.data.name) || ''
		// 		this.form.basicInfo.startTime = (res.data && res.data.startTime) || ''
		// 		this.form.basicInfo.endTime = (res.data && res.data.endTime) || ''
		// 		this.form.basicInfo.goods = (res.data && res.data.goods) || []
		// 	}
		// },

		// 点击提交按钮
		submit() {
			const data = {
				...this.form.basicInfo,
				brandId: getBrandId()
			}
			if (!data.brandId) {
				this.$showToast('缺少商家信息')
				return
			}
			if (!data.name) {
				this.$showToast('缺少秒杀活动名称')
				return
			}
			if (!data.startTime) {
				this.$showToast('缺少秒杀活动开始时间')
				return
			}
			if (!data.endTime) {
				this.$showToast('缺少秒杀活动结束时间')
				return
			}
			if (!data.gooIds || !data.gooIds.length) {
				this.$showToast('缺少关联商品')
				return
			}
			uni.showModal({
				title: '提示',
				content: '确认提交秒杀活动表单？',
				success: (res) => {
					if (res.confirm) {
						addSeckillGoodsApi(data).then((res) => {
							this.$showToast('添加秒杀活动成功')
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
.seckill-activity-form-container {
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
