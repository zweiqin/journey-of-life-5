<template>
  <view class="store-application-container">
    <JHeader width="50" height="50" title="商家信息"></JHeader>
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
      @delete="handleDeleteImg(item.field)"
    ></JUpload>
    <view class="buts">
      <button
        v-if="[2, 3, 4, 5, 6, -10].includes(applyStatus * 1)"
        class="btn"
        @click="submit(false)"
      >
        保存
      </button>
      <button
        v-if="[2, 3, 4, 5, 6, -10].includes(applyStatus * 1)"
        class="btn"
        @click="submit(true)"
      >
        提交
      </button>

      <button
        v-if="applyStatus == 0"
        @click="handleWidthDraw"
        class="btn withdraw"
      >
        撤销申请
      </button>
    </view>

    <view v-if="applyStatus > 1" class="mask"></view>
  </view>
</template>

<script>
import FieldPane from "./components/field-pane.vue";
import { applyStoreOne, applyStoreTow, uploadFields } from "./config";
import {
  submitApplyStoreInfo,
  getStoreSaveInfoApi,
  widthDrawApi,
  houxucaozuoApi,
} from "../../api/user";
import {
  J_USER_INFO,
  J_STORE_TYPES,
  J_USER_TOKEN,
  J_STORE_INFO,
} from "../../constant";
import { getUserId } from "../../utils";
import { getAddressLongitudeAndLatitude } from "../../utils";

