import Vue from "vue";
import App from "./App";

Vue.config.productionTip = false;
// import 'animate.css'

Vue.mixin({
  data() {
    return {
      baseUrl: 'https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/'
    }
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
  },
});

App.mpType = "app";

const app = new Vue({
  ...App,
});
app.$mount();
