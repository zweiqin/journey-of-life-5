<template>
  <view
    class="goods-skeleton-container"
    :style="{ padding: padding, background: background }"
  >
    <view
      v-for="item in number"
      :key="item"
      class="goods-container"
      @click="go('/pages/prod/prod?goodsId=' + data.id)"
    >
      <view class="image"></view>

      <view class="goods-info">
        <view class="goods-name hiden-text"> </view>

        <view class="tags">
          <view class="tag"></view>
          <view class="tag"></view>
        </view>

        <view class="item">
          <view class="price-text">
            <text></text>
          </view>
          <button class="bee-btn"></button>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    number: {
      type: Number,
      default: 10,
    },

    padding: {
      type: String,
    },

    background: {
      type: String,
    },
  },
}
</script>

<style lang="less" scoped>
@keyframes loading {
  100% {
    transform: translateX(100%);
  }
}

.goods-skeleton-container {
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
  box-sizing: border-box;
  background: transparent;
}

.goods-container {
  border-radius: 20upx;
  overflow: hidden;
  background-color: #fff;
  width: 348upx;
  margin-bottom: 26upx;

  .image {
    width: 100%;
    height: 300upx;
    background-color: #f5f5f5;
  }

  .image::after {
    content: '';
    display: block;
    width: 200px;
    height: 100%;
    transform: translateX(-100%);
    background: linear-gradient(
      90deg,
      transparent,
      rgba(225, 225, 225, 0.753),
      transparent
    );
    animation: loading 1.5s infinite;
  }

  .goods-info {
    padding: 14upx 22upx;
    box-sizing: border-box;
    background-color: #fff;

    .goods-name {
      width: 100%;
      height: 36upx;
      background-color: #f5f5f5;

      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        background: linear-gradient(
          90deg,
          transparent,
          rgba(225, 225, 225, 0.753),
          transparent
        );
        animation: loading 1.5s infinite;
      }
    }
  }

  .tags {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    font-size: 20upx;
    color: #777;
    margin: 12upx 0 26upx 0;

    .tag {
      flex: 0 0 150upx;
      height: 40upx;
      background-color: #f5f5f5;
      overflow: hidden;

      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        background: linear-gradient(
          90deg,
          transparent,
          rgba(225, 225, 225, 0.753),
          transparent
        );
        animation: loading 1.5s infinite;
      }
      &:nth-child(1) {
        margin-right: 20upx;
      }
    }
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: space-between;

    .bee-btn {
      width: 100upx;
      height: 38upx;
      border-radius: 10upx;
      background-color: #f5f5f5;
      overflow: hidden;

      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        background: linear-gradient(
          90deg,
          transparent,
          rgba(225, 225, 225, 0.753),
          transparent
        );
        animation: loading 1.5s infinite;
      }
    }

    .price-text {
      height: 38upx;
      width: 100upx;
      background-color: #f5f5f5;
      overflow: hidden;

      &::after {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        transform: translateX(-100%);
        background: linear-gradient(
          90deg,
          transparent,
          rgba(225, 225, 225, 0.753),
          transparent
        );
        animation: loading 1.5s infinite;
      }

      text {
        font-size: 36upx;
      }
    }
  }
}
</style>
