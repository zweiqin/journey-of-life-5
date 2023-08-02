<template>
	<tui-card :title="{ text: `${goodsData.storeName}` }" :tag="{ text: `${goodsData.goodsId || ''}` }" style="margin: 0;">
		<template #body>
			<view style="padding: 16upx 24upx 26upx;font-size: 28upx;">
				<view style="display: flex;align-items: center;">
					<view>
						<BeeIcon :src="common.seamingImgUrl(goodsData.thumbnail || goodsData.picUrl)" :size="84"></BeeIcon>
					</view>
					<view style="margin-left: 20upx;">
						<view
							style="word-break: break-all;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
						>
							<text>{{ goodsData.goodsName || '--' }}</text>
						</view>
						<view>
							<text>佣金金额：</text>
							<text style="color: #eb0909;">￥{{ goodsData.commission || '--' }}</text>
						</view>
						<view
							style="display: flex;justify-content: space-between;word-break: break-all;display: -webkit-box;overflow: hidden;-webkit-box-orient: vertical;-webkit-line-clamp: 2;"
						>
							<text>规格：</text>
							<text>{{ goodsData.specs || '--' }}</text>
						</view>
					</view>
				</view>
				<view style="padding: 25upx 25upx 0;">
					<view style="display: flex;justify-content: space-between;">
						<view>
							<text>价格：￥</text>
							<text>{{ goodsData.price || '--' }}</text>
						</view>
						<view>
							<text>库存：</text>
							<text>{{ goodsData.quantity || '--' }}</text>
						</view>
					</view>
				</view>
			</view>
		</template>
		<template #footer>
			<slot></slot>
		</template>
	</tui-card>
</template>

<script>
// import { getUserId, getBrandId } from '../../../../utils'

export default {
	name: 'DistributedGoods',
	props: {
		goodsData: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
		}
	},

	watch: {},

	mounted() {
		// console.log(this.$refs)
	},

	methods: {
	}
}
</script>

<style lang="less" scoped></style>
