export const orderTypesMall = [
	{
		label: '全部',
		value: 0,
		key: 'all'
	},
	{
		label: '待付款',
		value: 1,
		key: 'awaitPay'
	},
	{
		label: '待发货',
		value: 2,
		key: 'awaitShipped'
	},
	{
		label: '待收货',
		value: 3,
		key: 'awaitReceipt'
	},
	{
		label: '待评价',
		value: 4,
		key: 'awaitEvaluate'
	},
	{
		label: '已退款',
		value: 10,
		key: 'hasRefunded'
	}
]

export const orderTypesStore = [
	{
		label: '待付款',
		value: 8,
		key: 'awaitPay'
	},
	{
		label: '已付款',
		value: 5,
		key: 'hasPay'
	},
	{
		label: '已核销',
		value: 6,
		key: 'hasWritten'
	},
	{
		label: '已过期',
		value: 7,
		key: 'hasExpired'
	},
	{
		label: '已取消',
		value: 9,
		key: 'hasCancel'
	},
	{
		label: '已退款',
		value: 10,
		key: 'hasRefunded'
	}
]

export const orderOpButtons = [
	{
		label: '删除订单',
		key: 'delete',
		color: '#f40'
	},
	{
		label: '去支付',
		key: 'pay',
		color: '#84c341'
	},
	{
		label: '取消订单',
		key: 'cancel',
		color: '#ccc'
	},
	{
		label: '确认收货',
		key: 'confirm',
		color: '#84c341'
	},
	{
		label: '申请退款',
		key: 'refund',
		color: '#84c341'
	},
	{
		label: '再次购买',
		key: 'rebuy',
		color: '#84c341'
	},
	{
		label: '去评论',
		key: 'comment',
		color: '#84c341'
	}
]
