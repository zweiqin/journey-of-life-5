<template>
	<view class="user-info-wrapper">
		<view class="default-info">
			<BeeAvatar
				:size="80" :src="userInfo.userId ? getBeeUrl(userInfo.avatarUrl) : require('../../../static/user-center/default-avatar.png')"
				@click="go(userInfo.userId ? '/user/info/detail' : '/pages/login/login')"
			>
			</BeeAvatar>
			<view v-if="!userInfo.userId" class="name" @click="go('/pages/login/login')">
				登录/注册
			</view>

			<view v-else class="user-login-info" @click="go('/user/info/detail')">
				<view class="username">{{ userInfo.nickName }}</view>
				<view class="bee-id">巨蜂id: {{ userInfo.userId }}</view>
			</view>
		</view>

		<view class="total">
			<view class="item">
				<view class="value">{{ common.explainMembership(userInfo.roleIds) || '--' }}</view>
				<view class="title">会员类型</view>
			</view>
			<view class="item">

				<view class="value">{{ userInfo.voucherNumber ? transformNumber(userInfo.voucherNumber) : '0.00' }}</view>
				<view class="title">代金券</view>
			</view>
			<view class="item">
				<view class="value">{{ userInfo.commission || '0.00' }}</view>
				<view class="title">收入佣金</view>
			</view>
		</view>
	</view>
</template>

<script>
import { J_USER_INFO } from '../../../constant'
import { transformNumber } from '../../../utils'
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
				font-weight: 500;
				font-size: 34upx;
				margin-bottom: 20upx;
			}

			.bee-id {
				font-size: 28upx;
				color: #3d3d3d;
				font-weight: 500;
			}
		}
	}

	.total {
		padding: 0 34upx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		margin: 34upx 0 48upx;

		.item {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;

			.value {
				color: #000;
				font-size: 28upx;
				font-weight: bold;
			}

			.title {
				color: #777777;
				margin-top: 6upx;
			}
		}
	}
}
</style>
