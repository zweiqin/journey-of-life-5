<template>
	<view class="user-info-wrapper">
		<view class="default-info">
			<BeeAvatar
				:size="80"
				:src="userInfo.userId ? common.seamingImgUrl(userInfo.avatarUrl) : require('../../../static/user-center/default-avatar.png')"
				@click="go(userInfo.userId ? '/user/info/detail' : '/pages/login/login')"
			>
			</BeeAvatar>
			<view v-if="!userInfo.userId" class="name" @click="go('/pages/login/login')">
				登录/注册
			</view>

			<view v-else class="user-login-info" @click="go('/user/info/detail')">
				<view class="username">
					{{ userInfo.nickName }}
					<view class="countType">
						{{ common.explainMembership(userInfo.roleIds) || '--' }}
					</view>
				</view>
				<view class="bee-id">No.<span>{{ userInfo.userId }}</span></view>
			</view>
		</view>

		<view class="total">
			<view class="totalHeader">
				<span>我的钱包</span>
			</view>
			<view v-if="isLogin()" class="totalItemBox">
				<view class="item" @click="go('/user/otherServe/withdrawal/index?type=0')">
					<p>{{ userInfo.account && userInfo.account > 0 ? userInfo.account : "0.00" }}</p>
					<view style="margin-top: 15rpx;font-size: 26rpx;color: #979797;">账户余额 ></view>
					<!-- <view style="font-size: 24upx;color: #999999;">去提现 ></view> -->
				</view>
				<view
					class="item"
					@click="(userInfo.roleIds !== 11) && (userInfo.roleIds !== 10) && go('/user/otherServe/voucher/index')"
				>
					<p>{{ userInfo.voucherNumber ? transformNumber(userInfo.voucherNumber) : '0.00' }}</p>
					<view style="margin-top: 15rpx;font-size: 26rpx;color: #979797;">代金券 ></view>
				</view>
				<view class="item" @click="go('/user/otherServe/withdrawal/index?type=1')">
					<p>{{ userInfo.commission || '0.00' }}</p>
					<view style="margin-top: 15rpx;font-size: 26rpx;color: #979797;">收入佣金 ></view>
					<!-- <view style="font-size: 24upx;color: #999999;">去提现 ></view> -->
				</view>
			</view>
		</view>
		<!-- <view class="total">
			<view class="item">
			<view class="value">{{ common.explainMembership(userInfo.roleIds) || '--' }}</view>
			<view class="title">会员类型</view>
			</view>
			<view class="item" @click="go('/user/otherServe/voucher/index')">
			<view class="value">{{ userInfo.voucherNumber ? transformNumber(userInfo.voucherNumber) : '0.00' }}
			</view>
			<view class="title">代金券</view>
			</view>
			<view class="item" @click="go('/user/otherServe/withdrawal/index?type=1')">
			<view class="value">{{ userInfo.commission || '0.00' }}</view>
			<view class="title">收入佣金</view>
			<view style="font-size: 24upx;color: #999999;">去提现 ></view>
			</view>
			</view> -->
	</view>
</template>

<script>
import {
	J_USER_INFO
} from '../../../constant'
import {
	transformNumber
} from '../../../utils'
export default {
	data() {
		return {
			userInfo: {}
		}
	},
	methods: {
		transformNumber,
		setUserInfo() {
			this.userInfo = uni.getStorageSync(J_USER_INFO) || {}
		}
	}
}
</script>

<style lang="less" scoped>
.user-info-wrapper {
	.default-info {
		display: flex;
		align-items: center;

		.name {
			margin-left: 22upx;
			color: #000;
			font-size: 34upx;
			font-weight: 500;
		}

		.user-login-info {
			margin-left: 20upx;

			.username {
				display: flex;
				font-weight: 600;
				font-size: 34upx;
				margin-bottom: 20upx;

				.countType {
					padding: 0rpx 18rpx;
					margin-left: 10rpx;
					height: 50rpx;
					border-radius: 15rpx;
					background-color: #FFE7C1;
					;
					font-size: 26rpx;
					font-weight: 900;
					line-height: 50rpx;
					letter-spacing: 0px;
					color: #FF7D56;
				}
			}

			.bee-id {
				font-weight: 600;
				font-size: 28upx;
				line-height: 51rpx;
				letter-spacing: 0rpx;
				color: #3d3d3d;

				>span {
					margin-left: 6rpx;
					font-weight: 500;
					color: #FA5151;
				}
			}
		}
	}

	.total {
		box-sizing: border-box;
		padding: 21rpx 25rpx 40rpx 25rpx;
		margin-top: 33rpx;
		width: 100%;
		height: 225rpx;
		border-radius: 20rpx;
		background: #FFFFFF;

		.totalHeader {
			display: flex;
			justify-content: space-between;

			span {
				font-size: 28rpx;
				font-weight: bold;
				line-height: 51rpx;
				color: #3D3D3D;
			}
		}

		.totalItemBox {
			padding: 0 70rpx;
			display: flex;
			justify-content: space-between;

			.item {
				display: flex;
				flex-direction: column;
				align-items: center;
				text-align: center;

				>p:nth-of-type(1) {
					margin-top: 18rpx;
					font-weight: 900;
					font-size: 36rpx;
				}
			}
		}
	}

	// .total {
	// 	padding: 0 34upx;
	// 	display: flex;
	// 	align-items: center;
	// 	justify-content: space-between;
	// 	margin: 34upx 0 48upx;

	// 	.item {
	// 		display: flex;
	// 		align-items: center;
	// 		justify-content: center;
	// 		flex-direction: column;

	// 		.value {
	// 			color: #000;
	// 			font-size: 28upx;
	// 			font-weight: bold;
	// 		}

	// 		.title {
	// 			color: #777777;
	// 			margin-top: 6upx;
	// 		}
	// 	}
	// }
}
</style>
