<template>
	<view class="kuaiDiForm">
		<NavHeader :BindClick="goBack">
			<template v-slot:body>
				<view class="defaultBody">
					{{ option.standing == "Send"?"寄件人信息":"收件人信息" }}
				</view>
			</template>
		</NavHeader>
		<view class="tui-modal-custom">
			<tui-form ref="form">
				<tuiInput label="姓名" v-model="formData.name" placeholder="请输入姓名" clearable required></tuiInput>
				<tui-input label="手机号" :lineLeft="false" placeholder="请输入手机号" v-model="formData.mobile" clearable
					required></tui-input>
				<tui-input label="地址" disabled v-model="formData.area" :lineLeft="false" placeholder="选择地址" @click="getArea"
				 required></tui-input>
				<tui-input label="详细地址" :lineLeft="false" placeholder="请输入详细地址" v-model="formData.detailedArea"
					clearable></tui-input>
			</tui-form>
			<view class="submitView">
				<!-- <tui-button width="200rpx" height="72rpx" :size="28" type="primary" shape="circle"
					@click="modal = false;" plain>取消</tui-button> -->
				<tui-button width="500rpx" height="72rpx" :size="28" type="primary" shape="circle"
					@click="submit">确定</tui-button>
			</view>
		</view>
		<tui-picker :show="addresSelect" :layer="3" :pickerData="addresData" :params="1" @hide="hide" @change="change">
		</tui-picker>
	</view>
</template>

<script>
	import cityData from '@/utils/picker.city.js'
	import tuiPicker from "@/components/thorui/tui-picker/tui-picker.vue"
	import tuiForm from "@/components/thorui/tui-form/tui-form.vue"
	import tuiInput from "@/components/thorui/tui-input/tui-input.vue"
	// import tuiModal from "@/components/thorui/tui-modal/tui-modal.vue"
	import NavHeader from "./components/header.vue";
	export default {
		components: {
			NavHeader,
			// tuiModal,
			tuiForm,
			tuiInput,
			tuiPicker
		},
		data() {
			return {
				option: "",
				formData: {
					area: "",
					detailedArea: "",
					name: "",
					mobile: "",
					standing: ""
				},
				rules: [{
					name: "mobile",
					rule: ["required", "isMobile"],
					msg: ["请输入手机号", "请输入正确的手机号"]
				}],
				// modal: false,
				addresSelect: false,
				addresData: cityData
			}
		},
		onLoad(option) {
			this.option = option
			this.formData.standing = option.standing
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
			getArea() {
				this.addresSelect = true
			},
			change(e) {
				this.formData.area = e.result
			},
			hide(e) {
				this.addresSelect = false
			},
			submit() {
				if (!this.$refs.form) return;
				this.$refs.form.validate(this.formData, this.rules).then(res => {
					// console.log(this.formData)
					uni.navigateBack({
						standingForm: JSON.stringify(this.formData)
					})
					// uni.navigateTo({
					// 	url: `/pages/index/convenient-services/kuai-di/DeliveryExpress?standingForm=${JSON.stringify(this.formData)}`
					// })
					// console.log('校验通过！')
					//this.tui.toast 等api 参考 【快手上手】文档使用
					// this.tui.toast('校验通过！')
				}).catch(errors => {
					console.log(errors)
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.defaultBody {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		font-size: 34rpx;
		color: white;
		font-weight: 550;
	}
	.tui-modal-custom {
		margin-top: 88rpx;
		box-sizing: border-box;
		padding: 20rpx;
	}
	.submitView {
		margin-top: 30rpx;
		display: flex;
		justify-content: center;
	}
</style>