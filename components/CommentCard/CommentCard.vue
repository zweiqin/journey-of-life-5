<template>
	<view class="eval-wrapper" :style="{ backgroundColor }">
		<view class="eval">
			<text>评价（{{ commentInfo.count || 0 }}）</text>
			<text v-if="commentInfo.data && commentInfo.data.length">
				<text @click="show">查看全部</text>
				<image style="margin-bottom: -4upx" src="../../static/images/detail/right-arrow.png" mode="" />
			</text>
			<text v-else-if="!commentInfo.data.length">暂无评价</text>
		</view>
		<view v-if="commentInfo.data.length" class="one-eval-container">
			<view class="user-info">
				<image
					class="avatar"
					:src="common.seamingImgUrl(commentInfo.data[0].avatar) || require('../../static/images/icon/head04.png')"
				>
				</image>
				<view class="info">
					<view class="nickname">{{ commentInfo.data[0].nickname || '匿名用户' }} </view>
					<view class="eval-time">{{ commentInfo.data[0].addTime }}</view>
				</view>
			</view>
			<view class="comment-detail">
				<view class="content">
					{{ commentInfo.data[0].content }}
				</view>
				<view v-if="commentInfo.data[0].picList" class="pic-list">
					<image
						v-for="(img, index) in commentInfo.data[0].picList" :key="index" class="img"
						:src="common.seamingImgUrl(img)" @click="handlePreviewImg(index, commentInfo.data[0].picList)"
					>
					</image>
				</view>
			</view>
		</view>

		<tui-drawer mode="bottom" :visible="commentListDrawerVisible" @close="handleClose">
			<view class="comment-container">
				<view class="wrapper">
					<view class="comment-title">
						<view class="comment-title-left">
							<button
								:style="{ borderBottom: !commentQuery.orPic ? '4upx solid #e34e4a' : '4upx solid #f9f9f9' }"
								class="uni-btn uni-button" @click="handleFilter(0)"
							>
								全部评论({{ commentInfo.count }})
							</button>
							<button
								:style="{ borderBottom: commentQuery.orPic ? '4upx solid #e34e4a' : '4upx solid #f9f9f9' }"
								class="uni-btn uni-button" @click="handleFilter(1)"
							>
								有图
							</button>
						</view>
						<tui-icon :size="24" name="shut" @click="commentListDrawerVisible = false"></tui-icon>
					</view>
					<view class="filter-btn-wrapper">
						<button
							:class="{ active: commentQuery.rate === 4 }" class="uni-btn uni-button"
							@click="handleFilter(null, 4)"
						>
							五星好评
						</button>
						<button
							:class="{ active: commentQuery.rate === 1 }" class="uni-btn uni-button"
							@click="handleFilter(null, 1)"
						>
							好评
						</button>
						<button
							:class="{ active: commentQuery.rate === 3 }" class="uni-btn uni-button"
							@click="handleFilter(null, 3)"
						>
							中评
						</button>
						<button
							:class="{ active: commentQuery.rate === 2 }" class="uni-btn uni-button"
							@click="handleFilter(null, 2)"
						>
							差评
						</button>
						<!-- <button class="uni-button">非系统默认</button> -->
					</view>
					<scroll-view scroll-y="true" style="flex: 1;height: 0;" @scrolltolower="handleScrolltolower">
						<view v-for="item in commentInfo.data" :key="item.id" class="comment-item">
							<view class="user-info">
								<image
									class="user-avatar"
									:src="common.seamingImgUrl(item.avatar) || require('../../static/images/icon/head04.png')"
								>
								</image>
								<view class="user-name">{{ item.nickname }}</view>
							</view>
							<view class="content-wrapper">
								<view class="comment-info">
									<view class="comment-time">{{ item.addTime }}</view>
									<tui-rate :current="item.rate" :size="16" normal="#ccc" active="#ff7900"></tui-rate>
								</view>
								<view class="user-content">{{ item.content }}</view>
								<view v-if="item.picList.length" class="image-list" :class="`image-list-${item.picList.length}`">
									<block v-if="item.picList.length === 3">
										<image class="img img-0" :src="common.seamingImgUrl(item.picList[0])" alt="" />
										<view class="img-list-wrapper">
											<image class="img img-1" :src="common.seamingImgUrl(item.picList[1])" alt="" />
											<image class="img img-2" :src="common.seamingImgUrl(item.picList[2])" alt="" />
										</view>
									</block>
									<block v-else>
										<block v-for="(img, index) in item.picList" :key="img">
											<image class="img" :class="`img-${index}`" :src="common.seamingImgUrl(img)" alt="" />
										</block>
									</block>
								</view>
							</view>
							<view v-if="item.commentGoods1" class="additional-comment">
								<view class="additional-time">用户追评：{{ item.commentGoods1.addTime }}</view>
								<view class="user-content">{{ item.commentGoods1.content }}</view>
							</view>
							<view v-if="item.commentGoods2" class="additional-comment">
								<view class="additional-time">商家回复：{{ item.commentGoods2.addTime }}</view>
								<view class="user-content">{{ item.commentGoods2.content }}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
		</tui-drawer>

	</view>
