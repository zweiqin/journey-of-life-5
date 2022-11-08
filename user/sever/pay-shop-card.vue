<template>
  <view class="shop-cat-pay-container">
    <!-- 头部 -->
    <view class="header">
      <JBack width="50" dark height="50" style="margin-top: 8upx"></JBack>
      <h2 class="">确认订单</h2>
    </view>

    <!-- 收货信息 -->
    <view class="consignee-info">
      <view class="pane">
        <view class="name">
          <view
            >收货人：{{ defaultAddress.name }} {{ defaultAddress.mobile }}</view
          >
        </view>
        <view @click="handleChooseAddress">
          更换
          <JIcon width="32" height="32" type="right-arrow"></JIcon>
        </view>
      </view>

      <view class="address"> 地址：{{ defaultAddress.detailedAddress }} </view>
      <view class="no-data"> </view>
    </view>

    <!-- 商品信息 -->
    <view class="goods-wrapper">
      <Goods
        :name="item.goodsName"
        :price="item.price"
        :imgUrl="item.picUrl"
        v-for="item in goodsList"
        :desc="item.desc"
        :key="item.id"
        readOnly
      ></Goods>
    </view>

    <!-- 汇总信息 -->
    <view class="line-pane">
      <view class="title">商品总额</view>
      <view class="desc">￥{{ totalPrice }}</view>
    </view>

    <view class="line-pane">
      <view class="title">优惠劵</view>
      <view class="desc" style="color: #999">暂无优惠劵可用</view>
    </view>

    <view class="footer">
      <view class="price-wrapper"
        >待支付：<text class="price-pay">￥{{ totalPrice }}</text></view
      >
      <button class="uni-btn pay-btn" @click="handleToPay">立即支付</button>
    </view>
  </view>
</template>

<script>
import Goods from "../../store/components/goods-pane.vue";
import { J_PAY_GOODS, J_SELECT_ADDRESS } from "../../constant";
import { getAddressListApi } from "../../api/address";
import { getUserId } from "../../utils";
import { payShopCarApi } from "../../api/cart";
import { submitOrderApi, payOrderGoodsApi } from "../../api/goods";

export default {
  components: {
    Goods,
  },

  onLoad() {
    this.getGoods();
    this.getAddress();
  },

  onShow() {
    const address = uni.getStorageSync(J_SELECT_ADDRESS);
    if (address) {
      this.defaultAddress = address;
    }
  },

  data() {
    return {
      goodsList: [],
      totalPrice: 0,
      isNoAddress: false,
      defaultAddress: "",
    };
  },

  methods: {
    // 获取本地的购物车数据
    getGoods() {
      const payGoodsInfo = uni.getStorageSync(J_PAY_GOODS) || {};
      if (!payGoodsInfo.goods.length) {
        uni.showModal({
          title: "提示",
          content: "没有要支付的商品",
          success: function () {
            uni.navigateTo({
              url: "/user/sever/shop-car",
            });
          },
        });
      } else {
        this.goodsList = payGoodsInfo.goods.map((item) => {
          let str = "";
          for (const item of item.specifications) {
            str += item + " ";
          }
          item.desc = str + "x" + item.number;
          return item;
        });
        this.totalPrice = payGoodsInfo.pay;
      }
    },
    // 获取地址信息
    getAddress() {
      const _this = this;
      getAddressListApi({
        userId: getUserId(),
      }).then(({ data }) => {
        if (!data.length) {
          _this.isNoAddress = true;
          return;
        }

        const defaultAddress = data.find((item) => {
          return !!item.isDefault;
        });

        _this.defaultAddress = defaultAddress || data[0];
      });
    },

    // 去选择地址
    handleChooseAddress() {
      uni.navigateTo({
        url: "/user/site/site-manage?appoint=true",
      });
    },

    // 支付
    handleToPay() {
      const data = {
        userId: getUserId(),
        addressId: this.defaultAddress.id,
        useVoucher: 0,
        cartId: 0,
        couponId: '',
        grouponRulesId: ''
      };

      payShopCarApi(data).then(({ data }) => {
        submitOrderApi({
          userId: getUserId(),
          cartId: 0,
          addressId: data.addressId,
          couponId: 0,
          useVoucher: false,
          message: "",
          grouponLinkId: "",
          grouponRulesId: "",
        }).then(({ data }) => {
          payOrderGoodsApi({
            orderNo: data.orderSn,
            userId: getUserId(),
            payType: 1,
          }).then((res) => {
            const payData = JSON.parse(res.h5PayUrl);

            const form = document.createElement("form");
            form.setAttribute("action", payData.url);
            form.setAttribute("method", "POST");
            const data = JSON.parse(payData.data);
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
        });
      });
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.shop-cat-pay-container {
  padding: 60upx 60upx 134upx 52upx;
  box-sizing: border-box;
  color: #3d3d3d;
  font-size: 28upx;

  .header {
    display: flex;
    align-items: center;

    h2 {
      font-size: 32upx;
      color: #000;
      margin-left: 32upx;
    }
  }

  .consignee-info {
    margin: 60upx 0 120upx 0;
    .pane {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-bottom: 34upx;
      border-bottom: 1upx solid #d8d8d8;

      .j-icon {
        vertical-align: bottom;
      }
    }

    .address {
      margin-top: 30upx;
    }
  }

  .goods-wrapper {
    margin-bottom: 30upx;

    .goods-pane {
      margin-bottom: 40upx;
    }
  }

  .line-pane {
    height: 100upx;
    width: 100%;
    .flex();
  }

  .marks {
    position: relative;
    width: 100%;
    margin-top: 80upx;

    textarea {
      margin: 20upx 0;
      width: 100%;
      height: 200upx;
      padding: 20upx;
      box-sizing: border-box;
      background-color: aqua;
    }
  }

  .footer {
    position: fixed;
    bottom: -1px;
    left: 0;
    width: 100%;
    height: 112upx;
    .flex(center, flex-end);
    padding: 0 20upx;
    box-sizing: border-box;
    background: #fff;

    .price-pay {
      font-size: 36upx;
      color: #fa5151;
    }

    .pay-btn {
      background-color: #fff;
      border: none;
      height: 72upx;
      width: 248upx;
      border-radius: 100px;
      background-color: #07b9b9;
      color: #fff;
      font-size: 36upx;
      .flex(center, center);
      margin-left: 66upx;
    }
  }
}
</style>
