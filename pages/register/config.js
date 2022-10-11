export const registerFields = [
  {
    label: "手机号",
    field: "mobile",
    type: "text",
    // placeholder: "请输入手机号",
  },
  {
    label: "新密码",
    field: "password",
    type: "pwd",
    // placeholder: "请输入密码",
  },
  {
    label: "确认密码",
    field: "validatePdw",
    type: "pwd",
    // placeholder: "请确认密码",
  },
  // {
  //   label: "验证码",
  //   field: "code",
  //   type: "code",
  // },
];

export const mapText = {
  register: {
    title: "新用户注册",
    btnTxt: "注册",
  },

  forgetPwd: {
    title: "找回密码",
    btnTxt: "重置密码",
  },
};