</template>

<script>
import { getGoodsCommentListApi } from '../../api/order'
export default {
	name: 'CommentCard',
	props: {
		goodsId: {
			type: Number,
			required: true
		},
		backgroundColor: {
			type: String,
			default: '#f9f9f9'
		}
	},
	data() {
		return {
			commentInfo: { count: 0, data: [] },

			commentListDrawerVisible: false,
			status: 'none',
			loadingStatus: 'noMore',
			commentQuery: {
				page: 1,
				size: 10,
				gid: '',
				rate: 4,
				orPic: 0
			},
			unSys: false,
			sysCommentCount: 0
		}
	},
	// #ifdef H5
	watch: {
		commentListDrawerVisible: {
			handler(value) {
				this.prohibitWindowScroll(value)
				if (!value) {
					window.removeEventListener('popstate', this.back)
				}
			},
			immediate: true
		}
	},
	// #endif
	created() {
		this.getOrderComment()
	},
	methods: {
		// 预览图片
		handlePreviewImg(index, imgList) {
			uni.previewImage({
				current: index,
				urls: imgList,
				indicator: 'count'
			})
		},
		getOrderComment(isLoadmore) {
			this.status = 'loading'
			this.loadingStatus = 'loading'
			getGoodsCommentListApi({ ...this.commentQuery, gid: this.goodsId })
				.then(({ data }) => {
					this.commentInfo.count = data.count
					data.data = data.data.map((item) => {
						item.picList = typeof item.picList === 'string' && !!item.picList ? item.picList.split(',') : ''
						return item
					})
					if (isLoadmore) {
						this.commentInfo.data.push(...data.data)
					} else {
						this.commentInfo.data = data.data
					}
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
				.catch(() => {
					this.status = 'none'
					this.loadingStatus = 'noMore'
				})
		},

		show() {
			this.commentListDrawerVisible = true
			// #ifdef H5
			window.history.pushState(null, null, document.URL)
			window.addEventListener('popstate', this.back)
			// #endif
		},
		handleClose() {
			this.commentListDrawerVisible = false
		},
		handleFilter(orPic, rate) {
			let isChange
			if (typeof orPic === 'number' && this.commentQuery.orPic !== orPic) {
				this.commentQuery.orPic = orPic
				isChange = true
			}
			if (typeof rate === 'number' && this.commentQuery.rate !== rate) {
				isChange = true
			}
			if (isChange) this.getOrderComment()
			// this.filterCommentData()
		},
		// filterCommentData() {
		// 	if (this.commentQuery.orPic) {
		// 		this.commentList = this.originData.filter((item) => !!item.picList === this.commentQuery.orPic)
		// 	} else {
		// 		this.commentList = this.originData
		// 	}
		// },
		// #ifdef H5
		prohibitWindowScroll(tag) {
			document.body.style.overflow = tag ? 'hidden' : 'auto'
		},
		// #endif
		// #ifdef H5
		back() {
			this.commentListDrawerVisible = false
		},
		// #endif
		handleScrolltolower() {
			if (this.commentQuery.page >= this.commentInfo.count) {
				this.status = 'no-more'
				return
			}
			if (this.commentQuery.size > this.commentInfo.data.length) {
				return
			}
			this.commentQuery.page++
			this.getOrderComment(true)
		}
	}
}
</script>

<style lang="scss" scoped>
.eval-wrapper {
	box-sizing: border-box;

	.eval {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 26upx;
		margin-top: 24upx;

		image {
			width: 32upx;
			height: 32upx;
			object-fit: cover;
		}
	}

	.one-eval-container {
		padding: 26upx 26upx;

		.user-info {
			display: flex;
			align-items: flex-start;

			.avatar {
				width: 70upx;
				height: 70upx;
				border-radius: 50%;
				margin-right: 20upx;
				flex-shrink: 0;
			}

			.info {
				.nickname {
					font-size: 28upx;
					font-weight: 500;
					color: #000;
				}

				.eval-time {
					color: #ccc;
					font-size: 24upx;
				}
			}
		}

		.comment-detail {
			margin: 20upx 0;
			color: #3e3e3e;

			.pic-list {
				margin-top: 20upx;

				.img {
					width: 160upx;
					height: 160upx;
					margin-right: 30upx;
					border-radius: 10upx;
				}
			}
		}
	}

	.comment-container {
		width: 100vw;
		height: 100vh;
		background-color: #f9f9f9;
		/* border-radius: 20upx; */
		padding: 20upx 20upx 100upx;
		box-sizing: border-box;

		.wrapper {
			display: flex;
			flex-direction: column;
			height: calc(100vh - 100upx);
			background-color: #f9f9f9;
			overflow: auto;
		}

		.filter-btn-wrapper {
			width: 100%;
			display: flex;
			align-items: center;
			margin-bottom: 40upx;

			.uni-button {
				padding: 12upx 16upx;
				margin-right: 20upx;
				font-size: 24upx;
				background-color: #ccc;
				color: #fff;
				border-radius: 8upx;

				&.active {
					background-color: #fe753f;
				}
			}
		}

		.comment-title {
			font-size: 32upx;
			font-weight: 500;
			margin-bottom: 30upx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.comment-title-left {
				display: flex;
				align-items: center;

				.uni-button {
					border-radius: 0;
					padding: 12upx 0upx;
					margin: 0 18upx;
					font-size: 30upx;
				}
			}
		}

		.comment-item {
			margin-bottom: 80upx;
			background-color: #f9f9f9;

			.user-info {
				display: flex;
				align-items: center;

				.user-avatar {
					width: 80upx;
					height: 80upx;
					border-radius: 50%;
					flex-shrink: 0;
					margin-right: 20upx;
					border: 1upx solid rgb(230, 230, 230);
				}

				.user-name {
					font-size: 28upx;
					font-weight: 500;
					margin-right: 20upx;
				}
			}

			.content-wrapper,
			.additional-comment {
				width: 80vw;
				margin-left: 10vw;
				background-color: #fff;
				border-radius: 20upx;
				padding: 40upx;
				box-sizing: border-box;
				margin-bottom: 20upx;

				.additional-time {
					color: #fe753f;
					margin-bottom: 20upx;
				}

				.comment-info {
					display: flex;
					align-items: center;
					color: #ccc;
					font-size: 24upx;
					margin-bottom: 20upx;

					.comment-time {
						margin-right: 20upx;
					}
				}

				.user-content {
					margin-bottom: 20upx;
					font-size: 28upx;
				}

				.img {
					border-radius: 20upx;
					/* border: 1upx solid #ccc; */
				}

				.image-list-3 {
					display: flex;
					justify-content: space-between;

					.img-0 {
						width: 340upx;
						height: 340upx;
					}

					.img-list-wrapper {
						display: flex;
						align-items: center;
						justify-content: space-between;
						flex-direction: column;
						width: 160upx;
						height: 340upx;
					}

					.img-1 {
						width: 160upx;
						height: 160upx;
					}

					.img-2 {
						width: 160upx;
						height: 160upx;
					}
				}

				.image-list-1 {
					.img-0 {
						width: 520upx;
						height: 520upx;
					}
				}

				.image-list-2 {
					display: flex;
					align-items: center;
					justify-content: space-between;

					.img-0 {
						width: 240upx;
						height: 240upx;
					}

					.img-1 {
						width: 240upx;
						height: 240upx;
					}
				}
			}
		}
	}
}
</style>
