<template>
	<view class="bee-brand-pane-container">
		<view class="bee-brand-top" @click="go('/pages/store/detail/detail?brandId=' + brandInfo.id)">
			<view class="left">
				<BeeAvatar :src="common.seamingImgUrl(brandInfo.picUrl)" radius="10upx"></BeeAvatar>
				<!-- <view class="tag"> 惊喜价 </view> -->
			</view>
			<view class="middle">
				<view class="brand-name hidden">{{ brandInfo.name }}</view>
				<view class="rate">
					<view style="display: flex;align-items: center;">
						<BeeIcon :size="12" :src="require('./images/star.png')"></BeeIcon>
						<text class="rate-text">{{ brandInfo.merchantRating || '5.0' }}分</text>
						<text class="sub-text">{{ brandInfo.brandLabel | formatTag }}</text>
						<text class="rate-text">￥{{ brandInfo.perCapita || '0' }}/人</text>
						<text>月售 {{ brandInfo.salesVolume || '0' }}</text>
					</view>
					<view style="color: #777777;">{{ brandInfo.browse || 0 }}浏览量</view>
				</view>
				<view>
					<view
						v-if="brandInfo.voucherNum"
						style="width: fit-content;margin-top: 8upx;margin-right: 8upx;padding: 0 4upx;border: 0.25px solid #51cc46;border-radius: 12upx;font-size: 26upx;color: #51cc46;"
					>
						<!-- 返消费额{{ brandInfo.voucherNum * 2 }}%价值代金券 -->
						返代金券{{ brandInfo.voucherNum }}%
					</view>
				</view>
				<BeeNavigation>
					<view class="location-wrapper">
						<BeeIcon style="line-height: 100%;" :src="require('./images/location.png')" :size="14"></BeeIcon>
						<view class="detail">
							<!-- <text class="dis-container"> {{ Math.ceil(brandInfo.distance) || 0 }} km </text> -->
							<text class="dis-container"> {{ brandInfo.distance || 0 }} km </text>
							<BeeIcon :src="require('./images/to.png')" :size="14"></BeeIcon>
						</view>
					</view>
				</BeeNavigation>
				<view class="elva">
					<view class="elva-text hidden">
						{{ brandInfo.desc || '--' }}
					</view>
				</view>
				<!-- <view class="welfare-wrapper">
					<view v-for="(item, index) in templateData" :key="index" class="welfare-item">
					<view class="tag">{{ item.type }}</view>
					<text class="price-text">{{ item.price }}元</text>
					<view class="tag2">{{ item.discount }}折</view>
					<text class="desc">{{ item.desc }}</text>
					</view>
					</view> -->
			</view>
			<!-- <view class="right">
				<BeeIcon :size="25" class="heart-icon" :src="require('./images/heart.png')"></BeeIcon>
				</view> -->
		</view>
		<view class="bee-brand-bottom">
			<slot></slot>
		</view>
	</view>
</template>

<script>
import { templateData } from './data'
export default {

	filters: {
		formatTag(value) {
			return {
				0: '美酒',
				1: '美食',
				2: '娱乐',
				3: '好玩'
			}[value] || ''
		}
	},
	props: {
		brandInfo: {
			type: Object,
			required: true
		}
	},
	data() {
		return {
			templateData: Object.freeze(templateData)
		}
	}
}
</script>

<style lang="less" scoped>
.hidden {
	width: 374upx;
	overflow: hidden;
	white-space: nowrap;
	text-overflow: ellipsis;
}

.bee-brand-pane-container {
	// width: 100%;
	background-color: #fff;
	padding: 24upx 20upx;
	border-radius: 20upx;
	margin-top: 16upx;
	transition: all 350ms;

	&:active {
		background-color: #e9e9e9;
	}

	.bee-brand-top {
		display: flex;
		align-items: flex-start;
		width: 100%;

		.left {
			display: flex;
			align-items: center;
			flex-direction: column;

			.tag {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 104upx;
				height: 38upx;
				background: url('./images/tag1.png');
				background-size: cover;
				color: #cb511e;
				font-size: 24upx;
				margin-top: 52upx;
			}
		}

		.middle {
			flex: 1;
			margin: 0 28upx;

			.brand-name {
				color: #000;
				font-size: 32upx;
				font-weight: bold;
			}

			.rate {
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin-top: 8upx;
				font-size: 26upx;

				text {
					font-size: 24upx;
					margin-left: 8upx;

					&.rate-text {
						color: #fa5151;
					}
				}
			}

			.location-wrapper {
				display: flex;
				align-items: center;
				margin-top: 8upx;

				// /deep/ .icon-container {
				//   margin-top: 6upx;
				// }

				.detail {
					display: flex;
					align-items: center;
					background-color: #efefef;
					// vertical-align: text-bottom;
					padding: 0 4upx;
					border-radius: 4upx;
					margin-left: 4upx;
				}
			}

			.elva {
				display: flex;
				align-items: center;
				margin: 8upx 0;

				.elva-text {
					// width: 348upx;
					margin-left: 10upx;
					font-size: 30upx;
				}
			}

			.welfare-wrapper {
				margin-top: 20upx;

				.welfare-item {
					display: flex;
					align-items: center;
					margin-bottom: 20upx;

					text {
						margin: 0 10upx;
					}

					.tag {
						width: 30upx;
						height: 30upx;
						text-align: center;
						line-height: 30upx;
						font-size: 20upx;
						color: #fff;
						background: #fb7726;
					}

					.price-text {
						color: #fa5151;
					}

					.tag2 {
						width: 48upx;
						height: 28upx;
						background-color: #fcdbdb;
						color: #fa5151;
						font-size: 20upx;
						text-align: center;
						line-height: 28upx;
					}
				}
			}
		}

		.right {
			height: 326upx;
			display: flex;
			align-items: center;
			flex-direction: column;
			justify-content: space-between;

			.heart-icon {
				border-radius: 50%;
				transition: all 350ms;

				&:active {
					background-color: #ffd8d8;
				}
			}
		}
	}
}
</style>
