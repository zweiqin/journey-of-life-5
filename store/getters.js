export default {
  // 当前地址
  currentLocation: (state) => state.location.currentLocation,
  // 当前定位的详细地址
  defaultLocation: (state) => state.location.defaultLocation,
  // 当前经纬度
  lonAndLat: (state) => state.location.lonAndLat,
};
