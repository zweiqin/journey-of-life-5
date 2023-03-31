import { CHANGE_CURRENT_LOCATION, CHANGE_DEFAULT_LOCATION } from "./types";
import { getAdressDetailByLngLat } from "../../utils/location";
import { CURRENT_LOCATION } from "../../constant";

export default {
  namespaced: true,
  state() {
    return {
      defaultLocation: "",
      currentLocation: uni.getStorageSync(CURRENT_LOCATION) || "龙江镇",
    };
  },

  mutations: {
    [CHANGE_CURRENT_LOCATION](state, currentLocation) {
      state.currentLocation = currentLocation;
      uni.setStorageSync(CURRENT_LOCATION, currentLocation);
    },

    [CHANGE_DEFAULT_LOCATION](state, defaultLocation) {
      state.defaultLocation = defaultLocation;
      this.commit(
        `location/${CHANGE_CURRENT_LOCATION}`,
        defaultLocation.addressComponent.district
      );
    },
  },

  actions: {
    async getCurrentLocation({ commit }) {
      // #ifdef APP
      uni.getLocation({
        type: "gcj02",
        success: function (res) {
          getAdressDetailByLngLat(res.latitude, res.longitude)
            .then((res) => {
              if (res.status === "1") {
                commit(CHANGE_DEFAULT_LOCATION, res.regeocode);
              }
            })
            .catch(() => {
              commit(CHANGE_CURRENT_LOCATION, "定位失败");
            });
        },
      });
      // #endif

      // #ifdef H5
      uni.getLocation({
        type: "gcj02",
        success: function (res) {
          getAdressDetailByLngLat(res.latitude, res.longitude)
            .then((res) => {
              if (res.status === "1") {
                commit(CHANGE_DEFAULT_LOCATION, res.regeocode);
              }
            })
            .catch(() => {
              commit(CHANGE_CURRENT_LOCATION, "定位失败");
            });
        },
      });
      // #endif
    },
  },
};
