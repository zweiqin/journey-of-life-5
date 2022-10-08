<template>
  <view class="map-container">
    <map
      :longitude="113.293719"
      :latitude="22.885983"
      :scale="20"
      enable-poi
      enable-3D
      style="width: 100vw; height: 100vh"
    >
    </map>
  </view>
</template>

<script>
export default {
  onLoad() {
    this.$nextTick(() => {
      uni.getLocation({
        type: "wgs84",
        success: function (res) {
          console.log("当前位置的经度：" + res.longitude);
          console.log("当前位置的纬度：" + res.latitude);
        },
        fail: () => {
        },
        complete: function () {
        },
      });
    });
  },
};
</script>

<style lang="scss" scoped>
</style>