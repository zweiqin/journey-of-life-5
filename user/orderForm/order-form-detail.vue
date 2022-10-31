<template>
  <view class="order-detail" v-if="data">
    <JHeader width="50" height="50" title="订单详情"></JHeader>

    <view
      class="view-order-status"
      :style="{
        'background-image': bg,
      }"
    >
      <JIcon width="44" height="44" type="active"></JIcon>
      {{ data.orderInfo.orderStatusText }}
    </view>

    <!-- 订单信息 -->
    <view class="order-info pane">
      <view class="co-info">
        <view class="line">
          <JIcon width="32" height="46" class="line-icon" type="modal"></JIcon>
          <view class="sub-title">姓名</view>
          <view>{{
            `${data.orderInfo.consignee} ${data.orderInfo.mobile}`
          }}</view>
        </view>
        <view class="line">
          <JIcon
            width="32"
            height="40"
            class="line-icon"
            type="local-black"
          ></JIcon>
          <view class="sub-title">地址</view>
          <view style="color: #07b9b9">{{ data.orderInfo.address }}</view>
        </view>
      </view>

      <view class="goods-info">
        <view class="title">商品信息</view>

        <view class="goods-item" v-for="item in data.orderGoods" :key="item.id">
          <image :src="item.picUrl" class="goods-img" mode="" />
          <view class="goods-info-content">
            <view class="goods-name">{{ item.goodsName }}</view>
            <view class="sp">{{ item.specifications | fomatSp }}</view>
            <view class="goods-price"> ￥{{ item.price }}</view>
          </view>
          <view class="goods-number">x1</view>
        </view>
      </view>
    </view>

    <!-- 评论 -->
    <view class="evaluate-info pane" style="display: none">
      <view class="line">
        <view class="title">满意</view>
        <uni-rate></uni-rate>
      </view>

      <view class="line">
        <view class="title">评论</view>
        <textarea
          placeholder="请输入商品评论"
          class="evaluate-textarea"
          maxlength="200"
        ></textarea>
      </view>

      <view class="line">
        <view class="title">晒图/视频</view>
        <view class="images">
          <view v-for="item in 12" :key="item">
            <image
              class="user-upload-img"
              src="https://img0.baidu.com/it/u=1370384016,828589411&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=313"
              mode=""
            />
          </view>
          <view class="upload-icon">+</view>
        </view>
      </view>

      <button class="uni-btn sub-eval-btn">提交评论</button>
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
    </view>

    <view class="order-detail-footer" v-if="data">
      <view v-for="item in orderOpButtons" :key="item.label">
        <button
          @click="handleOpOrder(data.orderInfo, item.key)"
          v-if="data.orderInfo.handleOption[item.key]"
          class="uni-btn"
        >
          {{ item.label }}
        </button>
      </view>
    </view>
  </view>
</template>

<script>
import {
  getOrderDetailApi,
  orderCancelApi,
  orderDeleteApi,
} from "../../api/order";
import { getUserId } from "../../utils";
import { orderOpButtons } from "./config";
import { payOrderGoodsApi } from "../../api/goods";

export default {
  data() {
    return {
      orderId: null,
      data: null,
      orderOpButtons,
    };
  },

  onLoad(options) {
    this.orderId = options.id;
    this.getOrderDetail();
  },

  methods: {
    // 获取订单详情
    getOrderDetail() {
      uni.showLoading();
      getOrderDetailApi({
        userId: getUserId(),
        orderId: this.orderId,
      }).then(({ data }) => {
        this.data = data;
        console.log(data);
      });
      uni.hideLoading();
    },

    // 点击操作按钮
    handleOpOrder(goods, key) {
      console.log(goods);
      const mapMethods = {
        cancel: {
          text: "确定要取消当前订单吗?",
          api: orderCancelApi,
          success: "取消成功",
        },
        delete: {
          text: "确定要删除当前订单吗?",
          api: orderDeleteApi,
          success: "删除成功",
        },
      };

      const _this = this;
      if (goods.handleOption[key] && ["cancel", "delete"].includes(key)) {
        uni.showModal({
          title: "提示",
          content: mapMethods[key].text,
          success: function (res) {
            if (res.confirm) {
              mapMethods[key]
                .api({
                  userId: getUserId(),
                  orderId: goods.id,
                })
                .then(() => {
                  _this.$showToast(mapMethods[key].success, "success");
                  setTimeout(() => {
                    if (["delete"].includes(key)) {
                      uni.navigateBack();
                    } else if (["cancel"].includes(key)) {
                      _this.getOrderDetail();
                    }
                  }, 2000);
                });
            }
          },
        });
      } else {
        if (key === "pay") {
          payOrderGoodsApi({
            orderNo: goods.orderSn,
            userId: getUserId(),
            payType: 1,
          }).then((res) => {
            const form = document.createElement("form");
            form.setAttribute("action", res.url);
            form.setAttribute("method", "POST");
            const data = JSON.parse(res.data);
            let input;
            for (const key in data) {
              input = document.createElement("input");
              input.name = key;
              input.value = data[key];
              form.appendChild(input);
            }

            document.body.appendChild(form);
            form.submit();
            document.body.removeChild(form);
          });
        }
      }
    },
  },

  filters: {
    fomatSp(value) {
      let str = "";
      for (const item of value) {
        str += item + ", ";
      }

      return str.substr(0, str.length - 2);
    },
  },

  computed: {
    bg() {
      const data = {
        已取消: "linear-gradient(to right, #959595, #d3d3d3)",
        未支付: "linear-gradient(to right, #fa5151, #fddbdb)",
      };
      return data[this.data.orderInfo.orderStatusText];
    },
  },
};
</script>

<style lang="less" scoped>
.order-detail {
  width: 100%;
  height: 100vh;
  background-color: #f4f4f4;
  font-size: 28upx;
  color: #3d3d3d;
  padding-bottom: 200upx;

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

      .evaluate-textarea {
        flex: 1;
        height: 100upx;
      }

      .images {
        .user-upload-img {
          width: 120upx;
          height: 120upx;
          border-radius: 6upx;
          object-fit: cover;
          margin-right: 10upx;
          margin-bottom: 10upx;
        }

        .upload-icon {
          width: 120upx;
          height: 120upx;
          border-radius: 6upx;
          background-color: #d8d8d8;
          color: #fff;
          font-size: 54upx;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 6upx 6upx 0;
          box-sizing: border-box;
        }
      }
    }
  }

  .order-detail-footer {
    height: 100upx;
    width: 100%;
    position: fixed;
    bottom: -1px;
    left: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 0 40upx;
    box-sizing: border-box;
    background-color: #fff;

    .uni-btn {
      border: 1upx solid #3d3d3d;
      padding: 18upx 48upx;
      color: #3d3d3d;
      font-size: 28upx;
      margin-left: 30upx;
    }
  }
}
</style>