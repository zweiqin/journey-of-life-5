<template>
	<view class="share-name-card">
		<StyleOne ref="namecardRef" :code="qrcode" :data="data">
			<AyQrcode
				ref="qrcode"
				:modal="modal_qr"
				:url="url"
				:height="122"
				:h_w_img="40"
				:width="122"
				theme-color="#183869"
				@hideQrcode="hideQrcode"
			/>
		</StyleOne>

		<button class="uni-btn" @click="shareNamecard">分享名片</button>
		<button class="uni-btn" @click="handleBack">返回我的名片</button>
	</view>
</template>

<script>
import StyleOne from './mould/style-one.vue'
import { getNameCardDetailApi } from '../../../api/user'
import { getConfigApi } from '../../../api/auth'
import ayQrcode from '../../../components/ay-qrcode/ay-qrcode.vue'
import { J_USER_TOKEN } from '../../../constant'
import { domToImage } from '../../../utils'

// #ifdef H5
import share from '../../../utils/wxshare'
// #endif

export default {
	components: {
		StyleOne,
		AyQrcode: ayQrcode
	},
	data() {
		return {
			data: {},
			qrcode: '',
			modal_qr: false,
			url: 'https://h5.jfcmei.com/#/user/marketing-tools/contact-guide/name-card-detail?id='
		}
	},

	onLoad(options) {
		uni.showLoading({
			title: '名片生成中'
		})
		this.nameCardId = options.id
		this.getNameCardDetail()
		this.modal_qr = true
		this.url = this.url + options.id
		setTimeout(() => {
			// uni.hideLoading()
			this.$refs.qrcode.crtQrCode()
			uni.hideLoading()
			// #ifdef H5
			this.shareNamecard()
			// #endif
		}, 50)
	},

	methods: {
		getNameCardDetail() {
			const _this = this
			getNameCardDetailApi({
				id: this.nameCardId
			}).then(({ data }) => {
				_this.data = data.businessCard
			})
		},

		hideQrcode() {
			this.modal_qr = false
		},

		handleBack() {
			uni.redirectTo({
				url: '/user/marketing-tools/contact-guide/my-cards'
			})
		},

		// 分享名片
		shareNamecard() {
			// #ifdef H5
			// const url = domToImage(this.$refs.namecardRef.$el);
			// uni.uploadFile({
			//   url: "https://appapi.jfcmei.com/wx/storage/uploadByBase64",
			//   filePath: url,
			//   formData: {
			//     fileName: new Date().getTime(),
			//   },
			//   name: "base64",
			//   success: (uploadFileRes) => {
			//     console.log(uploadFileRes);
			//   },
			// });

			// uni.request({
			//   url: "https://appapi.jfcmei.com/wx/storage/uploadByBase64",
			//   data: {
			//     fileName: new Date().getTime(),
			//     base64: url,
			//   },
			//   methods: "POST",
			//   success(res) {
			//     console.log(res);
			//   },
			// });

			// return;

			// uni.request({
			//   url: "https://appapi.jfcmei.com/wx/qrCode/getSignature",
			//   data: {
			//     url: "xxxxxx",
			//     token: uni.getStorageSync(J_USER_TOKEN),
			//   },
			//   methods: "GET",
			//   success: (res) => {
			//     console.log(res.data);
			//   },
			// });

			const currentUrl = window.location.href.replace('#', 'ericToken')
			const _this = this
			getConfigApi({
				url: currentUrl,
				token: uni.getStorageSync(J_USER_TOKEN)
			}).then(({ data }) => {
				share.wxRegister(data, {
					title: this.data.name,
					desc: this.data.position + '-' + this.data.intro.replaceAll('\n', ','),
					imgUrl: this.data.headPic,
					link:
						'https://h5.jfcmei.com/#/user/marketing-tools/contact-guide/name-card-detail?id=' +
						_this.data.id
				})
			})

			// #endif

			// #ifdef APP-PLUS
			uni.share({
				provider: 'weixin',
				scene: 'WXSceneSession',
				type: 0,
				href:
					'https://h5.jfcmei.com/#/user/marketing-tools/contact-guide/name-card-detail?id=' +
					this.data.id, // 分享跳转的链接
				title: this.data.name, // 分享标题
				summary: this.data.position + '-' + this.data.intro, // 分享内容文字
				imageUrl: this.data.headPic, // 分享封面图片
				success(res) {
					// 此处是调起微信分享成功的回调
					uni.showToast({
						title: '分享成功',
						duration: 2000
					})
				},
				fail(err) {
					uni.showToast({
						title: '分享失败',
						icon: 'none'
					})
				}
			})
			// #endif
		}
	}
}
</script>

<style lang="less" scoped>
.share-name-card {
  width: 100vw;
  height: 100vh;
  background-color: #183869;
  padding: 30upx;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .uni-btn {
    width: 440upx;
    height: 72upx;
    border-radius: 100px;
    background-color: #3662ec;
    color: #fff;
    line-height: 72upx;

    &:nth-of-type(1) {
      margin-top: 64upx;
      font-size: 32upx;
    }

    &:nth-of-type(2) {
      margin-top: 32upx;
    }
  }
}

.img-avatr {
  border-radius: 20upx;
  width: 160upx;
  height: 160upx;
}

/deep/ .box-qrcode {
  margin-left: 20upx !important;
}
</style>
