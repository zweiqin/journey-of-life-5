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
          <view class="name">{{ storeDetail.name }}</view>
          <view class="tags">
            <view class="tag">品牌老店</view>
            <view class="tag">品质保障</view>
          </view>
        </view>
        <JTo :address="storeDetail.address"></JTo>
      </view>

      <view class="pub">
        <img
          class="icon"
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/4465sjle8x8359tbau67.png"
          alt=""
        />

        <text class="text">店铺公告：佛山市亚洲国际材料城中央馆5栋3楼</text>
      </view>
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
        ></GoodsPanel>

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
  </view>
</template>

<script>
import { storeDetailNavs } from "./config";
import GoodsPanel from "./components/goods-pane.vue";
import Evaluate from "./components/evaluate.vue";
import Coupon from "./components/coupon.vue";
import { getStoreDetailApi } from "../api/store";
import { getGoodsById } from "../api/home";
import NoData from "../components/no-data";

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
    };
  },

  onLoad(options) {
    this.storeId = options.storeId;
    this.getStoreDetail();
    this.getGoodsDetail();
  },

  components: {
    GoodsPanel,
    Evaluate,
    Coupon,
    NoData,
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
</style>
