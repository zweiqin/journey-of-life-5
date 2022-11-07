<template>
  <view class="login-container">
    <view class="register" @click="go('/pages/register/register?type=register')"
      >注册</view
    >
    <image
      class="logo"
      src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/8lgf13vjcr9stft2tvt5.png"
      mode=""
    />

    <view class="form-content">
      <view class="item">
        <label for="mobile">手机号</label>
        <view class="input">
          <input
            id="mobile"
            v-model="loginForm.username"
            type="text"
            placeholder="请输入手机号码"
          />
        </view>
      </view>

      <view class="item">
        <label for="password">密码</label>
        <view class="input">
          <input
            v-model="loginForm.password"
            id="password"
            :type="isShowPwd ? 'text' : 'password'"
            placeholder="请输入密码"
          />
        </view>
        <image
          class="hidden-passwod"
          :src="
            isShowPwd
              ? 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/1035vvc88rxf5768exul.png'
              : 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ivr6snx5152prfpssx3j.png'
          "
          mode=""
          @click="isShowPwd = !isShowPwd"
        />
        <view
          @click="go('/pages/register/register?type=forgetPwd')"
          class="forget-password"
          >（找回密码）</view
        >
      </view>
    </view>

    <JAuthButton
      text="登录"
      class="btn"
      @click="handleLogin"
      type="error"
    ></JAuthButton>
    <view class="remember-password">免密码登录</view>

    <view class="footer">
      <image
        class="icon"
        :class="{
          more: index === 3,
        }"
        v-for="(item, index) in moreLogins"
        :key="item.icon"
        :src="item.icon"
        mode=""
      />
    </view>
  </view>
</template>

<script>
import { userLoginApi } from "../../api/auth";
import { moreLogins } from "./config";
import {
  J_USER_INFO,
  J_USER_TOKEN,
  J_TOKEN_EXPIRE,
  J_USER_ID,
} from "../../constant";
export default {
  data() {
    return {
      type: "",
      moreLogins,
      redirect: "",
      loginForm: {
        username: "",
        password: "",
      },
      isShowPwd: false,
      isTabbar: false,
      bindUserId: null,
    };
  },
  methods: {
    go(url) {
      uni.navigateTo({
        url: url,
      });
    },

    handleLogin() {
      const { username, password } = this.loginForm;
      if (!username || !password) {
        this.$showToast("手机号或密码不能为空");
        return;
      }

      if (
        !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
          username
        )
      ) {
        uni.showToast({
          title: "手机号格式不正确",
          duration: 2000,
          icon: "none",
        });

        return;
      }

      if (password.length < 6) {
        this.$showToast("密码不能小于六位");
        return;
      }

      userLoginApi({
        ...this.loginForm,
      }).then((res) => {
        const data = res.data;
        uni.setStorageSync(J_USER_INFO, res.data.userInfo);
        uni.setStorageSync(J_USER_TOKEN, res.data.token);
        uni.setStorageSync(J_USER_ID, data.userInfo.userId);
        uni.setStorageSync(
          J_TOKEN_EXPIRE,
          new Date(res.data.tokenExpire).getTime()
        );
        this.$showToast("登录成功", "success");
        setTimeout(() => {
          if (this.type === "bind") {
            uni.switchTab({
              url: "/pages/user/user?bind=" + this.bindUserId,
            });
          } else {
            if (this.isTabbar) {
              uni.switchTab({
                url: this.redirect || "/pages/index/index",
              });
            } else if (this.redirect) {
              uni.redirectTo({
                url: this.redirect,
              });
            } else {
              uni.switchTab({
                url: "/pages/index/index",
              });
            }
          }
        }, 2000);
      });
    },
  },

  onLoad(options) {
    this.type = options.type;
    this.redirect = options.redirect;
    this.isTabbar = !!options.tabbar;
    this.bindUserId = options.userId;
    if (this.type === "register") {
      this.$showToast("注册成功", "success");
    } else if (this.type === "bind") {
      if (getUserId()) {
        uni.switchTab({
          url: "/pages/user/user?bind=" + this.bindUserId,
        });
      }
    }
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";
.login-container {
  .flex(center, center);
  flex-direction: column;
  padding: 100upx 54upx 116upx 54upx;

  .register {
    width: 100%;
    text-align: right;
    font-size: 24upx;
  }
  .logo {
    width: 164upx;
    height: 150upx;
    margin: 100upx 0;
  }

  .form-content {
    flex: 1;
    text-align: left;
    width: 100%;
    color: #3d3d3d;
    font-size: 28upx;

    .item {
      position: relative;
      display: flex;
      margin-bottom: 54upx;

      label {
        width: 90upx;
        text-align-last: justify;
        margin-right: 26upx;
      }

      .input {
        font-size: 24upx;
        flex: 1;
        padding-bottom: 20upx;
        border-bottom: 1upx solid #ccc;

        input {
          font-size: 24upx;
        }
      }

      #password {
        border: none;
        outline: none;
      }

      .hidden-passwod {
        position: absolute;
        width: 32.48upx;
        height: 18upx;
        top: 50%;
        transform: translateY(-50%);
        right: 0;
      }

      .forget-password {
        position: absolute;
        color: #07b9b9;
        font-size: 24upx;
        bottom: -100%;
        right: 0;
      }
    }
  }

  .btn {
    margin: 120upx 0 28upx 0;
  }

  .remember-password {
    font-size: 28upx;
    color: #3d3d3d;
  }

  .footer {
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin-top: 200upx;

    .icon {
      width: 40upx;
      height: 40upx;
      object-fit: cover;

      &.more {
        width: 36upx;
        height: 8upx;
      }
    }
  }
}
</style>
