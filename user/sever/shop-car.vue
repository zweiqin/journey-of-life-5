<template>
  <view class="shop-car-container">
    <view class="header">
      <JBack
        tabbar="/pages/user/user"
        style="margin-top: 10upx"
        width="50"
        height="50"
        dark
      ></JBack>
      <h2>购物车</h2>
      <button class="edit" @click="handleSwitchShopCarStatus">
        {{ opStatus === "EDIT" ? "编辑" : "完成" }}
      </button>
    </view>

    <view class="shop-list">
      <view class="shop-car-list" v-for="store in shopCarList" :key="store.id">
        <view class="shop-card-name">
          <JIcon class="icon" width="30" height="30" type="full-store"></JIcon>
          {{ store.brandName }}
        </view>

        <view class="shop-goods-list">
          <view
            class="goods-item"
            v-for="(item, index) in store.cartList"
            :key="item.productId"
          >
            <JIcon
              v-show="opStatus === 'EDIT'"
              class="icon"
              @click="handleChangeGoodsStatus(item, index, store)"
              :type="item.checked ? 'active-choose' : 'active-default'"
            ></JIcon>
            <JIcon
              class="icon"
              v-show="opStatus === 'CONFIRM'"
              @click="handleOp(item)"
              :type="
                opList.includes(item.productId)
                  ? 'active-choose'
                  : 'active-default'
              "
            ></JIcon>
            <JAvatar radius="10" :size="120" :src="item.picUrl"></JAvatar>

            <view class="goods-pane-right">
              <view class="goods-pane-name">{{ item.goodsName.trim() }} </view>
              <view class="goods-pane-desc-content">
                <text class="goods-pane-desc">{{
                  item.specifications | getDesc
                }}</text>
              </view>
              <view class="goods-pane-footer">
                <text class="goods-pane-price">￥{{ item.price }}</text>

                <view class="ops">
                  <text
                    class="item"
                    @click="handleChangeNumber(-1, item, index, store)"
                    >-</text
                  >
                  <text class="item">{{ item.number }}</text>
                  <text
                    class="item"
                    @click="handleChangeNumber(+1, item, index, store)"
                    >+</text
                  >
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>

      <!-- <uni-load-more
        style="margin-top: 60upx"
        type="snow"
        status="loading"
        v-if="loadingStatus === 'loading'"
      ></uni-load-more> -->

      <view
        class="no-data"
        v-if="shopCarList && !shopCarList.length && loadingStatus !== 'loading'"
        >暂无商品，快去添加吧~</view
      >
    </view>

    <!-- 热销推荐 -->
    <view class="all-look">
      <JLineTitle title="热销推荐"></JLineTitle>
      <Goods
        v-for="item in recommentList"
        :price="item.counterPrice"
        :name="item.name"
        :imgUrl="item.picUrl"
        :key="item.id"
        :id="item.id"
      ></Goods>
    </view>

    <view
      class="shop-car-footer"
      :class="{
        show: !shopCarList.length,
      }"
    >
      <view class="choose-all" @click="handleChooseAll">
        <JIcon
          class="icon"
          :type="allCheckStatus ? 'active-choose' : 'active-default'"
        ></JIcon>
        <text class="text">全选</text>
      </view>
      <!-- 编辑 -->
      <view class="edit-op" v-show="opStatus === 'EDIT'">
        <text class="text">合计</text>
        <view class="totoal-price">￥{{ totalPrice }}</view>
        <button class="uni-btn pay-btn" @click="handleToPay">结算</button>
      </view>

      <!-- 完成 -->
      <view class="confirm-op" v-show="opStatus === 'CONFIRM'">
        <button class="uni-btn op-btn" @click="addCollections">移入收藏</button>
        <button class="uni-btn op-btn" @click="removeShopCarGoods">删除</button>
      </view>
    </view>
  </view>
</template>

