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

					<JCity
						v-if="item.type === 'city'" style="flex: 1" :text="areaName" :placeholder="item.placeholder"
						@confirm="handleInput(item.field, $event)"
					></JCity>

					<JArea
						v-if="item.type === 'area'" style="flex: 1" :text="areaUserName" :placeholder="item.placeholder"
						@confirm="handleInput(item.field, $event)"
					></JArea>

					<textarea
						v-if="item.type === 'textarea'" :value="form[item.field]" class="textarea"
						:placeholder="item.placeholder" @input="handleInput(item.field, $event)"
					></textarea>
				</view>
			</template>
		</view>
	</view>
</template>

<script>
// import { getStoreTypesApi } from '.././../../api/user'

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
			form: {},
			areaName: '',
			areaUserName: ''
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

	mounted() {},

	methods: {
		handleInput(field, e) {
			console.log(field, e)
			if (field === 'area') {
				this.form[field] = e.city.code
				this.areaName = e.area
			} else if (field === 'areaUser') {
				this.form[field] = e.township.code
				this.areaUserName = e.area
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
