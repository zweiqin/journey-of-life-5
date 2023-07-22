export {
	GyRequest as request,
	RuanRequest
} from './DWHRequest'
export {
	KuaiDiRequest
} from './KuaiDiRequest'
export { request2 } from './request'

export {
	fomartNumber,
	removeCache,
	getUserId,
	getBrandId,
	checkWhoami,
	updateToken,
	useCopy,
	handleDebounce,
	getRandom,
	getAddressLongitudeAndLatitude,
	delayedLoginStatus,
	domToImage,
	transformNumber,
	isInWx,
	getUrlCode,
	timestampToTime,
	throttle
} from './DWHutils'
export { formatTime, debounce } from './util'
export { payFn } from './pay'
export { saveImg } from './upload'
export { nums } from './filter'
export { getAdressDetailByLngLat, navigationAddress, getLngLatByAddress, MapLoader } from './location'
