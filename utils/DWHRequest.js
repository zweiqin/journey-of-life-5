import { BASE_URL, RUAN_URL, LANG_FEE_URL, XZL } from "../config";

const request = (base_url) => {
  return function (url, data = {}, method = "post", cb) {
    return new Promise((resolve, reject) => [
      uni.request({
        url: base_url + url,
        data,
        method,
        success: (res) => {
          if (res.data.errno !== 0) {
            uni.showToast({
              title: res.data.errmsg,
              duration: 2000,
              icon: "none",
            });
            reject(res.data.errmsg);
            return;
          } else if (res.data.errno == 501) {
            uni.showModal({
              title: "提示",
              content: "token 已过期请重新登录",
              success: function (res) {
                uni.clearStorage();
                uni.navigateTo({
                  url: "/pages/login/login",
                });
              },
            });
          } else {
            resolve(res.data);
          }
        },
        fail: (error) => {
          reject(error);
        },

        complete: () => {
          cb && typeof cb === "function" && cb();
        },
      }),
    ]);
  };
};

const requestLang = (base_url) => {
  return function (url, data = {}, method = "post", cb) {
    return new Promise((resolve, reject) => [
      uni.request({
        url: base_url + url,
        data,
        method,
        success: (res) => {
          resolve(res.data);
        },
        fail: (error) => {
          reject(error);
        },

        complete: () => {
          cb && typeof cb === "function" && cb();
        },
      }),
    ]);
  };
};

export const GyRequest = request(BASE_URL);
export const RuanRequest = request(RUAN_URL);
export const LTRequest = requestLang(LANG_FEE_URL);
