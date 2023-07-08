<template>
	<view class="tabbar">
		<tui-tabs class="SimulatedCap tabNav" v-show="isFixed" color="#000" selectedColor="#000" size="35"
			sliderBgColor="#FB5D5D" :tabs="tabs" bold :currentTab="currentTab" @change="change"></tui-tabs>
			
		<tui-tabs class="tabNav" :style="{opacity: isFixed?0:1 }" color="#000" selectedColor="#000" size="35"
			sliderBgColor="#FB5D5D" :tabs="tabs" bold :currentTab="currentTab" @change="change"></tui-tabs>
		<view class="tabsItem">
			
		</view>
	</view>
</template>

<script>
	import tuiTabs from "@/components/thorui/tui-tabs/tui-tabs.vue"
	export default {
		props: {
			isFixed: {
				type: Boolean,
				default: false,
			}
		},
		components: {
			tuiTabs
		},
		watch: {
			isFixed(value) {
				console.log(value)
			}
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
				}],
				scrollToptwo: 0,
			};
		},
		methods: {
			change(e) {
				this.currentTab = e.index
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tabbar {
		width: 100vw;
		height: 150vh;
		overflow: hidden;
		background-color: white;
		margin-top: 19rpx;

		.SimulatedCap {
			position: fixed;
			top: 6vh !important;
			left: 0;
		}
		.tabsItem {
			width: 100vw;
			height: 200rpx;
			background-color: aqua;
		}
	}
</style>