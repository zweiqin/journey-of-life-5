<template>
  <view class="user-page">
    <view class="tools">
      <img
        @click="go(item.url)"
        class="tool-img"
        v-for="item in tools"
        :key="item.icon"
        :src="item.icon"
        alt=""
      />
    </view>

    <!-- 用户信息 -->
    <view class="user-info">
      <view class="base">
        <img
          @click="toViewMineInfo"
          class="avatar"
          :src="
            userInfo.avatarUrl.includes('http')
              ? userInfo.avatarUrl
              : 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/' +
                userInfo.avatarUrl
          "
          alt=""
        />
        <view class="right" v-if="userInfo">
          <view class="name">{{ userInfo.nickName }}</view>
          <view class="vip-info">
            <text class="id">巨蜂ID {{ userInfo.userId }}</text>
            <!-- <img
              class="hu-icon"
              src="../../static/images/user/huyuan.png"
              alt=""
            />
            <text style="background: #fff" class="id">{{
              userInfo.userLevelDesc
            }}</text> -->
          </view>
        </view>

        <view class="no-login" v-else
          >未登录,
          <text class="go-login" @click="go('/pages/login/login')"
            >去登录~</text
          ></view
        >
      </view>
      <view class="prices">
        <view class="item">
          <view class="title"> 会员 </view>
          <view class="value">
            {{
              userInfo
                ? userInfo.userLevelDesc
                  ? userInfo.userLevelDesc
                  : '会员'
                : '游客'
            }}
          </view>
        </view>
        <view class="item">
          <view class="title">
            {{ userInfo.account || 0 }}<view class="bl-text">元</view>
          </view>
          <view class="value"> 余额 </view>
        </view>
        <!-- <view class="item">
          <view class="title">
            <view>0</view>
          </view>
          <view class="value"> 代金劵 </view>
        </view> -->
        <view class="item">
          <view class="title">
            {{ userInfo.commission || 0 }}
            <view class="bl-text">元</view>
          </view>
          <view class="value"> 收入佣金 </view>
        </view>

        <view class="item">
          <view class="title">
            {{ transformBigNumber(userInfo.voucherNumber || 0)
            }}<view class="bl-text">元</view>
          </view>
          <view class="value"> 代金劵 </view>
        </view>
      </view>
    </view>

    <!-- 第一个 -->
    <view class="collection">
      <UserPanel :currentTab="currentTab" :data="one" v-if="currentTab === 0">
        <view class="info">
          <view class="item" @click="handleToViewHistory('collection')">
            <text class="title">收藏</text>
            <text class="value">{{ userInfo.collectCount }}</text>
          </view>
          <view class="item" @click="handleToViewHistory('history')">
            <text class="title">足迹</text>
            <text class="value">{{ userInfo.footprintCount }}</text>
          </view>
          <view class="item" @click="handleToViewHistory('follow')">
            <text class="title">订阅</text>
            <text class="value">{{ userInfo.rssCount }}</text>
          </view>
        </view>
      </UserPanel>
      <UserPanel :currentTab="currentTab" :data="two" v-if="currentTab === 1">
        <view class="info">
          <view class="item">
            <text class="title">收藏</text>
            <text class="value">10</text>
          </view>
          <view class="item">
            <text class="title">足迹</text>
            <text class="value">56</text>
          </view>
          <view class="item" @click="bindtapsubscription">
            <text class="title">订阅</text>
            <text class="value">123</text>
          </view>
        </view>
      </UserPanel>
      <UserPanel
        :row="4"
        :showShadow="false"
        @clickItem="handleClickItem"
        :data="serve"
      ></UserPanel>

      <UserPanel :row="4" :showShadow="false" :data="digitalStore"></UserPanel>
      <UserPanel
        :row="4"
        :showShadow="false"
        :data="marketingTools"
      ></UserPanel>

      <UserPanel
        @clickItem="handleClickItem"
        :row="4"
        :showShadow="false"
        :data="otherServe"
      ></UserPanel>
    </view>

    <view
      @click="extensionCodeUrl = ''"
      class="code-mask"
      :style="{
        opacity: extensionCodeUrl && userInfo && userInfo.nickName ? '1' : '0',
        'z-index':
          extensionCodeUrl && userInfo && userInfo.nickName ? '1' : '-1',
      }"
    >
      <view
        class="code-wrapper"
        :style="{
          transform: extensionCodeUrl ? 'scale(1)' : 'scale(0)',
        }"
      >
        <view class="header">
          <image
            class="header-icon"
            src="/static/images/user/ju-icon.png"
            mode=""
          />
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
  </view>
</template>

<script>
import UserPanel from './components/user-panel.vue'
import {
  tools,
  one,
  two,
  three,
  serve,
  digitalStore,
  marketingTools,
  otherServe,
} from './config'
import { delayedLoginStatus, getUserId, transformBigNumber } from '../../utils'
import { J_USER_INFO, J_LOACTION, J_REFRSH, BIND_USER_ID } from '../../constant'
import {
  refrshUserInfoApi,
  getExtensionCodeApi,
  bindLastUserApi,
} from '../../api/user'

