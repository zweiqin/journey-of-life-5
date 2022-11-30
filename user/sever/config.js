export const mapApplyStats = (status) => {
  return {
    "-1": "失败",
    0: "审核中",
    1: "成功",
    2: "升级异常",
  }[status];
};

export const couponNavs = [
  {
    label: "未使用",
    value: 0,
  },
  {
    label: "已使用",
    value: 1,
  },
  {
    label: "已过期",
    value: 2,
  }
];

export const vips = [
  {
    url: "",
    label: "会员升级",
    powerUrl:
      "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/78ixjkl9eg69fjlcgi22.png",
    price: "99",
    type: 4,
    style: {
      height: "133upx",
      margin: "20upx 0",
    },
    key: "vipInfo",
  },
  {
    url: "/user/marketing-tools/store-application?status=-10",
    label: "商家升级",
    powerUrl:
      "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/u5eplf8zp6uh343rioyg.png",
    price: "3800",
    type: 1,
    style: {
      height: "300upx",
      margin: "20upx 0",
    },
    key: "storeInfo",
  },
  {
    url: "/user/marketing-tools/marketing-planner?status=-10",
    label: "营销策划师升级",
    type: 2,
    powerUrl:
      "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/398c5ygdln5qfamkgret.png",
    price: "6000",
    style: {
      height: "188upx",
      margin: "20upx 0",
    },
    key: "marketingPlannerInfo",
  },
]