<template>
  <view class="store-detail-container" v-if="brandDetail">
    <view class="header">
      <image
        @click="handleBack"
        class="back"
        src="../static/images/store/back.png"
        mode=""
      />
      <h1>门店详情</h1>
    </view>

    <!-- 轮播图 -->
    <scroll-view scroll-x="true">
      <view class="img-wrapper" style="width: 100%">
        <image class="scroll-image" :src="brandDetail.picUrl" mode="" />
      </view>
    </scroll-view>

    <!-- 门店信息 -->
    <view class="brand-info">
      <view class="brand-name"> {{ brandDetail.name }} </view>
      <view class="rate">
        <Rate :size="13" :rate="4"></Rate>
        <text style="color: #fa5151">4.5</text>
        <text>243条</text>
        <text>￥88/人</text>
      </view>
      <view class="local">
        <text
          >口味:4.5&nbsp;&nbsp;环境:4.2&nbsp;&nbsp;服务:4.1&nbsp;&nbsp;食材:4.1</text
        >
        <text>顺德·龙江</text>
      </view>

      <view class="info-item">
        <view class="item">
          <image src="../static/images/store/alarm-fill.png" mode="" />
          <text>营业至{{ brandDetail.endTime }}</text>
        </view>

        <view class="item">
          <image src="../static/images/store/door-open-fill.png" mode="" />
          <text>包厢</text>
        </view>

        <view class="item">
          <image
            src="../static/images/store/money-cny-circle-fill.png"
            mode=""
          />
          <text>可自助点餐</text>
        </view>
      </view>

      <view class="info-item address">
        <view class="address-detail">
          <image src="../static/images/store/map-pin-2-fill.png" mode="" />
          <view>
            <view> {{ brandDetail.address || '暂无' }}</view>
            <!-- <view class="tip">盈信广场内部</view> -->
          </view>
        </view>
        <view class="phone" @click="handleCall">
          <image src="../static/images/store/phone-fill.png" mode="" />
        </view>
      </view>

      <view class="info-item">
        <image src="../static/images/store/bookmark-2-fill.png" mode="" />
        <text style="flex: 1">优惠劵</text>
        <image
          class="right-arrow"
          src="../static/images/store/back.png"
          mode=""
        />
      </view>

      <!-- 拼团 -->
      <view class="scrabble-dough">
        <view class="dough-title">
          <view class="icon">团</view>
          <text>团购套餐</text>
        </view>

        <ul>
          <!-- <li v-for="item in 4" :key="item">
            <image
              src="https://img0.baidu.com/it/u=3415069630,1936432822&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750"
              mode=""
            />

            <view class="goods-info">
              <view class="top">
                <text>秋冬尝鲜双人餐</text>
                <button class="uni-btn">抢购</button>
              </view>
              <view class="bottom">
                <view class="goods-price">
                  <text>￥239</text>
                  <text>￥289</text>
                  <text>4.2折</text>
                </view>
                <view class="salsed">已售10+</view>
              </view>
            </view>
          </li> -->
          
        </ul>

        <view class="no-data">
          <image style="width: 100upx; height: 100upx; margin: 20px auto" src="https://img2.baidu.com/it/u=1488532551,1832739249&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500" mode="" />
          <text>暂无团购套餐</text>
        </view>
      </view>

      <!-- vip -->
      <view class="vip-pane">
        <view class="title">VIP</view>
        <view class="vip-info">
          <view style="display: flex">
            <text>加入门店会员</text>
            <view class="icon-wrapper">
              <image
                src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/wgk2r94me3kexvaogug4.png"
                mode=""
              />
            </view>
          </view>

          <view style="font-size: 12px; margin-top: 3px">
            加入会员，福利多多
          </view>
        </view>
        <button class="uni-btn">立即开通</button>
      </view>
    </view>
  </view>
</template>

<script>
import { getStoreDetailApi } from "../api/store";
import Rate from "../components/rate";
export default {
  components: {
    Rate,
  },

  data() {
    return {
      brandId: null,
      brandDetail: {},
    };
  },

  onLoad(params) {
    this.brandId = params.storeId;
    this.getBrandDetail();
  },

  methods: {
    // 回退
    handleBack() {
      const pages = getCurrentPages();
      if (pages.length >= 2) {
        if (pages[0].__page__.fullPath === "/pages/store/store") {
          uni.switchTab({
            url: "/pages/store/store",
          });
        } else {
          uni.navigateTo({ url: pages[0].__page__.fullPath });
        }
      } else {
        uni.switchTab({
          url: "/pages/store/store",
        });
      }
    },

    // 获取门店信息
    async getBrandDetail() {
      uni.showLoading({
        title: "加载中",
      });
      const { data } = await getStoreDetailApi(this.brandId);
      console.log(data);
      this.brandDetail = data.brand;
      uni.setNavigationBarTitle({
        title: data.brand.name,
      });
      uni.hideLoading();
    },

    // 打电话
    handleCall(){
      uni.makePhoneCall({
        phoneNumber: this.brandDetail.phone
      })
    }
  },
};
</script>

