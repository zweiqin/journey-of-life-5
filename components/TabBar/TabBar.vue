<template>
	<!-- line-height: 1; -->
	<view style="position: fixed;bottom: 0;z-index: 999;width: 100vw;background-color: #ffffff;box-sizing: border-box;">
		<view
			style="background-color: rgb(255 255 255 / 33%);position: absolute;left: 0;top: 0;width: 100%;height: 2upx;-webkit-transform: scaleY(.5);transform: scaleY(.5);"
		>
		</view>
		<view
			style="display: flex;justify-content: space-evenly;align-items: flex-end;height: 54px;text-align: center;color: #777777;"
		>
			<view
				style="flex: 1;display: flex;flex-direction: column;justify-content: flex-end;align-items: center;height: 100%;"
				@click="switchTab('/pages/index/index')"
			>
				<view style="margin-top: 10upx;">
					<BeeIcon width="24px" height="24px" :src="require('../../static/images/tabbar/home.png')"></BeeIcon>
				</view>
				<view style="margin-top: 3px;margin-bottom: 1px;font-size: 14px;">商城</view>
			</view>
			<view
				style="flex: 1;display: flex;flex-direction: column;justify-content: flex-end;align-items: center;height: 100%;"
				@click="switchTab('/pages/store/store')"
			>
				<view style="margin-top: 10upx;">
					<BeeIcon width="24px" height="24px" :src="require('../../static/images/tabbar/store.png')"></BeeIcon>
				</view>
				<view style="margin-top: 3px;margin-bottom: 1px;font-size: 14px;">本地生活</view>
			</view>
			<view
				style="position: relative;flex: 1;display: flex;flex-direction: column;justify-content: flex-end;align-items: center;height: 100%;"
			>
				<!-- <view style="position: absolute;bottom: 0;left: 50%;transform: translateX(-50%);">
					<view style="margin-bottom: -1px;">
					<BeeIcon width="58px" height="58px" :src="require('../../static/images/tabbar/red-wrap.png')"></BeeIcon>
					</view>
					<view style="position: relative;z-index: 1;font-size: 14px;color: #fa5151;white-space: nowrap;">抢红包</view>
					</view> -->
				<view style="position: absolute;bottom: 17px;left: 50%;transform: translateX(-50%);margin-bottom: -1px;">
					<BeeIcon width="58px" height="58px" :src="require('../../static/images/tabbar/red-wrap.png')"></BeeIcon>
				</view>
				<view style="width: 24px;height: 24px;margin-top: 10upx;"></view>
				<view
					style="position: relative;z-index: 1;margin-top: 3px;margin-bottom: 1px;font-size: 14px;color: #fa5151;white-space: nowrap;"
				>
					抢红包
				</view>
			</view>
			<view
				style="flex: 1;display: flex;flex-direction: column;justify-content: flex-end;align-items: center;height: 100%;"
				@click="switchTab('/pages/marketing-treasure-house/marketing-treasure-house')"
			>
				<view style="margin-top: 10upx;">
					<BeeIcon width="24px" height="24px" :src="require('../../static/images/tabbar/books.png')"></BeeIcon>
				</view>
				<view style="margin-top: 3px;margin-bottom: 1px;font-size: 14px;">达人广场</view>
			</view>
			<view
				style="flex: 1;display: flex;flex-direction: column;justify-content: flex-end;align-items: center;height: 100%;"
				@click="switchTab('/pages/user/user')"
			>
				<view style="margin-top: 10upx;">
					<BeeIcon width="24px" height="24px" :src="require('../../static/images/tabbar/vip.png')"></BeeIcon>
				</view>
				<view style="margin-top: 3px;margin-bottom: 1px;font-size: 14px;">会员中心</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'TabBar',
	props: {},
	methods: {
		click() {
		}
	}
}
</script>

<style lang="less" scoped></style>
