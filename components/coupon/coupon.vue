<template>
	<view :class="'coupon-item ' + (canUse ? '' : 'gray')">
		<view class="left">
			<view v-if="item.couponType == 1" class="num">
				￥
				<text class="coupon-price">{{ item.reduceAmount }}</text>
			</view>
			<view v-if="item.couponType == 2" class="num">
				<text class="coupon-price">{{ item.couponDiscount }}</text>折
			</view>
			<view class="condition">
				满{{ item.cashCondition }}元可用
			</view>
		</view>
		<view class="right">
			<view class="c-des">
				<text class="c-type">{{ item.suitableProdType == 0 ? '通用' : '商品' }}</text> {{ item.suitableProdType == 0 ? '全场通用' : '指定商品可用' }}
			</view>
			<view class="c-date">
				<text v-if="showTimeType == 1 && item.couponType == 2" class="c-data-info">领券{{ item.validDays }}天后失效</text>
				<text v-else class="c-data-info">{{ item.startTime }}~{{ item.endTime }}</text>
				<text v-if="item.canReceive && !order" class="c-btn" @tap="receiveCoupon">立即领取</text>
				<text v-if="!item.canReceive && !order" class="c-btn get-btn" @tap="useCoupon">立即使用</text>
			</view>
			<view v-if="order && canUse" class="sel-btn">
				<checkbox color="#eb2444" :data-couponid="item.couponId" :checked="item.choose" @tap="checkCoupon"></checkbox>
			</view>
		</view>
		<image v-if="type == 1" class="tag-img" src="/static/images/icon/coupon-used.png"></image>
		<image v-if="type == 2" class="tag-img" src="/static/images/icon/coupon-ot.png"></image>
	</view>
</template>

<script>
var http = require('../../utils/http.js')

export default {
	name: 'Coupon',

	components: {},
	props: {
		item: Object,
		type: Number,
		order: Boolean,
		canUse: Boolean,
		index: Number,
		showTimeType: Number
	},
	data() {
		return {
			stsType: 4
		}
	},
	// 生命周期函数，可以为函数，或一个在methods段中定义的方法名
	beforeMount() { // console.log(this.data.item);
	},
	methods: {
		receiveCoupon() {
			var couponId = this.item.couponId
			http.request({
				url: '/p/myCoupon/receive',
				method: 'POST',
				data: couponId,
				callBack: () => {
					var coupon = this.item
					coupon.canReceive = false
					this.setData({
						item: coupon
					})
				}
			})
		},

		checkCoupon(e) {
			// this.triggerEvent('checkCoupon', this.data.index);
			this.$emit('checkCoupon', {
				detail: {
					couponId: e.currentTarget.dataset.couponid
				}
			})
		},

		/**
     * 立即使用
     */

		useCoupon() {
			var url = '/pages/prod-classify/prod-classify?sts=' + this.stsType
			var id = this.item.couponId
			var title = '优惠券活动商品'

			if (id) {
				url += '&tagid=' + id + '&title=' + title
			}

			uni.navigateTo({
				url
			})
		}

	}
}
</script>

<style>
@import "./coupon.css";
</style>
