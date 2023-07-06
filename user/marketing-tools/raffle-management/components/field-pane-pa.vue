<template>
	<view class="field-pane-container">
		<view class="title">{{ title }}</view>
		<view v-for="item in fields" :key="item.label">
			<view v-if="item.field === 'id'"></view>
			<view v-else-if="item.field === 'probability'">
				<template>
					<view class="item">
						<view
							class="input-wrapper" :style="{
								'flex-direction': item.type === 'textarea' ? 'column' : '',
								'align-items': item.type === 'textarea' ? 'flex-start' : ''
							}"
							style="justify-content: flex-start;"
						>
							<view class="sub-title">{{ item.label }}</view>
							<tui-input v-model="form[item.field]" label="" type="number" :placeholder="item.placeholder">
								<template #right>
									<text>%</text>
								</template>
							</tui-input>
						</view>
					</view>
				</template>
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
							v-if="item.type === 'input'" :value="form[item.field]" class="input"
							:disabled="item.field === 'username'"
							:type="item.field === 'value' || item.field === 'phase' ? 'number' : 'text'" :placeholder="item.placeholder"
							@input="handleInput(item.field, $event)"
						/>

						<tui-radio-group
							v-if="item.type === 'radio'" v-model="form[item.field]"
							style="flex: 1;display: flex;justify-content: flex-end;flex-wrap: wrap;"
							@change="(e) => {}"
						>
							<tui-label
								v-for="(part, index) in [{ name: '红包', value: '1' }, { name: '积分', value: '2' }, { name: '体验金', value: '3' }, { name: '谢谢惠顾', value: '4' }]"
								:key="index"
							>
								<tui-list-cell padding="16upx">
									<view>
										<tui-radio :checked="false" :value="part.value" color="#07c160" border-color="#999">
										</tui-radio>
										<text class="tui-text">{{ part.name }}</text>
									</view>
								</tui-list-cell>
							</tui-label>
						</tui-radio-group>

						<tui-numberbox
							v-if="item.type === 'numberbox'" :value="form[item.field]" :step="1" :min="1"
							:max="99999"
							@change="handleInput(item.field, $event)"
						></tui-numberbox>

						<view v-if="item.type === 'picker' && item.field === 'pointsPrizeId'" style="flex: 1;">
							<input
								:value="tempPrizeName" class="input" :disabled="true" type="text"
								:placeholder="item.placeholder" @click="isShowPrizePopup = true"
							/>
						</view>

					</view>
				</template>
			</view>
		</view>
		<!-- 奖品选择 -->
		<tui-bottom-popup :show="isShowPrizePopup" @close="isShowPrizePopup = false">
			<view v-if="rafflePrizeList && rafflePrizeList.length" style="padding: 24upx;background-color: #eeeeee;">
				<RafflePrizeAll show-select-btn :prize-data="rafflePrizeList" @select="handleSelect">
				</RafflePrizeAll>
			</view>
			<view v-else>
				<tui-no-data>暂无数据</tui-no-data>
			</view>
		</tui-bottom-popup>
	</view>
</template>

<script>
import { getPrizeLotteryDrawListApi } from '../../../../api/user'
import { getUserId, getBrandId } from '../../../../utils'
import RafflePrizeAll from './RafflePrizeAll.vue'

export default {
	name: 'FieldPanePA',
	components: { RafflePrizeAll },
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
			tempPrizeName: '',
			isShowPrizePopup: false,
			rafflePrizeList: []
		}
	},

	watch: {
		fields: {
			handler(value) {
				if (value) {
					const form = {}
					for (const item of value) {
						form[item.field] = this.value[item.field]
						if (item.type === 'picker' && item.field === 'pointsPrizeId') this.getBrandRafflePrizeList()
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
	},

	methods: {
		getBrandRafflePrizeList() {
			if (!getBrandId()) return
			uni.showLoading({
				title: '加载中'
			})
			getPrizeLotteryDrawListApi({ brandId: getBrandId() })
				.then(({ data }) => {
					this.rafflePrizeList = data || []
					uni.hideLoading()
				})
				.catch(() => {
					uni.hideLoading()
				})
		},
		handleSelect(obj) {
			this.isShowPrizePopup = false
			this.tempPrizeName = obj.name
			this.form.pointsPrizeId = obj.id
		},

		handleInput(field, e) {
			console.log(field, e)
			if (field === 'name' || field === 'value' || field === 'phase') {
				this.form[field] = e.detail.value
			} else if (field === 'position') {
				this.form[field] = e.value
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

/deep/ .tui-popup-class.tui-bottom-popup {
	height: 85vh !important;
}
}
</style>
