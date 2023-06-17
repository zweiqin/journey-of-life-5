<template>
	<view class="j-red-envelope">
		<tui-landscape
			:show="isShow" :position="1" :close-icon="showType === 0 ? false : true"
			:mask-closable="showType === 0 ? true : false" icon-left="50rpx" icon-right="50rpx" @close="$emit('close')"
		>
			<view>
				<view v-if="showType === 0">
					<view @click="$emit('click-red')">
						<image
							mode="heightFix" src="../../static/images/index/red-wrap.png"
							style="min-height: 45vh;max-height: 5vh;"
						/>
					</view>
				</view>
				<view v-else-if="showType === 1">
					<view
						style="padding-bottom: 22upx;background: linear-gradient(180deg, #70391C 93%, #8E2216 99%);border-radius: 48upx;"
					>
						<view class="j-red-envelope-container">
							<view style="display: flex;">
								<JAvatar
									:size="82"
									:src="avatar || 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/fal17oak8m6t4ytoo1lh.webp'"
								>
								</JAvatar>
								<view style="flex: 1;margin-left: 28upx;color: #FFFFFF;">
									<view style="font-weight: bold;">{{ name || '--' }}的红包</view>
									<view style="width: 100%;word-break: break-all;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;-webkit-line-clamp: 2;">
										{{ desc || "恭喜发财，财源滚滚" }}
									</view>
								</view>
							</view>
							<view style="margin-top: 20upx;border: 2upx solid #FFFFFF;border-radius: 28upx;overflow: hidden;">
								<!-- https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/6es7jzqcs3atdn7qyhxg.png -->
								<image
									mode="widthFix" :src="src || '../../static/images/index/red-pic.png'"
									style="min-width: 450upx;max-width: 550upx;max-height: 50vh;vertical-align: middle;"
								/>
							</view>
							<view style="margin-top: 18upx;;font-size: 26upx;text-align: center;">红包会自动存入余额</view>
						</view>
					</view>
				</view>
			</view>
		</tui-landscape>
	</view>
</template>

<script>
export default {
	props: {
		isShow: Boolean,
		showType: Number,
		avatar: String,
		desc: String,
		src: String,
		name: String
	},

	data() {
		return {
		}
	}
}
</script>

<style lang="less" scoped>
.j-red-envelope {
	.j-red-envelope-container {
		width: 100%;
		padding: 48upx 40upx 36upx 40upx;
		background: linear-gradient(180deg, #F58F5A 0%, #F53F2A 100%);
		border-radius: 38upx 38upx 48upx 48upx;
		box-sizing: border-box;
	}

	/deep/ .tui-landscape__inner {
		top: 40%;
	}
}
</style>
