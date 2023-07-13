<template>
	<!-- 滑块选择组件 绑定锚链接效果 -->
	<view class="slider_selection_container">
		<view class="AnchorList">
			<view class="AnchorItem" :class="{currter:current == index}" @click="switchCate(index)" v-for="(item,index) in 10">
				推荐
			</view>
		</view>
		<!-- <view class="selectionItem"> -->
			<scroll-view class="selectionItem" scroll-with-animation scroll-with-animation scroll-y="true" @scrolltolower="lower" @scroll="rightScroll">
				<view class="commodityItem"  v-for="item in 10">
					<image src="../image/cai.png" mode=""></image>
					<view class="commodity_msg">
						<p>酱爆鱿鱼丝</p>
						<p> <span>月售300+</span>   <span>好评度100%</span> <span class="isDiscount">{{ '4' }}折</span> </p>
						<span>￥<span class="bigMnoey">{{ '666.' }}</span>{{ '00' }} </span>
					</view>
					<button class="addCom">+</button>
					<!-- <button>选规格</button> -->
				</view>
			</scroll-view>
			<!-- <uni-list>
				<uni-list-item v-for="item in 10">
					<view slot="body" class="commodityItem">
						<image src="../image/cai.png" mode=""></image>
						<view class="commodity_msg">
							<p>酱爆鱿鱼丝</p>
							<p> <span>月售300+</span>   <span>好评度100%</span> <span class="isDiscount">{{ '4' }}折</span> </p>
							<span>￥<span class="bigMnoey">{{ '666.' }}</span>{{ '00' }} </span>
						</view>
						<button class="addCom">+</button>
						<button>选规格</button>
					</view>
				</uni-list-item>
			</uni-list> -->
		<!-- </view> -->
	</view>
</template>

<script>
	export default {
		data() {
			return {
				// currIndex: 0,  // 默认选择的下标
				rightScrollArr: [],
				// cateData: cateData, //分类数据结构
				current: 0,         //左边分类栏当前的选中的项
				scrollLeftTop: 0,   //左边分类栏项的高度
				cateItemHeight: 0,  //右边栏项的高度
				cateBarHeight: 0,   //左边分类栏的总高度 
				// rightScrollArr: [], //右边栏每项高度组成的数组
				scrollRightTop: 0   //当前右边栏滚动的高度
			};
		},
		mounted() {
			this.getCateItemTop()
		},
		methods:{ 
			async rightScroll(e) {
			    if (this.rightScrollArr.length == 0) {
			        await this.getCateItemTop();
			    }
			    if (!this.cateBarHeight) {
			        await this.getElRect('.AnchorList', 'cateBarHeight')
			    }
			    // scrollHeight的值等于滚动位置加上左边栏的高度一半是为了始终拿的是中间显示的右边项做对比
			    let scrollHeight = e.detail.scrollTop + this.cateBarHeight / 2;
			    for (let i = 0; i < this.rightScrollArr.length; i++) {
			        let height1 = this.rightScrollArr[i];
			        let height2 = this.rightScrollArr[i + 1];
			            //如果不存在height2，意味着数据循环已经到了最后一个，设置左边菜单为最后一项即可。
			            if (!height2 || scrollHeight >= height1 && scrollHeight < height2) {
			                this.cateDataStatus(i)
			                return;
			            }
			    }
			},
			lower() {
				console.log("到底了哦！！")
			},
			getCateItemTop() {  // 获取右边数据每个item到顶部的距离后放入数组中
				let query = uni.createSelectorQuery();
				query.selectAll('.commodityItem').boundingClientRect((rects) => {
						rects.forEach((rect) => {
							this.rightScrollArr.push(rect.top - rects[0].top)
						})
						// console.log(this.rightScrollArr)
				}).exec(function() {
					// console.log(1)
				})
			},
			async switchCate(index) {
			        if (!this.rightScrollArr.length == 0) {
			            await this.getCateItemTop();
			        }
			        if (index === this.current) return;
			        //将右边的scroll高度重设
			        this.scrollRightTop = this.rightScrollArr[index];
			        this.cateDataStatus(index);
			},
			//设置 左边分类的滚动状态
			cateDataStatus(index) {
			   //当前选择的项
			    this.current = index;
			    // 如果为0，意味着尚未初始化，调用getElRect获取目标元素的高度
			    if (this.cateBarHeight == 0 || this.cateItemHeight == 0) {
			        this.getElRect('.AnchorList', 'cateBarHeight');
			        this.getElRect('.commodityItem', 'cateItemHeight');
			    }
			    //将该项垂直居中，算法： 左边scroll的scrollTop = 当前项的高度 - 分类栏的一半高度
			    this.scrollLeftTop = index * this.cateItemHeight + this.cateItemHeight / 2 -    this.cateBarHeight / 2;
								// console.log(this.current)
			},
			//获取一个目标元素的高度
			getElRect(elClass, dataVal) {
			    const query = uni.createSelectorQuery();
			    query.select(elClass).fields({
			            size: true
			    }, res => {
			            this[dataVal] = res.height;
						// console.log(res)
			    }).exec(function() {
				
			    })
			},
		}
	}
</script>

<style lang="scss" scoped>
.slider_selection_container {
	width: 100vw;
	height: auto;
	margin: 0;
	padding: 0;
	display: flex;
	.AnchorList {
		box-sizing: border-box;
		width: 170rpx;
		max-height: 1290rpx;
		padding-bottom: 600rpx;
		overflow-y: auto;
		text-align: center;
		.AnchorItem {
			width: 100%;
			line-height: 100rpx;
			height: 100rpx;
			font-size: 32rpx;
			font-weight: 550;
			letter-spacing: 0.55em;
			color: #000000;
		}
		.currter {
			background-color: white;
		}
	}
	.selectionItem {
		flex: 1;
		max-height: 1290rpx;
		background-color: white;
		overflow-y: auto;
	}
	.commodityItem {
		padding: 10rpx 20rpx;
		display: flex;
		> image {
			border-radius: 10rpx;
			width: 180rpx;
			height: 170rpx;
		}
		.commodity_msg {
			margin-left: 20rpx;
			> p:nth-of-type(1) {
				font-size: 32rpx;
				font-weight: 550;
				letter-spacing: 0.05em;
				color: #000000;
			}
			> p:nth-of-type(2) {
				margin-top: 11rpx;
				min-height: 70rpx;
				position: relative;
				> span {
					font-size: 18rpx;
					font-weight: 500;
					color: #898989;
				}
				> span:nth-of-type(2) {
					margin-left: 18rpx;
				}
				.isDiscount {
					position: absolute;
					top: 40rpx;
					left: -15rpx;
					font-size: 12rpx;
					margin-left: 15rpx;
					border-radius: 5rpx;
					box-sizing: border-box;
					padding: 0rpx 4rpx;
					border: 1rpx solid #FA5151;
				}
			}
			> span {
				line-height: 50rpx;
				margin-top: 6rpx;
				font-weight: 600;
				font-size: 26rpx;
				color: #FA5151;
				.bigMnoey {
					font-size: 30rpx;
				}
			}
		}
		.addCom {
			margin-top: 110rpx;
			margin-left: 20rpx;
			width: 50rpx;
			height: 50rpx;
			background-color: #FFE500;
			border-radius: 50%;
			font-size: 45rpx;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
}
</style>
