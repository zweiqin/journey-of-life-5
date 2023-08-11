<template>
	<view class="community-order">
		<view class="title-list">
			<img
				:src="common.seamingImgUrl('qt4o7j0jglkweyicy1fw.png')" alt=""
				class="return" @click="handleBack"
			/>
			<view class="title">
				{{ form.id ? '编辑' : '新建' }}{{ templateType === 1 ? '红包模板' : templateType === 0 ? '优惠券模板' : '--' }}
			</view>
		</view>

		<tui-form ref="form" tip-padding="0">
			<view class="add-album-content">
				<!-- <view class="item-wrapper">
					<view class="add-album-title">模板名称</view>
					<view class="add-album-value">
					<input
					v-model="form.title" type="text" class="common-text" placeholder="请填写模板名称"
					style="padding-bottom: 32upx"
					/>
					</view>
					</view> -->

				<view class="item-wrapper" @click="$refs.dateTimeStart.show()">
					<view class="add-album-title">开始时间</view>
					<view class="add-album-value">
						<input
							v-model="form.startTime" disabled type="text" class="common-text"
							placeholder="请选择开始时间"
							style="padding-bottom: 32upx"
						/>
					</view>
				</view>
				<tui-datetime ref="dateTimeStart" :type="7" radius @confirm="(e) => form.startTime = e.result"></tui-datetime>

				<view class="item-wrapper" @click="$refs.dateTimeEnd.show()">
					<view class="add-album-title">结束时间</view>
					<view class="add-album-value">
						<input
							v-model="form.endTime" disabled type="text" class="common-text"
							placeholder="请选择结束时间"
							style="padding-bottom: 32upx"
						/>
					</view>
				</view>
				<tui-datetime ref="dateTimeEnd" :type="7" radius @confirm="(e) => form.endTime = e.result"></tui-datetime>

				<tui-textarea v-model="form.introduce" flex-start label="介绍" placeholder="请输入介绍"></tui-textarea>

			</view>

			<view v-if="templateType === 0" class="body">
				<tui-input
					v-model="form.rollMonkey" label="券的面额" placeholder="请输入金额" type="number"
					min="0" max="10000"
					text-right
				>
				</tui-input>
				<tui-input
					v-model="form.limitation" label="使用权限" placeholder="请输入金额" type="number"
					min="0" max="10000"
					text-right
				>
					<template #left>
						<text>满</text>
					</template>
					<template #right>
						<text>可用</text>
					</template>
				</tui-input>

				<!-- <tui-list-cell>
					<tui-radio-group v-model="form.isGoods">
					<text>是否指定商品</text>
					<text style="padding-left: 20rpx;">
					<tui-radio value="0" color="#07c160" border-color="#999">
					</tui-radio>
					<text>否</text>
					</text>
					<text style="padding-left: 20rpx;">
					<tui-radio value="1" color="#07c160" border-color="#999">
					</tui-radio>
					<text>是</text>
					</text>
					</tui-radio-group>
					</tui-list-cell> -->

				<view v-if="form.isGoods === '1'">
					<tui-list-cell padding="0" @click="isShowGoodsPopup = true">
						<tui-input v-model="form.goodsName" disabled label="指定商品" placeholder="请选择指定商品" type="text" text-right>
						</tui-input>
					</tui-list-cell>
					<tui-bottom-popup :show="isShowGoodsPopup" @close="isShowGoodsPopup = false">
						<GoodsList v-if="isShowGoodsPopup" @send="handleSend"></GoodsList>
					</tui-bottom-popup>
				</view>
			</view>

			<!-- <view v-if="templateType === 1" class="body">
				<view class="item-image">
				<view class="tag">*</view>
				<view class="name">红包模板图片</view>
				</view>
				<view class="upload-list">
				<view class="upload-pane">
				<view style="display: flex; flex-wrap: wrap">
				<view
				v-for="img in images" :key="img" style="
				position: relative;
				width: 160upx;
				height: 160upx;
				margin-right: 20upx;
				margin-bottom: 20upx;
				"
				>
				<img :src="common.seamingImgUrl(img)" alt="" class="img1" />
				<tui-icon name="close-fill" size="40" unit="upx" class="img2" color="#ea0000" @click="removeBackground(img)"></tui-icon>
				</view>
				</view>
				<view v-if="images.length === 0" class="upload" style="margin-right: 6upx" @click="chooseImg">
				+
				</view>
				</view>
				</view>
				</view> -->
		</tui-form>

		<view class="foot">
			<view class="on" @click="handleToServiceInformation">确认</view>
		</view>
	</view>
</template>

