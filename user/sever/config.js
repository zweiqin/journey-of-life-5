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
  },
  {
    label: "分享",
    value: 3,
  },
];

export const couponFilters = [
  {
    label: "类型状态",
    value: "0",
    type: "select",
    children: [
      {
        label: "全部类型",
        value: "0-1",
      },
      {
        label: "商家劵",
        value: "0-2",
      },
      {
        label: "其他劵",
        value: "0-3",
      },
    ],
  },

  {
    label: "状态",
    value: "1",
    type: "select",
    type: "select",
    children: [
      {
        label: "全部状态",
        value: "1-1",
      },
      {
        label: "新劵",
        value: "1-2",
      },
      {
        label: "快过期",
        value: "1-3",
      },
    ],
  },

  {
    label: "优惠",
    value: "2",
    type: "select",
    type: "select",
    children: [
      {
        label: "默认排序",
        value: "2-1",
      },
      {
        label: "从高到低",
        value: "2-2",
      },
      {
        label: "从低到高",
        value: "2-3",
      },
    ],
  },

  {
    label: "管理",
    type: "edit",
    value: "3",
  },
];
