import { toastIcons } from "./data";
import { J_USER_ID, J_USER_INFO } from "../constant";
export default {
  install(Vue) {
    Vue.mixin({
      data() {
        return {
          userId: uni.getStorageSync(J_USER_ID),
        };
      },
      methods: {
        /**
         * title: 提示标题
         * type: 提示icon 类型
         * icon: 是否显示icon
         * duration：停留时间
         * content： 详细描述
         */
        ttoast(config) {
          const tuiToastRef = this.$refs.toast;
          if (!tuiToastRef) {
            console.warn("该页面没有 tui-toast 元素，toast调用失败");
            return;
          }
          if (typeof config === "string") {
            tuiToastRef.show({
              title: config,
              imgUrl: toastIcons["success"],
              icon: true,
            });
          } else {
            const {
              title,
              type = "success",
              icon = true,
              duration = 2000,
              content = "",
            } = config;
            this.$refs.toast.show({
              title,
              imgUrl: toastIcons[type],
              icon,
              duration,
              content,
            });
          }
        },

        empty(text) {
          this.ttoast({
            type: "info",
            title: text || "功能尚未开放",
            content: "敬请期待~",
          });
        },

        isEmpty(obj) {
          return ["{}", "[]"].includes(JSON.stringify(obj));
        },

        getBeeUrl(url) {
          return url.includes("http")
            ? url
            : "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/" +
                url;
        },

        // 是否登录
        isLogin() {
          const userId = uni.getStorageSync(J_USER_ID);
          const userInfo = uni.getStorageSync(J_USER_INFO);
          return userId && !this.isEmpty(userInfo);
        },
      },
    });
  },
};
