<template>
	<view class="tabbar">
		<CommodityList v-if="currentTabIndex == 0"></CommodityList>
		<CommodityBig  v-if="currentTabIndex == 2"></CommodityBig>
	</view>
</template>

<script>
	import CommodityList from "./CommodityList.vue" // 普通的商品展示
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