<template>
	<view class="calendar-box">
		<!-- <view class="top">
			<view>
			<h4>已连续签到 <span> 9 </span> 天</h4>
			<p>今日获得+7积分</p>
			</view>
			<view class="rig">
			<span>补签</span>
			</view>
			</view> -->
		<view class="miss_box">
			<view class="month">
				<!-- <view @click="lastMonth">上月</view> -->
				<view>已累计签到<text>9</text>天</view>
				<view>{{ year }}年{{ month }}月</view>
				<!-- <view @click="nextMonth">下月</view> -->
				<picker v-if="checkDate" class="picker" mode="date" fields="month" @change="changeDate" />
			</view>
			<view style="padding: 0 28rpx;">
				<view class="week" style="border-bottom: 1px solid #D8D8D8;">
					<view v-for="weeks in weekArr" :key="weeks" :style="'color:' + (weeks == weeked ? bgweek : '') + ';'">
						{{ weeks
						}}
					</view>
				</view>
				<!-- 日期显示/选择区 -->
				<view class="day">
					<view
						v-for="(days, index) in dayArr" :key="index"
						:class="[{ 'checkday': days.date == '' }, { 'choose': days.date == localDate || days.flag }]"
						:style="'background:' + (days.date == localDate || days.flag ? bgday : '') + ';'"
						@click="signToday(days, index)"
					>
						{{ days.day }}
						<view :class="[{ 'circle': days.flag }, { 'repair': days.day < day }, { 'sign': days.day == day }]"></view>
					</view>
				</view>
			</view>
			<view class="but">
				<button
					:disabled="thisMonth == month ? false : true"
					:style="'background:' + (thisMonth == month ? bgday : '#666') + ';'"
					@click="daySign(dayArr[aheadDay + day - 1])"
				>
					签到
				</button>
			</view>
			<view class="rule-list">
				<view>签到规则</view>
				<view class="text">?</view>
			</view>
		</view>

	</view>
</template>

<script>
import { addUserSignInApi, getUserSignInListApi, getUserSigninContinuousApi } from '@/api/user'
import { getUserId, transformNumber } from '@/utils'
export default {
	props: {
		lang: {
			type: String,
			default: 'zh'
		},
		type: {
			type: String,
			default: 'calendar'
		},
		checkDate: {
			type: Boolean,
			default: false
		},
		bgweek: {
			type: String,
			default: '#FF8F22'
		},
		bgday: {
			type: String,
			default: '#FF8F22'
		}
	},
	data() {
		return {
			weeked: '', // 今天周几
			dayArr: [], // 当前月每日
			localDate: '', // 今天日期
			day: new Date().getDate(), // 当前日
			year: new Date().getFullYear(), // 当前年
			month: new Date().getMonth() + 1, // 当前月
			weekArr: ['日', '一', '二', '三', '四', '五', '六'], // 每周
			aheadDay: 0,	// 前方空白天数数量
			thisMonth: new Date().getMonth() + 1
		}
	},
	created() {
		getUserSignInListApi({ userId: getUserId() }).then((res) => {
			console.log(res)
		})
	},
	mounted() {
		const that = this
		// 初始日期
		that.initDate()
		// 今天日期
		that.localDate = that.year + '-' + that.formatNum(that.month) + '-' + that.formatNum(that.day)
		// 中英切换
		if (that.lang != 'zh') that.weekArr = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
		// 今天周几
		that.weeked = that.weekArr[new Date().getDay()]
		// 签到功能
		if (that.type != 'calendar') {
			for (const i in that.dayArr) {
				that.$set(that.dayArr[i], 'flag', false)
			}
		}
	},
	methods: {
		// 选择年月
		changeDate(e) {
			const that = this
			that.year = parseInt(e.detail.value.split('-')[0])
			that.month = parseInt(e.detail.value.split('-')[1])
			that.initDate()
		},
		// 今日签到
		daySign(obj) {
			// 今天日期加上前方空白日期数量
			const index = this.aheadDay + this.day - 1
			this.$set(this.dayArr[index], 'flag', true)
			this.$emit('change', obj.date)
			uni.showToast({
				title: '已签到',
				icon: 'success'
			})
		},
		// 点击补签
		signToday(obj, index) {
			const that = this
			// 指定签到类型可访问
			if (that.type == 'calendar') return
			// 限制本月可进行签到
			if ((new Date().getMonth() + 1) != parseInt(obj.date.split('-')[1])) return
			console.log(obj, that.day)
			// 禁用非本月点击签到且限制签到日期小于本日
			if (obj.date != '' && obj.day < that.day) {
				// 开启已签到提醒
				if (that.dayArr[index].flag) {
					uni.showToast({
						title: '已签到',
						icon: 'none'
					})
				} else {
					uni.showToast({
						title: that.day > obj.day ? '补签成功' : '签到成功',
						icon: 'success'
					})
					that.$set(that.dayArr[index], 'flag', true)
					that.$emit('change', obj.date)
				}
			}
		},
		// 初始化日期
		initDate() {
			const that = this
			that.dayArr = []
			// 当前月总天数
			const totalDay = new Date(that.year, that.month, 0).getDate()
			// 遍历总天数将日期逐个添加至数组
			for (let i = 1; i <= totalDay; i++) {
				// 得到需补充天数
				const value = new Date(that.year, that.month - 1, i).getDay()
				// 补充前面空白日期
				if (i == 1 && value != 0) {
					that.addBefore(value)
					that.aheadDay = value
				}
				// 添加本月日期
				const obj = {}
				obj.date = that.year + '-' + that.formatNum(that.month) + '-' + that.formatNum(i)
				obj.day = i
				that.dayArr.push(obj)
				// 补充后面空白日期
				if (i == totalDay && value != 6) that.addAfter(value)
			}
		},
		// 补充前面空白日期
		addBefore(value) {
			const that = this
			const totalDay = new Date(that.year, that.month - 1, 0).getDate()
			for (let i = 0; i < value; i++) {
				const obj = {}
				obj.date = ''
				obj.day = totalDay - (value - i) + 1
				that.dayArr.push(obj)
			}
		},
		// 补充后空白日期
		addAfter(value) {
			const that = this
			for (let i = 0; i < (6 - value); i++) {
				const obj = {}
				obj.date = ''
				obj.day = i + 1
				that.dayArr.push(obj)
			}
		},
		// 格式化日期位数
		formatNum(num) {
			return num < 10 ? '0' + num : num
		},
		// 上一个月
		lastMonth() {
			const that = this
			if (that.month == 1) {
				that.year -= 1
				that.month = 12
			} else {
				that.month -= 1
			}
			that.initDate()
		},
		// 下一个月
		nextMonth() {
			const that = this
			if (that.month == 12) {
				that.year += 1
				that.month = 1
			} else {
				that.month += 1
			}
			that.initDate()
		}
	}
}
</script>

