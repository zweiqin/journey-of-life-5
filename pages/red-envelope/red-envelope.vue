<template>
	<view>
		<view v-if="showMap" class="map-container">
			<map
				id="mapRef" :longitude="longitude" :latitude="latitude" :scale="scale"
				show-compass show-location
				style="width: 100vw; height: 100vh" :markers="markers" @markertap="handleReceive"
			></map>

			<view
				ref="previewWrapperRef" class="preview-wrapper" :style="{
					transform: showRedPackage ? 'scale(1)' : 'scale(0)'
				}"
			>
				<JRedEnvelope :desc="redForm.remark" :src="redForm.imageUrl" :name="redForm.brandName" :avatar="redForm.picUrl">
				</JRedEnvelope>
				<button class="receive-btn" @click="handleClose">确定</button>
			</view>

			<view class="scale-container">
				<view @click="handleScale(+1)">+</view>
				<view @click="handleScale(-1)">-</view>
			</view>

			<view class="send" @click="handleToSendRedEnvelope">
				<image src="../../static/images/index/red.png" mode="" />
				<text>发红包</text>
			</view>

			<view class="location" @click="toCenter">
				<tui-icon name="location" :size="25"></tui-icon>
			</view>

		<!-- <Controls :marks="allMarks" @receive="handleReceive"></Controls> -->
		</view>
	</view>
</template>

<script>
import { getRedEnvelopeListApi, receiveRedEnvelopeApi, getWrapRedReleaseApi, addWrapRedReceiveApi } from '../../api/user'
import { delayedLoginStatus, getUserId } from '../../utils'
import { J_LOACTION } from '../../constant'
// import Controls from './cpns/Controls.vue'

export default {
	name: 'RedEnvelope',
	onLoad() {
		// this.getRedEnvelopeList();
		// delayedLoginStatus();
	},

	components: {
		// Controls
	},

	onReady() {
		this.getRedEnvelopeList()
	},

	data() {
		return {
			markers: [],
			longitude: 0,
			latitude: 0,
			redForm: {
				name: ''
			},
			allMarks: [],
			showRedPackage: false,
			showMap: false,
			scale: 16
		}
	},

	created() {
		this.getLoaction()
	},

	destroyed() {
		uni.removeStorageSync(J_LOACTION)
	},

	methods: {
		getRedEnvelopeList() {
			uni.getLocation({
				type: 'gcj02',
				altitude: true,
				geocode: false,
				highAccuracyExpireTime: 2100,
				timeout: 5,
				cacheTimeout: 2100,
				accuracy: 'high',
				isHighAccuracy: true,
				success: (result) => {
					getWrapRedReleaseApi({
						// ...this.$store.getters.lonAndLat
						longitude: result.longitude * 1,
						latitude: result.latitude * 1
					}).then((res) => {
						this.allMarks = res.data
						console.log(this.allMarks)
						const made = []
						// #ifdef H5
						for (const redPack of res.data) {
							made.push({
								id: redPack.id,
								latitude: redPack.latitude,
								longitude: redPack.longitude,
								title: redPack.brandName + '的红包',
								width: 40,
								height: 50,
								anchor: {
									x: 0.5,
									y: 0.5
								},
								iconPath: '/static/images/index/red-pack.png'
							})
						}
						// #endif

						// #ifdef APP
						for (const redPack of res.data) {
							made.push({
								id: redPack.id,
								latitude: redPack.latitude,
								longitude: redPack.longitude,
								title: redPack.brandName + '的红包',
								width: 80,
								height: 50,
								anchor: {
									x: 0.5,
									y: 0.5
								},
								iconPath: '/static/images/index/red-an.png'
							})
						}
						// #endif
						this.markers = made
						this.showMap = true
					})
				},
				fail: () => {
					uni.showToast({
						title: '查询红包失败',
						duration: 2000,
						icon: 'none'
					})
				}

			})
		},

		handleReceive(e) {
			console.log(e)
			if (!getUserId()) return
			const _this = this
			const { markerId } = e.detail
			if (markerId) {
				const currentMark = this.allMarks.find((item) => item.id === markerId)
				if (currentMark) {
					this.redForm = currentMark
					// this.showRedPackage = true
				}
				uni.getLocation({
					type: 'gcj02',
					success(res) {
						addWrapRedReceiveApi({
							id: currentMark.id,
							userId: getUserId()
						}).then(() => {
							_this.showRedPackage = true
							_this.getRedEnvelopeList()
						})
					},
					fail: () => {
						uni.showToast({
							title: '领取失败',
							duration: 2000,
							icon: 'none'
						})
					}
				})
			}
		},

		getLoaction() {
			const locationInfo = uni.getStorageSync(J_LOACTION)
			if (locationInfo) {
				this.latitude = locationInfo.latitude
				this.longitude = locationInfo.longitude
				return
			}
			const _this = this
			uni.getLocation({
				type: 'gcj02',
				success(res) {
					_this.longitude = res.longitude * 1 + 0.001
					_this.latitude = res.latitude * 1 + 0.001

					uni.setStorageSync(J_LOACTION, {
						latitude: res.latitude,
						longitude: res.longitude
					})

					location.reload()
				},
				fail(err) {
					_this.$showToast('获取定位失败，请确保您开启了定位')
				}
			})
		},

		handleClose() {
			this.showRedPackage = false
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
				uni.showToast({
					title: '已经缩放到最大了',
					duration: 2000,
					icon: 'none'
				})
			}
			if (this.scale < 5) {
				this.scale = 5
				uni.showToast({
					title: '已经缩放到最小了',
					duration: 2000,
					icon: 'none'
				})
			}
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
	width: 100vw;
	height: 100vh;
	background-color: rgb(255, 255, 255);
	transition: all 350ms;
	.flex(center, center);
	flex-direction: column;
	padding: 40upx 40upx;
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
	z-index: 10000000;
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
	top: 40%;
	right: 40upx;
	width: 84upx;
	box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.1);
	height: 128upx;
	background-color: #fff;
	border-radius: 20upx;
	display: flex;
	align-items: center;
	justify-content: center;
	flex-direction: column;

	text {
		font-size: 24upx;
	}

	image {
		width: 60upx;
		height: 60upx;
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
