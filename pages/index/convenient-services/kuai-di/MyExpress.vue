<template>
	<view class="ExpressServiceContainer">
		<NavHeader :BindClick="goBack"></NavHeader>
		<!-- 用于填充因定位而失去的高度 -->
		<view class="NavHeader"></view>  
		<MyExpress></MyExpress>
		<SubsetTabbar currIndex="2"></SubsetTabbar>
		<!-- 用于填充因定位而失去的高度 -->
		<view class="SubsetTabbar"></view>
	</view>
</template>

<script>
	import SubsetTabbar from "./components/SubsetTabbar.vue";
	import MyExpress from "./components/MyExpress.vue";
	import NavHeader from "./components/header.vue";
	export default {
		components: {
			SubsetTabbar,
			NavHeader,
			MyExpress
		},
		data() {
			return {
				
			};
		},
		methods: {
			goBack() {
				uni.navigateBack()
			},
		}
	}
</script>

<style lang="scss">
.ExpressServiceContainer {
	min-height: 100vh;
	background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);
}
.NavHeader {
	height: 88rpx;
}
.SubsetTabbar {
	height: 113rpx;
}
</style>
