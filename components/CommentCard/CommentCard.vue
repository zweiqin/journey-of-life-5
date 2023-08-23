<template>
	<view class="eval-wrapper" :style="{ backgroundColor }">
		<view class="eval">
			<text>评价（{{ commentInfo.count || 0 }}）</text>
			<text v-if="commentInfo.data && commentInfo.data.length">
				<text @click="show(JSON.parse(JSON.stringify(commentInfo.data)))">查看全部</text>
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
						v-for="(img, index) in commentInfo.data[0].picList.split(',')" :key="index" class="img"
						:src="common.seamingImgUrl(img)" @click="handlePreviewImg(index, commentInfo.data[0].picList.split(','))"
					>
					</image>
				</view>
			</view>
		</view>

		<tui-drawer mode="bottom" :visible="commentListDrawerVisible" @close="handleClose">
			<view class="comment-container">
				<view class="wrapper">
					<view class="comment-title">
						<div>全部评论({{ originData.length }})</div>
						<tui-icon :size="24" name="shut" @click="commentListDrawerVisible = false"></tui-icon>
					</view>
					<div class="filter-btn-wrapper">
						<button :class="{ active: isPic }" class="uni-btn" @click="handleFilter">有图({{ picCommentCount }})</button>
						<!-- <button class="uni-btn">非系统默认</button> -->
					</div>
					<view v-for="item in commentList" :key="item.id" class="comment-item">
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
			commentList: [],
			originData: [],
			isPic: false,
			unSys: false,
			picCommentCount: 0,
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
	created() {
		this.getOrderComment(this.goodsId)
	},
	// #endif
	methods: {
		// 预览图片
		handlePreviewImg(index, imgList) {
			uni.previewImage({
				current: index,
				urls: imgList,
				indicator: 'count'
			})
		},
		getOrderComment(id) {
			getGoodsCommentListApi({ gid: id })
				.then(({ data }) => {
					this.commentInfo = data || { count: 0, data: [] }
				})
		},

		show(commentList) {
			this.picCommentCount = 0
			this.originData = commentList.map((item) => {
				item.picList = typeof item.picList === 'string' && !!item.picList ? item.picList.split(',') : ''
				if (item.picList) {
					this.picCommentCount++
				}
				return item
			})
			this.commentList = this.originData
			this.commentListDrawerVisible = true
			// #ifdef H5
			window.history.pushState(null, null, document.URL)
			window.addEventListener('popstate', this.back)
			// #endif
		},
		handleClose() {
			this.commentListDrawerVisible = false
		},
		handleFilter() {
			this.isPic = !this.isPic
			this.filterCommentData()
		},
		filterCommentData() {
			if (this.isPic) {
				this.commentList = this.originData.filter((item) => !!item.picList === this.isPic)
			} else {
				this.commentList = this.originData
			}
		},
		// #ifdef H5
		prohibitWindowScroll(tag) {
			document.body.style.overflow = tag ? 'hidden' : 'auto'
		},
		// #endif
		// #ifdef H5
		back() {
			this.commentListDrawerVisible = false
		}
		// #endif
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
			background-color: #f9f9f9;
			height: calc(100vh - 100upx);
			overflow: auto;
		}

		.filter-btn-wrapper {
			width: 100%;
			display: flex;
			align-items: center;
			margin-bottom: 40upx;

			.uni-btn {
				padding: 8upx 10upx;
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
