<template>
	<view>
		<view>
			<!-- url为要跳转外链的地址-->
			<!-- #ifdef APP -->
			<web-view :src="url"></web-view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="ddd">
				<iframe :src="url" height="100%" width="100%"></iframe>
			</view>
			<!-- #endif -->
		</view>
	</view>
</template>

<script>
// import { items, coupons ,tests ,tests1} from './data'
// import { RuanRequest,getUserId } from "../../../utils"
// import { payOrderGoodsApi } from "../../../api/goods"
export default {
		data() {
			return {
				url: ''
			}
		},
		onLoad(val) {
			console.log(val);
			this.url=val.url + "&token=" + val.token + "&timestamp=" + val.timestamp
			+ "&sign=" + val.sign;
		},
		methods: {
			isNotEmpty(obj) {
				if (typeof obj == undefined || obj == null || obj == "" || obj == "undefined" || obj.length == 0) {
					return false;
				} else {
					return true;
				}
			},
		}
	}
</script>
<style>
	.ddd {
		height: 100vh;
	}
</style>