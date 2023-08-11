import { CHANGE_IS_IN_MINIPROGRAM, CHANGE_SYSTERM_INFO, CHANGE_USER_PAGE_SCROLL } from './type'

export default {
	namespaced: true,
	state() {
		return {
			isInMiniProgram: false,
			systermInfo: {},
			userScrollTop: 0
		}
	},

	mutations: {
		[CHANGE_IS_IN_MINIPROGRAM](state, tag) {
			if (tag) {
				state.isInMiniProgram = tag
			}
		},

		[CHANGE_SYSTERM_INFO](state, system) {
			state.systermInfo = system
		},

		[CHANGE_USER_PAGE_SCROLL](state, data) {
			state[data.field] = data.scrollTop
		}
	},

	actions: {
		getUserSystermInfo({ commit }) {
			return new Promise((resolve, reject) => {
				uni.getSystemInfo({
					success: (systermInfo) => {
						commit(CHANGE_SYSTERM_INFO, systermInfo)
						resolve()
					},
					fail: () => {
						commit(CHANGE_SYSTERM_INFO, {})
						resolve()
					}
				})
			})
		},
		changeUserPageScroll({ commit }, data) {
			commit(CHANGE_USER_PAGE_SCROLL, data)
		}
	}
}
