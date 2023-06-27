<template>
	<view class="field-pane-container">
		<view class="title">{{ title }}</view>
		<view v-for="item in fields" :key="item.label" class="item">
			<template>
				<view
					class="input-wrapper" :style="{
						'flex-direction': item.type === 'textarea' ? 'column' : '',
						'align-items': item.type === 'textarea' ? 'flex-start' : ''
					}"
				>
					<view class="sub-title">{{ item.label }}</view>
					<view v-if="item.type === 'inputSelect'" class="input" style="display: flex;justify-content: space-between;">
						<input
							:value="form[item.field]" :disabled="item.field === 'username'"
							:type="item.field === 'password' ? 'password' : 'text'" :placeholder="item.placeholder" @input="handleInput(item.field, $event)"
						/>
						<tui-button
							type="warning" width="120rpx" height="50rpx" style="border-radius: 50rpx;"
							@click="handlePlannerListSelect"
						>
							选择
						</tui-button>
					</view>
					<input
						v-if="item.type === 'input'" :value="form[item.field]" class="input" :disabled="item.field === 'username'"
						:type="item.field === 'password' ? 'password' : 'text'" :placeholder="item.placeholder" @input="handleInput(item.field, $event)"
					/>
					<input
						v-if="item.type === 'location'" :value="form[item.field]" class="input" :disabled="true"
						type="text" :placeholder="item.placeholder"
						@click="handleInput(item.field, $event)"
					/>

					<textarea
						v-if="item.type === 'textarea'" :value="form[item.field]" class="textarea"
						:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
					></textarea>

					<tui-radio-group v-if="item.type === 'radio'" v-model="radioLevel" style="display: flex;" @change="(e) => pickerLayer = e.detail.value">
						<tui-label v-for="(part, index) in [{ name: '一级', value: '1' }, { name: '二级', value: '2' }, { name: '三级', value: '3' }]" :key="index">
							<tui-list-cell padding="16upx">
								<view>
									<tui-radio :checked="false" :value="part.value" color="#07c160" border-color="#999">
									</tui-radio>
									<text class="tui-text">{{ part.name }}</text>
								</view>
							</tui-list-cell>
						</tui-label>
					</tui-radio-group>

					<view
						v-if="item.type === 'type' && item.field === 'brandgenre'"
						style="flex: 1"
						:style="{
							color: brandgenreName ? '' : '#999'
						}"
						@click="isShowPicker = true"
					>
						{{ brandgenreName || "请选择门店类型" }}
					</view>

					<JArea
						v-if="item.type === 'area' && item.field === 'plannerArea'" style="flex: 1" :text="plannerAreaName" :placeholder="item.placeholder"
						@confirm="handleSelectPlannerArea"
					></JArea>

					<JArea
						v-if="item.type === 'area' && item.field === 'areaId'" style="flex: 1" :text="areaIdName" :placeholder="item.placeholder"
						@confirm="handleInput(item.field, $event)"
					></JArea>

					<view v-if="item.type === 'time' && item.field === 'startTime'">
						<input
							:value="form[item.field]" class="input" :disabled="true"
							type="text" :placeholder="item.placeholder" @click="$refs.dateTimeTradeS[0].show()" @input="handleInput(item.field, $event)"
						/>
						<tui-datetime ref="dateTimeTradeS" :type="4" radius @confirm="handleInput(item.field, $event)"></tui-datetime>
					</view>
					<view v-if="item.type === 'time' && item.field === 'endTime'">
						<input
							:value="form[item.field]" class="input" :disabled="true"
							type="text" :placeholder="item.placeholder" @click="$refs.dateTimeTradeE[0].show()" @input="handleInput(item.field, $event)"
						/>
						<tui-datetime ref="dateTimeTradeE" :type="4" radius @confirm="handleInput(item.field, $event)"></tui-datetime>
					</view>

				</view>
			</template>
		</view>
		<!-- 门店类型picker -->
		<tui-picker :show="isShowPicker" :layer="pickerLayer" :picker-data="storeTypesArr" @hide="isShowPicker = false" @change="handleInput('brandgenre', $event)">
		</tui-picker>
		<!-- 策划师列表 -->
		<tui-select
			:list="plannerList" reverse :show="isShowPlannerListSelect" @confirm="handleSelectPlannerList"
			@close="isShowPlannerListSelect = false"
		></tui-select>
	</view>
</template>

<script>
import { getStoreTypeTreeApi, getPlannerCollectionApi } from '.././../../api/user'

export default {
	name: 'FieldPaneSA',
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
			plannerList: [],
			isShowPlannerListSelect: false,
			storeTypesArr: [],
			isShowPicker: false,
			radioLevel: '3',
			pickerLayer: '3',
			brandgenreName: '',
			areaIdName: '',
			plannerAreaName: ''
		}
	},

	watch: {
		fields: {
			handler(value) {
				if (value) {
					const form = {}
					for (const item of value) {
						form[item.field] = this.value[item.field]
						if (item.type === 'type' && item.field === 'brandgenre') this.getStoreTypeTree()
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
		getStoreTypeTree() {
			getStoreTypeTreeApi()
				.then((res) => {
					this.storeTypesArr = res.data
					this.mapTree(this.storeTypesArr)
				})
				.catch(() => {
					this.$showToast('门店类型获取失败')
				})
		},
		mapTree(data) {
			data.forEach((items) => {
				items.text = items.storeName
				items.value = items.id
				if (items.children && items.children.length === 0 && items.level === '2') {
					items.children[0] = { text: '无', value: 0 }
				} else if (items.children) {
					this.mapTree(items.children)
				}
			})
		},

		async handlePlannerListSelect(e) {
			if (this.form.plannerArea) {
				await getPlannerCollectionApi({ code: this.form.plannerArea })
					.then((res) => {
						this.plannerList = res.data.map((item) => ({
							...item,
							value: item.id,
							text: `${item.nickname}（尾号${item.mobile.replace(/\s/g, '').replace(/\d+(\d{4})$/, '$1')}）${item.code}`
						}))
						this.isShowPlannerListSelect = true
					})
			} else {
				this.$showToast('请先选择营销策划师所在区域')
			}
		},

		handleSelectPlannerList(e) {
			this.isShowPlannerListSelect = false
			this.form.code = e.options.code
		},

		handleSelectPlannerArea(e) {
			this.plannerAreaName = e.area
			this.form.plannerArea = e.township.code
		},

		handleInput(field, e) {
			console.log(field, e)
			if (field === 'brandgenre') {
				if (this.pickerLayer === '1') {
					this.form[field] = e.value
				} else if (this.pickerLayer === '2') {
					this.form[field] = e.value[1] === 0 ? e.value[0] : e.value[1]
				} else if (this.pickerLayer === '3') {
					this.form[field] = e.value[2] === 0 ? e.value[1] === 0 ? e.value[0] : e.value[1] : e.value[2]
				}
				this.brandgenreName = e.result.replaceAll('无', '')
			} else if (field === 'areaId') {
				this.areaIdName = e.area
				this.form[field] = e.township.code
			} else if (field === 'code' || field === 'name' || field === 'desc' || field === 'address' || field === 'explain' || field === 'phone') {
				this.form[field] = e.detail.value
			} else if (field === 'lonAndLatString') {
				uni.chooseLocation({
					success: (res) => {
						this.form[field] = `${res.longitude},${res.latitude}`
					}
				})
			} else if (field === 'startTime' || field === 'endTime') {
				this.form[field] = e.result
			}
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../../style/var.less";
@import "../../../style/mixin.less";

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
