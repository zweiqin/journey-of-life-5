<template>
	<view class="service-oil">
		<view class="top">
			<image src="../../../static/index/convenient-services/return.png" mode="" @click="back" />
			<text>加油</text>
		</view>
		<view class="bar-list">
			<view v-for="test in tests" :key="test.id" class="bar">
				<image :src="test.icon" mode="" @click="processById(test.id)" />
				<view class="text">{{ test.name }}</view>
			</view>
		</view>
		<view class="mid">

			<view class="card">
				<image src="../../../static/index/convenient-services/card.png" mode="" />
				<view v-if="showyouka" class="number">
					油卡编号: <text>{{ youkabianhao }}</text>
					<view class="copy" @tap="copyText(youkabianhao)">复制</view>
				</view>
				<view v-if="showyouka" class="surplus">油卡余额: <text>{{ youkayue }}</text></view>
			</view>

			<view v-for="test in czlog" :key="test.id" class="order-form">
				<view class="order-number">订单号: <text>{{ test.orderno }}</text></view>
				<view class="copy1" @tap="copyText(test.orderno)">复制</view>
				<view class="money">金额: <text>{{ test.amount }}</text></view>
				<view class="status">状态: <text>{{ test.status ? '失败' : '成功' }}</text></view>
				<view class="list">
					<view class="left"></view>
					<view class="heng"></view>
					<view class="right"></view>
				</view>
			</view>

		</view>

	</view>
</template>

<script>
import { tests, tests1 } from './data'
import { RuanRequest, getUserId } from '../../../utils'
export default {
	name: 'PhoneBill',
	props: {
	},
	data() {
		return {
			tests,
			tests1,
			showyouka: false,
			youkabianhao: '',
			youkayue: 0,
			czlog: []
		}
	},
	created() {
		RuanRequest('/tuanyou/queryYouKaAmount', null, 'post').then(({ data }) => {
			console.log(data)
			if (data.youKa != null) {
				this.showyouka = true
				this.youkabianhao = data.youKa
				this.youkayue = data.accountBalance
				this.tests = this.tests1

				const reqData = {
					'page': 1,
					'limit': 50
				}
				RuanRequest('/tuanyou/userczlog', reqData, 'post').then(({ data }) => {
					console.log(data)
					if (data.items != null) {
						this.czlog = data.items
					}
				})
			}
		})
	},
	methods: {
		back() {
			uni.navigateTo({ url: '/pages/index/convenient-services/convenient-services' })
		},
		copyText(value) {
			uni.setClipboardData({
				data: value,
				success() {
					console.log('success', value)
				}
			})
		},
		processById(id) {
			if (id == 1) {
				RuanRequest('/tuanyou/createyouka', null, 'post').then(({ data }) => {
					console.log(data)
					RuanRequest('/tuanyou/queryYouKaAmount', null, 'post').then(({ data }) => {
						console.log(data)
						if (data.youKa != null) {
							this.showyouka = true
							this.youkabianhao = data.youKa
							this.youkayue = data.accountBalance
							this.tests = this.tests1
						}
					})
				})
			} else if (id == 2) {
				uni.navigateTo({
					url: '/pages/index/convenient-services/recharge?kahao=' + this.youkabianhao
				})
			} else if (id == 3) {
				RuanRequest('/tuanyou/getjumpurl', null, 'post').then(({ data }) => {
					console.log(data)
					// uni.navigateToMiniProgram({
					// 	appId: 'wx1f1ea04b716771be',
					// 	path: data,
					// 	// extraData: {
					// 	//   'data1': 'test'
					// 	// },
					// 	success(res) {
					// 		console.log(res);
					// 	},
					// 	fail(res) {
					// 		console.log(res);
					// 	}
					// })
					uni.navigateTo({
						url: '/pages/index/convenient-services/tuanyouh5?url=' + data
					})
				})
			}
		}
	}
}
</script>

<style lang="less" scoped>
.service-oil {
	width: 100%;
	min-height: 100vh;
	padding: 0 30upx;
	box-sizing: border-box;
	background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);

	.header {
		width: 100%;
		display: flex;
		align-items: center;

		/deep/ .bee-address-container {
			flex: 1;
		}

		.address-wrapper {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.current-addresss {
				font-size: 32upx;
				font-weight: 500;
			}
		}
	}

	.top {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 36upx;

		image {
			width: 56upx;
			height: 56upx;
			position: absolute;
			left: 30upx;
		}

		text {
			color: rgba(0, 0, 0, 0.85);
			font-size: 36upx;
			font-weight: 500;
		}
	}

	.banner-wrapper {
		padding: 28upx 0;

		image {
			width: 100%;
			height: 200upx;
			border-radius: 20upx;
		}
	}

	.bar-list {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 44upx 80upx 68upx 80upx;

		.bar {
			width: 112upx;
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				width: 64upx;
				height: 64upx;
			}

			.text {
				font-size: 28upx;
				color: #000000;
			}
		}
	}

	.mid {

		// padding: 0upx 22upx;
		// border-radius: 20upx 20upx 0upx 0upx;
		// background: linear-gradient(180deg, #FFFFFF 0%, #FDFAFA 122%);
		.card {
			background: #FFFFFF;
			border-radius: 10upx;
			padding: 108upx 0upx 40upx 30upx;
			position: relative;
			margin-bottom: 26upx;

			image {
				width: 302upx;
				height: 100upx;
				position: absolute;
				top: 0upx;
				left: 0upx;
			}

			.number {
				padding-bottom: 10upx;
				font-size: 28upx;
				font-weight: 500;
				color: #000000;
				display: flex;
				align-items: center;

				text {
					padding-left: 10upx;
					color: #3D3D3D;
				}

				.copy {
					position: absolute;
					right: 30upx;
				}
			}

			.surplus {
				font-size: 28upx;
				font-weight: 500;
				color: #000000;

				text {
					padding-left: 10upx;
					color: #FF0000;
				}
			}
		}

		.order-form {
			margin-bottom: 26upx;
			background: #FFFFFF;
			border-radius: 10upx;
			padding: 40upx 30upx 26upx 30upx;
			box-sizing: border-box;
			position: relative;

			.order-number {
				display: flex;
				justify-content: space-between;
				align-items: center;
				color: #000000;

				text {}
			}
			.copy1{
				color: #000000;
				text-align: right;
			}

			.money {
				padding-top: 80upx;
				padding-bottom: 28upx;
				color: #000000;
				display: flex;
				justify-content: space-between;
				align-items: center;

				text {
					color: #FF0000;
				}
			}

			.status {
				color: #000000;
				display: flex;
				justify-content: space-between;
				align-items: center;

				text {
					color: #3662EC;
				}
			}

			.list {
				display: flex;
				align-items: center;
				position: absolute;
				top: 150upx;
				left: 0;
				width: 100%;

				.left {
					width: 46upx;
					height: 46upx;
					border-radius: 40upx;
					background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);
					position: absolute;
					left: -26upx;
				}

				.heng {
					width: 100%;
					height: 0upx;
					border: 1upx dashed #D8D8D8;
				}

				.right {
					width: 46upx;
					height: 46upx;
					border-radius: 40upx;
					background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);
					position: absolute;
					right: -26upx;
				}

			}
		}

	}
}
</style>
