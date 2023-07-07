<template>
	<view class="marketing-treasure-house-container">
		<view class="view-bg">
			<!-- <h1>达人广场</h1> -->
		</view>
		<view class="search-bar" @click="serch('/pages/search-page/search-page')">
			<JLocale></JLocale>
			<view></view>
			<img class="location" src="../../static/images/store/search.png" alt="" />
		</view>

		<view class="main">
			<img
				v-for="item in advance" :key="item.imgUrl" class="img animate__animated animate__fadeIn" style="width: 100%"
				:src="item.imgUrl" alt="" @click="go(item.link)"
			/>
			<JLineTitle color="#FA5151" title="任务广场"></JLineTitle>
			<view class="daren-square-wrapper">
				<view v-for="store in templateShowStore" :key="store.name" class="item">
					<easy-loadimage loading-mode="spin-circle" class="avatar" :image-src="store.avatar"></easy-loadimage>
					<view class="info">
						<view class="title">{{ store.name }}</view>
						<view class="desc">
							{{ store.desc
							}}<text class="precent">{{ store.precent }}</text>
						</view>
					</view>
					<button class="uni-btn">去报名</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import ArticlePane from './components/article-pane.vue'
import { getIndustryInformationListApi } from '../../api/marketing-treasure-house'
import { advance, templateShowStore } from './consfig'
import { delayedLoginStatus } from '../../utils'

export default {
	components: {
		ArticlePane
	},
	onLoad() {
		this.getArticleList()
		delayedLoginStatus()
	},
	onShow() { },
	data() {
		return {
			allList: [],
			advance,
			templateShowStore,
			queryInfo: {
				page: 1,
				size: 10,
				isVip: false
			},
			total: 0,
			loadingStatus: 'loading',
			isLoading: false
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
	}
}
</script>

<style lang="less" scoped>
.j-line-title {
	margin: 40upx auto;
}

.marketing-treasure-house-container {
	padding-top: 200upx;
	padding-bottom: 120upx;

	.view-bg {
		position: absolute;
		top: 0;
		left: 0;
		background: url("https://adminapi.jfcmei.com/admin/storage/fetch/2rlfz31333yt1dzs9wiv.png") no-repeat;
		height: 700upx;
		width: 100%;
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
		top: -30upx;

		.navs {
			background-color: #fff;
			padding: 32upx 40upx 10upx;
			box-sizing: border-box;
			border-radius: 20upx;
			box-shadow: 0px 1px 2px 0px rgb(223, 223, 223);
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
