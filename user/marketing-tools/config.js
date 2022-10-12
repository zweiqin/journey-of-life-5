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
    type: "select",
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
