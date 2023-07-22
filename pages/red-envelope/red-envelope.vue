<template>
	<view>
		<view v-if="showMap" class="map-container">
			<map
				id="mapRef" :longitude="longitude" :latitude="latitude" :scale="scale"
				show-compass show-location :circles="circles"
				style="width: 100vw; height: 100vh" :markers="markers" @markertap="handleReceive"
			></map>

			<view class="scale-container">
				<view @click="handleScale(+1)">+</view>
				<view @click="handleScale(-1)">-</view>
			</view>

			<view class="send" @click="handleToSendRedEnvelope">
				<image src="@/static/images/index/red.png" mode="" />
				<text>发红包</text>
			</view>

			<view class="location" @click="toCenter">
				<tui-icon name="location" :size="25"></tui-icon>
			</view>

			<view
				ref="previewWrapperRef" class="preview-wrapper" :style="{
					transform: showRedPackage ? 'scale(1)' : 'scale(0)'
				}"
			>
				<!-- :desc="redForm.remark" :src="redForm.imageUrl" :name="redForm.publisherName" :avatar="redForm.picUrl" -->
				<JRedEnvelope
					:is-show="showRedPackage" :show-type="redEnvelopeType" :data="redForm"
					@click-red="handleClickRed" @close="handleClose"
				>
				</JRedEnvelope>
			</view>

			<!-- <Controls :marks="allMarks" @receive="handleReceive"></Controls> -->
		</view>
		<view v-else-if="!showMap && !isGetLocation" style="text-align: center;">
			<view style="margin-top: 40vh;">
				<view><text style="color: #666666;">获取位置失败！</text></view>
				<tui-button
					type="gray" width="220rpx" height="64rpx" margin="10upx auto 20upx"
					style="border-radius: 50rpx;" @click="handleReGetLocation"
				>
					重新定位
				</tui-button>
				<view style="margin-top: 44upx;font-size: 24upx;color: #bbbbbb;">注：该定位用于提供地图红包服务</view>
			</view>
		</view>

		<TabBar></TabBar>
	</view>
</template>

<script>
import { getRedEnvelopeListApi, receiveRedEnvelopeApi, getWrapRedReleaseApi, addWrapRedReceiveApi } from '../../api/user'
import { delayedLoginStatus, getUserId } from '../../utils'
// import Controls from './cpns/Controls.vue'

