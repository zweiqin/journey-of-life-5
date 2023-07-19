<template>
	<view class="field-pane-container">
		<view class="title">{{ title }}</view>
		<view v-for="item in fields" :key="item.label">
			<view v-if="(item.field === 'id') || (item.field === 'goodsObj')"></view>
			<view v-else-if="item.field === 'gooIds'" class="item">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view class="input-wrapper">关联商品：</view>
					<view>
						<tui-button
							type="danger" width="120rpx"
							height="50rpx" margin="0 10rpx 0 0" style="border-radius: 50rpx;" @click="isShowStoreGoodsPopup = true"
						>
							添加
						</tui-button>
					</view>
				</view>
				<view>
					<tui-table v-if="form.goodsObj && form.goodsObj.length">
						<tui-tr>
							<tui-td
								v-for="(part, index) in [{ title: '商品ID', key: 'id' }, { title: '商品名称', key: 'name' }, { title: '操作', key: 'operate' }]"
								:key="index" bold :span="8"
							>
								{{ part.title }}
							</tui-td>
						</tui-tr>
						<tui-tr v-for="(part, index) in form.goodsObj" :key="index">
							<tui-td :span="8">{{ part.id }}</tui-td>
							<tui-td :span="8">{{ part.name }}</tui-td>
							<tui-td :span="8">
								<tui-button
									type="blue" width="120rpx" height="50rpx" margin="0 10rpx 0 0"
									style="border-radius: 50rpx;"
									@click="handleGoodDelete(part, index)"
								>
									删除
								</tui-button>
							</tui-td>
						</tui-tr>
					</tui-table>
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
							:type="item.field === 'name' ? 'text' : 'number'"
							:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
						/>

						<textarea
							v-if="item.type === 'textarea'" :value="form[item.field]" class="textarea"
							:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
						></textarea>

						<view
							v-if="item.type === 'picker' && item.field === 'pid'" style="flex: 1" :style="{
								color: form.pid ? '' : '#999'
							}" @click="isShowPicker = true"
						>
							{{ pidName || form.pid ? `已选 ID：${form.pid}` : "请选择所属分类" }}
						</view>

					</view>
				</template>
			</view>
		</view>
		<!-- 所属分类picker -->
		<tui-picker
			:show="isShowPicker" layer="2" :picker-data="pidArr" @hide="isShowPicker = false"
			@change="handleInput('pid', $event)"
		>
		</tui-picker>

		<!-- 商品选择 -->
		<tui-bottom-popup :show="isShowStoreGoodsPopup" @close="isShowStoreGoodsPopup = false">
			<BrandGoodsList v-if="isShowStoreGoodsPopup" :brand-id="brandId" @send="handleSend"></BrandGoodsList>
		</tui-bottom-popup>

	</view>
</template>

<script>
import { getPublicAppointmentApi } from '.././../../../api/user'
import { getUserId, getBrandId } from '../../../../utils'

export default {
	name: 'FieldPaneGF',
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
			isShowPicker: false,
			brandId: getBrandId(),
			isShowStoreGoodsPopup: false,
			pidName: '',
			pidArr: []
		}
	},

	watch: {
		fields: {
			handler(value) {
				if (value) {
					const form = {}
					for (const item of value) {
						form[item.field] = this.value[item.field]
						if (item.type === 'picker' && item.field === 'pid') this.getGoodsType()
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
			getPublicAppointmentApi()
				.then((res) => {
					this.pidArr = res.data
					this.mapTree(this.pidArr, '1')
				})
				.catch((e) => {
					this.$showToast('所属分类列表获取失败')
				})
		},
		mapTree(data, level) {
			data.forEach((items) => {
				items.text = items.name
				items.value = items.id
				if (level === '1' && items.categoryVoList && items.categoryVoList.length === 0) {
					items.children[0] = { text: '无', value: 0 }
				} else if (level === '1' && !items.categoryVoList) {
					items.children = [ { text: '无', value: 0 } ]
				} else if (level === '1' && items.categoryVoList && !(items.categoryVoList.length === 0)) {
					items.children = items.categoryVoList
				}
				if (items.children) {
					this.mapTree(items.children, String(Number(level) + 1))
				}
			})
		},

		// 关联商品相关
		handleGoodDelete(row, index) {
			this.form.goodsObj.splice(index, 1)
			this.form.gooIds.splice(index, 1)
		},
		handleSend(obj) {
			if (this.form.goodsObj.find((item) => item.id === obj.id)) return this.$showToast('不能选择重复商品类型')
			this.isShowStoreGoodsPopup = false
			this.form.goodsObj.push({ id: obj.id, name: obj.name })
			this.form.gooIds.push(obj.id)
		},

		handleInput(field, e) {
			console.log(field, e)
			if (field === 'pid') {
				if (e.value[1] === 0) return this.$showToast('不能选择一级预约项目')
				this.form[field] = e.value[1]
				this.pidName = e.text.join('-')
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
