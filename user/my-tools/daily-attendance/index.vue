<template>
	<view class="sign">
		<view class="head">
			<image src="../../../static/index/earn-money/back.png" mode="" @click="handleBack" />
			<view class="points_buttom" @click="go('/pages/index/sign/points-mall')">
				<image src="@/static/index/earn-money/jifen.png" mode="" />
				<text>{{ signDetails.totalNum }}</text>
				<image class="goToPointsMall" src="@/static/index/earn-money/youjiantou.png" mode="" />
			</view>
			<image src="@/static/index/earn-money/wenjian.png" mode="" />
		</view>

		<view class="middle">
			<view class="date">
				<view v-if="!todaySignL" class="getMorePoints" @click="getSign">
					<view class="getMorePoints_text"> 签到领积分 </view>
				</view>
				<view v-else class="getMorePoints noanimation" @click="getSign">
					<view class="getMorePoints_text"> 获取更多积分 </view>
				</view>
				<view class="SignIn">
					<view class="SignIn_heade">
						<view class="SignIn_headeText">
							已连续签到<text>{{ signDetails.days }}</text>天，明天签到加{{ signDetails.number }}分
						</view>
						<view class="SignIn_warn">
							<image class="goToPointsMall" src="@/static/index/earn-money/qiandao.png" mode="" />提醒我
						</view>
					</view>
					<view class="SignI_Button">
						<view v-for="(item, index) in weekList" :key="item.timeStamp" class="SignI_ButtonItem">
							<view class="SignRound" :class="[ { 'isSignIn': item.flag == 1 } ]">
								{{ item.flag == 0 ? `+${item.integral}` : '√' }}
							</view>
							<view class="SignRound_text">
								第{{ index + 1 }}天{{ item.flag }}
								<!-- {{ new Date(item.date).getDate() ==new Date().getDate()?'今天':item.easyDate }} -->
							</view>
						</view>
					</view>
				</view>
				<!-- <image src="@/static/index/earn-money/xiangxiajiantou.png" mode=""></image> -->
			</view>
			<view class="main">
				<view class="integral">
					<view class="i-left">
						<view class="i-name">当前积分</view>
						<view class="i-list">
							<text>{{ signDetails.totalNum }}</text>
							<image src="../../../static/index/sign/go.png" mode="" />
						</view>
					</view>
					<view class="i-right" @click="go('/pages/index/sign/points-mall')">前往商城</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import Vue from 'vue'
