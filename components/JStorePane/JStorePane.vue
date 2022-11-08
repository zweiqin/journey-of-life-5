<template>
  <div class="panel">
    <view class="header">
      <img
        class="avatar"
        :src="
          data.brand.logo ||
          'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/berqiue9nqc9c2ykl3ud.webp'
        "
        alt=""
      />
      <view class="info">
        <view class="name">{{ data.brand.name }}</view>
        <view class="tem">
          <Rate :rate="5" :size="10"></Rate>
          <view class="type">{{ getTypes(data.brand.brandgenre) }}</view>
          <view class="year">10年老店</view>
        </view>
      </view>
      <button class="btn" @click="handleEnterStore">进店</button>
    </view>

    <!-- 三张图 -->
    <view class="goods-layout three" v-if="data.goodsList.length >= 3">
      <img
        class="store  animate__backInLeft"
        :src="data.goodsList[0].picUrl"
        alt=""
      />
      <view class="right">
        <img
          class=" animate__fadeInTopRight"
          :src="data.goodsList[1].picUrl"
          alt=""
        />

        <img
          class=" animate__fadeInBottomRight"
          :src="data.goodsList[2].picUrl"
          alt=""
        />
      </view>

      <view class="price-icon" style="left: 0; top: 20upx"
        >￥{{ data.goodsList[0].retailPrice }}</view
      >
      <view class="price-icon price-icon-1"
        >￥{{ data.goodsList[1].retailPrice }}</view
      >
      <view class="price-icon price-icon-2"
        >￥{{ data.goodsList[2].retailPrice }}</view
      >
    </view>

    <!-- 一张图 -->
    <view
      class="goods-layout one  animate__flipInX"
      v-if="data.goodsList.length === 1"
    >
      <img class="img" :src="data.goodsList[0].picUrl" alt="" />
      <view class="price-icon">￥{{ data.goodsList[0].retailPrice }}</view>
    </view>

    <!-- 两张图 -->
    <view class="goods-layout two" v-if="data.goodsList.length === 2">
      <img
        class="img  animate__lightSpeedInLeft"
        :src="data.goodsList[0].picUrl"
        alt=""
      />
      <img
        class="img  animate__lightSpeedInRight"
        :src="data.goodsList[1].picUrl"
        alt=""
      />

      <view class="price-icon" style="left: 0; top: 20upx"
        >￥{{ data.goodsList[0].retailPrice }}</view
      ><view
        class="price-icon"
        style="top: 20upx; right: 0; border-radius: 100px 0 0 100px"
        >￥{{ data.goodsList[1].retailPrice }}</view
      >
    </view>
  </div>
</template>

<script>
import Rate from "../rate";
import { J_STORE_TYPES } from "../../constant";
import { getStoreTypesApi } from "../../api/user";
export default {
  components: {
    Rate,
  },
  props: {
    data: Object,
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {
    /**
     * @description 点击进店
     */
    handleEnterStore() {
      uni.navigateTo({
        url: "/store/store-detail?storeId=" + this.data.brand.id,
      });
    },

    // 获取types
    getTypes(value) {
      const _this = this;
      let types = uni.getStorageSync(J_STORE_TYPES);
      if (!types) {
        getStoreTypesApi({
          page: 1,
          size: 30,
        })
          .then(({ data }) => {
            types = data.items;
            uni.setStorageSync(J_STORE_TYPES, data.items);
            return _this.setTypes(types, value);
          })
          .catch((e) => {
            console.log(e);
            _this.$showToast("门店类型获取失败");
          });
      } else {
        return this.setTypes(types, value);
      }
    },

    setTypes(types, type) {
      const item = types.find((item) => item.id === type);
      return item && item.storeName;
    },
  },
};
</script>

<style lang="less" scoped>
.panel {
  margin-bottom: 52upx;

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 20upx;

    .avatar {
      width: 80upx;
      height: 80upx;
      border-radius: 50%;
      margin-right: 28upx;
    }

    .info {
      flex: 1;
      .name {
        color: #3d3d3d;
        font-size: 24upx;
        font-weight: bold;
        margin-bottom: 12upx;
      }
      .tem {
        display: flex;
        align-items: center;
      }
      .rate {
        margin-right: 6upx;
        img {
          width: 22upx;
          height: 22upx;
          vertical-align: -4upx;
          margin-right: 4upx;
        }
      }

      .tem,
      .year {
        color: #3d3d3d;
        font-size: 20upx;
      }

      .type {
        padding: 0 14upx 0 4upx;
        border-right: 4upx solid #ccc;
      }

      .year {
        padding-left: 14upx;
      }
    }

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 110upx;
      height: 36upx;
      background-color: #07b9b9;
      border-radius: 40upx;
      color: #fff;
      font-size: 20upx;
      padding-top: 2upx;
    }
  }

  .goods-layout {
    display: flex;
    width: 100%;
    justify-content: space-between;

    .store {
      width: 496upx;
      height: 300upx;
      border-radius: 20upx 0 0 20upx;
      margin-right: 6upx;
    }

    .right {
      display: flex;
      justify-content: space-between;
      flex-direction: column;
      flex: 1;

      img {
        height: 146upx;
        border-radius: 0 20upx 20upx 0;
      }
    }
  }

  .one {
    position: relative;
    width: 100%;
    border-radius: 20upx;
    overflow: hidden;

    .img {
      width: 100%;
      height: 300upx;
      object-fit: cover;
    }

    .price-icon {
      position: absolute;
      left: 0;
      top: 20upx;
      width: 110upx;
      height: 54upx;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 0 100px 100px 0;
      color: #fff;
      font-size: 28upx;
      text-align: center;
      line-height: 54upx;
    }
  }

  .two {
    position: relative;
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 300upx;
    .img {
      border-radius: 20upx;
      width: 49.3%;
      object-fit: cover;
    }

    .price-icon {
      position: absolute;
      top: 20upx;
      width: 110upx;
      height: 54upx;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 0 100px 100px 0;
      color: #fff;
      font-size: 28upx;
      text-align: center;
      line-height: 54upx;
    }
  }

  .three {
    position: relative;
    .price-icon {
      position: absolute;
      width: 110upx;
      height: 54upx;
      background-color: rgba(0, 0, 0, 0.3);
      border-radius: 0 100px 100px 0;
      color: #fff;
      font-size: 28upx;
      text-align: center;
      line-height: 54upx;

      &-1 {
        width: 76upx;
        height: 32upx;
        right: 0;
        font-size: 24upx;
        line-height: 32upx;
        top: 26upx;
      }

      &-2 {
        width: 76upx;
        height: 32upx;
        right: 0;
        font-size: 24upx;
        line-height: 32upx;
        bottom: 20upx;
      }
    }
  }
}
</style>