export default {
  components: {
    UserPanel,
  },
  data() {
    return {
      tools,
      one,
      two,
      three,
      serve,
      digitalStore,
      marketingTools,
      otherServe,
      collectiontype: 1,
      currentTab: 0,
      userInfo: null,
      extensionCodeUrl: '',
    }
  },

  onLoad() {
    delayedLoginStatus()
  },

  onShow() {
    const userInfo = uni.getStorageSync(J_USER_INFO)
    if (userInfo) {
      this.userInfo = userInfo
    } else {
      this.userInfo = ''
    }

    if (getUserId()) {
      refrshUserInfoApi({
        userId: getUserId(),
      }).then(res => {
        this.userInfo = res.data
        uni.setStorageSync(J_USER_INFO, res.data)
      })
    }

    uni.removeStorageSync(J_LOACTION)
    uni.removeStorageSync(J_REFRSH)
  },

  methods: {
    /**
     * @description 查看自己的信息
     */
    toViewMineInfo() {
      uni.navigateTo({
        url: '/user/info/detail',
      })
    },
    choseCollection() {
      let collectiontype = this.collectiontype
      if (collectiontype == 1) {
        this.collectiontype = 2
      } else {
        this.collectiontype = 1
      }
    },

    changeTab(tab) {
      this.currentTab = tab
    },
    bindtapsubscription() {
      uni.navigateTo({
        url: '/user/subscription/subscription',
      })
    },

    handleToViewHistory(page) {
      uni.navigateTo({
        url: '/user/sever/view-history?page=' + page,
      })
    },

    // 点击了icon
    handleClickItem(item) {
      if (item.type && item.type === 'extension') {
        this.getExtensionCode()
      }

      if (item.label === '进销存') {
        location.href = 'weixin://dl/business/?t=fT0Ivve8Fli'
      }
    },

    // 获取推广码
    getExtensionCode() {
      uni.showLoading({
        title: '加载中',
      })
      getExtensionCodeApi({
        url: `https://www.tuanfengkeji.cn/JFShop_Uni_H5/#/pages/login/login?userId=${getUserId()}&type=bind`,
      }).then(({ data }) => {
        this.extensionCodeUrl = data
        uni.hideLoading()
      })
    },

    transformBigNumber,
  },
  mounted() {
    // checkWhoami();
  },

  onLoad() {
    const bindUserId = uni.getStorageSync(BIND_USER_ID)
    if (bindUserId && bindUserId !== getUserId()) {
      bindLastUserApi({
        userId: [getUserId()],
        salesmanId: bindUserId,
      }).then(() => {
        this.$showToast('绑定成功')
        uni.removeStorageSync(BIND_USER_ID)
      })
    }
  },
}
</script>

<style lang="less" scoped>
.item {
  font-size: 24upx;
  padding: 0 24upx;

  &.active {
    font-weight: bold;
    color: #3d3d3d;
  }
}
.collection-chose {
  display: flex;
}
.user-page {
  padding: 20upx;
  padding-bottom: 120upx;
  background-color: #fdfdfd;

  .tools {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 14upx;

    .tool-img {
      width: 32upx;
      margin-left: 52upx;
    }
  }

  .user-info {
    padding: 20upx 20upx 0 20upx;
    margin-top: 8upx;
    .base {
      display: flex;
      .avatar {
        width: 108upx;
        height: 108upx;
        border-radius: 50%;
        margin-right: 40upx;
      }
      .right {
        .name {
          color: #3d3d3d;
          font-size: 28upx;
          margin-bottom: 20upx;
          font-weight: bold;
        }
        .vip-info {
          display: flex;
          align-items: center;
          .id {
            color: #3d3d3d;
            font-size: 20upx;
            font-weight: 100;
            padding: 4upx 34upx;
            background-color: #efefef;
            border-radius: 40px;
          }
          .hu-icon {
            width: 34upx;
            margin-left: 18upx;
          }
        }
      }

      .no-login {
        font-size: 28upx;
        display: flex;
        align-items: center;
        justify-content: center;
        letter-spacing: 2px;

        .go-login {
          color: #287add;
        }
      }
    }

    .prices {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 52upx 0 30upx 0;

      .item {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;

        .title {
          display: flex;
          align-items: flex-end;
          color: #3d3d3d;
          font-size: 28upx;
          font-weight: bold;
          margin-bottom: 16upx;
          white-space: nowrap;

          .bl-text {
            font-weight: normal;
            font-size: 20upx;
            transform: scale(0.8);
          }
        }

        .value {
          color: #999999;
          font-size: 24upx;
          letter-spacing: 2px;
        }
      }
    }
  }

  .info {
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1upx solid #d8d8d8;
    padding: 24upx 0;

    .item {
      padding: 0 54upx;
      border-right: 1upx solid #d8d8d8;

      &:last-child {
        border: none;
      }

      .title,
      .value {
        font-size: 24upx;
        font-weight: normal;
      }

      .title {
        color: #999999;
        margin-right: 12upx;
      }

      .value {
        color: #3d3d3d;
        font-weight: bold;
      }
    }
  }
}

// 推广码
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
