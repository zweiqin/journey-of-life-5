<template>
	<view>
		<view>
			<!-- url为要跳转外链的地址-->
			<web-view :src="url">
			</web-view>
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
		this.url = val.url + "&token=" + val.token + "&timestamp=" + val.timestamp
			+ "&sign=" + val.sign;
		// 设置当前的title 如果外链中有的话将被覆盖
		if (this.isNotEmpty(val.title)) {
			this.setTitle(val.title);
		}
	},
	methods: {
		isNotEmpty(obj) {
			if (typeof obj == undefined || obj == null || obj == "" || obj == "undefined" || obj.length == 0) {
				return false;
			} else {
				return true;
			}
		},
		// 设置title
		setTitle(title) {
			uni.setNavigationBarTitle({
				title: title
			})
		},
	}
}
</script>

<style lang="less" scoped>
.phone-bill {
	width: 100%;
	min-height: 100vh;
	padding: 20upx;
	box-sizing: border-box;
	background: linear-gradient(180deg, #ffffff 0%, #f6f6f6 10%);

	.header {
		width: 100%;
		display: flex;
		align-items: center;

		/deep/ .bee-address-container {
			flex: 1;
		}

		.address-wrapper {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.current-addresss {
				font-size: 32upx;
				font-weight: 500;
			}
		}
	}

	.banner-wrapper {
		padding: 28upx 0;

		image {
			width: 100%;
			height: 200upx;
			border-radius: 20upx;
		}
	}

	.mid {
		padding: 0upx 22upx;
		border-radius: 20upx 20upx 0upx 0upx;
		background: linear-gradient(180deg, #FFFFFF 0%, #FDFAFA 122%);

		.bar-list {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 44upx 0 68upx 0;

			.bar {
				width: 112upx;
				display: flex;
				flex-direction: column;
				align-items: center;

				image {
					width: 80upx;
					height: 80upx;
				}

				.text {
					font-size: 28upx;
					color: #000000;
				}
			}
		}

		.coupon-list {
			display: flex;
			justify-content: space-between;
			padding-bottom: 30upx;

			.coupon {
				image {
					width: 152upx;
					height: 192upx;
				}
			}
		}
	}
}
</style>
