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
      <input type="number" class="input-el" />
      <view class="company">元</view>
    </view>

    <view class="line-item">
      <image
        class="icon"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/mk74fnhfp4fu7djpnh3h.png"
        mode=""
      />
      <view class="title">红包个数</view>
      <input type="number" class="input-el" />
      <view class="company">个</view>
    </view>

    <view class="title-form">内容留言</view>
    <textarea
      placeholder="（留言15字符以内）"
      class="rich-text"
      cols="30"
      rows="10"
    ></textarea>
    <view class="title-form">红包背景</view>

    <view class="upload-pane">
      <view class="left">
        <Upload></Upload>
      </view>
      <image
        class="delete-icon"
        src="https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/ghggvke7uc134gbv71gh.png"
        mode=""
      />
    </view>

    <button class="sendRedPackage">塞进红包</button>
  </view>
</template>

<script>
import Upload from "../../wxcomponents/vant/dist/uploader/index.vue";
export default {
  components: {
    Upload,
  },

  data() {
    return {
      redForm: {},
    };
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

    /deep/ .van-uploader__upload {
      margin: 0;
      width: 160upx;
      height: 160upx;
    }
  }

  .sendRedPackage{
    width: 100%;
    height: 72upx;
    line-height: 72upx;
    background-color: #FA5151;
    color: #fff;
    font-size: 32upx;
    padding: 0;
    border-radius: 100px;
    margin-top: 100upx;
  }
}
</style>