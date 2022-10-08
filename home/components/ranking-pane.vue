<template>
  <view class="ranking-pane-conainer">
    <view class="header">
      <view class="title">日用百货热卖榜</view>
      <view class="number">2982.8万人买过</view>
    </view>

    <view class="ranking-wrapper">
      <view class="top1">
        <image
          class="img"
          src="https://img2.baidu.com/it/u=2228671021,902965757&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          mode=""
        />
        <view class="name">不锈钢勺子306食不锈钢勺子306食不锈钢勺子306食</view>
      </view>

      <view class="top2">
        <image
          class="img"
          src="https://img2.baidu.com/it/u=2228671021,902965757&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          mode=""
        />
        <view class="name">不锈钢勺子306食不锈钢勺子306食不锈钢勺子306食</view>
      </view>

      <view class="top3">
        <image
          class="img"
          src="https://img2.baidu.com/it/u=2228671021,902965757&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500"
          mode=""
        />
        <view class="name">不锈钢勺子306食不锈钢勺子306食不锈钢勺子306食</view>
      </view>
    </view>
  </view>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.ranking-pane-conainer {
  width: 100%;
  font-size: 24upx;
  color: #3d3d3d;
  margin-bottom: 30upx;
  padding-bottom: 30upx;

  .top1 {
    position: relative;
    &::after {
      position: absolute;
      content: "";
      display: block;
      width: 20upx;
      height: 40upx;
      background: url("https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/nootkt3z79jxqs9kgbe4.png")
        no-repeat;
      top: 0;
      left: 12upx;
      background-size: cover;
    }
  }

  .top2 {
    position: relative;
    &::after {
      position: absolute;
      content: "";
      display: block;
      width: 20upx;
      height: 40upx;
      background: url("https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/p2li1v9tppx1sfsermsv.png")
        no-repeat;
      top: 0;
      left: 12upx;
      background-size: cover;
    }
  }

  .top3 {
    position: relative;
    &::after {
      position: absolute;
      content: "";
      display: block;
      width: 20upx;
      height: 40upx;
      background: url("https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/lvb27ll5s5jhnpzod042.png")
        no-repeat;
      top: 0;
      left: 12upx;
      background-size: cover;
    }
  }

  .header {
    .flex();
    margin-bottom: 24upx;

    .number {
      font-weight: 100;
    }
  }

  .ranking-wrapper {
    .flex();

    .img {
      width: 182upx;
      height: 192upx;
      object-fit: cover;
      border-radius: 10upx;
    }

    .name {
      width: 180upx;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      margin-top: 10upx;
    }
  }
}
</style>