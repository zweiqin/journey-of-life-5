<template>
	<view class="article-detail-container">
		<view class="article-detail-header">
			<JBack dark width="50" height="50"></JBack>
			<image class="share" :src="common.seamingImgUrl('aktde54t8chvkgy9lwbi.png')" mode="" />
		</view>

		<view class="article-detail-content">
			<h1 class="title">
				{{ articleInfo.title }}
			</h1>
			<view class="info">
				<view class="time">{{ articleInfo.updateTime }}</view>
				<view class="author">{{ articleInfo.author }}</view>
			</view>
			<image :src="articleInfo.imgUrl" class="adva" mode="" />

			<!-- <view class="content" v-html="articleInfo.content"></view> -->
			<view v-if="articleInfo.isVip ? [4, 1, 2].includes(userInfo.userLevel) : true" style="margin: 10px 0">
				<UParse :content="articleInfo.content && marked(articleInfo.content)"></UParse>
			</view>

			<view v-else class="attention" @click="go('/user/sever/userUp')">
				在疫情肆虐的上半年，九牧王的线上微商城月 GMV 基本平均保持在 1000w+
				的水平，其中私域用户贡献占到 90% 。私域会员增长了 10
				万多，其中新会员增加了 30% ，新会员的 GMV 占微商城总 GMV 的 30%
				，复购率增加 70% 以上。
			</view>

			<view class="recomment">
				<view class="tag">相关阅读</view>
				<ArticlePane :scroll-top="scrollTop" status="more" :data="recommentList"></ArticlePane>
			</view>
		</view>
	</view>
</template>

<script>
import {
	getIndustryInformationDetalApi,
	getIndustryInformationListApi
} from '../api/marketing-treasure-house'
import ArticlePane from '../pages/marketing-treasure-house/components/article-pane.vue'
import { getRandom } from '../utils'
import { marked } from 'marked'
import uParse from '../components/u-parse/u-parse.vue'
import { J_USER_INFO } from '../constant'

export default {
	components: {
		ArticlePane,
		UParse: uParse
	},
	onLoad(options) {
		this.articleId = options.id
		this.getArticleDetail()

		getIndustryInformationListApi({
			page: getRandom(0, 10),
			size: 10
		}).then(({ data }) => {
			this.recommentList = data.items.slice(0, 5)
		})
	},
	data() {
		return {
			articleId: null,
			articleInfo: {},
			recommentList: [],
			scrollTop: 0,
			userInfo: uni.getStorageSync(J_USER_INFO)
		}
	},
	methods: {
		// 获取文章详情
		getArticleDetail() {
			getIndustryInformationDetalApi(this.articleId * 1)
				.then((res) => {
					this.articleInfo = res.data
				})
				.catch(() => {
					this.$showToast('文章详情获取失败')
					setTimeout(() => {
						uni.navigateBack()
					}, 2000)
				})
		},

		marked
	},

	onPageScroll(scrollTop) {
		this.scrollTop = scrollTop.scrollTop
	}
}
</script>

<style lang="less" scoped>
@import "../style/mixin.less";
@import url("../components/u-parse/u-parse.css");

.article-detail-container {
	padding: 24upx;
	box-sizing: border-box;

	.attention {
		position: relative;
		text-align: center;
		margin: 40upx 0;
		color: #ccc !important;

		&::after {
			content: "该案例为vip尊享，请先开通vip";
			display: block;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			color: #07b9b9;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 28upx;
			letter-spacing: 2px;
			background: linear-gradient(to bottom,
					rgb(255, 255, 255),
					rgba(238, 238, 238, 0.582),
					rgb(255, 255, 255));
		}
	}

	.article-detail-header {
		.flex();

		.share {
			width: 40upx;
			height: 40upx;
		}
	}

	.article-detail-content {
		h1 {
			font-size: 36upx;
			margin-top: 14upx;
		}

		.info {
			color: #999;
			font-size: 20upx;
			.flex(center, flex-start);
			.margin(28upx, 8upx);

			.time {
				margin-right: 40upx;
			}
		}

		.adva {
			width: 100%;
			object-fit: cover;
			border-radius: 20upx;
			height: 416upx;
		}

		.content,
		.attention {
			.margin(20upx, 20upx);
			font-size: 24upx;
			color: #3d3d3d;
			line-height: 2;
		}

		.recomment {
			.tag {
				font-size: 24upx;
				color: #fff;
				background-color: #07b9b9;
				padding: 6upx 22upx;
				display: inline-flex;
				border-radius: 4upx;
				margin-top: 8upx;
			}
		}
	}
}
</style>
