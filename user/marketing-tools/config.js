export const applyStoreOne = [
  {
    label: "登录账号：",
    field: "username",
    type: "input",
    placeholder: "请填写登录账号（至少为6位）用于登录",
  },
  {
    label: "登录密码：",
    field: "password",
    type: "input",
    placeholder: "请填写登录密码（至少为6位）用于登录",
  },
  {
    label: "联系电话：",
    type: "input",
    field: "brandPhone",
    placeholder: "请填写手机号码",
    warnText: "（注：账号/密码用于您登陆PC端管理后台，请务必牢记）",
  },
];

export const applyStoreTow = [
  {
    label: "门店名称：",
    field: "brandname",
    type: "input",
    placeholder: "请填写门店名称",
  },
  {
    label: "所属类型：",
    field: "brandgenre",
    type: "type",
    placeholder: "请选择门店类型",
  },
  {
    label: "所在城市：",
    type: "city",
    field: "address",
    placeholder: "省份、城市、区县",
  },
  {
    label: "详细地址（门牌号）",
    type: "textarea",
    field: "addressDetail",
    placeholder: "请填写详细地址",
  },
  {
    label: "门店介绍",
    type: "textarea",
    field: "desc",
    placeholder: "请填写门店简介",
  },
];

export const uploadFields = [
  {
    label: "门店logo",
    field: "picUrl",
  },
  {
    label: "营业执照",
    field: "licenseUrl",
  },
  {
    label: "法人身份证人像面",
    field: "brandIdcardProsUrl",
  },
  {
    label: "法人身份证国徽面",
    field: "brandIdcardConsUrl",
  },
];

export const mapStatusColor = (type) => {
  return {
    已开通: "#FA5151",
    已过期: "#000000",
    待审核: "#FA5151",
    已取消: "#00B578",
  }[type];
};

export const infomations = [
  {
    label: "手机号：",
    field: "",
    type: "input",
    placeholder: "请填写营销策划师需要绑定的手机号",
  },
  {
    label: "联系方式：",
    field: "",
    type: "input",
    placeholder: "请填写联系方式",
  },
  {
    label: "姓名：",
    type: "input",
    field: "",
    placeholder: "请填写营销策划师的姓名",
    warnText: "（注：账号/密码用于您登陆PC端管理后台，请务必牢记）",
  },
  {
    label: "性别",
    type: "input",
    field: "",
    placeholder: "请选择性别",
  },
  {
    label: "所属城市",
    type: "city",
    field: "",
    placeholder: "省份、城市、区县",
  },
  {
    label: "微信号",
    type: "input",
    field: "",
    placeholder: "请填写微信号",
  },
  {
    label: "原住城市",
    type: "city",
    field: "",
    placeholder: "省份、城市、区县",
    warnText:
      "（注：微信号/微信手机号用于绑定新账号的角色，请务必填写真实信息）",
  },
  {
    label: "详细地址（门牌号）",
    type: "textarea",
    field: "addressDetail",
    placeholder: "请填写详细地址",
  },
];

export const identImgs = [
  {
    label: "身份证人像面",
    field: "",
  },
  {
    label: "身份证国徽面",
    field: "",
  },
];

export const mapApplyType = (type) => {
  return {
    1: "商家会员",
    2: "营销策划师",
  }[type];
};
