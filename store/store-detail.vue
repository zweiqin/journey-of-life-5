<template>
  <view class="store-detail-container" v-if="storeDetail">
    <view class="detail-info">
      <image class="background-img" :src="storeDetail.picUrl" mode="" />
      <view class="icons">
        <JBack></JBack>
        <view class="right">
          <image
            class="icon"
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/7sie7zjfe51lk6wnmxsb.png"
            mode=""
          />
          <image
            class="icon"
            src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/11ndambq3umo4c3imxqx.png"
            mode=""
          />
        </view>
      </view>

      <view class="detail-info-wrapper">
        <JAvatar
          :size="160"
          :src="
            storeDetail.logo ||
            'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/berqiue9nqc9c2ykl3ud.webp'
          "
        ></JAvatar>
        <view class="detail-info-ccontent">
          <view class="name">{{ storeDetail.name }} </view>
          <JTo
            class="navigition-icon"
            icon
            animate
            :address="storeDetail.address"
          ></JTo>

          <view class="tags">
            <view class="tag">品牌老店</view>
            <view class="tag">品质保障</view>
          </view>
        </view>
      </view>

      <view class="pub">
        <img
          class="icon"
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/4465sjle8x8359tbau67.png"
          alt=""
        />

        <text class="text">店铺公告：{{ storeDetail.address }}</text>
      </view>
      <view class="ops"> </view>
    </view>

    <view class="main">
      <view class="navs">
        <view
          class="item"
          v-for="nav in storeDetailNavs"
          @click="go(nav.url)"
          :key="nav.name"
        >
          <image class="icon" :src="nav.icon" mode="" />
          <text class="name">{{ nav.name }}</text>
        </view>
      </view>

      <view class="goods-wrapper" v-if="goodsList.length">
        <GoodsPanel
          :price="goods.retailPrice"
          :name="goods.name"
          v-for="goods in goodsList"
          :key="goods.id"
          :imgUrl="goods.picUrl"
          :id="goods.id"
          :scrollTop="scrollTop"
        ></GoodsPanel>

        <!-- <StoreGoods
          v-for="goods in goodsList"
          :data="goods"
          :key="goods.id"
          :number="template"
          @add="template += $event"
        ></StoreGoods> -->

        <uni-load-more
          v-if="loadingStatus !== 'hidden'"
          :status="loadingStatus"
        ></uni-load-more>
      </view>

      <NoData v-else></NoData>

      <!-- <JTabs
        @change="handleChangeCurrentPane"
        :tabs="storeDetailLabels"
        :activeIndex="currentActive"
        class="j-tabs"
      ></JTabs> -->

      <!-- <JSwipper
        @change="handleChangeCurrentPane"
        :activeIndex="currentActive"
        :tabs="storeDetailLabels"
        isSlot
        :height="swipterHeight"
      >
        <template #goods>
          <JSideClassification ref="JSideClassificationRef">
            <GoodsPanel v-for="item in 3" :key="item"></GoodsPanel>
          </JSideClassification>
        </template>
        <template #evaluate> <Evaluate ref="evaluateRef"></Evaluate> </template>
        <template #coupon> <Coupon ref="couponRef"></Coupon> </template>
      </JSwipper> -->
    </view>

    <view
      class="mask"
      :style="{
        opacity: shopCarVisible ? 1 : 0,
        zIndex: shopCarVisible ? 10 : -1,
      }"
      @click="shopCarVisible = false"
    ></view>

    <view class="footer" v-if="shopCarInfo && shopCarInfo.cartTotal.goodsCount">
      <view class="shop-car" @click="handleShowCar">
        <JIcon width="80" height="80" type="store-car"></JIcon>
        <view class="number">{{ shopCarInfo.cartTotal.goodsCount }}</view>
      </view>

      <view class="sum-price">
        <view class="store-car-price"
          >￥<text class="text">{{
            shopCarInfo.cartTotal.checkedGoodsAmount
          }}</text></view
        >
        <button
          class="uni-btn"
          @click="go('/store/brand-pay?brandId=' + storeId)"
        >
          支付
        </button>
      </view>

      <view
        class="shop-car-popup"
        :style="{
          transform: shopCarVisible ? 'translateY(0)' : 'translateY(600%)',
        }"
      >
        <view class="header">
          <view class="left">
            <JIcon width="40" height="40" type="store-car"></JIcon>
            <text class="text"
              >(已选{{ shopCarInfo.cartTotal.goodsCount }}件)</text
            >
          </view>
          <view class="right">
            <button class="uni-btn" @click="handleClearShopCar">
              <JIcon type="delete" width="30" height="30"></JIcon>
              <text class="delete">清空购物车</text>
            </button>
          </view>
        </view>
        <ul>
          <li v-for="item in shopCarInfo.cartList" :key="item.id">
            <image class="img" :src="item.picUrl" mode="" />
            <view class="info">
              <view class="goods-name">{{ item.goodsName }}</view>
              <view class="ops">
                <text class="store-goods-price">￥{{ item.price }}</text>
                <view class="wr-op">
                  <view class="op op-1" @click="subtraction(item)">-</view>
                  <view class="op">{{ item.number }}</view>
                  <view class="op op-2" @click="add(item)">+</view>
                </view>
              </view>
            </view>
          </li>
        </ul>
      </view>
    </view>
  </view>
