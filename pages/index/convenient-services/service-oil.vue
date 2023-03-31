<template>
	<view class="phone-bill">
		<view class="header">
			<tui-icon name="arrowleft" color="#000" @click="handleBack"></tui-icon>
			<BeeAddress>
				<view class="address-wrapper">
					<view class="current-addresss">位置：广东省佛山市</view>
					<BeeIcon :src="require('../../../static/index/bianmin/location.png')" :size="24"></BeeIcon>
				</view>
			</BeeAddress>
		</view>
		<view class="mid">
			<view class="bar-list">
				<view class="bar" v-for="test in tests" :key="test.id">
					<image :src="test.icon" mode="" @click="processById(test.id)" />
					<view class="text">{{ test.name }}</view>
				</view>
			</view>
			<!-- <view class="coupon-list">
				<view class="coupon" v-for="item in coupons" :key="item.id">
					<image :src="item.icon" mode="" />
				</view>
			</view> -->
			<view v-if="showyouka" class="text">油卡编号: {{ youkabianhao }}</view>
			<view v-if="showyouka" class="text">油卡余额: {{ youkayue }}</view>
			
			<view class="bar" v-for="test in czlog" :key="test.id">
				<view class="text">订单号: {{ test.orderno }}</view>
				<view class="text">金额: {{ test.amount }}</view>
				<view class="text">状态: {{ test.status }}</view>
			</view>
		</view>
		
	</view>
</template>

<script>
import { items, coupons ,tests ,tests1} from './data'
import { RuanRequest,getUserId } from "../../../utils"
import { payOrderGoodsApi } from "../../../api/goods"
export default {
	name: "Phone-bill",
	props: {
	},
	data() {
		return {
			items,
			coupons,
			tests,
			tests1,
			showyouka: false,
			youkabianhao: "",
			youkayue: 0,
			czlog: [],
		}
	},
	methods: {
		handleBack() {
			uni.navigateTo({ url: '/pages/index/convenient-services/convenient-services' })
		},
		processById(id) {
			if (id == 1) {
				RuanRequest("/tuanyou/createyouka", null, "post").then(({ data }) => {
					console.log(data);
					RuanRequest("/tuanyou/queryYouKaAmount", null, "post").then(({ data }) => {
						console.log(data);
						if(data.youKa != null){
							this.showyouka = true;
							this.youkabianhao = data.youKa;
							this.youkayue = data.accountBalance;
							this.tests = this.tests1;
						}
					});
				});
			} else if (id == 2) {
				const reqData = {
					"kahao": this.youkabianhao,
					"amount": 0.1,
				};
				RuanRequest("/tuanyou/tygetorderinfo", reqData , "post").then(({ data }) => {
					console.log(data);
					payOrderGoodsApi({
						orderNo: data.orderno,
						userId: getUserId(),
						payType: data.payType
					}).then((res) => {
						console.log(res);
						const payData = JSON.parse(res.h5PayUrl);
						const form = document.createElement("form");
						form.setAttribute("action", payData.url);
						form.setAttribute("method", "POST");
						const data = JSON.parse(payData.data);
						let input;
						for (const key in data) {
						  input = document.createElement("input");
						  input.name = key;
						  input.value = data[key];
						  form.appendChild(input);
						}

						document.body.appendChild(form);
						form.submit();
						document.body.removeChild(form);
					});
				});
			} else if (id == 3) {
				RuanRequest("/tuanyou/getjumpurl", null, "post").then(({ data }) => {
					console.log(data);
					uni.navigateToMiniProgram({
						appId: 'wx1f1ea04b716771be',
						path: data,
						// extraData: {
						//   'data1': 'test'
						// },
						success(res) {
							console.log(res);
						},
						fail(res) {
							console.log(res);
						}
					})
				});
			}
		}
	},
	created() { 
		RuanRequest("/tuanyou/queryYouKaAmount", null, "post").then(({ data }) => {
			console.log(data);
			if(data.youKa != null){
				this.showyouka = true;
				this.youkabianhao = data.youKa;
				this.youkayue = data.accountBalance;
				this.tests = this.tests1;
			}
		});
		const reqData = {
			"page": 1,
			"limit": 50,
		};
		RuanRequest("/tuanyou/userczlog", reqData, "post").then(({ data }) => {
			console.log(data);
			this.czlog = data.items;
		});
	}
}
</script>

<style lang="less" scoped>
.phone-bill {
	width: 100%;
	min-height: 100vh;
	padding: 20upx;
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

	.banner-wrapper {
		padding: 28upx 0;

		image {
			width: 100%;
			height: 200upx;
			border-radius: 20upx;
		}
	}

	.mid {
		padding: 0upx 22upx;
		border-radius: 20upx 20upx 0upx 0upx;
		background: linear-gradient(180deg, #FFFFFF 0%, #FDFAFA 122%);

		.bar-list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 44upx 0 68upx 0;

			.bar {
				width: 112upx;
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 80upx;
					height: 80upx;
				}

				.text {
					font-size: 28upx;
					color: #000000;
				}
			}
		}

		.coupon-list {
			display: flex;
			justify-content: space-between;
			padding-bottom: 30upx;

			.coupon {
				image {
					width: 152upx;
					height: 192upx;
				}
			}
		}
	}
}
</style>
