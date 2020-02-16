import Vue from 'vue'
import Vuex from 'vuex'
import {getLogGroups} from '../main/logs/logGroups'
import {getLogStreams} from '../main/logs/logStreams'
import {getLogEvents} from '../main/logs/logEvents'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
	},
	mutations: {
	},
	actions: {
		getLogGroups,
		getLogStreams,
		getLogEvents
	},
	modules: {
	}
})
