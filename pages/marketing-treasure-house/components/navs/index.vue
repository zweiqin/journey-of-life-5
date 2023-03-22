<template>
  <view class="navs">
    <view
      @click="go(item.url)"
      v-for="(item, index) in navConfig"
      :key="index"
      class="item"
    >
      <image class="img1" :src="item.imageUrl" mode="" />
      <image
        class="img2"
        :style="{ width: item.width + 'upx' }"
        :src="item.icon"
        mode=""
      />
      <view class="descs" v-for="(descItem, index) in item.desc" :key="index">
        {{ descItem }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
      navConfig: [
        {
          imageUrl: require('../../../../static/images/square/icon1.png'),
          icon: require('../../../../static/images/square/baby.png'),
          url: '/marketing-treasure-house/marketing-house',
          desc: ['上千实战营销案例', '快速执行落地'],
          width: '106',
        },

        {
          imageUrl: require('../../../../static/images/square/icon2.png'),
          icon: require('../../../../static/images/square/squire-icon.png'),
          desc: ['达人入驻', '网红达人', '营销策划师'],
          url: '/marketing-treasure-house/talent-list/talent-list',
          width: '106',
        },
        {
          imageUrl: require('../../../../static/images/square/icon4.png'),
          icon: require('../../../../static/images/square/projects.png'),
          url: '/marketing-treasure-house/daren-square/daren-center',
          desc: ['巨蜂城市', 'APARKA创意园', '创业俱乐部'],
          width: '156',
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
uni-image {
  overflow: inherit;
}

.navs {
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #fff;
  margin-top: 20upx;
  padding: 44upx 0;

  .img1 {
    position: relative;
    width: 110upx;
    height: 110upx;
    border-radius: 50%;
    // overflow: hidden;
    margin-bottom: 20px;

    &::after {
      position: absolute;
      content: '';
      width: 100%;
      height: 4px;
      bottom: -24upx;
      left: 0;

      background: linear-gradient(180deg, #ffebd6, #fff4e9);
      border-radius: 50%;
    }
  }

  .img2 {
    height: 28upx;
    object-fit: cover;
    margin: 16upx 0;
  }

  .item {
    width: 212upx;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    color: #777;
    line-height: 1.5;
    background-color: #fafafa;
    padding: 20upx 0;

    .descs {
      font-size: 20upx;
    }
  }
}
</style>
