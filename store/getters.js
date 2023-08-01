export default {
	// 位置
	currentCity: (state) => state.location.currentCity,
	detailAddress: (state) => state.location.detailAddress,
	obtainLocationCount: (state) => state.location.obtainLocationCount,

	// 聊天
	customerServiceInfo: (state) => state.customerService.customerServiceInfo,
	chatListData: (state) => state.customerService.chatListData,
	wsHandleInfo: (state) => state.customerService.wsHandleInfo,
	wsHandle: (state) => state.customerService.wsHandle,

	// app
	statusBarHeight: (state) => state.app.systermInfo.statusBarHeight || 0
}
