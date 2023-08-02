<template>
	<view style="width: 100%;background-clip: #ffffff;">
		<view class="goods-filter-container">
			<tui-dropdown-list 	v-for="item in filterMenu" :key="item.value" :show="item.isShow" :top="40" :height="400">
				<template v-slot:selectionbox>
					<view
						class="item" @click="item.isShow = !item.isShow">
						{{item.name}}
					</view>
				</template>
				<template v-slot:dropdownbox>
					<view class="SelectList">
						<view class="SelectItem" v-for="seleteItem in item.children">
							{{seleteItem.name}}
						</view>
					</view>
				</template>
			</tui-dropdown-list>
		</view>
		<!-- <view class="goods-filter-container" :class="{ fixed: scrollTop > top + 200 }"
			style="position: relative;z-index: 1000000000;background-color: #FFFFFF;">
			<view v-for="item in filterMenu" :key="item.value" class="item" @click="handleFilter(item)">
				<text :style="{ color: item.color }">{{ item.name }}</text>
				<BeeIcon :size="14" :src="item.icon"></BeeIcon>
			</view>
		</view> -->
	<!-- 	<tui-top-dropdown :show="true" :paddingbtm="110" :translatey="216" @close="btnCloseDrop">
			<scroll-view class="tui-scroll-box" scroll-y scroll-with-animation :scroll-top="scrollTop">
				<view class="tui-seizeaseat-20"></view>
				<view class="tui-drop-item" :class="[item.selected?'tui-bold':'']" v-for="(item,index) in proDropData"
					:key="index" @tap.stop="btnSelected" :data-index="index">
					<tui-icon name="check" :size="16" color="#5677fc" :bold="true" v-if="item.selected"></tui-icon>
					<text class="tui-ml tui-middle">{{item.name}}</text>
				</view>
				<view class="tui-seizeaseat-30"></view>
			</scroll-view>
			<view class="tui-drop-btnbox">
				<view class="tui-drop-btn tui-button-white" hover-class="tui-button-white_hover" :hover-stay-time="150"
					@tap="reset">重置</view>
				<view class="tui-drop-btn tui-button-primary" hover-class="tui-button-hover" :hover-stay-time="150"
					@tap="btnCloseDrop">确定</view>
			</view>
		</tui-top-dropdown> -->
		<SynthesizePopup :translatey="translatey" v-model="visible.synthesizePopupVisible"></SynthesizePopup>
	</view>
</template>

<script>
	import tuiTopDropdown from "@/components/thorui/tui-top-dropdown/tui-top-dropdown.vue"
	import SynthesizePopup from './cpns/SynthesizePopup.vue'
	import {
		filterMenu
	} from './data'

	const mapComponent = {
		0: 'synthesizePopupVisible'
	}

	export default {
		name: 'GoodsFilter',
		components: {
			SynthesizePopup,
			tuiTopDropdown
		},
		props: {
			scrollTop: {
				type: Number,
				required: true
			}
		},
		data() {
			return {
				isShow: false,
				filterMenu: filterMenu,
				top: 0,
				visible: {
					synthesizePopupVisible: false
				}
			}
		},

		computed: {
			translatey() {
				return this.top - this.scrollTop
			}
		},

		mounted() {
			this.getPosition()
		},

		methods: {
			// showList() {
			// 	this.isShow = !this.isShow
			// },
			async getPosition() {
				const res = await this._getSize('.goods-filter-container')
				this.top = res.top + res.height
			},

			// 点击显示筛选
			handleFilter(item) {
				console.log(item)
				// this.visible[mapComponent[item.value]] = true
			}
		}
	}
</script>

<style lang="less" scoped>
	.goods-filter-container {
		display: flex;
		align-items: center;
		justify-content: space-around;
		transition: background 350ms;
		.SelectList {
			width: 120rpx;
			height: auto;
			background-color: #fff;
		}

		&.fixed {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			background-color: #fff;
			padding: 20upx 22upx 22upx 22upx;
			box-sizing: border-box;
			z-index: 100000;
		}

		.item {
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}
	}
</style>