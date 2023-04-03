<template>
  <view @click="extensionCodeUrl = ''" class="code-mask" :style="{
    opacity: extensionCodeUrl && userInfo && userInfo.nickName ? '1' : '0',
    'z-index':
      extensionCodeUrl && userInfo && userInfo.nickName ? '1' : '-1',
  }">
    <view class="code-wrapper" :style="{
      transform: extensionCodeUrl ? 'scale(1)' : 'scale(0)',
    }">
      <view class="header">
        <image class="header-icon" src="/static/images/user/ju-icon.png" mode="" />
        <text>巨蜂商城</text>
      </view>

      <view class="big-wrapper">
        <image src="/static/images/user/ju-icon-p.png" class="big-icon" />
      </view>

      <view class="images">
        <view class="zhiwen">
          <image src="/static/images/user/zhi.png" alt="" />
          <text>长按扫码</text>
        </view>
        <image class="code" :src="extensionCodeUrl" alt="" />
      </view>

      <button class="uni-btn" @click="extensionCodeUrl = ''">取消</button>
    </view>
  </view>
</template>

<script>
import { J_USER_INFO } from '../../../constant'
import { getExtensionCodeApi } from '../../../api/user'
import { getUserId } from '../../../utils'
export default {
  data() {
    return {
      extensionCodeUrl: '',
      userInfo: {}
    }
  },

  methods: {
    getCode() {
      this.userInfo = uni.getStorageSync(J_USER_INFO);
      uni.showLoading({
        title: '加载中',
      })
      getExtensionCodeApi({
        url: `https://www.tuanfengkeji.cn/JFShop_Uni_H5/#/pages/login/login?userId=${getUserId()}&type=bind`,
      }).then(({ data }) => {
        this.extensionCodeUrl = data
        uni.hideLoading()
      })
    }
  },
}
</script>

<style lang="scss" scoped>
.code-mask {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
  transition: all 350ms;
  opacity: 0;

  .code-wrapper {
    width: 600upx;
    padding: 30upx;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 20upx;
    transform: scale(0);
    transition: all 350ms;

    .images {
      display: flex;
      margin: 30upx 0;
      justify-content: space-around;

      .zhiwen {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        color: #999999;

        image {
          width: 120upx;
          height: 120upx;
          margin-bottom: 10upx;
        }
      }

      image {
        width: 200upx;
        height: 200upx;
        object-fit: cover;
      }
    }

    .header {
      display: flex;
      justify-content: center;
      align-items: center;

      .header-icon {
        width: 60upx;
        height: 60upx;
        margin-right: 10px;
      }
    }

    .big-wrapper {
      width: 100%;
      margin-top: 70upx;
      justify-content: center;
      display: flex;

      .big-icon {
        width: 400upx;
        height: 400upx;
        object-fit: cover;
      }
    }

    .code-title {
      text-align: center;
      font-size: 36upx;
      font-weight: bold;
      margin-top: 20upx;
    }

    .code {
      width: 540upx;
      height: 540upx;
      object-fit: cover;
      border-radius: 54upx;
    }

    .uni-btn {
      padding-top: 20upx;
      border-top: 1upx solid #ccc;
      font-size: 32upx;
      letter-spacing: 1em;
      color: #ccc;
    }
  }
}
</style>