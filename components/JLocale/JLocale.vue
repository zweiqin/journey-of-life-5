<template>
  <view class="local-wrapper" @click.stop="handleClick">
    <JIcon type="locale" width="34" height="40"></JIcon>
    <text class="locale">{{ address }}</text>

    <view
      class="popup"
      :style="{
        transform: show ? 'scale(1)' : 'scale(0)',
      }"
    >
      <view>定位失败</view>
      <view>
        {{ error }}
      </view>
      <button @click.prevent.stop="show = false">关闭</button>
    </view>
  </view>
</template>

<script>
import { getAdressDetailByLngLat } from "../../utils/DWHutils";
import { J_LOACTION } from "../../constant";
export default {
  mounted() {
    this.getLocation();
  },

  data() {
    return {
      address: "位置",
      error: null,
      show: false,
    };
  },

  methods: {
    getLocation() {
      this.address = "定位中...";
      const _this = this;
      uni.getLocation({
        type: "gcj02",
        success: function (res) {
          uni.setStorageSync(J_LOACTION, {
            latitude: res.latitude,
            longitude: res.longitude,
          });

          getAdressDetailByLngLat(res.latitude, res.longitude)
            .then((res) => {
              if (res.status == "1") {
                const result = res.regeocode.addressComponent.city;
                _this.address = result;
              }
            })
            .catch((err) => {
              _this.error = err;
              _this.show = true;
              _this.address = "定位失败";
            });
        },
      });
    },

    handleClick() {
      const _this = this;
      if (this.address === "定位失败" || this.address === "定位中...") {
        uni.showModal({
          title: "提示",
          confirmText: "我已打开定位",
          content: "请确认您已开启了定位",
          success: function (res) {
            if (res.confirm) {
              _this.getLocation();
            }
          },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.local-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .locale {
    padding: 0 10upx;
    border-right: 1px solid #ccc;
  }
}

.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  // transform: translate(-45vw, 45vh);
  margin-left: -45vw;

  width: 90vw;
  height: 90vh;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transform: scale(0);
}
</style>