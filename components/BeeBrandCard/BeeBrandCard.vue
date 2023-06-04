<template>
	<view style="width: 100%;margin: 0 auto 45upx;background-color: #fff;border-radius: 10upx;box-sizing: border-box;">
		<view style="width: 100%;max-height: 400upx;overflow: hidden;">
			<image
				:src="common.seamingImgUrl(brand.picUrl)" mode="widthFix" style="width: 100%;border-radius: 10upx 10upx 0 0;"
				@click="go('/pages/store/detail/detail?brandId=' + brand.id)"
			/>
		</view>
		<view style="padding: 15upx;">
			<view style="font-size: 28upx;font-weight: bold;">{{ brand.name }}</view>
			<view style="margin-top: 8upx;font-size: 24upx;color: #777777;">
				{{ brand.distance || 0 }} km | {{ brand.browse || 0 }}浏览量
			</view>
			<view style="display: flex;flex-wrap: wrap;">
				<view
					v-if="brand.perCapita"
					style="width: fit-content;margin-top: 8upx;margin-right: 8upx;padding: 0 4upx;border: 0.25px solid #FA5151;border-radius: 12upx;font-size: 12upx;color: #FA5151;"
				>
					人均 ￥{{ brand.perCapita }}
				</view>
				<view
					v-if="brand.voucherNum"
					style="width: fit-content;margin-top: 8upx;margin-right: 8upx;padding: 0 4upx;border: 0.25px solid #51cc46;border-radius: 12upx;font-size: 12upx;color: #51cc46;"
				>
					{{ brand.voucherNum }}代金券/次
				</view>
			</view>
			<view style="margin-top: 8upx;font-size: 24upx;color: #FA5151;">
				￥ <text style="font-weight: bold;font-size: 34upx;">{{ brand.floorPrice }}</text>起
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'BeeBrandCard',
	props: {
		brand: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			// templateData: Object.freeze(templateData)
		}
	}
}
</script>

<style lang="less" scoped></style>
