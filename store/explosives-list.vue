<template>
  <view class="explosives-list-container">
    <JHeader
      width="50"
      height="50"
      tabbar="/pages/store/store"
      title="爆品推荐"
    ></JHeader>

    <image
      class="banner"
      src="https://img0.baidu.com/it/u=473055665,1493117343&fm=253&fmt=auto&app=138&f=PNG?w=1371&h=500"
      mode=""
    />

    <view class="explosives-main">
      <view class="explosives-main-header">
        <image
          class="icon1"
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/dh4wc755o5yehsfivazo.png"
          mode=""
        />
        <image
          class="icon2"
          src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/2z3z43i73zj03yws5o1t.png"
          mode=""
        />
      </view>

      <view class="explosives-main-list-wrapper">
        <view class="explosives-item">
          <image
            class="goods-image"
            src="https://img0.baidu.com/it/u=4141210398,2430615410&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            mode=""
          />

          <view class="name"> 现代简约网红真皮 沙发小户型三四... </view>

          <view class="tag-info"
            >限时￥<text class="tag-info-price">1589</text>
            <image
              class="qi-icon"
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/fgz4sfe921sw6pk46a4b.png"
              mode=""
          /></view>
        </view>

        <view class="explosives-item">
          <image
            class="goods-image"
            src="https://img0.baidu.com/it/u=4141210398,2430615410&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            mode=""
          />

          <view class="name"> 现代简约网红真皮 沙发小户型三四... </view>

          <view class="tag-info"
            >限时￥<text class="tag-info-price">1589</text>
            <image
              class="qi-icon"
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/fgz4sfe921sw6pk46a4b.png"
              mode=""
          /></view>
        </view>

        <view class="explosives-item">
          <image
            class="goods-image"
            src="https://img0.baidu.com/it/u=4141210398,2430615410&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            mode=""
          />

          <view class="name"> 现代简约网红真皮 沙发小户型三四... </view>

          <view class="tag-info"
            >限时￥<text class="tag-info-price">1589</text>
            <image
              class="qi-icon"
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/fgz4sfe921sw6pk46a4b.png"
              mode=""
          /></view>
        </view>

        <view class="explosives-item">
          <image
            class="goods-image"
            src="https://img0.baidu.com/it/u=4141210398,2430615410&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            mode=""
          />

          <view class="name"> 现代简约网红真皮 沙发小户型三四... </view>

          <view class="tag-info"
            >限时￥<text class="tag-info-price">1589</text>
            <image
              class="qi-icon"
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/fgz4sfe921sw6pk46a4b.png"
              mode=""
          /></view>
        </view>

        <view class="explosives-item">
          <image
            class="goods-image"
            src="https://img0.baidu.com/it/u=4141210398,2430615410&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            mode=""
          />

          <view class="name"> 现代简约网红真皮 沙发小户型三四... </view>

          <view class="tag-info"
            >限时￥<text class="tag-info-price">1589</text>
            <image
              class="qi-icon"
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/fgz4sfe921sw6pk46a4b.png"
              mode=""
          /></view>
        </view>

        <view class="explosives-item">
          <image
            class="goods-image"
            src="https://img0.baidu.com/it/u=4141210398,2430615410&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
            mode=""
          />

          <view class="name"> 现代简约网红真皮 沙发小户型三四... </view>

          <view class="tag-info"
            >限时￥<text class="tag-info-price">1589</text>
            <image
              class="qi-icon"
              src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/fgz4sfe921sw6pk46a4b.png"
              mode=""
          /></view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.explosives-list-container {
  padding: 40upx 16upx;
  box-sizing: border-box;

  .banner {
    width: 100%;
    height: 208upx;
    border-radius: 10upx;
    margin: 12upx 0;
  }

  .explosives-main {
    padding: 54upx 16upx 34upx 16upx;
    border-radius: 10upx;
    box-sizing: border-box;
    background: linear-gradient(180deg, #fa5151, rgba(243, 175, 175));

    .explosives-main-header {
      display: flex;
      align-items: center;
      padding: 0 64upx 0 50upx;
      margin-bottom: 36upx;

      .icon1 {
        height: 72upx;
        margin-right: 40upx;
      }

      .icon2 {
        height: 95upx;
        width: 160upx;
      }
    }

    .explosives-main-list-wrapper {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;

      .explosives-item {
        position: relative;
        width: 223upx;
        padding: 20upx 10upx;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 10upx;
        margin-bottom: 12upx;

        &::after {
          content: "";
          display: block;
          position: absolute;
          top: 0;
          left: 8upx;
          width: 63upx;
          height: 66upx;
          background: url("https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/jmi3pjnfcjvcmr1rc5nb.png")
            no-repeat;
          background-size: cover;
        }

        .goods-image {
          width: 100%;
          height: 243upx;
          object-fit: cover;
        }

        .name {
          font-size: 24upx;
          color: #3d3d3d;
          display: -webkit-box;
          overflow: hidden;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
          line-height: 1.5;
        }

        .tag-info {
          position: relative;
          border: 1upx solid #fa5151;
          font-size: 20upx;
          color: #fa5151;
          height: 49upx;
          line-height: 49upx;
          border-radius: 30px;
          padding-left: 4upx;

          &-price {
            font-size: 28upx;
          }

          .qi-icon {
            position: absolute;
            top: 0;
            right: 0;
            height: 49upx;
            width: 57.26upx;
          }
        }
      }
    }
  }
}
</style>