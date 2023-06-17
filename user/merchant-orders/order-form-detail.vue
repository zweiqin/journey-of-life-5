<template>
	<view v-if="data" class="order-detail">
		<JHeader width="50" height="50" title="商家订单详情"></JHeader>

		<view
			class="view-order-status"
			:style="{
				'background-image': bg
			}"
		>
			<JIcon width="44" height="44" type="active"></JIcon>
			{{ data.orderInfo.orderStatusText }}
		</view>

		<!-- 商家订单信息 -->
		<view class="order-info pane">
			<view v-if="!data.userAppoint" class="co-info">
				<view class="line">
					<JIcon width="32" height="46" class="line-icon" type="modal"></JIcon>
					<view class="sub-title">收货人姓名</view>
					<view>
						{{
							`${data.orderInfo.consignee} ${data.orderInfo.mobile}`
						}}
					</view>
				</view>
				<view class="line">
					<JIcon
						width="32"
						height="40"
						class="line-icon"
						type="local-black"
					></JIcon>
					<view class="sub-title">收货人地址</view>
					<view style="color: #07b9b9">{{ data.orderInfo.address }}</view>
				</view>
			</view>

			<!-- 是预约商品 -->
			<view v-else class="apponit-info">
				<view class="title">提货地址：{{ data.orderInfo.brandName }}</view>
				<view class="value"></view>
			</view>

			<view class="goods-info">
				<view class="title">商品信息</view>

				<view
					v-for="item in data.orderGoods"
					:key="item.id"
					style="border-bottom: 1upx dotted #ccc; padding-bottom: 20upx"
				>
					<view
						v-if="commentGoodsId ? item.id == commentGoodsId : true"
						class="goods-item"
					>
						<image :src="common.seamingImgUrl(item.picUrl)" class="goods-img" mode="" />
						<view class="goods-info-content">
							<view class="goods-name">{{ item.goodsName }}</view>
							<view class="sp">{{ item.specifications | fomatSp }}</view>
							<view class="goods-price"> ￥{{ item.price }}</view>
						</view>
						<view class="goods-number">x{{ item.number }}</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 详细信息 -->
		<view class="detail-info pane">
			<view class="detail-info-title"> 详细信息 </view>

			<view class="line">
				<view class="title">订单编号</view>
				<view class="text">{{ data.orderInfo.orderSn }}</view>
			</view>
			<view class="line">
				<view class="title">下单时间</view>
				<view class="text">{{ data.orderInfo.addTime }}</view>
			</view>
			<view class="line">
				<view class="title">实付金额</view>
				<view class="text" style="color: red">￥{{ data.orderInfo.actualPrice }}</view>
			</view>
		</view>

		<!-- <view v-if="data" class="order-detail-footer">
			</view> -->
	</view>
</template>

<script>
import { getOrderDetailApi } from '../../api/order'
import { getUserId } from '../../utils'

export default {
	name: 'OrderFormDetail',
	filters: {
		fomatSp(value) {
			let str = ''
			for (const item of value) {
				str += item + ', '
			}

			return str.substr(0, str.length - 2)
		}
	},
	data() {
		return {
			orderId: null,
			data: null,
			commentGoodsId: null,
			evForm: {
				userId: getUserId(),
				star: 5,
				content: '',
				hasPicture: true,
				picUrls: []
			}
		}
	},

	onLoad(options) {
		this.orderId = options.id
		this.commentGoodsId = options.goodsId
		this.getOrderDetail()
	},

	computed: {
		bg() {
			const data = {
				已取消: 'linear-gradient(to right, #959595, #d3d3d3)',
				未支付: 'linear-gradient(to right, #fa5151, #fddbdb)'
			}
			return data[this.data.orderInfo.orderStatusText]
		}
	},

	methods: {
		// 获取订单详情
		getOrderDetail() {
			uni.showLoading()
			getOrderDetailApi({
				userId: getUserId(),
				orderId: this.orderId
			}).then(({ data }) => {
				this.data = data
				console.log(data)
			})
			uni.hideLoading()
		},

		// 上传图片
		handleUploadImg() {
			const _this = this
			uni.chooseImage({
				success: (chooseImageRes) => {
					uni.uploadFile({
						url: 'https://www.tuanfengkeji.cn:9527/jf-app-api/wx/storage/upload',
						filePath: chooseImageRes.tempFiles[0].path,
						name: 'file',
						success: (uploadFileRes) => {
							_this.evForm.picUrls.push(JSON.parse(uploadFileRes.data).data.url)
						}
					})
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.order-detail {
  width: 100%;
  height: 100vh;
  background-color: #f4f4f4;
  font-size: 28upx;
  color: #3d3d3d;
  padding-bottom: 400upx;
  // box-sizing: border-box;

  /deep/ .j-header-container {
    padding: 20upx;
    box-sizing: border-box;
    background: #fff;
  }

  .view-order-status {
    display: flex;
    align-items: center;
    height: 114upx;
    padding-left: 60upx;
    box-sizing: border-box;
    background-image: linear-gradient(to right, #fa5151, #fddbdb);
    color: #fff;
    font-size: 36upx;

    .j-icon {
      margin-right: 20upx;
    }
  }

  .pane {
    padding: 40upx;
    box-sizing: border-box;
    background-color: #fff;
  }

  .order-info {
    .co-info {
      .line {
        display: flex;
        justify-content: flex-start;
        align-items: flex-start;

        .line-icon {
          margin-right: 20upx;
          flex-shrink: 0;
        }

        &:nth-child(1) {
          margin-bottom: 20upx;
        }

        .sub-title {
          margin-right: 20upx;
          flex-shrink: 0;
        }
      }
      padding-bottom: 20upx;
      border-bottom: 1upx solid #dadada;
    }

    .goods-info {
      margin: 20upx 0;
      // border-bottom: 1upx dotted #f40;

      .goods-item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 30upx;

        .goods-img {
          width: 140upx;
          height: 140upx;
          border-radius: 4upx;
          margin-right: 20upx;
          flex-shrink: 0;
        }

        .goods-info-content {
          flex: 1;
          font-size: 24upx;
          color: #3d3d3d;

          .goods-name {
            font-size: 28upx;
            font-weight: bold;
            width: 380upx;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .sp {
            margin: 20upx 0 10upx;
          }

          .goods-price {
            font-size: 28upx;
          }
        }
      }
    }
  }

  .detail-info {
    margin-top: 20upx;
    color: #000;

    .detail-info-title {
      margin-bottom: 20upx;
    }

    .line {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 24upx;
      padding: 10upx 0;

      .title {
        color: #3d3d3d;
      }
    }
  }

  .evaluate-info {
    margin-top: 20upx;
    padding: 0;

    .sub-eval-btn {
      margin-top: 80upx;
      font-size: 28upx;
      border-top: 1upx solid #d8d8d8;
      padding-top: 30upx;
    }

    .line {
      padding: 16upx 0;
      display: flex;
      align-items: flex-start;
      justify-content: flex-start;

      &:nth-child(3) {
        display: block !important;

        .title {
          margin-bottom: 20upx;
        }

        .images {
          display: flex;
          flex-wrap: wrap;
        }
      }

      .title {
        margin-right: 30upx;
        white-space: nowrap;
        flex-shrink: 0;
      }
    }
  }

  .apponit-info {
    display: flex;
    align-items: center;
  }
}
</style>
