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
							<view style="display: flex;align-items: center;">
								<JAvatar
									:size="82"
									:src="common.seamingImgUrl(data.brandAvatar || data.userAvatar || 'fal17oak8m6t4ytoo1lh.webp')"
								>
								</JAvatar>
								<view style="flex: 1;margin-left: 28upx;color: #FFFFFF;">
									<view style="font-size: 38upx;font-weight: bold;">
										{{ data.brandName || data.username || '--' }}的红包
									</view>
									<view
										style="width: 100%;word-break: break-all;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
									>
										{{ data.wrapRedText.publisherText || "恭喜发财，财源滚滚" }}
									</view>
								</view>
							</view>
							<view v-if="data.wrapRedText.bindLink" style="margin-top: 20upx;text-align: center;">
								<tui-button
									type="white" plain width="340rpx" height="60rpx"
									shape="circle" style="display: inline-block;"
									@click="go(`/pages/store/goods-detail/goods-detail?orderType=1&goodsId=${data.wrapRedText.bindLink}`)"
								>
									导航到商品→
								</tui-button>
							</view>
							<view style="margin-top: 34upx;margin-bottom: 38upx;text-align: center;">
								<view style="font-size: 34upx;color: #FFCC66;">
									恭喜你获得{{ data.wrapRedText.business ? '携带优惠券' : '现金' }}红包
								</view>
								<view style="margin-top: 20upx;color: #FFE019;">
									<text style="font-size: 54upx;font-weight: bold;">{{ data.wrapRedText.redpackMonkey || '--' }}</text>
									<text style="margin-left: 6upx;font-size: 34upx;">元</text>
								</view>
								<view style="margin-top: 28upx;font-size: 26upx;color: #ffffff;">
									<view>红包已自动存入余额</view>
									<view v-if="data.wrapRedText.business">商家优惠券已自动放入券包</view>
								</view>
							</view>
							<view style="max-height: 38vh;overflow-y: auto;">
								<view style="border: 2upx solid #FFFFFF;border-radius: 28upx;overflow: hidden;">
									<image
										mode="widthFix" :src="data.wrapRedText.picUrl || '../../static/images/index/red-pic.png'"
										style="min-width: 450upx;max-width: 550upx;max-height: 50vh;vertical-align: middle;"
									/>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</tui-landscape>
	</view>
</template>

<script>
export default {
	name: 'JRedEnvelope',
	props: {
		isShow: Boolean,
		showType: Number,
		data: {
			type: Object,
			default() {
				return {
					wrapRedText: {}
				}
			}
		}
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
		top: 45%;
	}
}
</style>
