<template>
	<view class="field-pane-container">
		<view class="title">{{ title }}</view>
		<view v-for="item in fields" :key="item.label">
			<view v-if="item.field === 'inviteUserId'">
				<view v-if="form[item.field]">
					<view class="item">
						<view
							class="input-wrapper" :style="{
								'flex-direction': item.type === 'textarea' ? 'column' : '',
								'align-items': item.type === 'textarea' ? 'flex-start' : ''
							}"
						>
							<view class="sub-title">{{ item.label }}</view>
							<input
								v-if="item.type === 'input'" :value="form[item.field]" class="input" disabled
								type="text"
								:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
							/>
						</view>
					</view>
				</view>
			</view>
			<view v-else-if="item.field === 'settlementBankAccountName'">
				<view>
					<view class="item">
						<view
							class="input-wrapper" :style="{
								'flex-direction': item.type === 'textarea' ? 'column' : '',
								'align-items': item.type === 'textarea' ? 'flex-start' : ''
							}"
						>
							<view class="sub-title">{{ item.label }}</view>
							<input
								v-if="item.type === 'select'" :value="form[item.field]" class="input" :disabled="true"
								type="text"
								:placeholder="item.placeholder" @click="isShowBankListSelect = true"
							/>
						</view>
					</view>
					<view
						v-if="checkCard && checkCard.cardName"
						style="display: flex;align-items: center;margin: 10upx 20upx;padding: 10upx;color: #6082bd;background-color: #EEEEEE;"
						@click="handleChooseCheckCard"
					>
						<BeeAvatar :width="100" :height="45" radius="10upx" :src="checkCard.bankLog"></BeeAvatar>
						<text style="margin-left: 20upx;">{{ checkCard.cardName }}</text>
						<text>（{{ checkCard.abbreviation }}）</text>
					</view>
				</view>
			</view>
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
							:type="item.field === 'settlementBankAccountNum' || item.field === 'idNumber' ? 'number' : 'text'"
							:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
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
import { getBankCardOwnershipApi, updateWithdrawalBankCardCheckApi } from '.././../../../api/user'
import { getUserId, handleDebounce } from '../../../../utils'

export default {
	name: 'FieldPaneDAF',
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
			isShowBankListSelect: false,
			checkCard: {
				bankLog: '',
				cardName: '',
				abbreviation: ''
			},
			handleDebounce: ''
		}
	},

	watch: {
		fields: {
			handler(value) {
				if (value) {
					const form = {}
					for (const item of value) {
						form[item.field] = this.value[item.field]
						if (item.type === 'select' && item.field === 'settlementBankAccountName') this.getBankList()
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
	created() {
		this.handleDebounce = handleDebounce(this.getCheckCard, 1000)
	},

	mounted() {
		// console.log(this.$refs)
	},

	methods: {
		getCheckCard() {
			updateWithdrawalBankCardCheckApi({ bankCode: this.form.settlementBankAccountNum })
				.then(({ data }) => {
					console.log(data)
					this.checkCard = data
				})
				.catch((e) => {
					console.log(e)
				})
		},
		handleChooseCheckCard() {
			this.form.settlementBankAccountName = this.checkCard.cardName
			this.checkCard = { bankLog: '', cardName: '', abbreviation: '' }
		},

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
			this.form.settlementBankAccountName = e.options.cardName
		},
		handleInput(field, e) {
			console.log(field, e)
			if (field === 'settlementBankAccountNum') {
				this.form[field] = e.detail.value
				if ((/^[1-9]\d{9,29}$/).test(this.form.settlementBankAccountNum)) {
					this.handleDebounce()
				}
			} else if (field === 'idNumber' || field === 'name' || field === 'settlementBankAccountNum' || field === 'settlementBankAccountName' || field === 'settlementBankBranchName') {
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
