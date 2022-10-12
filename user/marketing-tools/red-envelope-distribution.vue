<template>
  <view class="red-envelope-distribution-container">
    <JHeader width="50" height="50" title="红包发放"></JHeader>

    <view class="line-item">
      <image
        class="icon"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/802z9z04t98uxzfyrz06.png"
        mode=""
      />
      <view class="title">红包金额</view>
      <input type="number" v-model.number="redForm.redpackMonkey" class="input-el" />
      <view class="company">元</view>
    </view>

    <view class="line-item">
      <image
        class="icon"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/mk74fnhfp4fu7djpnh3h.png"
        mode=""
      />
      <view class="title">红包个数</view>
      <input type="number" v-model.number="redForm.redpackNumber" class="input-el" />
      <view class="company">个</view>
    </view>

    <view class="title-form">内容留言</view>
    <textarea
      placeholder="（留言15字符以内）"
      class="rich-text"
      cols="30"
      rows="10"
      v-model.trim="redForm.remark"
    ></textarea>
    <view class="title-form">红包背景</view>

    <view class="upload-pane">
      <view class="left">
        <view @click="chooseImg" class="upload" v-if="!redForm.imageUrl">+</view>
        <image v-else class="iamge-background" :src="redForm.imageUrl" mode="" />
      </view>
      <image
        v-show="redForm.imageUrl"
        @click="removeBackground"
        class="delete-icon"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ghggvke7uc134gbv71gh.png"
        mode=""
      />
    </view>

    <button class="sendRedPackage">塞进红包</button>
  </view>
</template>

<script>
import { J_USER_TOKEN } from "../../constant";
import { uploadFle } from "../../api/user";
import { getUserId } from "../../utils";
import { getBusinessInfoByUserIdApi } from "../../api/user";

export default {
  onLoad() {
    getBusinessInfoByUserIdApi()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log("商家信息获取失败");
      });
  },
  data() {
    return {
      // brandName: this.data.business.name, // 商家名称
      // userId: this.data.userInfo.userId, // 用户id
      // brandId: this.data.business.id, // 商家id
      // longitude: this.data.business.longitude, // 经度
      // latitude: this.data.business.latitude, // 纬度
      // redpackNumber: this.data.redpackNumber * 1,
      // redpackMonkey: this.data.redpackMonkey * 1,
      // imageUrl: this.data.imageUrl,
      // remark: this.data.remark,
      // redpackAllmonkey: this.data.totalAccount,
      // effectiveDistance: this.data.effectiveDistance * 1
      redForm: {
        redpackNumber: 1,
        redpackMonkey: 1,
        remark: "",
        imageUrl: "",
      },

      // https://img0.baidu.com/it/u=785131143,3493181645&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1665594000&t=a2d3c444e3a9e78c308f6c4e8a76ee6c
    };
  },

  methods: {
    // 删除红包背景
    removeBackground() {
      const _this = this;
      uni.showModal({
        title: "提示",
        content: "确定删除当前红包背景吗？",
        success: function (res) {
          if (res.confirm) {
            _this.redForm.imageUrl = "";
          }
        },
      });
    },

    // 选择图片
    chooseImg() {
      const _this = this;
      uni.chooseImage({
        success: (chooseImageRes) => {
          uni.uploadFile({
            url: "https://www.tuanfengkeji.cn:9527/jf-app-api/wx/storage/upload",
            filePath: chooseImageRes.tempFiles[0].path,
            name: "file",
            success: (uploadFileRes) => {
              _this.redForm.imageUrl = JSON.parse(uploadFileRes.data).data.url;
            },
          });
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.red-envelope-distribution-container {
  padding: 40upx;
  box-sizing: border-box;
  font-size: 24upx;
  color: #3d3d3d;

  .line-item {
    margin-top: 90upx;
    display: flex;
    align-items: center;
    padding: 20upx 0;
    border-bottom: 1upx solid #d8d8d8;

    .title {
      margin: 0 28upx;
    }

    .icon {
      width: 36upx;
      height: 40upx;
    }

    .input-el {
      text-align: right;
      flex: 1;
      font-size: 24upx;
      margin-right: 10upx;
    }
  }

  .title-form {
    margin: 28upx 0;
  }

  .rich-text {
    width: 100%;
    height: 264upx;
    border: 1upx solid #d8d8d8;
    border-radius: 20upx;
    padding: 28upx 16upx;
    box-sizing: border-box;
    font-size: 24upx;

    /deep/ .uni-textarea-placeholder {
      font-size: 24upx;
      color: #999;
    }
  }

  .upload-pane {
    border: 1upx solid #d8d8d8;
    padding: 32upx 24upx;
    box-sizing: border-box;
    border-radius: 20upx;

    display: flex;
    justify-content: space-between;
    align-items: flex-end;

    .delete-icon {
      width: 32upx;
      height: 36upx;
    }

    .left {
      display: flex;
      align-items: center;
    }

    .upload {
      margin: 0;
      width: 160upx;
      height: 160upx;
      background-color: #d8d8d8;
      border-radius: 20upx;
      color: #767676;
      text-align: center;
      line-height: 160upx;
      font-size: 60upx;
    }

    .iamge-background {
      width: 160upx;
      height: 160upx;
      object-fit: cover;
    }
  }

  .sendRedPackage {
    width: 100%;
    height: 72upx;
    line-height: 72upx;
    background-color: #fa5151;
    color: #fff;
    font-size: 32upx;
    padding: 0;
    border-radius: 100px;
    margin-top: 100upx;
  }
}
</style>
