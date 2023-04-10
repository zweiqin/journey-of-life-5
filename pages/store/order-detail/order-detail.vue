<template>
  <view class="order-detail-container">
    <view class="order-detail-header">
      <BeeBack>
        <view class="title">
          <BeeIcon name="arrowleft" :size="24" color="#000000"></BeeIcon>
          <text class="title">订单详情</text>
        </view>
      </BeeBack>

      <BeeShare>
        <view class="share-container">
          <text>分享</text>
          <BeeIcon :size="20" :src="require('../../../static/brand/order-detail/share.png')"></BeeIcon>
        </view>
      </BeeShare>
    </view>

    <view class="order-main-area pane">
      <view class="goods-item" v-for="item in 3 " :key="item">
        <BeeAvatar :size="60" radius="10upx"
          src="https://img0.baidu.com/it/u=833683927,1099936825&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1422"></BeeAvatar>
        <view class="good-detial">
          <view class="name">Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro distinctio, ea unde
            architecto, pariatur modi sint blanditiis enim laudantium similique sed eveniet aperiam. Fugit beatae delectus
            cum quia tenetur veniam?</view>

          <view class="price-text">
            <view class="price-wrapper">
              <text class="current-price">￥987</text>
              <text class="old-price">￥987</text>
            </view>
            <view class="op">
              <BeeIcon :size="22" :src="require('../../../static/brand/order-detail/jian.png')"></BeeIcon>
              <text class="number">1</text>
              <BeeIcon :size="22" :src="require('../../../static/brand/order-detail/add.png')"></BeeIcon>
            </view>
          </view>
        </view>
      </view>
    </view>

    <view class="total pane">
      <view class="item">
        <view class="title">菜品数</view>
        <view class="value">菜品数</view>
      </view>
      <view class="item">
        <view class="title">菜品数</view>
        <view class="value">优惠劵 <BeeIcon name="arrowright"></BeeIcon>
        </view>
      </view>
      <view class="item no font-16">
        小计
        <text class="total-price font-16 p-color">
          ￥987
        </text>
      </view>
    </view>

    <view class="footer-container f-s-b">
      <view class="finl-price">
        <text>
          实付
        </text>
        <text class="p-color">￥ <text style="font-size: 48upx;" class="f-w-500">99</text></text>
      </view>
      <button class="bee-btn r-5 f-w-500 f-center">提交订单</button>
    </view>
  </view>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '~@/style/mixin.less';

.order-detail-container {
  .pdd(27upx 22upx);
  min-height: 100vh;
  background-color: #F6F6F6;

  .order-detail-header {
    .flex();

    .title {
      .flex();
    }

    .share-container {
      .flex();

      text {
        margin-right: 8upx;
      }
    }
  }

  .pane {
    background-color: #fff;
    margin-top: 22upx;
    border-radius: 20upx;
    .pdd(32upx 26upx);
  }

  .total {
    .item {
      .flex();
      margin-top: 6upx;

      &:nth-child(1) {
        margin-top: 0
      }

      .value {
        .flex(flex-starty);
      }

      &.no {
        justify-content: flex-end
      }
    }
  }

  .order-main-area {
    .goods-item {
      .flex();
      margin-bottom: 40upx;

      .good-detial {
        flex: 1;
        margin-left: 8upx;

        .price-text {
          .flex();
        }

        .name {
          width: 366upx;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          color: #3d3d3d;
          font-weight: 500;
          margin-left: 10upx;
        }

        .price-text {
          margin-top: 8upx;

          text {
            font-size: 28upx;
            color: #fa5151;

            &.old-price {
              text-decoration: line-through;
              color: #999;
            }
          }
        }

        .op {
          .flex();

          .number {
            width: 28upx;
            height: 28upx;
            text-align: center;
            line-height: 28upx;
            color: #000;
            margin: 0 8upx;
          }
        }
      }
    }
  }

  .footer-container {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 120upx;
    background-color: #fff;
    .pdd(16upx);

    .bee-btn {
      width: 432upx;
      height: 88upx;
      background-color: #FF973F;
      color: #fff;
      transition: all 500ms;


      &:active{
        opacity: 0.1;
      }
    }
  }
}
</style>