<template>
	<view class="complainContainer">
		<view class="head">
			<image src="./image/fanhui.png" mode="" @click="handleBack" />
			<span>投诉记录</span>
		</view>
		<view v-if="isDataNone" class="noneData">
			<image src="./image/noData.png" mode=""></image>
			<text>暂时没有投诉记录哦...</text>
		</view>
		<view v-else class="complaintList">
			<view v-for="(item, index) in ComplainList" :key="item" class="complaintItem">
				<image class="backUrl" :src="isSuucess(item.finalHandleStatus)" mode=""></image>
				<p class="brandName">店家名字：{{ item.brandName }}</p>
				<view class="CommodityInfo">
					<image :src="common.seamingImgUrl(item.informAnnex)" mode=""></image>
					<!-- <view class="statusImg">
						<image src="./image/loading.png" mode=""></image>
						</view> -->
					<span>
						{{ item.finalHandleStatus == 0 ? '处理中，我们会尽快给予您答复'
							: item.finalHandleStatus == 1 ? '已处理，审核通过' : '抱歉，投诉的证据以及原因未满足条件' }}
					</span>
					<!-- <view class="infoText">
						<span>超级好吃的手工面</span>
						</view> -->
				</view>
				<view class="textItem">
					<span class="TIone">投诉原因：</span><span class="TItwo">{{ item.type == 1 ? '商品质量问题' : '代金券问题' }}</span>
				</view>
				<view class="textItem">
					<span class="TIone">投诉内容：</span><span class="TItwo">{{ item.informContent }}</span>
				</view>
				<view class="textItem">
					<span class="TIone">投诉时间：</span><span class="TItwo">{{ item.addTime }}</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getComplainList } from '@/api/user'
export default {
	data() {
		return {
			isDataNone: false,
			ComplainList: null
		}
	},
	created() {
		getComplainList().then((res) => {
			this.ComplainList = res.data
			if (!res.data || res.data.length <= 0) {
				this.isDataNone = true
			}
		})
	},
	methods: {
		handleBack() {
			uni.navigateBack()
		},
		isSuucess(status) {
			return status == 0 ? require('./image/loading.png') : status == 1 ? require('./image/succes.png') : require('./image/danger.png')
		}
	}
}
</script>

<style lang="scss" scoped>
	.complainContainer {
		width: 750rpx;
		height: 100vh;

		.head {
			/* background-color: rgb(237, 45, 45); */
			display: flex;
			align-items: center;
			width: 100vw;
			padding: 17px 10px;
			box-sizing: border-box;

			>image {
				// border-radius: 50%;
				width: 32px;
				height: 32px;
				// background-color: rgba(124, 127, 127, 0.562);
			}

			>span {
				/* color: white; */
				margin-left: 220rpx;
				font-weight: 550;
				font-size: 40rpx;
			}
		}
		.noneData {
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			font-size: 40rpx;
			font-weight: 600;
		}
		.complaintList {
			width: 100vw;
			height: auto;
			overflow: hidden;
			background-color: #f9fafc;
			.complaintItem {
				width: 750rpx;
				height: 435rpx;
				background-color: white;
				box-sizing: border-box;
				padding: 35rpx 16rpx 25rpx 30rpx;
				margin: 25rpx 0rpx;
				position: relative;
				.backUrl {
					width: 250rpx;
					height: 220rpx;
					position: absolute;
					bottom: 20rpx;
					right: 10rpx;
				}
				.brandName {
					font-size: 32rpx;
					color: #404040;
					font-weight: 550;
					letter-spacing: 2rpx;
				}
				.CommodityInfo {
					width: 100%;
					margin-top: 25rpx;
					margin-bottom: 15rpx;
					display: flex;
					align-items: center;
					justify-content: space-between;
					> image {
						width: 110rpx;
						height: 110rpx;
					}
					// .statusImg {
					// 	width: 536rpx;
					// 	height: 110rpx;
					// }
					> span {
						// display: inline-block;
						overflow: hidden;
						max-height: 110rpx;
						font-size: 30rpx;
						font-weight: 550;
						width: 536rpx;
						height: 110rpx;
						text-overflow: ellipsis;
					}
				}
				.textItem {
					display: flex;
					box-sizing: border-box;
					padding-right: 20rpx;
					justify-content: space-between;
					margin-top: 25rpx;
					width: 100%;
					.TIone {
						font-size: 30rpx;
						font-weight: 550;
						color: #6e6e6e;
						text-align-last: justify
					}
					.TItwo {
						max-width: 530rpx;
						flex: 1;
						font-size: 26rpx;
						line-height: 40rpx;
					}
				}
			}
		}
	}
</style>
