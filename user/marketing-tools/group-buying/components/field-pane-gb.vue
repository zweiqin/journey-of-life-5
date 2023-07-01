<template>
	<view class="field-pane-container">
		<view class="title">{{ title }}</view>
		<view v-for="item in fields" :key="item.label">
			<view v-if="item.field === 'id'"></view>
			<view v-else-if="item.field === 'goodsName'"></view>
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
							:type="item.field === 'discount' || item.field === 'discountMember' ? 'number' : 'text'"
							:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
						/>

						<view v-if="item.type === 'time' && item.field === 'expireTime'" style="flex: 1;">
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

						<view v-if="item.type === 'picker' && item.field === 'goodsId'" style="flex: 1;">
							<input
								:value="form.goodsName" class="input" :disabled="true" type="text"
								:placeholder="item.placeholder" @click="isShowStoreGoodsPopup = true"
							/>
						</view>

					</view>
				</template>
			</view>
		</view>
		<!-- 商品选择 -->
		<tui-bottom-popup :show="isShowStoreGoodsPopup" @close="isShowStoreGoodsPopup = false">
			<BrandGoodsList v-if="isShowStoreGoodsPopup" :brand-id="brandId" @send="handleSend"></BrandGoodsList>
		</tui-bottom-popup>

	</view>
</template>

<script>
import { getGoodsTypeApi } from '.././../../../api/user'
import { getUserId, getBrandId } from '../../../../utils'

export default {
	name: 'FieldPaneGB',
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
			form: { },
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
		handleSend(obj) {
			this.isShowStoreGoodsPopup = false
			this.form.goodsId = obj.id
			this.form.goodsName = obj.name
		},

		handleInput(field, e) {
			console.log(field, e)
			if (field === 'expireTime') {
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

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}
}
</style>
