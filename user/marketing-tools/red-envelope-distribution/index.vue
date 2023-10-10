<template>
	<view class="red-envelope-distribution-container">
		<JHeader tabbar="/pages/user/user" width="50" height="50" title="红包发放"></JHeader>

		<view style="font-size: 30upx;">
			<!-- <view class="line-item" @click="go('/user/marketing-tools/red-envelope-distribution/publication-type')">
				<view>发布类型</view>
				<input v-model="redForm.wrapName" disabled placeholder="请选择发布类型" class="input-el" placeholder-style="color:#9F9F9F" />
				</view> -->

			<!-- <view class="line-item">
				<view>发布者名称</view>
				<input v-model="redForm.publisherName" type="text" placeholder="请输入发布者名称" class="input-el" placeholder-style="color:#9F9F9F" />
				</view> -->

			<view class="line-item">
				<text>红包类型</text>
				<tui-radio-group
					v-model="redForm.wrapType"
					style="flex: 1;display: flex;justify-content: flex-end;flex-wrap: wrap;"
					@change="(e) => {}"
				>
					<block v-if="userInfo.roleIds === 6 && brandId">
						<tui-label
							v-for="(part, index) in [{ name: '普通红包', value: '0' }, { name: '携带优惠券红包', value: '1' }]"
							:key="index"
						>
							<tui-list-cell padding="16upx">
								<view>
									<tui-radio :checked="false" :value="part.value" color="#07c160" border-color="#999">
									</tui-radio>
									<text>{{ part.name }}</text>
								</view>
							</tui-list-cell>
						</tui-label>
					</block>
					<block v-else>
						<tui-label
							v-for="(part, index) in [ { name: '普通红包', value: '0' } ]"
							:key="index"
						>
							<tui-list-cell padding="16upx">
								<view>
									<tui-radio :checked="false" :value="part.value" color="#07c160" border-color="#999">
									</tui-radio>
									<text>{{ part.name }}</text>
								</view>
							</tui-list-cell>
						</tui-label>
					</block>
				</tui-radio-group>
			</view>

			<view
				v-if="userInfo.roleIds === 6 && brandId && redForm.wrapType === '1'" class="line-item"
				@click="isShowCouponPopup = true"
			>
				<view>红包关联优惠券</view>
				<input
					v-model="redForm.couponName" disabled placeholder="请选择发布类型" class="input-el"
					placeholder-style="color:#9F9F9F"
				/>
			</view>

			<view v-if="userInfo.roleIds === 6 && brandId" class="line-item" @click="isShowStoreGoodsPopup = true">
				<view>红包关联商品</view>
				<input
					v-model="redForm.goodsName" disabled placeholder="请选择发布类型" class="input-el"
					placeholder-style="color:#9F9F9F"
				/>
			</view>

			<view class="line-item">
				<view>红包金额</view>
				<input
					v-model.number="redForm.redpackAllmonkey" type="digit" placeholder="请输入红包金额" class="input-el"
					placeholder-style="color:#9F9F9F"
				/>
				<view class="company">元</view>
			</view>

			<view class="line-item">
				<view>红包个数</view>
				<input
					v-model.number="redForm.redpackNumber" type="number" placeholder="请输入红包个数" class="input-el"
					placeholder-style="color:#9F9F9F"
				/>
				<view class="company">个</view>
			</view>

			<view class="line-item">
				<text>红包金额</text>
				<tui-radio-group
					v-model="redForm.type"
					style="flex: 1;display: flex;justify-content: flex-end;flex-wrap: wrap;"
					@change="(e) => {}"
				>
					<tui-label
						v-for="(part, index) in [{ name: '随机', value: '1' }, { name: '等额', value: '0' }]"
						:key="index"
					>
						<tui-list-cell padding="16upx">
							<view>
								<tui-radio :checked="false" :value="part.value" color="#07c160" border-color="#999">
								</tui-radio>
								<text>{{ part.name }}</text>
							</view>
						</tui-list-cell>
					</tui-label>
				</tui-radio-group>
			</view>

			<view class="line-item" @click="handleChooseRange">
				<view>红包范围</view>
				<view class="input-el">
					{{ redForm.effectiveDistance | filterEffectiveDistance }}
				</view>
			</view>

			<view class="line-item" @click="handleChooseRedPackLocation">
				<view>红包位置</view>
				<input
					v-model="redPackAddress" readonly disabled placeholder="请选择红包位置"
					class="input-el"
					placeholder-style="color:#9F9F9F"
				/>
			</view>

			<view style="margin-top: 40upx;">
				<view class="title-form">红包内容</view>
				<textarea
					v-model.trim="redForm.publisherText" placeholder="（留言15字符以内）" class="rich-text" cols="30"
					rows="10"
					maxlength="15"
				></textarea>
			</view>

			<view style="margin-top: 40upx;">
				<view class="title-form">
					红包图片
					<button v-show="redForm.picUrl" class="preview" @click="handlePreview">
						红包预览
					</button>
				</view>
				<view class="upload-pane">
					<view class="left">
						<view v-if="!redForm.picUrl" class="upload" @click="chooseImg">+</view>
						<image v-else class="iamge-background" :src="redForm.picUrl" mode="" />
					</view>
					<image
						v-show="redForm.picUrl" class="delete-icon" :src="common.seamingImgUrl('ghggvke7uc134gbv71gh.png')"
						mode="" @click="removeBackground"
					/>
				</view>
			</view>
		</view>

		<button class="sendRedPackage" @click="handleConfirm">确定</button>

		<view ref="previewWrapperRef" class="preview-wrapper">
			<JRedEnvelope
				:is-show="showRedPackage" :show-type="redEnvelopeType" :desc="redForm.publisherText"
				:src="redForm.picUrl" :name="userInfo.nickName" :avatar="common.seamingImgUrl(userInfo.avatarUrl)"
				@click-red="redEnvelopeType = 1" @close="(showRedPackage = false) || (redEnvelopeType = 0) || closePreview()"
			>
			</JRedEnvelope>
		</view>

		<!-- 优惠券选择 -->
		<view v-if="userInfo.roleIds === 6 && brandId">
			<tui-bottom-popup :show="isShowCouponPopup" @close="isShowCouponPopup = false">
				<BrandCouponList :brand-id="brandId" btn-text="选择" @click-btn="handleSelectCoupon">
				</BrandCouponList>
			</tui-bottom-popup>
		</view>

		<!-- 商品选择 -->
		<view v-if="userInfo.roleIds === 6 && brandId">
			<tui-bottom-popup :show="isShowStoreGoodsPopup" @close="isShowStoreGoodsPopup = false">
				<BrandGoodsList v-if="isShowStoreGoodsPopup" :brand-id="brandId" @send="handleSend"></BrandGoodsList>
			</tui-bottom-popup>
		</view>
	</view>
