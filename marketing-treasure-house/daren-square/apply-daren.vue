<template>
  <view class="apply-daren">
    <view class="pane">
      <JHeader width="50" height="50" title="成为达人"></JHeader>
    </view>


    <view class="pane">
      <view class="title">达人信息</view>

      <view class="pane-title">达人头像</view>
      <view class="select" style="border-bottom: none;">
        <JUpload style="flex: 1" :imgUrl="form.avatar" @upload="handleUploadAvatar" @delete="handleDeleteAvatar">
        </JUpload>
      </view>

      <view class="pane-title">达人姓名</view>
      <view class="select">
        <input type="text" v-model="form.name" placeholder="请输入达人姓名" />
      </view>

      <view class="pane-title">达人电话</view>
      <view class="select">
        <input v-model="form.phone" type="text" placeholder="请输入达人电话" />
      </view>

      <view class="pane-title">达人性别</view>
      <view class="select" style="padding-bottom: 20upx;">
        <view class="tui-dck--box">
          <tui-data-checkbox v-model="form.grade"
            :options="[{ text: '男', value: '1' }, { text: '女', value: '0' }]"></tui-data-checkbox>
        </view>

      </view>

      <view class="pane-title">达人服务区域</view>
      <view class="select">
        <JCity style="flex: 1" @confirm="handleChooseArea" :text="form.region"></JCity>
      </view>

      <view class="pane-title">个性标签</view>
      <view class="select">
        <textarea v-model="form.introduce"></textarea>
      </view>
    </view>


    <button class="uni-btn" @click="submit">提交</button>

    <tui-toast ref="toast"></tui-toast>
  </view>
</template>

<script>
import { submitApplyApi } from '../../api/marketing-treasure-house'
export default {
  data() {
    return {
      form: {
        "name": "",
        "grade": '1',
        "phone": "",
        "avatar": "",
        "region": "",
        "introduce": ""
      },

      loading: ''
    }
  },

  methods: {
    handleChooseArea(areaInfo) {
      this.form.region = areaInfo.area
    },

    handleUploadAvatar(avatarInfo) {
      this.form.avatar = this.getBeeUrl(avatarInfo)
    },

    // 删除图片
    handleDeleteAvatar() {
      this.form.avatar = ''
    },

    // 提交
    async submit() {
      if (!this.form.avatar) {
        this.ttoast({
          type: 'fail',
          title: "请上传头像"
        })
        return
      }
      if (!this.form.name) {
        this.ttoast({
          type: 'fail',
          title: "请输入达人姓名"
        })
        return
      }
      if (!this.form.phone) {
        this.ttoast({
          type: 'fail',
          title: "请输入达人联系方式"
        })
        return
      }
      if (!this.form.region) {
        this.ttoast({
          type: 'fail',
          title: "请输入达人服务区域"
        })
        return
      }

      if (this.loading) {
        this.ttoast({
          type: 'info',
          title: '已经提交申请',
          content: '请勿重复提交'
        })
        return
      }
      this.loading = true
      uni.showLoading({
        title: '提交中...',
      });

      try {
        await submitApplyApi(this.form)
        this.ttoast('申请成功')
        this.form = {
          "name": "",
          "grade": '1',
          "phone": "",
          "avatar": "",
          "region": "",
          "introduce": ""
        }

        setTimeout(() => {
          uni.switchTab({
            url: '/pages/marketing-treasure-house/marketing-treasure-house',
          });
        }, 1000)
      } finally {
        uni.hideLoading();
        this.loading = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.apply-daren {
  width: 100%;
  height: auto;
  min-height: 100vh;
  background-color: #f6f6f6;
  font-size: 28upx;
  padding-bottom: 60upx;

  .pane {
    background-color: #fff;
    margin-bottom: 22upx;
    padding: 20upx 24upx;
    box-sizing: border-box;

    .title {
      font-size: 32upx;
      font-weight: bold;
    }

    &-title {
      margin-top: 32upx;
      font-size: 32upx;
      color: #9e9e9e;
    }

    .icon {
      width: 40upx;
      height: 40upx;
    }

    .message-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20upx 0;
      border-bottom: 1upx solid #d8d8d8;

      &:last-child {
        border-bottom: none;
      }

      .pane-title {
        margin-top: 0;
      }
    }

    .select {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 26upx;
      padding-bottom: 4upx;
      border-bottom: #d8d8d8 1px solid;

      &:last-child {
        input {
          border-bottom: none;
        }
      }

      .choose {
        flex: 1;
      }

      input {
        flex: 1;
        font-size: 28upx;
        padding-bottom: 20upx;
      }
    }
  }

  .agreement {
    font-size: 28upx;
    display: flex;
    justify-content: flex-start;
    align-items: center;

    .radio {
      position: relative;
      width: 32upx;
      height: 32upx;
      border-radius: 50%;
      border: 1upx solid #777;
      margin-right: 20upx;

      &.active {
        border-color: #fa5151;

        &::after {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          content: "";
          width: 20upx;
          height: 20upx;
          border-radius: 50%;
          background-color: #fa5151;
        }
      }
    }

    .text {
      color: #fa5151;
    }
  }

  .uni-btn {
    width: 716upx;
    height: 76upx;
    background: linear-gradient(270deg, #fa5151, #ff9e33);
    color: #fff;
    font-size: 36upx;
    margin: 100upx auto auto auto;
    text-align: center;
    line-height: 76upx;
    transition: all 350ms;

    &:active {
      opacity: 0.7;
    }
  }
}
</style>