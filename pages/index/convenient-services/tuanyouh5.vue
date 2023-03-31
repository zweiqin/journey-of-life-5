<template>
	<view>
		<view>
			<!-- #ifdef APP -->
			<web-view :src="url"></web-view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="fullcrseen">
				<iframe :src="url" height="100%" width="100%" frameborder="0"></iframe>
			</view>
			<!-- #endif -->
		</view>
	</view>
</template>
<script>
export default {
	data() {
		return {
			url: ''
		}
	},
	onLoad(val) {
		this.url=val.url + "&token=" + val.token + "&timestamp=" + val.timestamp + "&sign=" + val.sign;
	},
	methods: {
	}
}
</script>
<style>
	.fullcrseen {
		height: 100vh;
	}
</style>