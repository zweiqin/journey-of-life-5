<template>
  <view class="j-to" @click="handleToHere">
    <text class="title">{{ text }}</text>
    <JIcon width="46" height="34" type="to"></JIcon>
  </view>
</template>

<script>
import { getAddressLongitudeAndLatitude } from "../../utils";

export default {
  props: {
    text: {
      type: String,
      default: "导航去这里",
    },
    icon: {
      type: String,
      default: "to",
    },
    address: String,
  },

  methods: {
    handleToHere() {
      const _this = this;
      getAddressLongitudeAndLatitude(this.address)
        .then((res) => {
          const localInfo = res.result.location;
          uni.getLocation({
            type: "gcj02",
            success: function (res) {
              _this.longitude = res.longitude;
              _this.latitude = res.latitude;
              uni.openLocation({
                latitude: localInfo.lat,
                longitude: localInfo.lng,
              });
            },
          });
        })
        .catch(() => {});
      return;
    },
  },
};
</script>

<style lang="less" scoped>
.j-to {
  color: #3662ec;
  .title {
    font-size: 28upx;
  }
}
</style>