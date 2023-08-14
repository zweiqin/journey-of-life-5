<template>
	<view class="information-sentry-container">
		<div class="header">
			<img class="back" :src="common.seamingImgUrl('qt4o7j0jglkweyicy1fw.png')" alt="" @click="handleBack" />
			<h2
				:style="{
					flex: searchActive ? 'none' : 1
				}"
			>
				信息哨兵
			</h2>
			<view class="search" :class="{ active: searchActive }">
				<img class="icon" :src="common.seamingImgUrl('lsomfvddr0bz7fdsltht.png')" alt="" @click="handleSearch" />

				<input
					ref="inputRef" class="search-input" placeholder="输入手机号昵称搜索" type="text"
					:value="query.search"
					@input="handleSearchFn"
				/>
			</view>
		</div>

		<view class="navs">
			<view
				v-for="item in navs" :key="item.label" class="item" :class="{ active: query.status === item.value }"
				@click="changeCurrentTab(item.value)"
			>
				{{ item.label }}
			</view>
		</view>

		<view v-show="list.length" class="main">
			<view v-show="query.status === 1">
				<CollectPane v-for="item in list" :key="item.id" :info="item" @success="handleConversionSuccess"></CollectPane>
			</view>

			<view v-show="query.status === 2">
				<ConversionPane v-for="item in list" :key="item.id" :info="item" @success="handleConversionSuccess">
				</ConversionPane>
			</view>

			<view v-show="query.status === 3">
				<PursueSalePane v-for="item in list" :key="item.id" :info="item" @success="handleConversionSuccess">
				</PursueSalePane>
			</view>

			<view v-show="query.status === 4">
				<StanPane v-for="item in list" :key="item.id" :info="item" @success="handleConversionSuccess"></StanPane>
			</view>
		</view>

		<view v-if="!list.length">
			<tui-no-data
				:img-url="common.seamingImgUrl('ncs28ma9a3ac5ufebzsw.png')" img-width="400" :fixed="false"
				style="margin-top: 50upx;"
			>
				暂无数据
			</tui-no-data>
		</view>

		<img
			v-show="query.status !== 4" class="add-icon" :src="common.seamingImgUrl('8osmldqpu5nthwxlwha9.png')" alt=""
			@click="handleToAdd"
		/>

		<AddPopup ref="addPopupRef" :words="words" :type="query.status" :list="list"></AddPopup>
	</view>
</template>

<script>
import { informationSentryNavs } from './config'
import CollectPane from './components/collect-pane.vue'
import ConversionPane from './components/conversion-pane.vue'
import PursueSalePane from './components/pursue-sale-pane.vue'
import StanPane from './components/stan-pane.vue'
import { getMsgSentryListApi, getWordsApi } from '../../api/user'
import { getUserId } from '../../utils'
import { WORDS_LIST, J_SELECT_WORDS } from '../../constant'
import AddPopup from './components/add-popup.vue'
const { debounce } = require('../../utils/util')

export default {

	components: {
		CollectPane,
		ConversionPane,
		PursueSalePane,
		StanPane,
		AddPopup
	},
	data() {
		return {
			searchActive: false,
			navs: informationSentryNavs,
			currentTab: 1,
			query: {
				userId: getUserId(),
				status: 1,
				search: ''
			},
			list: [],
			popupVisiable: false,
			words: '',
			handleSearchFn: null
		}
	},

	created() {
		this.getListData()
		this.handleSearchFn = debounce(this.search, 500)
	},

	methods: {
		// 点击搜索icon
		handleSearch() {
			this.searchActive = true
		},

		// 点击切换tab
		changeCurrentTab(tab) {
			this.query.status = tab
			this.getListData()
			this.getWordsList()
			this.$refs.addPopupRef.clear()
			uni.setStorageSync(J_SELECT_WORDS, '')
		},

		// 回退
		handleBack() {
			this.$switchTab('/pages/user/user')
		},

		// 获取列表数据
		async getListData() {
			uni.showLoading({
				title: '加载中'
			})
			const res = await getMsgSentryListApi(this.query)

			if (res.errno && res.errmsg) {
				this.$showToast('您还不是业务员，无法访问')
				uni.hideLoading()
				setTimeout(() => {
					this.$switchTab('/pages/user/user')
				}, 2000)
			} else {
				this.list = res
				uni.hideLoading()
			}
		},

		// 转化成功
		handleConversionSuccess() {
			this.getListData()
		},

		// 获取话术列表
		async getWordsList() {
			const res = await getWordsApi(this.query.status)
			uni.setStorageSync(WORDS_LIST, res)
		},

		handleToAdd() {
			if (this.query.status === 1) {
				uni.navigateTo({
					url: '/user/digital-store/add'
				})
			} else {
				this.$refs.addPopupRef.open()
			}
		},

		search(e) {
			this.query.search = e.detail.value
			this.getListData()
		}
	},

	onShow() {
		this.words = uni.getStorageSync(J_SELECT_WORDS)
	}
}
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
@import "../../style/var.less";

.information-sentry-container {
	padding: 40upx 34upx;
	box-sizing: border-box;

	.header {
		.flex();

		.back {
			width: 48upx;
		}

		h2 {
			flex: 1;
			font-weight: normal;
			font-size: 32upx;
			color: @c0;
			margin-left: 34upx;
			flex-shrink: 0;
		}

		.search {
			position: relative;
			width: 32upx;
			display: flex;
			align-items: center;
			margin-left: 10px;
			transition: all 350ms;
			overflow: hidden;

			&.active {
				background-color: #efefef;
				padding: 2px 10px;
				border-radius: 20px;
				overflow: auto;
				flex: 1;

				.icon {
					margin-right: 10px;
				}

				.search-input {
					flex: 1;
				}
			}

			.icon {
				width: 32upx;
			}

			.search-input {
				width: 0;
			}
		}
	}

	.navs {
		padding: 34upx;
		.flex();
		color: @c9;
		font-size: 28upx;

		.item {
			transition: all 350ms;

			&.active {
				color: #ff8f1f;
			}
		}
	}

	.add-icon {
		position: fixed;
		right: 30px;
		bottom: 30px;
		width: 60px;
		height: 60px;
	}
}
</style>
