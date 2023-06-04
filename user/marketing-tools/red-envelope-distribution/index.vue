<template>
	<view class="red-envelope-distribution-container">
		<JHeader tabbar="/pages/user/user" width="50" height="50" title="红包发放"></JHeader>

		<view class="line-item" @click="handleChoosePublish">
			<view class="title">发布类型</view>
			<input v-model="redForm.wrapName" disabled placeholder="请选择发布类型" class="input-el" />
		</view>

		<!-- <view class="line-item">
			<view class="title">发布者名称</view>
			<input v-model="redForm.publisherName" type="text" placeholder="请输入发布者名称" class="input-el" />
			</view> -->

		<view class="line-item">
			<image
				class="icon" :src="common.seamingImgUrl('802z9z04t98uxzfyrz06.png')"
				mode=""
			/>
			<view class="title">红包金额</view>
			<input v-model.number="redForm.redpackAllmonkey" type="number" placeholder="请输入红包金额" class="input-el" />
			<view class="company">元</view>
		</view>

		<view class="line-item">
			<image
				class="icon" :src="common.seamingImgUrl('mk74fnhfp4fu7djpnh3h.png')"
				mode=""
			/>
			<view class="title">红包个数</view>
			<input v-model.number="redForm.redpackNumber" type="number" placeholder="请输入红包个数" class="input-el" />
			<view class="company">个</view>
		</view>

		<view style="margin-top: 90upx;">
			<tui-list-cell padding="0">
				<tui-radio-group v-model="redForm.type">
					<text>红包金额是否随机</text>
					<text style="padding-left: 20rpx;">
						<tui-radio value="1" color="#07c160" border-color="#999">
						</tui-radio>
						<text>是</text>
					</text>
					<text style="padding-left: 20rpx;">
						<tui-radio value="0" color="#07c160" border-color="#999">
						</tui-radio>
						<text>否</text>
					</text>
				</tui-radio-group>
			</tui-list-cell>
		</view>

		<view class="line-item" @click="handleChooseRange">
			<image
				class="icon" :src="common.seamingImgUrl('bcn99sapk1p3nzm56285.png')"
				mode=""
			/>
			<view class="title">红包范围</view>
			<view class="input-el">
				{{
					redForm.effectiveDistance | filterEffectiveDistance
				}}
			</view>
		</view>

		<view class="line-item" @click="handleChooseRedPackLocation">
			<JIcon type="blue-locale" width="36" height="40"></JIcon>
			<view class="title">红包位置</view>
			<input v-model="redPackAddress" readonly disabled class="input-el" />
		</view>

		<view class="title-form">内容留言</view>
		<textarea
			v-model.trim="redForm.remark" placeholder="（留言15字符以内）" class="rich-text" cols="30"
			rows="10"
			maxlength="15"
		></textarea>
		<view class="title-form">
			红包背景
			<button v-show="redForm.imageUrl" class="preview" @click="handlePreview">
				红包预览
			</button>
		</view>

		<view class="upload-pane">
			<view class="left">
				<view v-if="!redForm.imageUrl" class="upload" @click="chooseImg">+</view>
				<image v-else class="iamge-background" :src="redForm.imageUrl" mode="" />
			</view>
			<image
				v-show="redForm.imageUrl" class="delete-icon" src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ghggvke7uc134gbv71gh.png"
				mode="" @click="removeBackground"
			/>
		</view>

		<button class="sendRedPackage" @click="handleSend">塞进红包</button>

		<view ref="previewWrapperRef" class="preview-wrapper">
			<JRedEnvelope
				:desc="redForm.remark" :src="redForm.imageUrl" :name="userInfo.nickName"
				:avatar="common.seamingImgUrl(userInfo.avatarUrl)"
			></JRedEnvelope>
			<view class="op">
				<button class="btn" @click="reUploadBgi">重新上传</button>
				<button class="btn" @click="closePreview">确认</button>
			</view>
		</view>
	</view>
</template>

<script>
import { J_USER_TOKEN, J_PAY_TYPE, J_USER_INFO } from '../../../constant'
import { payFn } from '../../../utils/pay'
import { getUserId } from '../../../utils'
import { uploadFle, getBusinessInfoByUserIdApi, sendRedEnvelopeApi, addWrapRedReleaseApi } from '../../../api/user'
import { payOrderGoodsApi } from '../../../api/goods'

