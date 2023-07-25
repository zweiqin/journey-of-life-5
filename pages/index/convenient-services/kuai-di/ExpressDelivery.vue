<template>
	<view class="ExpressDeliveryView">
		<NavHeader></NavHeader>
		<!-- 用于填充因定位而失去的高度 -->
		<view class="NavHeader"></view>
		<view class="ExpressDeliveryContainer">
			<view class="informationFrom">
				<view class="fromItem">
					<view class="sender">
						寄
					</view>
					<view class="senderInformation" @click="getAddres('Send')">
						<p><span>{{SenderData.area}} <span class="DetailedAddress">{{SenderData.detailedArea}}</span>
							</span></p>
						<p :class="{isNone:!SenderData.name}"><span>{{SenderData.name?SenderData.name:'完善寄件人信息'}}</span><span v-if="SenderData.name"
								style="margin-left: 10rpx;">{{SenderData.mobile}}</span></p>
					</view>
				</view>
				<view class="fromItem">
					<view class="sender consignee">
						收
					</view>
					<view class="senderInformation" style="border: none;" @click="getAddres('Collect')">
						<!-- <p><span>广州省广州市</span><span>地址簿</span></p> -->
						<p><span>{{collecterData.area}}<span class="DetailedAddress">{{collecterData.detailedArea}}</span></span></p>
						<p><span>{{collecterData.name?collecterData.name:'完善寄件人信息'}}</span><span v-if="collecterData.name"
								style="margin-left: 10rpx;">{{collecterData.mobile}}</span></p>
					</view>
				</view>
			</view>
			<view class="goodsType" @click="getGoodsType">
				<tuiInput labelColor="grey" label="货物类型" backgroundColor="none" v-model="goodsType" placeholder="请选择货物类型" disabled>
					<template v-slot:right>
						<image style="width: 30rpx;height: 30rpx" src="./image/youjiantou.png" mode=""></image>
					</template>
				</tuiInput>
			</view>
			<view class="moreSlect">
				<tuiForm ref="expSubmitForm">
					<view class="moreSlectItem" @click="showSelect">
						<tuiInput labelColor="grey" size="38" label="快递公司" backgroundColor="none" v-model="kuaidicom.text" placeholder="选择快递公司" disabled>
							<template v-slot:right>
								<image style="width: 30rpx;height: 30rpx" src="./image/youjiantou.png" mode=""></image>
							</template>
						</tuiInput>
					</view>
					<view class="moreSlectItem" @click="getGoodsType">
						<tuiInput labelColor="grey" label="期望上门时间" backgroundColor="none" v-model="timer" placeholder="选择期望上门时间" disabled>
							<template v-slot:right>
								<image style="width: 30rpx;height: 30rpx" src="./image/youjiantou.png" mode=""></image>
							</template>
						</tuiInput>
					</view>
					<tuiInput labelColor="grey" size="38" label="货物重量" backgroundColor="none" v-model="FormData.weight" require placeholder="单位/kg" clearable>
					</tuiInput>
					<tuiInput labelColor="grey" size="38" label="给快递员留言" backgroundColor="none" v-model="FormData.cargo" placeholder="选填" clearable>
					</tuiInput>
				</tuiForm>
			</view>
		</view>
		<view class="SettleAccountfooter">
			<span>预计： <span class="money">{{'xxx'}}元</span></span>
			<button type="primary" style="margin: 0" @click="placeOrder">立即下单</button>
		</view>
		<tui-select maskClosable="true" :list="list" :show="show" @confirm="confirm" @close="onClose"></tui-select>
	</view>
</template>

