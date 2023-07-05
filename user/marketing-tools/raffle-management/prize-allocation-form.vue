<template>
	<view class="raffle-prize-container">
		<JHeader width="50" height="50" title="奖品配置信息"></JHeader>
		<view class="header">
			<img src="" class="back" alt="" />
		</view>
		<FieldPanePA v-model="form.basicInfo" :fields="rafflePrize" title="基本信息"></FieldPanePA>

		<view class="buts">
			<button class="btn" @click="submit()">
				提交
			</button>
		</view>
	</view>
</template>

<script>
import FieldPanePA from './components/field-pane-pa.vue'
import { addPrizeConfigurationApi, updatePrizeConfigurationApi, getPrizeSelectConfigurationApi } from '../../../api/user'
import { J_USER_INFO } from '../../../constant'
import { getUserId, getBrandId } from '../../../utils'
// import { getAddressLongitudeAndLatitude } from '../../utils'

export default {
	name: 'PrizeAllocationForm',
	components: {
		FieldPanePA
	},
	onLoad(options) {
		if (options.id) {
			this.getPrizeDetail(options.id)
		}
	},
	data() {
		return {
			rafflePrize: [
				{
					label: '关联奖品：',
					field: 'pointsPrizeId',
					type: 'picker',
					placeholder: '请选择关联奖品'
				},
				{
					label: '奖品期数：',
					field: 'pointsPrizePhase',
					type: 'numberbox',
					placeholder: '请填写奖品期数'
				},
				{
					label: '保底次数：',
					field: 'minimumGuarantee',
					type: 'numberbox',
					placeholder: '请填写保底次数'
				},
				{
					label: '概率：',
					field: 'probability',
					type: 'input',
					placeholder: '请填写概率'
				},
				{
					label: '抽中后的冷冻次数：',
					field: 'frozen',
					type: 'numberbox',
					placeholder: '请填写抽中后的冷冻次数'
				},
				{
					label: '每日最多抽中次数：',
					field: 'prizeDayMaxTimes',
					type: 'numberbox',
					placeholder: '请填写每日最多抽中次数'
				},
				{
					label: '每位用户在每月最多抽中的次数：',
					field: 'userPrizeMonthMaxTimes',
					type: 'numberbox',
					placeholder: '请填写每位用户在每月最多抽中的次数'
				}
			],
			form: {
				basicInfo: {
					id: '',
					pointsPrizeId: '',
					pointsPrizePhase: '',
					minimumGuarantee: '',
					probability: '',
					frozen: '',
					prizeDayMaxTimes: '',
					userPrizeMonthMaxTimes: ''
				}
			}
		}
	},

	methods: {
		async getPrizeDetail(id) {
			uni.showLoading()
			this.form.basicInfo.pointsPrizeId = id
			const res = await getPrizeSelectConfigurationApi({ pointsPrizeId: id })
			uni.hideLoading()
			if (res.errno === 0) {
				this.form.basicInfo.id = (res.data && res.data.id) || ''
				this.form.basicInfo.pointsPrizePhase = (res.data && res.data.pointsPrizePhase) || ''
				this.form.basicInfo.minimumGuarantee = (res.data && res.data.minimumGuarantee) || ''
				this.form.basicInfo.probability = (res.data && res.data.probability && res.data.probability * 100) || ''
				this.form.basicInfo.frozen = (res.data && res.data.frozen) || ''
				this.form.basicInfo.prizeDayMaxTimes = (res.data && res.data.prizeDayMaxTimes) || ''
				this.form.basicInfo.userPrizeMonthMaxTimes = (res.data && res.data.userPrizeMonthMaxTimes) || ''
			}
		},

		// 点击提交按钮
		submit() {
			const data = {
				...this.form.basicInfo,
				probability: (this.form.basicInfo.probability && (this.form.basicInfo.probability / 100)) || '',
				brandId: getBrandId()
			}
			if (!data.pointsPrizeId) {
				this.$showToast('请选择关联奖品')
				return
			}
			if (!data.pointsPrizePhase) {
				this.$showToast('请填写奖品期数')
				return
			}
			if (!data.minimumGuarantee) {
				this.$showToast('请填写保底次数')
				return
			}
			if (!data.probability) {
				this.$showToast('请填写概率')
				return
			}
			if (!data.frozen) {
				this.$showToast('请填写抽中后的冷冻次数')
				return
			}
			if (!data.prizeDayMaxTimes) {
				this.$showToast('请填写每日最多抽中次数')
				return
			}
			if (!data.userPrizeMonthMaxTimes) {
				this.$showToast('请填写每位用户在每月最多抽中的次数')
				return
			}
			uni.showModal({
				title: '提示',
				content: '确认提交奖品配置表单？',
				success: (res) => {
					if (res.confirm) {
						if (data.id) {
							updatePrizeConfigurationApi(data).then((res) => {
								this.$showToast('修改奖品配置信息成功')
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							})
						} else {
							addPrizeConfigurationApi(data).then((res) => {
								this.$showToast('新建奖品配置成功')
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							})
						}
					}
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.raffle-prize-container {
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
