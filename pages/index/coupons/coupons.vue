<template>
	<view class="coupons">
		<view class="title-container">
			<image src="../../../static/index/coupons/return.png" mode="" @click="handleBack" />
			<text>领券中心</text>
		</view>
		<view class="nav-list">
			<view class="nav" v-for="nav in navs" :key="nav.id" :class="{ active: currentnav === nav.id }"
				@click="handlePick(nav)">{{ nav.text }}</view>
		</view>
		<view class="select-list">
			<view class="select" v-for="select in selects" :key="select.id">
				<view class="text">{{ select.name }}</view>
				<image :src="select.icon" mode="" />
			</view>
			<text>管理</text>
		</view>
		<view class="main">
			<view class="item" v-for="item in items" :key="item.id">
				<view class="left" :style="{ background: item.background }">
					<view class="money">￥<text>{{ item.number }}</text></view>
					<view class="full">{{ item.full }}</view>
				</view>
				<view class="right">
					<view class="type" :style="{ background: item.background }">{{ item.type }}</view>
					<view class="rule">{{ item.rule }}</view>
					<view class="list">
						<view class="time">{{ item.remain }}<text>{{ item.time }}</text></view>
						<view class="order">立即使用</view>
					</view>
				</view>
			</view>
		</view>
		<view class="foot">
			<view class="sub" v-for="sub in subs" :key="sub.id" :class="{ active: currentTab === sub.id }"
				@click="handleChoice(sub)">
				<image :src="sub.icon" mode="" />
				<text>{{ sub.name }}</text>
			</view>

		</view>
	</view>
</template>

<script>
import { navs, selects, items, subs } from './data'
export default {
	name: "Coupons",
	props: {

	},
	data() {
		return {
			navs,
			selects,
			items,
			subs,
			currentnav: 1,
			currentTab: 2,
		}
	},
	methods: {
		handleBack() {
			uni.switchTab({
				url: '/pages/index/index',
			})
		},
		handlePick(item) {
			this.currentnav = item.id
		},
		handleChoice(item) {
			this.currentTab = item.id
		}
	},
	created() { }
}
</script>

<style lang="less" scoped>
.coupons {
	width: 100vw;
	min-height: 100vh;
	background: #F9FAFC;

	.title-container {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		padding-top: 60upx;
		padding-bottom: 48upx;
		background: #FFFFFF;

		image {
			width: 56upx;
			height: 56upx;
			position: absolute;
			left: 22upx;
		}

		text {
			color: rgba(0, 0, 0, 0.85);
			font-size: 36upx;
			font-weight: 500;
		}
	}

	.nav-list {
		padding: 0 40upx;
		padding-bottom: 24upx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		background: #FFFFFF;

		.nav {
			font-size: 28upx;
			color: rgba(0, 0, 0, 0.85);

			&.active {
				color: #FA5151;
				font-size: 28upx;
			}
		}
	}

	.select-list {
		padding: 0 48upx;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 80upx;
		border-top: 0.5px solid #D8D8D8;
		border-bottom: 0.5px solid #D8D8D8;
		background: #FFFFFF;

		.select {
			display: flex;
			align-items: center;

			.text {
				font-size: 24upx;
				font-weight: 350;
				line-height: 34upx;
				color: #3D3D3D;
			}

			image {
				width: 28upx;
				height: 28upx;
			}
		}

		text {
			font-size: 24upx;
			font-weight: 350;
			line-height: 34upx;
			color: #3D3D3D;
		}
	}

	.main {

		padding: 24upx 30upx 0 30upx;

		.item {
			margin-bottom: 22upx;
			box-sizing: border-box;
			width: 100%;
			// height: 226upx;
			border-radius: 10upx;
			box-shadow: 0upx 4upx 10upx 0upx rgba(0, 0, 0, 0.1);
			background: #FFFFFF;
			display: flex;

			.left {
				width: 29%;
				// padding: 28upx 18upx;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-radius: 10upx 0upx 0upx 10upx;
				color: #FFFFFF;

				.money {
					font-size: 36upx;
					font-weight: 500;

					text {
						font-size: 56upx;
						font-weight: 500;
					}
				}

				.full {
					font-size: 28upx;
				}
			}

			.right {
				width: 71%;
				padding: 24upx 20upx 26upx 18upx;
				box-sizing: border-box;

				.type {

					width: 110upx;
					height: 40upx;
					border-radius: 100upx;
					background: #89AEFC;
					color: #FFFFFF;
					font-size: 24upx;
					font-weight: 500;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.rule {
					padding-top: 8upx;
					padding-bottom: 52upx;
					font-size: 28upx;
					color: #3D3D3D;
				}

				.list {
					display: flex;
					justify-content: space-between;
					align-items: center;

					.time {
						font-size: 20upx;
						color: #FE4652;

						text {
							color: #777777;
							font-size: 20upx;
						}
					}

					.order {
						width: 148upx;
						height: 40upx;
						border-radius: 100upx;
						background: #FF4654;
						font-size: 24upx;
						font-weight: 500;
						color: #FFFFFF;
						display: flex;
						justify-content: center;
						align-items: center;
					}
				}
			}
		}
	}

	.foot {
		width: 100%;
		height: 110upx;
		background: #FFFFFF;
		box-shadow: 0upx 8upx 20upx 0upx rgba(0, 0, 0, 0.3);
		position: fixed;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-around;
		align-items: center;

		.sub {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: #999999;
			&.active{
				color: #FA5151;
			}

			image {
				width: 48upx;
				height: 48upx;
			}

			text {
				font-size: 24upx;

			}
		}
	}
}
</style>
