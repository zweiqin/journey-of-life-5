<template>
	<view class="promotionBrokerage">
		<view class="title">
			<view class="leftDetail">
				<view
					v-for="item in brokerageTime"
					:key="item.value"
					class="detail"
					:class="{ choseTime: item.value == currentTab }"
					@click="touchTime(item.value)"
				>
					{{ item.label }}
				</view>
			</view>
			<view class="titleRight">
				<image
					class="moneyIcon"
					src="../image/moneyIcon.png"
					mode="scaleToFill"
				/>
				<view class="moneyText">收入佣金</view>
			</view>
		</view>
		<view class="brokerageDetail">
			<view
				v-for="item in brokerageTitle"
				:key="item.value"
				class="detailTitle"
			>
				<view class="titleText">
					{{ item.label }}
				</view>
				<view class="money">
					{{ item.money | nums }}
				</view>
			</view>
		</view>
		<view class="explain">
			（本页收入统计仅包含已经结算部分，不含未结算部分、已提现收入、
			未提现收入、提现中收入、团队粉丝不随周期变化）
		</view>
	</view>
</template>

<script>
import { brokerageTime, brokerageTitle } from './config'
export default {
	name: 'PromotionBrokerage',
	filters: {
		nums(num) {
			num = num.toString().split('.') // 分隔小数点
			var arr = num[0].split('').reverse() // 转换成字符数组并且倒序排列
			var res = []
			for (var i = 0, len = arr.length; i < len; i++) {
				if (i % 3 === 0 && i !== 0) {
					res.push(',') // 添加分隔符
				}
				res.push(arr[i])
			}
			res.reverse() // 再次倒序成为正确的顺序
			if (num[1]) {
				// 如果有小数的话添加小数部分
				res = res.join('').concat('.' + num[1])
			} else {
				res = res.join('')
			}
			return res
		}
	},
	props: {
		data: [String, Object]
	},
	data() {
		return { brokerageTime, brokerageTitle, currentTab: 0 }
	},
	watch: {},

	// 组件周期函数--监听组件挂载完毕
	mounted() {},
	// 组件周期函数--监听组件数据更新之前
	beforeUpdate() {},
	// 组件周期函数--监听组件数据更新之后
	updated() {},
	// 组件周期函数--监听组件激活(显示)
	activated() {},
	// 组件周期函数--监听组件停用(隐藏)
	deactivated() {},
	// 组件周期函数--监听组件销毁之前
	beforeDestroy() {},
	methods: {
		touchTime(tab) {
			this.currentTab = tab
			this.$emit('dayNumber', tab)
		}
	}
}
</script>

<style lang="less" scoped>
.promotionBrokerage {
  border: 1px solid #d8d8d8;
  border-radius: 10upx;
  .title {
    margin: 10upx 0;
    display: flex;
    padding: 0 16upx 0 0;
    justify-content: space-around;
    border-bottom: 1px solid #d8d8d8;

    .leftDetail {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .detail {
        font-size: 26upx;
        padding: 6upx 12upx;
        border-radius: 10upx;
        color: #ff8f1f;
        &.choseTime {
          background: #07b9b9;
          color: white;
        }
      }
    }

    .titleRight {
      display: flex;
      margin: 10upx 2upx;
      padding-left: 20upx;
      align-items: center;
      border-left: 6upx solid #d8d8d8;
      .moneyIcon {
        width: 48upx;
        height: 48upx;
        margin-right: 10upx;
      }
      .moneyText {
        font-size: 26upx;
      }
    }
  }
  .brokerageDetail {
    .detailTitle {
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #d8d8d8;
      margin: 20upx 32upx;
      padding: 10upx 20upx 12upx 20upx;
      .titleText {
        font-size: 26upx;
        color: #3d3d3d;
      }
      .money {
        font-size: 26upx;
        color: #fa5151;
      }
    }
  }
  .explain {
    color: #999999;
    font-size: 26upx;
    padding: 0 46upx;
    margin-bottom: 30upx;
  }
}
</style>
