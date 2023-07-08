<template>
	<view class="tabbar">
		<tui-tabs color="#000" selectedColor="#000" size="35" sliderBgColor="#FB5D5D" :tabs="tabs" bold :currentTab="currentTab" @change="change"></tui-tabs>
	</view>
</template>

<script>
	import tuiTabs from "@/components/thorui/tui-tabs/tui-tabs.vue"
	export default {
		components: {
			tuiTabs
		},
		data() {
			return {
				currentTab: 0,
				tabs: [{
					name: "新品"
				}, {
					name: "团购"
				}, {
					name: "预约"
				}, {
					name: "会员",
				}, {
					name: "抽奖",
				}]
			};
		},
		methods: {
			change(e) {
				this.currentTab = e.index
			}
		}
	}
</script>

<style lang="scss">
	.tabbar {
		background-color: white;
		margin-top: 19rpx;
	}
</style>