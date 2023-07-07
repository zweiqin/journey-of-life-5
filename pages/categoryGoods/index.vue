<template>
	<view class="categoryGoods">
		<view class="head">
			<image
				:src="common.seamingImgUrl('s6aydawlpgkz9buau2fx.png')" mode="scaleToFill" class="backImg"
				@click="backTouch"
			/>
			<view class="headTitle"> {{ title }} </view>
			<view class="backImg"></view>
		</view>
		<view class="navs">
			<template v-if="category.length < 5">
				<view
					v-for="item in category" :key="item.id" class="item" :class="{ active: item.id == currentTab }"
					@click="categoryChose(item.id)"
				>
					{{ item.name }}
				</view>
			</template>
			<template v-else>
				<scroll-view scroll-x="true">
					<view class="moreLong">
						<view
							v-for="item in category" :key="item.id" class="item1" :class="{ active1: item.id == currentTab }"
							@click="categoryChose(item.id)"
						>
							{{ item.name }}
						</view>
					</view>
				</scroll-view>
			</template>
		</view>
		<view class="goods-wrapper">
			<JGoods
				v-for="item in goodsList" :key="item.id" ref="jGoodsRef" class="j-goods"
				:scroll-top="scrollTop"
				:data="item"
			></JGoods>
		</view>
	</view>
</template>

<script>
import { getTypeDetailList, getGoodsById } from '../../api/home'
export default {
	name: 'CategoryGoods',
	components: {},
	props: {},
	data() {
		return {
			id: '',
			title: '',
			category: '',
			currentTab: '',
			goodsList: '',
			scrollTop: 0
		}
	},
	computed: {},
	watch: {},
	methods: {
		async getGoodsList() {
			const res = await getGoodsById({
				categoryId: this.currentTab
			})
			console.log(res)
			this.goodsList = res.data.goodsList
		},
		categoryChose(e) {
			console.log(e)
			this.currentTab = e
			this.getGoodsList()
		},
		backTouch() {
			uni.switchTab({ url: '/pages/index/index' })
		},
		async getCategoodsList() {
			const res = await getTypeDetailList({
				id: this.id
			})
			console.log(res)
			this.title = res.data.currentCategory.name
			this.category = res.data.currentSubCategory

			// 后台原因无法上产品，将部分分类隐藏，后续记得删除
			if (this.id == 1001011) {
				var a = this.category.splice(4, 1)
				console.log(this.category)
			} else if (this.id == 100101469) {
				a = this.category.splice(2, 1)
			} else if (this.id == 100101465) {
				a = this.category.splice(1, 2)
			}
			this.currentTab = res.data.currentSubCategory[0].id
			this.getGoodsList()
		},
		async getBottomGoods() { }
	},
	onPageScroll(scrollTop) {
		this.scrollTop = scrollTop.scrollTop
	},
	// 页面周期函数--监听页面加载
	onLoad(options) {
		console.log(options)
		this.id = options.id
		this.getCategoodsList()
	},
	// 页面周期函数--监听页面初次渲染完成
	onReady() { },
	// 页面周期函数--监听页面显示(not-nvue)
	onShow() { },
	// 页面周期函数--监听页面隐藏
	onHide() { },
	// 页面周期函数--监听页面卸载
	onUnload() { },
	// 页面处理函数--监听用户下拉动作
	// onPullDownRefresh() { uni.stopPullDownRefresh(); },
	// 页面处理函数--监听用户上拉触底
	onReachBottom() {
		console.log('触底了')
	}
	// 页面处理函数--监听页面滚动(not-nvue)
	// onPageScroll(event) {},
	// 页面处理函数--用户点击右上角分享
	// onShareAppMessage(options) {},
}
</script>

<style lang="less" scoped>
.categoryGoods {
	.head {
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 20px;
		box-sizing: border-box;

		.backImg {
			width: 48upx;
			height: 48upx;
		}

		.headTitle {
			font-size: 32upx;
		}
	}

	.navs {
		display: flex;
		justify-content: space-around;
		margin-top: 30upx;
		margin-bottom: 30upx;

		.item {
			padding-bottom: 5upx;
			font-size: 28upx;

			&.active {
				color: #fa5151;
				padding-bottom: 5upx;
				border-bottom: 2px solid #fa5151;
			}
		}

		.moreLong {
			display: flex;
			white-space: nowrap;
			padding: 0 20upx;
			text-align: center;

			.item1 {
				padding-bottom: 5upx;
				margin-right: 60upx;
				font-size: 28upx;

				&.active1 {
					color: #fa5151;
					padding-bottom: 5upx;
					border-bottom: 2px solid #fa5151;
				}
			}
		}
	}

	.goods-wrapper {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		padding: 0 20upx;
	}
}
</style>
