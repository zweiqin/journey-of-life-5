<template>
	<view class="activity-detail-container">
		<JBack></JBack>

		<view class="activity-detail-item">
			<view class="name">盈信广场美食狂欢日</view>
			<view class="address">地点：佛山顺德区盈信广场</view>
			<view class="time">时间：2022-08-07至2022-08-10</view>
			<image class="qrcode" :src="common.seamingImgUrl('1u2ga5bnejyyt5mnb6mq.png')" mode="" />
			<view class="tip">报名成功，凭二维码参加</view>
		</view>

		<view class="activity-detail-item attention">
			<view class="title">活动注意事项</view>
			<view class="content">
				Lorem ipsum dolor sit amet, consectetur adipisicing elit. A nesciunt
				inventore id, ut nobis, dolorum amet odit consequuntur quia
				reprehenderit perferendis unde quibusdam tempora quae, suscipit optio
				impedit quos! Quibusdam!Lorem ipsum dolor sit amet, consectetur
				adipisicing elit. A nesciunt inventore id, ut nobis, dolorum amet odit
				consequuntur quia reprehenderit perferendis unde quibusdam tempora quae,
				suscipit optio impedit quos! Quibusdam!Lorem ipsum dolor sit amet,
				consectetur adipisicing elit. A nesciunt inventore id, ut nobis, dolorum
				amet odit consequuntur quia reprehenderit perferendis unde quibusdam
				tempora quae, suscipit optio impedit quos! Quibusdam!Lorem ipsum dolor
				sit amet, consectetur adipisicing elit. A nesciunt inventore id, ut
				nobis, dolorum amet odit consequuntur quia reprehenderit perferendis
				unde quibusdam tempora quae, suscipit optio impedit quos!
				Quibusdam!Lorem ipsum dolor sit amet, consectetur adipisicing elit. A
				nesciunt inventore id, ut nobis, dolorum amet odit consequuntur quia
				reprehenderit perferendis unde quibusdam tempora quae, suscipit optio
				impedit quos! Quibusdam!Lorem ipsum dolor sit amet, consectetur
				adipisicing elit. A nesciunt inventore id, ut nobis, dolorum amet odit
				consequuntur quia reprehenderit perferendis unde quibusdam tempora quae,
				suscipit optio impedit quos! Quibusdam!
			</view>
		</view>
	</view>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
@import "../style/mixin.less";

.activity-detail-container {
	background: linear-gradient(180deg, #07b9b9 37%, #e0f6f6);
	box-sizing: border-box;
	padding: 50upx 16upx;
	min-height: 100vh;

	.activity-detail-item {
		width: 720upx;
		margin: 30upx auto;
		padding: 82upx 0;
		background-color: #fff;
		border-radius: 20upx;
		text-align: center;

		&.attention {
			padding: 44upx 30upx;
			box-sizing: border-box;

			.content {
				margin: 20upx;
				font-size: 24upx;
				line-height: 1.5;
			}
		}

		.name {
			color: #3d3d3d;
			font-size: 36upx;
		}

		.address {
			color: #fa5151;
			font-size: 24upx;
			.margin(22upx, 22upx);
		}

		.time {
			color: #00b578;
			font-size: 24upx;
		}

		.qrcode {
			width: 300upx;
			height: 300upx;
			.margin(36upx, 34upx);
		}

		.tip {
			color: #3d3d3d;
			font-size: 24upx;
			margin-bottom: 152upx;
		}
	}
}
</style>
