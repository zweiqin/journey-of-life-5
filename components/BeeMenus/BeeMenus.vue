<template>
	<view class="menus-container">
		<view class="menu-bar-item" :style="{ width: 100 / column + '%' }" v-for="item in data" :key="item.name"
			@click="$emit('click', item)">
			<BeeIcon :src="item[picUrl] || 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/1yjzs7kydjhax41329lf.png'" :size="40"></BeeIcon>
			<text>{{ item[name] }}</text>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		data: {
			type: Array,
			required: true,
		},

		column: {
			type: Number,
			default: 4,
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
}
</script>

<style lang="scss" scoped>
.menus-container {
	display: flex;
	align-items: center;
	justify-content: space-between;
	flex-wrap: wrap;
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
