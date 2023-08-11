<template>
	<view class="comment-list-container">
		<view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="商品评价"></JHeader>
		</view>
		<view style="display: flex;justify-content: flex-start;">
			<tui-button
				margin="0 20upx 0 0" :type="currentButton === 0 ? 'danger' : 'gray'" width="fit-content" height="50rpx"
				style="padding: 0 24upx;border-radius: 50rpx;" @click="handleChangeButton(0)"
			>
				全部({{ commentCount.allCount }})
			</tui-button>
			<tui-button
				margin="0 20upx 0 0" :type="currentButton === 1 ? 'danger' : 'gray'" width="fit-content" height="50rpx"
				style="padding: 0 24upx;border-radius: 50rpx;" @click="handleChangeButton(1)"
			>
				有图({{ commentCount.hasPicCount }})
			</tui-button>
		</view>
		<view style="margin: 20upx 0;background-color: #fff;">

			<view v-if="commentList && commentList.length" style="padding: 20upx;">
				<view
					v-for="(item, index) in commentList" :key="index"
					style="margin-bottom: 28upx;padding-bottom: 10upx;;border-bottom: 1px solid #dddddd;"
				>
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view>
								<JAvatar :src="common.seamingImgUrl(item.userInfo.avatarUrl)" size="88" radius="50%"></JAvatar>
							</view>
							<view style="margin-left: 20upx;">{{ item.userInfo.nickName }}</view>
						</view>
						<view style="font-size: 24upx;color: #999999;">{{ item.addTime.substring(0, 10) }}</view>
					</view>
					<view v-if="item.picList && item.picList.length" style="width: 100%;">
						<view style="width: 100%;overflow-x: auto;">
							<tui-image-group
								:image-list="item.picList.map(i => ({ src: common.seamingImgUrl(i) }))" mode="aspectFit" is-group
								distance="50" width="240rpx" height="240rpx" fade-show
								radius="10upx"
							></tui-image-group>
						</view>
					</view>
					<view style="padding: 10upx 20upx 0;font-size: 28upx;">{{ item.content }}</view>
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
import { getCommentCountApi, getCommentListApi } from '../../../api/order'

export default {
	name: 'CommentList',
	components: {},
	data() {
		return {
			currentButton: 0,
			commentCount: {
				allCount: '--',
				hasPicCount: '--'
			},
			commentList: [],
			query: {
				type: 0,
				valueId: '',
				page: 1,
				size: 10
			},
			totalPages: 0,
			status: 'none'
		}
	},
	onLoad(options) {
		this.query.valueId = options.valueId
		this.getCommentCount()
		this.getCommentList()
	},
	mounted() {
	},
	methods: {
		getCommentCount() {
			getCommentCountApi({
				type: 0,
				valueId: this.query.valueId
			}).then(({ data }) => {
				this.commentCount = data
			})
		},
		handleChangeButton(index) {
			if (index === this.currentButton) return
			this.currentButton = index
			this.totalPages = 0
			this.query.page = 1
			this.query.size = 10
			this.getCommentList()
		},
		getCommentList(isLoadmore) {
			uni.showLoading({
				title: '加载中'
			})
			this.status = 'loading'
			getCommentListApi({ ...this.query, showType: this.currentButton })
				.then(({ data }) => {
					this.totalPages = data.totalPages
					if (isLoadmore) {
						this.commentList.push(...data.data)
					} else {
						this.commentList = data.data
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
