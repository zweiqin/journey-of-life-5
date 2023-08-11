<template>
	<view class="jurisdictionDetail">
		<view v-for="item in jurisdictionName" :key="item.value">
			<view v-if="item.type == type" class="entirety">
				<view class="name">{{ item.label }}</view>
				<view class="right">
					<view v-if="item.type == 0" class="money">￥{{ item.money }}</view>
					<image
						src="../../../static/images/icon/more.png"
						mode="scaleToFill" class="rightImg"
					/>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { jurisdictionName } from './config.js'
export default {
	name: 'JurisdictionDetail',
	props: {
		type: [String, Number]
	},
	data() {
		return { jurisdictionName }
	}
}
</script>

<style lang="less" scoped>
.jurisdictionDetail {
	border: 1px solid #d8d8d8;
	border-radius: 20upx;

	.entirety {
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid #d8d8d8;
		margin: 20upx 56upx;
		padding: 20upx 0;
	}

	.name {
		font-size: 26upx;
	}

	.right {
		align-items: center;
		display: flex;

		.money {
			margin-right: 30upx;
			color: #fa5151;
			font-size: 26upx;
		}

		.rightImg {
			width: 32upx;
			height: 32upx;
		}
	}
}
</style>
