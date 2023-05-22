import {
  CHANGE_J_CURRENT_LOCATION,
  CHANGE_DEFAULT_LOCATION,
  CHANGE_CURRENT_LONGITUDE_AND_LATITUDE,
} from "./types";
import { getAdressDetailByLngLat } from "../../utils/location";
import { J_CURRENT_LOCATION } from "../../constant";

export default {
  namespaced: true,
  state() {
    return {
      defaultLocation: "",
      currentLocation: uni.getStorageSync(J_CURRENT_LOCATION) || "龙江镇",
      lonAndLat: {
        longitude: 113.1219,
        latitude: 23.0218,
      },
    };
  },

  mutations: {
    [CHANGE_J_CURRENT_LOCATION](state, currentLocation) {
      state.currentLocation = currentLocation;
      uni.setStorageSync(J_CURRENT_LOCATION, currentLocation);
    },

    [CHANGE_DEFAULT_LOCATION](state, defaultLocation) {
      state.defaultLocation = defaultLocation;

      this.commit(
        `location/${CHANGE_J_CURRENT_LOCATION}`,
        defaultLocation.addressComponent.district
      );
    },

    [CHANGE_CURRENT_LONGITUDE_AND_LATITUDE](state, location) {
      state.lonAndLat = {
        longitude: location.longitude,
        latitude: location.latitude,
      };
    },
  },

  actions: {
    async getCurrentLocation({ commit }) {
      // #ifdef APP
      uni.getLocation({
        type: "gcj02",
        success: function (res) {
          commit(CHANGE_CURRENT_LONGITUDE_AND_LATITUDE, res);
          getAdressDetailByLngLat(res.latitude, res.longitude)
            .then((res) => {
              if (res.status === "1") {
                commit(CHANGE_DEFAULT_LOCATION, res.regeocode);
              }
            })
            .catch(() => {
              commit(CHANGE_J_CURRENT_LOCATION, "定位失败");
            });
        },
      });
      // #endif

      // #ifdef H5
      uni.getLocation({
        type: "gcj02",
        success: function (res) {
          commit(CHANGE_CURRENT_LONGITUDE_AND_LATITUDE, res);
          getAdressDetailByLngLat(res.latitude, res.longitude)
            .then((res) => {
              if (res.status === "1") {
                commit(CHANGE_DEFAULT_LOCATION, res.regeocode);
              }
            })
            .catch(() => {
              commit(CHANGE_J_CURRENT_LOCATION, "定位失败");
            });
        },
      });
      // #endif
    },
  },
};
