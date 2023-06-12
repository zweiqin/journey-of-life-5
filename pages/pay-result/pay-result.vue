<template>
	<view class="pay-result">
		<!-- <h2>支付结果</h2> -->

		<view class="pay-header">
			<JIcon type="voucher-recharge" width="132" height="120"></JIcon>
			<!-- <h1>订单支付</h1> -->
			<!-- <view class="nick-name">你妈妈喊你回家吃饭</view> -->
		</view>

		<view class="main">
			<view class="item">
				<view class="title">当前状态</view>
				<view
					class="value"
					:style="{
						color: isPay ? 'green' : 'red'
					}"
				>
					{{ isPay ? "支付成功" : "支付失败" }}
				</view>
			</view>

			<!-- <view class="item">
				<view class="title">支付金额</view>
				<view class="value">￥30</view>
				</view> -->

			<view class="item">
				<view class="title">支付时间</view>
				<view class="value">{{ formatTime(new Date()) }}</view>
			</view>

			<view class="item">
				<view class="title">交易单号</view>
				<view class="value">{{ orderInfo.TL_ORDER_NO }}</view>
			</view>

			<view class="item">
				<view class="title">备注说明</view>
				<view class="value">
					若超过24小时未能到账，可联系商城客服， 感谢您的理解。
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import { getPayOrderResultApi } from '../../api/goods'
const { formatTime } = require('../../utils/util')
import { grantVoucherApi } from '../../api/user'
import {
	J_USER_INFO,
	J_PAY_ORDER,
	J_PAY_TYPE
} from '../../constant'

export default {
	name: 'PayResult',
	data() {
		return {
			orderInfo: '',
			isPay: false,
			mapMethod: {
				[J_PAY_TYPE.VOUCHER.value]: this.grantVoucher,
				[J_PAY_TYPE.VIP.value]: this.getApplyHistory
			}
		}
	},

	onLoad() {
		window.addEventListener('pageshow', function (e) {
			// 通过persisted属性判断是否存在 BF Cache
			if (e.persisted) {
				location.reload()
			}
		})
		const _this = this
		const orderInfo = uni.getStorageSync(J_PAY_ORDER)
		this.orderInfo = orderInfo
		if (orderInfo) {
			getPayOrderResultApi({
				payOrderNo: orderInfo.TL_ORDER_NO
			}).then((res) => {
				_this.isPay = res.errno === 0

				if (_this.isPay) {
					_this.$showToast(
						J_PAY_TYPE[orderInfo.type].success || '支付成功',
						'success'
					);
					['VOUCHER', 'VIP'].includes(orderInfo.type) &&
						this.mapMethod[orderInfo.type]()
				}
			})
		}
	},

	methods: {
		formatTime,

		// 发放代金劵
		grantVoucher() {
			const _this = this
			grantVoucherApi({
				orderId: _this.orderInfo.JF_ORDER_NO
			}).then(() => {
			})
		},

		// 会员升级
		getApplyHistory() {
			const _this = this
			uni.showLoading({
				title: '加载中'
			})
		}
	}
}
</script>

<style lang="less" scoped>
.pay-result {
  padding: 34upx;
  box-sizing: border-box;
  font-size: 28upx;

  h2 {
    text-align: center;
  }

  .pay-header {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 88upx 0;

    h1 {
      font-size: 48upx;
      margin: 20upx 0 8upx 0;
    }
  }

  .main {
    .item {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      margin-bottom: 56upx;

      .title {
        white-space: nowrap;
        margin-right: 140upx;
      }

      .value {
        word-break: break-all;
      }
    }
  }
}
</style>