</template>

<script>
import { storeDetailNavs } from "./config";
import GoodsPanel from "./components/goods-pane.vue";
import Evaluate from "./components/evaluate.vue";
import Coupon from "./components/coupon.vue";
import { getStoreDetailApi } from "../api/store";
import { updateShopCarCountApi, deleteShopCarGoodsApi } from "../api/cart";
import { getShopCarApi } from "../api/goods";
import { getGoodsById } from "../api/home";
import NoData from "../components/no-data";
import StoreGoods from "./components/store-goods.vue";
import { getUserId } from "../utils";

export default {
  data() {
    return {
      storeDetailNavs,
      swipterHeight: 0,
      storeDetailLabels: [
        {
          name: "商品",
          value: 0,
          slotName: "goods",
        },
        {
          name: "评价",
          value: 1,
          slotName: "evaluate",
        },
        {
          name: "优惠劵",
          value: 2,
          slotName: "coupon",
        },
      ],
      currentActive: 0,
      mapRef: {
        0: "JSideClassificationRef",
        1: "evaluateRef",
        2: "couponRef",
      },

      // 门店id
      storeId: null,
      storeDetail: null,

      //
      goodsTotalCount: 0,
      goodsList: [],

      //
      query: {
        page: 1,
        size: 10,
      },

      loadingStatus: "loading",
      scrollTop: 0,
      shopCarInfo: null,
      shopCarVisible: false,
    };
  },

  onLoad(options) {
    this.storeId = options.storeId;
    this.getStoreDetail();
    this.getGoodsDetail();
  },

  onShow() {
    this.getShopCarList();
  },

  components: {
    GoodsPanel,
    Evaluate,
    Coupon,
    NoData,
    StoreGoods,
  },

  methods: {
    // 设置高度
    handleChangeCurrentPane(index) {
      // this.swipterHeight = this.$refs[this.mapRef[index]].$el.clientHeight * 2 + 20;
      this.currentActive = index;
    },

    // 获取门店详情
    getStoreDetail() {
      const _this = this;
      getStoreDetailApi(this.storeId).then(({ data }) => {
        console.log(data);
        _this.storeDetail = data.brand;
      });
    },

    // 点击购物车
    handleShowCar() {
      if (this.shopCarInfo.cartTotal.goodsCount) {
        this.shopCarVisible = true;
        return;
      }

      this.$showToast("没有商品，快去添加吧");
    },

    // 获取门店的商品
    getGoodsDetail(more) {
      this.loadingStatus = "loading";
      this.query.brandId = this.storeId;
      getGoodsById(this.query).then(({ data }) => {
        this.goodsTotalCount = data.count;
        if (more) {
          this.goodsList.push(...data.goodsList);
        } else {
          this.goodsList = data.goodsList;
        }
      });

      this.loadingStatus = "hidden";
    },

    // 获取购物车数据
    getShopCarList() {
      const _this = this;
      getShopCarApi({
        userId: getUserId(),
        brandId: this.storeId,
      }).then(({ data }) => {
        console.log(data);
        _this.shopCarInfo = data;
      });
    },

    // 减购物车
    subtraction(item) {
      uni.showLoading();
      const _this = this;
      if (item.number === 1) {
        deleteShopCarGoodsApi({
          userId: getUserId(),
          productIds: [item.productId],
        }).then(() => {
          _this.getShopCarList();
          uni.hideLoading();
        });
      } else {
        updateShopCarCountApi({
          userId: getUserId(),
          goodsId: item.goodsId,
          productId: item.productId,
          number: item.number - 1,
          id: item.id,
        }).then(() => {
          _this.getShopCarList();
          uni.hideLoading();
        });
      }
    },

    // 添加数量
    add(item) {
      const _this = this;
      updateShopCarCountApi({
        userId: getUserId(),
        goodsId: item.goodsId,
        productId: item.productId,
        number: item.number + 1,
        id: item.id,
      }).then(() => {
        _this.getShopCarList();
        uni.hideLoading();
      });
    },

    // 清空购物车
    handleClearShopCar() {
      uni.showLoading();
      const _this = this;
      const productIds = this.shopCarInfo.cartList.map((item) => {
        return item.productId;
      });
      deleteShopCarGoodsApi({
        userId: getUserId(),
        productIds: productIds,
      }).then(() => {
        _this.getShopCarList();
        uni.hideLoading();
        _this.shopCarVisible = false;
      });
    },
  },

  mounted() {
    // this.swipterHeight = this.$refs.JSideClassificationRef.$el.clientHeight * 2 + 10;
  },

  onReachBottom() {
    console.log(this.goodsTotalCount);
    if (this.goodsList.length > this.goodsTotalCount) {
      this.loadingStatus = "noMore";
      return;
    }

    if (this.goodsList.length < this.query.size) {
      return;
    }
    this.query.page++;
    this.getGoodsDetail(true);
  },

  onPageScroll(scrollTop) {
    this.scrollTop = scrollTop.scrollTop;
  },
};
</script>

