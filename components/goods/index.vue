<template>
  <div class="goods" @click="handeViewDetail">
    <img
      class="img"
      :src="
        url ||
        'https://img2.baidu.com/it/u=1766258309,950066704&fm=253&fmt=auto&app=138&f=JPEG?w=499&h=305'
      "
      alt=""
    />

    <view class="body">
      <view class="name">{{ desc || "GLOSTAD" }} </view>
      <!-- <view class="name">{{ sname || "二人沙发" }} </view> -->
      <view class="tags">
        <view class="tag">品牌老店</view>
        <view class="tag">官方体验店</view>
      </view>
      <view class="info">
        <view class="left">
          <text class="icon">{{ name }}</text>
        </view>

        <view class="right">
          <view style="color: #3d3d3d"
            ><image
              style="
                width: 28upx;
                height: 24upx;
                margin-right: 10upx;
                color: #3d3d3d;
              "
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/1035vvc88rxf5768exul.png"
              mode=""
            />
            {{ getRandom(100, 1000) }}
          </view>
        </view>
      </view>
    </view>
  </div>
</template>

<script>
import { getRandom } from "../../utils";

export default {
  props: {
    desc: String,
    sname: String,
    price: [String, Number],
    payNumber: String,
    url: String,
    id: [Number, String],
    name: String,
  },

  methods: {
    handeViewDetail() {
      // if (!this.id) {
      //   return;
      // }
      uni.navigateTo({
        url: `/store/store-detail`,
      });
    },

    getRandom,
  },
};
</script>

<style lang="less" scoped>
.goods {
  border-radius: 20upx 20upx 0 0;
  overflow: hidden;
  margin-bottom: 12upx;
  width: 348upx;

  .img {
    width: 100%;
    height: 290upx;
  }

  .body {
    padding: 14upx 26upx 26upx 22upx;
    box-sizing: border-box;
    width: 348upx;

    .name {
      width: 348upx;
      color: #3d3d3d;
      font-size: 20upx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;

      &:nth-child(2) {
        margin: 6upx 0 12upx 0;
      }
    }

    .tags {
      display: flex;
      align-items: center;
      margin: 8upx 0 18upx 0;
      .tag {
        font-size: 20upx;
        color: #fa5151;
        border: 1upx solid #fa5151;
        padding: 7upx 10upx;
        border-radius: 20px;

        &:nth-child(1) {
          margin-right: 30upx;
        }
      }
    }

    .info {
      display: flex;
      justify-content: space-between;

      .icon {
        color: #3d3d3d;
        font-size: 20upx;
        vertical-align: top;
      }

      .price {
        color: #ff8f1f;
        font-size: 36upx;
        padding: 0;
      }

      .right {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        color: #3d3d3d;
        font-size: 20upx;

        &::after {
          position: absolute;
          right: 0;
          bottom: -10px;
          content: "...";
          font-weight: bold;
          font-size: 40upx;
        }

        // .dots {
        //   color: #767676;
        //   text-align: right;
        //   font-size: 60upx;
        //   line-height: 1;
        // }
      }
    }
  }
}
</style>