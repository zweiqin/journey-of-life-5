<template>
  <view class="container">
  	<!--header-->
  	<view class="tui-header">
  		<view class="tui-header-top">
  			<view class="tui-top-item" @tap="screen">综合</view>
  			<view class="tui-top-item" @tap="screen">销量</view>
  			<view class="tui-top-item" @tap="screen">
  				<view>价格</view>
  				<view class="tui-price-arrow">
  					<view class="tui-icon-box tui-arrow-up">
  						<tui-icon name="turningup" :size="12" color="#444"></tui-icon>
  					</view>
  					<view class="tui-icon-box tui-arrow-down">
  						<tui-icon name="turningdown" :size="12" color="#444"></tui-icon>
  					</view>
  				</view>
  			</view>
  			<view class="tui-top-item tui-screen" @tap="screen">
  				<text class="tui-bold">筛选</text>
  				<tui-icon name="screen" :size="12" color="#5677fc" :bold="true"></tui-icon>
  			</view>
  		</view>
  		<view class="tui-header-bottom">
  			<view class="tui-bottom-item" :class="[proDropIndex==0?'tui-btmItem-active':'']" @tap="btnDropChange(0)">
  				<view class="tui-bottom-text" :class="[proDropIndex==0?'tui-active':'']">品牌</view>
  				<tui-icon :name="proDropIndex==0?'arrowup':'arrowdown'" :size="14" :color="proDropIndex==0?'#5677fc':'#444'"></tui-icon>
  			</view>
  			<view class="tui-bottom-item" :class="[proDropIndex==1?'tui-btmItem-active':'']" @tap="btnDropChange(1)">
  				<view class="tui-bottom-text" :class="[proDropIndex==1?'tui-active':'']">类型</view>
  				<tui-icon :name="proDropIndex==1?'arrowup':'arrowdown'" :size="14" :color="proDropIndex==1?'#5677fc':'#444'"></tui-icon>
  			</view>
  			<view class="tui-bottom-item" :class="[proDropIndex==2?'tui-btmItem-active':'']" @tap="btnDropChange(2)">
  				<view class="tui-bottom-text" :class="[proDropIndex==2?'tui-active':'']">适用手机</view>
  				<tui-icon :name="proDropIndex==2?'arrowup':'arrowdown'" :size="14" :color="proDropIndex==2?'#5677fc':'#444'"></tui-icon>
  			</view>
  		</view>

  	</view>

  	<!--header-->

  	<!--header 顶部下拉选择框-->

  	<tui-top-dropdown :show="dropShow" :paddingbtm="110" :translatey="216" @close="btnCloseDrop">
  		<scroll-view class="tui-scroll-box" scroll-y scroll-with-animation :scroll-top="scrollTop">
  			<view class="tui-seizeaseat-20"></view>
  			<view class="tui-drop-item" :class="[item.selected?'tui-bold':'']" v-for="(item,index) in proDropData" :key="index"
  			 @tap.stop="btnSelected" :data-index="index">
  				<tui-icon name="check" :size="16" color="#5677fc" :bold="true" v-if="item.selected"></tui-icon>
  				<text class="tui-ml tui-middle">{{item.name}}</text>
  			</view>
  			<view class="tui-seizeaseat-30"></view>
  		</scroll-view>
  		<view class="tui-drop-btnbox">
  			<view class="tui-drop-btn tui-button-white" hover-class="tui-button-white_hover" :hover-stay-time="150" @tap="reset">重置</view>
  			<view class="tui-drop-btn tui-button-primary" hover-class="tui-button-hover" :hover-stay-time="150" @tap="btnCloseDrop">确定</view>
  		</view>
  	</tui-top-dropdown>
  	<!--header 顶部下拉选择框-->

  	<view class="top-dropdown">
  		<tui-button type="white" shape="circle" @click="btnDropChange(0)">顶部下拉列表</tui-button>
  	</view>
  </view>
</template>

<script>
import SynthesizePopup from './cpns/SynthesizePopup.vue'
import { filterMenu } from './data'

const mapComponent = {
	0: 'synthesizePopupVisible'
}

