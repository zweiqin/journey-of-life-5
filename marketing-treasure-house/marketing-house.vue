<template>
	<view class="marketing-treasure-house-container">
		<view class="view-bg">
			<JHeader tabbar="/pages/marketing-treasure-house/marketing-treasure-house" width="50" height="50" title="营销宝库">
			</JHeader>
		</view>

		<view class="main">
			<JNavs class="navs" :navs="navs" @nav-click="handleNavItemClick"></JNavs>

			<JLineTitle color="#FA5151" title="免费案例"></JLineTitle>

			<ArticlePane :scroll-top="scrollTop" :status="loadingStatus" :data="allList"></ArticlePane>
		</view>
	</view>
</template>

<script>
import { navs } from './config'
import ArticlePane from '../pages/marketing-treasure-house/components/article-pane.vue'
import { getIndustryInformationListApi } from '../api/marketing-treasure-house'

export default {
	name: 'MarketingHouse',
	components: {
		ArticlePane
	},
	onLoad() {
		this.getArticleList()
	},
	onShow() {},
	data() {
		return {
			navs,
			allList: [],
			queryInfo: {
				page: 1,
				size: 10,
				isVip: false
			},
			total: 0,
			loadingStatus: 'loading',
			isLoading: false,
			scrollTop: 0
		}
	},
	onReachBottom() {
		if (this.allList.length >= this.queryInfo.total) {
			this.loadingStatus = 'noMore'
			return
		}

		if (this.isLoading) {
			return
		}

		this.queryInfo.page++
		this.loadingStatus = 'loading'
		this.isLoading = true
		this.getArticleList(true)
	},
	methods: {
		handleNavItemClick(nav) {
			uni.navigateTo({
				url: nav.url
			})
		},

		async getArticleList(isLoadmore) {
			const res = await getIndustryInformationListApi({ ...this.queryInfo })
			if (isLoadmore) {
				this.allList.push(...res.data.items)
			} else {
				this.allList = res.data.items
			}
			this.total = res.data.total

			this.loadingStatus = 'more'
			this.isLoading = false
		},

		// 点击搜索
		serch(url) {
			uni.navigateTo({
				url: url + '?type=article'
			})
		}
	},
	onPageScroll(scrollTop) {
		this.scrollTop = scrollTop.scrollTop
	}
}
</script>

<style lang="less" scoped>
.j-line-title {
	margin: 40upx auto;
}

.marketing-treasure-house-container {
	padding-top: 200upx;
	padding-bottom: 60upx;

	.view-bg {
		position: absolute;
		top: 0;
		left: 0;
		//   no-repeat;
		height: 700upx;
		width: 100%;
		padding-top: 40upx;
		box-sizing: border-box;
	}

	.search-bar {
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		position: absolute;
		width: 95%;
		height: 72upx;
		top: 54upx;
		left: 50%;
		padding: 16upx 24upx;
		transform: translateX(-50%);
		background-color: #fff;
		color: #000000;
		font-size: 24upx;
		border-radius: 50upx;
		z-index: 200;

		.local-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.locale {
				padding: 0 10upx;
				border-right: 1px solid #ccc;
			}
		}

		.location {
			width: 40upx;
		}

		input {
			flex: 1;
			padding: 0 30upx;
		}
	}

	.main {
		position: relative;
		padding: 20upx;
		box-sizing: border-box;
		z-index: 200;
		top: -70upx;

		.navs {
			background-color: #fff;
			// padding: 32upx 40upx 10upx;
			box-sizing: border-box;
			border-radius: 20upx;
			// box-shadow: 0px 1px 2px 0px rgb(223, 223, 223);
			margin-bottom: 40upx;
		}
	}

	.img {
		width: 100%;
		border-radius: 20upx;
		margin-top: 30upx;
	}

	.daren-square-wrapper {
		font-size: 28upx;

		.item {
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin-bottom: 20upx;
			padding-bottom: 20upx;
			border-bottom: 1upx solid #e6e6e6;

			&:last-child {
				border-bottom: none;
			}

			.avatar {
				width: 110upx;
				height: 110upx;
				box-sizing: border-box;
				object-fit: cover;
				border-radius: 10upx;
			}

			.info {
				flex: 1;
				height: 100%;
				margin: 0 40upx 0 20upx;
				display: flex;
				justify-content: space-between;
				flex-direction: column;

				.title {
					width: 360upx;
					white-space: nowrap;
					text-overflow: ellipsis;
					overflow: hidden;
					font-size: 28upx;
					font-weight: bold;
				}

				.desc {
					font-size: 24upx;
					color: #3d3d3d;
					margin-top: 20upx;

					.precent {
						color: rgb(250, 81, 81);
					}
				}
			}

			.uni-btn {
				border: 1upx solid rgb(250, 81, 81);
				color: rgb(250, 81, 81);
				padding: 10upx 20upx;
				border-radius: 200upx;
				font-size: 24upx;
			}
		}
	}
}
</style>
