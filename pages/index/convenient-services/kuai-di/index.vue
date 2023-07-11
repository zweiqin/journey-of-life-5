<template>
	<view class="ExpressServiceContainer">
		hellow world!!
	</view>
</template>

<script>
	import {
		getUserId
	} from '@/utils';
	import {
		getBianminRecordKuaidiApi,
		getKuaidi100ComApi,
		getKuaidi100PriceApi,
		addKuaidi100CorderApi,
		orderCancelApi
	} from '@/api/convenient-services';
	export default {
		name: 'KuaiDi',
		props: {

		},
		data() {
			return {
				data: null,
			}
		},
		created() {
			getBianminRecordKuaidiApi().then(res => {
				console.log(res)
			})
		},
		methods: {

		}
	}
</script>

<style lang="less" scoped>
	.xxx {
		width: 100%;
		min-height: 100vh;
		padding: 0 30upx;
		box-sizing: border-box;
		background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);

	}
</style>