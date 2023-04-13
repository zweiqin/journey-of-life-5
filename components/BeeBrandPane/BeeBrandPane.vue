<template>
  <view class="bee-brand-pane-container" @click="go('/pages/store/detail/detail?brandId=' + brandInfo.id)">
    <view class="left">
      <BeeAvatar
        :src="brandInfo.picUrl.includes('https') ? brandInfo.picUrl : 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/' + brandInfo.picUrl"
        radius="10upx"></BeeAvatar>
      <view class="tag"> 惊喜价 </view>
    </view>
    <view class="middle">
      <view class="brand-name hidden">{{ brandInfo.name }}</view>
      <view class="rate">
        <BeeIcon :size="12" :src="require('./images/star.png')"></BeeIcon>
        <text class="rate-text">4.5分</text>
        <text class="sub-text">{{ brandInfo.brandLabel | formatTag }}</text>
        <text class="rate-text">￥50/人</text>
        <text>月售462</text>
      </view>
      <BeeNavigation>
        <view class="location-wrapper">
          <BeeIcon :src="require('./images/location.png')" :size="14"></BeeIcon>
          <view class="detail">
            <text class="dis-container"> {{ (brandInfo.distance) / 1000 || 0 }}/km </text>
            <BeeIcon :src="require('./images/to.png')" :size="14"></BeeIcon>
          </view>
        </view>
      </BeeNavigation>
      <view class="elva">
        <BeeAvatar :size="15"></BeeAvatar>
        <view class="elva-text hidden">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorum
          facere ex fuga exercitationem, magni officia quo nostrum, pariatur
          minus corporis laborum! Molestias quo dicta ad quis harum veniam, et
          ratione!</view>
      </view>

      <view class="welfare-wrapper">
        <view class="welfare-item" v-for="(item, index) in templateData" :key="index">
          <view class="tag">{{ item.type }}</view>
          <text class="price-text">{{ item.price }}元</text>
          <view class="tag2">{{ item.discount }}折</view>
          <text class="desc">{{ item.desc }}</text>
        </view>
      </view>
    </view>
    <!-- <view class="right">
      <BeeIcon :size="25" class="heart-icon" :src="require('./images/heart.png')"></BeeIcon>
    </view> -->
  </view>
</template>

<script>
import { templateData } from './data'
export default {
  props: {
    brandInfo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      templateData: Object.freeze(templateData),
    }
  },

  filters: {
    formatTag(value) {
      return {
        0: '美酒',
        1: "美食",
        2: "娱乐",
        3: "好玩"
      }[value] || ""
    }
  }
}
</script>

<style lang="less" scoped>
.hidden {
  width: 374upx;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.bee-brand-pane-container {
  // width: 100%;
  background-color: #fff;
  padding: 24upx 20upx;
  border-radius: 20upx;
  margin-top: 16upx;
  display: flex;
  align-items: flex-start;
  transition: all 350ms;

  &:active {
    background-color: #e9e9e9;
  }

  .left {
    display: flex;
    align-items: center;
    flex-direction: column;

    .tag {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 104upx;
      height: 38upx;
      background: url('./images/tag1.png');
      background-size: cover;
      color: #cb511e;
      font-size: 24upx;
      margin-top: 52upx;
    }
  }

  .middle {
    flex: 1;
    margin: 0 28upx;

    .brand-name {
      color: #000;
      font-size: 32upx;
      font-weight: bold;
    }

    .rate {
      display: flex;
      align-items: center;
      font-size: 24upx;

      text {
        font-size: 24upx;
        margin-left: 8upx;

        &.rate-text {
          color: #fa5151;
        }
      }
    }

    .location-wrapper {
      display: flex;
      align-items: center;

      // /deep/ .icon-container {
      //   margin-top: 6upx;
      // }

      .detail {
        display: flex;
        align-items: center;
        background-color: #efefef;
        vertical-align: text-bottom;
        padding: 0 4upx;
        border-radius: 4upx;
        margin-left: 4upx;
      }
    }

    .elva {
      display: flex;
      align-items: center;
      margin: 8upx 0;

      .elva-text {
        width: 348upx;
        margin-left: 10upx;
      }
    }

    .welfare-wrapper {
      margin-top: 20upx;

      .welfare-item {
        display: flex;
        align-items: center;
        margin-bottom: 20upx;

        text {
          margin: 0 10upx;
        }

        .tag {
          width: 30upx;
          height: 30upx;
          text-align: center;
          line-height: 30upx;
          font-size: 20upx;
          color: #fff;
          background: #fb7726;
        }

        .price-text {
          color: #fa5151;
        }

        .tag2 {
          width: 48upx;
          height: 28upx;
          background-color: #fcdbdb;
          color: #fa5151;
          font-size: 20upx;
          text-align: center;
          line-height: 28upx;
        }
      }
    }
  }

  .right {
    height: 326upx;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    .heart-icon {
      border-radius: 50%;
      transition: all 350ms;

      &:active {
        background-color: #ffd8d8;
      }
    }
  }
}
</style>
