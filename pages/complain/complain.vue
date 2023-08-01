<template>
	<view class="complainContainer">
		<view class="head">
			<image src="./image/fanhui.png" mode="" @click="handleBack" />
			<span>投诉</span>
		</view>
		<view class="productBox">
			<view v-if="goodsDetail.info" class="CommodityInformation">
				<image :src="common.seamingImgUrl(goodsDetail.info.picUrl)" mode=""></image>
				<view class="textsList">
					<span class="shopText">{{ goodsDetail.info.name }}</span>
					<p class="MerchantName">{{ goodsDetail.brand.name }}</p>
				</view>
			</view>
		</view>
		<view class="reportForm">
			<p class="reportHeader">我要举报</p>
			<view class="reportFormItem">
				<image src="./image/zhiliangzhuisu.png" mode=""></image>
				<view class="reportType">
					<p>质量问题</p>
					<p>产品质量问题/假冒伪劣产品等...</p>
				</view>
				<button class="reportBtn" @click="modal = true;type = 1">举报</button>
			</view>
			<view class="reportFormItem">
				<image src="./image/daijinjuan.png" mode=""></image>
				<view class="reportType">
					<p>代金券问题</p>
					<p>代金券使用问题/代金券详情...</p>
				</view>
				<button class="reportBtn" @click="modal = true;type = 2">举报</button>
			</view>
		</view>
		<TuiModal :show="modal" custom mask-closable @cancel="closeModal">
			<view class="tui-modal-custom">
				<TuiFormItem label="投诉理由">
					<input v-model="informContent" class="tui-input" placeholder="请输入投诉理由" placeholder-style="color:#ccc" />
				</TuiFormItem>
				<TuiFormItem label="投诉图片">
					<JUpload
						:title="uploadFields[0].label" :img-url="imgs[uploadFields[0].field]"
						@upload="handleSaveImg(uploadFields[0].field, $event)" @delete="handleDeleteImg(uploadFields[0].field)"
					></JUpload>
					<!-- <tui-upload :value="value" :serverUrl="serverUrl"></tui-upload> -->
					<!-- <tui-upload :value="value" :serverUrl="serverUrl" @complete="result" @remove="remove"></tui-upload> -->
				</TuiFormItem>
				<view class="reportBtn">
					<tui-button width="200rpx" height="72rpx" :size="28" type="danger" shape="circle" @click="handleClick">确定</tui-button>
					<tui-button width="200rpx" height="72rpx" :size="28" type="gray-primary" shape="circle" @click="closeModal">取消</tui-button>
				</view>
			</view>
		</TuiModal>
	</view>
</template>

<script>
import { createComplain } from '@/api/user'
import tuiUpload from '@/components/thorui/tui-upload/tui-upload'
import tuiFormItem from '@/components/thorui/tui-form-item/tui-form-item.vue'
import tuiModal from '@/components/thorui/tui-modal/tui-modal.vue'
import { J_USER_ID } from '../../constant'
import { getGoodsDetailApi } from '../../api/goods'
export default {
	components: {
		TuiModal: tuiModal,
		TuiFormItem: tuiFormItem,
		TuiUpload: tuiUpload
	},
	data() {
		return {
			modal: false,
			informContent: '',
			type: '',
			userId: '',
			goodsId: '',
			goodsDetail: {},
			productForm: { id: 0, specifications: [], price: 0.00, number: 0, url: '' },
			imgs: {
				picUrl: '',
				gallery: []
			},
			uploadFields: [
				{
					label: ' ',
					field: 'picUrl'
				}
			]
		}
	},
	methods: {
		closeModal() {
			this.modal = false
		},
		handleBack() {
			uni.navigateBack()
		},
		// 获取商品详情
		async getGoodsDetail() {
			uni.showLoading()
			const res = await getGoodsDetailApi(this.goodsId, this.userId)
			uni.hideLoading()
			if (res.errno === 0) {
				this.goodsDetail = res.data
			}
		},
		// 删除当前图片
		handleDeleteImg(field, imgUrl) {
			if (field === 'picUrl') {
				this.imgs[field] = ''
			} else if (field === 'gallery') {
				this.imgs[field].splice(this.imgs[field].findIndex((item) => item === imgUrl), 1)
			}
			this.$forceUpdate()
		},
		handleSaveImg(field, imgUrl) {
			if (field === 'picUrl') {
				this.imgs[field] = imgUrl
				console.log(this.imgs)
			} else if (field === 'gallery') {
				this.imgs[field].push(imgUrl)
			}
			this.$forceUpdate()
			console.log(field, imgUrl, this.imgs[this.uploadFields[0].field])
		},
		// 发送投诉请求
		handleClick() {
			const requestParams = {
				type: this.type,
				brandId: this.goodsDetail.brand.id,
				goodsId: this.goodsId,
				informContent: this.informContent,
				informAnnex: this.imgs[this.uploadFields[0].field]
			}
			createComplain(requestParams).then((res) => {
				this.modal = false
				uni.showToast({
					title: `投诉成功`,
					icon: 'success'
				})
			})
		}
	},
	onLoad(options) {
		this.goodsId = options.id
		this.userId = uni.getStorageSync(J_USER_ID)
		this.getGoodsDetail()
	}
}
</script>

