<template>
	<view class="field-pane-container">
		<view class="title">{{ title }}</view>
		<view v-for="item in fields" :key="item.label">
			<view v-if="item.field === 'id'"></view>
			<view v-else class="item">
				<template>
					<view
						class="input-wrapper" :style="{
							'flex-direction': item.type === 'textarea' ? 'column' : '',
							'align-items': item.type === 'textarea' ? 'flex-start' : ''
						}"
					>
						<view class="sub-title">{{ item.label }}</view>
						<input
							v-if="item.type === 'input'" :value="form[item.field]" class="input" :disabled="false"
							:type="item.field === 'bankNumber' ? 'number' : 'text'"
							:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
						/>
						<input
							v-if="item.type === 'select'" :value="form[item.field]" class="input" :disabled="true"
							type="text"
							:placeholder="item.placeholder" @click="isShowBankListSelect = true"
						/>

					</view>
				</template>
			</view>
		</view>
		<!-- 银行 -->
		<tui-select
			:list="bankList" reverse :show="isShowBankListSelect" @confirm="handleSelectBankList"
			@close="isShowBankListSelect = false"
		></tui-select>

	</view>
</template>

<script>
import { getBankCardOwnershipApi } from '.././../../../api/user'
// import { getUserId, getBrandId } from '../../../../utils'

export default {
	name: 'FieldPaneBCF',
	props: {
		fields: {
			type: Array,
			required: true
		},
		value: {
			type: Object,
			required: true
		},
		title: String
	},

	data() {
		return {
			form: {},
			bankList: [],
			isShowBankListSelect: false
		}
	},

	watch: {
		fields: {
			handler(value) {
				if (value) {
					const form = {}
					for (const item of value) {
						form[item.field] = this.value[item.field]
						if (item.type === 'select' && item.field === 'bankName') this.getBankList()
					}
					this.form = form
				}
			},
			immediate: true,
			deep: true
		},

		form: {
			handler(value) {
				this.$emit('input', value)
			},
			immediate: true,
			deep: true
		}
	},

	mounted() {
		// console.log(this.$refs)
	},

	methods: {
		getBankList() {
			getBankCardOwnershipApi()
				.then((res) => {
					this.bankList = res.data.map((item) => ({
						...item,
						value: item.id,
						text: `${item.cardName}（${item.abbreviation}）`
					}))
				})
				.catch((e) => {
					this.$showToast('银行列表获取失败')
				})
		},
		handleSelectBankList(e) {
			this.isShowBankListSelect = false
			this.form.bankName = e.options.cardName
			this.form.bankCode = e.options.abbreviation
		},
		handleInput(field, e) {
			console.log(field, e)
			if (field === 'id') {
			} else if (field === 'cnname' || field === 'bankName' || field === 'bankCode' || field === 'bankNumber') {
				this.form[field] = e.detail.value
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../../../style/var.less";
@import "../../../../style/mixin.less";

.field-pane-container {
	margin-top: 30upx;

	.title {
		font-size: @f14;
		color: #fa5151;
		font-weight: bold;
	}

	.chooseGender {
		flex: 1;
		text-align: left;
	}

	.item {
		padding: 20upx 0;
		border-bottom: 1upx solid #d8d8d8;
		margin-top: 20upx;

		.input-wrapper {
			.flex();
			font-size: @f12;
			color: @c3d;

			.sub-title {
				margin-right: 20upx;
			}

			/deep/ .uni-input-placeholder,
			/deep/ .uni-textarea-placeholder {
				font-size: @f12;
				color: @c9;
			}

			.input {
				flex: 1;
				font-size: @f12;
			}

			.textarea {
				margin-top: 20upx;
				width: 100%;
				height: 100px;
				font-size: 24upx;
			}
		}
	}
}
</style>
