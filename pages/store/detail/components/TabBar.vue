<template>
	<view class="tabbar">
		<CommodityList v-if="currentTabIndex == 0"></CommodityList>
		<sliderSelection v-if="currentTabIndex == 1"></sliderSelection>
		<CommodityBig  v-if="currentTabIndex == 2"></CommodityBig>
	</view>
</template>

<script>
	import CommodityList from "./CommodityList.vue" // 普通的商品展示
	import sliderSelection from "./sliderSelection.vue"  // 用于滑块选择商品的组件
	import CommodityBig from "./CommodityBig.vue" // 预约页独占一行的商品展示
	export default {
		props: {
			currentTabIndex: {
				type: [Number,String],
				default: 1
			}
		},
		components: {
			CommodityList,
			sliderSelection,
			CommodityBig
		},
		watch: {
			currentTabIndex(value) {
				console.log(value)
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar {
		width: 100vw;
		height: auto;
		// height: 150vh;
		// background-color: aqua;
	}
</style>