<style lang="scss">
.reportBtn {
	display: flex;
	justify-content: space-between;
}
.complainContainer {
	width: 750rpx;
	height: 100vh;
	.head {
		display: flex;
		align-items: center;
		width: 100vw;
		padding: 17px 10px;
		box-sizing: border-box;
		> image {
			// border-radius: 50%;
			width: 32px;
			height: 32px;
			// background-color: rgba(124, 127, 127, 0.562);
		}
		> span {
			margin-left: 260rpx;
			font-weight: 550;
			font-size: 40rpx;
		}
	}
	.productBox {
		width: 750rpx;
		height: 188rpx;
		background-color: rgb(233, 69, 23);
		display: flex;
		align-items: center;
		justify-content: center;
		.CommodityInformation {
			box-sizing: border-box;
			padding: 25rpx;
			width: 717rpx;
			height: 156rpx;
			display: flex;
			align-items: center;
			background-color: white;
			> image {
				width: 130rpx;
				height: 130rpx;
			}
			.textsList {
				margin-left: 20rpx;
				width: 510rpx;
					> span {
						display: inline-block;
						font-size: 26rpx;
						font-weight: normal;
						line-height: 28rpx;
						letter-spacing: 1rpx;
					}
					> p {
						margin-top: 10rpx;
						font-size: 20rpx;
						letter-spacing: 1rpx;
					}
			}
		}
	}
	.reportForm {
		width: 100vw;
		height: auto;
		padding: 25rpx 30rpx;
		box-sizing: border-box;
		.reportHeader {
			letter-spacing: 1rpx;
		}
		.reportFormItem {
			width: 100%;
			height: 156rpx;
			border-bottom: 1px solid rgba(152, 152, 152, 0.508);
			display: flex;
			align-items: center;
			> image {
				padding: 0rpx 20rpx;
				width: 77rpx;
				height: 77rpx;
			}
			.reportType {
				min-width: 435rpx;
				max-width: 435rpx;
				text-overflow: ellipsis;
				display: flex;
				flex-direction: column;
				align-items: center;
				> p {
					padding: 5rpx 0rpx;
					width: 100%;
					text-align: left;
					margin-top: 5rpx;
					font-size: 26rpx;
				}
				> p:nth-of-type(2) {
					font-size: 20rpx;
					color: rgba(110, 110, 110, 0.833);
				}
			}
			.reportBtn {
				display: block;
				// text-align: center;
				color: white;
				width: 126rpx;
				height: 47rpx;
				border-radius: 50rpx;
				line-height: 47rpx;
				letter-spacing: 3rpx;
				font-size: 20rpx;
				background-color: rgb(233, 69, 23);
			}
		}
	}
}
</style>
