export const filterMenu = [
	{
		name: '综合排序',
		value: 0,
		color: '#FA5151',
		isRotate: true,
		isShow: false,
		icon: require('./icons/red-arrow.png'),
		children: [{
			name: "升序",
			value: "asc"
		}]
	},
	{
		name: '价格',
		value: 1,
		color: '#000000',
		isRotate: true,
		isShow: false,
		icon: require('./icons/black-arrow.png')
	},
	{
		name: '品类',
		value: 2,
		color: '#FA5151',
		isRotate: false,
		isShow: false,
		icon: require('./icons/code.png')
	},
	{
		name: '筛选',
		value: 3,
		color: '#FA5151',
		isRotate: false,
		isShow: false,
		icon: require('./icons/screen.png')
	}
]