<style lang="less" scoped>
.right-arrow {
  transform: rotate(180deg);
  width: 12upx !important;
  height: 20upx !important;
}

.store-detail-container {
  font-size: 28upx;
  padding-bottom: 40px;

  .header {
    padding: 40upx 32upx;
    box-sizing: border-box;
    display: flex;
    align-items: center;

    .back {
      width: 16upx;
      height: 28upx;
      object-fit: cover;
      margin-right: 28upx;
    }

    h1 {
      font-size: 36upx;
      font-weight: normal;
    }
  }

  .img-wrapper {
    display: flex;
    padding-left: 30upx;

    .scroll-image {
      width: 620upx;
      flex-shrink: 0;
      height: 396upx;
      border-radius: 20upx;
      margin-right: 18upx;
    }
  }

  // 门店信息
  .brand-info {
    padding: 0 30upx;
    box-sizing: border-box;
    font-size: 24upx;
    margin-top: 20upx;

    .brand-name {
      font-size: 36upx;
      font-weight: bold;
    }

    .rate {
      display: flex;
      align-items: center;
      margin: 22upx 0;

      text {
        margin: 0 8upx;
      }
    }

    .local {
      color: #777;
      display: flex;
      justify-content: space-between;
      margin-bottom: 22upx;
    }

    .info-item {
      display: flex;
      align-items: center;
      font-size: 28upx;
      padding: 26upx 0;
      border-top: 1upx solid #d8d8d8;

      .item {
        display: flex;
        align-items: center;
        margin-right: 34upx;
      }
      image {
        width: 36upx;
        height: 36upx;
        flex-shrink: 0;
        margin-right: 20upx;
      }
    }
  }

  .address {
    display: flex;
    align-items: flex-start !important;

    .address-detail {
      display: flex;
      flex: 1;
      margin-right: 20upx;

      .tip {
        color: #777;
        font-size: 24upx;
        margin-top: 20upx;
      }
    }

    .phone {
      border-left: 1upx solid #777;
      padding-left: 10px;
    }
  }

  // 拼团
  .scrabble-dough {
    position: relative;
    margin-top: 40upx;
    font-size: 28upx;
    padding-bottom: 30upx;
    border-bottom: 1upx solid #d8d8d8;

    &::after {
      position: absolute;
      width: 120vw;
      height: 20upx;
      content: "";
      top: -40upx;
      left: -40upx;
      background-color: #efefef;
    }

    .dough-title {
      display: flex;
      align-items: center;
      margin-top: 10upx;

      .icon {
        margin-right: 20upx;
        width: 30upx;
        height: 30upx;
        color: #fff;
        background: linear-gradient(180deg, #fa5151, #ff8f1f);
        text-align: center;
        line-height: 30upx;
        font-size: 20upx;
        border-radius: 2px;
      }
    }

    ul {
      padding: 0;

      li {
        display: flex;
        margin-top: 20upx;

        image {
          width: 120upx;
          height: 120upx;
          border-radius: 20upx;
          flex-shrink: 0;
          margin-right: 26upx;
        }

        .goods-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-around;

          .top,
          .bottom {
            display: flex;
            align-items: center;
            justify-content: space-between;
          }

          .uni-btn {
            font-size: 28upx;
            color: #fff;
            padding: 12upx 32upx;
            border-radius: 100px;
            background-color: #fa5151;
          }
        }
      }
    }
  }

  // vip
  .vip-pane {
    display: flex;
    align-items: center;
    margin-top: 40upx;
    background-color: #ea0000;
    width: 100%;
    height: 120upx;
    border-radius: 4upx;
    padding: 0 16upx;
    box-sizing: border-box;

    .title {
      font-size: 72upx;
      color: #fff;
      font-weight: bold;
    }

    .vip-info {
      flex: 1;
      font-size: 28upx;
      color: #fff;
      margin-left: 20upx;
    }

    .uni-btn {
      color: #9b2b2b;
      padding: 18upx 50upx;
      border-radius: 100px;
      height: 48upx;
      line-height: 14upx;
      box-sizing: border-box;
      background: linear-gradient(90deg, #e3a144 0%, #fbddad 100%);
    }

    .icon-wrapper {
      margin-left: 12upx;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 42upx;
      height: 42upx;
      background: linear-gradient(180deg, #ff8f1f 0%, #ffc300 98%);
      border-radius: 50%;

      image {
        width: 26upx;
        height: 26upx;
      }
    }
  }


  .no-data{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: #777;
    letter-spacing: 3px;
  }
}
</style>