<template>
	<view class="QueryExpressView">
		<view class="QueryExpContainer">
			<view class="QueryExpfrom">
				<view class="FromSelect">
					<view v-for="(item,index) in fromItem" class="selectItem" :class="{isSelect: index == currIndex }" @click="checkFrom(index)">
						{{ item }}
					</view>
				</view>
				<view class="informationFrom">
					<view class="fromItem">
						<view class="sender">
							寄
						</view>
						<view class="senderInformation">
							<p><span>广州省广州市 <span class="DetailedAddress">花都区翻斗花园一单元一号大耳朵图图</span> </span><span>地址簿</span></p>
							<p class="isNone"><span>{{false?'丁凯':'完善寄件人信息'}}</span><span v-if="false" style="margin-left: 10rpx;">132****0927</span></p>
						</view>
					</view>
					<view class="fromItem">
						<view class="sender consignee">
							收
						</view>
						<view class="senderInformation">
							<p><span>广州省广州市</span><span>地址簿</span></p>
							<p><span>{{true?'丁凯':'完善寄件人信息'}}</span><span v-if="true" style="margin-left: 10rpx;">132****0927</span></p>
						</view>
					</view>
					<view class="CargoInformation">
						<span>物品：{{'日用品/1公斤'}} ></span>
						<span>上门：{{'今天09:00-13:00'}} ></span>
					</view>
				</view>
			</view>
		</view>
		<view style="box-sizing: border-box; padding: 0rpx 18rpx;">
			<scroll-view class="ExpressSelection" scroll-x="true" >
				<view class="SelectionItem itemSelect">
					<view class="icfonts">
						<image src="../image/yuantongyuanxing.png" mode=""></image> <span>圆通</span>
					</view>
					<view class="NewMoney">
						<span>5.5</span>元起
					</view>
					<view class="OldMoney">
						市场价:<span>10</span> 元
					</view>
					<view class="radio isselectRadio">
						√
					</view>
				</view>
				<view class="SelectionItem">
					<view class="icfonts">
						<image src="../image/yuantongyuanxing.png" mode=""></image> <span>圆通</span>
					</view>
					<view class="NewMoney">
						<span>5.5</span>元起
					</view>
					<view class="OldMoney">
						市场价:<span>10</span> 元
					</view>
					<view class="radio">
						√
					</view>
				</view>
			</scroll-view>
			<view class="orderSubmit">
				<button>去寄件</button>
				<view>
					<span>丢件必赔</span> <span>比价下单</span> <span>上门取件</span>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				fromItem: ["寄快件","批量寄件","寄大件","国际港澳台"],
				currIndex: 0,
			};
		},
		methods: {
			checkFrom(index) {
				this.currIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
.QueryExpContainer {
	width: 100vw;
	height: 205rpx;
	background-color: #327ee4;
	display: flex;
	justify-content: center;
	.QueryExpfrom {
		margin-top: 10rpx;
		width: 712rpx;
		height: 500rpx;
		border-radius: 15rpx;
		background-color: white;
		.FromSelect {
			width: 100%;
			height: 70rpx;
			border-radius: 15rpx;
			background-color: #e8f4fd;
			display: flex;
			align-items: flex-end;
			.isSelect {
				font-weight: 600;
				height: 80rpx !important;
				background-color: white;
				border-top-right-radius: 15rpx;
				border-top-left-radius: 15rpx;
			}
			.selectItem {
				font-size: 32rpx;
				display: flex;
				align-items: center;
				justify-content: center;
				transition: height 0.3s ease;
				height: 70rpx;
				flex: 1;
			}
		}
		.informationFrom {
			margin-top: 10rpx;
			width: 100%;
			box-sizing: border-box;
			padding: 0rpx 18rpx 35rpx 18rpx;
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
					> p:nth-of-type(1) {
						width: 100%;
						display: flex;
						justify-content: space-between;
						font-weight: 600;
						> span:nth-of-type(1) {
							max-width: 500rpx;
							max-height: 85rpx;
							overflow: hidden;
							text-overflow: ellipsis;
							font-size: 34rpx;
						}
						> span:nth-of-type(2) {
							margin-top: 5rpx;
							font-weight: normal;
							font-size: 26rpx;
						}
					}
					> p:nth-of-type(2) {
						margin-top: 12rpx;
						font-size: 26rpx;
						color: #b3b5ba;
					}
					.isNone {
						color: #d75b62 !important;
					}
				}
			}
			.CargoInformation {
				display: flex;
				align-items: center;
				justify-content: space-around;
				height: 80rpx;
				font-size: 26rpx;
				color: #afbbc2;
			}
		}
	}
}
.ExpressSelection {
	display: flex;
	display: inline-block;
	white-space: nowrap;
	margin-top: 330rpx;
	.itemSelect {
		border: 5rpx solid #0083ff;
	}
	.SelectionItem {
		display: inline-flex;
		flex-direction: column;
		align-items: center;
		width: 176rpx;
		height: 252rpx;
		margin-right: 20px;
		border-radius: 15rpx;
		background-color: white;
		.icfonts {
			margin-top: 16rpx;
			display: flex;
			align-items: center;
			> image{
				width: 50rpx;
				height: 50rpx;
			}
			> span {
				margin-left: 10rpx;
				font-size: 24rpx;
			}
		}
		.NewMoney {
			margin-top: 16rpx;
			font-size: 24rpx;
			letter-spacing: 2rpx;
			> span {
				letter-spacing: 1rpx;
				margin-right: 5rpx;
				font-size: 50rpx;
				color: #ff651a;
			}
		}
		.OldMoney {
			margin-top: 12rpx;
			font-size: 20rpx;
			color: #868e92;
			> span {
				margin: 0 5rpx;
				text-decoration: line-through;
			}
		}
		.radio {
			margin-top: 15rpx;
			width: 40rpx;
			height: 40rpx;
			font-size: 35rpx;
			text-align: center;
			line-height: 40rpx;
			border-radius: 50%;
			color: #fff;
			border: 1px solid #868e92;
		}
		.isselectRadio {
			background-color: #0083ff;
			border: 1px solid #0083ff;
		}
	}
}
.orderSubmit {
	border-radius: 15rpx;
	margin-top: 28rpx;
	width: 712rpx;
	height: 200rpx;
	background-color: #fff;
	display: flex;
	flex-direction: column;
	align-items: center;
	> button {
		margin-top: 30rpx;
		width: 664rpx;
		font-size: 40rpx;
		height: 88rpx;
		line-height: 88rpx;
		color: #fff;
		border-radius: 50rpx;
		background-color: #0173f3;
	}
	> view {
		margin-top: 15rpx;
		width: 470rpx;
		font-size: 30rpx;
		display: flex;
		justify-content: space-around;
		color: #868e92;
	}
}
</style>
