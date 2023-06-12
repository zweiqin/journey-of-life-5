export const myTools = [
	{
		name: '小账本',
		icon: require('../../static/user-center/menus/wallet.png'),
		url: '/user/my-tools/account-book/index'
	},
	{
		name: '每日签到',
		icon: require('../../static/user-center/menus/meiriqiandao.png'),
		url: '/user/my-tools/daily-attendance/index'
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
	},
	{
		name: '我的券包',
		icon: require('../../static/user-center/menus/shenqingjilu.png'),
		url: '/pages/index/coupons/coupons?currentTab=2'
	},
	{
		name: '银行卡',
		icon: require('../../static/user-center/menus/shenqingjilu.png'),
		url: '/user/my-tools/bank-card/index'
	},
	{
		name: '智能画册',
		icon: require('../../static/user-center/menus/shenqingjilu.png'),
		url: '/user/my-tools/smart-album/index'
	}
]

export const myServe = [
	{
		name: '商家订单',
		icon: require('../../static/user-center/menus/order.png'),
		url: '/user/merchant-orders/index'
	},
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
		icon: require('../../static/user-center/menus/lianxikefu.png'),
		url: '/user/sever/customer-service/customer-service'
	},
	{
		name: '推广码',
		icon: require('../../static/user-center/menus/tuiguangma.png'),
		type: 'code',
		role: [11, 10, 7, 5, 6, 4, 3]
	},
	{
		name: '邀请码',
		icon: require('../../static/user-center/menus/tuiguangma.png'),
		type: 'invitationCode',
		role: [11, 10, 7, 5, 6, 4, 3, 2]
	},
	{
		name: '优惠劵',
		icon: require('../../static/user-center/menus/youhuijuan.png'),
		url: '/user/sever/coupon'
	},
	{
		name: '代金券',
		icon: require('../../static/user-center/menus/daijinjuan.png'),
		url: '/user/otherServe/voucher/index'
		// role: [6, 4, 3]
	},
	{
		name: '商家券包',
		icon: require('../../static/user-center/menus/shenqingjilu.png'),
		url: '/user/sever/merchant-certificate/index',
		role: [ 6 ]
	},
	{
		name: '进销存',
		icon: require('../../static/user-center/menus/jinxiaocun.png')
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
		name: '粉丝统计',
		icon: require('../../static/user-center/menus/shenqingjilu.png'),
		url: '/user/sever/fan-statistics'
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
	},
	{
		name: '商品管理',
		icon: require('../../static/user-center/menus/shangpinguanli.png'),
		url: '/user/digital-store/goods-management/index',
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
		role: [10, 7, 6, 5, 4, 3, 2]
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
		name: '团购管理',
		icon: require('../../static/user-center/menus/shenqingjilu.png'),
		url: '/user/marketing-tools/group-buying/index',
		role: [ 6 ]
	},
	{
		name: '区域代理',
		icon: require('../../static/user-center/menus/quyudaili.png'),
		url: '/user/sever/regional-agent'
	}
]