<script>
import RecommendGoods from "../../components/recommend-goods";
import Goods from "../../store/components/goods-pane.vue";
import {
  getShopCarListApi,
  changeShopCarStatusApi,
  updateShopCarCountApi,
  deleteShopCarGoodsApi,
  addCollectionsApi,
} from "../../api/cart";
import { everyLookApi } from "../../api/goods";
import { getUserId, fomartNumber } from "../../utils";
import { J_PAY_GOODS, J_SELECT_ADDRESS } from "../../constant";

const EDIT = "EDIT";
const CONFIRM = "CONFIRM";

export default {
  components: {
    RecommendGoods,
    Goods,
  },

  onLoad() {
    this.getShopList();
    uni.removeStorageSync(J_SELECT_ADDRESS);

    this.getRecommentList();
  },

  data() {
    return {
      opStatus: EDIT,
      opList: [],
      shopCarList: [],
      carTotalInfo: [],
      loadingStatus: "noMore",
      isChangeNumber: false,
      recommentList: [],
      opGoodsList: [],
    };
  },

  filters: {
    getDesc(specifications) {
      if (!specifications || !specifications.length) {
        return "";
      }
      let str = "";
      for (const item of specifications) {
        str += item + " ";
      }
      return str;
    },
  },

  methods: {
    getRecommentList() {
      everyLookApi(24438).then(({ data }) => {
        this.recommentList = data.goodsList.slice(0, 10);
      });
    },
    // 操作按钮切换
    handleSwitchShopCarStatus() {
      if (!this.shopCarList.length && this.opStatus === EDIT) {
        this.$showToast("没有商品可以编辑");
        return;
      }
      this.opStatus = this.opStatus === EDIT ? CONFIRM : EDIT;
      if (this.opStatus === CONFIRM) {
        this.opList = [];
      }

      this.$forceUpdate();
    },

    // 改变商品勾选状态
    handleChangeGoodsStatus(goods, index, store) {
      if (this.opStatus === CONFIRM) {
      } else {
        changeShopCarStatusApi({
          userId: getUserId(),
          productIds: [goods.productId],
          isChecked: goods.checked ? 0 : 1,
          brandId: store.brandId,
        }).then(() => {
          store.cartList[index].checked = !store.cartList[index].checked;
        });
      }
    },

    // 编辑选中的列表
    handleOp(goods) {
      const index = this.opList.findIndex((item) => item === goods.productId);
      console.log(goods);
      if (index === -1) {
        this.opList.push(goods.productId);
        this.opGoodsList.push(goods.goodsId);
      } else {
        this.opList.splice(index, 1);
        this.opGoodsList.splice(index, 1);
      }
    },

    // 获取购物车列表
    getShopList() {
      this.loadingStatus = "loading";
      const _this = this;
      getShopCarListApi({
        userId: getUserId(),
      })
        .then(({ data }) => {
          _this.shopCarList = data.brandCartgoods;
          uni.hideLoading();
          _this.loadingStatus = "noMore";
        })
        .catch(() => {
          uni.hideLoading();
          _this.loadingStatus = "noMore";
        });
    },

    // 购物车数量的添加
    handleChangeNumber(number, goods, index, store) {
      if (this.isChangeNumber) {
        this.$showToast("操作太快啦~");
        return;
      }
      const _this = this;
      this.isChangeNumber = true;
      if (number === -1 && goods.number === 1) {
        uni.showModal({
          title: "提示",
          content: "是否将该商品移出购物车？",
          success: function (res) {
            if (res.confirm) {
              _this.deleteGoods([goods.productId], store);
            }
          },
        });
        _this.isChangeNumber = false;
      } else {
        uni.showLoading();
        updateShopCarCountApi({
          userId: getUserId(),
          goodsId: goods.goodsId,
          productId: goods.productId,
          number: goods.number + number,
          id: goods.id,
        })
          .then(() => {
            _this.getShopList();
            _this.isChangeNumber = false;
            uni.hideLoading();
          })
          .catch(() => {
            this.$showToast("数量修改失败");
            _this.isChangeNumber = false;
            uni.hideLoading();
          });
      }
    },

    // 点击删除按钮
    removeShopCarGoods() {
      const _this = this;
      uni.showModal({
        title: "提示",
        content: "是否删除当前选中的商品？",
        success: function (res) {
          if (res.confirm) {
            _this.deleteGoods(_this.opList);
          }
        },
      });
    },

    // 删除购物车的商品
    deleteGoods(productIds) {
      deleteShopCarGoodsApi({
        productIds,
        userId: getUserId(),
      }).then(() => {
        this.getShopList();
      });
    },

    // 设置购物车的数据
    setShopCarList(data) {
      this.shopCarList = [];
      this.carTotalInfo = data.cartTotal;
      for (const item of data.brandCartgoods) {
        this.shopCarList = [...this.shopCarList, ...item.cartList];
      }
      this.loadingStatus = "no-more";
    },

    // 是否全选
    handleChooseAll() {
      const _this = this;
      if (this.opStatus === EDIT) {
        const needCheckedIds = [];
        for (const shop of this.shopCarList) {
          shop.cartList.forEach((item) => {
            if (item.checked === _this.allCheckStatus) {
              needCheckedIds.push(item.productId);
            }
          });
        }
        uni.showLoading();
        changeShopCarStatusApi({
          userId: getUserId(),
          productIds: needCheckedIds,
          isChecked: this.allCheckStatus ? 0 : 1,
        }).then((res) => {
          _this.getShopList();
        });
      } else {
        // this.opList = this.allCheckStatus
        //   ? []
        //   : this.shopCarList.map((item) => {});

        if (this.allCheckStatus) {
          this.opList = [];
        } else {
          const tempOp = [];
          this.shopCarList.forEach((shop) => {
            for (const item of shop.cartList) {
              tempOp.push(item.productId);
            }
          });
          this.opList = tempOp;
        }
      }
    },

    // 去结算
    handleToPay() {
      uni.showLoading();

      const op = [];

      for (let item of this.shopCarList) {
        op.push({
          brandId: item.brandId,
          brandName: item.brandName,
          brandCartgoods: item.cartList.filter((item) => item.checked),
        });
      }

      uni.setStorageSync(J_PAY_GOODS, {
        cardsInfo: op,
        pay: this.totalPrice,
      });

      uni.hideLoading();

      uni.navigateTo({
        url: "/user/sever/pay-shop-card",
      });
    },

    // 移入收藏
    addCollections() {
      const _this = this;
      if (!this.opGoodsList.length) {
        this.$showToast("请选择要添加收藏的商品");
        return;
      }
      addCollectionsApi({
        userId: getUserId(),
        type: 0,
        valueId: this.opGoodsList,
      }).then(() => {
        uni.showToast({
          title: "移入收藏成功",
          duration: 2000,
        });

        _this.opList = [];
        _this.opGoodsList = [];
      });
    },
  },

  computed: {
    allCheckStatus() {
      if (!this.shopCarList.length) {
        return false;
      }
      if (this.opStatus === EDIT) {
        let status = true;
        for (const shop of this.shopCarList) {
          for (const item of shop.cartList) {
            if (!item.checked) {
              status = false;
              break;
            }
          }
        }
        return status;
      } else {
        let status = true;
        for (const shop of this.shopCarList) {
          for (const item of shop.cartList) {
            if (!this.opList.includes(item.productId)) {
              status = false;
            }
          }
        }
        return status;
      }
    },

    totalPrice() {
      let price = 0;
      for (const shop of this.shopCarList) {
        for (const item of shop.cartList) {
          if (item.checked) {
            price += item.number * item.price;
          }
        }
      }
      return fomartNumber(price);
    },
  },
};
</script>

<style lang="less" scoped>
@import "./css/shop-car.less";
</style>
