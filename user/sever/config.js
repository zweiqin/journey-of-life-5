export const mapApplyStats = (status) => {
  return {
    "-1": "失败",
    0: "审核中",
    1: "成功",
    2: "升级异常",
  }[status];
};

window.aaa = mapApplyStats;
