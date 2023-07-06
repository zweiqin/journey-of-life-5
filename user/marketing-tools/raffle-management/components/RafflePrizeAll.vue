<template>
	<view>
		<view v-for="(item, index) in prizeData" :key="index" class="" style="padding-bottom: 35upx;">
			<tui-card
				:title="{ text: `${item.name}` }" :tag="{ text: `${new Date(item.createTime).toLocaleString() || '--'}` }"
				:image="{ url: common.seamingImgUrl(item.url), width: 108 }" style="margin: 0;"
			>
				<template #body>
					<view style="padding: 10upx 32upx;">
						<view>
							<text>奖品类型：</text>
							<text v-if="item.type === 1">红包</text>
							<text v-else-if="item.type === 2">积分</text>
							<text v-else-if="item.type === 3">体验金</text>
							<text v-else-if="item.type === 4">谢谢惠顾</text>
							<text v-else>--</text>
						</view>
						<view>
							<text v-if="item.type === 1">红包金额：</text>
							<text v-else-if="item.type === 2">积分数量</text>
							<text v-else-if="item.type === 3">体验金数量</text>
							<text v-else-if="item.type === 4">谢谢惠顾</text>
							<text v-else>--</text>
							<text v-if="item.type !== 4">{{ item.value }}</text>
						</view>
						<view>位置：{{ item.position || '--' }}</view>
						<view>中奖次数（期数）：{{ item.phase }}</view>
					</view>
				</template>
				<template #footer>
					<view style="display: flex;justify-content: flex-end;">
						<tui-button
							v-if="showSelectBtn" type="warning" width="120rpx" height="50rpx"
							shape="circle" margin="0 20upx 0 0"
							style="display: inline-block;"
							@click="$emit('select', item)"
						>
							选择
						</tui-button>
						<slot></slot>
					</view>
				</template>
			</tui-card>
		</view>
	</view>
</template>

<script>
// import { getUserId, getBrandId } from '../../../../utils'

export default {
	name: 'RafflePrizeAll',
	props: {
		showSelectBtn: {
			type: Boolean,
			default: false
		},
		prizeData: {
			type: Array,
			required: true
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
