<template>
	<tui-index-list :list-data="customerServiceInfo">
		<template #item="{ entity, index }">
			<tui-list-cell
				v-for="(item, subi) in entity" :key="subi" padding="16rpx 30rpx"
				@click="itemClick(index, subi, item)"
			>
				<view class="tui-list__item">
					<image class="tui-avatar" :src="common.seamingImgUrl(item.avatar)"></image>
					<view class="tui-name">{{ `客服${subi + 1}号【${item.displayName}】` }}</view>
				</view>
			</tui-list-cell>
		</template>
		<template #footer>
			<view v-if="customerServiceInfo[0].data.length > 0" class="tui-footer__total">
				{{ customerServiceInfo[0].data.length }}位客服
			</view>
		</template>
	</tui-index-list>
</template>

<script>
import {
	mapGetters
} from 'vuex'
import {
	J_USER_INFO
} from '../../../../../constant'
export default {
	components: {},
	data() {
		return {}
	},
	computed: {
		...mapGetters([ 'customerServiceInfo' ])
	},
	methods: {
		itemClick(index, subi, item) {
			// console.log(index, subi, item)
			// console.log(J_USER_INFO,uni.getStorageSync(J_USER_INFO))
			this.$store.dispatch('customerService/createChat', {
				// chatName: `${item.displayName}与${uni.getStorageSync(J_USER_INFO).nickName}的聊天`,
				// chatName: `客服与${uni.getStorageSync(J_USER_INFO).nickName}的聊天`,
				chatName: item.displayName,
				friendId: item.friendId,
				friendUserType: 'ADMIN',
				avatar: item.avatar
			})
		}
	}
}
</script>

<style lang="less" scoped>
	.tui-list__item {
		width: 100%;
		display: flex;
		align-items: center;
	}

	.tui-avatar {
		width: 34px;
		height: 34px;
		border-radius: 4px;
		flex-shrink: 0;
		background-color: #ccc;
	}

	.tui-name {
		width: 90%;
		font-size: 16px;
		padding-left: 10px;
		padding-right: 20px;
		box-sizing: border-box;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.tui-footer__total {
		width: 100%;
		height: 45px;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999;
		font-size: 15px;
	}

	/deep/ .tui-index__letter {
		display: none;
	}
</style>