export default {
	name: 'GoodsFilter',
	 data() {
	  	return {
	  		proDropList: [{
	  			list: [{
	  				name: "trendsetter",
	  				selected: false
	  			}, {
	  				name: "维肯（Viken）",
	  				selected: false
	  			}, {
	  				name: "AORO",
	  				selected: false
	  			}, {
	  				name: "苏发",
	  				selected: false
	  			}, {
	  				name: "飞花令（FHL）",
	  				selected: false
	  			}, {
	  				name: "叶梦丝",
	  				selected: false
	  			}, {
	  				name: "ITZOOM",
	  				selected: false
	  			}, {
	  				name: "亿魅",
	  				selected: false
	  			}, {
	  				name: "LEIKS",
	  				selected: false
	  			}, {
	  				name: "雷克士",
	  				selected: false
	  			}, {
	  				name: "蕊芬妮",
	  				selected: false
	  			}, {
	  				name: "辉宏达",
	  				selected: false
	  			}, {
	  				name: "英西达",
	  				selected: false
	  			}, {
	  				name: "戴为",
	  				selected: false
	  			}, {
	  				name: "魔风者",
	  				selected: false
	  			}, {
	  				name: "即满",
	  				selected: false
	  			}, {
	  				name: "北比",
	  				selected: false
	  			}, {
	  				name: "娱浪",
	  				selected: false
	  			}, {
	  				name: "搞怪猪",
	  				selected: false
	  			}]
	  		}, {
	  			list: [{
	  				name: "线充套装",
	  				selected: false
	  			}, {
	  				name: "单条装",
	  				selected: false
	  			}, {
	  				name: "车载充电器",
	  				selected: false
	  			}, {
	  				name: "PD快充",
	  				selected: false
	  			}, {
	  				name: "数据线转换器",
	  				selected: false
	  			}, {
	  				name: "多条装",
	  				selected: false
	  			}, {
	  				name: "充电插头",
	  				selected: false
	  			}, {
	  				name: "无线充电器",
	  				selected: false
	  			}, {
	  				name: "座式充电器",
	  				selected: false
	  			}, {
	  				name: "万能充",
	  				selected: false
	  			}, {
	  				name: "转换器/转接线",
	  				selected: false
	  			}, {
	  				name: "MFI苹果认证",
	  				selected: false
	  			}, {
	  				name: "转换器",
	  				selected: false
	  			}, {
	  				name: "苹果认证",
	  				selected: false
	  			}]
	  		}, {
	  			list: [{
	  				name: "通用",
	  				selected: false
	  			}, {
	  				name: "vivo",
	  				selected: false
	  			}, {
	  				name: "OPPO",
	  				selected: false
	  			}, {
	  				name: "魅族",
	  				selected: false
	  			}, {
	  				name: "苹果",
	  				selected: false
	  			}, {
	  				name: "华为",
	  				selected: false
	  			}, {
	  				name: "三星",
	  				selected: false
	  			}, {
	  				name: "荣耀",
	  				selected: false
	  			}, {
	  				name: "诺基亚5",
	  				selected: false
	  			}, {
	  				name: "荣耀4",
	  				selected: false
	  			}, {
	  				name: "诺基",
	  				selected: false
	  			}, {
	  				name: "荣耀",
	  				selected: false
	  			}, {
	  				name: "诺基亚2",
	  				selected: false
	  			}, {
	  				name: "荣耀2",
	  				selected: false
	  			}, {
	  				name: "诺基",
	  				selected: false
	  			}]
	  		}],
	  		proDropData: [],
	  		proDropIndex: -1,
	  		dropShow: false,
	  		scrollTop: 0
	  	}
	  },
	  methods: {
	  	btnDropChange(index) {
	  		this.proDropData = [...this.proDropList[index].list];
	  		this.proDropIndex = index;
	  		this.dropShow = true;
	  		this.dropdownShow=false
	  	},
	  	btnSelected: function(e) {
	  		let index = e.currentTarget.dataset.index;
	  		let obj = this.proDropData[index];
	  		this.$set(obj, 'selected', !obj.selected)
	  	},
	  	reset() {
	  		let arr = this.proDropData;
	  		for (let item of arr) {
	  			item.selected = false;
	  		}
	  		this.proDropData = arr
	  	},
	  	btnCloseDrop() {
	  		this.scrollTop = 1;
	  		this.$nextTick(() => {
	  			this.scrollTop = 0
	  		});
	  		this.dropShow = false;
	  		this.proDropIndex = -1;
	  		this.reset()
	  	},
	  	screen() {
	  		//this.tui.xxx 等api 查看【快速上手】文档使用
	  		this.tui.toast("商城模板中功能~")
	  	}
	  }
}
</script>

