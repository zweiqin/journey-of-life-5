<template>
	<view class="businessSearch">
		<view class="searchImg"><tui-icon name="search" bold :size="22" color="#777777"></tui-icon></view>
		<input class="searchInput" placeholder="输入手机号或昵称搜索" placeholder-class="input-placeholder" @input="importInput" />
	</view>
</template>

<script>
import { handleDebounce } from '../../../../utils'
export default {
	name: 'BusinessSearch',
	props: {},
	data() {
		return { searchText: '', importInput: '' }
	},
	mounted() {
		this.importInput = handleDebounce(this.search, 500)
	},
	methods: {
		search(e) {
			console.log(e.detail.value)
			this.searchText = e.detail.value
			this.$emit('select', this.searchText)
		}
	}
}
</script>

<style lang="less" scoped>
.businessSearch {
	display: flex;
	background: #efefef;
	border-radius: 40upx;
	padding: 16upx 0;

	.searchImg {
		margin: 0 32upx;
	}

	.searchInput {
		flex: 1;
		font-size: 28upx;
	}

	.input-placeholder {
		font-size: 28upx;
	}
}
</style>
