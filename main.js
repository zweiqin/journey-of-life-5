import Vue from "vue";
import App from "./App";
import * as echarts from "echarts";
Vue.prototype.$echarts = echarts;
Vue.config.productionTip = false;
// import 'animate.css'
import store from "./store";
import globalMixin from "./mixin/global";

Vue.mixin({
  data() {
    return {
      baseUrl:
        "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/",
      lazyLoadingMode: "skeleton-2",
    };
  },
  methods: {
    setData: function (obj) {
      let that = this;
      let keys = [];
      let val, data;
      Object.keys(obj).forEach(function (key) {
        keys = key.split(".");
        val = obj[key];
        data = that.$data;
        keys.forEach(function (key2, index) {
          if (index + 1 == keys.length) {
            that.$set(data, key2, val);
          } else {
            if (!data[key2]) {
              that.$set(data, key2, {});
            }
          }
          data = data[key2];
        });
      });
    },

    $showToast(text, icon) {
      uni.showToast({
        title: text,
        duration: 2000,
        icon: icon || "none",
      });
    },

    go(url) {
      if (!url) {
        return;
      }

      uni.navigateTo({
        url: url,
      });
    },

    switchTab(url) {
      if (!url) {
        return;
      }
      uni.switchTab({
        url: url,
      });
    },

    _getSize(selecter) {
      const _this = this;
      return new Promise((resolve, reject) => {
        const query = uni.createSelectorQuery().in(_this);
        query
          .select(selecter)
          .boundingClientRect((data) => {
            resolve(data);
          })
          .exec();
      });
    },
  },
});

Vue.use(globalMixin);
App.mpType = "app";

const app = new Vue({
  ...App,
  store,
});
app.$mount();
