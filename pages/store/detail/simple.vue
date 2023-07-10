<template>
	<view>
		<!-- 顶部banner图 -->
		<view class="ding">banner</view>

		<!-- tab 滑动 -->
		<view :class="{'st':true,'sticky-fixed':isF}">
			<!-- tab部分 -->
			<swiper class="ct_tab">
				<swiper-item :class="{ 'ct_active': index == tabCur }" v-for="(item, index) in tabList" :key="index"
					class="ct_item" @click="clickCtTab(index)">
					<text v-text="item.title"></text>
				</swiper-item>
			</swiper>
		</view>

		<!-- 内容 -->
		<view class="xiala">
			<!-- 内容信息 -->
			<view v-if="tabCur===0">
				<view>全部信息</view>
				<view>111111111111111111111111111</view>
				<view>222222222222222222222222222</view>
				<view>333333333333333333333333333</view>
			</view>
			<view v-if="tabCur===1">
				<view>水果</view>
				<view>111111111111111111111111111</view>
				<view>222222222222222222222222222</view>
				<view>333333333333333333333333333</view>
			</view>
			<view v-if="tabCur===2">
				<view>蔬菜</view>
			</view>
			<view v-if="tabCur===3">
				<view>调味品</view>
			</view>
			<view v-if="tabCur===4">
				<view>肉类</view>
			</view>
			<view v-if="tabCur===5">
				<view>油类</view>
			</view>
			<view v-if="tabCur===6">
				<view>米类</view>
			</view>
			<view v-if="tabCur===7">
				<view>海鲜</view>
			</view>

		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 下拉固定
				yuanH: uni.upx2px(200),
				isF: false,
				// 滑动tab
				tabCur: 0,
				tabList: [{
					title: '全部',
				}, {
					title: '水果',
				}, {
					title: '蔬菜',
				}, {
					title: '调味品',
				}, {
					title: '肉类',
				}, {
					title: '油类',
				}, {
					title: '米类',
				}, {
					title: '海鲜',
				}],

			};
		},
		onPageScroll(e) {
			//#ifdef H5
			this.isF = true
			// #endif
			// #ifndef H5
			if (this.yuanH > e.scrollTop) {
				this.isF = false
			} else {
				this.isF = true
			}
			// #endif
		},
		methods: {
			clickCtTab(ctCur) {
				this.tabCur = ctCur
				console.log('点击了--->' + this.tabCur)
			}
		},

	};
</script>
<style lang='scss' scoped>
	/* 顶部 banner */
	.ding {
		height: 200rpx;
		background-color: aquamarine;
	}

	.st {
		height: 90rpx;
		width: 750rpx;
		background-color: #fff;
		z-index: 999;
		/* top: 300rpx; */
	}

	.sticky-fixed {
		/* #ifdef H5 */
		position: sticky;
		top: 44rpx;
		/* #endif */
		/* #ifndef H5 */
		position: fixed;
		top: 0;
		/* #endif */
		z-index: 999;
	}

	.xiala {
		height: 1500px;
		background-color: #eee;
		padding-top: 100rpx;
	}


	/* 滑动tab */
	.ct_tab {
		width: 698rpx;
		height: 90rpx;
		margin: 0 auto;
		/* padding: 30rpx 0; */
		font-size: 28rpx;
		/* font-weight: bold; */
		color: #c0c8d0;
		white-space: nowrap;
		display: flex;
		overflow: hidden;
	}

	.ct_item {
		width: 150rpx;
		padding: 20rpx 0;
		display: inline-block;
	}

	.ct_item text {
		padding: 20rpx 0;
	}

	.ct_active {
		color: #007AFF;
		font-weight: bold;
	}

	.ct_active text {
		border-bottom: 2px solid #007AFF;
	}

	swiper {
		width: 100%;
	}

	swiper-item {
		width: 150rpx !important;
	}
</style>