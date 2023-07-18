<template>
	<view class="raffle-prize-container">
		<JHeader width="50" height="50" title="奖品信息"></JHeader>
		<view class="header">
			<img src="" class="back" alt="" />
		</view>
		<FieldPaneRP v-model="form.basicInfo" :fields="rafflePrize" title="基本信息"></FieldPaneRP>

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
import FieldPaneRP from './components/field-pane-rp.vue'
import { addPrizeLotteryDrawApi, updatePrizeLotteryDrawApi, getPrizeLotteryDrawSelectApi } from '../../../api/user'
import { J_USER_INFO } from '../../../constant'
import { getUserId, getBrandId } from '../../../utils'
// import { getAddressLongitudeAndLatitude } from '../../utils'

export default {
	name: 'RafflePrizeForm',
	components: {
		FieldPaneRP
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
					label: '奖品类型：',
					field: 'type',
					type: 'radio',
					placeholder: '请选择奖品类型'
				},
				{
					label: '奖品名称：',
					field: 'name',
					type: 'input',
					placeholder: '请填写奖品名称'
				},
				{
					label: '数量：',
					field: 'value',
					type: 'input',
					placeholder: '请填写数量'
				},
				{
					label: '奖品位置：',
					field: 'position',
					type: 'numberbox',
					placeholder: '请填写奖品位置'
				},
				{
					label: '中奖次数（期数）：',
					type: 'input',
					field: 'phase',
					placeholder: '请填写中奖次数'
				}
			],
			uploadFields: [
				{
					label: '奖品图片',
					field: 'url'
				}
			],
			form: {
				basicInfo: {
					type: '',
					name: '',
					value: '',
					position: 1,
					phase: ''
				},
				imgs: {
					url: ''
				}
			}
		}
	},

	methods: {
		async getPrizeDetail(id) {
			uni.showLoading()
			this.form.basicInfo.id = id
			const res = await getPrizeLotteryDrawSelectApi({ id })
			uni.hideLoading()
			if (res.errno === 0) {
				this.form.basicInfo.name = (res.data && res.data.name) || ''
				this.form.imgs.url = (res.data && res.data.url) || ''
				this.form.basicInfo.value = (res.data && res.data.value) || ''
				this.form.basicInfo.type = res.data && res.data.type
				this.form.basicInfo.position = res.data && res.data.position || ''
				this.form.basicInfo.phase = res.data && res.data.phase || ''
			}
		},

		// 点击提交按钮
		submit() {
			const data = {
				...this.form.imgs,
				...this.form.basicInfo,
				// brandId: getBrandId()
				brandId: 1001207
			}
			if (!data.type) {
				this.$showToast('请选择奖品类型')
				return
			}
			if (!data.name) {
				this.$showToast('请填写奖品名称')
				return
			}
			if (!data.value) {
				this.$showToast('请填写数量')
				return
			}
			if (!data.position) {
				this.$showToast('请填写奖品位置')
				return
			}
			if (!data.phase) {
				this.$showToast('请填写中奖次数')
				return
			}
			if (!data.url) {
				this.$showToast('请上传奖品图片')
				return
			}
			uni.showModal({
				title: '提示',
				content: '确认提交奖品表单？',
				success: (res) => {
					if (res.confirm) {
						if (data.id) {
							updatePrizeLotteryDrawApi(data).then((res) => {
								this.$showToast('修改奖品信息成功')
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							})
						} else {
							addPrizeLotteryDrawApi(data).then((res) => {
								this.$showToast('新建奖品成功')
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							})
						}
					}
				}
			})
		},

		handleSaveImg(field, imgUrl) {
			this.form.imgs[field] = imgUrl
			this.$forceUpdate()
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
