<template>
	<view class="user-pool-container">
		<view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="用户池"></JHeader>
		</view>
		<view class="user-pool">

			<view v-if="userPoolList && userPoolList.length">
				<view v-for="(item, index) in userPoolList" :key="item.id" class="" style="padding: 20upx 30upx;">
					<view style="display: flex;align-items: center;padding: 20upx 30upx;background-color: #fff;">
						<JAvatar
							:src="item.avatar" size="92" radius="50%"
							border="5upx solid #ffffff"
						></JAvatar>
						<view style="padding-left: 40upx;">
							<view>粉丝ID：{{ item.id }}</view>
							<view>名称：{{ item.nickName || '--' }}</view>
							<view>性别：{{ item.gender === 1 ? '男' : item.gender === 2 ? '女' : '--' }}</view>
							<view>会员类型：{{ common.explainMembership(item.roleIds) }}</view>
						</view>
					</view>
				</view>
			</view>
			<view v-else>
				<tui-no-data>暂无数据</tui-no-data>
			</view>

		</view>
	</view>
</template>

<script>
import { getBrandUserFansListApi } from '../../api/user'
import { getUserId, getBrandId } from '../../utils'

export default {
	name: 'UserPool',
	components: {},
	data() {
		return {
			userPoolList: []
		}
	},
	onLoad() {
		this.getUserPoolList()
	},
	mounted() {
	},
	methods: {
		getUserPoolList() {
			uni.showLoading({
				title: '加载中'
			})
			getBrandUserFansListApi({ userId: getUserId() })
				.then(({ data }) => {
					console.log(data)
					this.userPoolList = data
					uni.hideLoading()
				})
		}
	},
	onPageScroll(e) { },
	onReachBottom() { }
}
</script>

<style lang="less" scoped>
.user-pool-container {
	min-height: 100vh;
	width: 100%;
	background: #f6f6f6;

}
</style>
