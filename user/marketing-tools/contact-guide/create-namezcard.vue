<template>
  <view class="create-namecard">
    <view class="my-card-header">
      <JBack dark width="50" height="50"></JBack>
      <h2>新建名片</h2>
    </view>

    <Collapse style="margin-top: 20px" title="基本信息">
      <view class="base-info">
        <view class="avatar">
          <view class="upload-icon">+</view>
          <view class="upload-desc">添加名片图像</view>
        </view>

        <view
          class="field-wrapper"
          v-for="item in baseInfoFields"
          :key="item.label"
        >
          <view class="title">{{ item.label }}</view>
          <view class="value-wrapper">
            <input
              v-model="form[item.field]"
              type="text"
              :placeholder="item.required ? '（必填）' : ''"
            />
          </view>
        </view>
      </view>
    </Collapse>

    <Collapse style="margin-top: 20px" title="联系方式">
      <view class="field-wrapper" v-for="item in connects" :key="item.label">
        <view class="title">{{ item.label }}</view>
        <view class="value-wrapper">
          <input
            v-model="form[item.field]"
            type="text"
            :placeholder="item.required ? '（必填）' : ''"
          />
        </view>
      </view>
    </Collapse>

    <Collapse style="margin-top: 20px" title="业务简介">
      <view class="detail-wrapper">
        <textarea
          ref="textareaRef"
          @blur="handleTextareaBlur"
          v-model.trim="form.intro"
          placeholder="请输入业务简介"
          class="desc-detail"
        ></textarea>
        <MaskS
          ref="editRef"
          @click="handleChangeEdit"
          width="42"
          height="42"
          type="edit-blue"
          text="填写业务介绍或个人简介"
        ></MaskS>
      </view>
    </Collapse>

    <Collapse style="margin-top: 20px" title="业务简介">
      <JUpload style="margin-top: 20upx; margin-right: 30upx"></JUpload>
    </Collapse>

    <view class="create-name-card-footer">
      <button class="uni-btn">删除名片</button>
      <button class="uni-btn">一键生成名片</button>
    </view>
  </view>
</template>

<script>
import Collapse from "../components/collapse-name-card.vue";
import MaskS from "../components/mask.vue";
import { baseInfoFields, connects } from "./config";
export default {
  components: {
    Collapse,
    MaskS,
  },
  data() {
    return {
      baseInfoFields,
      connects,
      form: {
        name: "",
        business: "",
        phone: "",
        position: "",
        company: "",
        wechat: "",
        address: "",
        intro: "",
      },
    };
  },

  methods: {
    handleChangeEdit() {
      this.$refs.editRef.$el.classList.add("animate__rotateOutUpRight");

      this.$refs.textareaRef.$el.autofocus = true;
    },

    handleTextareaBlur() {
      if (!this.form.intro) {
        const classList = this.$refs.editRef.$el.classList;
        classList.remove("animate__rotateOutUpRight");
        classList.add("animate__rotateInDownRight");
      }
    },
  },
};
</script>

<style lang="less" scoped>
.create-namecard {
  padding: 40upx 30upx 120upx 46upx;
  box-sizing: border-box;

  .my-card-header {
    display: flex;
    align-items: center;

    h2 {
      color: #3d3d3d;
      font-size: 30upx;
      margin-top: -4upx;
      margin-left: 30upx;
    }
  }

  .field-wrapper {
    width: 100%;
    margin-top: 40upx;
    display: flex;

    .title {
      margin-right: 28upx;
      font-size: 28upx;
      color: #3d3d3d;
    }

    .value-wrapper {
      flex: 1;
      padding-bottom: 10upx;
      border-bottom: 1upx solid rgb(207, 207, 207);
      margin-right: 30upx;

      input {
        width: 100%;
        font-size: 28upx;
      }
    }
  }

  // 基本信息
  .base-info {
    padding: 20upx 0;
    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;

      .upload-icon {
        width: 160upx;
        height: 160upx;
        text-align: center;
        line-height: 160upx;
        background-color: #efefef;
        border-radius: 20upx;
        color: #999;
        font-size: 70upx;
      }

      .upload-desc {
        color: #999;
        font-size: 28upx;
        margin-top: 20upx;
      }
    }
  }

  .detail-wrapper {
    height: 414upx;
    border: 1upx solid #d8d8d8;
    margin-right: 30upx;
    border-radius: 20upx;
    margin-top: 20upx;
    position: relative;
    overflow: hidden;

    .desc-detail {
      width: 100%;
      height: 100%;
      padding: 20upx;
      box-sizing: border-box;
    }

    .mask {
      position: absolute;
      left: 0;
      top: 0;
      background-color: aquamarine;
      width: 100%;
      height: 100%;
    }
  }

  .create-name-card-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 116upx;
    background-color: #fff;
    padding: 0 32upx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .uni-btn {
      padding: 16upx 0;
      border-radius: 100px;

      &:nth-child(1) {
        flex: 1;
        margin-right: 20upx;
        color: #FA5151;
        border: 1upx solid #FA5151;
      }

      &:nth-child(2) {
        flex: 2;
        background-color: #3662EC;
        color: #fff;
      }
    }
  }
}
</style>