<script>
	const rules = [{
			name: "weight",
			rule: ["required"],
			msg: ["请输入预期的货物重量", "请输入正常数值的重量"]
		 }];
	import { getUserId, KuaiDiRequest, getBrandId } from '@/utils'
	import tuiForm from "@/components/thorui/tui-form/tui-form.vue"
	import NavHeader from "./components/header.vue";
	import { ECList } from "./ExpressData.js" // 引入快递公司的数据
	import tuiInput from "@/components/thorui/tui-input/tui-input.vue"
	import tuiSelect from "@/components/thorui/tui-select/tui-select.vue"
	import {
		// getBianminRecordKuaidiApi,  // 查询我个人寄快递的记录
		// getKuaidi100ComApi,  // 获取可使用快递公司编码
		getKuaidi100PriceApi, // C端寄件下单-价格查询
		addKuaidi100CorderApi,  // C端寄件下单
		orderCancelApi // C端寄件下单-取消
	} from '@/api/convenient-services';
	export default {
		components: {
			NavHeader,
			tuiForm,
			tuiInput,
			tuiSelect
		},
		data() {
			return {
				goodsType: "",
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
				},
				FormData: {
					callBackUrl:"https://h5.jfcmei.com/api/wx/kuaidi100/cloud/corderCb",
					pollCallBackUrl:"https://h5.jfcmei.com/api/wx/kuaidi100/cloud/corderTrackCb",
					kuaidicom: "", // 选择快递公司的key
					cargo: " ",   // 留言
					weight: ""  // 重量
				},
				rules: rules,
				kuaidicom: {},  // 选择的快递公司
				timer: "",
				show: false,
				list: [],
			};
		},
		methods: {
			transformExPData() {
				ECList.forEach((item,index) => {
					this.list.push({
						text: item.name,
						src: item.imgUrl,
						value: item.key,
					})
				})
				// console.log(this.list)
			},
			getAddres(standing) {
				uni.navigateTo({
					url: `/pages/index/convenient-services/kuai-di/kuaiDiForm?standing=${standing}`
				})
			},
			getGoodsType() {
				uni.showToast({
					title: "暂时未开通服务",
					icon: "none"
				})
			},
			// 开启快递商家选择栏
			showSelect() {
			 		this.show = true
			 	},
			confirm(e) {
				// console.log(e)
				this.FormData.kuaidicom = e.options.value
				this.kuaidicom = e.options
				this.onClose()
			},
			onClose() {
				this.show = false
			},
			// 下单接口
			placeOrder() {
				console.log(this.FormData.kuaidicom)
				this.$refs.expSubmitForm.validate(this.FormData,this.rules).then(res => {
					// 校验通过
					const query = {
						orderReq: {
							kuaidicom:this.kuaidicom.value,
							sendManName: this.SenderData.name,
							sendManMobile: this.SenderData.mobile,
							recManName: this.collecterData.name,
							recManMobile:  this.collecterData.mobile,
							sendManPrintAddr: this.SenderData.area + this.SenderData.detailedArea,
							recManPrintAddr: this.collecterData.area + this.collecterData.detailedArea,
							...this.FormData,
						},
						"userId": getUserId()
					}
					addKuaidi100CorderApi(query).then(res => {
						console.log(res)
						console.log(query)
						uni.navigateBack()
					}).catch(err => {
						console.log(err)
					})
					// this.tui.toast('校验通过！')
				}).catch(errors => {
					console.log(errors)
				})
			}
		},
		onLoad(options) {
			this.FormData.kuaidicom = JSON.parse(options.excomp).key
			this.kuaidicom = {
				text: JSON.parse(options.excomp).name,
				value: JSON.parse(options.excomp).key,
			};
			this.transformExPData()
			// getKuaidi100PriceApi({  // 价格查询
			// 	"kuaidicom": "shunfeng",
			// 	"recManPrintAddr": "广东省深圳市",
			// 	"sendManPrintAddr": "广东省深圳市",
			// 	"serviceType": "顺丰标快",
			// 	"weight": "1"
			// }).then(res => {
			// 				console.log(res)
			// 			})
		},
		// 每次页面重新出现时加载用户地址数据
		onShow() {
			let that = this
			uni.getStorage({
				key: 'UserExpressInfoSend',
				success: function (res) {
					that.SenderData = res.data
					// console.log(this.SenderData);
				}
			});
			uni.getStorage({
				key: 'UserExpressInfoCollect',
				success: function (res) {
					that.collecterData = res.data
					// console.log(res.data);
				}
			});
		}
	}
</script>

<style lang="scss" scoped>
	.SettleAccountfooter {
		box-sizing: border-box;
		position: fixed;
		bottom: 0rpx;
		left: 0rpx;
		width: 100vw;
		height: 156rpx;
		background-color: #fff;
		font-size: 38rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 10rpx 25rpx;
		.money {
			color: #ff8812;
		}
	}
	.moreSlectItem:active {
		background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);
	}
	.moreSlect {
		border-radius: 15rpx;
		margin-top: 20rpx;
		background-color: #fff;
	}
	.goodsType {
		border-radius: 15rpx;
		margin-top: 20rpx;
		background-color: #fff;
	}
	.goodsType:active {
		background: none;
	}
	.ExpressDeliveryView {
		box-sizing: border-box;
		width: 100vw;
		min-height: 100vh;
		padding-bottom: 156rpx;
		background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);
		.ExpressDeliveryContainer {
			box-sizing: border-box;
			padding: 30rpx;
			width: 100%;
			.informationFrom {
				margin-top: 10rpx;
				width: 100%;
				box-sizing: border-box;
				padding: 0rpx 18rpx 0rpx 18rpx;
				background-color: #fff;
				border-radius: 15rpx;
				.fromItem {
					// width: 712rpx;
					// height: 145rpx;
					display: flex;
					align-items: center;
			
					.sender {
						margin-top: -30rpx;
						background-color: #afbbc2;
						color: #fff;
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
						text-align: center;
						line-height: 60rpx;
					}
			
					.consignee {
						background-color: #0083ff;
					}
			
					.senderInformation {
						flex: 1;
						padding: 30rpx 0rpx;
						border-bottom: 1px dashed #afbbc2;
						margin-left: 20rpx;
			
						.DetailedAddress {
							margin-left: 10rpx;
							font-size: 26rpx;
						}
			
						>p:nth-of-type(1) {
							width: 100%;
							display: flex;
							justify-content: space-between;
							font-weight: 600;
			
							>span:nth-of-type(1) {
								max-width: 500rpx;
								max-height: 85rpx;
								overflow: hidden;
								text-overflow: ellipsis;
								font-size: 34rpx;
							}
			
							>span:nth-of-type(2) {
								margin-top: 5rpx;
								font-weight: normal;
								font-size: 26rpx;
							}
						}
			
						>p:nth-of-type(2) {
							margin-top: 12rpx;
							font-size: 26rpx;
							color: #b3b5ba;
						}
			
						.isNone {
							color: #d75b62 !important;
						}
					}
				}
			}
		}
	}
	.NavHeader {
		height: 88rpx;
	}
</style>