<template>
	<view class="field-pane-container">
		<view class="title">{{ title }}</view>
		<view v-for="item in fields" :key="item.label">
			<view v-if="item.field === 'id'"></view>
			<view v-else-if="item.field === 'goodsValueOne'">
				<view v-if="form.goodsType === '1'" class="item">
					<template>
						<view
							class="input-wrapper" :style="{
								'flex-direction': item.type === 'textarea' ? 'column' : '',
								'align-items': item.type === 'textarea' ? 'flex-start' : ''
							}"
						>
							<view class="sub-title">{{ item.label }}</view>
							<view
								v-if="item.type === 'picker' && item.field === 'goodsValueOne'"
								style="flex: 1;display: flex;justify-content: space-between;align-items: center;" :style="{
									color: form.goodsValueOne ? '' : '#999'
								}"
							>
								{{ goodsValueOneName || item.placeholder }}
								<view style="display: flex;">
									<tui-button
										type="danger" width="120rpx" height="50rpx" margin="0 10rpx 0 0"
										style="border-radius: 50rpx;" @click="(form.goodsValueOne = '') || (goodsValueOneName = '')"
									>
										删除
									</tui-button>
									<tui-button
										type="warning" width="120rpx" height="50rpx" style="border-radius: 50rpx;"
										@click="isShowPicker = true"
									>
										新增
									</tui-button>
								</view>
							</view>
						</view>
					</template>
				</view>
				<view v-else></view>
			</view>
			<view v-else-if="item.field === 'goodsValueTwo'">
				<view v-if="form.goodsType === '2'" class="item">
					<template>
						<view
							class="input-wrapper" :style="{
								'flex-direction': item.type === 'textarea' ? 'column' : '',
								'align-items': item.type === 'textarea' ? 'flex-start' : ''
							}"
						>
							<view class="sub-title">{{ item.label }}</view>
							<view
								v-if="item.type === 'picker' && item.field === 'goodsValueTwo'"
								style="flex: 1;display: flex;justify-content: space-between;align-items: center;" :style="{
									color: form.goodsValueTwo ? '' : '#999'
								}"
							>
								{{ goodsValueTwoName || item.placeholder }}
								<view style="display: flex;">
									<tui-button
										type="danger" width="120rpx" height="50rpx" margin="0 10rpx 0 0"
										style="border-radius: 50rpx;" @click="(form.goodsValueTwo = '') || (goodsValueTwoName = '')"
									>
										删除
									</tui-button>
									<tui-button
										type="warning" width="120rpx" height="50rpx" style="border-radius: 50rpx;"
										@click="isShowStoreGoodsPopup = true"
									>
										新增
									</tui-button>
								</view>
							</view>
							<tui-bottom-popup :show="isShowStoreGoodsPopup" @close="isShowStoreGoodsPopup = false">
								<BrandGoodsList v-if="isShowStoreGoodsPopup" :brand-id="brandId" @send="handleSend"></BrandGoodsList>
							</tui-bottom-popup>
						</view>
					</template>
				</view>
				<view v-else></view>
			</view>
			<view v-else-if="item.field === 'days'">
				<view v-if="form.timeType === '0'" class="item">
					<template>
						<view
							class="input-wrapper" :style="{
								'flex-direction': item.type === 'textarea' ? 'column' : '',
								'align-items': item.type === 'textarea' ? 'flex-start' : ''
							}"
						>
							<view class="sub-title">{{ item.label }}</view>
							<input
								v-if="item.type === 'input' && item.field === 'days'" :value="form[item.field]" class="input"
								:disabled="false" type="number" :placeholder="item.placeholder"
								@input="handleInput(item.field, $event)"
							/>
						</view>
					</template>
				</view>
			</view>
			<view v-else-if="item.field === 'startTime' || item.field === 'endTime'">
				<view v-if="form.timeType === '1'" class="item">
					<template>
						<view
							class="input-wrapper" :style="{
								'flex-direction': item.type === 'textarea' ? 'column' : '',
								'align-items': item.type === 'textarea' ? 'flex-start' : ''
							}"
						>
							<view class="sub-title">{{ item.label }}</view>
							<view v-if="item.type === 'time' && item.field === 'startTime'">
								<input
									:value="form[item.field]" class="input" :disabled="true" type="text"
									:placeholder="item.placeholder" @click="$refs.dateTimeTradeS[0].show()"
									@input="handleInput(item.field, $event)"
								/>
								<tui-datetime
									ref="dateTimeTradeS" :type="7" radius
									@confirm="handleInput(item.field, $event)"
								></tui-datetime>
							</view>
							<view v-if="item.type === 'time' && item.field === 'endTime'">
								<input
									:value="form[item.field]" class="input" :disabled="true" type="text"
									:placeholder="item.placeholder" @click="$refs.dateTimeTradeE[0].show()"
									@input="handleInput(item.field, $event)"
								/>
								<tui-datetime
									ref="dateTimeTradeE" :type="7" radius
									@confirm="handleInput(item.field, $event)"
								></tui-datetime>
							</view>
						</view>
					</template>
				</view>
				<view v-else></view>
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
							:type="item.field === 'total' || item.field === 'discount' || item.field === 'min' ? 'number' : 'text'"
							:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
						/>

						<textarea
							v-if="item.type === 'textarea'" :value="form[item.field]" class="textarea"
							:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
						></textarea>

						<tui-radio-group
							v-if="item.type === 'radio' && item.field === 'limit'" v-model="form[item.field]"
							style="display: flex;" @change="(e) => { }"
						>
							<tui-label v-for="(part, index) in [{ name: '是', value: '1' }, { name: '否', value: '0' }]" :key="index">
								<tui-list-cell padding="16upx">
									<view>
										<tui-radio :checked="false" :value="part.value" color="#07c160" border-color="#999">
										</tui-radio>
										<text class="tui-text">{{ part.name }}</text>
									</view>
								</tui-list-cell>
							</tui-label>
						</tui-radio-group>

						<tui-radio-group
							v-if="item.type === 'radio' && item.field === 'type'" v-model="form[item.field]"
							style="flex: 1;display: flex;flex-wrap: wrap;justify-content: flex-end;" @change="(e) => { }"
						>
							<tui-label
								v-for="(part, index) in [{ name: '通用券', value: '0' }, { name: '注册赠券', value: '1' }, { name: '优惠券码兑换券', value: '2' }]"
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

						<tui-radio-group
							v-if="item.type === 'radio' && item.field === 'status'" v-model="form[item.field]"
							style="display: flex;" @change="(e) => { }"
						>
							<tui-label
								v-for="(part, index) in [{ name: '正常发布', value: '0' }, { name: '过期', value: '1' }, { name: '下架', value: '2' }]"
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

						<tui-radio-group
							v-if="item.type === 'radio' && item.field === 'goodsType'" v-model="form[item.field]"
							style="flex: 1;display: flex;flex-wrap: wrap;justify-content: flex-end;" @change="(e) => { }"
						>
							<tui-label
								v-for="(part, index) in [{ name: '所有商品', value: '0' }, { name: '类目', value: '1' }, { name: '部分商品', value: '2' }]"
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

						<tui-radio-group
							v-if="item.type === 'radio' && item.field === 'timeType'" v-model="form[item.field]"
							style="display: flex;" @change="(e) => { }"
						>
							<tui-label
								v-for="(part, index) in [{ name: '有效天数', value: '0' }, { name: '有效期范围', value: '1' }]"
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

						<!-- <JArea
							v-if="item.type === 'area' && item.field === 'areaId'" style="flex: 1" :text="areaIdName" :placeholder="item.placeholder"
							@confirm="handleInput(item.field, $event)"
							></JArea> -->

					</view>
				</template>
			</view>
		</view>
		<!-- 所属分类picker -->
		<tui-picker
			:show="isShowPicker" layer="3" :picker-data="categoryArr" @hide="isShowPicker = false"
			@change="handleClickGoodsValueOnePicker('goodsValueOne', $event)"
		>
		</tui-picker>

	</view>
