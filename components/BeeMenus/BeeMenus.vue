<template>
	<view class="menus-container">
		<view v-if="data.length > 8">
			<view v-if="showAll" style="display: flex;align-items: center;justify-content: flex-start;flex-wrap: wrap;">
				<view
					v-for="item in data" :key="item.name" class="menu-bar-item" :style="{ width: 100 / column + '%' }"
					@click="$emit('click', item)"
				>
					<BeeIcon
						:src="item[picUrl] || 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/1yjzs7kydjhax41329lf.png'"
						:size="40"
					></BeeIcon>
					<text>{{ item[name] }}</text>
				</view>
			</view>
			<view v-else style="display: flex;align-items: center;justify-content: flex-start;flex-wrap: wrap;">
				<view
					v-for="item in data.slice(0, 7)" :key="item.name" class="menu-bar-item" :style="{ width: 100 / column + '%' }"
					@click="$emit('click', item)"
				>
					<BeeIcon
						:src="item[picUrl] || 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/1yjzs7kydjhax41329lf.png'"
						:size="40"
					></BeeIcon>
					<text>{{ item[name] }}</text>
				</view>
				<view class="menu-bar-item" :style="{ width: 100 / column + '%' }" @click="handleClickMore">
					<BeeIcon
						src="../../static/index/earn-money/xiangxiajiantou.png"
						:size="40"
					></BeeIcon>
					<text style="color: #888888;">更多</text>
				</view>
			</view>
		</view>
		<view v-else style="display: flex;align-items: center;justify-content: flex-start;flex-wrap: wrap;">
			<view
				v-for="item in data" :key="item.name" class="menu-bar-item" :style="{ width: 100 / column + '%' }"
				@click="$emit('click', item)"
			>
				<BeeIcon
					:src="item[picUrl] || 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/1yjzs7kydjhax41329lf.png'"
					:size="40"
				></BeeIcon>
				<text>{{ item[name] }}</text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'BeeMenus',
	props: {
		data: {
			type: Array,
			required: true
		},

		column: {
			type: Number,
			default: 4
		},

		name: {
			type: String,
			default: 'storeName'
		},

		picUrl: {
			type: String,
			default: 'picUrl'
		}
	},
	data() {
		return {
			showAll: false
		}
	},
	methods: {
		handleClickMore() {
			this.showAll = true
		}
	}
}
</script>

<style lang="scss" scoped>
.menus-container {
	background-color: #fff;
	padding: 30upx 0 0 0;
	border-radius: 20upx;
	margin-top: 16upx;

	.menu-bar-item {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-bottom: 24upx;
	}
}
</style>
