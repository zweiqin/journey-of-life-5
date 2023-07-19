<template>
	<view class="DeliveryExpress">
		<NavHeader :BindClick="goBack"></NavHeader>
		<!-- 用于填充因定位而失去的高度 -->
		<view class="NavHeader"></view>
		<DeliveryExpress :SenderData="SenderData" :collecterData="collecterData" :options="options"></DeliveryExpress>
		<SubsetTabbar :currIndex="1"></SubsetTabbar>
		<!-- 用于填充因定位而失去的高度 -->
		<view class="SubsetTabbar"></view>
	</view>
</template>

<script>
	import SubsetTabbar from "./components/SubsetTabbar.vue";
	import DeliveryExpress from "./components/DeliveryExpress.vue"
	import NavHeader from "./components/header.vue";
	import {
		// getBianminRecordKuaidiApi,  // 查询我个人寄快递的记录
		getKuaidi100ComApi,  // 获取可使用快递公司编码
		getKuaidi100PriceApi, // C端寄件下单-价格查询
		addKuaidi100CorderApi,  // C端寄件下单
		orderCancelApi // C端寄件下单-取消
	} from '@/api/convenient-services';
	export default {
		components: {
			SubsetTabbar,
			NavHeader,
			DeliveryExpress
		},
		data() {
			return {
				options: {},
				SenderData: {
					area: "广东省广州市",
					detailedArea: "翻斗花园一单元一号",
					name: "翻斗花园突击手牛爷爷",
					mobile: "132****0927",
				},
				collecterData: {
					area: "广东省广州市",
					detailedArea: "翻斗花园一单元一号",
					name: "翻斗花园突击手牛爷爷",
					mobile: "132****0927",
				}
			};
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
		},
		onLoad(options) {
			// getKuaidi100PriceApi({
			// 	"kuaidicom": "shunfeng",
			// 	"recManPrintAddr": "广东省深圳市",
			// 	"sendManPrintAddr": "广东省深圳市",
			// 	"serviceType": "顺丰标快",
			// 	"weight": "1"
			// }).then(res => {
			// 	console.log(res)
			// })
			try{
				this.options = JSON.parse(options.standingForm)
				if(this.options.standing == "Send") {
					this.SenderData = this.options
				}else {
					this.collecterData = this.options
				}
				console.log(this.options)
			}catch(err){
				console.log(err)
			}
		}
	}
</script>

<style lang="scss" scoped>
.DeliveryExpress {
	min-height: 100vh;
	background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);
	.NavHeader {
		height: 88rpx;
	}
	.SubsetTabbar {
		height: 113rpx;
	}
}
</style>