import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters";
import location from "./modules/location";

Vue.use(Vuex);

export default new Vuex.Store({
  getters,
  modules: {
    location,
  },
});
