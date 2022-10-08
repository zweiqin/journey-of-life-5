export const navs = {
  styles: {
    width: "80upx",
    height: "80upx",
    radius: "20upx",
    iconWidth: "60upx",
    rowBottom: "36upx",
  },
  titleStyles: {
    color: "#3d3d3d",
    "margin-top": "20upx",
    fontSize: "24upx",
  },
  rows: 4,
  navs: [
    {
      label: "草帽服饰",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/cr9m0f7x0ehfyk1srlm5.png",
      background: "linear-gradient(152deg, #07B9B9 0%, #c9e8e8 100%)",
      width: "56upx",
      url: "/marketing-treasure-house/article-list?title=0",
    },
    {
      label: "酒店营销",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/z3bskqk44mhl2nxq01yf.png",
      background: "linear-gradient(146deg, #3662EC 2%, rgba(216,216,216,0))",
      width: "45upx",
      url: "/marketing-treasure-house/article-list?title=1",
    },
    {
      label: "美容美发",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/m84ik0e747f4m8ec3ai3.png",
      background:
        "linear-gradient(142deg, #EB2F96 3%, rgba(216,216,216,0) 100%)",
      url: "/marketing-treasure-house/article-list?title=2",
      width: "45upx",
    },
    {
      label: "生活超市",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/7v7f7eh4nwdmi44jwrhm.png",
      background:
        "linear-gradient(136deg, #FF8F1F 0%, rgba(216,216,216,0) 100%)",
      width: "54upx",
      url: "/marketing-treasure-house/article-list?title=3",
    },
    {
      label: "健身娱乐",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/kmyyrrz3oc6n6c1qcvyz.png",
      background:
        "linear-gradient(148deg, #FF8F1F 1%, rgba(216,216,216,0) 100%)",
      width: "50upx",
      url: "/marketing-treasure-house/article-list?title=4",
    },
    {
      label: "装修建材",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/qbzls5y8h6506fi9e36l.png",
      background:
        "linear-gradient(142deg, #00B578 0%, rgba(216,216,216,0) 100%)",
      width: "40upx",
      url: "/marketing-treasure-house/article-list?title=5",
    },
    {
      label: "培训学校",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/hu618z0uzj1djwb1tkny.png",
      background:
        "linear-gradient(145deg, #07B9B9 0%, rgba(216,216,216,0) 100%)",
      width: "56upx",
      url: "/marketing-treasure-house/article-list?title=6",
    },
    {
      label: "汽车美容",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/dt3i40dcro8i91qs22ix.png",
      background:
        "linear-gradient(145deg, #3662EC 0%, rgba(216,216,216,0) 100%)",
      width: "48upx",
      url: "/marketing-treasure-house/article-list?title=7",
    },
    {
      label: "爆粉秘籍",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/j4c42vmwqg1ss4wel6ra.png",
      background:
        "linear-gradient(148deg, #FA5151 0%, rgba(216,216,216,0) 100%)",
      width: "54upx",
      url: "/marketing-treasure-house/article-list?title=8",
    },
    {
      label: "抖音实例",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/bil0fjlgzj1qvp3fnhok.png",
      background:
        "linear-gradient(138deg, #EB2F96 0%, rgba(216,216,216,0) 100%)",
      width: "50upx",
      url: "/marketing-treasure-house/article-list?title=9",
    },
    {
      label: "营销课程",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/j4c42vmwqg1ss4wel6ra.png",
      background:
        "linear-gradient(143deg, #8A38F5 0%, rgba(216,216,216,0) 100%)",
      width: "54upx",
      url: "/marketing-treasure-house/article-list?title=10",
    },
    {
      label: "赚钱教程",
      icon: "https://www.tuanfengkeji.cn:9527/jf-admin-api/admin/storage/fetch/bil0fjlgzj1qvp3fnhok.png",
      background:
        "linear-gradient(140deg, #FF8F1F 0%, rgba(216,216,216,0) 100%)",
      width: "50upx",
      url: "/marketing-treasure-house/article-list?title=11",
    },
  ],
};

export const getNavInfo = (id) => {
  return navs.navs[id];
};
