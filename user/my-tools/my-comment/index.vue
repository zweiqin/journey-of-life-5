<template>
	<view class="comment-list-container">
		<view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="我的评价"></JHeader>
		</view>
		<view style="margin: 20upx 0;background-color: #fff;">

			<view v-if="commentList && commentList.length" style="padding: 20upx;">
				<view
					v-for="(item, index) in commentList" :key="index"
					style="margin-bottom: 28upx;padding-bottom: 10upx;border-bottom: 1px solid #dddddd;"
				>
					<view v-if="item.type === 0">
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view>{{ item.star }}星评价</view>
							<view style="font-size: 24upx;color: #999999;">{{ item.addTime.substring(0, 10) }}</view>
						</view>
						<view v-if="item.picUrls && item.picUrls.length && JSON.parse(item.picUrls).length" style="width: 100%;">
							<view style="width: 100%;overflow-x: auto;">
								<tui-image-group
									:image-list="JSON.parse(item.picUrls).map(i => ({ src: common.seamingImgUrl(i) }))" mode="aspectFit" is-group
									distance="50" width="240rpx" height="240rpx" fade-show
									radius="10upx"
								></tui-image-group>
							</view>
						</view>
						<view style="padding: 10upx 20upx 0;font-size: 28upx;">{{ item.content }}</view>
					</view>
				</view>
			</view>
			<view v-else>
				<tui-no-data>暂无数据</tui-no-data>
			</view>

		</view>
		<LoadMore v-show="commentList.length" :status="status"></LoadMore>
	</view>
</template>

<script>
import { getUserCommentApi } from '../../../api/order'
import { getUserId } from '../../../utils'

export default {
	name: 'MyComment',
	components: {},
	data() {
		return {
			commentCount: {
				allCount: '--',
				hasPicCount: '--'
			},
			commentList: [],
			query: {
				userId: getUserId(),
				page: 1,
				size: 10
			},
			totalPages: 0,
			status: 'none'
		}
	},
	onLoad(options) {
		// this.getCommentList()
	},
	mounted() {
	},
	methods: {
		getCommentList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			this.status = 'loading'
			getUserCommentApi(this.query)
				.then(({ data }) => {
					this.totalPages = data.totalPages
					if (isLoadmore) {
						this.commentList.push(...data.commentList)
					} else {
						this.commentList = data.commentList
					}
					uni.hideLoading()
					this.status = 'none'
				})
				.catch(() => {
					uni.hideLoading()
					this.status = 'none'
				})
		}
	},
	onReachBottom() {
		if (this.query.page >= this.totalPages) {
			this.status = 'no-more'
			return
		}
		if (this.query.size > this.commentList.length) {
			return
		}
		this.query.page++
		this.getCommentList(true)
	}
}
</script>

<style lang="less" scoped>
.comment-list-container {
	min-height: 100vh;
	width: 100%;
	padding: 0 26upx;
	background: #f6f6f6;
	box-sizing: border-box;

}
</style>
