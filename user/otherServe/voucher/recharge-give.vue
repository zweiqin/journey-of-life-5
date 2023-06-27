<template>
	<view class="voucher-give-container">
		<JHeader width="50" height="50" title="代金劵转赠"></JHeader>

		<view class="main">
			<view class="item give-user" style="margin-bottom: 36upx">
				<view class="title">转账帐号：</view>
				<input v-model.number="giveUserId" class="input" placeholder="请输入要转赠的用户编号" type="number" />
				<button :disabled="!giveUserId" size="mini" type="primary" @click="handleSearchUser">
					查询
				</button>
			</view>
			<view v-if="giveUserInfo" class="user" style="margin-bottom: 36upx">
				<JAvatar :size="80" :src="giveUserInfo.avatar"></JAvatar>

				<view class="info">
					<view class="name">{{ giveUserInfo.nickname }}</view>
					<view class="occupation">{{ common.explainMembership(giveUserInfo.roleIds) }}</view>
				</view>
			</view>

			<view class="item">
				<view class="title">转赠：</view>
				<input v-model.number="form.number" class="input" placeholder="请输入需要转赠数量" type="number" />
			</view>
			<view
				class="errMsg" :style="{
					opacity: holdIdVoucher < form.number ? 1 : 0
				}"
			>
				转赠金额大于您的持有金额
			</view>

			<view class="item">
				<view class="title">目前拥有：</view>
				<view class="input">{{ holdIdVoucher }}</view>
			</view>
		</view>

		<button class="btn" type="primary" @click="handleGiveVoucher">
			转赠
		</button>
	</view>
</template>

<script>
import {
	giveVoucherToUserApi,
	getVoucherNumberApi,
	searchUserApi
} from '../../../api/user'
import { getUserId } from '../../../utils'
export default {
	name: 'RechargeGive',
	data() {
		return {
			price: 0,
			giveUserId: '',
			giveUserInfo: null,
			holdIdVoucher: 0,
			form: {
				holdId: getUserId(),
				voucherId: 1,
				number: 0
			}
		}
	},

	onLoad(options) {
		this.form.number = options.price
		this.getHoldVoucherNumber()
	},

	computed: {
		btnOp() {
			return (
				this.giveUserInfo &&
				this.giveUserId &&
				this.form.number <= this.holdIdVoucher
			)
		}
	},

	methods: {
		// 点击搜索用户
		handleSearchUser() {
			if (!this.giveUserId) {
				this.$showToast('请输入要转赠的用户团蜂id')
				return
			}

			searchUserApi({
				condition: this.giveUserId,
				voucherId: 1
			}).then(({ data }) => {
				if (data.total) {
					this.giveUserInfo = data.items[0]
				} else {
					this.$showToast('该用户不存在，请重新输入')
				}
			})
		},

		getHoldVoucherNumber() {
			getVoucherNumberApi({
				userId: getUserId()
			}).then(({ data }) => {
				this.holdIdVoucher = data[0].number
			})
		},

		// 转增
		handleGiveVoucher() {
			if (this.form.number <= 0) {
				this.$showToast('代金劵转赠数量不能为0')
				return
			}

			const data = JSON.parse(JSON.stringify(this.form))
			if (this.giveUserInfo) {
				data.userId = this.giveUserId
			}
			giveVoucherToUserApi(data).then(({ data }) => {
				this.$showToast('转赠成功', 'success')
				this.getHoldVoucherNumber()
				this.form.number = null
				this.giveUserInfo = null
				this.giveUserId = null
			})
		}
	}
}
</script>

<style lang="less" scoped>
.voucher-give-container {
	padding: 40upx 20upx;
	box-sizing: border-box;
	font-size: 28upx;

	.main {
		padding: 20upx;
		box-sizing: border-box;
		margin-top: 40px;

		.user {
			padding: 40upx 0;
			border-bottom: 1upx solid #e6e6e6;
			display: flex;
			align-items: center;
			justify-content: flex-start;

			.info {
				margin-left: 20upx;

				.occupation {
					color: #939393;
					font-size: 24upx;
					margin-top: 2px;
				}
			}
		}

		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 10upx 0;
			border-bottom: 1upx solid #e6e6e6;
			margin-top: 20upx;

			.input {
				flex: 1;
				font-size: 28upx;
			}

			/deep/ .uni-input-placeholder {
				font-size: 28upx;
			}

			.title {
				width: 152upx;
				text-align: right;
			}
		}
	}

	.btn {
		position: fixed;
		left: 50%;
		transform: translateX(-50%);
		bottom: 10px;
		width: 95%;
		margin: 0 auto;
	}

	.errMsg {
		font-size: 28upx;
		text-align: right;
		color: red;
		margin-top: 4px;
		transition: all 350ms;
	}
}
</style>
