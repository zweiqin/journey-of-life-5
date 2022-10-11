<template>
  <view class="j-field-container">
    <view class="label">{{ label }}</view>
    <view class="input-wrapper">
      <input
        v-if="type === 'pwd'"
        :placeholder="placeholder"
        class="input-text"
        :type="isShowPwd ? 'text' : 'password'"
        v-model="inputValue"
      />

      <input
        v-else
        :placeholder="placeholder"
        class="input-text"
        :type="text"
        v-model="inputValue"
      />

      <image
        v-if="type === 'pwd'"
        class="hidden-passwod"
        :src="
          isShowPwd
            ? 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/1035vvc88rxf5768exul.png'
            : 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ivr6snx5152prfpssx3j.png'
        "
        mode=""
        @click="handleShowPwd"
      />

      <view class="get-code" v-if="type === 'code'" @click="handleGetCode">{{
        isCoding ? time : "获取验证码"
      }}</view>
    </view>
  </view>
</template>

<script>
export default {
  props: {
    label: String,
    type: String,
    placeholder: String,
  },
  data() {
    return {
      time: 60,
      timer: null,
      isCoding: false,
      isShowPwd: false,
      inputValue: "",
    };
  },
  methods: {
    // 获取验证码
    handleGetCode() {
      if (this.isCoding) {
        return;
      }
      this.isCoding = true;
      this.timer = setInterval(() => {
        this.time--;

        if (this.time <= 0) {
          this.time = 60;
          this.isCoding = false;
          clearInterval(this.timer);
          this.timer = null;
        }
      }, 1000);
    },

    // 点击查看验证码
    handleShowPwd() {
      this.isShowPwd = !this.isShowPwd;
    },
  },

  watch: {
    inputValue(val) {
      this.$emit("input", val);
    },
  },
};
</script>

<style lang="less" scoped>
@import "../../style/var.less";

.j-field-container {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 66upx;

  .label {
    width: 116upx;
    text-align-last: justify;
    font-size: 28upx;
    color: @c3d;
    margin-right: 24upx;
  }

  .input-wrapper {
    position: relative;
    padding-bottom: 10upx;
    border-bottom: 1upx solid #d8d8d8;
    flex: 1;
    position: relative;

    .input-text {
      font-size: 28upx;
      color: @c3d;
      margin-top: 2upx;
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

    .get-code {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
      color: #fa5151;
      font-size: 24upx;
    }
  }
}
</style>