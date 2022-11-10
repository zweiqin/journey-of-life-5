<template>
  <view class="map-navigition">
    <map
      name="map"
      :latitude="latitude"
      :longitude="longitude"
      class="map"
      id="map"
      :show-location="true"
    ></map>
  </view>
</template>

<script>
export default {
  data() {
    return {
      _mapContext: null,
      longitude: null,
      latitude: null,
    };
  },
  onReady() {
    this._mapContext = uni.createMapContext("map", this);
    const _this = this;
    uni.getLocation({
      type: "gcj02",
      success: function (res) {
        _this.longitude = res.longitude;
        _this.latitude = res.latitude;

        const address = uni.getStorageSync("navigitionAddress");

        console.log(address);
        uni.openLocation({
          latitude: address.lat,
          longitude: address.lng,
        });
      },
    });
  },

  onLoad(options) {},
};
</script>

<style lang="less" scoped>
.map-navigition {
  width: 100vw;
  height: 100vh;

  .map {
    width: 100vw;
    height: 100vh;
  }
}
</style>