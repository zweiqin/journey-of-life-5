<template>
  <view class="goods-wrapper" v-if="goodsDetailInfo">
    <view class="carousel">
      <Carousel
        :list="goodsDetailInfo.info.gallery"
        :height="370"
        :top="0"
        :radius="0"
      ></Carousel>
      <image
        @click="back"
        class="back"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ozsrolc809fc5y260e8c.png"
        alt=""
      />
    </view>

    <view class="promotion">
      <view class="left">
        <view class="top">
          ￥<text class="number">{{ goodsDetailInfo.info.counterPrice }}</text>
        </view>

        <view class="bottom">
          <view class="tag">已售100+</view>
          <view class="tag">回购率100%</view>

          <view class="ops">
            <JIcon width="46" height="40" type="collect-heart"></JIcon>
            <view class="share">
              <JIcon type="white-share" width="27" height="27"> </JIcon>
              分享
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="container">
      <view class="vip">
        <view class="card">会员卡</view>
        <view class="desc">开通会员即可获得10元优惠券</view>
      </view>
      <view class="goods-name">{{ goodsDetailInfo.info.name }} </view>

      <view class="rest">
        <view>库存：{{ goodsDetailInfo.info.retailPrice }}</view>
        <view>销量：{{ goodsDetailInfo.info.sales }}</view>
      </view>
    </view>

    <view class="container store-info">
      <view>{{ goodsDetailInfo.brand.name }}</view>
      <view style="color: #fa5151">进店</view>
    </view>

    <u-parse v-if="goodsDetailInfo.info.detail" :content="content"></u-parse>

    <view class="footer">
      <view class="left">
        <view @click="switchTab('/pages/index/index')" class="item">
          <image class="icon" src="../static/images/store/home.png" mode="" />
          <view>首页</view>
        </view>
        <view class="item">
          <image class="icon" src="../static/images/store/bus.png" mode="" />
          <view>联系商家</view>
        </view>
      </view>
      <view class="btns">
        <button class="uni-btn" @click="handlePay">立即购买</button>
      </view>
    </view>

    <JSpecification
      ref="specificationRef"
      v-model="showSps"
      :bottom="106"
      :data="goodsDetailInfo"
    ></JSpecification>
  </view>
</template>

<script>
import Carousel from "../components/carousel";
import { getApponitGoodsDetailApi, getGoodsDetailApi } from "../api/goods";
import { J_APPONIT_GOODS, J_USER_ID } from "../constant";
import { marked } from "marked";
import { getUserId } from "../utils";

export default {
  components: {
    Carousel,
  },

  onLoad(options) {
    this.goodsId = options.goodsId;
    this.getGoodsDetail();
  },

  data() {
    return {
      goodsDetailInfo: null,
      showSps: false,
    };
  },

  methods: {
    // 获取商品详情
    getGoodsDetail() {
      const _this = this;
      getApponitGoodsDetailApi(this.goodsId).then(({ data }) => {
        _this.goodsDetailInfo = data;
        console.log(data);
      });

      // getGoodsDetailApi(23961).then(({ data }) => {
      //   _this.goodsDetailInfo = data;
      // });
    },

    //
    handlePay() {
      if (!getUserId()) {
        return;
      }
      if (this.showSps) {
        const goodsInfo = this.$refs.specificationRef.getVal();
        console.log(goodsInfo);
        if (goodsInfo.number > goodsInfo.product.number) {
          this.$showToast("该货品库存为" + goodsInfo.product.number);
          return;
        }
        uni.setStorageSync(J_APPONIT_GOODS, {
          brandInfo: this.goodsDetailInfo,
          ...goodsInfo,
        });
        uni.navigateTo({ url: "/store/apponit-order" });
      } else {
        this.showSps = true;
      }
    },

    back() {
      uni.navigateBack();
    },
  },

  computed: {
    content() {
      return this.goodsDetailInfo.info.detail
        ? marked(this.goodsDetailInfo.info.detail)
        : "";
    },
  },
};
</script>

<style lang="less" scoped>
.goods-wrapper {
  background-color: #f6f6f6;
  min-height: 100vh;
  height: auto;
}