</template>

<script>
import { getGoodsTypeApi } from '.././../../../api/user'
import { getUserId, getBrandId } from '../../../../utils'

export default {
	name: 'FieldPaneCF',
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
			brandId: getBrandId(),
			form: {},
			isShowPicker: false,
			categoryArr: [],
			goodsValueOneName: '',
			goodsValueTwoName: '',
			isShowStoreGoodsPopup: false
		}
	},

	watch: {
		fields: {
			handler(value) {
				if (value) {
					const form = {}
					for (const item of value) {
						form[item.field] = this.value[item.field]
						if (item.type === 'picker' && item.field === 'goodsValueOne') this.getGoodsType()
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
		getGoodsType() {
			getGoodsTypeApi()
				.then((res) => {
					this.categoryArr = res.data.data
					this.mapTree(this.categoryArr, '1')
				})
				.catch(() => {
					this.$showToast('所属分类列表获取失败')
				})
		},
		mapTree(data, level) {
			data.forEach((items) => {
				items.text = items.label
				// items.value = items.value
				if (level === '1' && items.children && items.children.length === 0) {
					items.children[0] = { text: '无', value: 0, children: [ { text: '无', value: 0 } ] }
				} else if (level === '1' && !items.children) {
					items.children = [ { text: '无', value: 0, children: [ { text: '无', value: 0 } ] } ]
				} else if (level === '2' && items.children && items.children.length === 0) {
					items.children[0] = { text: '无', value: 0 }
				} else if (level === '2' && !items.children) {
					items.children = [ { text: '无', value: 0 } ]
				} else if (items.children) {
					this.mapTree(items.children, String(Number(level) + 1))
				}
			})
		},

		handleClickGoodsValueOnePicker(field, e) {
			console.log(e)
			const tempGoodsValueOne = e.value[2] === 0 ? e.value[1] === 0 ? e.value[0] : e.value[1] : e.value[2]
			if (!tempGoodsValueOne) return this.$showToast('请选择商品类型')
			if (!this.form.goodsValueOne) {
				this.form.goodsValueOne = [ tempGoodsValueOne ]
				this.goodsValueOneName = e.result.replaceAll('无', '')
			} else {
				if (this.form.goodsValueOne.includes(tempGoodsValueOne)) return this.$showToast('不能选择重复商品类型')
				this.form.goodsValueOne = this.form.goodsValueOne.push(tempGoodsValueOne)
				this.goodsValueOneName = this.goodsValueOneName + ',' + e.result.replaceAll('无', '')
			}
		},

		handleSend(obj) {
			this.isShowStoreGoodsPopup = false
			if (!this.form.goodsValueTwo) {
				this.form.goodsValueTwo = [ obj.id ]
				this.goodsValueTwoName = obj.name
			} else {
				if (this.form.goodsValueTwo.includes(obj.id)) return this.$showToast('不能选择重复商品')
				this.form.goodsValueTwo = this.form.goodsValueTwo.push(obj.id)
				this.goodsValueTwoName = this.goodsValueTwoName + ',' + obj.name
			}
			console.log(obj, this.form.goodsValueTwo, this.goodsValueTwoName)
		},

		handleInput(field, e) {
			console.log(field, e)
			if (field === 'startTime' || field === 'endTime') {
				this.form[field] = e.result
			} else {
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

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}
}
</style>
