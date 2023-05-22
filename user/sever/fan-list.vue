<template>
	<view class="fan-list-container">
		<view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="粉丝列表"></JHeader>
		</view>
		<view class="fan-list">

			<view v-for="(item, index) in fanList" :key="item.id" class="" style="padding: 20upx 30upx;">
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
	</view>
</template>

<script>
import { getBrandUserFansListApi } from '../../api/user'
import { getUserId, getBrandId } from '../../utils'

export default {
	name: 'FanList',
	components: {},
	data() {
		return {
			fanList: []
		}
	},
	onLoad() {
		this.getFanList()
	},
	mounted() {
	},
	methods: {
		getFanList() {
			uni.showLoading({
				title: '加载中'
			})
			getBrandUserFansListApi({ userId: getUserId() })
				.then(({ data }) => {
					console.log(data)
					this.fanList = data
					uni.hideLoading()
				})
		}
	},
	onPageScroll(e) { },
	onReachBottom() { }
}
</script>

<style lang="less" scoped>
.fan-list-container {
	min-height: 100vh;
	width: 100%;
	background: #f6f6f6;

}
</style>