<style lang="less" scoped>
.calendar-box {
	width: 100%;
	flex-direction: column;
	justify-content: center;

}

.miss_box {
	width: 100%;
	// padding: 20rpx 40rpx;
	box-sizing: border-box;
	background-color: #FFFFFF;
	border-radius: 20rpx;
	border: 2rpx solid #E1B590;
}

.calendar-box,
.month,
.week,
.day {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.month,
.week,
.day {
	width: 100%;
}

.month {
	// margin: 30rpx 0;
	// position: relative;
	background: #FFF6E5;
	border-radius: 20rpx;
	padding: 28rpx 28rpx 16rpx 28rpx;
	box-sizing: border-box;

	text {
		color: #e64340;
	}
}

.picker {
	width: 160rpx;
	height: 40rpx;
	position: absolute;
	top: 20rpx;
	left: 50%;
	transform: translate(-50%, -50%);
}

.day {
	flex-wrap: wrap;
}

.week>view,
.day>view {
	width: 70rpx;
	height: 70rpx;
	margin: 10rpx;
	text-align: center;
	position: relative;
	line-height: 70rpx;
}

.checkday {
	color: #999;
}

.choose {
	color: #FFFFFF;
	border-radius: 50%;
}

.circle {
	width: 10rpx;
	height: 10rpx;
	border-radius: 50%;
	position: absolute;
	bottom: 10%;
	left: 50%;
	transform: translate(-50%, -50%);
}

.sign {
	background-color: #FFF;
}

.repair {
	background-color: #FFF;
}

.but {
	// display: flex;
	// flex: 1;
	margin-top: 30rpx;
	// justify-content: center;
}

// /deep/.but uni-button{
// 	background: linear-gradient(90deg, #F44B06 0%, #FC9214 100%)!important;
// }
.but button {
	width: 458rpx;
	height: 92rpx;
	line-height: 80rpx;
	border-radius: 100rpx;
	border: 1px solid transparent;
	outline: none;
	color: #FFFFFF;
	font-size: 36rpx;
	font-weight: bold;
}

uni-button:after {
	border: none;
}

.rule-list {
	color: #999999;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 16rpx 0;

	.text {
		width: 26rpx;
		height: 26rpx;
		border: 2rpx solid #999999;
		border-radius: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-left: 6rpx;
	}
}

.top {
	display: flex;
	width: 100%;
	justify-content: space-between;
	padding: 30rpx;
	box-sizing: border-box;
	background-color: #FFFFFF;
	border-radius: 20rpx;
	margin-bottom: 16rpx;
	align-items: center;
}

.top h4 {
	font-weight: 600;
	font-size: 36rpx;
	line-height: 50rpx;
}

.top h4 span {
	color: #FF871E;
	;
	margin: 0 10rpx;
	font-size: 32rpx
}

.top p {
	font-style: normal;
	font-weight: normal;
	font-size: 28rpx;
	line-height: 40rpx;
	color: #FF871E;
}

.rig span {
	font-style: normal;
	font-weight: normal;
	font-size: 24rpx;
	line-height: 48rpx;
	color: #FF871E;
	border: 1px solid #FF871E;
	padding: 10rpx 20rpx;
	border-radius: 32rpx;
}
</style>