export default {
	name: 'RedEnvelopeDistribution',
	onLoad(option) {
		uni.$on('sendWrapMsg', (data) => {
			console.log(data)
			this.redForm.wrapType = data.data.wrapType
			this.redForm.wrapName = data.data.wrapName
			this.redForm.magicId = data.data.magicId
		})
	},
	onShow() {
		// const _this = this
		// getBusinessInfoByUserIdApi()
		// 	.then((res) => {
		// 		_this.businessInfo = res.data
		// 	})
		// 	.catch((err) => {
		// 		uni.showModal({
		// 			title: '提示',
		// 			content: '您还不是商家或营销策划师,是否去升级？',
		// 			success(res) {
		// 				if (res.confirm) {
		// 					// uni.navigateTo({
		// 					//   url: "/user/sever/userUp",
		// 					// });
		// 				} else if (res.cancel) {
		// 					// uni.switchTab({
		// 					//   url: "/pages/user/user",
		// 					// });
		// 				}
		// 			}
		// 		})
		// 	})
	},
	onUnload(option) {
		uni.$off('sendWrapMsg', function (data) {
			console.log(data)
		})
	},

	filters: {
		filterEffectiveDistance(value) {
			const items = [
				{
					label: '1km',
					value: 1
				},
				{
					label: '2km',
					value: 2
				},
				{
					label: '3km',
					value: 3
				},
				{
					label: '4km',
					value: 4
				},
				{
					label: '5km',
					value: 5
				}
			]
			const item = items.find((item) => item.value === value)
			if (item) {
				return item.label
			}
			return '--'
		}
	},
	data() {
		return {
			redForm: {
				userId: getUserId(),
				wrapType: '',
				wrapName: '',
				magicId: '',
				// publisherName: '',
				redpackAllmonkey: '',
				redpackNumber: '',
				effectiveDistance: 1,
				remark: '',
				imageUrl: '',
				latitude: null,
				longitude: null,
				type: '0'
			},
			redPackAddress: '',
			userInfo: uni.getStorageSync(J_USER_INFO) || {}
		}
	},

	methods: {
		// 点击进入模板选择页面
		handleChoosePublish() {
			uni.navigateTo({
				url: '/user/marketing-tools/red-envelope-distribution/publication-type'
			})
		},

		// 删除红包背景
		removeBackground() {
			const _this = this
			uni.showModal({
				title: '提示',
				content: '确定删除当前红包背景吗？',
				success(res) {
					if (res.confirm) {
						_this.redForm.imageUrl = ''
					}
				}
			})
		},

		// 选择图片
		chooseImg() {
			const _this = this
			uni.chooseImage({
				count: 1,
				success: (chooseImageRes) => {
					uni.uploadFile({
						url: 'https://www.tuanfengkeji.cn:9527/jf-app-api/wx/storage/upload',
						filePath: chooseImageRes.tempFiles[0].path,
						name: 'file',
						success: (uploadFileRes) => {
							_this.redForm.imageUrl = _this.common.seamingImgUrl(JSON.parse(uploadFileRes.data).data.url)
							this.$refs.previewWrapperRef.$el.style.transform = 'scale(1)'
						}
					})
				}
			})
		},

		handleChooseRedPackLocation() {
			const _this = this
			uni.chooseLocation({
				success(res) {
					_this.redPackAddress = res.name
					_this.redForm.latitude = res.latitude
					_this.redForm.longitude = res.longitude
				}
			})
		},

		// 发送红包
		handleSend() {
			if ((this.redForm.wrapType === undefined || this.redForm.wrapType === '' || this.redForm.wrapType === null) || !this.redForm.magicId) {
				this.$showToast('请选择发布类型')
				return
			}
			if (
				!this.redForm.redpackNumber ||
				typeof this.redForm.redpackNumber !== 'number' ||
				this.redForm.redpackNumber <= 0
			) {
				this.$showToast('请输入正确的红包个数')
				return
			}
			if (
				!this.redForm.redpackAllmonkey ||
				typeof this.redForm.redpackAllmonkey !== 'number'
			) {
				this.$showToast('请输入正确的红包金额')
				return
			}
			if (this.redForm.redpackAllmonkey < 0.2) {
				this.$showToast('红包金额不能小于0.2')
			}
			if (!this.redForm.latitude || !this.redForm.longitude) {
				this.$showToast('请选择红包位置')
				return
			}
			if (!this.redForm.type) {
				this.$showToast('请选择金额是否随机')
				return
			}
			const data = {
				userId: this.redForm.userId,
				// publisherName: this.redForm.publisherName,
				wrapType: this.redForm.wrapType,
				latitude: this.redForm.latitude,
				longitude: this.redForm.longitude,
				magicId: this.redForm.magicId,
				redpackNumber: this.redForm.redpackNumber,
				redpackAllmonkey: this.redForm.redpackAllmonkey,
				imageUrl: this.redForm.imageUrl,
				remark: this.redForm.remark,
				effectiveDistance: this.redForm.effectiveDistance || 1,
				type: this.redForm.type,
				brandId: this.userInfo.brandId || ''
			}
			addWrapRedReleaseApi(data)
				.then((res) => {
					if (res.errno !== 0) {
						uni.showToast({
							title: '红包发送失败',
							duration: 2000,
							icon: 'none'
						})
						return
					}
					payOrderGoodsApi({
						orderNo: res.data,
						userId: getUserId(),
						payType: 8
					}).then((res) => {
						payFn(res, J_PAY_TYPE.RED_PACK.value)
					})
				})
				.catch(() => {
					this.$showToast('红包发送失败')
				})
		},

		// 预览红包
		handlePreview() {
			this.$refs.previewWrapperRef.$el.style.transform = 'scale(1)'
		},

		// 关闭预览弹窗
		closePreview() {
			this.$refs.previewWrapperRef.$el.style.transform = 'translateX(-100%)'
		},

		// 点击重新上传
		reUploadBgi() {
			this.redForm.imageUrl = ''
			this.closePreview()
		},

		// 点击选择范围
		handleChooseRange() {
			const _this = this
			uni.showActionSheet({
				itemList: ['1km', '2km', '3km', '4km', '5km'],
				success: (res) => {
					console.log(res)
					_this.redForm.effectiveDistance = res.tapIndex + 1
					console.log(_this.redForm.effectiveDistance)
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../../style/mixin.less";

.red-envelope-distribution-container {
	padding: 40upx;
	box-sizing: border-box;
	font-size: 24upx;
	color: #3d3d3d;

	.line-item {
		margin-top: 90upx;
		display: flex;
		align-items: center;
		padding: 20upx 0;
		padding-right: 20upx;
		border-bottom: 1upx solid #d8d8d8;

		.title {
			margin: 0 28upx;
		}

		.icon {
			width: 36upx;
			height: 40upx;
		}

		.input-el {
			text-align: right;
			flex: 1;
			font-size: 24upx;
			margin-right: 10upx;
		}
	}

	.title-form {
		margin: 28upx 0;
	}

	.rich-text {
		width: 100%;
		height: 264upx;
		border: 1upx solid #d8d8d8;
		border-radius: 20upx;
		padding: 28upx 16upx;
		box-sizing: border-box;
		font-size: 24upx;

		/deep/ .uni-textarea-placeholder {
			font-size: 24upx;
			color: #999;
		}
	}

	.upload-pane {
		border: 1upx solid #d8d8d8;
		padding: 32upx 24upx;
		box-sizing: border-box;
		border-radius: 20upx;

		display: flex;
		justify-content: space-between;
		align-items: flex-end;

		.delete-icon {
			width: 32upx;
			height: 36upx;
		}

		.left {
			display: flex;
			align-items: center;
		}

		.upload {
			margin: 0;
			width: 160upx;
			height: 160upx;
			background-color: #d8d8d8;
			border-radius: 20upx;
			color: #767676;
			text-align: center;
			line-height: 160upx;
			font-size: 60upx;
		}

		.iamge-background {
			width: 160upx;
			height: 160upx;
			object-fit: cover;
		}
	}

	.sendRedPackage {
		width: 100%;
		height: 72upx;
		line-height: 72upx;
		background-color: #fa5151;
		color: #fff;
		font-size: 32upx;
		padding: 0;
		border-radius: 100px;
		margin-top: 100upx;
	}

	.preview {
		margin: 0;
		padding: 0;
		width: auto;
		font-size: 24upx;
		line-height: 1;
		display: inline;
		background-color: transparent;
		border: none !important;
		float: right;
		padding: 0 4upx;
		color: #07b9b9;
		transition: all 350ms;
	}

	.preview-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgb(255, 255, 255);
		transition: all 350ms;
		.flex(center, center);
		flex-direction: column;
		padding: 0 40upx;
		box-sizing: border-box;
		transform: scale(0);
		transition: all 350ms;

		.op {
			margin-top: 40upx;
			.flex();
			width: 100%;

			.btn {
				margin: 0;
				padding: 0;
				flex: 1;
				background-color: #fa5151;
				color: #fff;

				&:nth-child(1) {
					margin-right: 20upx;
				}
			}
		}
	}
}
</style>