.carousel {
  position: relative;
  z-index: 10;
  background-color: #fff;
  .back {
    position: absolute;
    top: 28upx;
    left: 10upx;
    width: 48upx;
    height: 48upx;
  }
}

.promotion {
  background-color: #fff;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 28upx 16upx 0;
  // background-color: #089a9d;
  box-sizing: border-box;
  border-radius: 20upx 20upx 0 0;
  margin-top: -28upx;
  z-index: 11;

  .left {
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    box-sizing: border-box;
    flex: 1;
    height: 100%;

    .top {
      display: flex;
      align-items: center;
      color: #f40;
      font-size: 36upx;
      margin-bottom: 16upx;
      .number {
        font-size: 60upx;
      }

      .tag {
        color: #3b4a50;
        padding: 14upx 24upx;
        border-radius: 20upx 20upx 20upx 0;
        margin-left: 22upx;
        background: linear-gradient(
          276deg,
          #c7f5f5 53%,
          #ffffff 100%,
          rgba(199, 245, 245, 0) 100%
        );

        .price {
          padding: 0;
        }
      }
    }

    .bottom {
      color: #fff;
      font-size: 28upx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;

      .tag {
        padding: 2upx 22upx;
        border: 1upx solid #f40;
        color: #fff;
        border-radius: 10upx;
        margin-right: 18upx;
        color: #f40;
      }

      .ops {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        text-align: right;
        flex: 1;

        .share {
          margin-left: 20upx;
          display: flex;
          padding: 10upx 16upx 10upx 20upx;
          align-items: center;
          background: linear-gradient(90deg, #fa5151 0%, #eb2f96 100%);
          border-radius: 200upx 0 0 0200upx;

          /deep/ .j-icon {
            margin-right: 10upx;
          }
        }
      }
    }
  }

  .right {
    display: flex;
    flex-direction: column;
    height: 100%;
    background-color: #09b8b8;
    padding-top: 16upx;
    padding-right: 28upx;
    padding-bottom: 12upx;
    box-sizing: border-box;

    .fast {
      .text {
        width: 100upx;
      }

      .icon {
        width: 30upx;
      }
    }

    .time {
      display: flex;
      margin: 6upx 0;

      .item {
        width: 12upx;
        height: 28upx;
        text-align: center;
        line-height: 28upx;
        background-color: #fff;
        padding: 4upx;
        margin-right: 8upx;
        font-size: 20upx;
      }
    }

    .on-time {
      font-size: 20upx;
      color: #fff;
    }
  }
}

.container {
  padding: 20upx;
  box-sizing: border-box;
  background-color: #fff;

  .goods-name {
    line-height: 1.5;
    font-weight: bold;
  }

  .rest {
    font-size: 28upx;
    color: #9a9a9a;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20upx;
  }
}

.vip {
  display: flex;
  align-items: center;
  width: 100%;
  height: 60upx;
  font-size: 28upx;
  color: #fff;
  margin-bottom: 20upx;

  .card {
    width: 150upx;
    height: 100%;
    text-align: center;
    line-height: 60upx;
    border-radius: 10upx;
    background: linear-gradient(98deg, #fd9a18, #fbbd18);
  }

  .desc {
    line-height: 60upx;
    height: 60upx;
    flex: 1;
    color: #9e7e7e;
    padding-left: 25upx;
    position: relative;
    left: -6upx;
    background: linear-gradient(98deg, #fec819, #fee8a3);
    border-radius: 0 10upx 10upx 0;
  }
}

.store-info {
  margin-top: 20upx;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #5c5c5c;
  font-size: 28upx;
  font-weight: bold;
}

.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 106upx;
  background-color: #ffffff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 24upx;
  padding: 0 16upx;
  box-sizing: border-box;
  z-index: 102;

  .left {
    display: flex;
    align-items: center;
    .item {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      margin-right: 48upx;
      .icon {
        width: 48upx;
        height: 48upx;
      }
    }
  }

  .uni-btn {
    background-color: #fa5151;
    font-size: 32upx;
    color: #fff;
    padding: 20upx 46upx;
    border-radius: 200px;
  }
}
</style>