<template>
	<view class="chat-detail">
		<!-- <view class="header-container" :class="{ fixed: scrollTop > 100 }"> -->
		<view class="header-container">
			<view class="kefu-conatiner">
				<image class="back-icon" src="../../../static/images/store/chevron-states.png" mode="" @click="handleBack" />
				<!-- <image class="avatar" src="/static/logo.png" mode="" /> -->
				<image class="avatar" :src="avatar" mode="" />
				<text class="kefu-name">{{ name }}</text>
			</view>
			<!-- <view class="tip">回复中...</view> -->
		</view>

		<scroll-view
			refresher-enabled refresher-background="#3f3d3d" scroll-y="true" class="scroll-Y"
			:refresher-triggered="isRefresherTriggered" scroll-with-animation :scroll-top="scrollTop"
			@scrolltoupper="handleScrolltoupper" @refresherrefresh="handleRefresherrefresh"
		>
			<view id="scroll-view-chat" @click="isShowBubblePopup = false">
				<view v-for="item in groupMessages" :key="item.message.id" class="message-wrapper">
					<!-- <view v-if="item.event === '1'" class="message-slot">
						<view class="time-wrapper"> <text class="time">10:26</text> </view>
						<view class="kefu-wrapper">
						<view class="words">您好！有什么可以帮到您的吗？</view>
						</view>
						<view class="my-wrapper">
						<view class="words">没有，再见</view>
						</view>
						</view> -->
					<view class="message-slot">
						<view v-if="item.message.isGroup === false">
							<view class="time-wrapper">
								<text class="time">
									{{ timestampToTime(item.message.sendTime) }}
								</text>
							</view>
							<view v-if="item.message.type === 'text'">
								<view v-if="item.message.fromUser.id === userInfo.userId" class="my-wrapper">
									<view class="words">{{ item.message.content }}</view>
								</view>
								<view v-else class="kefu-wrapper">
									<view class="words">{{ item.message.content }}</view>
								</view>
							</view>

							<view v-else-if="item.message.type === 'image'">
								<view v-if="item.message.fromUser.id === userInfo.userId" class="my-wrapper">
									<view class="image">
										<image
											style="width: 350upx;" class="img" :src="common.seamingImgUrl(item.message.content)" mode="widthFix"
											@click="preview(common.seamingImgUrl(item.message.content))"
										/>
									</view>
								</view>
								<view v-else class="kefu-wrapper">
									<view class="image">
										<image
											style="width: 350upx;" class="img" :src="common.seamingImgUrl(item.message.content)" mode="widthFix"
											@click="preview(common.seamingImgUrl(item.message.content))"
										/>
									</view>
								</view>
							</view>

							<view v-else-if="item.message.type === 'order'">
								<view v-if="item.message.fromUser.id === userInfo.userId" class="my-wrapper">
									<view class="order">
										<tui-card :title="{ text: '订单' }" :tag="{ text: item.message.content.orderSn }" full border>
											<template #body>
												<view style="padding: 6px 10px;">订单状态：{{ item.message.content.orderStatusText }}</view>
												<view style="padding: 6px 10px;">商品总费用：{{ item.message.content.goodsPrice }}</view>
												<view style="padding: 6px 10px;">实付费用：{{ item.message.content.actualPrice }}</view>
												<view style="padding: 6px 10px;">收货人手机号：{{ item.message.content.mobile }}</view>
											</template>
										</tui-card>
									</view>
								</view>
								<view v-else class="kefu-wrapper">
									<view class="order">
										<tui-card :title="{ text: '订单' }" :tag="{ text: item.message.content.orderSn }" full border>
											<template #body>
												<view style="padding: 6px 10px;">订单状态：{{ item.message.content.orderStatusText }}</view>
												<view style="padding: 6px 10px;">商品总费用：{{ item.message.content.goodsPrice }}</view>
												<view style="padding: 6px 10px;">实付费用：{{ item.message.content.actualPrice }}</view>
												<view style="padding: 6px 10px;">收货人手机号：{{ item.message.content.mobile }}</view>
											</template>
										</tui-card>
									</view>
								</view>
							</view>

							<view v-else-if="item.message.type === 'goods'">
								<view v-if="item.message.fromUser.id === userInfo.userId" class="my-wrapper">
									<view class="goods">
										<tui-card :title="{ text: '商品' }" :tag="{ text: item.message.content.goodsSn }" full border>
											<template #body>
												<view style="padding: 6px 10px;">商品名称：{{ item.message.content.goodsName }}</view>
											</template>
										</tui-card>
									</view>
								</view>
								<view v-else class="kefu-wrapper">
									<view class="goods">
										<tui-card :title="{ text: '商品' }" :tag="{ text: item.message.content.goodsSn }" full border>
											<template #body>
												<view style="padding: 6px 10px;">商品名称：{{ item.message.content.goodsName }}</view>
											</template>
										</tui-card>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>

		<view class="op-footer">
			<view class="send-wrapper">
				<input v-model="words" type="text" placeholder="请输入..." confirm-type="send" @confirm="handleSendMessage" />
			</view>

			<view class="upload-container">
				<tui-bubble-popup
					ref="refBubblePopup" :show="isShowBubblePopup" :mask="false" position="absolute"
					direction="bottom"
					width="180rpx" right="0" top="0rpx" translate-y="-110%"
					triangle-right="28rpx" triangle-bottom="-22rpx"
				>
					<view class="tui-menu-item" @click="handleSendImg">发送图片</view>
					<view class="tui-menu-item" @click="handlePopup('Order')">发送订单</view>
					<view class="tui-menu-item" @click="handlePopup('Goods')">发送商品</view>
				</tui-bubble-popup>
				<image class="upload" src="../../../static/images/icon/add.png" mode="" @click="isShowBubblePopup = !isShowBubblePopup" />
			</view>
		</view>
		<tui-bottom-popup :show="isShowOrderPopup" @close="handleClosePopup('Order')">
			<OrderList v-if="isShowOrderPopup" @send="handleSend"></OrderList>
		</tui-bottom-popup>
		<tui-bottom-popup :show="isShowGoodsPopup" @close="handleClosePopup('Goods')">
			<GoodsList v-if="isShowGoodsPopup" @send="handleSend"></GoodsList>
		</tui-bottom-popup>
		<tui-toast ref="toast"></tui-toast>
	</view>