export default {
  components: {
    FieldPane,
  },
  onLoad(options) {
    if (options.type === "table") {
      const applyInfo = uni.getStorageSync(J_STORE_INFO);
      this.setSToreApplyDetailInfo(applyInfo.info);
      this.applyStatus = applyInfo.status * 1;
      this.ticketsId = applyInfo.ticketsId;
    } else {
      this.getUserSaveInfo();
      this.applyStatus = options.status * 1;
    }
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
      storeType: [
        {
          storeName: "综合",
          id: 0,
        },
        {
          id: 14,
          storeName: "附近美食",
          addTime: "2022-10-31 11:41:35",
          updateTime: "2022-10-31 11:41:35",
          deleted: false,
        },
        {
          id: 21,
          storeName: "美甲美睫",
          addTime: "2022-10-31 11:43:50",
          updateTime: "2022-10-31 11:43:50",
          deleted: false,
        },
        {
          id: 20,
          storeName: "运动健身",
          addTime: "2022-10-31 11:43:38",
          updateTime: "2022-10-31 11:43:38",
          deleted: false,
        },
        {
          id: 19,
          storeName: "亲子",
          addTime: "2022-10-31 11:43:26",
          updateTime: "2022-10-31 11:43:26",
          deleted: false,
        },
        {
          id: 18,
          storeName: "住宿",
          addTime: "2022-10-31 11:43:16",
          updateTime: "2022-10-31 11:43:16",
          deleted: false,
        },
        {
          id: 17,
          storeName: "丽人/美发",
          addTime: "2022-10-31 11:43:05",
          updateTime: "2022-10-31 11:43:05",
          deleted: false,
        },
        {
          id: 16,
          storeName: "游玩",
          addTime: "2022-10-31 11:42:34",
          updateTime: "2022-10-31 11:42:34",
          deleted: false,
        },
        {
          id: 15,
          storeName: "休闲娱乐",
          addTime: "2022-10-31 11:42:22",
          updateTime: "2022-10-31 11:42:22",
          deleted: false,
        },
      ],

      applyStatus: null,
      ticketsId: null,
      showApplyBtn: true,
    };
  },

  methods: {
    handleSaveImg(field, imgUrl) {
      console.log(field, imgUrl);
      this.form.imgs[field] = imgUrl;
      this.$forceUpdate();
    },

    // 点击提交按钮
    submit(tag) {
      const _this = this;
      const data = {
        ...this.form.imgs,
        ...this.form.storeInfo,
        ...this.form.accountInfo,
        applicationType: 1,
        avatar: (uni.getStorageSync(J_USER_INFO) || {}).avatarUrl,
        startTime: "9:00",
        endTime: "18:00",
        userId: getUserId(),
      };

      if (!data.username) {
        this.$showToast("请输入要登录的帐号");
        return;
      }

      if (data.username.length < 6) {
        this.$showToast("登录帐号至少为六位");
        return;
      }

      if (!data.password) {
        this.$showToast("请输入要登录的密码");
        return;
      }

      if (data.password.length < 6) {
        this.$showToast("登录密码至少为六位");
        return;
      }

      if (
        !/^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(
          data.brandPhone
        )
      ) {
        this.$showToast("联系电话格式错误");
        return;
      }

      if (!data.brandname) {
        this.$showToast("请填写门店名称");
        return;
      }

      if (!data.brandgenre) {
        this.$showToast("请选择门店所属类型");
        return;
      }

      if (!data.address) {
        this.$showToast("请选择门店所在城市");
        return;
      }

      if (!data.addressDetail) {
        this.$showToast("请填写门店详细地址");
        return;
      }

      if (!data.desc) {
        this.$showToast("请填写门店介绍");
        return;
      }

      if (!data.picUrl) {
        this.$showToast("请上传门店logo");
        return;
      }

      if (!data.licenseUrl) {
        this.$showToast("请上传营业执照");
        return;
      }

      if (!data.brandIdcardProsUrl) {
        this.$showToast("请上传法人身份证人像面");
        return;
      }

      if (!data.brandIdcardConsUrl) {
        this.$showToast("请上传法人身份证国徽面");
        return;
      }

      data.brandgenre = this.storeType.find(
        (item) => item.storeName === data.brandgenre
      ).id;

      data.salesmanname = data.username;

      data.address = data.address + "-" + data.addressDetail;
      delete data.addressDetail;

      getAddressLongitudeAndLatitude(data.address.replace("-", "")).then(
        (res) => {
          data.longitude = res.result.location.lng;
          data.latitude = res.result.location.lat;

          if (tag) {
            uni.showModal({
              title: "提示",
              content: "确认提交门店申请？",
              success: function (res) {
                if (res.confirm) {
                  submitApplyStoreInfo(tag, data).then((res) => {
                    _this.$showToast("提交成功，请等待审核");
                    setTimeout(() => {
                      uni.navigateTo({
                        url: "/user/sever/userUp",
                      });
                    }, 2000);
                  });
                }
              },
            });
          } else {
            uni.showModal({
              title: "提示",
              content: "确认保存当前门店信息？",
              success: function (res) {
                if (res.confirm) {
                  submitApplyStoreInfo(tag, data).then((res) => {
                    _this.$showToast("保存成功", "success");
                    setTimeout(() => {
                      uni.navigateTo({
                        url: "/user/sever/userUp",
                      });
                    }, 2000);
                  });
                }
              },
            });
          }
        }
      );
    },

    // 删除当前图片
    handleDeleteImg(field) {
      this.form.imgs[field] = "";
      this.$forceUpdate();
    },

    // 查询保存的申请记录
    getUserSaveInfo() {
      getStoreSaveInfoApi({
        userId: getUserId(),
        applicationType: 1,
        token: uni.getStorageSync(J_USER_TOKEN),
      }).then((res) => {
        if (res.data) {
          this.setSToreApplyDetailInfo(res.data);
        }
      });
    },

    // 数据回填
    setSToreApplyDetailInfo(data) {
      this.form.accountInfo.username = data.username;
      this.form.accountInfo.password = data.password;
      this.form.accountInfo.brandPhone = data.brandPhone;

      this.form.storeInfo.brandname = data.brandname;
      const storeInfo = this.storeType.find(
        (item) => item.id === data.brandgenre
      );

      if (storeInfo) {
        this.form.storeInfo.brandgenre = storeInfo.storeName;
      }

      this.form.storeInfo.address = data.address.split("-")[0];
      this.form.storeInfo.addressDetail = data.address.split("-")[1];
      this.form.storeInfo.desc = data.desc;

      this.form.imgs.picUrl = data.picUrl;
      this.form.imgs.licenseUrl = data.licenseUrl;
      this.form.imgs.brandIdcardProsUrl = data.brandIdcardProsUrl;
      this.form.imgs.brandIdcardConsUrl = data.brandIdcardConsUrl;
      this.$forceUpdate();
    },

    // 撤销
    handleWidthDraw() {
      const _this = this;
      uni.showModal({
        title: "提示",
        content: "是否撤回当前门店申请?",
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
.store-application-container {
  padding: 40upx 40upx 140upx 40upx;
  box-sizing: border-box;

  .mask {
    position: fixed;
    z-index: 1;
    top: 100upx;
    left: 0;
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: transparent;
  }

  .buts {
    position: fixed;
    bottom: -1px;
    z-index: 2;
    padding: 20upx 40upx;
    left: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #fff;
    width: 100%;
    box-sizing: border-box;
    margin-top: 272upx;
  }

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
</style>
