<template>
	<view class="my-comment-container">
		<view style="padding: 30upx 20upx;color: #000000;">
			<JHeader width="50" height="50" title="我的评价"></JHeader>
		</view>
		<view style="margin: 20upx 0;">
			<view v-if="commentList && commentList.length">

				<view v-for="item in commentList" :key="item.id" class="goods-pane">
					<view class="comment-wrapper">
						<view class="comment">
							<text class="comment-title">我的评论：</text>
							{{ item.content }}
						</view>
						<view v-if="item.commentGoods1" class="comment">
							<text class="comment-title">我的追评：</text>
							{{ item.commentGoods1 && item.commentGoods1.content }}
						</view>
						<view v-if="item.commentGoods2" class="comment">
							<text class="comment-title">商家回复：</text>
							{{ item.commentGoods2.content }}
						</view>
					</view>
					<view class="goods-list" @click="go(`/user/orderForm/order-form-detail?id=${item.oid}`)">
						<view class="goods-item">
							<image class="goods-img" :src="common.seamingImgUrl(item.dtsTfGoods.picUrl)" mode="" />
							<view class="info">
								<view class="name">{{ item.dtsTfGoods.name }}</view>
								<view class="good-sp-pr">
									<view class="pr">
										￥{{ item.dtsTfGoods.counterPrice }} <text v-if="item.dtsTfGoods.unit">
											/ {{ item.dtsTfGoods.unit }}
										</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view class="goods-ops">
						<view class="btns">
							<button
								v-if="!item.commentGoods1" class="uni-btn"
								@click="go(`/user/my-tools/my-comment/additional-evaluation?goodsName=${item.dtsTfGoods.name}&picUrl=${item.dtsTfGoods.picUrl}&price=${item.dtsTfGoods.counterPrice}&unit=${item.dtsTfGoods.unit}&commentId=${item.id}&goodsId=${item.gid}&oid=${item.oid}&ocid=${item.ocid}`)"
							>
								追加评价
							</button>
							<button v-else class="uni-btn" style="background-color: transparent; color: #3d3d3d;">已追评</button>
						</view>
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
import { getMyCommentListApi } from '../../../api/order'
import { getUserId } from '../../../utils'

export default {
	name: 'MyComment',
	data() {
		return {
			commentList: [],
			status: 'none'
		}
	},
	onLoad(options) {
		this.getCommentList()
	},
	methods: {
		getCommentList() {
			uni.showLoading({
				title: '加载中'
			})
			this.status = 'loading'
			getMyCommentListApi({ userId: getUserId() })
				.then(({ data }) => {
					this.commentList = data || []
					uni.hideLoading()
					this.status = 'none'
				})
				.catch(() => {
					uni.hideLoading()
					this.status = 'none'
				})
		}
	}
}
</script>

<style lang="less" scoped>
.my-comment-container {
	min-height: 100vh;
	width: 100%;
	padding: 0 26upx;
	background: #f6f6f6;
	box-sizing: border-box;

	.goods-pane {
		padding: 32upx;
		background-color: #fff;
		margin-bottom: 20upx;
		border-radius: 24upx;
		font-size: 24upx;

		&:nth-of-type(:last-child) {
			margin-bottom: 0;
		}

		.comment-wrapper {
			display: flex;
			align-items: center;
			justify-content: space-between;
			padding-bottom: 16upx;
			border-bottom: 1upx solid #e9e9e9;
			display: block;

			.comment {
				color: #141000;
				font-size: 28upx;
				font-weight: 500;
				margin-top: 20upx;

				.comment-title {
					color: #f40;
				}
			}
		}

		.goods-list {
			padding: 20upx 0;

			.goods-item {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-bottom: 0upx;

				.info {
					flex: 1;
					height: 100%;
					display: flex;
					justify-content: space-between;
					flex-direction: column;

					.name {
						font-size: 28upx;
						font-weight: 500;
						width: 300upx;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}

					.good-sp-pr {
						margin-top: 12upx;

						.sp {
							line-height: 1.5;
							color: #8f8d85;
							font-size: 24upx;
							margin-bottom: 20upx;
						}

						.pr {
							font-size: 28upx;
						}
					}
				}

				.goods-img {
					width: 140upx;
					height: 140upx;
					object-fit: cover;
					margin-right: 20upx;
				}
			}
		}

		.goods-ops {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			padding-top: 20upx;
			border-top: 1upx solid #f1f1f0;

			.btns {
				display: flex;
				align-items: center;

				.uni-btn {
					font-size: 24upx;
					color: #fff;
					line-height: 2.5;
					padding: 0 28upx;
					background-color: #f40;
					white-space: nowrap;
					margin-left: 20upx;
					border-radius: 32upx;
				}
			}
		}
	}

}
</style>

<!-- <template>
	<view class="my-comment-container">
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
	:image-list="JSON.parse(item.picUrls).map(i => ({ src: common.seamingImgUrl(i) }))"
	mode="aspectFit" is-group distance="50" width="240rpx"
	height="240rpx" fade-show
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
	this.getCommentList()
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
	this.commentList = data.commentList || []
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
