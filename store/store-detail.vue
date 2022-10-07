<template>
  <view class="store-detail-container">
    <view class="detail-info">
      <image
        class="background-img"
        src="https://img0.baidu.com/it/u=852183785,3727559688&fm=253&fmt=auto&app=138&f=JPEG?w=1000&h=500"
        mode=""
      />
      <view class="icons">
        <JBack tabbar="/pages/index/index"></JBack>
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
          src="https://img0.baidu.com/it/u=236085137,1979895699&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1665162000&t=088094aae804f9e6b3e57981e76e3845"
        ></JAvatar>
        <view class="detail-info-ccontent">
          <view class="name">巨蜂商城</view>
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

        <text class="text">店铺公告：佛山市亚洲国际材料城中央馆5栋3楼</text>
      </view>
    </view>

    <view class="main">
      <view class="navs">
        <view class="item" v-for="nav in storeDetailNavs" :key="nav.name">
          <image class="icon" :src="nav.icon" mode="" />
          <text class="name">{{ nav.name }}</text>
        </view>
      </view>

      <JTabs
        @change="handleChangeCurrentPane"
        :tabs="storeDetailLabels"
        :activeIndex="currentActive"
        class="j-tabs"
      ></JTabs>

      <JSwipper
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
      </JSwipper>
    </view>
  </view>
</template>

<script>
import { storeDetailNavs } from "./config";
import GoodsPanel from "./components/goods-pane.vue";
import Evaluate from "./components/evaluate.vue";
import Coupon from "./components/coupon.vue";

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
    };
  },

  components: {
    GoodsPanel,
    Evaluate,
    Coupon,
  },

  methods: {
    handleChangeCurrentPane(index) {
      this.swipterHeight =
        this.$refs[this.mapRef[index]].$el.clientHeight * 2 + 20;
      this.currentActive = index;
    },
  },

  mounted() {
    this.swipterHeight =
      this.$refs.JSideClassificationRef.$el.clientHeight * 2 + 10;
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
    .flex(center, flex-start);
    font-size: 24upx;
    flex: 1;
    margin-top: 20px;

    .detail-info-ccontent {
      margin-left: 18upx;
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
}
</style>