</template>

<script>
import { J_PAY_TYPE, J_USER_INFO, J_BRAND_ID } from '../../../constant'
import { payFn } from '../../../utils/pay'
import { getUserId } from '../../../utils'
import { uploadFle, sendRedEnvelopeApi, addWrapRedReleaseApi } from '../../../api/user'

export default {
	name: 'RedEnvelopeDistribution',
	onLoad(option) {
		// uni.$on('sendWrapMsg', (data) => {
		// 	console.log(data)
		// 	this.redForm.wrapType = data.data.wrapType
		// 	this.redForm.wrapName = data.data.wrapName
		// 	this.redForm.magicId = data.data.magicId
		// })
	},
	onShow() {
	},
	onUnload(option) {
		// uni.$off('sendWrapMsg', function (data) {
		// 	console.log(data)
		// })
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
				// wrapName: '',
				// magicId: '',
				// publisherName: '',
				redpackAllmonkey: '',
				redpackNumber: '',
				type: '0',
				effectiveDistance: 1,
				latitude: null,
				longitude: null,
				publisherText: '',
				picUrl: '',
				bindLink: '',
				goodsName: '',
				business: '',
				couponName: ''
			},
			redPackAddress: '',
			userInfo: uni.getStorageSync(J_USER_INFO) || {},
			brandId: uni.getStorageSync(J_BRAND_ID) || '',
			showRedPackage: false,
			redEnvelopeType: 0,
			isShowCouponPopup: false,
			isShowStoreGoodsPopup: false
		}
	},

	methods: {
		handleSend(obj) {
			this.isShowStoreGoodsPopup = false
			this.redForm.bindLink = obj.id
			this.redForm.goodsName = obj.name
		},
		handleSelectCoupon(obj) {
			this.isShowCouponPopup = false
			this.redForm.business = obj.id
			this.redForm.couponName = obj.name
		},

		// 删除红包图片
		removeBackground() {
			const _this = this
			uni.showModal({
				title: '提示',
				content: '确定删除当前红包图片吗？',
				success(res) {
					if (res.confirm) {
						_this.redForm.picUrl = ''
					}
				}
			})
		},

		// 选择图片
		chooseImg() {
			uni.chooseImage({
				count: 1,
				success: (chooseImageRes) => {
					uni.uploadFile({
						url: 'https://appapi.jfcmei.com/wx/storage/upload',
						filePath: chooseImageRes.tempFiles[0].path,
						name: 'file',
						success: (uploadFileRes) => {
							this.redForm.picUrl = this.common.seamingImgUrl(JSON.parse(uploadFileRes.data).data.url)
							// this.$refs.previewWrapperRef.$el.style.transform = 'scale(1)'
						}
					})
				}
			})
		},

		handleChooseRedPackLocation() {
			uni.chooseLocation({
				success: (res) => {
					this.redPackAddress = res.name
					this.redForm.latitude = res.latitude
					this.redForm.longitude = res.longitude
				}
			})
		},

		// 发送红包
		handleConfirm() {
			// if ((this.redForm.wrapType === undefined || this.redForm.wrapType === '' || this.redForm.wrapType === null) || !this.redForm.magicId) {
			// 	this.$showToast('请选择发布类型')
			// 	return
			// }
			if (this.redForm.wrapType === undefined || this.redForm.wrapType === '' || this.redForm.wrapType === null) {
				this.$showToast('请选择红包类型')
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
			if (this.redForm.redpackNumber < 2) {
				this.$showToast('红包数量至少两个哟~')
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
				this.$showToast('请选择红包金额选项')
				return
			}
			const data = {
				userId: this.redForm.userId,
				// publisherName: this.redForm.publisherName,
				wrapType: this.redForm.wrapType,
				latitude: this.redForm.latitude,
				longitude: this.redForm.longitude,
				// magicId: this.redForm.magicId, // 去除
				redpackNumber: this.redForm.redpackNumber,
				redpackAllmonkey: this.redForm.redpackAllmonkey,
				// imageUrl: this.redForm.imageUrl, // 去除
				// remark: this.redForm.remark, // 去除
				effectiveDistance: this.redForm.effectiveDistance || 1,
				type: this.redForm.type,
				brandId: this.brandId || '',
				wrapRedText: {
					publisherText: this.redForm.publisherText,
					bindLink: this.redForm.bindLink,
					business: this.redForm.wrapType === '1' ? this.redForm.business : '',
					picUrl: this.redForm.picUrl
				}
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
					payFn({ orderSn: res.data }, 8, J_PAY_TYPE.RED_PACK.value)
				})
				.catch(() => {
					this.$showToast('红包发送失败')
				})
		},

		// 预览红包
		handlePreview() {
			this.showRedPackage = true
			this.$refs.previewWrapperRef.$el.style.transform = 'scale(1)'
		},

		// 关闭预览弹窗
		closePreview() {
			this.$refs.previewWrapperRef.$el.style.transform = 'translateX(-100%)'
		},

		// 点击选择范围
		handleChooseRange() {
			uni.showActionSheet({
				itemList: ['1km', '2km', '3km', '4km', '5km'],
				success: (res) => {
					console.log(res)
					this.redForm.effectiveDistance = res.tapIndex + 1
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

	.line-item {
		margin-top: 40upx;
		display: flex;
		align-items: center;
		padding: 20upx 0;
		padding-right: 20upx;
		border-bottom: 1px solid #D8D8D8;

		.input-el {
			text-align: right;
			flex: 1;
			font-size: 24upx;
			margin-right: 10upx;
		}
	}

	.title-form {
		margin: 28upx 0;

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

	.preview-wrapper {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		// background-color: rgb(255, 255, 255);
		transition: all 350ms;
		// .flex(center, center);
		// flex-direction: column;
		// padding: 0 40upx;
		box-sizing: border-box;
		transform: scale(0);
		transition: all 350ms;
	}

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}
}
</style>