import {
	addUserSignInApi,
	getUserSignInListApi,
	getUserSigninContinuousApi,
	geUserSign
} from '@/api/user'
import {
	getUserId,
	transformNumber
} from '@/utils'
export default {
	name: 'DailyAttendance',
	props: {},
	data() {
		return {
			timerNumber: '',
			todays: '',
			todaySignL: false,
			today: new Date().toISOString()
				.slice(0, 10),
			lastSignIndex: 0,
			signDetails: {},
			weekName: ['星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '星期日'],
			weekList: [ {} ]
		}
	},
	computed: {
		// 这里为已签到和未签到的天数的，因不符合需求暂时搁置，看后期如若需要再处理，不需要则删除
		SignInDays: {
			get() {
				const arr = this.weekList.filter((item) => {
					if (item.flag == 1) {
						return item
					}
				})
				return arr
			}
		},
		DaysNosignin: {
			get() {
				const arr = this.weekList.filter((item) => {
					if (item.flag == 1) {
						return item
					}
				})
				return arr
			}
		}
	},
	created() {
		this.timerNumber = new Date().getTime() - (this.lastSignIndex * 24 * 60 * 60 * 1000)
		this.getTodaySign()
		this.getUserData()
	},
	methods: {
		getTodaySign() {
			const startTime = new Date(this.timerNumber)
			// startTime.setDate(); //获取AddDayCount天后的日期
			// console.log(startTime)
			var y = startTime.getFullYear()
			var m = (startTime.getMonth() + 1) < 10 ? '0' + (startTime.getMonth() + 1) : startTime.getMonth() +
				1 // 获取当前月份的日期，不足10补0
			var d = startTime.getDate() < 10 ? '0' + startTime.getDate() : startTime.getDate() // 获取当前几号，不足10补0
			this.todays = y + '-' + m + '-' + d
			const today = y + m + d
			// console.log(this.todays)
			// console.log(today)
			geUserSign({ startDate: today, endDate: today }).then((res) => {
				res.data > 0 ? this.todaySignL = true : this.todaySignL = false
				// console.log(this.todaySignL)
			})
		},
		getUserData() {
			// 获取当前连续签到日期和明天签到积分
			getUserSigninContinuousApi({
				userId: getUserId()
			}).then((res) => {
				this.signDetails = res.data
				console.log(res.data)
			})
			// 获取当前签到的信息，一个星期签到了多少天等等。。。。,并将这些数据整合到一个数组里面
			getUserSignInListApi({
				userId: getUserId()
			}).then((res) => {
				// console.log(res.data)
				res.data.data.forEach((item, index) => {
					// 传统的数组方法在改变长度时Vue有时会不响应改变，因此调用这个方法来刷新 Vue.set(this.Array, index, {yourData})
					// this.weekList[index] = {...this.weekList[index],...res.data.data[index]}
					Vue.set(this.weekList, index, {
						...res.data.data[index]
					})
				})
				// 获取最后签到的天数的下标
				this.lastSignIndex = (function (arr) {
					var lastIndex = -1 // 默认下标为 -1，表示未找到
					for (var i = arr.length - 1; i >= 0; i--) {
						if (arr[i].flag === 1) {
							lastIndex = i
							break // 找到后直接退出循环
						}
					}
					return lastIndex
				}(this.weekList))
				// 获取当前星期的日期
				this.getWeekList()
				// console.log(this.weekList)
				// console.log(this.lastSignIndex)
			})
		},
		handleBack() {
			this.$switchTab('/pages/user/user')
		},
		updateSign(item) {
			console.log(item)
		},
		refeshSignData(item) {
			console.log(item)
		},
		signDate(item) {
			console.log(item)
		},
		// 时间戳转日期格式
		timestampToTime(timestamp) {
			var date = new Date(timestamp)
			var Y = date.getFullYear() + '-'
			var M =
				(date.getMonth() + 1 < 10
					? '0' + (date.getMonth() + 1)
					: date.getMonth() + 1) + '-'
			var D = date.getDate()
			return Y + M + D
		},
		timestampToEasyTime(timestamp) {
			var date = new Date(timestamp)
			var Y = date.getFullYear() + '.'
			var M =
				(date.getMonth() + 1 < 10 ? date.getMonth() + 1 : date.getMonth() + 1) +
				'.'
			var D = date.getDate()
			return M + D
		},
		// 获取最开始签到的时间
		// getStarTimer() {
		// 	// console.log(this.lastSignIndex)
		// 	// console.log(this.lastSignIndex * 24 * 60 * 60 * 1000)
		// 	const startTime = new Date(new Date().getTime() - (this.lastSignIndex * 24 * 60 * 60 * 1000))
		// 	// startTime.setDate(); //获取AddDayCount天后的日期

		// 	var y = startTime.getFullYear()

		// 	var m = (startTime.getMonth() + 1) < 10 ? '0' + (startTime.getMonth() + 1) : startTime.getMonth() +
		// 		1 // 获取当前月份的日期，不足10补0

		// 	var d = startTime.getDate() < 10 ? '0' + startTime.getDate() : startTime.getDate() // 获取当前几号，不足10补0
		// 	return y + '-' + m + '-' + d
		// },
		getWeekList() {
			const week = []
			for (var i = 0; i < 7; i++) {
				const weekObj = {
					// name: this.weekName[i],
					date: '',
					timeStamp: '',
					easyDate: ''
				}
				week.push(weekObj)
			}
			const today = Number(new Date(this.todays))

			for (var right = 0; right < 7; right++) {
				week[right].timeStamp =
					today + right * 1000 * 60 * 60 * 24
			}
			week.map((item) => {
				item.date = this.timestampToTime(item.timeStamp)
				item.easyDate = this.timestampToEasyTime(item.timeStamp)
			})
			week.forEach((item, index) => {
				Vue.set(this.weekList, index, {
					...this.weekList[index],
					...week[index]
				})
			})
			// console.log(week)
			// console.log(this.weekList)
		},
		getSign() {
			addUserSignInApi({
				userId: getUserId()
			}).then((res) => {
				uni.showToast({
					title: res.data.errmsg,
					icon: 'success'
				})
				this.$forceUpdate()
			})
				.finally(() => {
					this.getTodaySign()
					this.getUserData()
				})
		}
	}
}
</script>

<style lang="less" scoped>
// 按钮动画
@keyframes animateBtn {
	0% {
		transform: scale(1);
	}

	50% {
		transform: scale(1.1);
	}

	100% {
		transform: scale(1);
	}
}

@-webkit-keyframes shiny-btn1 {
	0% {
		-webkit-transform: scale(0) rotate(45deg);
		opacity: 0;
	}

	80% {
		-webkit-transform: scale(0) rotate(45deg);
		opacity: 0.5;
	}

	81% {
		-webkit-transform: scale(4) rotate(45deg);
		opacity: 1;
	}

	100% {
		-webkit-transform: scale(50) rotate(45deg);
		opacity: 0;
	}
}

.sign {
	width: 100vw;
	min-height: 100vh;
	background: linear-gradient(180deg, #FFE5CC 5%, #FFF9F0 25%, #F6F6F6 13%);

	.head {
		box-sizing: border-box;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		// padding-top: 40upx;
		// padding-bottom: 24upx;
		padding: 40rpx 30rpx 24rpx 30rpx;
		// background: linear-gradient(174deg, #fe5c22 15%, #fe933f 77%);

		>image {
			width: 56upx;
			height: 56upx;
		}

		// > text {
		// 	font-size: 36upx;
		// 	font-weight: 500;
		// 	margin-right: 100rpx;
		// }
		.points_buttom {
			margin-left: -310rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;
			border-radius: 50rpx;
			// width: 128rpx;
			padding-right: 25rpx;
			height: 66rpx;
			background-color: #7070708e;

			image {
				margin-left: 10rpx;
				width: 50rpx;
				height: 50rpx;
			}

			text {
				text-align: right;
				margin-left: 10rpx;
				color: #fff;
			}

			.goToPointsMall {
				width: 25rpx;
				height: 25rpx;
			}
		}
	}

	.bg {
		width: 100%;
		height: 610upx;
		position: absolute;
	}

	.middle {
		padding: 0 20upx;
		position: relative;
		padding-top: 36px;

		.date {
			width: 715rpx;
			height: 300rpx;
			position: relative;
			background-color: #fff;
			border-radius: 25rpx;
			display: flex;
			align-items: center;
			flex-direction: column;

			// 模仿光线效果
			.getMorePoints:before {
				position: absolute;
				content: '';
				display: inline-block;
				top: -180px;
				left: 0;
				width: 50rpx;
				height: 100%;
				background-color: #fff;
				animation: shiny-btn1 3s ease-in-out infinite;
			}

			.getMorePoints {
				// z-index: 0;
				position: absolute;
				top: -40rpx;
				color: #fff;
				background: linear-gradient(0deg, #fd1a02 0%, #fd7831 65%);
				border-radius: 50rpx;
				width: 300rpx;
				height: 85rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				cursor: pointer;
				outline: none;
				overflow: hidden;
				// 放大缩小动画
				animation: animateBtn 1.5s ease-in-out infinite;

				.getMorePoints_text {
					background: linear-gradient(0deg, #fd1a02 0%, #fb9761 90%);
					border-radius: 50rpx;
					line-height: 60rpx;
					text-align: center;
					width: 275rpx;
					height: 60rpx;
				}
			}

			.noanimation {
				animation: none;
			}

			.SignIn {
				margin-top: 54rpx;
				width: 668rpx;
				height: 193rpx;

				.SignIn_heade {
					display: flex;
					justify-content: space-between;

					.SignIn_headeText {
						font-size: 24rpx;
						color: #a3a8b9;

						text {
							color: #ff8515;
							padding: 0 5rpx;
							font-size: 35rpx;
						}
					}

					.SignIn_warn {
						display: flex;
						color: #ff8515;
						font-size: 26rpx;
						line-height: 40rpx;
						font-weight: 600;

						image {
							margin-right: 2rpx;
							margin-top: 2rpx;
							width: 40rpx;
							height: 35rpx;
						}
					}
				}

				// 下半部分打卡区
				.SignI_Button {
					display: flex;

					.SignI_ButtonItem {
						flex: 1;
						display: flex;
						flex-direction: column;
						align-items: center;
						margin-top: 30rpx;

						.SignRound {
							width: 60rpx;
							height: 60rpx;
							// border-radius: 50%;
							background-color: #f4f3f9;
							font-size: 20rpx;
							text-align: center;
							line-height: 55rpx;
							color: #a9acb8;
						}

						.SignRound_text {
							margin-top: 12rpx;
							font-size: 20rpx;
							text-align: center;
							color: #a9acb8;
						}

						.isSignIn {
							background-color: #FFE5CC;
							color: #d80000;
						}
					}
				}
			}

			>image {
				margin-top: 15rpx;
				width: 38rpx;
				height: 26rpx;
			}
		}

		.main {
			// padding: 0 20upx;
			// margin-top: 400upx;
			padding-bottom: 40upx;
			padding-top: 28upx;

			.integral {
				width: 100%;
				// height: 114upx;
				border-radius: 20upx;
				box-sizing: border-box;
				background-color: #5357613f;
				// background: linear-gradient(270deg, #515972 0%, #66708b 100%);
				padding: 14upx 36upx 18upx 36upx;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 36upx;

				.i-left {
					.i-name {
						font-size: 24upx;
						color: #ffffff;
					}

					.i-list {
						display: flex;
						align-items: center;

						text {
							font-size: 36upx;
							font-weight: 500;
							color: #ffffff;
							padding-right: 28upx;
						}

						image {
							width: 48upx;
							height: 48upx;
						}
					}
				}

				.i-right {
					width: 232upx;
					height: 62upx;
					border-radius: 100upx;
					background: linear-gradient(90deg, #f44b06 0%, #fc9214 100%);
					font-size: 28upx;
					font-weight: 500;
					color: #ffffff;
					display: flex;
					justify-content: center;
					align-items: center;
				}
			}

			.mid {
				width: 100%;
				// height: 725px;
				border-radius: 20upx;
				background: #fff6e5;
				box-sizing: border-box;
				border: 2upx solid #e1b590;
				padding: 0 24upx;
				padding-bottom: 20upx;

				.head-img {
					display: flex;
					justify-content: center;
					align-items: center;
					padding: 60upx 0upx 68upx 0upx;

					image {
						width: 64upx;
						height: 30upx;
					}

					text {
						font-size: 48upx;
						font-weight: bold;
						color: #911a00;
						padding: 0 48upx;
					}
				}

				.exchange {
					width: 100%;
					border-radius: 20upx;
					background: #ffffff;
					padding: 26upx 28upx 40upx 28upx;
					box-sizing: border-box;

					.ex-name {
						font-size: 28upx;
						font-weight: 500;
						color: #3d3d3d;
						// margin-bottom: 18upx;
					}

					.heng {
						width: 100%;
						height: 2upx;
						background: linear-gradient(90deg,
								#ffffff 0%,
								#d8d8d8 47%,
								#ffffff 100%);
						margin-top: 18upx;
						margin-bottom: 20upx;
					}

					.sub-list {
						position: relative;
						display: flex;
						justify-content: space-between;

						// white-space: nowrap;
						// &::after {
						// 	content: '';
						// 	position: absolute;
						// 	left: 33%;
						// 	top: 50%;
						// 	width: 196upx;
						// 	height: 2upx;
						// 	transform: rotate(90deg);
						// 	background: linear-gradient(270deg, #FFFFFF 0%, #D8D8D8 50%, #FFFFFF 100%);
						// }

						.sub {
							display: flex;
							flex-direction: column;
							align-items: center;

							image {
								width: 224upx;
								height: 142upx;
							}

							text {
								font-size: 24upx;
								color: #3d3d3d;
								padding-top: 6upx;
							}
						}
					}
				}

				.text-list {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 52upx 20upx 26upx 24upx;

					.name {
						font-size: 28upx;
						font-weight: 500;
						color: #3d3d3d;
					}

					.more {
						display: flex;
						align-items: center;

						text {
							font-size: 24upx;
							color: #999999;
						}

						image {
							width: 28upx;
							height: 28upx;
						}
					}
				}

				.goods-list {
					display: flex;
					flex-wrap: wrap;
					justify-content: space-between;

					.goods {
						width: 310upx;
						// height: 380upx;
						border-radius: 20upx;
						background: #ffffff;
						display: flex;
						flex-direction: column;
						align-items: center;
						margin-bottom: 28upx;

						image {
							width: 224upx;
							height: 142upx;
							margin: 30upx 0 20upx 0;
						}

						text {
							margin: 8upx 0upx 14upx 0upx;
							font-size: 24upx;
							color: #3662ec;
						}

						.goods-name {
							font-size: 24upx;
							color: #3d3d3d;
						}

						.click {
							width: 184upx;
							height: 44upx;
							border-radius: 20upx;
							background: linear-gradient(90deg, #f55808 0%, #fb8d13 100%);
							font-size: 28upx;
							font-weight: 500;
							color: #ffffff;
							display: flex;
							justify-content: center;
							align-items: center;
							margin-bottom: 34upx;
						}
					}
				}
			}
		}
	}
}
</style>