<script>
import { addCouponMagicApi, getCouponMagicDetailsApi } from '../../../api/user'
import { J_USER_TOKEN, J_USER_INFO } from '../../../constant'
import { getUserId, getBrandId } from '../../../utils'
import GoodsList from './components/goods-list.vue'
export default {
	name: 'PublicationTemplate',
	components: { GoodsList },
	// props: {
	// 	imgUrl: String
	// },
	data() {
		return {
			templateType: '',
			isShowGoodsPopup: false,
			img: '',
			name: '',
			price: '',
			id: '',
			// images: [],
			form: {
				id: '',
				// title: '',
				numId: '',
				rollMonkey: '',
				introduce: '',
				limitation: '',
				startTime: '',
				endTime: '',
				adminMagicId: '',
				isGoods: '0',
				goodsName: ''
			},
			userInfo: uni.getStorageSync(J_USER_INFO)
		}
	},
	created() { },
	onLoad(options) {
		this.templateType = options.templateType * 1 // 红包1，优惠券0
		this.form.adminMagicId = options.adminMagicId
		this.form.isGoods = options.isGoods
		if (options.id) {
			this.form.id = options.id || ''
			this.getCouponMagicDetails()
		}
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		async getCouponMagicDetails(img) {
			const res = await getCouponMagicDetailsApi({ id: this.form.id })
			// this.form.title = res.data.title || ''
			if (res.data.numId) {
				this.form.numId = res.data.numId || ''
				this.form.goodsName = '已选择商品，点击此处进行更改'
			}
			this.form.rollMonkey = res.data.rollMonkey || ''
			this.form.introduce = res.data.introduce || ''
			this.form.limitation = res.data.limitation || ''
			this.form.startTime = res.data.startTime || ''
			this.form.endTime = res.data.endTime || ''
			if (res.data.typeRoll === 0) {
				this.form.isGoods = '0'
			} else if (res.data.typeRoll === 1) {
				this.form.isGoods = '1'
				this.form.goodsName = '已选择商品，点击此处进行更改'
			}
		},
		handleToServiceInformation() {
			let rules
			if (this.templateType === 0) {
				rules = [{
					// 	name: 'title',
					// 	rule: ['required', 'minLength:2', 'maxLength:8'],
					// 	msg: ['请输入模板标题', '姓名必须2个或以上字符', '姓名不能超过8个字符']
					// }, {
					name: 'startTime',
					rule: [ 'required' ],
					msg: [ '请选择开始时间' ]
				}, {
					name: 'endTime',
					rule: [ 'required' ],
					msg: [ '请选择结束时间' ]
				}, {
					name: 'rollMonkey',
					rule: [ 'required' ],
					msg: [ '请填写券的面额' ]
				}, {
					name: 'limitation',
					rule: [ 'required' ],
					msg: [ '请填写使用权限' ]
				}]
			} else if (this.templateType === 1) {
				rules = [{
					// 	name: 'title',
					// 	rule: ['required', 'minLength:2', 'maxLength:8'],
					// 	msg: ['请输入模板标题', '姓名必须2个或以上字符', '姓名不能超过8个字符']
					// }, {
					name: 'startTime',
					rule: [ 'required' ],
					msg: [ '请选择开始时间' ]
				}, {
					name: 'endTime',
					rule: [ 'required' ],
					msg: [ '请选择结束时间' ]
				}]
			}
			this.$refs.form.validate(this.form, rules).then(async () => {
				let param
				if (this.templateType === 0) {
					if (this.form.isGoods === '1' && !this.form.numId) {
						return this.$showToast('请选择指定商品')
					}
					param = {
						userId: getUserId(),
						// title: this.form.title,
						typeRoll: this.form.isGoods === '1' ? 1 : 0,
						numId: this.form.isGoods === '1' ? this.form.numId : getBrandId(),
						introduce: this.form.introduce,
						rollMonkey: this.form.rollMonkey,
						limitation: this.form.limitation,
						startTime: this.form.startTime,
						endTime: this.form.endTime,
						adminMagicId: this.form.adminMagicId
					}
				} else if (this.templateType === 1) {
					param = {
						userId: getUserId(),
						// title: this.form.title,
						typeRoll: 2,
						introduce: this.form.introduce,
						startTime: this.form.startTime,
						endTime: this.form.endTime,
						adminMagicId: this.form.adminMagicId
					}
				}
				const res = await addCouponMagicApi(param)
				if (res.errno === 0) {
					uni.showToast({
						title: this.form.id ? '编辑成功' : '新建成功',
						duration: 2000,
						icon: 'none'
					})
					setTimeout(() => {
						uni.navigateBack()
					}, 2000)
				}
			})
		},
		// chooseImg() {
		// 	const _this = this
		// 	uni.chooseImage({
		// 		count: 1,
		// 		success: (chooseImageRes) => {
		// 			for (const imgFile of chooseImageRes.tempFiles) {
		// 				uni.showLoading()
		// 				uni.uploadFile({
		// 					url: 'https://appapi.jfcmei.com/wx/storage/upload',
		// 					filePath: imgFile.path,
		// 					name: 'file',
		// 					// formData: {
		// 					// 	token: J_USER_TOKEN,
		// 					// 	userId: getUserId()
		// 					// },
		// 					success: (uploadFileRes) => {
		// 						uni.hideLoading()
		// 						_this.images.push(JSON.parse(uploadFileRes.data).data.url)
		// 					}
		// 				})
		// 			}
		// 		}
		// 	})
		// },
		// removeBackground(img) {
		// 	const _this = this
		// 	uni.showModal({
		// 		title: '提示',
		// 		content: '确定删除当前图片吗？',
		// 		success(res) {
		// 			if (res.confirm) {
		// 				const index = _this.images.findIndex((item) => item === img)
		// 				_this.images.splice(index, 1)
		// 			}
		// 		}
		// 	})
		// },
		handleSend(obj) {
			this.isShowGoodsPopup = false
			this.form.numId = obj.goodsId
			this.form.goodsName = obj.goodsName
		}
	}
}
</script>

