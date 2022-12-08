<template>
  <view class="product-wrapper">
    <scroll-view scroll-x="true">
      <view class="container">
        <view class="item" v-for="item in 4" :key="item">
          <image
            class="img"
            src="https://img1.baidu.com/it/u=3040096502,2626833855&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=750"
            mode=""
          />

          <image
            src="../../../../../static/images/square/play-circle-fill.png"
            class="play-icon"
            mode=""
          />

          <view class="mask">
            <view class="priview">
              <image
                class="icon"
                style="width: 12px; height: 10px"
                src="../../../../../static/images/square/visited.png"
                mode=""
              />
              <text>预览</text>
            </view>

            <view class="priview">
              <image
                class="icon"
                style="width: 14px; height: 14px; margin-top: 2px"
                src="../../../../../static/images/square/download-2-fill.png"
                mode=""
              />
              <text>下载</text>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
.product-wrapper {
  .container {
    display: flex;
    align-items: center;
  }
  .item {
    position: relative;
    width: 284upx;
    height: 384upx;
    margin-right: 22upx;
    flex-shrink: 0;
    background-color: antiquewhite;
    border-radius: 10upx;
    overflow: hidden;

    .img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .play-icon {
      position: absolute;
      top: 20upx;
      right: 20upx;
      width: 40upx;
      height: 40upx;
    }

    .mask {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 76upx;
      background-color: rgba(92, 92, 92, 0.8);
      color: #fff;
      padding: 0 20upx;
      box-sizing: border-box;

      .icon{
        margin-right: 20upx;
      }
    }
  }
}
</style>