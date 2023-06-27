<template>
	<tui-card :title="{ text: titleInside ? '' : `规则 ${rulesData.id}` }" :tag="{ text: titleInside ? '' : `${rulesData.addTime || ''}` }" style="margin: 0;">
		<template #body>
			<view v-if="titleInside" style="display: flex;justify-content: space-between;font-size: 28upx;">
				<text style="flex: 1;">关联规则ID：{{ rulesData.id }}</text>
				<text style="color: #b2b2c3;">{{ rulesData.addTime }}</text>
			</view>
			<view style="padding: 16upx 24upx 26upx;font-size: 28upx;">
				<view style="display: flex;align-items: center;">
					<view>
						<BeeIcon :src="common.seamingImgUrl(rulesData.picUrl)" :size="84"></BeeIcon>
					</view>
					<view style="margin-left: 20upx;">
						<view>
							<text>关联商品名称：</text>
							<text>{{ rulesData.goodsName || '--' }}</text>
						</view>
						<view>
							<text>关联商品ID：</text>
							<text>{{ rulesData.goodsId || '--' }}</text>
						</view>
					</view>
				</view>
				<slot name="goodsContent"></slot>
				<view style="padding: 25upx 25upx 0;">
					<view style="display: flex;justify-content: space-between;">
						<text>优惠金额：</text>
						<text>{{ rulesData.discount || '--' }}</text>
					</view>
					<view style="display: flex;justify-content: space-between;">
						<text>团购人数要求：</text>
						<text>{{ rulesData.discountMember || '--' }}</text>
					</view>
					<view style="display: flex;justify-content: space-between;">
						<text>过期时间：</text>
						<text>{{ rulesData.expireTime || '--' }}</text>
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
	name: 'GrouponRules',
	props: {
		rulesData: {
			type: Object,
			required: true
		},
		titleInside: {
			type: Boolean,
			default: false
		}
	},

	data() {
		return {
		}
	},

	watch: { },

	mounted() {
		// console.log(this.$refs)
	},

	methods: {
	}
}
</script>

<style lang="less" scoped>
</style>
