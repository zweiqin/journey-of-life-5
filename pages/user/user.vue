<template>
  <view class="user-center">
    <HeaderTool @menu-click="handleClickMenu"></HeaderTool>
    <UserInfo ref="userInfoRef"></UserInfo>

    <!-- 账户余额 -->
    <Pane title="账户余额" v-if="isLogin()">
      <text class="balance-text" slot="title">￥{{ userInfo.account || 0 }}</text>
      <button @click="empty()" class="bee-btn" slot="right">去提现</button>
    </Pane>

    <!-- 我的服务 -->
    <Pane @menu-click="handleClickMenu" title="我的工具" :menu-data="myTools"></Pane>

    <!-- 我的服务 -->
    <Pane @menu-click="handleClickMenu" title="我的服务" :menu-data="myServe"></Pane>

    <!-- 数字化门店 -->
    <Pane @menu-click="handleClickMenu" title="数字化营销门店" :menu-data="myStore"></Pane>

    <!-- 营销工具 -->
    <Pane @menu-click="handleClickMenu" title="营销工具" :menu-data="marketingTools"></Pane>

    <!-- 提示相关组件 -->
    <tui-toast ref="toast"></tui-toast>
    <tui-modal :show="$data._isShowTuiModel" title="提示" content="您还未登录，是否先去登录？"
      @click="_handleClickTuiModel($event, 'login', '/pages/user/user')"></tui-modal>
    <tui-modal :show="isShow" title="提示" content="您的会员等级不够，是否前去升级？" @click="handleUp"></tui-modal>

    <!-- 特殊的 menu 操作 -->
    <PromotioCcodePopup ref="codeRef"></PromotioCcodePopup>
  </view>
</template>

<script>
import HeaderTool from './components/HeaderTool.vue';
import UserInfo from './components/UserInfo.vue';
import Pane from './components/Pane.vue';
import { myTools, myServe, myStore, marketingTools } from './config'
import showModelMixin from '../../mixin/showModel'
import { J_USER_INFO, J_LOACTION, J_REFRSH, BIND_USER_ID } from '../../constant'
import PromotioCcodePopup from './components/PromotioCcodePopup.vue';
import { refrshUserInfoApi, bindLastUserApi } from '../../api/user'
import { getUserId } from '../../utils'

export default {
  components: {
    HeaderTool,
    UserInfo,
    Pane,
    PromotioCcodePopup
  },
  mixins: [showModelMixin()],
  data() {
    return {
      myTools: Object.freeze(myTools),
      myServe: Object.freeze(myServe),
      myStore: Object.freeze(myStore),
      marketingTools: Object.freeze(marketingTools),
      isShow: false,
      userInfo: {}
    }
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

  onShow() {
    const _this = this
    this.$forceUpdate();
    this.userInfo = uni.getStorageSync(J_USER_INFO);
    this.$nextTick(() => {
      this.$refs.userInfoRef.setUserInfo()
    })

    if (getUserId()) {
      refrshUserInfoApi({
        userId: getUserId(),
      }).then(res => {
        _this.userInfo = res.data
        uni.setStorageSync(J_USER_INFO, res.data)
        _this.$refs.userInfoRef.setUserInfo()
      })
    }

    uni.removeStorageSync(J_LOACTION)
    uni.removeStorageSync(J_REFRSH)
  },

  mounted() {
    this.$refs.userInfoRef.setUserInfo()
  },

  methods: {
    // 点击了menu
    handleClickMenu(menuItemData) {
      console.log(this.userInfo);
      if (!this.isLogin()) {
        this.$data._isShowTuiModel = true
        return
      }

      if (menuItemData.type) {
        this.handleSpecificMenu(menuItemData.type)
        return
      }

      if (menuItemData.url) {
        if (menuItemData.role) {
          if (menuItemData.role.includes(this.userInfo.userLevel)) {
            uni.navigateTo({
              url: menuItemData.url
            });
          } else {
            this.isShow = true
          }
        } else {
          uni.navigateTo({
            url: menuItemData.url
          });
        }

      } else {
        this.empty()
      }
    },

    // 点击升级
    handleUp(e) {
      if (e.index) {
        this.go('/user/sever/userUp')
      }
      this.isShow = false
    },

    // 特殊的menu处理
    handleSpecificMenu(type) {
      const _this = this
      switch (type) {
        case 'code':
          _this.$refs.codeRef.getCode()
          break
      }
    }
  },
}

// TODO:登陆成功回来之后需要刷新页面才能
</script>

<style lang="less" scoped>
.user-center {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(180deg, #FFE5CC 5%, #FFF9F0 16%, #F6F6F6 23%);
  padding: 30upx 30upx 130upx;
  box-sizing: border-box;

  .balance-text {
    font-size: 28upx;
    font-weight: bold;
    color: #FF0000;
  }

  .bee-btn {
    width: 160upx;
    height: 58upx;
    border-radius: 10upx;
    display: flex;
    align-items: center;
    justify-content: center;
    line-height: 1.5;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.2);
    background-color: #FF0000;
    color: #fff;
    font-weight: bold;
    transition: all 350ms;

    &:active {
      background-color: #ff7878;
    }
  }
}
</style>