</template>

<script>
import OrderList from './components/order-list.vue'
import GoodsList from './components/goods-list.vue'
import {
	BASE_WS_API
} from '../../../config'
import {
	getUserId,
	timestampToTime
} from '../../../utils'
import {
	J_USER_INFO
} from '../../../constant'

export default {
	name: 'ChatDetail',
	components: { OrderList, GoodsList },
	data() {
		return {
			isRefresherTriggered: false,
			words: '',
			chat: '',
			name: '',
			avatar: '',
			userInfo: uni.getStorageSync(J_USER_INFO),
			groupMessages: [],
			scrollTop: '',
			isShowBubblePopup: false,
			isShowOrderPopup: false,
			isShowGoodsPopup: false
		}
	},
	onLoad(options) {
		this.chat = options.chat
		this.name = options.name
		this.avatar = options.avatar
		this.$store.dispatch('customerService/queryChatMessage', {
			foUserId: getUserId(),
			toUserId: this.chat
		}).then((res) => {
			console.log(res)
			const tempDate = Date.now()
			this.groupMessages = res.map((item) => ({
				event: '',
				message: {
					id: item.sendTime,
					status: 'succeed',
					type: item.msgType,
					sendTime: item.sendTime,
					content: item.contentText,
					toContactId: item.toUserId,
					fileSize: 0,
					fileName: '',
					fromUser: {
						id: item.fromUserId,
						displayName: item.fromUserName,
						avatar: item.fromAvatarImage
					},
					isGroup: false
				}
			})).concat([ {
				event: '',
				message: {
					id: tempDate,
					status: 'succeed',
					type: 'text',
					sendTime: tempDate,
					content: '您好，请问有什么能够帮到您？',
					toContactId: getUserId(),
					fileSize: 0,
					fileName: '',
					fromUser: {
						id: this.chat,
						displayName: '客服',
						avatar: '/static/logo.png'
					},
					isGroup: false
				}
			} ])
			this.scrollToBottom()
			this.$store.dispatch('customerService/joinCustomerServiceChat', {
				ref: this,
				wsHandle: ''
			})
		})
	},
	beforeDestroy() {
		this.$store.dispatch('customerService/joinCustomerServiceChat', {
			ref: this.$parent.$root,
			wsHandle: ''
		})
		// this.$store.getters.wsHandle.close()
		// this.$store.getters.wsHandleInfo.close()
	},
	methods: {
		timestampToTime,
		// onOpenInfo() {
		// 	console.log('onOpenInfo连接成功')
		// },
		onMessage(evt) {
			const data = JSON.parse(evt.data)
			console.log(data)
			if (data.status == 10400) {
				uni.showToast({
					title: '网络不给力，请检查网络连接',
					icon: 'none'
				}) // 弹出提示框
			} else if (data.status == 13140) {
				// if (data.message.fromUser.id === this.userInfo.userId) return
				const tempData = {
					event: '',
					message: {
						id: data.sendTime,
						status: 'succeed',
						type: data.msgType,
						sendTime: data.sendTime,
						content: data.contentText,
						toContactId: Number(data.toUserId),
						fileSize: 0,
						fileName: '',
						fromUser: {
							id: Number(data.fromUserId),
							displayName: data.fromUserName,
							avatar: data.fromAvatarImage
						},
						isGroup: false
					}
				}
				this.groupMessages.push(tempData)
				console.log(data)
				this.scrollToBottom()
			}
		},
		// onErrorInfo(errMsg) {
		// 	console.log('onErrorInfo出错了')
		// 	// uni.showLoading({
		// 	// 	title: '断线了，正在重新连接......',
		// 	// 	mask: true
		// 	// })
		// 	uni.showToast({
		// 		title: 'ErrorInfo出错了' + errMsg,
		// 		icon: 'none',
		// 		duration: 2000
		// 	})
		// },
		// onCloseInfo() {
		// 	console.log('onCloseInfo关闭了')
		// 	setTimeout(() => {
		// 		this.$store.dispatch('customerService/xxx', {
		// 			ref: this,
		// 			wsHandleInfo: uni.connectSocket({
		// 				url: `${BASE_WS_API}/APP/${getUserId()}`,
		// 				complete: () => { }
		// 			})
		// 		})
		// 	}, 2000)
		// },

		onOpen() {
			console.log('onOpen连接成功')
		},

		send(sendMsg) {
			if (typeof sendMsg === 'string') {
				// send(sendMsg)
			} else if (typeof sendMsg === 'object') {
				this.$store.getters.wsHandle.send({
					data: JSON.stringify(sendMsg),
					success: () => {
						const tempData = {
							event: '',
							message: {
								id: sendMsg.data.sendTime,
								status: 'succeed',
								type: sendMsg.data.msgType,
								sendTime: sendMsg.data.sendTime,
								content: sendMsg.data.contentText,
								toContactId: sendMsg.data.toUserId,
								fileSize: 0,
								fileName: '',
								fromUser: {
									id: sendMsg.data.fromUserId,
									displayName: sendMsg.data.fromUserName,
									avatar: sendMsg.data.fromAvatarImage
								},
								isGroup: false
							}
						}
						this.groupMessages.push(tempData)
						this.scrollToBottom()
					}
				})
			}
		},

		// 点击发送消息
		handleSendMessage() {
			// console.log(this, this.words)
			if (!this.words) {
				return uni.showToast({
					title: '请输入消息',
					icon: 'none',
					duration: 2000
				})
			}
			const tempDate = Date.now()
			// this.send({
			// 	event: '',
			// 	message: {
			// 		id: tempDate,
			// 		status: 'succeed',
			// 		type: 'text',
			// 		sendTime: tempDate,
			// 		content: this.words,
			// 		toContactId: this.chat,
			// 		fileSize: 0,
			// 		fileName: '',
			// 		fromUser: {
			// 			id: this.userInfo.userId,
			// 			displayName: this.userInfo.nickName,
			// 			avatar: this.userInfo.avatarUrl
			// 		},
			// 		isGroup: true
			// 	}
			// })
			this.$store.dispatch('customerService/addChatMessage', {
				userId: this.userInfo.userId,
				messageDetails: {
					contentText: this.words,
					fromAvatarImage: this.userInfo.avatarUrl,
					fromUserName: this.userInfo.nickName,
					fromUserId: this.userInfo.userId,
					sendTime: tempDate,
					toUserId: this.chat,
					toUsername: '',
					toAvatarImage: '',
					msgType: 'text',
					exp: ''
				}
			}).then((res) => {
				this.send({
					status: 13140,
					message: '发送消息',
					data: {
						contentText: this.words,
						fromAvatarImage: this.userInfo.avatarUrl,
						fromUserName: this.userInfo.nickName,
						fromUserId: this.userInfo.userId,
						sendTime: tempDate,
						toUserId: this.chat,
						toUsername: '',
						toAvatarImage: '',
						msgType: 'text',
						exp: ''
					}
				})
				this.words = ''
			})
		},

		// 点击选择图片
		handleSendImg() {
			uni.chooseImage({
				count: 1,
				success: (chooseImageRes) => {
					uni.showLoading({
						title: '图片上传中...'
					})
					const tempFilePaths = chooseImageRes.tempFilePaths
					uni.uploadFile({
						url: 'https://appapi.jfcmei.com/wx/storage/upload', // 仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						name: 'file',
						formData: {
							'user': 'test'
						},
						success: (uploadFileRes) => {
							console.log(uploadFileRes, uploadFileRes.data)
							const messageUrl = JSON.parse(uploadFileRes.data).data.url
							const tempDate = Date.now()
							// this.send({
							// 	event: '',
							// 	message: {
							// 		id: tempDate,
							// 		status: 'succeed',
							// 		type: 'image',
							// 		sendTime: tempDate,
							// 		content: messageUrl,
							// 		toContactId: this.chat,
							// 		fileSize: 0,
							// 		fileName: '',
							// 		fromUser: {
							// 			id: this.userInfo.userId,
							// 			displayName: this.userInfo.nickName,
							// 			avatar: this.userInfo.avatarUrl
							// 		},
							// 		isGroup: true
							// 	}
							// })
							this.$store.dispatch('customerService/addChatMessage', {
								userId: this.userInfo.userId,
								messageDetails: {
									contentText: messageUrl,
									fromAvatarImage: this.userInfo.avatarUrl,
									fromUserName: this.userInfo.nickName,
									fromUserId: this.userInfo.userId,
									sendTime: tempDate,
									toUserId: this.chat,
									toUsername: '',
									toAvatarImage: '',
									msgType: 'image',
									exp: ''
								}
							}).then((res) => {
								this.send({
									status: 13140,
									message: '发送消息',
									data: {
										contentText: messageUrl,
										fromAvatarImage: this.userInfo.avatarUrl,
										fromUserName: this.userInfo.nickName,
										fromUserId: this.userInfo.userId,
										sendTime: tempDate,
										toUserId: this.chat,
										toUsername: '',
										toAvatarImage: '',
										msgType: 'image',
										exp: ''
									}
								})
								uni.showToast({
									title: '图片上传成功'
								})
								uni.hideLoading()
							})
						},
						fail: () => {
							uni.hideLoading()
							this.ttoast('图片上传失败')
						},
						complete: () => {
							uni.hideLoading()
						}
					})
				}
			})
		},
		handlePopup(meaning) {
			this.isShowBubblePopup = false
			if (meaning === 'Order') {
				this.isShowOrderPopup = true
			} else if (meaning === 'Goods') {
				this.isShowGoodsPopup = true
			}
		},
		handleClosePopup(meaning) {
			if (meaning === 'Order') {
				this.isShowOrderPopup = false
			} else if (meaning === 'Goods') {
				this.isShowGoodsPopup = false
			}
		},
		handleSend(obj) {
			this.isShowGoodsPopup = false
			this.isShowOrderPopup = false
			const tempDate = Date.now()
			this.$store.dispatch('customerService/addChatMessage', {
				userId: this.userInfo.userId,
				messageDetails: {
					contentText: obj.msg,
					fromAvatarImage: this.userInfo.avatarUrl,
					fromUserName: this.userInfo.nickName,
					fromUserId: this.userInfo.userId,
					sendTime: tempDate,
					toUserId: this.chat,
					toUsername: '',
					toAvatarImage: '',
					msgType: obj.meaning,
					exp: ''
				}
			}).then((res) => {
				// this.send({
				// 	event: '',
				// 	message: {
				// 		id: tempDate,
				// 		status: 'succeed',
				// 		type: obj.meaning,
				// 		sendTime: tempDate,
				// 		content: obj.msg,
				// 		toContactId: this.chat,
				// 		fileSize: 0,
				// 		fileName: '',
				// 		fromUser: {
				// 			id: this.userInfo.userId,
				// 			displayName: this.userInfo.nickName,
				// 			avatar: this.userInfo.avatarUrl
				// 		},
				// 		isGroup: true
				// 	}
				// })
				this.send({
					status: 13140,
					message: '发送消息',
					data: {
						contentText: obj.msg,
						fromAvatarImage: this.userInfo.avatarUrl,
						fromUserName: this.userInfo.nickName,
						fromUserId: this.userInfo.userId,
						sendTime: tempDate,
						toUserId: this.chat,
						toUsername: '',
						toAvatarImage: '',
						msgType: obj.meaning,
						exp: ''
					}
				})
				uni.showToast({
					title: '图片上传成功'
				})
				uni.hideLoading()
			})
		},

		// 回退
		handleBack() {
			uni.navigateBack()
			// uni.navigateTo({
			// 	url: '/user/chat/chat'
			// })
		},

		handleScrolltoupper(e) {
			console.log(e, 1)
		},

		handleRefresherrefresh(e) {
			// this.isRefresherTriggered = true
			// // console.log(e, timestampToTime(this.groupMessages[0].message.sendTime))
			// this.$store.dispatch('customerService/queryChatMessageBack', {
			// 	chatId: this.chat,
			// 	limit: 10,
			// 	endTime: timestampToTime(this.groupMessages[0].message.sendTime)
			// 	// order: 'desc'
			// }).then((res) => {
			// 	// console.log(res)
			// 	if (res.length === 0) uni.showToast({ title: '没有更多消息了', icon: 'none' })
			// 	this.groupMessages = res.map((item) => JSON.parse(item.message)).concat(this.groupMessages)
			// 	this.isRefresherTriggered = false
			// })
		},
		// onPageScroll(e) {
		// 	console.log(e, 1)
		// },

		scrollToBottom() {
			this.$nextTick(() => {
				uni.createSelectorQuery().in(this)
					.select('#scroll-view-chat')
					.boundingClientRect((res) => {
						const top = res.height
						if (top > 0) {
							this.scrollTop = top
						}
					})
					.exec()
			})
		},

		// 预览图
		preview(index) {
			// console.log(index)
			const imgsArray = []
			imgsArray[0] = index
			uni.previewImage({
				urls: imgsArray,
				current: 0
			})
		}
	}
}
</script>

