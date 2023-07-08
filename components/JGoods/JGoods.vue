<template>
	<view class="j-goods-container" @click="handleToViewGoodsDetail">
		<!-- <image @load="handleLoadingImg" class="img" :src="data.picUrl" alt="" /> -->
		<easy-loadimage
			:loading-mode="lazyLoadingMode"
			class="img"
			:scroll-top="scrollTop"
			:image-src="picUrl"
		></easy-loadimage>

		<!-- <fast-lazy-load class="img" src="data.picUrl"></fast-lazy-load> -->

		<view class="info">
			<view class="name">{{ data.name }}</view>
			<view class="tags">
				<view class="tag">七天无理由退货</view>
				<view class="tag">品牌正品</view>
			</view>

			<view class="op">
				<view class="j-goods-price">￥{{ data.counterPrice }}</view>
				<view ref="numbersRef" class="numbers">
					<view class="item" @click="changeNumber(-1)">-</view>
					<view class="currentNumber">{{ goodsNumber }}</view>
					<view class="item" @click="changeNumber(1)">+</view>
				</view>

				<button ref="addCarRef" class="add-car" @click="handleAddCar">
					查看详情
				</button>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		data: {
			type: Object,
			required: true
		},
		scrollTop: [Number, String]
	},
	data() {
		return {
			goodsNumber: 1,
			picUrl: ''
		}
	},
	mounted() {
		this.getHttpPicUrl()
	},
	methods: {
		handleAddCar() {
			return
			this.$refs.addCarRef.$el.style.flex = '0'
			this.$refs.numbersRef.$el.style.opacity = '1'
			if (!this.goodsNumber) {
				this.goodsNumber = 1
			}
		},
		getHttpPicUrl() {
			if (this.data.picUrl.includes('https')) {
				this.picUrl = this.data.picUrl
			} else {
				this.picUrl = this.common.seamingImgUrl(this.data.picUrl)
			}
		},

		changeNumber(number) {
			this.goodsNumber = number + this.goodsNumber
			if (this.goodsNumber <= 0) {
				this.$refs.addCarRef.$el.style.flex = ''
				this.$refs.numbersRef.$el.style.opacity = '0'
				this.goodsNumber = 0
			}
		},

		// 点击查看详情
		handleToViewGoodsDetail() {
			uni.navigateTo({
				url: '/pages/prod/prod?goodsId=' + this.data.id
			})
		},

		handleLoadingImg() {
			console.log('加载成功')
		}
	}
}
</script>

<style lang="less" scoped>
@import "../../style/var.less";
@import "../../style/mixin.less";

.j-goods-container {
  width: 348upx;
  height: 480upx;
  display: flex;
  flex-direction: column;
  margin-bottom: 20upx;
  overflow: hidden;

  .img {
    width: 100%;
    height: 300upx;
    border-radius: 40upx 40upx 0 0;
  }

  .info {
    width: 100%;
    padding: 10upx;
    box-sizing: border-box;
    /* background-color: #f40; */

    .name {
      width: 308upx;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-size: 24upx;
      font-weight: bold;
      color: #3d3d3d;
    }

    .tags {
      display: flex;
      margin: 12upx 0 23upx 0;

      .tag {
        font-weight: 100;
        border: 1upx solid #999;
        font-size: 20upx;
        padding: 4upx 8upx;
        border-radius: 10px;
        margin-right: 10upx;
        color: rgb(0, 0, 0);
      }
    }

    .op {
      .flex();
      .j-goods-price {
        font-size: 36upx;
        color: #fa5151;
      }
      .numbers {
        .flex(center, flex-end);
        opacity: 0;
        flex: 1;
        font-size: 36upx;
        overflow: hidden;
        transition: all 350ms;

        .currentNumber {
          color: #fa5151;
          margin: 0 5px;
        }

        .item {
          width: 48upx;
          height: 48upx;
          border-radius: 50%;
          color: #fff;
          text-align: center;
          line-height: 44upx;

          &:first-child {
            border: 1.5px solid #fa5151;
            color: #fa5151;
          }

          &:last-child {
            background-color: #fa5151;
          }
        }
      }

      .add-car {
        flex: 0 0 146upx;
        padding: 0;
        margin: 0;
        line-height: 1;
        font-size: 24upx;
        color: #fff;
        height: 46upx;
        text-align: center;
        line-height: 46upx;
        background-color: #fa5151;
        transition: all 200ms;
        overflow: hidden;
        flex-shrink: 0;
      }
    }
  }
}
</style>