<style lang="less" scoped>
@import "../style/mixin.less";
@import "../style/var.less";

.goods-pane {
  margin-bottom: 32upx;
}

.detail-info {
  position: relative;
  width: 100%;
  height: 436upx;
  padding: 34upx 24upx;
  box-sizing: border-box;
  .flex(flex-start);
  flex-direction: column;

  .background-img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 0 0 40upx 40upx;
    z-index: -1;
  }

  .icons {
    width: 100%;
    .flex();

    .icon {
      width: 40upx;
      height: 40upx;

      &:last-child {
        margin-left: 30upx;
      }
    }
  }

  .detail-info-wrapper {
    width: 100%;
    color: #fff;
    .flex(center, space-between);
    font-size: 24upx;
    flex: 1;
    margin-top: 20px;

    .detail-info-ccontent {
      margin: 0 18upx;
      flex: 1;
    }

    .name {
      font-size: 34upx;
      font-weight: bold;
      text-shadow: 1px 0 0 rgba(0, 0, 0, 0.2), -1px 0 0 rgba(0, 0, 0, 0.2),
        0 1px 0 rgba(0, 0, 0, 0.2), 0 -1px 0 rgba(0, 0, 0, 0.2);
      display: inline-block;
    }

    .tags {
      display: flex;
      margin-top: 18upx;
    }

    .tag {
      padding: 6upx 18upx;
      background-color: #fa5151;
      border-radius: 10upx;

      &:first-child {
        margin-right: 24upx;
      }
    }
  }

  .pub {
    width: 520upx;
    height: 48upx;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 10upx;
    padding: 10upx 20upx;
    box-sizing: border-box;
    .flex(center, flex-start);

    .icon {
      width: 26upx;
      height: 28upx;
      margin-right: 16upx;
    }

    .text {
      color: #fff;
      font-size: 20upx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
}

.main {
  padding: 28upx 32upx;
  box-sizing: border-box;

  .navs {
    .flex();
    .item {
      .flex();
      flex-direction: column;
    }
    .icon {
      width: 52upx;
      height: 50upx;
      object-fit: cover;
    }
    .name {
      font-size: @f12;
      color: @c3d;
      margin-top: 6upx;
    }
  }

  .j-tabs {
    margin-top: 44upx;
  }

  .goods-wrapper {
    margin: 30upx 0;
  }
}

.navigition-icon {
  padding: 6upx;
  border-radius: 4upx;
  background-color: rgba(0, 0, 0, 0.4);
  display: inline-block;
  margin-left: 20upx;
}

.footer {
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  height: 105upx;
  background-color: #ffffff;
  padding: 0 40upx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 10;

  .shop-car-popup {
    width: 100%;
    position: absolute;
    bottom: 105upx;
    left: 0;
    background-color: #fff;
    padding: 20upx;
    box-sizing: border-box;
    font-size: 28upx;
    transition: all 350ms;
    .header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 10upx;
      border-bottom: 1upx solid #ccc;

      .left {
        display: flex;
        align-items: center;

        .text {
          margin-left: 10upx;
          color: #868686;
        }
      }

      .uni-btn {
        font-size: 28upx;
        display: flex;
        align-items: center;

        .delete {
          margin-left: 10upx;
        }
      }
    }

    ul {
      padding: 0;

      li {
        display: flex;
        margin: 20upx 0;

        .img {
          flex-shrink: 0;
          width: 120upx;
          height: 120upx;
          border-radius: 10upx;
          margin-right: 20upx;
        }

        .info {
          font-size: 32upx;
          flex: 1;
          display: flex;
          justify-content: space-between;
          flex-direction: column;

          .ops {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .store-goods-price {
              color: #fa5151;
            }

            .wr-op {
              display: flex;
              align-items: center;

              .op {
                width: 48upx;
                height: 48upx;
                display: flex;
                align-items: center;
                justify-content: center;
              }

              .op-1,
              .op-2 {
                border-radius: 50%;
                font-size: 36upx;
              }

              .op-1 {
                border: 1upx solid #868686;
                color: #868686;
              }

              .op-2 {
                background-color: #fa5151;
                color: #fff;
                margin-bottom: 1px;
              }
            }
          }
        }
      }
    }
  }

  .shop-car {
    position: relative;

    .number {
      position: absolute;
      top: -10upx;
      right: -24upx;
      width: 48upx;
      height: 48upx;
      border-radius: 50%;
      background-color: #fa5151;
      font-size: 24upx;
      color: #fff;
      text-align: center;
      line-height: 48upx;
    }
  }

  .sum-price {
    font-size: 36upx;
    display: flex;
    align-items: center;
    color: #fa5151;

    .text {
      font-weight: bold;
      margin-right: 20upx;
    }

    .uni-btn {
      padding: 10upx 60upx;
      background-color: #fa5151;
      color: #fff;
    }
  }

  .mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #fa5151;
    z-index: 2;
  }
}

.mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #2b2b2bba;
  z-index: 2;
  transition: all 350ms;
}
</style>
