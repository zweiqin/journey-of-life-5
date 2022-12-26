/*
 * @Author: 13008300191 904947348@qq.com
 * @Date: 2022-09-12 16:17:05
 * @LastEditors: 13008300191 904947348@qq.com
 * @LastEditTime: 2022-09-26 10:43:23
 * @FilePath: \团蜂商城 - 副本\tuan-uniapp\pages\user\config.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
export const tools = [
  {
    icon: require("../../static/images/user/erweima.png"),
    url: '/pages/qrcode/qrcode'
  },
  {
    icon: require("../../static/images/user/shezhi.png"),
  },
  {
    icon: require("../../static/images/user/xinxi.png"),
  },
];

export const one = {
  title: null,
  menus: [
    {
      label: "待付款",
      icon: require("../../static/images/user/daifukuan.png"),
      url: "/user/orderForm/order-form",
      showType: 1,
    },
    {
      label: "待发货",
      icon: require("../../static/images/user/daifahuo.png"),
      url: "/user/orderForm/order-form",
      showType: 2,
    },
    {
      label: "待收货",
      icon: require("../../static/images/user/daishouhuo.png"),
      url: "/user/orderForm/order-form",
      showType: 3,
    },
    {
      label: "待评价",
      icon: require("../../static/images/user/daipingjia.png"),
      url: "/user/orderForm/order-form",
      showType: 4,
    },
    {
      label: "所有订单",
      icon: require("../../static/images/user//suoyoudingdan.png"),
      url: "/user/orderForm/order-form",
      showType: 0,
    },
  ],
};
export const two = {
  title: null,
  menus: [
    {
      label: "待付款",
      icon: require("../../static/images/user/daifukuan.png"),
      url: "/community-center/order",
    },
    {
      label: "待发货",
      icon: require("../../static/images/user/daifahuo.png"),
      url: "/community-center/order",
    },
    {
      label: "待安装",
      icon: require("../../static/images/lqb/user/daianzhuang.png"),
      url: "/community-center/order",
    },
    {
      label: "待评价",
      icon: require("../../static/images/user/daipingjia.png"),
      url: "/community-center/order",
    },
    {
      label: "所有订单",
      icon: require("../../static/images/user//suoyoudingdan.png"),
      url: "/community-center/order",
    },
  ],
};

export const three = {
  title: null,
  menus: [
    {
      label: "待付款",
      icon: require("../../static/images/user/daifukuan.png"),
      url: "/user/orderForm/order-form",
      showType: 1,
    },
    {
      label: "待发货",
      icon: require("../../static/images/user/daifahuo.png"),
      url: "/user/orderForm/order-form",
      showType: 2,
    },
    {
      label: "待收货",
      icon: require("../../static/images/user/daishouhuo.png"),
      url: "/user/orderForm/order-form",
      showType: 3,
    },
    {
      label: "待评价",
      icon: require("../../static/images/user/daipingjia.png"),
      url: "/user/orderForm/order-form",
      showType: 4,
    },
    {
      label: "所有订单",
      icon: require("../../static/images/user//suoyoudingdan.png"),
      url: "/user/orderForm/order-form",
      showType: 0,
    },
  ],
};
export const serve = {
  title: "我的服务",
  menus: [
    {
      label: "商品收藏",
      icon: require("../../static/images/user/shangpinshocang.png"),
      url: "/user/sever/view-history?page=collection",
    },
    {
      label: "我的拼团",
      icon: require("../../static/images/user/wodepintuan.png"),
    },
    {
      label: "地址管理",
      icon: require("../../static/images/user/dizhiguanli.png"),
      url: "/user/site/site-manage",
    },
    {
      label: "购物车",
      icon: require("../../static/images/user/gouwuche.png"),
      url: "/user/sever/shop-car",
    },
    {
      label: "优惠劵",
      icon: require("../../static/images/user/youhuijuan.png"),
      url: "/user/sever/coupon",
    },
    {
      label: "联系客服",
      icon: require("../../static/images/user/lianxikefu.png"),
    },
    // {
    //   label: "营销宝库",
    //   icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/lwhrfkm19hdgi5mq90p6.png",
    //   url: "/pages/marketing-treasure-house/marketing-treasure-house",
    // },
    {
      label: "会员升级",
      icon: require("../../static/images/user/huiyuanshengji.png"),
      url: "/user/sever/userUp",
    },
    {
      label: "推广码",
      icon: require("../../static/images/user/tuiguangma.png"),
      type: 'extension'
    },
  ],
};

export const digitalStore = {
  title: "数字化营销门店",
  menus: [
    {
      label: "营销画像",
      icon: require("../../static/images/user/yingxiaohuaxiang.png"),
      url: "/user/digital-store/marketing-portrait",
      role: [1,2]

    },
    {
      label: "信息哨兵",
      icon: require("../../static/images/user/xinxishaobing.png"),
      url: "/user/digital-store/information-sentry",
      role: [1,2]
    },
    {
      label: "业绩哨兵",
      icon: require("../../static/images/user/yejishaobing.png"),
      url: "/user/digital-store/performance",
      role: [1,2]
    },
    {
      label: "业务管理",
      icon: require("../../static/images/user/yewuguanli.png"),
      url: "/user/digital-store/newBusiness/index",
      role: [1,2]
    },
  ],
};

export const marketingTools = {
  title: "营销工具",
  menus: [
    {
      label: "我的名片",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/exu48rqu12mmp283gf7u.png",
      url: "/user/marketing-tools/contact-guide/index",
      width: "60upx",
      role: [1,2]
    },
    {
      label: "红包发放",
      icon: require("../../static/images/user/hongbaofafang.png"),
      url: "/user/marketing-tools/red-envelope-distribution",
      role: [1,2]
    },
    {
      label: "每日签到",
      icon: require("../../static/images/user/meiriqiandao.png"),
      role: [1,2]
    },
    {
      label: "门店看板",
      icon: require("../../static/images/user/mendiankanban.png"),
      role: [1,2]
    },
    {
      label: "智能画册",
      icon: require("../../static/images/user/zhinenghuace.png"),
      role: [1,2]
    },

    {
      label: "秒杀活动",
      icon: require("../../static/images/user/miaoshahuodong.png"),
      role: [1,2]
    },
    {
      label: "分享券",
      icon: require("../../static/images/user/fenxiangjuan.png"),
      role: [1,2]
    },
    {
      label: "推广中心",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/o63eczbr410ozaj831bx.png",
      url:"/user/promotionCenter/index"
    
    },
  ],
};

export const otherServe = {
  title: "其他服务",
  menus: [
    {
      label: "进销存",
      icon: require("../../static/images/user//jinxiaocun.png"),
      type: 'mini-progress',
      role: [1,2]
    },
    {
      label: "代金券",
      icon: require("../../static/images/user/daijinjuanchongzhi.png"),
      url: '/user/otherServe/voucher/index',
      role: [1,2]
    },
    {
      label: "门店管理",
      icon: require('../../static/images/user/brand-manage.png'),
      role: [1,2],
      url: '/user/otherServe/brand-manage/index'
    },
    {
      label: "",
      icon: '',
      url: '',
    },
    // {
    //   label: "代金券转赠",
    //   icon: require("../../static/images/user/daijinjuanzhuanzeng.png"),
    // },
    // {},
    // {}
    // {
    //   label: "联系客服",
    //   icon: require("../../static/images/user/lianxikefu.png"),
    // },

    // {
    //   label: "关注物流",
    //   icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/93ka73rcnj4d73wub68u.png",
    //   url: "/logistics/appoint",
    // },
  ],
};