<style lang="less" scoped>
.community-order {
	padding-bottom: 180upx;

	.title-list {
		padding: 40upx 54upx 36upx 16upx;
		display: flex;

		.return {
			width: 48upx;
			height: 48upx;
		}

		.title {
			flex: 1;
			text-align: center;
			font-size: 36upx;
			font-weight: bold;
			color: #3d3d3d;
		}
	}

	.add-album-content {
		// flex: 1;
		// width: 100%;
		background: #FFFFFF;
		border-radius: 24upx;
		margin: 36upx 20upx 0 20upx;
		padding: 32upx 32upx 0 32upx;

		.item-wrapper {
			display: flex;
			align-items: flex-start;
			justify-content: space-between;
			// margin-top: 46upx;
			// width: 100%;
			// height: 74upx;
			padding-bottom: 32upx;

			.add-album-title {
				flex: 0 0 140upx;
				text-align: left;
				font-size: 28upx;
				color: #141000;

				// font-weight: bold;
				// height: 100%;
				&.add-album-title-checked {
					white-space: nowrap;
					width: auto;
				}
			}

			.common-text {
				color: #141000;
				font-size: 28upx;
				// padding-bottom: 20upx;
			}

			.add-album-value {
				flex: 1;
				// max-width: 340upx;
				// margin-right: 96upx;
				width: 100%;
				// height: 100%;
				border-bottom: 1px solid #F1F1F0;

			}
		}
	}

	.body {
		padding: 36upx 30upx 0upx 30upx;

		// .item-image {
		// 	display: flex;
		// 	align-items: center;
		// 	padding-top: 36upx;
		// 	padding-bottom: 28upx;

		// 	.tag {
		// 		font-weight: 600;
		// 		color: #fa5151;
		// 	}

		// 	.name {
		// 		font-size: 32upx;
		// 		font-weight: 500;
		// 		color: #3d3d3d;
		// 	}
		// }

		// .upload-pane {
		// 	border-radius: 20upx;
		// 	display: flex;
		// 	flex-wrap: wrap;

		// 	.img1 {
		// 		width: 160upx;
		// 		height: 160upx;
		// 		border-radius: 20upx;
		// 	}

		// 	.img2 {
		// 		width: 40upx;
		// 		height: 40upx;
		// 		position: absolute;
		// 		right: -15upx;
		// 		top: -15upx;
		// 		background: white;
		// 		border-radius: 50%;
		// 	}

		// 	.upload {
		// 		margin: 0;
		// 		width: 160upx;
		// 		height: 160upx;
		// 		background-color: #ececec;
		// 		border-radius: 20upx;
		// 		color: #767676;
		// 		text-align: center;
		// 		line-height: 160upx;
		// 		font-size: 60upx;
		// 	}
		// }
	}

	.foot {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 30upx 30upx 30upx 30upx;
		width: 100%;
		box-sizing: border-box;
		position: fixed;
		left: 0;
		bottom: 0;
		background: #ffffff;
		border-top: 8upx solid #f7f8fa;

		.on {
			font-size: 32upx;
			font-weight: bold;
			color: #ffffff;
			width: 408upx;
			height: 80upx;
			border-radius: 100upx;
			background: linear-gradient(270deg, #e95e20 0%, #ff8f1f 100%);
			text-align: center;
			line-height: 80upx;
		}
	}

	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh !important;
	}
}
</style>
