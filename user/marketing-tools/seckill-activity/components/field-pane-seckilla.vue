<template>
	<view class="field-pane-container">
		<view class="title">{{ title }}</view>
		<view v-for="item in fields" :key="item.label">
			<view v-if="item.field === 'id'"></view>
			<view v-else-if="item.field === 'goods'" class="item">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<view class="input-wrapper">关联商品：</view>
					<view>
						<tui-button
							type="danger" width="120rpx"
							height="50rpx" margin="0 10rpx 0 0" style="border-radius: 50rpx;" @click="handleGoodsRelateShow"
						>
							添加
						</tui-button>
					</view>
				</view>
				<view>
					<tui-table v-if="form.goods && form.goods.length">
						<tui-tr>
							<tui-td
								v-for="(part, index) in [{ title: '商品ID', key: 'id' }, { title: '库存', key: 'name' }, { title: '秒杀价', key: 'name' }, { title: '操作', key: 'operate' }]"
								:key="index" bold :span="8"
							>
								{{ part.title }}
							</tui-td>
						</tui-tr>
						<tui-tr v-for="(part, index) in form.goods" :key="index">
							<tui-td :span="8">{{ part.goodsId }}</tui-td>
							<tui-td :span="8">{{ part.stock }}</tui-td>
							<tui-td :span="8">{{ part.seckillPrice }}</tui-td>
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

						<view v-if="item.type === 'time' && item.field === 'startTime'" style="flex: 1;">
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

						<view v-if="item.type === 'time' && item.field === 'endTime'" style="flex: 1;">
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
		</view>

		<!-- 商品选择 -->
		<tui-bottom-popup :show="isShowStoreGoodsPopup" @close="isShowStoreGoodsPopup = false">
			<BrandGoodsList v-if="isShowStoreGoodsPopup" :brand-id="brandId" @send="handleSend"></BrandGoodsList>
		</tui-bottom-popup>

		<tui-dialog
			style="position: relative;z-index: 888;" :buttons="[{ text: '取消' }, { text: '确定', color: '#586c94' }]"
			:show="goodsRelateVisiable" title="设置关联商品" @click="handleClickGoodsRelateDialog"
		>
			<template #content>
				<tui-input
					v-model="tempGoodsName" disabled label="商品" placeholder="请选择商品"
					clearable
					@click="isShowStoreGoodsPopup = true"
				></tui-input>
				<tui-input v-model="goodsRelateForm.stock" type="number" label="库存" placeholder="请输入库存" clearable></tui-input>
				<tui-input v-model="goodsRelateForm.seckillPrice" type="number" label="秒杀价" placeholder="请输入秒杀价" clearable></tui-input>
			</template>
		</tui-dialog>

	</view>
</template>

<script>
import { getPublicAppointmentApi } from '.././../../../api/user'
import { getUserId, getBrandId } from '../../../../utils'

export default {
	name: 'FieldPaneSeckillA',
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
			pidName: '',
			pidArr: [],
			// 关联商品
			isShowStoreGoodsPopup: false,
			tempGoodsName: '',
			goodsRelateVisiable: false,
			goodsRelateForm: { goodsId: '', stock: '', seckillPrice: '' }
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

		// 关联商品
		handleGoodsRelateShow() {
			this.goodsRelateForm = { goodsId: '', stock: '', seckillPrice: '' }
			this.goodsRelateVisiable = true
		},
		handleClickGoodsRelateDialog(e) {
			if (e.index === 0) {
				this.goodsRelateVisiable = false
			} else if (e.index === 1) {
				if (!this.goodsRelateForm.goodsId) return this.$showToast('请选择商品')
				if (!this.goodsRelateForm.stock) return this.$showToast('请填写库存')
				if (!this.goodsRelateForm.seckillPrice) return this.$showToast('请填写秒杀价')
				this.form.goods.push(this.goodsRelateForm)
				this.goodsRelateVisiable = false
			}
		},
		handleSend(obj) {
			if (this.form.goods.find((item) => item.goodsId === obj.id)) return this.$showToast('不能选择重复商品')
			this.goodsRelateForm.goodsId = obj.id
			this.tempGoodsName = obj.name
			this.isShowStoreGoodsPopup = false
		},
		handleGoodDelete(row, index) {
			this.form.goods.splice(index, 1)
		},

		handleInput(field, e) {
			console.log(field, e)
			if (field === 'pid') {
				if (e.value[1] === 0) return this.$showToast('不能选择一级预约项目')
				this.form[field] = e.value[1]
				this.pidName = e.text.join('-')
			} else if (field === 'name') {
				this.form[field] = e.detail.value
			} else if (field === 'startTime' || field === 'endTime') {
				this.form[field] = e.result
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
