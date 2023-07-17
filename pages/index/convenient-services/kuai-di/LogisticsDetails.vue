<template>
	<view class="logisticsView">
		<NavHeader>
			<template v-slot:body>
				<view class="defaultBody">
					物流详情
				</view>
			</template>
		</NavHeader>
		<view class="LogisticsDetails_flow">
			<view class="flowItem">
				<view class="statusNode" :class="{img_Success:true}">
					<image v-if="true" src="./image/successful.png" mode=""></image>
				</view>
				<p>【苏州转运中心】 已发出 下一站 【无锡转运中心公司】</p>
				<p>2021-12-15 20:15:14</p>
			</view>
			<view class="flowItem">
				<view class="statusNode">
					
				</view>
				<p>【苏州转运中心】 已发出 下一站 【无锡转运中心公司】</p>
				<p>2021-12-15 20:15:14</p>
			</view>
			<view class="flowItem">
				<view class="statusNode">
					
				</view>
				<p>【苏州转运中心】 已发出 下一站 【无锡转运中心公司】</p>
				<p>2021-12-15 20:15:14</p>
			</view>
			<view class="flowItem">
				<view class="statusNode">
					
				</view>
				<p>【苏州转运中心】 已发出 下一站 【无锡转运中心公司】</p>
				<p>2021-12-15 20:15:14</p>
			</view>
		</view>
		<view class="footer">
			<tui-button width="153rpx" height="64rpx" class="ExpressInfoBtn" plain>物流服务</tui-button>
			<tui-button width="153rpx" height="64rpx" class="ExpressInfoBtn" plain>延长收货</tui-button>
			<tui-button width="153rpx" height="64rpx" class="ExpressInfoBtn" type="primary">确认收货</tui-button>
		</view>
	</view>
</template>

<script>
	import NavHeader from "./components/header.vue";
	import tuiButton from "@/components/thorui/tui-button/tui-button.vue"
	import { getKuaiDiRecordMsg } from '@/api/convenient-services';
	export default {
		components: {
			NavHeader,
			tuiButton
		},
		data() {
			return {
				myExpressData: [],
				queryList: {
					page: 1,
					size: 10,
					type: 1001,
					recordId: 2
				},
				Exstatus: [
				    {
				        "time": "2021-12-15 20:15:14",
				        "context": "【苏州转运中心】 已发出 下一站 【无锡转运中心公司】",
				        "ftime": "2021-12-15 20:15:14",
				        "areaCode": "CN320500000000",
				        "areaName": "江苏,苏州市",
				        "status": "干线",
				        "location": "",
				        "areaCenter": "120.585315,31.298886",
				        "areaPinYin": "su zhou shi",
				        "statusCode": "1002"
				    },
				    {
				        "time": "2021-12-15 20:11:25",
				        "context": "【苏州转运中心公司】 已收入",
				        "ftime": "2021-12-15 20:11:25",
				        "areaCode": "CN320500000000",
				        "areaName": "江苏,苏州市",
				        "status": "干线",
				        "location": "",
				        "areaCenter": "120.585315,31.298886",
				        "areaPinYin": "su zhou shi",
				        "statusCode": "1002"
				    },
				    {
				        "time": "2021-12-15 19:18:27",
				        "context": "【江苏省无锡市锡新开发区公司】 已收入",
				        "ftime": "2021-12-15 19:18:27",
				        "areaCode": "CN320200000000",
				        "areaName": "江苏,无锡市",
				        "status": "在途",
				        "location": "",
				        "areaCenter": "120.31191,31.491169",
				        "areaPinYin": "wu xi shi",
				        "statusCode": "0"
				    },
				    {
				        "time": "2021-12-15 17:10:09",
				        "context": "【江苏省苏州市北桥公司】 已揽收",
				        "ftime": "2021-12-15 17:10:09",
				        "areaCode": "CN320507004000",
				        "areaName": "江苏,苏州市,相城区,北桥",
				        "status": "揽收",
				        "location": "",
				        "areaCenter": "120.606531,31.505825",
				        "areaPinYin": "bei qiao jie dao",
				        "statusCode": "1"
				    }
				]
			};
		},
		created() {
			this.getDataList()
		},
		methods: {
			getDataList() {
				getKuaiDiRecordMsg(this.queryList).then(res => {
					this.myExpressData = JSON.parse(JSON.stringify(res))
					res.records.forEach((item,index) => {
						let ResIndex = index
						this.myExpressData.records[index] = { ...item, req:JSON.parse(item.req), resp:JSON.parse(item.resp) }
					})
					console.log(this.myExpressData)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.logisticsView {
	box-sizing: border-box;
	width: 100vw;
	height: auto;
	padding-top: 88rpx;
	padding-bottom: 102rpx;
}
.defaultBody {
		position: absolute;
		left: 50%;
		transform:translateX(-50%);
		font-size: 34rpx;
		color: white;
		font-weight: 550;
	}
	
.LogisticsDetails_flow {
	width: 100vw;
	height: auto;
	box-sizing: border-box;
	padding: 30rpx 32rpx;
	.flowItem {
		position: relative;
		border-left: 1px solid #9e9e9e;
		box-sizing: border-box;
		padding-left: 45rpx;
		padding-bottom: 45rpx;
		font-size: 35rpx;
		color: #9e9e9e;
		> p:nth-of-type(2) {
			margin-top: 10rpx;
			font-size: 25rpx;
		}
		.statusNode {
			position: absolute;
			top: 0;
			left: -12rpx;
			width: 20rpx;
			height: 20rpx;
			border-radius: 50%;
			background-color: #9e9e9e;
		}
		.img_Success {
			top: 0;
			left: -20rpx;
			width: 40rpx;
			height: 40rpx;
			background-color: #fff;
			display: flex;
			align-items: center;
			justify-content: center;
			> image {
				width: 35rpx;
				height: 35rpx;
			}
		}
	}
}

.footer {
	box-sizing: border-box;
	padding: 0rpx 24rpx;
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100vw;
	height: 102rpx;
	display: flex;
	align-items: center;
	justify-content: flex-end;
	border-top: 1rpx solid #9e9e9ea7;
	.ExpressInfoBtn {
		margin-left: 20rpx !important;
	}
}
</style>