<style lang="less" scoped>
.chat-detail {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100vh;
	background-color: #f6f6f5;

	.scroll-Y {
		flex: 1;
		height: 0;
		padding-bottom: 144upx;
	}

	.header-container {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
		height: 120upx;
		background-color: #fff;
		border-radius: 0 0 48upx 48upx;
		padding: 32upx;
		box-sizing: border-box;

		// &.fixed {
		// 	position: fixed;
		// 	top: 0;
		// 	left: 0;
		// 	right: 0;
		// }

		.kefu-conatiner {
			display: flex;
			align-items: center;
			justify-content: flex-start;

			.back-icon {
				width: 24upx;
				height: 48upx;
			}

			.avatar {
				width: 80upx;
				height: 80upx;
				border-radius: 50%;
				margin: 0 16upx 0 32upx;
			}

			.kefu-name {
				color: #3a3629;
				font-size: 28upx;
			}
		}

		.tip {
			text-align: center;
			line-height: 56upx;
			width: 140upx;
			height: 56upx;
			border-radius: 100upx;
			background-color: #f3f3f2;
			font-size: 24upx;
			color: #8f8d85;
		}
	}

	.message-wrapper {
		padding: 32upx;
		box-sizing: border-box;
	}

	.message-slot {
		overflow: hidden;

		.time-wrapper {
			text-align: center;
			margin: 20upx 0;

			.time {
				margin: 0 auto;
				display: inline-block;
				padding: 7upx 24upx;
				line-height: 42upx;
				background-color: #fff;
				border-radius: 100px;
				color: #8f8d85;
			}
		}

		.words {
			// max-width: 750upx;
			padding: 24upx;
			box-sizing: border-box;
			font-size: 28upx;
			line-height: 42upx;
			word-break: break-all;
			background: #fff;
			clear: both;
		}

		.kefu-wrapper {
			.words {
				float: left;
				border-radius: 0px 24px 24px 24px;
			}

			.image {
				float: left;
				border-radius: 0px 24px 24px 24px;
			}

			.goods {
				float: left;
				border-radius: 0px 24px 24px 24px;
			}

			.order {
				float: left;
				border-radius: 0px 24px 24px 24px;
			}
		}

		.my-wrapper {
			.words {
				float: right;
				background-color: #fff1ca;
				border-radius: 24px 0 24px 24px;
			}

			.image {
				float: right;
				background-color: #fff1ca;
				border-radius: 24px 0 24px 24px;
			}

			.order {
				float: right;
				background-color: #fff1ca;
				border-radius: 24px 0 24px 24px;
			}

			.goods {
				float: right;
				background-color: #fff1ca;
				border-radius: 24px 0 24px 24px;
			}
		}
	}

	.op-footer {
		position: fixed;
		bottom: 0;
		padding: 32upx;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;

		.send-wrapper {
			flex: 1;
			background-color: brown;
			background-color: #fff;
			border-radius: 100upx;
			height: 80upx;
			display: flex;
			align-items: center;
			padding: 20upx 30upx;
			box-sizing: border-box;

			input {
				width: 100%;
			}
		}

		.upload-container {
			position: relative;

			.tui-menu-item {
				width: 100%;
				padding: 16upx 10upx;
				box-sizing: border-box;
			}

			.upload {
				width: 64upx;
				height: 64upx;
				border-radius: 50%;
				overflow: hidden;
				margin-left: 32upx;
				flex-shrink: 0;
				background-color: #fff;
			}
		}
	}
	/deep/ .tui-popup-class.tui-bottom-popup {
		height: 85vh!important;
	}
}
</style>
