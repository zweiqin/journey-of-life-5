<template>
	<view class="group-buying-form-container">
		<JHeader width="50" height="50" title="团购规则信息"></JHeader>
		<FieldPaneGB v-model="form.basicInfo" :fields="groupBuyingForm" title="基本信息"></FieldPaneGB>

		<view class="buts">
			<button class="btn" @click="submit()">
				提交
			</button>
		</view>
	</view>
</template>

<script>
import FieldPaneGB from './components/field-pane-gb.vue'
import { addGrouponCreateRuleApi, updateGrouponRuleApi, getGrouponRuleByIdApi } from '../../../api/user'

export default {
	name: 'GroupBuyingForm',
	components: {
		FieldPaneGB
	},
	onLoad(options) {
		if (options.id) {
			this.getGroupBuyingDetail(options.id)
		}
	},
	data() {
		return {
			groupBuyingForm: [
				{
					label: 'ID：',
					field: 'id',
					type: 'input',
					placeholder: '请输入ID'
				},
				{
					label: '商品名称：',
					field: 'goodsName',
					type: 'input',
					placeholder: '请选择商品名称'
				},
				{
					label: '商品：',
					field: 'goodsId',
					type: 'picker',
					placeholder: '请选择商品'
				},
				{
					label: '优惠金额：',
					field: 'discount',
					type: 'input',
					placeholder: '请输入优惠金额'
				},
				{
					label: '团购人数要求：',
					field: 'discountMember',
					type: 'input',
					placeholder: '请输入团购人数要求'
				},
				{
					label: '过期时间：',
					field: 'expireTime',
					type: 'time',
					placeholder: '请选择过期时间'
				}
			],
			form: {
				basicInfo: {
					id: '',
					goodsId: '',
					goodsName: '',
					picUrl: '',
					discount: '',
					discountMember: '',
					expireTime: ''
				}
			}
		}
	},

	methods: {
		// 获取团购详情
		async getGroupBuyingDetail(id) {
			uni.showLoading()
			this.form.basicInfo.id = id
			const res = await getGrouponRuleByIdApi({ id })
			uni.hideLoading()
			if (res.errno === 0) {
				this.form.basicInfo.goodsId = res.data.goodsId || ''
				this.form.basicInfo.goodsName = res.data.goodsName || ''
				this.form.basicInfo.picUrl = res.data.picUrl || ''
				this.form.basicInfo.discount = res.data.discount || ''
				this.form.basicInfo.discountMember = res.data.discountMember || ''
				this.form.basicInfo.expireTime = res.data.expireTime || ''
			}
		},

		// 点击提交按钮
		submit() {
			const data = {
				id: this.form.basicInfo.id,
				goodsId: this.form.basicInfo.goodsId,
				discount: this.form.basicInfo.discount,
				discountMember: this.form.basicInfo.discountMember,
				expireTime: this.form.basicInfo.expireTime
			}
			console.log(data)
			if (!data.goodsId) {
				this.$showToast('请选择请选择商品')
				return
			}
			if (!data.discount) {
				this.$showToast('请输入优惠金额')
				return
			}
			if (!data.discountMember) {
				this.$showToast('请输入团购人数要求')
				return
			}
			if (!data.expireTime) {
				this.$showToast('请选择过期时间')
				return
			}
			uni.showModal({
				title: '提示',
				content: '确认提交团购规则表单？',
				success: (res) => {
					if (res.confirm) {
						if (data.id) {
							updateGrouponRuleApi(data).then((res) => {
								this.$showToast('修改团购规则成功')
								setTimeout(() => {
									uni.navigateBack()
								}, 2000)
							})
						} else {
							addGrouponCreateRuleApi(data).then((res) => {
								this.$showToast('新建团购规则成功')
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
.group-buying-form-container {
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