export default {
	name: 'RedEnvelope',
	onLoad() {
		// uni.showTabBar({
		// 	success: () => {
		// 		console.log(11111)
		// 	},
		// 	fail: () => {
		// 		console.log(22222)
		// 	},
		// 	complete: () => {
		// 		console.log(33333)
		// 	}
		// })
	},

	components: {
		// Controls
	},

	onShow() {
		if (!this.isChoosingLocation) this.getRedEnvelopeList()
		this.isChoosingLocation = false
	},

	data() {
		return {
			markers: [],
			longitude: 0,
			latitude: 0,
			scale: 15,
			redForm: { wrapRedText: {} },
			allMarks: [],
			showMap: false,
			isGetLocation: true,
			isChoosingLocation: false,
			showRedPackage: false, // false
			redEnvelopeType: 0, // 0
			circles: []
		}
	},

	created() {
		// this.getLoaction()
	},

	destroyed() {
	},

	methods: {
		getRedEnvelopeList(isOnce) {
			const tempTime = Date.now()
			uni.getLocation({
				type: 'gcj02',
				highAccuracyExpireTime: 1500,
				success: (result) => {
					uni.hideLoading()
					if ((Date.now() - tempTime) >= 1500) {
						console.log(this.$store.getters.obtainLocationCount)
						if (!this.$store.getters.obtainLocationCount) {
							this.$showToast('获取定位失败，请先选择所在位置')
							if (this.isChoosingLocation === false) {
								this.isChoosingLocation = true
								setTimeout(() => {
									uni.chooseLocation({
										success: (res) => {
											console.log(res)
											this.confirmLocationWrap({
												longitude: res.longitude,
												latitude: res.latitude
											})
										},
										fail: (e) => {
											// console.log('aaaa', e)
											this.isGetLocation = false
											this.$showToast('获取定位失败！')
										},
										complete: (e) => {
											// console.log('bbb', e)
										}
									})
								}, 2000)
							}
						} else {
							this.confirmLocationWrap({
								longitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[0],
								latitude: this.$store.state.location.locationInfo.streetNumber.location.split(',')[1]
							})
						}
					} else {
						this.confirmLocationWrap(result)
					}
				}
			})
		},

		confirmLocationWrap(result) {
			this.circles = [ {
				// longitude: 113.293184,
				// latitude: 22.803391,
				longitude: result.longitude,
				latitude: result.latitude,
				color: '#89a7c8',
				// 填充颜色
				fillColor: '#d3e5f177',
				// 圆半径
				radius: 500,
				// 边
				strokeWidth: 1
			} ]
			this.longitude = result.longitude * 1
			this.latitude = result.latitude * 1
			// this.longitude = 113.06092
			// this.latitude = 22.89223
			// console.log(result)
			getWrapRedReleaseApi({
				longitude: result.longitude * 1,
				latitude: result.latitude * 1
				// longitude: 113.06092,
				// latitude: 22.89223
			}).then((res) => {
				this.allMarks = res.data
				console.log(this.allMarks)
				const made = []
				for (const redPack of this.allMarks) {
					made.push({
						id: redPack.id,
						latitude: redPack.latitude,
						longitude: redPack.longitude,
						title: (redPack.brandName || redPack.username) + '的红包',
						width: 40 - Math.abs(this.scale - 15) * 2.5,
						height: 40 - Math.abs(this.scale - 15) * 2.5,
						anchor: {
							x: 0.5,
							y: 0.5
						},
						iconPath: '/static/images/index/red.png'
					})
				}
				this.markers = made
				this.showMap = true
			})
		},

		handleReGetLocation(e) {
			uni.showLoading({
				title: '定位中'
			})
			this.getRedEnvelopeList()
		},

		handleReceive(e) {
			// console.log(e)
			this.redForm = {}
			if (!getUserId()) return
			const { markerId } = e.detail
			if (markerId) {
				const currentMark = this.allMarks.find((item) => item.id == markerId)
				if (currentMark) {
					console.log(currentMark)
					this.redEnvelopeType = 0
					this.showRedPackage = true
				}
			} else {
				this.$showToast('获取红包信息失败')
			}
		},

		handleClickRed(e) {
			addWrapRedReceiveApi({
				wrapId: this.redForm.id,
				userId: getUserId()
			}).then((res) => {
				console.log(res)
				// this.$showToast(res.data)
				this.redForm = res.data || {}
				this.redEnvelopeType = 1
				this.getRedEnvelopeList()
			})
		},

		// getLoaction() {
		// 	uni.getLocation({
		// 		type: 'gcj02',
		// 		success(res) {
		// 			this.longitude = res.longitude * 1 + 0.001
		// 			this.latitude = res.latitude * 1 + 0.001
		// 			// location.reload()
		// 		},
		// 		fail(err) {
		// 			console.log(err)
		// 			this.$showToast('获取定位失败，请确保您开启了定位')
		// 		}
		// 	})
		// },

		handleClose() {
			this.showRedPackage = false
			this.redEnvelopeType = 0
			this.getRedEnvelopeList()
		},

		toCenter() {
			const _this = this
			uni.getLocation({
				type: 'gcj02',
				success(res) {
					_this.scale = 16
					uni.createMapContext('mapRef', _this).moveToLocation({
						longitude: res.longitude,
						latitude: res.latitude
					})
				},
				fail(err) {
					_this.$showToast('获取定位失败，请确保您开启了定位')
				}
			})
		},

		// 放大
		handleScale(number) {
			this.scale += number
			if (this.scale > 18) {
				this.scale = 18
				return this.$showToast('已经缩放到最大了')
			} else if (this.scale < 5) {
				this.scale = 5
				return this.$showToast('已经缩放到最小了')
			}
			this.markers.forEach((item) => {
				item.width = 40 - Math.abs(this.scale - 15) * 2.5
				item.height = 40 - Math.abs(this.scale - 15) * 2.5
			})
		},

		// 去发红包
		handleToSendRedEnvelope() {
			const userId = getUserId()
			if (!userId) {
				return
			}
			this.go('/user/marketing-tools/red-envelope-distribution/index')
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../style/mixin.less';

.preview-wrapper {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 1000;
	width: 100vw;
	height: 100vh;
	// background-color: rgb(255, 255, 255);
	transition: all 350ms;
	// .flex(center, center);
	// flex-direction: column;
	// padding: 40upx 40upx;
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

	.receive-btn {
		width: 100%;
		background-color: #fa5151;
		border-radius: 40upx;
		color: #fff;
		margin-top: 20px;
	}
}

.scale-container {
	position: fixed;
	top: 52%;
	right: 40upx;
	width: 84upx;
	height: 148upx;
	background-color: #fff;
	// z-index: 10000000;
	box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
	border-radius: 20upx;
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-direction: column;
	overflow: hidden;

	view {
		flex: 1;
		display: flex;
		align-items: center;
		justify-items: center;
		font-size: 50upx;
		transition: all 350ms;
		text-align: center;
	}
}

.send {
	position: fixed;
	bottom: 220rpx;
	right: 50%;
	transform:translateX(50%);
	width: 193rpx;
	height: 193rpx;
	box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
	background: rgba(255, 204, 102, 1);
	border-radius: 50%;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	text {
		margin-top: 22rpx;
		font-size: 36rpx;
		font-weight: 900;
		line-height: 17rpx;
		color: #FFFFFF;
	}

	image {
		margin-top: -18rpx;
		transform: rotate(35deg);
		width: 70.33rpx;
		height: 78.17rpx;
	}
}

.location {
	position: fixed;
	top: 80%;
	right: 40upx;
	border-radius: 20upx;
	box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
	background-color: #fff;
	width: 84upx;
	height: 84upx;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
