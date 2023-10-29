<template>
	<view class="field-pane-container">
		<view class="title">{{ title }}</view>
		<view v-for="item in fields" :key="item.field">
			<view v-if="item.field === 'id'"></view>
			<view v-else-if="item.field === 'branchId' || item.field === 'areaUserOne'">
				<view v-if="form.isConnectBranch === 'true'" class="item">
					<template>
						<view
							class="input-wrapper" :style="{
								'flex-direction': item.type === 'textarea' ? 'column' : '',
								'align-items': item.type === 'textarea' ? 'flex-start' : ''
							}"
						>
							<view class="sub-title">{{ item.label }}</view>

							<input
								v-if="item.type === 'select'" :value="branchIdName" class="input" :disabled="true"
								type="text"
								:placeholder="item.placeholder" @click="handleBranchListSelect"
							/>

							<view v-if="item.type === 'subregion'" style="flex: 1">
								<view v-if="form.area">
									<JSubArea
										:code="form.area" :text="areaUserNameOne" :placeholder="item.placeholder"
										@confirm="handleInput(item.field, $event)"
									></JSubArea>
								</view>
								<view v-else style="color: #999999;" @click="$showToast('请先选择分公司')">省份、城市、区县、乡镇</view>
							</view>

						</view>
					</template>
				</view>
				<view v-else></view>
			</view>
			<view v-else-if="item.field === 'areaUserTwo'">
				<view v-if="form.isConnectBranch === 'false'" class="item">
					<template>
						<view
							class="input-wrapper" :style="{
								'flex-direction': item.type === 'textarea' ? 'column' : '',
								'align-items': item.type === 'textarea' ? 'flex-start' : ''
							}"
						>
							<view class="sub-title">{{ item.label }}</view>

							<view v-if="item.type === 'subregion'" style="flex: 1">
								<JAnyArea
									:text="areaUserNameTwo" :placeholder="item.placeholder"
									@confirm="handleInput(item.field, $event)"
								></JAnyArea>
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
							'flex-direction': item.type === 'textarea' || item.type === 'select' ? 'column' : '',
							'align-items': item.type === 'textarea' || item.type === 'select' ? 'flex-start' : ''
						}"
					>
						<view class="sub-title" style="margin-bottom: 20upx;">{{ item.label }}</view>

						<!-- <JAnyCity
							v-if="item.type === 'city'" style="flex: 1" :text="areaName" :placeholder="item.placeholder"
							@confirm="handleInput(item.field, $event)"
							></JAnyCity> -->

						<tui-radio-group
							v-if="item.type === 'radio'" v-model="form[item.field]" style="display: flex;"
							@change="(e) => { }"
						>
							<tui-label
								v-for="(part, index) in [{ name: '是', value: 'true' }, { name: '否', value: 'false' }]"
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

						<textarea
							v-if="item.type === 'textarea'" :value="form[item.field]" class="textarea"
							:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
						></textarea>
					</view>
				</template>
			</view>
		</view>
		<!-- 分公司 -->
		<tui-select
			:list="branchList" reverse :show="isShowBranchListSelect" @confirm="handleSelectBranchList"
			@close="isShowBranchListSelect = false"
		></tui-select>
	</view>
</template>

<script>
import { getBranchOfficeApi } from '.././../../api/user'

export default {
	name: 'FieldPaneMP',
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
			form: {
				area: '',
				branchId: '',
				areaUser: '',
				address: ''
			},
			// areaName: '',
			areaUserNameOne: '',
			areaUserNameTwo: '',
			branchIdName: '',
			branchList: [],
			isShowBranchListSelect: false
		}
	},

	watch: {
		fields: {
			handler(value) {
				if (value) {
					const form = {}
					for (const item of value) {
						form[item.field] = this.value[item.field]
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

	mounted() { },

	methods: {
		async handleBranchListSelect(e) {
			// if (this.form.area) {
			// 	await getBranchOfficeApi({ area: this.form.area })
			await getBranchOfficeApi()
				.then((res) => {
					this.branchList = res.data.map((item) => ({
						...item,
						value: item.id,
						text: `${item.nickname}（${item.address}）`
					}))
					this.isShowBranchListSelect = true
				})
			// } else {
			// 	this.$showToast('请先选择分公司所属地区')
			// }
		},
		handleSelectBranchList(e) {
			this.isShowBranchListSelect = false
			this.branchIdName = `${e.options.nickname}（区域编码：${e.options.areaId}）`
			this.form.area = e.options.areaId
			this.form.branchId = e.options.id
		},

		handleInput(field, e) {
			console.log(field, e)
			// if (field === 'area') {
			// 	this.form[field] = e.county.code || e.city.code || e.province.code
			// 	this.areaName = e.area
			// } else
			if (field === 'areaUserOne') {
				this.form[field] = e.areaInfo[e.areaInfo.length - 1].code
				this.areaUserNameOne = e.area
			} else if (field === 'areaUserTwo') {
				this.form[field] = e.county.code || e.city.code || e.province.code
				this.areaUserNameTwo = e.area
			} else if (field === 'address') {
				this.form[field] = e.detail.value
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
		margin-bottom: 76upx;

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