<style lang="less" scoped>
/*  uni-app style */
 
/* 隐藏scroll-view滚动条*/
  ::-webkit-scrollbar {
  	width: 0;
  	height: 0;
  	color: transparent;
  }

  /*header*/
  .tui-header {
  	width: 100%;
  	padding-top: 34rpx;
  	/* box-shadow: 0 15rpx 10rpx -15rpx #f2f2f2; */
  	box-sizing: border-box;
  	background-color: #fff;
  	position: fixed;
  	z-index: 1000;
  }

  .tui-header-top,
  .tui-header-bottom {
  	display: flex;
  	align-items: center;
  	justify-content: space-between;
  	font-size: 26rpx;
  	color: #333;
  }

  .tui-top-item {
  	height: 26rpx;
  	line-height: 26rpx;
  	flex: 1;
  	display: flex;
  	align-items: center;
  	justify-content: center;
  }

  .tui-topitem-active {
  	position: relative;
  	font-weight: bold;
  }

  .tui-topitem-active::after {
  	content: '';
  	position: absolute;
  	width: 44rpx;
  	height: 6rpx;
  	background: #5677fc;
  	border-radius: 6rpx;
  	bottom: -10rpx;
  	left: 50%;
  	-webkit-transform: translateX(-50%);
  	transform: translateX(-50%);
  }

  .tui-price-arrow {
  	display: flex;
  	flex-direction: column;
  	align-items: center;
  	justify-content: center;
  	height: 20rpx;
  }

  .tui-bottom-item .tui-icon-class,
  .tui-screen .tui-icon-class {
  	margin-left: 6rpx;
  }

  .tui-icon-box {
  	line-height: 12px !important;
  	padding: 0 !important;
  	display: block !important;
  	position: relative;
  }

  .tui-arrow-up {
  	top: 5px;
  }

  .tui-arrow-down {
  	top: -3px;
  }

  .tui-header-bottom {
  	margin-top: 56rpx;
  	height: 108rpx;
  	padding: 0 30rpx;
  	box-sizing: border-box;
  	font-size: 24rpx;
  	align-items: flex-start;
  	overflow: hidden;
  }

  .tui-bottom-text {
  	line-height: 24rpx;
  }

  .tui-bottom-item {
  	flex: 1;
  	display: inline-flex;
  	align-items: center;
  	justify-content: center;
  	padding: 18rpx 12rpx;
  	border-radius: 40rpx;
  	box-sizing: border-box;
  	background: #f2f2f2;
  	margin-right: 20rpx;
  	white-space: nowrap;
  }

  .tui-bottom-item:last-child {
  	margin-right: 0;
  }

  .tui-btmItem-active {
  	padding-bottom: 60rpx;
  	border-bottom-left-radius: 0;
  	border-bottom-right-radius: 0;
  }

  .tui-bold {
  	font-weight: bold;
  }

  .tui-active {
  	color: #5677fc;
  }

  .tui-ml {
  	margin-left: 6rpx;
  }

  .tui-seizeaseat-20 {
  	height: 20rpx;
  }

  .tui-seizeaseat-30 {
  	height: 30rpx;
  }

  .tui-middle {
  	vertical-align: middle;
  }

  .tui-drop-item .tui-icon-class {
  	vertical-align: middle;
  }

  /*header*/

  
  .top-dropdown {
  	margin-top: 360rpx;
  	padding: 0 40rpx;
  	box-sizing: border-box;
  }
</style>
