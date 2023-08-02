<template>
	<tui-popup :duration="500" :mode-class="[ 'fade' ]" :styles="styles" :show="popupVisible">
		<view class="poster-container">
			<view style="max-height: 70vh;overflow-y: auto;">
				<image v-show="posterImage" class="poster-iamge" :src="posterImage" mode="widthFix" />
				<l-painter
					v-show="!posterImage" ref="painter" is-canvas-to-temp-file-path
					css=" background: #fff;border-radius: 32rpx;" @done="handlePainterSuccess"
				>
					<l-painter-view css="display: flex;align-items: center;justify-content: center;width: 600rpx;padding: 24rpx 11rpx;">
						<l-painter-image
							:src="require('../../../../static/images/user/ju-icon.png')" :css="{
								background: logoBg,
								objectFit: 'contain',
								width: '68rpx'
							}"
						/>
						<l-painter-view css="textAlign: center;">
							<l-painter-text
								text="巨蜂" css=" paddingTop: 16rpx;
										display: inline-block;
										color: #000;
										fontSize: 32rpx;
										fontWeight: bold;
										textAlign: center;"
							/>
						</l-painter-view>
					</l-painter-view>

					<l-painter-view css="margin: 32rpx;width: 602rpx;">
						<l-painter-view css="marginTop: 10rpx;marginBottom: 10rpx;">
							<l-painter-image
								:src="require('../../../../static/images/user/mendianshenqing.png')" :css="{
									background: logoBg,
									objectFit: 'contain',
									width: '38rpx'
								}"
							/>
							<l-painter-text :text="message.storeName" css="marginLeft: 10rpx;color: #000000;fontSize: 32rpx;line-clamp: 1;"></l-painter-text>
						</l-painter-view>
						<l-painter-view css="width: 538rpx;marginBottom: 18rpx;textAlign: center;">
							<l-painter-image
								:src="common.seamingImgUrl(message.thumbnail)" :css="{
									background: logoBg,
									objectFit: 'contain',
									width: '248rpx'
								}"
							/>
							<l-painter-view css="flex: 1;marginLeft: 20rpx;marginTop: 10rpx;">
								<l-painter-text
									:text="message.goodsName"
									css="display: block;color: #605D52;fontSize: 28rpx;line-clamp: 3;textAlign: left;"
								></l-painter-text>
								<l-painter-view css="display: flex;justify-content: space-betweent;align-items: center;">
									<l-painter-text
										:text="message.specs"
										css="display: block;color: #605D52;fontSize: 24rpx;"
									></l-painter-text>
									<l-painter-view css="marginTop: 10rpx;">
										<l-painter-text text="￥" css="color: #ff0000;fontSize: 26rpx;"></l-painter-text>
										<l-painter-text :text="message.price" css="color: #ff0000;fontSize: 28rpx;"></l-painter-text>
									</l-painter-view>
								</l-painter-view>
							</l-painter-view>
						</l-painter-view>
					</l-painter-view>

					<l-painter-view css="display: flex;align-items: center;margin: 32rpx;width: 602rpx;">
						<l-painter-image
							:src="message.distributeGoodsCode" :css="{
								background: logoBg,
								objectFit: 'contain',
								width: '208rpx'
							}"
						/>
						<l-painter-view css="marginLeft: 32rpx;width: 602rpx;">
							<l-painter-view>
								<l-painter-text text="识别二维码" css=";color: #807e75;fontSize: 30rpx;line-clamp: 1;"></l-painter-text>
							</l-painter-view>
							<l-painter-view>
								<l-painter-text text="查看商品详情" css=";color: #807e75;fontSize: 30rpx;line-clamp: 1;"></l-painter-text>
							</l-painter-view>
						</l-painter-view>
					</l-painter-view>

				</l-painter>
			</view>

			<view style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
				<view style="display: flex;justify-content: space-between;align-items: center;">
					<button class="uni-btn" @click="handleSaveImage">
						<!-- #ifdef H5 -->
						<text>提示：可长按或截屏进行保存</text>
						<!-- #endif -->
						<!-- #ifdef APP || MP -->
						<text>保存</text>
					<!-- #endif -->
					</button>
					<button style="margin-left: 20upx;font-size: 26upx;" @click="$copy(`https://h5.jfcmei.com/#/pages/prod/prod?goodsId=${message.distributeGoodsOptions}`)">
						<text>复制链接</text>
					</button>
				</view>
				<view class="close-wrapper">
					<tui-icon name="close" color="#fff" :size="37" @click="handleClosePopup"></tui-icon>
				</view>
			</view>
		</view>

		<!-- 分析logo颜色 -->
		<canvas id="tui-color-palette" class="canvas-el" canvas-id="tui-color-palette"></canvas>

		<tui-toast ref="toast"></tui-toast>
	</tui-popup>
</template>

<script>
import { saveImg } from '../../../../utils'
export default {
	name: 'DistributePoster',
	data() {
		return {
			styles: Object.freeze({
				'position': 'fixed',
				'bottom': 0,
				'top': 0,
				'left': 0,
				'right': 0,
				'z-index': 997,
				'display': 'flex',
				'justify-content': 'center',
				'align-items': 'flex-start',
				'padding-top': '7vh',
				'background': 'rgba(0, 0, 0, 0.6)'
			}),
			posterImage: '',
			logoBg: '#fff',
			popupVisible: false,
			message: {}
		}
	},

	methods: {
		show(obj) {
			this.posterImage = ''
			this.message = obj
			this.popupVisible = true
			this.$forceUpdate()
		},

		handleSaveImage() {
			if (this.posterImage) {
				saveImg(this.posterImage)
			} else {
				this.$refs.painter.canvasToTempFilePathSync({
					// 在nvue里是jpeg
					fileType: 'jpg',
					pathType: 'url',
					quality: 1,
					success: (res) => {
						saveImg(res.tempFilePath)
					}
				})
			}
		},

		// 绘制活动邀请码成功
		handlePainterSuccess() {
			this.$nextTick(() => {
				this.$refs.painter.canvasToTempFilePathSync({
					fileType: 'jpg',
					pathType: 'url',
					quality: 1,
					success: (res) => {
						if (!this.posterImage) {
							this.posterImage = res.tempFilePath
						}
					}
				})
			})
		},

		handleClosePopup() {
			this.popupVisible = false
		}
	}
}
</script>

<style lang="less" scoped>
.poster-container {
	width: 622upx;
	text-align: center;
	border-radius: 32upx;
	box-sizing: border-box;

	.uni-btn {
		width: fit-content;
		height: 60upx;
		margin: 16upx 0;
		padding: 0 16upx;
		font-size: 28upx;
		line-height: 60upx;
		border-radius: 100px;
		background-color: #fff;
	}

	.poster-iamge {
		width: 622upx;
		border-radius: 32upx;
	}
}

.canvas-el {
	position: absolute;
	z-index: -1;
}
</style>
