<template>
  <view class="marketing-planner-container">
    <JHeader width="50" height="50" title="营销策划师升级信息填写"></JHeader>

    <FieldPane
      :fields="infomations"
      title="信息填写"
      v-model="form.accountInfo"
    ></FieldPane>

    <JUpload
      v-for="item in identImgs"
      :key="item.label"
      :title="item.label"
      :imgUrl="form.imgs[item.field]"
      @upload="handleSaveImg(item.field, $event)"
      @delete="handleDeleteImg(item.field)"
    ></JUpload>

    <view class="buts">
      <button class="btn" v-if="!isTable" @click="submit(false)">保存</button>
      <button class="btn" v-if="!isTable" @click="submit(true)">提交</button>
      <button
        class="btn withdraw"
        @click="handleWidthDraw"
        v-if="isTable && applyStatus === 0"
      >
        撤销申请
      </button>
    </view>

    <view v-if="applyStatus > 1" class="mask"></view>
  </view>
</template>

<script>
import FieldPane from "./components/field-pane.vue";
import { infomations, identImgs } from "./config";
import { submitApplyStoreInfo, widthDrawApi } from "../../api/user";
import { getUserId } from "../../utils";
import { getStoreSaveInfoApi } from "../../api/user";
import { J_USER_TOKEN, J_MARKETING_PLANNER } from "../../constant";

export default {
  components: {
    FieldPane,
  },

  onLoad(options) {
    this.isTable = options.type === "table";
    if (options.type === "table") {
      // 获取申请表数据
      const marketingPlannerInfo = uni.getStorageSync(J_MARKETING_PLANNER);
      this.ticketsId = marketingPlannerInfo.ticketsId;
      this.applyStatus = marketingPlannerInfo.status;
      this.setData(marketingPlannerInfo.info);
    } else {
      uni.showLoading();
      getStoreSaveInfoApi({
        userId: getUserId(),
        token: uni.getStorageSync(J_USER_TOKEN),
        applicationType: 2,
      }).then(({ data }) => {
        uni.hideLoading();
        if (data) {
          this.setData(data);
        }
      });
    }
  },

  data() {
    return {
      infomations,
      identImgs,

      // 表单
      form: {
        accountInfo: {
          gender: 1,
        },
        imgs: {},
      },
      ticketsId: null,
      applyStatus: null,
    };
  },

  methods: {
    // 图片上传成功
    handleSaveImg(field, imageUrl) {
      console.log(field, imageUrl);
      this.form.imgs[field] = imageUrl;
      this.$forceUpdate();
    },

    // 删除图片
    handleDeleteImg() {},

    // 提交表单
    submit(tag) {
      const data = {
        ...this.form.accountInfo,
        ...this.form.imgs,
        applicationType: 2,
        userId: getUserId(),
      };

      let valid = true;
      const _this = this;

      for (const label in this.infomations) {
        const currentInfo = this.infomations[label];
        if (!data[currentInfo.field]) {
          valid = false;
          this.$showToast(
            currentInfo.type === "city"
              ? "请选择" + currentInfo.label.slice(0, -1)
              : currentInfo.placeholder
          );

          return;
        }
      }

      if (!data.idcardProsUrl) {
        this.$showToast("请上传身份证人面像");
        return;
      }

      if (!data.idcardConsUrl) {
        this.$showToast("请上传身份证国徽面像");
        return;
      }

      data.address = data.address + "-" + data.orgioinAddressDetail;
      delete data.orgioinAddressDetail;

      uni.showModal({
        title: "提示",
        content: "要保存当前申请信息吗？",
        success: function (res) {
          if (res.confirm) {
            submitApplyStoreInfo(tag, data).then((res) => {
              _this.$showToast(tag ? "提交成功" : "保存成功", "success");
              if (tag) {
                setTimeout(() => {
                  uni.navigateBack();
                }, 2000);
              }
            });
          }
        },
      });
    },

    // 数据回填
    setData(data) {
      this.form.accountInfo.gender = data.gender;
      this.form.accountInfo.areaname = data.areaname;
      this.form.accountInfo.phone = data.phone;
      this.form.accountInfo.salesmanPhone = data.salesmanPhone;
      this.form.accountInfo.salesmanname = data.salesmanname;
      this.form.accountInfo.wechat = data.wechat;
      this.form.accountInfo.address = data.address.split("-")[0];
      this.form.accountInfo.orgioinAddressDetail = data.address.split("-")[1];
      this.form.imgs.idcardProsUrl = data.idcardProsUrl;
      this.form.imgs.idcardConsUrl = data.idcardConsUrl;
      this.$forceUpdate();
    },

    // 撤销
    handleWidthDraw() {
      const _this = this;
      uni.showModal({
        title: "提示",
        content: "是否撤回当前营销策划师申请?",
        success: function (res) {
          if (res.confirm) {
            widthDrawApi({
              userId: getUserId(),
              id: _this.ticketsId,
              token: uni.getStorageSync(J_USER_TOKEN),
            }).then(() => {
              uni.showToast({
                title: "撤销成功",
                duration: 2000,
              });

              setTimeout(() => {
                uni.navigateTo({
                  url: "/user/sever/userUp",
                });
              }, 1000);
            });
          }
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.marketing-planner-container {
  padding: 46upx;
  box-sizing: border-box;
  padding-bottom: 200upx;

  .mask {
    position: fixed;
    top: 100upx;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(255, 255, 255, 0);
  }

  .buts {
    position: fixed;
    bottom: -1px;
    left: 0;
    width: 100%;
    background-color: #fff;
    padding: 20upx 46upx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: 10;

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

      &.withdraw {
        width: 100%;
        background: #999;
        letter-spacing: 10upx;
      }
    }
  }
}
</style>