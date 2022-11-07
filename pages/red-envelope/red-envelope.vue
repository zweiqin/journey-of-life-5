<template>
  <view class="map-container">
    <map
      :longitude="longitude"
      :latitude="latitude"
      :scale="40"
      :max-scale="40"
      style="width: 100vw; height: 100vh"
      :markers="markers"
      @markertap="handleReceive"
    >
    </map>

    <view
      class="preview-wrapper"
      :style="{
        transform: showRedPackage ? 'scale(1)' : 'scale(0)',
      }"
      ref="previewWrapperRef"
    >
      <JRedEnvelope
        :desc="redForm.remark"
        :src="redForm.imageUrl"
        :name="redForm.brandName"
        :avatar="redForm.picUrl"
      ></JRedEnvelope>

      <button class="receive-btn" @click="handleClose">确定</button>
    </view>
  </view>
</template>

<script>
import { getRedEnvelopeListApi, receiveRedEnvelopeApi } from "../../api/user";
import { getUserId } from "../../utils";
import { J_LOACTION } from "../../constant";

export default {
  onLoad() {
    this.getRedEnvelopeList();
  },

  created() {
    this.getLoaction();
  },

  data() {
    return {
      markers: [],
      longitude: 0,
      latitude: 0,
      redForm: {
        name: "",
      },
      allMarks: [],
      showRedPackage: false,
    };
  },

  methods: {
    getRedEnvelopeList() {
      getRedEnvelopeListApi().then((res) => {
        this.allMarks = res.data;
        const made = [];
        for (const redPack of res.data) {
          made.push({
            id: redPack.id,
            latitude: redPack.longitude,
            longitude: redPack.latitude,
            title: redPack.brandName + "的红包",
            width: 28,
            height: 37,
            iconPath:
              "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/n6p0qgt26t6wu1onofpa.webp",
          });

          // this.markers.push({
          //   id: Date.now() + Math.random(),
          //   latitude: '117.53414',
          //   longitude: '25.00446',
          //   title: "尼玛的红包",
          //   width: 28,
          //   height: 37,
          //   iconPath:
          //     "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/n6p0qgt26t6wu1onofpa.webp",
          // });
        }
        made.push({
          id: Date.now() + Math.random(),
          latitude: this.latitude,
          longitude: this.longitude,
          width: 22,
          height: 37,
          iconPath:
            "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/lvmfduz8l50btyqlkd2k.png",
        });

        // made.push({
        //   id: Date.now() + Math.random(),
        //   latitude: this.latitude + 0,
        //   longitude: this.longitude,
        //   width: 22,
        //   height: 37,
        //   iconPath:
        //     "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/lvmfduz8l50btyqlkd2k.png",
        // });
        this.markers = made;
        // console.log(this.markers);
      });
    },

    handleReceive(e) {
      const userId = getUserId();
      if (!userId) {
        return;
      }
      const _this = this;
      const { markerId } = e.detail;
      if (markerId) {
        const currentMark = this.allMarks.find((item) => item.id === markerId);
        if (currentMark) {
          this.redForm = currentMark;
          this.showRedPackage = true;
        }

        uni.getLocation({
          type: "gcj02",
          success: function (res) {
            receiveRedEnvelopeApi({
              id: currentMark.id,
              userId: userId,
              longitude: res.longitude * 1,
              latitude: res.latitude * 1,
            }).then(() => {
              _this.showRedPackage = true;

            });
          },
          fail: () => {
            uni.showToast({
              title: "领取失败",
              duration: 2000,
              icon: "none",
            });
          },
        });
      }
    },

    getLoaction() {
      const locationInfo = uni.getStorageSync(J_LOACTION);
      if (locationInfo) {
        this.latitude = locationInfo.latitude;
        this.longitude = locationInfo.longitude;
        return;
      }

      const _this = this;
      uni.getLocation({
        type: "gcj02",
        success: function (res) {
          _this.longitude = res.longitude * 1;
          _this.latitude = res.latitude * 1;

          uni.setStorageSync(J_LOACTION, {
            latitude: res.latitude,
            longitude: res.longitude,
          });

          location.reload();
        },
      });
    },

    handleClose(){
      this.showRedPackage = false
      this.getRedEnvelopeList()
    }
  },

  destroyed() {
    uni.removeStorageSync(J_LOACTION);
  },
};
</script>

<style lang="less" scoped>
@import "../../style/mixin.less";

.preview-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(255, 255, 255);
  transition: all 350ms;
  .flex(center, center);
  flex-direction: column;
  padding: 40upx 40upx;
  box-sizing: border-box;
  transform: scale(0);
  transition: all 350ms;

  .op {
    margin-top: 40upx;
    .flex();
    width: 100%;

    .btn {
      margin: 0;
      padding: 0;
      flex: 1;
      background-color: #fa5151;
      color: #fff;

      &:nth-child(1) {
        margin-right: 20upx;
      }
    }
  }

  .receive-btn {
    width: 100%;
    background-color: #fa5151;
    border-radius: 40upx;
    color: #fff;
    margin-top: 20px;
  }
}
</style>