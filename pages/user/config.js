export const myTools = [
	{
		name: '我的收益',
		icon: require('../../static/user-center/menus/wallet.png')
	},
	{
		name: '我的订单',
		icon: require('../../static/user-center/menus/order.png'),
		url: '/user/orderForm/order-form'
	},
	{
		name: '我的收藏',
		icon: require('../../static/user-center/menus/collection.png'),
		url: '/user/sever/view-history?page=collection'
	},
	{
		name: '我的地址',
		icon: require('../../static/user-center/menus/address.png'),
		url: '/user/site/site-manage'
	}
]

export const myServe = [
	{
		name: '我的拼团',
		icon: require('../../static/user-center/menus/wodepintuan.png')
	},
	{
		name: '购物车',
		icon: require('../../static/user-center/menus/gouwuche.png'),
		url: '/user/sever/shop-car'
	},
	{
		name: '会员升级',
		icon: require('../../static/user-center/menus/huiyunshenji.png'),
		url: '/user/sever/userUp'
	},
	{
		name: '联系客服',
		icon: require('../../static/user-center/menus/lianxikefu.png')
	},
	{
		name: '推广码',
		icon: require('../../static/user-center/menus/tuiguangma.png'),
		type: 'code',
		role: [11, 10, 7, 5, 6, 4, 3]
	},
	{
		name: '优惠劵',
		icon: require('../../static/user-center/menus/youhuijuan.png')
		// url: '/user/sever/coupon
	},
	{
		name: '代金券',
		icon: require('../../static/user-center/menus/daijinjuan.png'),
		url: '/user/otherServe/voucher/index',
		role: [6, 4, 3]
	},
	{
		name: '进销存',
		icon: require('../../static/user-center/menus/jinxiaocun.png')
	},
	{
		name: '商家入驻',
		icon: require('../../static/user-center/menus/shangjiaruzhu.png'),
		url: '/user/marketing-tools/store-application',
		role: [10, 7]
	},
	{
		name: '申请记录',
		icon: require('../../static/user-center/menus/shenqingjilu.png'),
		url: '/user/sever/application-record/application-record'
	},
	{
		name: '粉丝列表',
		icon: require('../../static/user-center/menus/shenqingjilu.png'),
		url: '/user/sever/fan-list'
	},
	{
		name: '关联商家',
		icon: require('../../static/user-center/menus/shenqingjilu.png'),
		url: '/user/sever/related-merchants'
	}
]

export const myStore = [
	{
		name: '营销画像',
		icon: require('../../static/user-center/menus/yingxiaohuaxiang.png'),
		url: '/user/digital-store/marketing-portrait',
		role: [6, 4, 3]
	},
	{
		name: '信息哨兵',
		icon: require('../../static/user-center/menus/xinxishaobing.png'),
		url: '/user/digital-store/information-sentry',
		role: [6, 4, 3]
	},
	{
		name: '业绩哨兵',
		icon: require('../../static/user-center/menus/yejishaobing.png'),
		url: '/user/digital-store/performance',
		role: [6, 4, 3]
	},
	{
		name: '业务管理',
		icon: require('../../static/user-center/menus/yewuguan.png'),
		url: '/user/digital-store/newBusiness/index',
		role: [6, 4, 3]
	}
]

export const marketingTools = [
	{
		name: '分享券',
		icon: require('../../static/user-center/menus/fenxiangjuan.png')
	},
	{
		name: '红包发放',
		icon: require('../../static/user-center/menus/hongbaofafang+.png'),
		url: '/user/marketing-tools/red-envelope-distribution/index',
		role: [6, 4, 3]
	},
	{
		name: '每日签到',
		icon: require('../../static/user-center/menus/meiriqiandao.png')
	},
	{
		name: '推广中心',
		icon: require('../../static/user-center/menus/tuiguangma.png'),
		url: '/user/promotionCenter/index'
	},
	{
		name: '智能画册',
		icon: require('../../static/user-center/menus/zhineghuace.png')
	},
	{
		name: '秒杀活动',
		icon: require('../../static/user-center/menus/maioshahuodong.png')
	},
	{
		name: '区域代理',
		icon: require('../../static/user-center/menus/quyudaili.png'),
		url: '/user/sever/regional-agent'
	}
]
