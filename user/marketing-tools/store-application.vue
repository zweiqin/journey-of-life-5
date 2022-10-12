<template>
  <view class="store-application-container">
    <JHeader
      tabbar="/pages/user/user"
      width="50"
      height="50"
      title="商家信息填写"
    ></JHeader>
    <view class="header">
      <img src="" class="back" alt="" />
    </view>
    <FieldPane
      :fields="applyStoreOne"
      title="账号信息"
      v-model="form.accountInfo"
    ></FieldPane>

    <FieldPane
      :fields="applyStoreTow"
      title="门店信息"
      v-model="form.storeInfo"
    ></FieldPane>

    <JUpload
      v-for="item in uploadFields"
      :key="item.label"
      :title="item.label"
      :imgUrl="form.imgs[item.field]"
      @upload="handleSaveImg(item.field, $event)"
    ></JUpload>

    <view class="buts">
      <button class="btn" @click="submit(false)">保存</button>
      <button class="btn" @click="submit(true)">提交</button>
    </view>
  </view>
</template>

<script>
import FieldPane from "./components/field-pane.vue";
import { applyStoreOne, applyStoreTow, uploadFields } from "./config";
import { submitApplyStoreInfo } from "../../api/user";

export default {
  components: {
    FieldPane,
  },
  data() {
    return {
      applyStoreOne,
      applyStoreTow,
      uploadFields,
      form: {
        accountInfo: {},
        storeInfo: {},
        imgs: {},
      },

      // 门店类型列表
      storeType: [],

      handleSaveImg(field, imgUrl) {
        this.form.imgs[field] = imgUrl;
        this.$forceUpdate();
      },
    };
  },

  onLoad() {},

  methods: {
    submit(tag) {
      const data = {
        ...this.form.imgs,
        ...this.form.storeInfo,
        ...this.form.accountInfo,
      };

      submitApplyStoreInfo(data).then(res => {
        console.log(res);
      })

      console.log(data);
    },
  },
};
</script>

<style lang="less" scoped>
.store-application-container {
  padding: 40upx;
  box-sizing: border-box;

  .buts {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 272upx;

    .btn {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 72upx;
      width: 306upx;
      font-size: 32upx;
      color: #fff;
      margin: 0;
      background-color: #07b9b9;
      border-radius: 100px;

      &:last-child {
        background-color: #fa5151;
      }
    }
  }
}
</style>