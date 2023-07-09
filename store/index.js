import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import customerService from './modules/customerService'
import location from './modules/location'
import store from './modules/store'

Vue.use(Vuex)

export default new Vuex.Store({
	getters,
	modules: {
		location,
		customerService,
		store
	}
})
