<template>
	<view class="amount">
		<image src="../../../static/index/convenient-services/return.png" mode="" @click="back" />
		<view class="main">
			<view class="recharge-wrapper">
				<view class="title">充值金额</view>
				<view class="inp">
					<view class="icon">￥</view>
					<input v-model.number="payPrice" class="input" type="number" placeholder="请输入充值金额" />
					<view class="error">{{ errMsg }}</view>
				</view>
				<JButton @click="handleRecharge">充值</JButton>
			</view>
		</view>
	</view>
</template>

<script>
import { RuanRequest, getUserId, payFn } from '../../../utils'
export default {
	name: 'Amount',
	props: {

	},
	data() {
		return {
			payPrice: null,
			errMsg: '',
			youkabianhao: ''
		}
	},

	watch: {
		payPrice(value) {
			if (value === 0) {
				this.errMsg = '充值金额不能等于零'
			} else if (value < 0) {
				this.errMsg = '充值金额不能小于零'
			} else if (
				(value + '').includes('.') &&
				(value + '').split('.')[1].length > 2
			) {
				this.errMsg = '充值金额错误'
			} else {
				this.errMsg = ''
			}
		}
	},
	created() { },
	methods: {
		back() {
			uni.navigateTo({ url: '/pages/index/convenient-services/recharge' })
		},
		handleRecharge() {
			if (this.errMsg) {
				return
			}
			if (!this.payPrice) {
				this.$showToast('请输入充值金额')
				return
			}
			if (this.youkabianhao == null || this.youkabianhao == '' || this.youkabianhao == undefined) {
				this.$showToast('参数错误')
				return
			}
			const reqData = {
				'kahao': this.youkabianhao,
				'amount': this.payPrice
			}
			RuanRequest('/tuanyou/tygetorderinfo', reqData, 'post').then(({ data }) => {
				console.log(data)
				payFn({ ...data, orderSn: data.orderno }, data.payType)
			})
		}
	},

	onLoad(options) {
		console.log(options)
		this.youkabianhao = options.kahao
		const { price } = options
		if (price != -1) {
			this.payPrice = price * 1
		}
	}
}
</script>

<style lang="less" scoped>
.amount {
	padding: 48upx;
	box-sizing: border-box;

	image {
		width: 56upx;
		height: 56upx;
	}

	.main {
		padding: 32upx;
		box-sizing: border-box;
		margin-top: 40px;

		.recharge-wrapper {
			.inp {
				position: relative;
				display: flex;
				justify-content: center;
				align-items: center;
				margin-top: 40upx;
				border-bottom: 1upx solid #ccc;
				padding-bottom: 10upx;
				margin-bottom: 400upx;

				.icon {
					font-weight: bold;
					font-size: 80upx;
				}

				.input {
					font-weight: bold;
					font-size: 128upx;
				}

				.uni-input-placeholder {
					font-size: 30px;
				}
			}

			.error {
				color: red;
				margin-top: 10upx;
				position: absolute;
				bottom: -60upx;
				left: 0;
			}

		}
	}
}
</style>
