<template>
  <view class="talent-pane-container" v-if="data">
    <BeeAvatar
      :size="56"
      :src="
        data.avatar && data.avatar.includes('http')
          ? data.avatar
          : 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/' +
            data.avatar
      "
    ></BeeAvatar>
    <view class="talent-info">
      <view class="info-1">
        <text class="name">
          <text>{{ isTalent ? data.name : data.nickname }}</text>
        </text>
        <view class="address" v-if="data.regionName">
          <tui-icon color="#4F4F4F" :size="16" name="gps"></tui-icon>
          <text class="address-text">{{ data.regionName }}</text>
        </view>
      </view>

      <view class="tag" v-if="isTalent">
        <view class="level-wrapper">
          <text class="level-text">LV.7</text>
          <tui-icon name="star-fill" color="#fff" :size="12"></tui-icon>
          <tui-icon name="star-fill" color="#fff" :size="12"></tui-icon>
          <tui-icon name="star-fill" color="#fff" :size="12"></tui-icon>
          <tui-icon name="star-fill" color="#fff" :size="12"></tui-icon>
          <tui-icon name="star-fill" color="#fff" :size="12"></tui-icon>
          <tui-icon name="star-fill" color="#fff" :size="12"></tui-icon>
          <tui-icon name="star-fill" color="#fff" :size="12"></tui-icon>
        </view>
      </view>

      <view v-if="!isTalent" class="tag-2">
        <BeeIcon
          style="margin-top: -4upx"
          :src="require('../../../static/square/talent/vip.png')"
          :size="13"
        ></BeeIcon>
        <text>初级</text>
      </view>
      <view class="desc">
        {{ data.introduce || '无介绍' }}
      </view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    isTalent: {
      type: Boolean,
      default: true,
    },

    data: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="less" scoped>
view,
text {
  line-height: 1.5;
}

.talent-pane-container {
  width: 100%;
  background-color: #fff;
  padding: 32upx;
  box-sizing: border-box;
  border-radius: 12upx;
  display: flex;
  align-items: flex-start;
  margin-top: 20upx;

  /deep/ .tui-lazyload__box {
    border: 2upx solid #efefef;
  }

  .talent-info {
    margin-left: 24upx;
    flex: 1;

    .info-1 {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex: 1;

      .name {
        color: #261919;
        font-weight: bold;
        display: block;
        align-items: center;
        white-space: nowrap;
      }

      .address-text {
        color: #4f4f4f;
        margin-left: 6upx;
      }
    }

    .tag-2 {
      display: inline-flex;
      align-items: center;
      margin: 0;
      padding: 0 32upx;
      border-radius: 16px 16px 16px 0px;
      background: linear-gradient(90deg, #beeaa0 0%, #8aeeaf 100%);

      text {
        color: #fcfcfc;
        font-size: 24upx;
        margin-left: 6upx;
      }
    }

    .tag {
      margin: 8upx 0 24upx 0;

      .level-wrapper {
        display: inline-flex;
        padding: 0 16upx;
        border-radius: 0px 16px 16px 16px;
        background: #4f4f4f;
        color: #fcfcfc;
        font-size: 24upx;
        background: linear-gradient(90deg, #beeaa0 0%, #8aeeaf 100%);

        /deep/ .tui-icon {
          margin-top: 2upx !important;
        }

        .level-text {
          position: relative;
          margin-right: 12upx;
          padding-right: 12upx;
          display: flex;
          align-items: center;

          &::after {
            position: absolute;
            content: '|';
            display: block;
            right: 0;
            top: 50%;
            transform: translateY(-130%);
            width: 1upx;
            height: 18upx;
            color: #efefef;
          }
        }
      }
    }

    .desc {
      display: -webkit-box;
      overflow: hidden;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
  }
}
</style>
